# logic-core AI 협업 초안

> 상태: 초안  
> 작성일: 2026-08-30  
> 범위: `logic-core` 최상위 모듈 검토 및 향후 `type.js` 분리 준비  
> 비범위: 이 문서는 구현 변경 제안이 아니라, 다음 AI 작업의 공통 맥락과 확인된 문제를 기록한다.

## 1. 프로젝트 역할과 전제

`logic-core`는 `logic-entity`, `bind-model` 등 상위 `logic-*` 패키지가 사용하는 기반 모듈이다. 컬렉션, 메타 객체/레지스트리, 네임스페이스, 이벤트, 메시지/로케일, 인터페이스 검증을 제공한다.

유지해야 할 제약은 다음과 같다.

- 레거시 환경까지 지원하려는 목적이 있으므로, 런타임 문법과 내장 API의 하한을 명시적으로 관리한다.
- 패키지는 ESM과 CommonJS 소비자를 모두 지원한다.
- 브라우저 직접 사용을 위한 UMD 번들을 제공한다.
- `type.js`는 장기적으로 core 내부에 포함하지 않고, 독립 유틸리티로 제공한다. 이 문서 작성 시점에는 **분리 구현을 하지 않는다**.

## 2. 현재 구조 사실

### 공개 진입점과 빌드

| 항목 | 현재 상태 |
| --- | --- |
| 패키지 형식 | `package.json`의 `"type": "module"` |
| ESM 진입점 | `index.js` → `src/*.js` 재수출 |
| CommonJS 진입점 | 조건부 export의 `dist/logic-core.node.cjs` |
| 브라우저 CJS | `dist/logic-core.browser.cjs` |
| CDN | `dist/logic-core.js` / `.min.js` UMD (`globalThis._L`) |
| 브라우저 ESM | `dist/logic-core.esm.js` / `.min.js` |
| 타입 선언 | `types/index.d.ts`, 한국어 선언 `types/ko/` |

루트 진입점은 `Type`도 함께 export한다. 그러나 현재 `exports`에는 `"./type"` 같은 독립 서브패스가 없다. 따라서 사용자는 지금은 `logic-core` 전체를 통해서만 `Type`을 가져온다.

기존 `docs/`는 TypeDoc 생성 결과이며 `.gitignore`에 포함되어 있다. AI와 사람이 관리할 이 초안은 사용자 요청 표기대로 추적 가능한 `doscs/`에 둔다.

### `type.js` 내부 의존과 사용처

`src/type.js`는 `ExtendError`를 import하고, `ExtendError`는 메시지 계층에 의존한다. 따라서 현재 상태의 `type.js`는 독립 유틸리티가 아니라 오류/로케일 계층을 함께 끌고 가는 모듈이다.

core에서 `Type`을 직접 import하는 파일은 다음 6개다.

| 파일 | 현재 용도 |
| --- | --- |
| `src/util.js` | `Util.implements()`의 인터페이스 검증 |
| `src/meta-object.js` | 메타 객체 타입 검증 |
| `src/base-collection.js` | 컬렉션 요소 타입 제약 |
| `src/collection-array.js` | 배열 컬렉션 삽입 시 요소 검증 |
| `src/collection-property.js` | 프로퍼티 컬렉션 삽입 시 요소 검증 |
| `src/namespace-manager.js` | 네임스페이스 요소 타입 검증 |

특히 컬렉션과 네임스페이스는 `Type.matchType([this._elemTypes], value)`를 실행하므로, 단순히 루트 export만 제거해도 내부 결합이 사라지지 않는다.

## 3. ES5 및 모듈 호환성 검토

### 확인된 상태

- UMD 번들은 Rollup + Babel의 `@babel/preset-env`를 거쳐 ES5 출력 옵션을 사용한다.
- Node CJS 번들과 browser CJS 번들은 같은 ES5 변환 경로를 사용하지 않는다.
- 소스와 ESM 진입점은 `import`/`export`를 사용하므로 자체로 ES5 문법이 아니다.
- 소스에는 `class`, `let`/`const`, async/dynamic import, optional chaining 등 ES5 이후 문법도 존재한다.
- `type.js`도 `globalThis`, `Symbol`, `BigInt`, `const`, `let`, 화살표 함수, 템플릿 리터럴을 사용한다.

따라서 현재 설명은 “ES5 문법으로 작성된 소스”보다 “브라우저 UMD 산출물에 ES5 변환을 적용한다”가 정확하다. IE 같은 레거시 엔진을 지원 범위에 포함하려면 문법 변환만으로는 부족하다. `globalThis`, `Symbol`, `BigInt`, Promise/async 런타임, `Object.getPrototypeOf` 등의 API 지원 또는 polyfill 정책도 정해야 한다.

