# logic-core 컬렉션 계층 분리 설계 검토

> 작성일: 2026-09-14
> 대상: `logic-core` v1.1.4 — `src/base-collection.js`(616줄), `src/collection-array.js`(418줄), `src/collection-property.js`(507줄)
> 범위: `BaseCollection`을 상속한 `ArrayCollection` / `PropertyCollection` **분리선의 적정성**과 재설정 방안
> 관련 문서:
> - [LOGIC-CORE-FEATURES.ko.md](LOGIC-CORE-FEATURES.ko.md) — 기능 단위 필요성. 본 문서의 §2-1은 그 문서의 B1(고차 메서드 이중 구현), D1(`reduce` 초기값), D2(`Symbol.iterator` 부재)를 **구조 원인** 관점에서 다시 다룬다
> - [NAMING-REVIEW.ko.md](NAMING-REVIEW.ko.md) — 클래스/메서드 명명 적합성
> - [AI-COLLABORATION-DRAFT.ko.md](AI-COLLABORATION-DRAFT.ko.md) — 코드 품질/아키텍처
>
> 분리 배경(설계자 의도): 이후 **컬렉션 단위로 다양하게 제어**하기 위해 계열을 구분했고, `ArrayCollection`은 `Array`와 유사하지만 세부 제어를 위해 독립 클래스로 뽑았다.

---

## 1. 총평

**분리 자체는 타당하다. 문제는 분리선이 그어진 위치다.**

현재 구조는 "공통을 Base에 둔다"가 아니라 "Base에 두기 애매한 것을 두 계열에 복사했다"에 가깝다. 두 계열의 실질 차이는 **키(`$keys`)의 유무 하나**뿐인데, 그 차이가 고차 메서드 9종·직렬화·재인덱싱 루프 전체에 걸쳐 복제되어 있다. 반대로 Property 전용 관심사(`p_enum`)는 Base의 훅 시그니처로 새어 올라가 Array 계열 파생 클래스에까지 노출되어 있다.

권고는 **클래스 2개를 유지하되, 계열 차이를 protected 훅 3~4개로만 표현**하는 것이다(§3 안 B). 이렇게 하면 설계자가 의도한 "컬렉션 단위 제어"의 확장점이 오히려 명확해진다.

---

## 2. 분리 유지 근거

"하나로 합칠 것인가"는 검토 대상이 아니다. 근거는 세 가지다.

| 근거 | 확인 내용 |
| --- | --- |
| **실제 계열 파생이 존재** | `meta-entity`에 컬렉션 서브클래스 7개. Property 계열 4개(`BaseColumnCollection`, `MetaTableCollection`, `MetaViewCollection`, `MetaViewColumnCollection`), Array 계열 3개(`TransactionCollection` → `MetaRowCollection` 등). "컬렉션 단위 제어" 의도가 이미 실현 중이다 |
| **클래스 동일성이 데이터 포맷의 일부** | `MetaRegistry.registerClass`가 `_NS` + 클래스명으로 등록하고 `_type` / `$ns`로 복원한다. 두 클래스를 합치면 기존 GUID 리터럴 호환이 깨진다 |
| **런타임 분기가 계열에 의존** | `meta-entity/src/trans-queue.js:42`가 `nVal.instanceOf(ArrayCollection)`로 분기한다. `_UNION`도 `IArrayCollection`(`insertAt`) / `IPropertyCollection`(`indexToKey`)로 갈라져 `Type.allowType` 검사 대상이다 |

---

## 3. 현재 분리선의 문제

### 3-1. Base가 너무 얇다 — 차이가 아닌 것이 아래에 남아 있음

`collection-array.js` 239–412행과 `collection-property.js` 317–501행을 diff하면 174줄 중 103줄이 차이로 잡히지만, **실제 의미 차이는 콜백 4번째 인자 `key` 하나**다.

| 중복 항목 | 위치 | 실질 차이 |
| --- | --- | --- |
| `map` / `filter` / `reduce` / `find` / `forEach` / `some` / `every` / `findIndex` | 양쪽 8종 | 콜백에 `key` 전달 여부 |
| `entries()` | 양쪽 | 첫 원소가 `i` vs `$keys[i]` |
| `getObject`의 `_desc` / `_elem` 직렬화 루프 | array 85–99, property 113–127 | 없음 (Property만 `_key` 추가) |
| `setObject`의 `_elem` 복원 루프 | array 125–138, property 166–179 | 없음 |
| 디스크립터 재인덱싱 루프 | 4곳 (각 클래스 × insert / remove) | 키 접근자 추가 여부 |

