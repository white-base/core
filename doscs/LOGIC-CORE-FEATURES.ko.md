# logic-core 기능 분석 문서

> 작성일: 2026-09-05
> 대상: `logic-core` v1.1.4 (`src/` 25개 모듈, 5,742줄)
> 목적: (1) 제공 기능 카탈로그 정리, (2) 불필요해 보이는 기능 식별
> 관련 문서: [AI-COLLABORATION-DRAFT.ko.md](AI-COLLABORATION-DRAFT.ko.md) — 코드 품질/아키텍처 문제 중심. 본 문서는 **기능 존재 여부와 필요성** 중심이며 중복되는 항목은 상호 참조한다.

---

## 1. 개요

`logic-core`는 상위 `logic-*` 패키지가 공유하는 기반 런타임이다. 자체 애플리케이션 기능은 없고, **직렬화 가능한 메타 객체 모델**을 제공하는 것이 핵심 목적이다.

| 항목 | 값 |
| --- | --- |
| 공개 export | 22개 (`index.js`) |
| 소스 규모 | 25개 모듈 / 5,742줄 (`type.js` 1,449줄 = 25%) |
| 배포 형식 | ESM(`index.js`), Node CJS, Browser CJS, UMD, Browser ESM |
| 타입 선언 | `types/` (영문) + `types/ko/` (한글) 이중 |
| 메시지 | 277개 코드 × 2개 언어(default/ko) |
| npm 패키지 | 670.8 kB (압축) / 3.9 MB (전개) / 107 파일 |
| 확인된 소비자 | `meta-entity`, `bind-model`, `logic-sql-entity` |

### 계층 구조

```
[0] 메시지/오류   message.js ← load-json.js ← locales/     ExtendError
                       │                                      │
[1] 기반 유틸     ────┴──────────────────────────────────────┴────
                  Type          Util          EventEmitter
                       │             │
[2] 계약          i-object / i-marshal / i-element / i-list / i-control-list
                  i-collection / i-collection-array / i-collection-property / i-serialize
                       │
[3] 메타          NamespaceManager → MetaRegistry → MetaObject → MetaElement
                       │
[4] 컬렉션        BaseCollection → ArrayCollection
                                 → PropertyCollection
```

의존은 위에서 아래로만 흐른다. 단, `ExtendError → Message → loadJSON(fs/fetch)` 경로 때문에 **최하위 오류 계층이 로케일 I/O에 결합**되어 있다 (초안 문서 4장 참조).

---

## 2. 기능 카탈로그

### 2.1 메시지 / 오류 계층

**`Message`** (`message.js` + `message-wrap.js`) — 코드 기반 다국어 메시지 저장소. 전부 static.

| API | 기능 |
| --- | --- |
| `importMessage(msg, path)` | 메시지 객체를 `default` 언어에 deep merge, 로케일 파일 경로 등록 |
| `changeLanguage(lang)` *(async)* | 등록된 모든 경로에서 `{path}/{lang}.json` 로드 후 병합. `_history`로 중복 로드 차단 |
| `autoDetect()` *(async)* | `navigator.language` 또는 `process.env.LANG`으로 언어 판별 후 `changeLanguage` |
| `get(code, values)` | 코드 → 메시지. `${name}` / `$1` 치환, `E`/`W` 접두로 `Error [코드]` 머리말 생성 |
| `getMessageByCode(code)` | 치환·머리말 없는 원문 조회 |
| `resetLang()` | `currentLang`을 `defaultLang`으로 복귀 |

- `message-wrap.js`(top-level await) / `message-wrap.bundle.js`(async IIFE) 2종을 rollup alias로 교체한다. **둘 다 필요**하다 — UMD/CJS 타깃이 top-level await를 지원하지 않는다.
- `load-json.js`(ESM) / `load-json.cjs`(CJS) 도 같은 이유로 2종 유지가 필요하다. Node면 `fs/promises`, 브라우저면 `fetch`.

**`ExtendError`** (`extend-error.js`) — `Error` 확장. 문자열 메시지 또는 정규식 코드(`/EL01504/`)를 받는다. 원인 오류를 중첩하면 `queue`에 누적되어 `#`, `##` 마크로 계층 출력한다. `prop` 객체는 `key : value` 줄로 앞에 붙는다.

