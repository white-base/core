# 컬렉션 계층 분리 의견 재검토

> 재검토일: 2026-10-14  
> 원본: [COLLECTION-DESIGN-REVIEW.ko.md](COLLECTION-DESIGN-REVIEW.ko.md)  
> 기준: Git `d96dbab`; core 및 `../logic-entity/src` 대조

## 1. 결론

ArrayCollection/PropertyCollection을 유지하며 공통 구현을 줄이자는 방향은 타당하다. 그러나 **"차이는 키 하나", "훅 몇 개면 차이 전부", "1~2단계는 하위 영향 없음"은 과도한 단정**이다. 오류 코드, 취소 결과, 디스크립터, 키 제약, 콜백 및 복원 순서까지 계약의 일부다.

재사용 위치는 BaseCollection만 가능한 것이 아니다. 내부 순회 helper를 먼저 공유하고 구체 클래스의 공개 메서드를 유지하는 안도 유효하다. 새 protected API를 늘리기 전에 이 선택지를 비교하는 것이 좋다.

## 2. 기존 지적별 판정

| 원본 항목 | 판정 | 재검토 의견 |
| --- | --- | --- |
| §2 두 계열 유지 | 유지 | `_UNION`, `_type`, 상위 패키지의 ArrayCollection 분기가 존재 |
| §3-1 고차 메서드 중복 | 유지 | 콜백 메서드 8개와 entries가 반복되고 reduce 결함도 양쪽에 있음 |
| §3-1 O(n²) | 유지·정밀화 | 반복마다 길이 n의 `_list` 복사. 최악 시간·누적 복사량은 O(n²). 실제 배열 생성 횟수와 상주 메모리를 모두 O(n²)라고 말하면 안 됨 |
| §3-2 p_enum 누출 | 설계 선택 | enumerable은 일반 descriptor 속성이다. Array 파생이 인자를 생략한다고 시그니처 불일치 결함이 생기지는 않음 |
| §3-3 ICollection.add 사용 불가 | 수정 | 호출은 가능하고 선언은 `add(...args:any[]):number`. 문제는 값 추가와 키/값 추가에 공통된 의미·타입 안전성이 없다는 점 |
| §3-4 키 기반 삭제 부재 | 유지 | remove는 값 기준. 신규 `removeByKey`가 기존 remove 의미를 바꾸는 것보다 명확 |
| §4 안 B 유일 권고 | 완화 | 내부 helper, Base 공통화, 전략 합성 모두 가능. 클래스 동일성을 보존하는 내부 합성까지 불가능한 것은 아님 |
| §4-2 p_enum 제거 | 제목 정정 | 제안 본문도 `_getPropDescriptor(idx, enum)`을 유지한다. 실제 제안은 호출 책임의 국소화 |
| §6 키 순서 유지면 스냅샷 통과 | 불충분 | GUID/ref 공유·owner·descriptor·이벤트·실패 시 상태까지 검증해야 함 |

`../logic-entity/src/trans-queue.js:42`의 ArrayCollection 분기와 `base-column-collection.js:76`, `collection-meta-row.js:40`, `collection-transaction.js:80`의 descriptor override는 현재도 존재한다. 상위 패키지 전체 테스트는 이번에 실행하지 않았다.

## 3. 원안에 빠진 순회 계약

### 콜백 인자 수

| API | ArrayCollection | PropertyCollection |
| --- | --- | --- |
| map/filter/find/forEach/some/every/findIndex | `(value,index,list)` — 3개 | `(value,index,key,list)` — 4개 |
| reduce | `(acc,value,index,list)` — 4개 | `(acc,value,index,key,list)` — 5개 |

원문의 "Array 3개, Property 4개를 절대 유지"는 reduce에는 적용되지 않는다. `_cbArgs(i,list)`만으로 모든 메서드를 동일 구현할 수 없으며 reducer의 accumulator 처리가 별도로 필요하다.

### `_list` 캐싱은 관찰 가능한 변경

현재 map의 콜백 두 번에 전달되는 list는 서로 다른 배열이다. 앞선 콜백이 컬렉션 값을 바꾸면 다음 콜백의 list는 바뀐 값을 반영한다. 원안처럼 시작 시 한 번만 복사하면 두 조건이 모두 달라진다.

```js
const c = new ArrayCollection(); c.add(1); c.add(2);
const lists = [];
c.map((value, index, list) => {
  lists.push(list);
  if (index === 0) c[1] = 9;
});
// 현재: lists[0] !== lists[1], lists[0][1] === 2, lists[1][1] === 9
// 최초 스냅샷 재사용안: 같은 배열, 두 번 모두 list[1] === 2
```

캐싱 방향을 반대하는 것이 아니라 순회 중 변경·snapshot identity 정책을 먼저 정하자는 의견이다. `_list` 대신 `$elements` 참조를 넘기면 콜백이 내부 저장소를 직접 수정할 수도 있어 또 다른 변경이다.