**구조적 증거**: FEATURES 문서 D1(`reduce` 초기값 버그)이 양쪽에 똑같이 존재한다. `acc = acc ? ... : this[i]` — 한 번 고치면 두 번 고쳐야 하고, 한쪽만 고치면 계열별로 동작이 갈린다. 이는 버그가 아니라 분리선의 증상이다.

**성능 부작용**: 고차 메서드가 루프 **안에서** `this._list`를 평가한다.

```js
for (var i = 0; i < this.length; i++) {
    newArr[i] = callback.call(thisArg || this, this[i], i, this._list);  // 매 반복마다 배열 재생성
}
```

`_list` getter(`base-collection.js` 136–144행)는 호출마다 새 배열을 만든다. 즉 **9개 메서드 × 2개 클래스가 전부 O(n²) 할당**이다. Base 한 곳으로 모으면 호이스팅 한 줄로 끝난다.

### 3-2. 동시에 Base가 너무 두껍다 — Property 전용 관심사가 위로 샜음

`base-collection.js` 423행:

```js
BaseCollection.prototype._getPropDescriptor = function(p_idx, p_enum) {
```

`p_enum`은 **오직 `PropertyCollection` 때문에** 존재한다. 키 접근자는 enumerable, 인덱스 접근자는 non-enumerable로 나눠야 하기 때문이다. `ArrayCollection`은 이 인자를 한 번도 넘기지 않는다.

이것이 하위 패키지에서 실제로 시그니처 불일치를 만들었다.

| 오버라이드 위치 | 시그니처 | 결과 |
| --- | --- | --- |
| `BaseColumnCollection` (Property 계열) | `(p_idx, p_enum)` | 정상 |
| `MetaRowCollection` (Array 계열) | `(p_idx)` | 인자 유실 — 우연히 무해 |
| `TransactionCollection` (Array 계열) | `(p_idx)` | 동일 |

**하나의 훅 시그니처인데 계열마다 실제 계약이 다르다.** Array 계열 개발자는 두 번째 인자의 존재를 몰라도 되고, 실제로 모르고 있다.

같은 종류로 `base-collection.js` 296행의 `$KEYWORD`에 `indexOf`, `add`, `clear` 등 하위 계약 이름이 하드코딩되어 있고, `PropertyCollection`이 41행에서 `indexOf`를 오버라이드하지도 않으면서 **다시** 등록한다.

### 3-3. 추상 메서드 시그니처가 갈라져 Base 타입으로 쓸 수 없음

```js
ArrayCollection.prototype.add    = function(p_elem, p_desc)         // → pos
PropertyCollection.prototype.add = function(p_key, p_elem, p_desc)  // → index 또는 -1
ICollection.prototype.add        = function()                        // 계약: 인자 0개
```

`BaseCollection` 또는 `ICollection`을 받는 함수는 `add`를 호출할 수 없다. 즉 현재 Base가 제공하는 다형성은 "쓰기"가 아니라 **"읽기·순회·이벤트"뿐**이다.

이 자체는 잘못이 아니다. 오히려 계약을 그렇게 **좁혀서 명시하는 편이 맞다**. 지금은 `ICollection.add()`가 있어서 다형적인 것처럼 보이는 것이 문제다.

### 3-4. 키/값 API 비대칭

`PropertyCollection`에서:

| 대상 | 값 기준 | 키 기준 |
| --- | --- | --- |
| 존재 확인 | `contains(value)` (상속) | `exists(key)` |
| 위치 조회 | `indexOf(value)` (상속) | `keyToIndex(key)` |
| 삭제 | `remove(value)` (상속) | **없음** |

실행 확인: `p.add('x', 1); p.remove(1)` → `0` 반환, 값 기준으로 삭제된다. 맵 계열 컬렉션에서 이것이 기본 `remove`인 것은 직관에 반하고, 정작 `remove('키')`는 없어서 소비자는 `removeAt(keyToIndex(k))`를 써야 한다.

---

## 4. 권고: 분리선 재설정

| 안 | 내용 | 판정 |
| --- | --- | --- |
| A | 현행 구조 유지 + 중복 코드만 정리 | 미봉책. 훅 계약이 여전히 계열마다 다름 |
| **B** | **클래스 2개 유지 + 차이를 3~4개 protected 훅으로만 표현** | **추천** |
| C | 단일 `Collection` + 키 전략 객체 합성 | 불가. §2의 클래스 동일성 / `instanceOf` 분기가 깨짐 |

### 4-1. 계열 차이를 표현하는 훅

이것이 계열 차이의 **전부**여야 한다.