### ESM/CJS에 관한 주의점

현재 ESM/CJS 기본 로딩 테스트는 통과한다. 다만 호환성은 최신 Node/Jest 환경에서 검증된 것이며, 최소 지원 Node 버전·브라우저 목록·CSP 환경은 선언 또는 자동 검증되어 있지 않다. `package.json`에도 `engines`가 없다.

## 4. `type.js` 문제 분석 (수정하지 않음)

### 우선순위 높음

1. 동적 코드 실행 및 CSP 비호환

`_parseFunc()`는 함수 문자열을 정규식으로 해석한 뒤 `new Function()`으로 매개변수와 반환 타입을 평가한다. 이는 엄격한 CSP의 `unsafe-eval` 금지 환경에서 동작하지 않는다. 함수의 `toString()` 표현은 엔진, 트랜스파일러, minifier, bound/native 함수에 따라 달라지므로 타입 계약을 안정적으로 복원하는 방법도 아니다. 파싱 실패 시 예외를 외부로 명확히 내지 않고 빈 매개변수로 축소해 검증이 느슨해질 수 있다.

2. 검증 중 생성자 실행

클래스 비교 옵션(`opt === 1`)과 `typeObject()`는 `new ctor()`로 인스턴스를 만들어 구조를 비교한다. 생성자에 인자가 필요하거나 I/O, 등록, 상태 변경 같은 부작용이 있으면 단순한 타입 검사/직렬화가 실행 동작을 유발한다. 생성자 예외가 타입 오류로 포장되어 원인을 찾기 어려워진다.

확인 예: `Type.typeObject(SideEffect)`를 호출하면 `SideEffect` 생성자가 1회 실행된다.

3. 기본값 `0`, `false`, `''` 손실

확장 타입 객체를 다시 읽는 경로에서 truthy 검사로 `default`를 복사한다. 그래서 다음 값이 사라진다.

```js
Type.extendType({ $type: 'number', default: 0 }); // { $type: 'number' }
Type.extendType({ $type: 'string', default: '' }); // { $type: 'string' }
```

기본값은 타입 제약의 일부이므로, 이 문제는 `matchType`/`allowType`의 결과를 바꿀 수 있다. 존재 여부는 truthiness가 아니라 `undefined`/소유 속성 기준으로 판별해야 한다.

4. 독립 유틸리티로 분리할 수 없는 현재 결합

`type.js → ExtendError → Message` 의존이 남아 있고, core도 앞서 열거한 6개 파일에서 `Type`을 사용한다. 지금의 파일만 패키지 밖으로 이동하면 core의 런타임 의존이 끊긴다. 오류 형식과 검증 책임을 함께 설계하지 않은 파일 이동은 안전하지 않다.

### 우선순위 중간

5. `deepEqual()`의 의미가 일반적인 깊은 동등성과 다름

`Date` 인스턴스는 시각과 무관하게, 서로 다른 정규식은 패턴과 무관하게 `true`가 될 수 있다. 실제 확인 결과는 다음과 같다.

```js
Type.deepEqual(new Date(0), new Date(1)); // true
Type.deepEqual(/a/, /b/);                 // true
```

순환 참조도 처리하지 못하며 getter 접근 시 부작용이 생길 수 있다. 함수는 `toString()` 결과로 비교하므로 번들/압축 여부에 영향을 받는다. 이 함수의 목적을 “단순 plain object/array 비교”로 제한하거나, 지원 타입과 동등성 규칙을 재정의해야 한다.

6. 특수 확장 타입 표현의 비일관성

`{ $type: 'union', ref: { a: String } }` 같은 명시적 확장 타입은 `isAllowType()`와 `isMatchType()`에서 동일하게 처리되지 않는다. 확인 결과 `isAllowType(...)`은 `true`, `isMatchType(..., { a: 'ok' })`은 `false`다. 구현 일부가 정규화된 `eType.ref`가 아닌 원래 `extType[key]`를 읽기 때문이다. 외부에 확장 타입 객체 형식을 허용한다면 정규화 후 그 표현만 참조하도록 통일해야 한다.

7. 클래스/함수 판별이 이름 규칙에 의존

`_KIND`가 없는 함수는 첫 글자가 대문자인지로 class/function을 구분한다. 익명 함수, 축약된 함수명, 번들·minify 후 함수명, 다른 realm의 객체에서 오판할 수 있다. 이 규칙은 API 계약으로 문서화되어 있지 않다.