`find`, `some`, `every`는 조기 종료하므로 항상 n²번 작업한다고 표현하지 않는다. `entries`는 콜백이 없고 양쪽에서 반복적인 복사가 확인되므로 우선 개선 후보가 된다.

### reducer와 thisArg

`acc`의 truthiness 대신 초기값의 제공 여부를 판별해야 한다. 빈 컬렉션에서 초기값 미제공, 명시적 undefined, 첫 요소가 0, 중간 계산 결과가 false/빈 문자열인 사례도 포함한다.

현재 `thisArg || this`는 0/false/빈 문자열을 컬렉션으로 대체한다. 이를 표준 Array와 맞추는 일은 중복 제거와 별개인 동작 변경이다. 원안 코드도 같은 동작을 유지하므로 이 문제는 자동 해결되지 않는다.

## 4. 공통화보다 먼저 다룰 실제 결함

| 사례 | 현재 결과 | 근거 |
| --- | --- | --- |
| `[1,1,5]`, 초기값 0, `(a,b)=>a-b` | 두 컬렉션 모두 5, 기대값 -7 | array:296 / property:377 |
| `onChanging=()=>false` 후 인덱스 대입 | 값이 변경됨 | base:430 반환값 무시 |
| Array `onAdd=()=>false; add(x)` | count는 0이나 반환은 0 | array:151~154 |
| Property `onAdd=()=>false; add('x',x)` | count 0, 반환 -1 | property:217 |
| Property `add('map',1)` | 성공 후 map 메서드가 숫자가 됨 | property:203 예약어 누락 |
| Property `add('ok-bad',1)` | 성공 | property:196 정규식 끝 앵커 누락 |

새 `_keyAt`, `_cbArgs`, `_defineAccessor`도 문자열 프로퍼티이므로 기존 허용 키와 충돌할 수 있다. 예약어 확장은 필요할 수 있지만 과거 입력을 새로 거절하는 변경이라는 점을 기록해야 한다.

`remove(key)`라는 오버로드는 문자열 **값**을 지우던 기존 의미와 충돌한다. 별도 이름을 추가하고 중복 값·없는 키·취소 시 반환을 정하는 편을 권한다.

## 5. 직렬화·재인덱싱 공통화의 조건

getObject의 `_desc`, `_elem` 반복은 공통화할 수 있다. 그러나 setObject는 단순 복사 루프 이상이다.

- Base의 `setObject`는 clear, owner 조회, 이벤트 저장소, 요소 타입을 복원한다. clear 취소·실패 후 처리를 지금도 명시적으로 확인하지 않으므로 공통화 시 부분 복원 상태를 검토한다.
- Property는 `_elem/_key/_desc` 길이를 검사하고 키를 먼저 준비한다. 잘못된 키·예약어·중복 키가 역직렬화에서 어떻게 처리되는지도 정해야 한다.
- `_defineAccessor`의 신규 예제는 저장된 custom descriptor를 바로 적용하지만 현재 setObject는 `_getPropDescriptor`를 사용한다. **이는 기존 동작의 단순 이동이 아니라 의미 변경**이다.
- 이동·삭제 중 non-configurable descriptor나 setter 오류가 발생하면 일부 상태가 이미 바뀔 수 있다. 성공 결과만 비교하지 말고 실패 후 `$elements/$keys/$descriptors` 및 인덱스·키 접근의 일치를 확인한다.
- `$ref`로 공유된 객체, owner, 중첩 메타 객체, vOpt 0/1/2의 결과와 복원을 검증한다. JSON 키 순서만 맞춰서는 충분하지 않다.

`getAllProperties`는 프로토타입 체인을 순회하므로 이동 뒤 메서드 이름이 사라지지는 않을 수 있다. 다만 순서·own 여부·enumerability·상위 override의 super 호출까지 보존해야 한다.

## 6. 수정한 진행 순서

1. reduce, 취소, 키 검증의 계약을 재현 사례로 고정하고 별도 결함 수정으로 처리한다.
2. entries의 불필요한 복사와 순회 공통 helper를 검토한다. 콜백 snapshot 정책이 바뀌면 명시적으로 기록한다.
3. 필요하다면 Base에 순회 구현을 옮긴다. 반환형, 콜백 3/4/5개, 오류 코드, 예약어, 상위 override를 유지한다.
4. iterable을 추가할 때 값 순회인지 key/value 순회인지 선언과 함께 정한다. `entries()` 반환 배열과의 차이도 설명한다.
5. descriptor 재인덱싱과 getObject/setObject 공통화는 별도 변경으로 진행하고 상위 패키지 회귀를 실행한다.

중복 175줄 감소나 획득 성능을 확정 수치로 약속하지 않는다. 최종 설계와 호환 helper가 정해진 뒤 변경량·성능을 측정해야 한다.