```js
// base-collection.js — 기본 구현은 Array 의미
BaseCollection.prototype._keyAt   = function(i) { return i; };
BaseCollection.prototype._cbArgs  = function(i, list) { return [this[i], i, list]; };

// collection-property.js — 계열 차이는 이 2줄뿐
PropertyCollection.prototype._keyAt  = function(i) { return this.$keys[i]; };
PropertyCollection.prototype._cbArgs = function(i, list) { return [this[i], i, this.$keys[i], list]; };
```

고차 메서드 9종은 Base에 **한 번만** 존재한다.

```js
BaseCollection.prototype.map = function(callback, thisArg) {
    if (typeof callback !== 'function') throw new ExtendError(/EL04116/, null, [typeof callback]);
    var list = this._list;                       // O(n²) → O(n)
    var out = [];
    for (var i = 0; i < this.length; i++) {
        out[i] = callback.apply(thisArg || this, this._cbArgs(i, list));
    }
    return out;
};
```

`entries()`와 `Symbol.iterator`(FEATURES D2)는 `_keyAt` 하나로 따라온다.

```js
BaseCollection.prototype.entries = function() {
    var out = [];
    for (var i = 0; i < this.length; i++) out.push([this._keyAt(i), this.$elements[i]]);
    return out;
};
BaseCollection.prototype[Symbol.iterator] = function() {
    var self = this, i = 0;
    return { next: function() {
        return i < self.length ? { value: self.$elements[i++], done: false } : { value: undefined, done: true };
    }};
};
```

### 4-2. 접근자 정의를 계열이 통째로 책임지게 — `p_enum` 제거

현재는 Base가 "디스크립터"만 만들고, 각 계열이 `Object.defineProperty` 호출을 4곳에서 반복한다. 이를 뒤집는다.

```js
// base-collection.js
BaseCollection.prototype._defineAccessor = function() { throw new ExtendError(/* abstract */); };
BaseCollection.prototype._deleteAccessor = function() { throw new ExtendError(/* abstract */); };
BaseCollection.prototype._reindex = function(from, to) {      // 4곳 중복 → 1곳
    for (var i = from; i < to; i++) this._defineAccessor(i);
};

// collection-array.js
ArrayCollection.prototype._defineAccessor = function(i) {
    var d = this.$descriptors[i];
    Object.defineProperty(this, [i], _isObject(d) ? d : this._getPropDescriptor(i));
};

// collection-property.js
PropertyCollection.prototype._defineAccessor = function(i) {
    var d = this.$descriptors[i], key = this.$keys[i];
    Object.defineProperty(this, [i],  _isObject(d) ? d : this._getPropDescriptor(i, false));
    Object.defineProperty(this, key,  _isObject(d) ? d : this._getPropDescriptor(i, true));
};
```

**핵심**: `_getPropDescriptor(p_idx, p_enum)`은 **시그니처를 그대로 유지**한다. `meta-entity` 3개 클래스가 오버라이드하고 있으므로 건드리지 않고, `p_enum`을 넘기는 책임만 `PropertyCollection._defineAccessor` 안으로 국소화한다. Array 계열 개발자는 `p_enum`을 볼 일이 없어진다.

### 4-3. 직렬화도 템플릿 메서드로

```js
// base-collection.js — _desc / _elem 처리를 Base로 (양쪽 완전 동일)
BaseCollection.prototype.getObject = function(vOpt, owned) { /* ... _desc, _elem ... */ };

// collection-array.js — getObject 오버라이드 삭제 (전부 Base로 흡수)

// collection-property.js — 차이만
PropertyCollection.prototype.getObject = function(vOpt, owned) {
    var obj = _super.prototype.getObject.call(this, vOpt, owned);
    obj['_key'] = this.$keys.slice();
    return obj;
};
```

`setObject`는 **순서 제약**이 있다. `_defineAccessor`가 `$keys[i]`를 읽으므로 키 복원이 먼저여야 한다. Base에 순서를 고정한다.

```
_super.setObject
  → _validateGuid(oGuid)      [훅] Property: _elem/_key/_desc 길이 검증 (EL04221, EL04222)
  → $descriptors 복원
  → _restoreKeys(oGuid)       [훅] Property: $keys 복원 / Array: no-op
  → _defineAccessor 루프
  → $elements 복원
```

---

## 5. 이동 대상 정리

