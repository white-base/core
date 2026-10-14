# 기능 분석 의견 재검토

> 재검토일: 2026-10-14  
> 원본: [LOGIC-CORE-FEATURES.ko.md](LOGIC-CORE-FEATURES.ko.md)  
> 기준: `logic-core` 1.1.4 / Git `d96dbab`  
> 검증 환경 및 전체 결과: [공통 기준선](AI-COLLABORATION-DRAFT_재검토.ko.md#2-공통-검증-기준선)

## 1. 결론

기능 카탈로그는 대체로 정확하다. 하지만 **"저장소와 확인한 소비자에서 미사용"을 "제거해도 위험 없음"으로 바꾸는 분류는 수정해야 한다.** 공개 export, 타입 선언, 테스트, 직렬화 형식은 실제 사용 검색과 별도로 호환 계약을 만든다.

## 2. 카탈로그에서 수정할 설명

| 원본 설명 | 재검토 의견 |
| --- | --- |
| 공개 export 22개 | 런타임은 21개. 타입 선언은 생성자 타입 등 별도 export가 있으므로 동일 숫자로 합산하지 않음 |
| src 25개 모듈 | 집계 범위 명시 필요. 루트 `.js`는 24개, `locales/default.js`·`utils/load-namespace.js` 포함 및 temp 제외 시 26개. `.cjs` 포함 여부도 구분 |
| 메시지 277개 코드 | 277개 **키**다. 구분선 45개와 언어 표식도 포함하므로 모두 실제 진단 메시지는 아님 |
| `getArrayDepth`는 최대 중첩 깊이 | `util.js:36`은 첫 요소만 재귀 검사. `[[], [[[]]]]`는 실제 최대 깊이 4인데 결과는 2 |
| 모든 before 이벤트에서 false로 취소 가능 | add/remove/clear는 확인하지만 changing은 반환값을 무시. 선언과 구현 불일치 |
| emit의 리스너 false 반환은 즉시 중단 | 일반 on은 맞음. once wrapper는 반환값을 버려 동일 보장이 안 됨 |
| 타입 관련 API의 내부 사용 표시 | 직접 소비자 호출과 type.js 내부 재귀 호출을 구분. `meta-object.js`의 용도는 `deepEqual` |
| 두 wrapper 및 두 loader는 반드시 필요 | **현 빌드 구성**을 유지할 때 필요. 동기 초기화·환경별 loader로 바꾸면 구현 이중화는 축소 가능 |
| `prop`은 오류 체인에 유지됨 | 첫 오류 문자열에는 붙지만 `.prop`은 `{}`이고 wrap 시 소실됨 |
| 키 정규식이 식별자 규칙을 보장 | 끝의 `$`가 없어 `'ok-bad'`도 통과. 예약어 목록에는 `'map'` 등 새 메서드가 빠짐 |

## 3. A 등급: 삭제 대상 재평가

| 항목 | 판정 | 의견 |
| --- | --- | --- |
| A1 `src/temp/` | 배포 제외 우선 | 13파일이 발행 대상인 사실은 확인. scratch 원본 삭제와 npm 제외는 별개다. 소유자 의도 확인 없이 파일 삭제까지 "위험 없음"으로 분류하지 않음 |
| A2 `Util.getArrayDepth` | 삭제 보류 | 공개 API이며 `test/util.test.js:45`에서 검증한다. 실제 깊이 계산 결함을 먼저 기록하고 수정/폐기는 버전 정책으로 결정 |
| A3 `core.json` | 정리 후보 유지 | 직접 참조는 확인되지 않는다. 동적 경로 API·하위 패키지의 경로 사용까지 확인한 후 제외/삭제 |
| A4 `OLD_ENV` | 정리 방향 유지 | 현대 지원 정책과 안 맞는 fallback이다. 다만 테스트가 전역을 설정해 도달하므로 "도달 불가"는 부정확 |
| A5 `MetaRegistry.loadMetaObject` | 삭제 권고 철회 | 공개 API이고 `test/meta-registry.test.js:831` 이후 정상·오류·사용자 parse 사례가 있다. 사용 검색 0건으로 안전 삭제를 증명할 수 없음 |
| A6 루트 `temp/` | 별도 정리 과제 | 배포 대상은 아니다. 실험·설계 자료의 보존 가치를 검토할 작업이며 기능 결함 해결보다 우선할 이유는 부족 |

`src/temp/`의 135,619B는 전개 크기다. 삭제했을 때 압축 tarball이 같은 크기만큼 줄어든다는 원문 설명은 정정한다.

## 4. B 등급: 중복 재평가

| 항목 | 판정 | 의견 |
| --- | --- | --- |
| B1 고차 메서드 | 유지 | 콜백 메서드 8종 + entries 1종이 중복. 순회 계약 고정 후 공통화 |
| B2 count/length | 제거 권고 보류 | 구현 8줄 중복보다 배열 유사 API의 편의와 호환 이점이 크다. 내부에서도 length를 사용 |
| B3 지역 헬퍼 중복 | 조건부 유지 | `_isObject`는 파일마다 배열·Date·RegExp 포함 정책이 다르다. 이름이 같다는 이유로 동일 함수로 합치면 의미가 달라짐 |
| B4 이벤트 별칭 | 유지 권장 | 2줄 제거 이득은 작고 공개 API 파괴 비용은 있다. Node와 완전 동작 호환이라는 뜻은 아님 |
| B5 한국어 선언 | 생성 자동화 권장 | 한국어 개발자 지원 목적이 있다. 계약 구조 동기화와 설명 번역의 관리 문제로 다루며 폐지를 기본값으로 두지 않음 |
| B6 getMessageByCode | 유지 | raw template 조회와 치환·코드 머리말이 포함된 get은 결과가 다르다. 테스트도 존재 |

## 5. C 등급: 공개 표면 재평가

| 항목 | 판정 | 의견 |
| --- | --- | --- |
| C1 typeObject | 결함 수정 또는 명세 축소 | 생성자 실행, `_TYPE.params` 변경, JSON 왕복 불가를 재현. 테스트 공백은 사실이지만 즉시 제거의 근거는 아님 |
| C2 boolean 래퍼 | 유지 | throwing API와 사용 목적이 다르다. `isMatchType`과 `matchType`은 같은 `_execMatch`, allow 쌍은 같은 `_execAllow`를 사용한다. match와 allow 결과 차이는 래퍼 결함의 증거가 아님 |
| C3 namespace output/load | 유지·설명 보완 | 사용자 serializer 주입은 함수·특수 값을 지원하기 위한 확장점이다. `ISerialize` 미선언만으로 기능이 불필요해지지는 않음 |
| C4 ISerialize | 유지 | 상위 `logic-entity`의 실제 계약이다. core가 구현체를 제공하지 않는다는 점을 문서화 |
| C5 isLog | 개선 후보 | `emit`에서 실제 읽고 `test/event-emitter.test.js:42`에서도 검증한다. 기본 false라 상시 콘솔 출력도 아님. 오탈자·logger 주입은 별도 개선 |
| C6 restoreArrowFunction | 유지보수 위험 유지 | 함수 소스 파싱과 함께 호환 정책을 결정. 즉시 삭제는 기존 함수 시그니처 검사에 영향 |
| C7 resetLang | 유지 | 단순 wrapper라도 공개 API와 테스트가 있다. 1줄 절약을 이유로 삭제하지 않음 |

## 6. D 등급: 실제 결함 재확인

| 항목 | 판정 | 실행 결과 및 보완 |
| --- | --- | --- |
| D1 reduce | 수정 필요 | 양쪽 모두 `[1,1,5]`, 초기값 0, 뺄셈 reducer 결과 5. 표준 배열 결과는 -7. 중간 accumulator가 0이 되는 경우도 영향 |
| D2 iterable 부재 | 기능 제안 | `Symbol.iterator` 없음은 사실이나 현재 계약 위반은 아님. entries는 배열을 반환해 이미 for-of 가능 |
| D3 Message 병합 | 수정 필요 | JSON의 `__proto__`를 병합하면 `Object.prototype` 오염. 정적 로케일 전환 여부와 독립적으로 방어 필요 |
| D4 plain object 맵 | 수정 필요·우선순위 상향 | EventEmitter 특수 이벤트명 TypeError뿐 아니라 NamespaceManager의 특수 경로로 전역 프로토타입 오염도 재현 |
| D5 falsy default | 수정 필요 | special type 객체의 0/false/빈 문자열 기본값 소실. 직접 리터럴 기본값 경로와 구분 |
| D6 Registry 증가 | 설명 정정 | 자동 등록·강한 참조 보관은 사실. 그러나 `release()`와 `init()`이 있어 "해제 기능 없음"은 틀림. 자동 해제/스코프 정책이 없는 문제 |

Registry는 객체 하나 생성 후 count=1, `release(obj)`는 true, 이후 count=0이었다. 이것은 명시적 해제가 동작함을 보여준다. 장기 메모리 누수의 규모나 상위 앱의 실제 해제 누락까지 측정한 결과는 아니다.

## 7. 빠진 계약 결함

- `base-collection.js:430`: `onChanging` 취소 반환값 미확인.
- `collection-array.js:151`: 취소된 삽입에서도 add가 위치를 반환.
- `event-emitter.js:114`: once 콜백의 false가 emit으로 전달되지 않음.
- `collection-property.js:196,203`: 불완전한 키 검증과 API 이름 충돌. `'map'` 등록 후 `typeof collection.map === 'number'`가 된다.

이 결함들은 클래스 재편 없이도 독립적으로 수정할 수 있다. 기존 우선순위의 "미사용 삭제 먼저" 대신 **입력 안전성·데이터 처리·이벤트 계약 → 배포 정리 → 내부 공통화 → 공개 API 개편** 순서를 권한다.

핵심 사례는 [공통 재현 명령](AI-COLLABORATION-DRAFT_재검토.ko.md#6-핵심-재현-명령), 콜백·직렬화의 상세 조건은 [컬렉션 재검토](COLLECTION-DESIGN-REVIEW_재검토.ko.md)에 기록했다. 하위 패키지 사용은 소스를 읽어 확인했으며 전체 회귀 테스트는 실행하지 않았다.