### 2.2 타입 계층 — `Type` (`type.js`, 1,449줄)

런타임 구조 타입 검증기. 확장 타입 표현(`$type`, `kind`, `list`, `default`, `params`, `return`)으로 정규화한 뒤 비교한다.

| API | 기능 | 내부 사용 | 하위 패키지 사용 |
| --- | --- | :-: | :-: |
| `matchType(ext, target, opt)` | 값이 타입을 만족하는지 검사, 실패 시 throw | ✅ 6곳 | ✅ 11회 |
| `allowType(ext, tar, opt)` | 타입 → 타입 캐스팅 허용 여부, 실패 시 throw | ✅ | ✅ 1회 |
| `isMatchType` / `isAllowType` | 위 두 함수의 boolean 버전 | ❌ | ❌ |
| `extendType(target)` | 확장 타입 객체로 정규화 | ✅ | ❌ |
| `typeOf(target)` | 확장 타입 이름 문자열 | ✅ | ❌ |
| `typeObject(target)` | 확장 타입을 JSON 직렬화 가능 형태로 변환 | ❌ | ❌ |
| `getTypes(ctor, hasUnion)` | 프로토타입 체인 + `_UNION` 타입 배열 | ✅ | ❌ |
| `hasType` / `isProtoChain` | 타입 포함 여부 (`_UNION` 포함/제외) | ✅ | ✅ 4회 |
| `deepEqual(a, b)` | 프로토타입 제외 깊은 비교 | ✅ | ✅ 3회 |
| `getAllProperties(obj, hasObj)` | 프로토타입 체인 전체 속성명 | ✅ | ❌ |

지원 타입: `null`, `undefined`, `number`, `string`, `boolean`, `symbol`, `bigint`, `regexp`, `object`, `array`, `choice`, `union`, `function`, `class`.
kind 한정자: 배열 `_ALL_ _ANY_ _REQ_ _OPT_ _SEQ_`, 선택 `_ALL_ _ANY_ _NON_ _REQ_ _OPT_ _DEF_ _EUM_ _ERR_`.

### 2.3 유틸 — `Util` (`util.js`)

| API | 기능 | 하위 패키지 사용 |
| --- | --- | :-: |
| `inherits(ctor, superCtor)` | 프로토타입 상속 + `ctor.super` 설정 | ✅ 23회 |
| `implements(ctor, obj, ...ifaces)` | 인터페이스 구현 검증, `obj._interface` / `obj.isImplementOf()` 주입 | ✅ 7회 |
| `deepCopy(target)` | 프로토타입 제외 깊은 복사 | ✅ 4회 |
| `createGuid()` | 36자리 GUID | 내부(`MetaObject._guid`) |
| `getArrayDepth(elem)` | 배열 중첩 깊이 (최대 10) | ❌ **미사용** |

### 2.4 이벤트 — `EventEmitter` (`event-emitter.js`)

`on`/`addListener`, `once`, `off`/`removeListener`, `removeAllListeners`, `emit`, `_list`, `isLog`.

- 리스너 중복 등록을 차단한다 (Node EventEmitter와 다름).
- `emit`에서 리스너가 `false`를 반환하면 **즉시 중단하고 `false` 반환** — 컬렉션의 `onAdd`/`onRemove` 취소 프로토콜의 근거다.
- 반환값: 리스너 있으면 `true`, 없으면 `undefined`, 취소되면 `false`.

### 2.5 인터페이스 계약 (`i-*.js` 9개)

선언용이 아니라 **런타임 클래스**다. 추상 메서드는 `ExtendError`를 던지고, 속성은 타입 토큰(`_guid = String`)으로 선언되어 `Util.implements`의 `Type.allowType` 검사 대상이 된다.