| 대상 | 현재 | 이동 후 |
| --- | --- | --- |
| `map` / `filter` / `reduce` / `find` / `forEach` / `some` / `every` / `findIndex` / `entries` | Array + Property 중복 | **Base 1곳** + `_cbArgs` 오버라이드 2줄 |
| `Symbol.iterator` | 없음 | **Base 신규** (`_keyAt` 기반) |
| `getObject` / `setObject`의 `_desc` / `_elem` | 양쪽 중복 | **Base** + `_key` 훅 |
| 재인덱싱 루프 | 4곳 | **Base `_reindex` 1곳** |
| `Object.defineProperty` 호출 | 계열별 산재 | **`_defineAccessor` 계열별 1곳** |
| `_getPropDescriptor(idx, enum)` | Base (`enum`이 Property 전용) | Base 유지(호환), `p_enum` 사용처는 Property로 국소화 |
| `$KEYWORD`의 `add` / `clear` / `indexOf` / `insertAt` | Base에 하드코딩 | 계열별 선언으로 분산 |
| `add` 시그니처 | 계열마다 다름 | 유지. `ICollection.add()` 계약을 **"쓰기는 다형적이지 않다"**로 문서화 |

**정량 효과**: 중복 약 175줄 제거 / 고차 메서드 O(n²) → O(n) / `reduce` 초기값 버그 수정 지점 2 → 1 / `Symbol.iterator` 획득.

**확장점 고정**: 설계자가 의도한 "컬렉션 단위 제어"를 위해 하위 클래스가 오버라이드할 지점이 다음 5개로 명시된다.

| 확장점 | 용도 | 현재 오버라이드 예 |
| --- | --- | --- |
| `_getPropDescriptor(idx, enum)` | 요소 읽기/쓰기 접근자 커스터마이즈 | `MetaRowCollection`(트랜잭션 큐 반영), `BaseColumnCollection`(`.value` 위임) |
| `_defineAccessor(idx)` | 접근 경로 자체 변경 (별칭 등) | (신규) |
| `_keyAt(i)` / `_cbArgs(i, list)` | 순회 시 콜백 인자 결정 | (신규) |
| `add` / `insertAt` | 삽입 전 검증 | `BaseColumnCollection`, `MetaTableCollection`, `MetaRowCollection` |
| `removeAt` / `clear` | 삭제 전후 부수 효과 | `TransactionCollection` |

---

## 6. 검증 포인트 (리팩터링 시 필수)

1. **`Util.implements` / `Type.getAllProperties`** — 메서드가 프로토타입 체인 위로 올라가면 `getAllProperties`(체인 전체 순회) 결과가 바뀐다. `enumerable: false` 선언도 함께 Base로 옮기고, `test/interface.test.js`, `test/util-implements.test.js`를 먼저 돌린다.
2. **콜백 인자 개수 절대 유지** — Array 3개, Property 4개. `_cbArgs`가 이를 보장하는지 테스트로 고정한다.
3. **`meta-entity` 오버라이드 지점 6종** (`_getPropDescriptor`, `add`, `insertAt`, `removeAt`, `clear`, `getObject` / `setObject`)이 전부 `_super.prototype.X.call`로 위임하므로, 이 이름들은 **삭제·개명 금지**.
4. **`getObject` 출력 키 순서** — `_desc` → `_elem` → `_key` 순서를 유지하면 기존 스냅샷 / `deepEqual` 테스트가 그대로 통과한다.
5. **테스트 재배치** — `collection-array.test.js` 1,434줄 + `collection-property.test.js` 1,611줄에 동일 시나리오가 이중으로 있다. 공통 동작은 `collection-base.test.js`(현재 122줄)로 옮겨 두 클래스에 같은 스위트를 돌리는 형태로 바꾼다.

---

## 7. 권장 작업 순서

| 순서 | 작업 | 위험 | 효과 |
| :-: | --- | :-: | --- |
| 1 | `_keyAt` / `_cbArgs` 도입, 고차 메서드 9종 Base로 이동 | 낮음 | 중복 175줄 제거, O(n²) 해소, D1 수정 지점 단일화 |
| 2 | `Symbol.iterator` 추가 | 낮음 | D2 해소 |
| 3 | `_defineAccessor` / `_reindex` 도입, 재인덱싱 4곳 통합 | 중간 | `p_enum` 국소화 |
| 4 | `getObject` / `setObject` 공통부 Base로 이동 | 중간 | 직렬화 순서 훅으로 고정 |
| 5 | `$KEYWORD` 계열별 분산, `ICollection.add()` 계약 문서화 | 낮음 | 계약 명료화 |
| 6 | `PropertyCollection.remove(key)` 추가 여부 결정 | 낮음 | §3-4 비대칭 해소 (별도 결정 필요) |

1~2는 하위 패키지에 영향 없이 바로 적용 가능하다. 3~4는 `meta-entity` 테스트를 함께 돌려야 한다.
