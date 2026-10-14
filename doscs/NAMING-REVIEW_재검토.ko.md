# 명명·클래스 필요성 의견 재검토

> 재검토일: 2026-10-14  
> 원본: [NAMING-REVIEW.ko.md](NAMING-REVIEW.ko.md)  
> 기준: Git `d96dbab`; core 및 로컬 하위 패키지 소스 대조

## 1. 결론

키/값 조회명, 메타 속성의 접두 의미, 오류를 던지는 API 설명을 개선하자는 의견은 타당하다. 그러나 **영어 표현의 선호를 코드 결함으로 취급하거나, 이름이 비슷하다는 이유로 다른 계약을 합치는 권고는 축소**해야 한다. 우선 문서와 별칭으로 예측 가능성을 높이고 실제 개명은 필요성이 확인된 항목에 한정한다.

런타임 루트 export는 22개가 아니라 21개다. Type과 Util은 클래스가 아닌 객체 네임스페이스다. 원문의 "적합 18개 + 부적합 4개"에는 IMarshal이 중복되므로 클래스 평가 개수도 다시 집계해야 한다.

## 2. 클래스명·파일명 판정

| 원본 항목 | 판정 | 재검토 의견 |
| --- | --- | --- |
| N1 ExtendError | 개선 선택지 유지, 개명 보류 | CodedError/LogicError가 구체적일 수 있지만 문법적으로 못 읽는 이름이라는 단정은 과함. 실제 결함은 queue/prop이며 이름 변경으로 해결되지 않음 |
| N2 ISerialize | 별칭 후보 | ISerializable이 능력 계약을 더 잘 표현한다. 공개 export 제거 없이 추가할 수 있음 |
| N3 IMarshal | 유지·계약 설명 보완 | marshaling 자체가 객체 그래프의 전달 표현 변환을 뜻하므로 반드시 부적합하지 않음. GUID 참조 표현과 문자열 직렬화의 차이를 설명하는 것이 우선 |
| N4 IListControl | 통합안 보류 | 이름 개선은 가능하지만 Namespace의 fullName 삭제·요소 반환과 Collection의 값 삭제·인덱스 반환은 다른 계약 |
| 파일명 어순 5개 | 현행 유지 가능 | `collection-*`, `i-collection-*`는 파일을 기능별로 모으는 일관된 규칙이다. 클래스명과 어순이 다르다는 사실만으로 결함은 아님 |

현재 package exports는 `./src/*`를 공개하지 않는다. 따라서 "소스가 npm에 실리므로 bare deep import가 공개 API"라는 설명은 부정확하다. 다만 로컬 상대 경로, 기존 도구, 소스 의존 소비자가 있을 수 있으므로 파일명 변경의 호환 비용이 0인 것도 아니다.

MetaObject/MetaElement 이름은 직렬화 `_type` 및 클래스 등록에도 관여한다. 실제 클래스명을 바꿀 경우 단순 export 별칭만으로 과거 직렬화 데이터를 보존할 수 있는지 따로 검증해야 한다.

## 3. 메서드명 판정

| 원본 항목 | 판정 | 의견 |
| --- | --- | --- |
| contains / exists | 유지 | `hasValue`/`hasKey` 또는 `contains`/`containsKey` 별칭은 유용. 기존 메서드는 유지 |
| remove / del / release | 일부 수정 | 대상이 값·경로·등록 수명으로 다르다. 전부 같은 동사로 바꾸기보다 인자와 효과를 명시 |
| getObject/setObject vs output/load | 기존 설명 보완 | 객체 그래프와 문자열 표현은 서로 다른 계층. 같은 기능의 중복 이름이라고 단정하지 않음 |
| M1 matchType/allowType | assert 별칭 후보 | 실패 시 throw라는 설명은 필요. 서술형 메서드가 반드시 predicate여야 한다는 규칙은 없음 |
| M2 isMatchType/isAllowType | 개명 우선순위 낮음 | 기존 이름을 알고 있는 소비자에게 isMatchedType이 반드시 더 명료하지는 않음. 반환형을 문서화하는 것으로도 개선 가능 |
| M3 validObject | 유지 | boolean과 잘못된 입력에 대한 예외를 구분해 설명하고 isValidObject 별칭 검토 |
| M4 path | getNamespace 별칭 후보 | 저장소 참조 반환은 사실. 복사본으로 바꾸면 기존 가변 참조 계약이 달라지므로 단순 명명 수정과 분리 |
| M5 setMetaObject | 유지 | `$set` 마킹임을 드러내는 link/mark 별칭이 이해에 도움 |
| M6 findSetObject | 유지 | GUID 및 origin에서 등록 객체를 찾는 동작을 먼저 문서화. 새 이름은 실제 참조 해석 범위에 맞춰 선택 |
| M7 Util.implements | 설명 수정 | 인스턴스에 인터페이스 정보를 주입하는 기능은 사실. 그러나 "implements는 술어"라는 단정은 부적절. applyInterfaces는 선택지 |
| M8 _getPathObject | 선택적 개선 | `_splitFullName`은 문자열 분해만 암시하지만 현 구현은 객체를 받아 `getPath`도 호출. 개명 시 입력 계약까지 보존 |

