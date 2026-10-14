# 빌드·배포 검토 의견 재검토

> 재검토일: 2026-10-14  
> 원본: [BUILD-PUBLISH-REVIEW.ko.md](BUILD-PUBLISH-REVIEW.ko.md)  
> 기준: Git `d96dbab`, Node 22.16.0 / TypeScript 5.4.5  
> 공통 실행 범위: [기준선](AI-COLLABORATION-DRAFT_재검토.ko.md#2-공통-검증-기준선)

## 1. 결론

UMD의 ES5 목표 미달, 브라우저 CJS의 Node 내장 모듈 노출, CJS TypeScript 선언 문제는 유효하다. 그러나 **소스 및 CJS의 실제 문법 수준과 권장 package.json 수정안에 오류가 있어 그대로 적용하면 안 된다.**

## 2. 산출물 재측정

현재 설정으로 빌드한 뒤 acorn으로 ES5/2015/2020/2021/2022 순서로 파싱했다.

| 산출물 | 최초 통과한 사양 | 기존 의견 정정 |
| --- | --- | --- |
| `logic-core.js`, `logic-core.min.js` | ES2020 | 기존 판정 유지. `import()`가 남아 ES5 파싱 실패 |
| `logic-core.node.cjs` | ES2022 | ES2020이라는 기존 표는 틀림. 142행의 static 필드에서 ES2020/2021 실패 |
| `logic-core.browser.cjs` | ES2022 | 같은 클래스 필드가 남아 있음 |
| `logic-core.esm.js`, `.esm.min.js` | ES2022 | TLA뿐 아니라 클래스 필드도 원인 |

`globalThis`는 문법이 아니라 전역 API다. 함수 생성자·prototype 사용도 그 자체로 트리 셰이킹 손실을 증명하지 않는다. "ES5 스타일의 이득 0", "regenerator 약 17KB 비용"은 비교 빌드 근거 없는 일반화로 삭제하는 편이 맞다.

소스에는 static/public 필드와 TLA가 있으므로 현재 구현을 ES2020으로 확정할 수 없다. **TLA 한 줄 제거만으로 ES2020 작성 규격을 충족하지도 않는다.** 실제 지원 Node 하한은 사양 연도에서 산출하지 말고 해당 버전에서 검증해야 한다.

## 3. Rollup 지적별 판정

| 항목 | 판정 | 의견 |
| --- | --- | --- |
| R1 UMD 동적 import | 유지·부수 주장 수정 | ES5 파싱 실패는 재현. 하지만 `fs/promises` import는 `isNode` 분기 안에 있어 일반 브라우저에서 항상 실행되지는 않음 |
| R2 ESM TLA | 유지 | `message-wrap.js:10`의 TLA가 ESM에 포함됨. 제거 방식은 초기화 계약과 함께 결정 |
| R3 browser.cjs의 fs/path | 유지 | 생성 파일에 `require('fs')`, `require('path')`가 있음. webpack 5의 특정 오류 메시지는 이번에 실제 빌드하지 않았음 |
| R4 targets/polyfill | 유지·범위 정정 | 목표 브라우저가 없으면 호환 보증 불가. `Object.defineProperty`와 getter는 ES5 기능이므로 후속 API와 구분 |
| R5 external/globals | 조건부 유지 | `fs/promises` 누락 및 Node 경로 잔존은 정리 대상. 사용되지 않는 globals 설정만으로 현재 브라우저 실행 실패를 확정하지 않음 |
| R6 alias 순서 | 개선 제안 | alias를 앞에 두는 편이 명료하나, 현재 동작이 "우연"이라는 근거는 부족 |
| R6 terser/bundleSize 위치 | 철회 | 최상위 `plugins` 배치도 유효. `output.plugins`는 출력별 적용을 위한 선택지이지 유일한 정위치가 아님 |
| R6 cleandir | 조건부 유지 | 현재 순차 전체 빌드는 성공. 부분·병렬 빌드 도입 시 삭제 범위를 따로 관리 |
| R6 sourcemap | 정책 판단 | 크기는 실제 비용이지만 디버깅 가치도 있음. 오류로 분류하지 않음 |

Rollup은 `output.plugins`를 출력에만 적용하는 별도 옵션으로 설명한다. 최상위 `plugins`도 공식 옵션이다. [Rollup 설정 문서](https://rollupjs.org/configuration-options/#output-plugins)

브라우저 유사 VM에 `window`, `navigator.language='ko-KR'`, `document.currentScript.src`, fetch stub을 제공해 UMD를 실행했다. export 21개가 생성되고 fetch 대상은 `https://example.test/lib/locales/ko.json` 한 개였으며 경고가 없었다. 이는 해당 조건의 분기 확인이다. 실제 브라우저의 CSP·번들러·경로 조합 전체를 보증하지는 않는다.

## 4. 출판 규격 지적별 판정

| 항목 | 판정 | 의견 |
| --- | --- | --- |
| P1 main이 ESM | 조건부 유지 | exports를 지원하는 Node의 require는 정상. 구형 소비자 지원 여부를 정한 뒤 fallback을 변경 |
| P2 CJS TS1479 | 유지 | TypeScript 5.4.5, node16, `.cts`의 정적 import에서 재현. 모든 TS 설정·사용 방식에서 실패한다고 일반화하지 않음 |
| P3 dist subpath 비노출 | 정책 판단 | bare subpath import는 실패하지만 README의 CDN `<script src>` 예제는 같은 사용 방식이 아님 |
| P4 browser.require | 유지 | R3과 같은 문제. 환경별 loader 분리가 필요 |
| P5 ESM 번들이 죽은 무게 | 수정 | CDN 직접 사용이라는 용도가 있다. package import 진입점의 필요와 별도로 평가 |
| P6 package.json 미노출 | 보류 | 기본적으로 허용되는 캡슐화다. 실제 필요한 툴의 실패를 재현한 뒤 공개 |
| P7 module/browser/CDN 필드 | 조건부 | 지원하려는 툴과 CDN 기본 URL에 따라 필요. 모든 필드가 필수는 아님 |
| P8 sideEffects 부재 | 조건부 | 부작용 존재는 사실. 부분 whitelist가 초기화 모듈을 잘못 제거하지 않는지 번들 테스트 필요 |
| P9 engines 부재 | 유지 | 실제 지원 하한을 정해야 함. 원문의 `>=14.8`을 재검증 없이 채택하지 않음 |
| P10 src/temp 발행 | 유지 | 13파일, 135,619B 발행 대상. 배포 제외와 작업 파일 삭제는 별도 결정 |
| P11 ./ko 의미 | 유지 | 런타임은 동일, 한국어 타입 설명용이다. README에 명시할 가치가 있음 |
| P12 prepublishOnly 부재 | 개선 제안 | 로컬 검증 누락 방지 수단이다. CI 배포 정책도 함께 봐야 하며 그 자체가 패키지 형식 오류는 아님 |

실제 `import('logic-core')`, `require('logic-core')`, `import('logic-core/ko')`는 21개 export로 성공했다. `logic-core/dist/logic-core.esm.js` 및 `logic-core/package.json`은 `ERR_PACKAGE_PATH_NOT_EXPORTED`였다. Node 22에서는 `require('./index.js')`가 단순 ESM 파싱 오류 대신 `ERR_REQUIRE_ASYNC_MODULE`로 실패했다. [Node require와 TLA](https://nodejs.org/api/modules.html#loading-ecmascript-modules-using-require)

pack 결과는 107파일, 전개 3,878,373B, 압축 670,782B, 소스맵 합계 2,235,965B다. "135kB 감소"는 임시 소스의 **전개 크기**이며 압축 tarball의 감소량으로 표현하면 안 된다.

## 5. `.d.cts` 단순 복사안은 불충분

임시 패키지에서 다음 세 조건을 실제 컴파일했다.

| 조건 | 결과 |
| --- | --- |
| 원본 exports + `.cts` 정적 import + `skipLibCheck:false` | 소비자 파일에서 TS1479 |
| `types/index.d.ts`를 `index.d.cts`로 복사하고 require 타입 경로만 변경 | `types/index.d.cts`의 `./message.js` 등 재수출에서 TS1479 |
| 같은 복사안 + `skipLibCheck:true` | 통과 |

기존 문서의 검증 명령은 `skipLibCheck:true`라 이 문제를 가린다. index만 확장자를 바꾸면 내부 `.js` 재수출이 여전히 ESM `.d.ts`로 해석된다. CJS 선언 트리의 파일 형식과 내부 경로를 함께 맞추거나, CJS용 선언 번들을 생성해야 한다. ESM/CJS 진입점에 각각 맞는 선언이 필요하다는 점은 공식 설명과도 일치한다. [TypeScript 4.7 선언·exports 설명](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#packagejson-exports-imports-and-self-referencing)

## 6. 수정안에 추가할 조건

- `Message.init()`을 새로 만들더라도 현재 동기 `Message.get()`의 준비 상태를 정의해야 한다. get을 비동기화하는 lazy init은 단순 대체안이 아니다.
- 원문의 exports 예시는 browser 분기에서 다시 ESM `.d.ts` 하나를 import/require에 공용한다. 브라우저 CJS의 타입 해석도 별도 검증해야 한다.
- `./ko` 예시에서도 browser require 분기가 빠졌다. 루트와 `./ko`의 환경 조건을 일관되게 설계한다.
- 루트 `browser`를 UMD 파일 하나로 지정하는 안은 번들러의 모듈 진입점 선택까지 바꾼다. 소비자 번들 테스트 없이 그대로 적용하지 않는다.
- `sideEffects`, `./dist/*` 전체 노출, sourcemap 제외는 선택한 지원 정책에 따라 최소 범위로 적용한다.

우선순위는 **환경별 loader 정리 → 초기화 계약 정리 → 선언 그래프 정합성 → 실제 소비자 검증**으로 수정한다. 모든 manifest 필드를 한꺼번에 교체하는 처방은 보류한다.

## 7. 문법 재현

```bash
node --input-type=module <<'JS'
import fs from 'node:fs';
import { createRequire } from 'node:module';
const { parse } = createRequire(import.meta.url)('acorn');
for (const file of ['logic-core.js', 'logic-core.node.cjs', 'logic-core.browser.cjs', 'logic-core.esm.js']) {
  for (const ecmaVersion of [5, 2015, 2020, 2021, 2022]) {
    try {
      parse(fs.readFileSync('dist/' + file, 'utf8'), {
        ecmaVersion, sourceType: file.includes('.esm.') ? 'module' : 'script'
      });
      console.log(file, ecmaVersion); break;
    } catch {}
  }
}
JS
```