| 인터페이스 | 계약 | 구현체 |
| --- | --- | --- |
| `IObject` | `getTypes`, `instanceOf`, `equal` | MetaObject |
| `IMarshal` | `_guid`, `_type`, `getObject`, `setObject` | MetaObject |
| `IElement` | `_name`, `clone` | MetaElement |
| `IList` | `_list`, `count` | BaseCollection, NamespaceManager, *(meta-entity: MetaRow)* |
| `IListControl` | `add`, `del`, `has`, `find` | NamespaceManager |
| `ICollection` | `add`, `remove`, `contains`, `indexOf` | BaseCollection |
| `IArrayCollection` | `insertAt` | ArrayCollection |
| `IPropertyCollection` | `indexToKey` | PropertyCollection |
| `ISerialize` | `output`, `load` | **core 내 없음** / *meta-entity: BaseEntity, MetaSet* |

### 2.6 메타 계층

**`NamespaceManager`** — 점 구분 경로(`Meta.MetaElement`) 트리 저장소.
`addNamespace` / `delNamespace` / `path` (경로 조작), `add` / `del` / `find` / `has` / `getPath` (요소 조작), `_list` / `count` / `allowOverlap` / `_elemTypes`, `output(stringify, space)` / `load(str, parse)` (직렬화).

**`MetaRegistry`** — 전역 싱글턴. `MetaObject` 생성자가 **자동 등록**한다.

| 그룹 | API |
| --- | --- |
| 레지스트리 | `_list`, `count`, `namespace`, `init`, `register`, `release`, `has`, `find`, `isMetaObject` |
| GUID 객체 | `createMetaObject`, `createReferObject`(`{$ref}`), `createNsReferObject`(`{$ns}`), `setMetaObject`(`$set`), `validObject`, `isGuidObject`, `hasGuidObject`, `hasRefer`, `findSetObject`, `transformRefer` |
| 네임스페이스 | `registerClass`, `releaseClass`, `findClass`, `getClass` |
| 직렬화 | `loadMetaObject(str, parse)` |

**`MetaObject`** — 모든 메타 객체의 뿌리. `_guid`(지연 생성), `_type`(생성자 참조), `_ns`, `equal`, `getTypes`, `instanceOf`(문자열/함수, `_UNION` 포함), `getObject(vOpt)` / `setObject(oGuid, origin)`.

`getObject(vOpt)` 3가지 모드가 이 라이브러리의 직렬화 축이다.

| vOpt | `_guid` | `$ref` | 용도 |
| :-: | :-: | :-: | --- |
| 0 | 포함 | 사용 | 참조 구조 (기본) |
| 1 | 포함 | 사용 | 중복 구조 |
| 2 | 제외 | 미사용 | 비교용 — `a.getObject(2)` ≡ `b.getObject(2)` |

**`MetaElement`** — `MetaObject` + `_name`(필수 문자열) + `clone()`.

### 2.7 컬렉션 계층

**`BaseCollection`** (abstract) — 인덱스 접근(`c[0]`)을 `Object.defineProperty` 디스크립터로 구현한다.

- 상태: `$elements`, `$descriptors`, `$event`, `$KEYWORD`(예약어 38개), `_owner`, `_elemTypes`, `_list`, `count`, `length`
- 8개 이벤트: `onAdd`/`onAdded`, `onRemove`/`onRemoved`, `onClear`/`onCleared`, `onChanging`/`onChanged` — before 계열에서 `false` 반환 시 동작 취소
- 공통 동작: `remove`, `removeAt`, `contains`, `indexOf` / 추상: `add`, `clear`, `_remove`
- `_elemTypes` 설정 시 삽입·변경마다 `Type.matchType`으로 요소 타입 강제

**`ArrayCollection`** — `add`, `insertAt(pos, elem, desc)`, `clear`, 고차 메서드 8종(`map`, `filter`, `reduce`, `find`, `forEach`, `some`, `every`, `findIndex`), `entries()`.

**`PropertyCollection`** — 키/인덱스 이중 접근(`c['name']` ≡ `c[0]`). `add(key, elem, desc)`, `keyToIndex`, `indexToKey`, `exists`, `clear`, 동일 고차 메서드 8종(콜백에 `key` 추가 전달), `entries()`(키/값 쌍).

