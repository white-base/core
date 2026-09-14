# logic-core 빌드·출판 구조 및 JS 사용 규격 검토

> 작성일: 2026-09-14
> 대상: `logic-core` v1.1.4 — `rollup.config.js`, `package.json`, `dist/` 산출물 6종, `src/` 24개 모듈
> 범위: (1) 소스가 실제로 어떤 JS 사양으로 작성돼 있는가, (2) Rollup 산출물이 목표 사양을 만족하는가, (3) `package.json` 출판 규격(exports/main/types/files)이 소비자 환경에서 동작하는가
> 관련 문서:
> - [LOGIC-CORE-FEATURES.ko.md](LOGIC-CORE-FEATURES.ko.md) — 기능 카탈로그 (배포 형식 표는 본 문서가 상세)
> - [AI-COLLABORATION-DRAFT.ko.md](AI-COLLABORATION-DRAFT.ko.md) — 코드 품질/아키텍처
> - [NAMING-REVIEW.ko.md](NAMING-REVIEW.ko.md) — 명명 검토
>
> 본 문서의 모든 판정은 실제 산출물을 파서(acorn)로 검증하고, 임시 소비자 프로젝트에서 Node/TypeScript 해석을 재현한 결과에 근거한다. 재현 명령은 §8에 있다.

---

## 1. 총평

| 질문 | 답 |
| --- | --- |
| 소스는 ES5인가 | **아니다.** 객체 모델(IIFE + prototype)만 ES5 스타일이고, 문법은 `?.`, `globalThis`, top-level `await` 등 **ES2020~ES2022** |
| `es5: true` UMD 빌드는 ES5인가 | **아니다.** acorn ES5/ES2015 파싱 실패, ES2020에서만 통과. 원인은 남아 있는 `import('fs/promises')` |
| Rollup 설정에 문제가 있는가 | **있다.** ESM 번들의 top-level await 잔존, browser.cjs의 `require('fs')` 노출, 폴리필 부재 등 6건 |
| `package.json` 출판 규격에 문제가 있는가 | **있다.** CJS TypeScript 소비자 TS1479, `./dist/*` 미노출, `main`이 ESM을 가리킴, `src/temp/` 발행 등 12건 |
| 어떤 사양으로 작성해야 하는가 | **소스 ES2020**, top-level await 제거. 레거시 대응은 소스가 아닌 **빌드 타깃**으로 분리 (§6) |

핵심: "레거시를 위해 ES5로 작성한다"는 전제가 소스에서도 산출물에서도 성립하지 않는다. ES5 스타일 유지 비용(가독성·TS 추론·트리셰이킹 손실 + Babel regenerator 약 17KB)만 지불하고 있고, 이득은 0이다.

---

## 2. 소스 문법 수준 실측

`src/` (temp 제외) grep 결과:

| 문법 | 사용 횟수 | 대표 위치 | 최소 사양 |
| --- | --- | --- | --- |
| 옵셔널 체이닝 `?.` | 3 | `message.js:37, 44, 111` | ES2020 |
| `globalThis` | 7 | `type.js:5`, `util.js:6`, `meta-registry.js:545~588`, `load-json.js:3` | ES2020 |
| top-level `await` | 1 | `message-wrap.js:11` | ES2022 |
| `import()` 동적 import | 3 | `load-json.js:9, 25, 26` | ES2020 |
| `class` | 30 | `i-*.js` 인터페이스 전부, `extend-error.js`, `message.js` | ES2015 |
| `async` / `await` | 5 / 16 | `message.js`, `load-json.js` | ES2017 |
| 스프레드 `...` | 7 | `collection-*.js`, `type.js` | ES2015 |
| 템플릿 리터럴 | 12 | 다수 | ES2015 |
| 화살표 함수 | 32 | `type.js`(15), `collection-*.js`(16) | ES2015 |
| `Symbol`, `BigInt` 참조 | 3 | `type.js:73, 674`, `meta-registry.js:71` | ES2015 / ES2020 |
| `fetch` | 1 | `load-json.js:15` | 런타임 API |

반면 ES5 스타일로 남아 있는 것:

- `var X = (function (_super) { ... })(Parent)` 패턴 — `base-collection.js`, `meta-object.js`, `meta-registry.js`, `namespace-manager.js`, `collection-*.js`, `event-emitter.js`, `type.js`, `util.js`
- `Object.defineProperty(this, ...)` 106회 — private 변수 클로저 + getter/setter
- `var` 위주 선언 (단, `message.js`/`load-json.js`/`type.js`는 `let`/`const` 혼용)

