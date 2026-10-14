# AI 협업 초안 재검토

> 재검토일: 2026-10-14 (Asia/Seoul)  
> 원본: [AI-COLLABORATION-DRAFT.ko.md](AI-COLLABORATION-DRAFT.ko.md)  
> 기준: `logic-core` 1.1.4, Git `d96dbab`, 현재 작업 트리  
> 범위: 기존 의견의 사실관계·개선안·호환성 재검토. 구현 변경은 이번 작업에 포함하지 않는다.

## 1. 재검토 결론

기존 초안의 주요 결함 지적은 유효하다. 다만 **재현된 결함, 유지보수상의 선호, 지원 정책의 결정**을 분리해야 한다. 특히 공개 API의 미사용 여부만으로 삭제를 결정하거나, 타입 모듈 분리를 단순 파일 이동으로 취급하면 안 된다.

검토 원본은 `doscs/`에 있다. `docs/`는 `.gitignore` 대상인 TypeDoc 생성물이다. 원본을 보존하고 파일명의 `.ko.md` 앞에 `_재검토`를 붙였다.

| 재검토 파일 | 주요 의견 |
| --- | --- |
| [기능 분석](LOGIC-CORE-FEATURES_재검토.ko.md) | 미사용과 삭제 가능성을 구분하고 A~D 등급의 근거를 수정 |
| [명명](NAMING-REVIEW_재검토.ko.md) | 실제 계약 차이를 유지하며 과도한 개명·통합 권고를 축소 |
| [컬렉션](COLLECTION-DESIGN-REVIEW_재검토.ko.md) | 공통화 방향은 유지하되 콜백·스냅샷·확장 계약 보존 조건 추가 |
| [오류](EXTEND-ERROR-REVIEW_재검토.ko.md) | 큐 오염·prop 소실 확인, 성능 수치와 sentinel 수정안 재평가 |
| [메시지·다국어](MESSAGE-I18N-REVIEW_재검토.ko.md) | 정적 로케일 방향 유지, 호환성·보안·외부 비교 주장 수정 |
| [빌드·배포](BUILD-PUBLISH-REVIEW_재검토.ko.md) | CJS 문법 수준 및 `.d.cts` 단순 복사 수정안의 오류 확인 |
| [타입 명세](TYPE-SPEC_재검토.ko.md) | special type·JSON 왕복·인터페이스 검사 예제 및 분리 난이도 수정 |

## 2. 공통 검증 기준선

Node.js `v22.16.0`, 로컬 TypeScript `5.4.5`에서 확인했다. 소스의 직접 실행, Jest, 번들 파싱, 임시 소비자 컴파일은 서로 다른 검증이다.

| 검증 | 이번 결과 | 해석 |
| --- | --- | --- |
| `npm test -- --runInBand` | 30 스위트·763 항목 통과 / 20 skip, **종료 코드 1** | 종료 뒤 비동기 console 경고 발생; 명령 성공과 구분 |
| `npm run check` | 오류 0, 경고 1 | `collection-property.js:494`의 미사용 `item` |
| `npm run build` | 산출물 6종 생성 성공 | 빌드 성공이 목표 문법·런타임 지원을 보증하지는 않음 |
| acorn으로 산출물 파싱 | UMD: ES2020, CJS 2종 및 ESM 2종: ES2022 | 상세는 빌드 재검토 문서 |
| Node 패키지 해석 | ESM/CJS/`./ko` 각각 21개 export | 기존 문서의 22개 표기는 수정 |
| CJS 소비자, `moduleResolution: node16` | TS1479 재현 | 기존 Jest TS 테스트만으로 확인되지 않는 계약 문제 |
| `.d.cts` 진입점만 복사한 수정안 | `skipLibCheck: false`에서 여전히 TS1479 | 내부 재수출 선언의 모듈 형식도 맞춰야 함 |
| native ESM으로 `src/utils/load-namespace.js` import | `ERR_MODULE_NOT_FOUND` | Jest resolver가 가리는 확장자 누락 |
| 임시 복사본의 npm pack dry-run | 107파일, 압축 670,782B, 전개 3,878,373B | `src/temp/` 13파일·135,619B 포함 |