키 규칙: `/^[a-zA-Z_][a-zA-Z0-9_]*/`, `$KEYWORD` 예약어 금지, 중복 금지.

### 2.8 비공개 유틸 — `src/utils/load-namespace.js`

17개 코어 클래스를 `MetaRegistry`에 일괄 등록한다. `index.js`에서 export하지 않지만 `files`에 `src/`가 포함되어 **npm에는 배포된다**. 확장자 없는 상대 import(`'../type'`, `'../i-collection-property'`) 때문에 native Node ESM에서는 로드 실패한다 (초안 문서 8장 참조).

---

## 3. 불필요해 보이는 기능 분석

판정 근거는 3가지다. **(a)** core 내부 사용 여부, **(b)** 하위 패키지(`meta-entity`/`bind-model`/`logic-sql-entity`) 사용 여부, **(c)** 실행 검증 결과.

### 등급 A — 제거 대상 (사용처 없음, 위험 없음)

| # | 대상 | 근거 | 규모 |
| :-: | --- | --- | --- |
| A1 | **`src/temp/` 13개 파일** | `_message.js`, `_message2.js`, `_message4.js`, `_message22.cjs`, `_message-code.js`(50 kB), `__*.d.ts` 등 실험 잔재. import하는 코드 없음. `files: ["src/"]`로 **npm 배포에 포함**됨 | 배포 tarball 135 kB |
| A2 | **`Util.getArrayDepth()`** | core·하위 패키지 어디서도 호출 없음. 소스에 `REVIEW: 필요성 검토 필요!` 주석이 이미 있음 | 15줄 |
| A3 | **`src/locales/core.json`** (`{"CORE":"SUCCESS"}`) | 참조하는 코드 없음. 테스트 픽스처로 보이나 테스트에서도 미참조. rollup `copy`로 `dist/locales/`에도 복사됨 | 2줄 × 2곳 |
| A4 | **`OLD_ENV` 분기** (`util.js` 2곳, `type.js` 1곳) | `Object.create` / `Object.getPrototypeOf`가 없는 환경(IE8 이하)용 shim. 그러나 소스는 이미 `class`, `static field`, top-level `await`, optional chaining, `globalThis`, `Symbol`, `BigInt`를 쓰므로 **그 환경에서는 모듈 로드 자체가 불가능**하다. 즉 도달 불가 분기 | 20줄 + 테스트 4곳 |
| A5 | **`MetaRegistry.loadMetaObject()`** | 내부 0회, 하위 패키지 0회. 소스에 `REVIEW: 필요성 재검토 필요` 주석 존재. 오류 메시지도 존재하지 않는 변수 `str`을 참조 중 | 20줄 |
| A6 | **`temp/` 루트 디렉터리 56개 항목** | `타입샘플2.js`, `챗.test.js`, `starUML.mdj.json` 등 스크래치. `files`에 없어 배포는 안 되지만 저장소·검색·리뷰 노이즈 | 56 항목 |

> A1 + A3만 정리해도 npm tarball에서 약 **135 kB**가 빠진다. `src/temp/`는 `.d.ts` 구버전을 포함하므로 소비자 IDE가 잘못된 선언을 집을 여지도 있다.

### 등급 B — 중복 (제거보다 통합)

| # | 대상 | 근거 | 규모 |
| :-: | --- | --- | --- |
| B1 | **컬렉션 고차 메서드 8종 이중 구현** | `ArrayCollection` 240–415줄과 `PropertyCollection` 324–498줄이 `map/filter/reduce/find/forEach/some/every/findIndex/entries`를 거의 동일하게 반복. 차이는 콜백에 `key`를 넘기는지뿐. 한쪽만 고쳐지면 동작이 갈린다 | 약 175줄 중복 |
| B2 | **`count` / `length`** | `BaseCollection`에서 동일한 getter를 이름만 바꿔 2개 정의. `IList` 계약은 `count`만 요구 | 8줄 |
| B3 | **`_isObject` 8회 / `_isString` 5회 재정의** | 파일마다 같은 3줄 헬퍼를 지역 정의. `type.js`의 `_isObject`만 `RegExp`/`Date`를 제외하는 다른 의미라서 이름이 같고 동작이 다른 상태 | 13곳 |
| B4 | **`EventEmitter` 별칭** | `addListener` = `on`, `removeListener` = `off`. Node 호환 목적이나 하위 패키지 사용 0회 | 2줄 |
| B5 | **`types/ko/` 선언 이중화** | 264 kB 중 128 kB가 한글 사본. 영문 선언 변경 시 수동 동기화가 필요하고, 실제로 `typeObject()`는 `TODO` 상태로 남아 있음 | 128 kB |
| B6 | **`Message.getMessageByCode()`** | `get()`의 내부 단계를 그대로 공개. 외부 사용 0회 | 4줄 |