**판정**: 소스는 사실상 ES2020 코드다. ES5인 것은 클래스 정의 방식뿐이며, 이 방식은 문법 호환성에 아무 기여를 하지 않는다(어차피 같은 파일에 `class`와 `?.`가 있다).

---

## 3. 빌드 산출물 실측

### 3.1 파싱 검증 (acorn)

```
dist/logic-core.js       ES5     FAIL  The keyword 'import' is reserved (477:19)
                         ES2015  FAIL  Unexpected token (477:19)
                         ES2020  OK
dist/logic-core.min.js   ES5     FAIL  (2:10304)
                         ES2015  FAIL
                         ES2020  OK
```

`rollup.config.js`의 `es5: true` 빌드가 실제로는 **ES2020**이다. 477행은 `load-json.js`에서 온 `import('fs/promises')`. Babel `preset-env`는 Rollup UMD 출력에 남은 동적 import를 변환하지 않는다.

### 3.2 산출물별 상태

| 파일 | 형식 | 실제 문법 | 발견 사항 |
| --- | --- | --- | --- |
| `logic-core.node.cjs` | CJS | ES2020 | 정상. `message-wrap.bundle.js` alias 적용됨(await는 IIFE 내부) |
| `logic-core.browser.cjs` | CJS | ES2020 | **`require('path')`, `require('fs')`, `__dirname`, `readFileSync` 포함** (18~38행) |
| `logic-core.js` / `.min.js` | UMD | **ES2020** (목표 ES5) | `import('fs/promises')`(477), `import('url')`(532), `import('path')`(537) 잔존. regenerator 12곳·`_asyncToGenerator` 6곳 인라인 |
| `logic-core.esm.js` / `.min.js` | ESM | ES2022 | **top-level `await Message.autoDetect()` 잔존** (545행). alias 미적용 |
| `dist/locales/` | — | — | node.cjs 빌드에서만 복사 |

### 3.3 npm 발행 내용 (`npm pack --dry-run`)

| 항목 | 값 |
| --- | --- |
| 파일 수 | 107 |
| 전개 크기 | 3.88 MB |
| 압축 크기 | 0.67 MB |
| 소스맵 6개 | **2.24 MB (전개의 58%)** |
| `src/temp/` | **13개 파일 발행됨** (`_message2.js`, `_message4.js`, `_message22.cjs`, `__collection-array.d.ts` 등) |
| `dist/logic-core.esm.js` + `.min.js` | 발행되지만 `exports` 어디에서도 참조 안 됨 → CDN 직접 경로 외에는 접근 불가 |

---

## 4. Rollup 설정 문제

심각도순. 행 번호는 `rollup.config.js` 기준.

### R1. UMD에 동적 import 잔존 → ES5 목표 무효 (심각)

- 위치: `buildConfig()` 44~47행 (`babel({ presets: ['@babel/preset-env'] })`)
- 현상: §3.1. IE11 등 ES5 엔진에서는 **파싱 단계에서 번들 전체가 로드 실패**한다.
- 부수 현상: 모던 브라우저에서도 `import('fs/promises')`가 네트워크 fetch를 시도 → `load-json.js`의 try/catch에 잡혀 `undefined` 반환 → **로케일 로딩이 조용히 실패**한다.

### R2. ESM 번들에 top-level await 잔존 (심각)

- 위치: 145~156행 (browser ESM 빌드). `aliasPlugin`이 이 빌드에만 없다.
- 현상: `dist/logic-core.esm.js:545`에 `await Message.autoDetect();`. webpack 4, esbuild `target=es2017`, 구형 Safari 등에서 실패.

### R3. browser.cjs에 Node 내장 모듈 노출 (심각)

- 위치: 159~178행. `load-json.js → load-json.cjs` alias 적용 결과.
- 현상: `exports["."].browser.require`가 가리키는 파일에 `require('fs')`, `require('path')`, `__dirname`이 있다. **webpack 5는 Node 코어 폴리필을 제공하지 않으므로 `Module not found: Can't resolve 'fs'`로 소비자 빌드가 깨진다.**

### R4. Babel targets·polyfill 부재 (중)