8. 레거시 런타임 가정과 충돌

`globalThis`를 모듈 최상단에서 바로 참조하고 `Symbol`/`BigInt` 전역 생성자를 직접 비교한다. 해당 전역이 없는 환경에서는 모듈 로드 자체가 실패할 수 있다. UMD의 문법 변환만으로 해결되지 않는다.

9. 객체 모델의 범위가 불명확

`instanceof`와 `Object.getPrototypeOf` 중심 구현은 iframe/VM 등 다른 realm의 내장 객체를 안정적으로 분류하지 못할 수 있다. `Map`, `Set`, typed array, Error, Date 등은 union/object/primitive 객체 범주에서 기대와 다른 결과가 날 수 있다. 지원 대상과 제외 대상을 명시해야 한다.

### 유지보수성 문제

- 1,449줄 단일 파일 안에 타입 정규화, 함수 파싱, 비교, 오류 경로 생성, 기본값 주입이 함께 있다.
- kind 상수와 타입 이름 배열이 여러 함수에 중복되어 있으며, `_EUM_`/주석의 `_EUN_`, `bigi¡nt` 오탈자처럼 표기 불일치가 있다.
- `matchType()`은 union 속성 기본값을 실제 대상 객체에 주입한다. 검증 함수가 입력을 변경한다는 점이 API 이름과 예상에 맞지 않을 수 있다.
- TypeScript 선언의 `typeObject()`는 `TODO` 상태이고, JS에서는 선택인 `getAllProperties`의 두 번째 인자를 선언에서는 필수로 요구한다. 런타임 계약과 선언 계약의 동기화가 필요하다.

## 5. 검증 결과

| 명령 | 결과 |
| --- | --- |
| `npm run build` | 성공; Node CJS, UMD, ESM, browser CJS 산출 |
| `npm test -- --runInBand` | 30 스위트 통과, 763 통과 / 20 skip |
| `npm run check` | 오류 없음; `src/collection-property.js:494` 미사용 변수 경고 1개 |

테스트가 풍부하지만, 다음 범위는 아직 별도 검증이 필요하다.

- 실제 구형 브라우저 또는 최소 Node 버전
- CSP에서 `unsafe-eval`이 없는 환경
- `type.js` 분리 후 core가 타입 모듈 없이 동작하는지
- 생성자 부작용/필수 인자 클래스
- falsy 기본값, 순환 객체, Date/RegExp, cross-realm 객체
- ESM/CJS 소비자가 독립 `type` 서브패스를 호출하는 경우

## 6. 향후 `type.js` 분리 작업의 결정 항목

다음 요청에서 구현하기 전에 아래를 확정한다.

1. 배포 단위: `logic-type` 같은 별도 패키지인지, `logic-core/type` 서브패스인지.
2. core의 정책: 컬렉션/인터페이스의 런타임 타입 검증을 제거할지, 작은 어댑터/peer dependency로 둘지, 검증기를 주입받을지.
3. 오류 정책: `ExtendError`와 메시지 코드에 계속 의존할지, type 유틸리티 자체 오류를 정의할지.
4. 호환성 기준: 실제 최소 Node/브라우저와 polyfill 허용 여부.
5. API 호환성: 기존 `import { Type } from 'logic-core'`를 유지할지. 제거한다면 major version 변경이 필요하다.
6. 타입 표현 계약: 배열/choice/union/class/function의 입력 형식, 기본값 적용 여부, 검증 함수의 입력 불변성.

권장 순서는 “계약과 테스트 고정 → `type.js` 내부 문제 개선 → 독립 배포/서브패스 추가 → core 의존 제거 또는 어댑터화 → major 변경 여부 결정”이다. 이 순서라면 기존 `logic-*` 소비자의 동작 변화를 분리 전후로 비교할 수 있다.

## 7. 다음 AI 요청에 포함하면 좋은 정보

- 목표 최소 런타임(예: IE 11, Node 14 등)
- `Type`의 최종 배포 위치와 기존 import 호환 유지 여부
- 타입 검증 실패 시 필요한 오류 코드/메시지 호환 범위
- 생성자 실행을 금지해도 되는지와 클래스 구조 비교가 필요한 이유
- 새 API에서 허용할 타입(plain object만 / Date, Map, Set 등 포함)
- 변경을 major release로 처리할 수 있는지

## 8. `src` 코드 품질 및 아키텍처 검토 (`type.js` 제외)