Jest는 `Cannot log after tests are done`과 `Path './locales/ko.json' does not have a file.`을 출력했다. `LANG=en_US.UTF-8`로 고정한 재실행에서도 30/763/20 및 종료 코드 1이었다. 테스트 자체가 언어 설정을 변경하고 번들 wrapper가 비동기 초기화를 기다리지 않는 경로가 있으므로, 이 결과를 "전체 테스트 명령 성공"으로 기록하면 안 된다.

빌드는 임시 복사본에서도 확인했다. pack 검증의 `prepare` 훅이 작업 트리의 무시된 `dist/`도 재생성했다. `src/`, `types/`, 설정 및 검토 원본은 수정하지 않았다. 기본 npm 캐시의 쓰기 제한으로 첫 pack은 실패했고, `/private/tmp`의 별도 캐시를 사용한 임시 복사본에서는 성공했다.

지원 하한 Node/브라우저, 실제 CSP 브라우저, webpack/Vite 소비자 빌드, 하위 패키지 전체 테스트는 이번에 실행하지 않았다. 해당 영역의 단정과 수치 예측은 확인된 결과로 표시하지 않았다.

## 3. 초안 의견별 판정

| 원본 항목 | 판정 | 재검토 의견과 근거 |
| --- | --- | --- |
| §2 Type 직접 의존 6개 | 유지·용도 정정 | 6개 파일은 맞다. `meta-object.js:106`의 직접 용도는 타입 검증이 아니라 `deepEqual`이다. |
| §3 UMD에 ES5 변환 적용 | 보완 | 변환 설정은 있지만 결과는 ES5 파싱에 실패한다. CJS도 클래스 필드가 남아 ES2022 파싱이 필요하다. |
| §4-1 함수 소스 평가 / CSP | 유지 | `type.js:228` 이후 `new Function` 사용. 실제 CSP 브라우저를 실행한 결과와는 구분한다. |
| §4-2 생성자 실행 | 유지 | `typeObject(SideEffect)`에서 생성자 1회 실행을 재현했다. `opt=1` 구조 검사도 생성 경로가 있다. |
| §4-3 falsy 기본값 | 유지·범위 한정 | `$type` 객체를 읽는 `type.js:647`의 truthy 복사가 문제다. 리터럴 `0` 자체를 정규화하는 경로까지 항상 손실되는 것은 아니다. |
| §4-4 분리 결합 | 유지 | 직접 import는 ExtendError 하나여도 메시지 초기화·오류 코드·인터페이스 관례가 전이된다. |
| §4-5 deepEqual | 유지 | 다른 Date/RegExp뿐 아니라 내용이 다른 Map도 `true`. 순환 참조·getter 정책도 필요하다. |
| §4-6 allow와 match 차이 | 근거 재해석 | 서로 다른 검사 축의 결과 차이 자체가 버그는 아니다. special union의 `matchType`이 잘못된 필드를 읽는 구체적 결함으로 설명해야 한다. |
| §4-7~9 이름·전역·객체 모델 | 유지 | 함수명 분류, `globalThis`, `Symbol`/`BigInt` 직접 참조, realm 의존이 있다. |
| §5 기존 테스트 결과 | 수정 | 항목 집계는 같은 30/763/20이지만 이번 두 실행의 명령 종료 코드는 1이다. 기존 성공 결론을 현재 기준선으로 재사용하지 않는다. |
| §8 공통화·싱글턴·초기화 | 유지·조건 추가 | 방향은 타당하다. 즉시 수명 정책을 정할 필요와 구조를 전면 교체할 필요는 별개다. |
| §8 전체 API의 실패 표현 하나로 통일 | 수정 | 취소는 `false`/`-1`, 잘못된 입력은 예외처럼 의도적인 구분이 가능하다. 모든 API의 반환 형식을 바꾸기보다 연산별 계약을 명시한다. |
| §8 `typeof val` / `typeof str` | 유지·정밀화 | 오기 때문에 실제 입력형 대신 `undefined`가 표시된다. `typeof`이므로 미선언 변수 참조가 즉시 ReferenceError를 던지는 경우와 다르다. |