`MetaObject.getObject.length === 1`과 파생 클래스의 length가 2라는 사실은 오류가 아니다. 선택 인자를 기반 메서드가 사용하지 않아도 파생 메서드가 확장할 수 있다. JSDoc에서 `p_owned`의 실제 사용 범위를 설명하면 된다. 형식상의 arity를 맞추려고 쓸모없는 인자를 추가할 필요는 없다.

파라미터 `p_` 접두 혼용은 스타일 문제다. 이름 변경 자체보다 공식 규칙을 정하는 것이 우선이며, 동작 결함 수정과 별도 변경으로 다루는 편이 검토하기 쉽다.

## 4. 속성명 판정

| 항목 | 판정 | 의견 |
| --- | --- | --- |
| `$`가 완전 비공개라는 설명 | 정정 | `$elements`, `$keys`, `$storage`는 JS에서 접근·수정 가능하고 타입 선언에도 노출된다. prefix는 관례일 뿐 접근 제어가 아님 |
| `_` 접두 계약 혼선 | 유지 | `_guid`, `_type`는 직렬화 키이기도 하다. "메타 예약"을 명시하고 읽기·쓰기 권한은 속성별로 설명 |
| `$KEYWORD`의 누적 setter | 유지 | 대입이 append로 동작하므로 명시적 등록 메서드가 더 명료. 기존 setter 제거는 호환 변경 |
| `_elemTypes` 정규화 | 사실 유지·처방 수정 | setter의 정규화 자체는 허용되는 설계. 제거하면 읽히는 값과 기존 choice 구성이 바뀌므로 minor에서 무조건 제거할 사안은 아님 |
| P1 count/length | 제거 권고 철회 | 두 이름을 제공하는 호환·편의 가치가 구현 비용보다 큼 |
| P2 isLog | JSDoc 수정 유지 | emit에서 실제 사용하고 테스트도 있다. "사용 0회라 제거"로 연결하지 않음 |
| P3 namespace | 별칭 후보 | namespaceManager가 반환 타입을 명확히 하지만 현재 이름도 컬렉션/namespace를 나타내는 통상 표현 |
| P4 allowOverlap | 정책 설명 우선 | 현재 뜻은 같은 요소의 여러 경로 등록 허용이다. allowDuplicate가 키 중복 허용으로 오해될 수 있음 |
| P5 _UNION | 문제 설명 정정 | type.js의 `union`은 `{a:String,b:Number}`의 모든 속성을 요구하는 구조체다. 원문처럼 A\|B의 의미로 쓰지 않는다. choice가 선택 관계다 |
| P6 _PARAMS | 별칭/설명 후보 | 생성자 파라미터명이라는 설명이 유용. 실제 키 변경은 복원 코드·상위 클래스 관례와 함께 검증 |
| P7 _EUM_ | 오탈자 개선 유지 | 공개 DSL 토큰이므로 `_ENUM_` 추가 시 양쪽 검사기·선언·메시지·출력 표현을 함께 검증. "한 버전 뒤 제거"보다 major 정책 명시 |

이름 자체보다 더 시급한 예약어 문제도 있다. `new PropertyCollection().add('map', 1)`은 성공하고 `map`을 숫자로 덮어쓴다. 새로운 문자열 API나 protected 훅을 추가할 때도 키 충돌을 함께 검토해야 한다. [컬렉션 재검토](COLLECTION-DESIGN-REVIEW_재검토.ko.md)

## 5. 필요성과 사용량 근거 재검토

현재 확인 가능한 경로는 `logic-entity`, `logic-bind-model`, `logic-sql-entity`다. `src/**/*.js`에서 temp를 제외하고 단어 경계로 문자열 출현을 다시 집계했다. import·주석도 포함한 검색 수이며 실제 호출 횟수는 아니다.

| 검색어 | logic-entity | logic-bind-model | logic-sql-entity |
| --- | ---: | ---: | ---: |
| ExtendError | 170 | 156 | 30 |
| Type | 23 | 11 | 1 |
| MetaRegistry | 55 | 14 | 0 |
| PropertyCollection | 12 | 27 | 6 |
| NamespaceManager | 0 | 0 | 0 |

따라서 원문의 361회 등 숫자를 현재 변경 비용의 확정 근거로 재사용하지 않는다. NamespaceManager 직접 import가 없어도 `MetaRegistry.namespace`를 통해 사용하며, 외부 사용자 전체를 검색한 것도 아니다. 이 수치로 export 제거의 안전성을 판단할 수 없다.

MetaRegistry가 등록·GUID 복원·클래스 이름 해석을 함께 담당한다는 분석은 유지한다. 다만 책임을 내부 helper로 분리하고 기존 facade를 유지하면 공개 API를 즉시 깨뜨릴 필요는 없다. 항상 major가 필요하거나 반드시 type.js 분리와 한 번에 진행해야 하는 작업도 아니다.

권장 순서는 **잘못된 JSDoc/계약 설명 수정 → 필요한 별칭 추가 → 사용·복원 호환성 검증 → 선택적 major 개편**이다. 단순 개명이나 공개 표면 축소를 목표로 대규모 리팩터링을 추진하는 권고는 보류한다.