- 위치: 45~47행. `browserslist` 파일·`package.json` 필드 모두 없음. `corejs` 옵션 없음.
- 현상: 문법만 변환하고 `Symbol`, `Promise`, `fetch`, `Object.defineProperty` getter 등 런타임은 그대로. 진짜 ES5 엔진에서는 문법을 고쳐도 실행 불가.

### R5. external / globals 불일치 (중)

- 위치: 52행 `external: ['path', 'fs', 'url']`, 126~130행 `globals`.
- 현상: `fs/promises`가 external에 없다. UMD `globals`가 `path→path, fs→fs, url→url`로 브라우저 전역에 매핑돼 있으나 그런 전역은 존재하지 않는다(현재는 동적 import만 있어 UMD 래퍼 인자에 오르지 않았을 뿐).

### R6. 구조적 취약점 (하)

| 항목 | 위치 | 내용 |
| --- | --- | --- |
| `cleandir(OUT_DIR)` | 84행 | 첫 config에만 있음. config 배열 순차 실행에 의존. 부분 빌드·병렬 실행 시 산출물 삭제 위험 |
| `aliasPlugin` 위치 | 48행 `...(config.plugins \|\| [])` | `resolve()` **뒤에** 배치. `resolveId` 훅 순서상 alias가 먼저 와야 정석. 현재 동작은 우연 |
| `terser`, `bundleSize` | 42~43행 | `plugins`에 있으나 `output.plugins`가 정위치. 동작은 함 |
| `browser: false` | 149행 | "browser ESM bundle for CDN" 주석과 모순 |
| `sourcemap: true` 전체 | `srcMap` | 소스맵 6개 2.24MB 발행 |

---

## 5. 출판 규격(package.json) 문제

### 5.1 소비자 환경 재현 결과

임시 프로젝트에 `node_modules/logic-core`를 심링크한 뒤 실행:

```
import 'logic-core'                          → ok (21 exports)
require('logic-core')                        → ok (21 exports)
import 'logic-core/ko'                       → ok (21 exports)
import 'logic-core/dist/logic-core.esm.js'   → FAIL ERR_PACKAGE_PATH_NOT_EXPORTED
import 'logic-core/package.json'             → FAIL ERR_PACKAGE_PATH_NOT_EXPORTED
```

TypeScript (`module: node16`, CommonJS 파일 `a.cts`):

```
error TS1479: The current file is a CommonJS module whose imports will produce
'require' calls; however, the referenced file is an ECMAScript module and cannot
be imported with 'require'. Consider writing a dynamic 'import("logic-core")' call instead.
```

### 5.2 문제 목록

| # | 문제 | 위치 | 영향 | 심각도 |
| --- | --- | --- | --- | --- |
| P1 | `"main": "index.js"` + `"type": "module"` | `main` | `exports` 미지원 툴(webpack 4, 구 Jest, Browserify, Node <12.17)에서 `require()` 시 ESM 파싱 오류 | 높음 |
| P2 | `.d.cts` 없음. `types` 조건이 `require`/`default` 모두 같은 `index.d.ts` | `exports["."].types` | **CJS TypeScript 소비자 전원 TS1479** (§5.1) | 높음 |
| P3 | `./dist/*` subpath 미노출 | `exports` | README가 안내하는 `dist/logic-core.js` 경로를 번들러 import로 사용 불가 | 높음 |
| P4 | `browser.require` → `browser.cjs`에 `fs` 노출 | `exports` + R3 | webpack 5 브라우저 빌드 실패 | 높음 |
| P5 | `dist/logic-core.esm.js`(+min)가 `exports`에 없음 | `exports` | 218KB × 2 + 소스맵이 죽은 무게 | 중 |
| P6 | `./package.json` 미노출 | `exports` | 일부 툴체인(Vite 플러그인, `resolvePackageJsonExports` 등) 실패 | 중 |
| P7 | `module`, `browser`, `unpkg`, `jsdelivr` 필드 없음 | 루트 | 레거시 번들러·CDN 기본 경로가 `main`(ESM)으로 감 | 중 |
| P8 | `sideEffects` 없음 | 루트 | 실제로 side effect 있음(`Message.autoDetect()`). 미표기 시 번들러가 보수적으로 전체 유지 → 명시가 필요 | 중 |
| P9 | `engines` 없음 | 루트 | `import.meta`, `?.`, top-level await → 최소 Node 14.8+인데 미표기 | 중 |
| P10 | `files: ["src/"]` → `src/temp/` 13개 발행 | `files` | 데드 코드·`.d.ts` 초안이 npm에 공개 | 중 |
| P11 | `./ko`가 런타임 동일, 타입만 다름 | `exports["./ko"]` | 의도라면 README 명시 필요(현재 미기재). 사용자는 한글 메시지 번들로 오해 가능 | 하 |
| P12 | `prepublishOnly` 없음 | `scripts` | 테스트·타입체크 없이 publish 가능 | 하 |