> 범위: `src/type.js` 자체의 구현 문제는 이 절에서 다루지 않는다. 다만 다른 src 모듈이 `Type`에 의존하는 구조는 분리 작업의 전제이므로 필요한 범위에서만 언급한다.

### 우선순위 높음

| 문제 | 근거와 영향 | 개선 방향 |
| --- | --- | --- |
| Native ESM으로 로드되지 않는 유틸리티 | `src/utils/load-namespace.js`가 `../type`, `../i-collection-property`처럼 확장자 없는 상대 import를 사용한다. native Node ESM으로 직접 import하면 `ERR_MODULE_NOT_FOUND`가 발생한다. Jest resolver에서는 통과해 실제 소비 환경과 차이가 난다. | 모든 상대 import를 `.js`로 통일하고, Jest 외에 native Node ESM import 테스트를 추가한다. |
| `reduce()` 계약 오류 | `ArrayCollection`과 `PropertyCollection`은 accumulator의 truthiness로 초기값 존재를 판단한다. `0`, `false`, `''` 초기값은 무시된다. | `arguments.length`로 초기값 제공 여부를 판단하고, 빈 컬렉션·초기값 미제공의 표준 reduce 동작을 명시한다. |
| 오류 계층이 로케일 I/O에 결합 | `ExtendError`는 `message-wrap`을 import하고, 일반 wrapper는 top-level `await Message.autoDetect()`를 실행한다. 따라서 오류 클래스를 포함한 다수의 모듈 import가 로케일 감지와 파일/네트워크 로딩에 의존한다. | 오류 코드/오류 객체를 동기적이고 독립적인 저수준 계층으로 두고, 로케일 초기화는 명시적 `initialize()` 또는 앱 시작 단계로 분리한다. |
| 산출물별 초기화 시점 불일치 | `message-wrap.js`는 top-level await를, `message-wrap.bundle.js`는 비동기 IIFE를 사용한다. Rollup alias로 선택되므로 ESM과 UMD에서 로케일 초기화 완료 시점이 달라질 수 있다. | 빌드 설정이 아닌 공개 API 계약으로 초기화 모델을 통일한다. |
| 전역 싱글턴 레지스트리 | `MetaRegistry`는 모듈 전역 `_list`와 하나의 NamespaceManager를 보관하고, MetaObject 생성자는 인스턴스를 자동 등록한다. 객체 수명보다 registry 수명이 길어 메모리 잔류와 테스트/다중 앱 상태 충돌 위험이 있다. | Registry 인스턴스 주입 또는 명시적인 수명·해제 정책을 도입하고, 자동 등록 여부를 선택 가능하게 한다. |

### 구조 및 설계 개선점

1. 컬렉션 구현 중복

`ArrayCollection`과 `PropertyCollection`은 고차 순회 메서드(`map`, `filter`, `reduce`, `find`, `forEach`, `some`, `every`, `findIndex`, `entries`), 직렬화, descriptor 갱신 흐름을 상당 부분 중복 구현한다. 한쪽만 수정되어 동작이 달라질 가능성이 높다.

공통 순회와 저장소 조작을 `BaseCollection` 또는 내부 전략 객체로 모으고, 배열/키 기반 차이만 override하는 구조가 적절하다.

2. API의 실패 표현이 일관되지 않음

일부 메서드는 `ExtendError`를 throw하지만, `clear()`는 오류를 `console.error`로 출력한 뒤 `false`를 반환한다. `add()`도 클래스별로 위치·반환값·예외 포장 방식이 다르다. 호출자는 실패 원인과 복구 가능 여부를 일관되게 판단하기 어렵다.

공개 API 전체에서 “예외를 throw” 또는 “명시적 Result/boolean 반환” 중 하나를 정하고, 콜백 취소와 실제 오류를 구분해야 한다.

3. 라이브러리 내부의 직접적인 console 출력

컬렉션, EventEmitter, Message가 `console.warn`/`console.error`/`console.log`를 직접 호출한다. 이는 소비자 애플리케이션의 로그 정책을 침범하고 테스트 출력도 불안정하게 만든다.

logger 인터페이스 주입, 이벤트, 또는 비활성 기본값의 debug 옵션으로 분리한다.

4. Message 전역 가변 상태와 비동기 경쟁

Message의 static storage와 `currentLang`은 패키지 전체에서 공유한다. `changeLanguage()`는 비동기이므로 동시에 호출되면 현재 언어와 로드된 메시지 상태가 섞일 수 있다. 여러 라이브러리 소비자 또는 서버 요청 간에도 상태가 공유된다.

언어 변경의 순서 보장/취소 정책을 정하거나, Message context를 인스턴스화한다.