### 등급 C — 공개 API 축소 검토 (사용처 없음 + 부작용 있음)

| # | 대상 | 근거 |
| :-: | --- | --- |
| C1 | **`Type.typeObject()`** | 내부 0회, 하위 패키지 0회, **테스트 0회**. 그런데 `class` 타입 처리에서 `new ctor()`를 실행한다 — 실행 확인: `Type.typeObject(SideEffect)` 호출 시 생성자가 1회 실행됨. 타입 조회 함수가 인스턴스를 만드는 것은 계약 위반에 가깝다 |
| C2 | **`Type.isMatchType` / `isAllowType`** | boolean 래퍼. 사용 0회. 초안 문서 6번 항목대로 `matchType`과 결과가 갈리는 경우도 있음 |
| C3 | **`NamespaceManager.output()` / `load()`** | 함수를 JSON으로 다루려면 호출자가 `stringify`/`parse`를 직접 주입해야 한다. 하위 패키지 사용 0회. `ISerialize` 계약과 시그니처가 같으면서도 `_UNION`에 선언되어 있지 않음 |
| C4 | **`ISerialize` (core 기준)** | core 내 구현체 없음 — `ns._interface`에 `ISerialize` 미포함을 실행으로 확인. 다만 **`meta-entity`의 `BaseEntity`/`MetaSet`이 `_UNION`에 사용**하므로 제거 불가. "core에는 계약만 있고 구현은 상위에 있다"를 문서로 명시하는 편이 맞다 |
| C5 | **`EventEmitter.isLog`** | `console.log('[이벤트] 이벤트가 밸생하였습니다.')` 한 줄이 전부. 오타(`밸생`) 포함, 한국어 하드코딩, 라이브러리가 소비자 콘솔에 직접 출력. 사용 0회 |
| C6 | **`restoreArrowFunction()`** (`type.js` 157–218) | Babel이 변환한 구조분해 파라미터(`_ref => { let [String] = _ref; ... }`)를 정규식으로 역복원한다. 특정 트랜스파일러 출력 형태에 종속된 62줄이며, 실패 시 타입 검증이 조용히 느슨해진다 |
| C7 | **`Message.resetLang()`** | 사용 0회. `Message.currentLang = Message.defaultLang` 대입과 동일 |

### 등급 D — 기능은 필요하나 계약이 깨져 있음 (제거가 아니라 수정)

| # | 대상 | 실행 검증 결과 |
| :-: | --- | --- |
| D1 | **`reduce()` 초기값 처리** (두 컬렉션 공통) | `acc = acc ? callback(...) : this[i]` 구조라 accumulator가 falsy면 초기값을 버린다. `[5,5].reduce((a)=>a+1, 0)` → **6** (정답 2). `[1,1,5].reduce((a,b)=>a-b, 0)` → **5** (정답 -7). `arguments.length` 기준으로 고쳐야 한다 |
| D2 | **`Symbol.iterator` 부재** | `entries()`는 추가되었으나 컬렉션 자체는 iterable이 아니다. `[...collection]` → `TypeError`. `logic-sql-entity`가 `for (const [k,v] of this.columns.entries())`를 쓰는 것을 보면 순회 수요는 실재한다 |
| D3 | **`Message.importMessage()` prototype pollution** | 실행 확인: `Message.importMessage(JSON.parse('{"__proto__":{"polluted":"yes"}}'))` 후 `({}).polluted === 'yes'`. `_deepMerge`가 `__proto__`를 차단하지 않는다. 공개 API가 외부 JSON을 받으므로 실질 위험 |
| D4 | **`EventEmitter` / `NamespaceManager`의 plain object 맵** | `emitter.on('__proto__', fn)` → `TypeError`. 저장소를 `Object.create(null)` 또는 `Map`으로 바꿔야 한다 |
| D5 | **`extendType()`의 falsy default 손실** | `Type.extendType({$type:'number', default:0})` → `{$type:'number'}`. `default`가 타입 제약의 일부이므로 검증 결과가 달라진다 (초안 문서 3번 항목) |
| D6 | **`MetaRegistry` 무한 증가** | `PropertyCollection` 100개 생성 후 `MetaRegistry.count` 1 → 101. 자동 등록만 있고 해제 시점이 없어 수명이 프로세스와 같다 |