`exports` 조건 순서 자체(`types` → `browser` → `default`)는 올바르다.

---

## 6. 권장 규격

### 6.1 소스 작성 기준: ES2020

이미 `?.`와 `globalThis`를 사용 중이므로 현 상태의 정직한 표기다. 추가로:

1. **top-level await 제거** — `message-wrap.js:11`의 `await Message.autoDetect()`를 lazy init(첫 `get()` 호출 시) 또는 명시적 `Message.init()`으로 전환. 이 한 가지로 `message-wrap.bundle.js` 이중화와 모든 alias 트릭이 사라지고 R2가 해결된다. **가장 우선 과제.**
2. **`load-json`을 환경별 파일로 분리** — `load-json.node.js`(fs 전용) / `load-json.browser.js`(fetch 전용). 빌드별 alias로 교체. R1·R3·R5가 동시에 해결되고, UMD에서 동적 import가 사라져 **진짜 ES5 산출물이 가능해진다.**
3. IIFE + prototype 패턴은 `class`로 점진 전환. 유지해도 얻는 것이 없다(§2).

### 6.2 타깃 매트릭스

| 산출물 | 형식 | 문법 | 대상 | 비고 |
| --- | --- | --- | --- | --- |
| `index.js` (소스 ESM) | ESM | ES2020 | 번들러 (`import` 조건) | 트리셰이킹 유리. 현행 유지 |
| `dist/logic-core.node.cjs` | CJS | ES2020 | Node 14.8+ `require` | 현행 유지 |
| `dist/logic-core.browser.cjs` | CJS | ES2020 | 번들러 `require` + browser 조건 | `load-json.browser.js` 사용 |
| `dist/logic-core.esm.js` | ESM | ES2020 | CDN `<script type="module">` | TLA 제거, `./dist/*`로 노출 |
| `dist/logic-core.umd.js` | UMD | **ES2015** | 브라우저 `<script>` | 현실적 하한선 |
| `dist/logic-core.es5.umd.js` | UMD | ES5 + core-js | *IE11이 실제 필요할 때만* | 번들 2배 이상. 요구가 없으면 만들지 않는다 |

### 6.3 package.json 수정안

```jsonc
{
  "main": "./dist/logic-core.node.cjs",
  "module": "./index.js",
  "browser": "./dist/logic-core.umd.js",
  "unpkg": "./dist/logic-core.umd.min.js",
  "jsdelivr": "./dist/logic-core.umd.min.js",
  "types": "./types/index.d.ts",
  "sideEffects": ["./src/message-wrap*.js", "./index.js"],
  "engines": { "node": ">=14.8" },
  "exports": {
    ".": {
      "browser": {
        "types": "./types/index.d.ts",
        "import": "./index.js",
        "require": "./dist/logic-core.browser.cjs"
      },
      "import":  { "types": "./types/index.d.ts",  "default": "./index.js" },
      "require": { "types": "./types/index.d.cts", "default": "./dist/logic-core.node.cjs" }
    },
    "./ko": {
      "import":  { "types": "./types/ko/index.d.ts",  "default": "./index.js" },
      "require": { "types": "./types/ko/index.d.cts", "default": "./dist/logic-core.node.cjs" }
    },
    "./dist/*": "./dist/*",
    "./package.json": "./package.json"
  },
  "files": ["dist/", "types/", "src/", "!src/temp/", "index.js"],
  "scripts": {
    "prepublishOnly": "npm run all"
  }
}
```

- `types/index.d.cts`, `types/ko/index.d.cts`는 `index.d.ts`를 복사만 해도 TS1479가 해소된다(`rollup-plugin-copy`로 자동화).
- `browserslist` 필드(또는 `.browserslistrc`)를 추가해 Babel targets를 명시한다. 예: `["defaults", "not IE 11"]`.

### 6.4 rollup.config.js 수정 포인트