5. 안전하지 않은 객체 병합과 맵 저장소

`Message._deepMerge()`는 `source.hasOwnProperty()`에 의존하고 `__proto__` 같은 특수 키를 차단하지 않는다. 공개 `importMessage()`가 외부 객체를 받으므로 prototype pollution 방어가 필요하다. EventEmitter와 NamespaceManager도 일반 `{}`를 맵처럼 사용해 `__proto__`, `constructor` 등의 이벤트/키에서 비정상 동작할 수 있다.

`Object.prototype.hasOwnProperty.call()`을 사용하고, 외부 입력 병합 시 위험 키를 차단한다. 내부 맵은 `Object.create(null)` 또는 `Map`을 사용한다.

6. 전역 이름과 함수명에 의존하는 MetaRegistry

MetaRegistry는 `globalThis[fullName]` 및 `constructor.name`을 lookup/직렬화에 사용한다. 전역 이름 충돌, minify 후 이름 변경, dotted namespace를 단일 전역 속성처럼 해석하는 문제가 발생할 수 있다.

명시적 registry lookup을 기준으로 하고, 전역 fallback은 제거하거나 opt-in 호환 모드로 제한한다. 직렬화 타입 식별자는 안정적인 등록 ID를 사용한다.

7. 작성 문법과 레거시 목표의 혼재

함수 생성자 + IIFE + 대량 `Object.defineProperty`와 `class`, static/public field, optional chaining, top-level await가 한 src 안에 혼재한다. 이는 코드 읽기와 실제 지원 범위 판단을 어렵게 한다.

“작성 문법”, “번들 변환 대상”, “필요 polyfill”, “지원 브라우저/Node 버전”을 분리해 문서화하고 lint/build로 강제한다.

8. 인터페이스가 런타임 구현과 결합

`i-*.js`는 선언 전용 타입이 아니라 런타임 class이며, 추상 메서드가 ExtendError를 throw한다. 인터페이스 계약, 런타임 검증, 메시지 초기화가 낮은 계층까지 연결된다.

선언용 계약과 런타임 검증용 계약을 분리하고, 필요한 경우 작은 validation adapter만 고수준에서 사용한다.

### 구체적인 정합성 및 유지보수 문제

- `MetaElement`의 `_name` setter는 잘못된 값의 타입을 보고할 때 `nVal`이 아니라 `val`을 참조한다.
- `MetaRegistry.loadMetaObject()`의 잘못된 입력 오류는 `p_str`이 아닌 `str`을 참조해 오류 메시지 정보가 부정확하다.
- `PropertyCollection.entries()`에는 사용하지 않는 `item` 지역 변수가 있어 현재 ESLint 경고 1건의 원인이다.
- 대량의 `Object.defineProperty`와 closure 기반 private 상태는 레거시 호환에는 유리할 수 있으나, 확장성·디버깅·상태 불변성 확인 비용을 높인다. 이 패턴을 유지한다면 descriptor 생성과 상태 변경을 작은 내부 함수로 분리해야 한다.
- 문서/주석에 남아 있는 `REVIEW`, 주석 처리된 대안 구현, 철자 오류는 실제 설계 결정과 실험 코드를 구분하기 어렵게 한다. 이슈 트래커 또는 ADR로 옮기고 소스에는 결정된 계약만 남긴다.

### 테스트 공백

현재 테스트는 기본 행위에 강하지만 다음은 별도 보강이 필요하다.

- native Node ESM에서 모든 공개·내부 유틸리티 모듈을 직접 import하는 검사
- `reduce()`의 `0`/`false`/빈 문자열 초기값, 빈 컬렉션 동작
- 동시에 여러 번 실행하는 언어 변경과 초기화 실패/누락 로케일 동작
- `__proto__`, `constructor` 등 특수 키의 Message 병합·이벤트·namespace 처리
- MetaRegistry 수명, 반복 등록/해제, 장시간 실행 시 메모리 보유 정책
- 번들별(ESM, Node CJS, UMD) 로케일 초기화 완료 시점의 동일성

### 권장 정리 순서

1. Message/ExtendError의 초기화와 의존성 방향을 분리한다.
2. `load-namespace`의 native ESM 호환을 복구하고 모듈 로드 테스트를 추가한다.
3. 컬렉션 공통화와 API 오류 정책을 정리하며 `reduce()` 계약을 고정한다.
4. Registry의 수명 관리와 전역 이름 의존을 제거하거나 호환 모드로 격리한다.
5. 레거시 지원 범위와 변환/polyfill 정책을 확정하고 CI에서 검증한다.