`Object.getPrototypeOf`는 ES5 API다. `globalThis`, Promise, BigInt 같은 후속 API와 묶어 모두 ES5 이후 기능으로 설명하지 않는다.

## 4. 기존 검토에 추가할 실제 결함

| 우선순위 | 재현 결과 | 근거 |
| --- | --- | --- |
| 높음 | `NamespaceManager.add('__proto__.logicCoreReview', 123)` 뒤 일반 객체에서 같은 속성이 보임 | `namespace-manager.js:214` 이후 상속된 경로를 그대로 순회 |
| 높음 | `onChanging = () => false`여도 `c[0]` 값이 변경됨 | `base-collection.js:430`에서 반환값 미확인; 타입 선언의 취소 계약과 충돌 |
| 중간 | ArrayCollection.add가 취소돼 count=0인데 위치 `0`을 반환 | `collection-array.js:151`이 `insertAt`의 `false`를 버림 |
| 중간 | `once` 리스너가 `false`를 반환해도 다음 리스너가 실행됨 | `event-emitter.js:114`에서 원래 콜백 반환값 미반환 |
| 중간 | PropertyCollection에 `'map'` 키를 추가하면 순회 메서드를 값으로 덮어씀 | `collection-property.js:203` 예약어 목록 누락, `exists`는 own 속성만 검사 |
| 중간 | `Type.typeObject(fn)`이 `fn._TYPE.params` 배열을 변경 | `type.js:536,553`의 참조 재사용 |
| 중간 | null prototype 객체를 이름 치환값으로 주면 TypeError | `message.js:58`의 직접 `hasOwnProperty` 호출 |

이는 이번에 재현한 사례이며, 전체 결함 목록이라는 의미는 아니다.

## 5. 권장 작업 순서에 대한 의견

1. 프로토타입 오염, falsy 값 처리, 큐 공유, 잘못된 메시지 키 등 재현된 결함을 작게 수정한다. 이벤트 취소 계약도 이 단계에서 고정한다.
2. ESM/CJS 타입 선언과 브라우저 로더를 산출물별로 검증한다. 문법 목표·런타임 API·지원 환경을 별도로 정한다.
3. 공개 API를 유지하며 컬렉션 반복 구현과 Message 초기화를 정리한다. 기존 동작과 의도적인 변경을 테스트로 구분한다.
4. 그다음 타입 검사기 분리·레지스트리 인스턴스화·개명을 검토한다. 결함 수정과 전체 아키텍처 변경을 한 번에 묶지 않는다.

초안은 "core에서 Type 제거"와 "어댑터로 계속 검증"을 선택지로 남겼지만 TYPE-SPEC은 후자를 확정한 듯 서술한다. 독립 배포와 core의 검증 의존 제거는 서로 다른 목표다. 이번 재검토에서는 어느 쪽도 구현 결정으로 확정하지 않는다.

## 6. 핵심 재현 명령

프로젝트 루트에서 실행한다. 프로토타입 오염 예제는 별도 Node 프로세스에서만 실행하고 생성한 속성을 바로 삭제한다.

```bash
npm test -- --runInBand
npm run check
LANG=en_US.UTF-8 node --input-type=module <<'JS'
import { Type, ArrayCollection, ExtendError, NamespaceManager } from './index.js';
const c = new ArrayCollection();
[1, 1, 5].forEach(v => c.add(v));
console.log(c.reduce((a, b) => a - b, 0)); // 5, 기대값 -7
const base = new ExtendError('base');
new ExtendError('A', base);
console.log(new ExtendError('B', base).message); // A까지 섞임
console.log(Type.isMatchType(Object, {})); // false
const ns = new NamespaceManager();
try {
  ns.add('__proto__.logicCoreReview', 123);
  console.log(({}).logicCoreReview); // 123
} finally { delete Object.prototype.logicCoreReview; }
JS
```

하위 패키지는 현재 `../logic-entity`, `../logic-bind-model`, `../logic-sql-entity`의 소스를 읽어 확인했다. 원문의 `meta-entity`, `bind-model` 경로와 다르다. 단순 문자열 출현 횟수에는 import·주석·문자열도 포함되므로, 사용량이나 변경 비용의 정량 지표로 취급하지 않는다.