| # | 항목 | 해결되는 문제 |
| --- | --- | --- |
| 1 | `load-json` 환경별 분리 후 빌드별 alias (node → `.node.js`, browser/umd/esm → `.browser.js`) | R1, R3, R5 |
| 2 | ESM 빌드에도 `aliasPlugin` 추가 (TLA 제거 시 불필요) | R2 |
| 3 | `browserslist` 추가, ES5 UMD가 필요하면 `useBuiltIns: 'usage', corejs: 3` | R4 |
| 4 | `cleandir` → `"prebuild": "rimraf dist"` 스크립트로 분리 | R6 |
| 5 | `aliasPlugin`을 `resolve()` 앞으로 이동 | R6 |
| 6 | `terser`/`bundleSize` → `output.plugins` | R6 |
| 7 | 소스맵은 UMD/ESM만 유지하거나 `.npmignore`로 제외 | §3.3 |
| 8 | ESM 빌드 `browser: true`로 수정 (주석과 일치) | R6 |

---

## 7. 조치 순서

| 순서 | 작업 | 이유 |
| --- | --- | --- |
| 1 | `message-wrap.js` top-level await 제거 | R2 해결 + alias 구조 단순화. 나머지 작업의 전제 |
| 2 | `load-json` 환경별 분리 | R1·R3·R5 동시 해결. UMD가 실제 ES5/ES2015가 됨 |
| 3 | `package.json` exports/main/files 교체 (§6.3) | P1~P10 |
| 4 | `types/*.d.cts` 생성 | P2 |
| 5 | `browserslist` + Babel 정리, UMD 타깃 ES2015 결정 | R4 |
| 6 | `npm pack --dry-run` + §8 재검증 | 회귀 확인 |
| 7 | README `./ko` 의미 및 CDN 경로 갱신 | P11 |

---

## 8. 검증 방법

```bash
# §2 소스 문법 사용량
for k in "?\." "globalThis" "^await " "import(" "class " "\.\.\."; do
  printf "%-12s %s\n" "$k" "$(grep -rn -- "$k" src/*.js | grep -v '^src/temp' | wc -l | tr -d ' ')"
done

# §3.1 UMD 파싱 수준 (rollup 동봉 acorn 사용)
node -e "
const acorn=require('acorn');const fs=require('fs');
for (const f of ['dist/logic-core.js','dist/logic-core.min.js'])
  for (const ev of [5,2015,2020])
    try { acorn.parse(fs.readFileSync(f,'utf8'),{ecmaVersion:ev,sourceType:'script'}); console.log(f,'ES'+ev,'OK'); }
    catch(e){ console.log(f,'ES'+ev,'FAIL ->',e.message.slice(0,60)); }"

# §3.2 번들별 잔존 항목
grep -n "^await \|^\s*await Message" dist/logic-core.esm.js      # TLA (R2)
grep -n "import('fs/promises')\|import('path')" dist/logic-core.js   # 동적 import (R1)
grep -n "require('fs')\|__dirname" dist/logic-core.browser.cjs      # Node 내장 (R3)

# §3.3 발행 내용
npm pack --dry-run 2>&1 | grep -E "src/temp|\.map|unpacked size|total files"

# §5.1 소비자 해석 재현 (Node)
D=/tmp/lc-res && rm -rf $D && mkdir -p $D/node_modules && ln -s "$PWD" $D/node_modules/logic-core
cd $D && echo '{"name":"probe","type":"module"}' > package.json
node -e "import('logic-core').then(m=>console.log('ESM ok',Object.keys(m).length))"
node -e "import('logic-core/dist/logic-core.esm.js').catch(e=>console.log('subpath',e.code))"
node -e "import('logic-core/package.json',{with:{type:'json'}}).catch(e=>console.log('pkgjson',e.code))"
cd -

# §5.1 소비자 해석 재현 (TypeScript, CJS)
D=/tmp/lc-ts && rm -rf $D && mkdir -p $D/node_modules && ln -s "$PWD" $D/node_modules/logic-core
cd $D
echo '{"name":"tsprobe","type":"commonjs"}' > package.json
echo '{"compilerOptions":{"module":"node16","moduleResolution":"node16","strict":true,"noEmit":true,"skipLibCheck":true},"files":["a.cts"]}' > tsconfig.json
echo "import { ArrayCollection } from 'logic-core'; new ArrayCollection().add(1);" > a.cts
"$OLDPWD/node_modules/.bin/tsc" -p tsconfig.json      # TS1479 재현
cd -
```