### 제거하면 안 되는 것 (중복처럼 보이지만 필요)

| 대상 | 이유 |
| --- | --- |
| `message-wrap.js` + `message-wrap.bundle.js` | top-level await 지원/미지원 타깃 분리. rollup alias로 교체됨 |
| `load-json.js` + `load-json.cjs` | ESM/CJS 모듈 시스템 차이 (`import()` vs `require`, `import.meta.url` vs `__dirname`) |
| `i-*.js` 9개 | 런타임 검증 대상이며 `_UNION`에 실제로 참조된다. `IList`·`ISerialize`는 하위 패키지에서 직접 import 중 |
| `entries()` | `logic-sql-entity`가 6곳에서 사용 중 (최근 추가된 이유) |
| `getObject(vOpt)` 3모드 | `vOpt=2`가 `MetaObject.equal()`의 비교 기준 |
| `Type.deepEqual` / `matchType` / `isProtoChain` / `allowType` | 하위 패키지 총 19회 사용. `type.js` 분리 시에도 이 4개는 계약 유지 필요 |

---

## 4. 정리 우선순위

| 순서 | 작업 | 위험도 | 효과 |
| :-: | --- | :-: | --- |
| 1 | A1·A3·A6 삭제 (`src/temp/`, `core.json`, `temp/`) | 없음 | 배포 135 kB 감소, 저장소 정리 |
| 2 | D1 `reduce()` 계약 수정 + 회귀 테스트 | 낮음 | 실제 오동작 제거 |
| 3 | D3·D4 `__proto__` 차단, 맵 저장소 교체 | 낮음 | 보안/정합성 |
| 4 | A2·A4·A5·C7 제거 (도달 불가·미사용 코드) | 낮음 | 55줄 감소, 지원 범위 명확화 |
| 5 | B1 컬렉션 고차 메서드 `BaseCollection` 통합 | 중간 | 175줄 중복 제거 |
| 6 | D2 `Symbol.iterator` 추가 | 낮음 | 소비자 편의, `entries()` 보완 |
| 7 | C1·C2·C6 — `type.js` 분리 작업과 함께 결정 | 높음 | 공개 API 변경 → major 필요 |
| 8 | B5 `types/ko/` 생성 자동화 또는 폐지 결정 | 중간 | 유지보수 비용 절감 |

`type.js` 관련 항목(C1·C2·C6, D5)은 초안 문서 6장의 분리 결정 항목과 묶어 처리해야 한다. 단독 제거는 공개 API 파괴이므로 major 버전 변경이 필요하다.

## 5. 검증 방법

본 문서의 판정은 다음으로 재현할 수 있다.

```bash
# 내부 사용 여부
grep -rn "getArrayDepth\|typeObject\|loadMetaObject\|core.json" src/*.js

# 하위 패키지 사용 여부
grep -rho "import {[^}]*} from ['\"]logic-core['\"]" ../meta-entity/src ../bind-model/src ../logic-sql-entity/src

# 배포 포함 파일
npm pack --dry-run

# 동작 검증 (D1, D2, D3, D5, D6)
node -e "import('./index.js').then(({ArrayCollection})=>{const c=new ArrayCollection();c.add(5);c.add(5);console.log(c.reduce((a)=>a+1,0))})"
```
