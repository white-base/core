# logic-core 명명 및 클래스 필요성 검토

> 작성일: 2026-09-05
> 대상: `logic-core` v1.1.4 — `src/` 24개 모듈, 공개 export 22개
> 범위: (1) 클래스명 / 메서드명 / 속성명의 **적합성**, (2) **클래스 단위** 필요성
> 관련 문서:
> - [LOGIC-CORE-FEATURES.ko.md](LOGIC-CORE-FEATURES.ko.md) — *기능 단위* 필요성 (A~D 등급)
> - [AI-COLLABORATION-DRAFT.ko.md](AI-COLLABORATION-DRAFT.ko.md) — 코드 품질/아키텍처
>
> 본 문서는 위 두 문서와 중복되는 항목은 참조만 하고, **이름 자체의 적합성**에 집중한다.

---

## 1. 총평

| 축 | 판정 | 요약 |
| --- | :-: | --- |
| 클래스명 | **양호** | 22개 중 18개가 역할을 정확히 표현. 문제는 `ExtendError`, `IMarshal`/`ISerialize`, `IListControl` 4개 |
| 메서드명 | **주의** | 같은 의미에 서로 다른 동사가 3벌씩 존재. 예측 가능성이 낮다 |
| 속성명 | **문제 있음** | `_` / `$` 접두 규칙이 실제 가시성과 어긋나고, **대입이 대입이 아닌** 속성이 2개 있다 |
| 클래스 필요성 | **대체로 적합** | 클래스가 많은 게 아니라, `MetaRegistry` 하나가 **너무 적다**(3개 역할 겸직) |

핵심 결론 3가지:

1. **클래스 분해는 잘 되어 있다.** 계층(메시지 → 유틸 → 계약 → 메타 → 컬렉션)이 명확하고 순환 의존이 없다. "불필요한 클래스"는 사실상 없다.
2. **어휘가 통일되어 있지 않다.** 포함 검사에 `contains`/`has`/`exists` 3개, 삭제에 `remove`/`del`/`release` 3개, 직렬화에 `getObject·setObject`/`output·load`/`loadMetaObject` 3벌이 공존한다. 소비자가 API를 **외워야만** 쓸 수 있는 상태다.
3. **속성 접두 규칙이 계약과 모순된다.** `_guid`/`_type`/`_name`/`_list`는 `IMarshal`·`IElement`·`IList` 계약의 **공개 멤버**인데 "건드리지 말라"는 뜻의 `_` 접두를 달고 있다.

---

## 2. 클래스명 검토

### 2.1 적합 — 수정 불필요 (18개)

`MetaObject` `MetaElement` `MetaRegistry` `NamespaceManager` `BaseCollection` `ArrayCollection` `PropertyCollection` `EventEmitter` `Message` `Type` `Util` `IObject` `IElement` `IList` `ICollection` `IArrayCollection` `IPropertyCollection` `IMarshal`(부분)

역할과 이름이 1:1로 대응하고, 계층 접두(`Meta*`, `*Collection`, `I*`)가 일관된다. `BaseCollection`이 추상, `Array`/`Property`가 구현이라는 것도 이름만으로 읽힌다.

### 2.2 부적합 — 4개

| # | 대상 | 문제 | 대안 | 변경 위험 |
| :-: | --- | --- | --- | :-: |
| N1 | `ExtendError` | 동사(`Extend`)+명사 조합이라 영어로 읽히지 않는다. 실제 역할은 **① 코드 기반 메시지 조회 ② 원인 오류 체이닝(`queue`)** 두 가지인데 이름은 "확장한 오류"라는 정보 없는 진술 | `CodedError` / `ChainError` / `LogicError` | **매우 높음** — 하위 3개 패키지 361회 참조 |
| N2 | `ISerialize` | ① 인터페이스 명명이 다른 8개는 전부 **명사**(`IObject`, `IList`, `ICollection`)인데 혼자 **동사**다 ② `IMarshal`과 역할 구분이 이름에 드러나지 않는다 | `ISerializable` | 중간 — meta-entity 6회 |
| N3 | `IMarshal` | `ISerialize`(문자열 ↔ 객체)와 달리 **객체그래프 ↔ GUID 리터럴** 변환 계약인데, 이름만으로는 둘 다 "직렬화"로 읽힌다 | `IGuidObject` / `IMarshalable` | 낮음 — 외부 1회 |
| N4 | `IListControl` | ① `Control`을 명사 접미로 쓰는 것은 영어에서 부자연스럽다 ② 계약 내용(`add`/`del`/`has`/`find`)이 `ICollection`(`add`/`remove`/`contains`/`indexOf`)과 **의미상 같은데 동사만 다르다** — 이름이 차이를 설명하지 못한다 | `IMutableList` 또는 **`ICollection`으로 통합** | 낮음 — 외부 0회 |

> N2·N3은 묶어서 처리해야 의미가 있다. 지금은 "core에 직렬화 계약이 2개 있는데 이름으로는 구분 불가"가 정확한 상태다.

### 2.3 파일명 ↔ 클래스명 불일치 (5개)

| 파일 | export 클래스 | 문제 |
| --- | --- | --- |
| `collection-array.js` | `ArrayCollection` | 어순 역전 |
| `collection-property.js` | `PropertyCollection` | 어순 역전 |
| `i-collection-array.js` | `IArrayCollection` | 어순 역전 |
| `i-collection-property.js` | `IPropertyCollection` | 어순 역전 |
| `i-control-list.js` | `IListControl` | 어순 역전 |

나머지 19개 파일은 kebab-case 변환이 정확히 일치한다(`meta-registry.js` → `MetaRegistry`). 위 5개만 "카테고리 우선"(`collection-array`) 규칙을 쓰고 클래스는 "수식어 우선"(`ArrayCollection`)이라 **클래스명으로 파일을 찾을 수 없다**.

- 권장: `array-collection.js`, `property-collection.js`, `i-array-collection.js`, `i-property-collection.js`, `i-list-control.js`
- 위험: `package.json`의 `files`에 `src/`가 포함되어 **npm에 소스가 배포**되므로, 심층 경로 import(`logic-core/src/collection-array.js`)를 쓰는 소비자가 있다면 깨진다. 확인된 소비자 3곳에는 심층 import 없음 → **위험 낮음**

---

## 3. 메서드명 검토

### 3.1 같은 의미, 다른 동사 (가장 큰 문제)

| 의미 | 사용 중인 이름 | 위치 |
| --- | --- | --- |
| 포함 검사 | `contains(elem)` / `has(elem)` / `has(oGuid)` / `exists(key)` | `ICollection` / `IListControl`·`NamespaceManager` / `MetaRegistry` / `PropertyCollection` |
| 삭제 | `remove(elem)` / `removeAt(idx)` / `del(fullName)` / `release(meta)` / `delNamespace(ns)` | 컬렉션 / `NamespaceManager` / `MetaRegistry` |
| 직렬화 | `getObject`·`setObject` / `output`·`load` / `loadMetaObject` | `IMarshal` / `ISerialize`·`NamespaceManager` / `MetaRegistry` |

특히 **`PropertyCollection`은 한 클래스 안에서 `contains`와 `exists`를 동시에 갖는다.**

```js
const c = new PropertyCollection();
c.add('a', 1);
c.contains(1);    // true  — 인자는 '값'
c.exists('a');    // true  — 인자는 '키'
```

이름 어디에도 "값이냐 키냐"가 없다. `containsKey(key)` / `contains(value)` 또는 `hasKey` / `hasValue`로 나눠야 읽힌다.

`del`은 축약어인데 같은 파일의 다른 메서드(`indexOf`, `removeAt`, `addNamespace`)는 축약하지 않는다. 스타일이 한 곳만 다르다.

### 3.2 이름이 동작을 잘못 예고하는 메서드

| # | 메서드 | 실제 동작 | 문제 | 대안 |
| :-: | --- | --- | --- | --- |
| M1 | `Type.matchType()` / `Type.allowType()` | **실패 시 throw** | 서술형 이름이라 술어(predicate)처럼 읽힌다. 실제로는 assert | `assertMatchType` / `assertAllowType` |
| M2 | `Type.isMatchType()` / `Type.isAllowType()` | boolean 반환 | 영어 문법 오류. `is` + 동사원형 | `isMatchedType` / `isAllowedType` |
| M3 | `MetaRegistry.validObject()` | boolean 반환 + 일부 경로에서 throw | 형용사를 메서드명으로 사용. 술어인지 검증기인지 불명 | `isValidObject`(술어) 또는 `validateObject`(assert) |
| M4 | `NamespaceManager.path(ns)` | 네임스페이스 노드 반환. **인자 없이 호출하면 내부 `$storage`를 참조로 그대로 반환** | 명사를 메서드명으로 사용 + 내부 저장소 누출 | `getNamespace(ns)`, 무인자 호출 시 복사본 반환 |
| M5 | `MetaRegistry.setMetaObject(oGuid, meta)` | GUID 객체에 `$set` 마킹 | "메타 객체를 등록한다"로 읽히지만 실제로는 참조 해소 마킹 | `markResolved` / `linkGuidObject` |
| M6 | `MetaRegistry.findSetObject(oGuid, origin)` | `$set` 참조를 따라가 객체를 찾음 | `Set` 자료구조로 오독됨 | `resolveSetRefer` |
| M7 | `Util.implements(ctor, obj, ...)` | 검증 + **인스턴스에 `_interface` / `isImplementOf` 주입** | 이름은 술어인데 대상을 **변형**한다 | `Util.applyInterfaces` |
| M8 | `NamespaceManager._getPathObject(fullName)` | 풀네임을 `{ns, key}`로 분해 | 같은 클래스의 `getPath(elem)`(요소 → 경로 문자열)과 이름이 유사한데 하는 일이 무관 | `_splitFullName` |

M1·M2는 짝으로 봐야 한다. 지금은 **throw하는 쪽이 짧은 이름**, boolean 반환이 긴 이름이라 직관과 반대다.

### 3.3 시그니처와 문서 불일치

`MetaObject.prototype.getObject`의 JSDoc은 `p_owned` 파라미터를 문서화하지만 실제 시그니처는 인자 1개다.

```
MetaObject.prototype.getObject.length      // 1
ArrayCollection.prototype.getObject.length // 2
```

기반 클래스와 파생 클래스의 arity가 다른데 문서는 파생 기준으로 쓰여 있다. 계약상 `p_owned`가 필요하면 `MetaObject`에도 선언하고, 아니면 JSDoc에서 제거해야 한다.

### 3.4 파라미터 명명 규칙 파손

전 코드베이스가 `p_` 접두(`p_elem`, `p_key`, `p_vOpt`)를 일관되게 쓴다. 그런데 **최근 추가된 고차 메서드 16개만 접두가 없다.**

```js
ArrayCollection.prototype.map    = function(callback, thisArg)     // p_ 없음
PropertyCollection.prototype.add = function(p_key, p_elem, p_desc) // p_ 있음
```

`p_` 규칙 자체는 취향 문제라 유지/폐지 어느 쪽이든 좋지만, **한 파일 안에서 갈리는 지금 상태가 최악**이다.

---

## 4. 속성명 검토

### 4.1 `_` / `$` 접두 규칙이 실제 가시성과 어긋난다

현재 사용 중인 규칙:

| 접두 | 의도 | 실제 사례 |
| :-: | --- | --- |
| `$` | 내부 저장소 (완전 비공개) | `$elements`, `$descriptors`, `$keys`, `$event`, `$storage`, `$KEYWORD` |
| `_` | protected / 메타 | `_guid`, `_type`, `_ns`, `_name`, `_owner`, `_elemTypes`, `_list`, `_interface` |

`$` 계열은 **일관되고 적합하다.** 문제는 `_` 계열이다.

| 멤버 | JSDoc | 실제 위치 | 모순 |
| --- | :-: | --- | --- |
| `_guid`, `_type` | — | **`IMarshal` 계약의 공개 멤버** | 계약이 공개하는데 이름은 비공개를 주장 |
| `_name` | — | **`IElement` 계약의 공개 멤버** | 동일 |
| `_list`, `count` | `@protected` | **`IList` 계약의 공개 멤버** | JSDoc이 `@protected`인데 인터페이스가 공표 |

`_guid`/`_type`은 직렬화 결과 JSON에도 그대로 나가는 **최종 산출물 키**다. 소비자 입장에서 `_` 접두는 "쓰면 안 된다"는 신호인데 실제로는 반드시 써야 한다. 최소한 문서에 "**core에서 `_` 접두는 private이 아니라 `메타 시스템 예약`을 뜻한다**"를 명시해야 오해가 없다.

### 4.2 대입이 대입이 아닌 속성 (2개)

**`$KEYWORD`** — setter가 대입이 아니라 **누적**한다.

```js
// base-collection.js:47
set: function(newVal) { $KEYWORD = $KEYWORD.concat(newVal); }   // REVIEW: 예약어 중복 (원본 주석)
```

그래서 생성자에서 아래처럼 5번 "대입"하면 5개가 전부 남는다.

```js
this.$KEYWORD = ['$event', '_owner', ...];   // base-collection.js:292~296
this.$KEYWORD = ['onAdd', 'onAdded', ...];   // 앞의 값이 지워지지 않음
```

동작 자체는 의도된 것이지만 **`=` 연산자가 append를 의미하는 것은 언어 관례 위반**이다. 이름도 단수(`$KEYWORD`)인데 배열이다.
→ `$keywords` 속성(읽기 전용) + `_addKeyword(...)` 메서드로 분리.

**`_elemTypes`** — setter가 값을 조용히 변형한다.

```js
// 문자열 kind 한정자가 없으면 '_req_'를 앞에 끼워 넣는다
if (arrType.length > 0 && reg.exec(arr1) === null) arrType = ['_req_'].concat(arrType);
```

`c._elemTypes = [String]` 후 읽으면 `['_req_', String]`이 나온다. 쓴 값과 읽는 값이 다르다.
→ 정규화가 필요하면 `setElementTypes()` 메서드로 명시하거나, 저장은 원본 그대로 두고 사용 시점에 정규화.

### 4.3 개별 속성명

| # | 대상 | 문제 | 대안 |
| :-: | --- | --- | --- |
| P1 | `count` / `length` | 완전히 동일한 getter 2개. `IList` 계약은 `count`만 요구 (기능 문서 B2) | `count` 유지, `length`는 deprecated 표기 후 제거 |
| P2 | `EventEmitter.isLog` | ① boolean 플래그에 `is` + 명사 ② **JSDoc이 "Array that stores registered event names"로 오기** ③ 기능 문서 C5대로 사용처 0회 | `enableLog` 또는 제거 |
| P3 | `MetaRegistry.namespace` | `NamespaceManager` **인스턴스**를 반환하는데 이름은 단일 네임스페이스처럼 읽힌다 | `namespaces` 또는 `namespaceManager` |
| P4 | `NamespaceManager.allowOverlap` | "overlap"보다 "duplicate"가 통용 | `allowDuplicate` |
| P5 | `_UNION` | 구현 인터페이스 **목록**인데, `union`은 타입 이론에서 `A \| B`를 뜻한다. 같은 저장소의 `type.js`가 `'union'`을 **그 원래 의미로** 쓰고 있어 충돌 | `_INTERFACES` 또는 `_IMPLEMENTS` |
| P6 | `_PARAMS` | 역직렬화용 **생성자 파라미터명 배열** | `_CTOR_PARAMS` |
| P7 | **`_EUM_`** | **`_ENUM_`의 오타.** `TYPE-SPEC.ko.md:136`이 "열거형"으로 정의하고 있어 의도는 명확. 소스 7곳 + 스펙 문서에 오타 그대로 고착 | `_ENUM_` (`_EUM_`는 한 버전간 별칭 유지) |

> P7은 공개 타입 토큰이라 소비자 코드에 문자열 리터럴로 박힌다. 지금이 가장 싸게 고칠 시점이다.

`_NS`, `_KIND`, `_TYPE`은 적합하다.

---

## 5. 클래스 필요성 검토

판정 근거: core 내부 사용 + 하위 패키지(`meta-entity`/`bind-model`/`logic-sql-entity`) `src/` 참조 횟수.

### 5.1 하위 패키지 참조 실측

| 클래스 | meta-entity | bind-model | logic-sql-entity | 합계 |
| --- | :-: | :-: | :-: | :-: |
| `ExtendError` | 168 | 163 | 30 | **361** |
| `PropertyCollection` | 26 | 54 | 6 | **86** |
| `MetaRegistry` | 58 | 14 | 0 | **72** |
| `Util` | 41 | 26 | 1 | **68** |
| `MetaObject` | 23 | 11 | 1 | **35** |
| `Type` | 23 | 12 | 1 | **36** |
| `Message` | 17 | 12 | 12 | **41** |
| `MetaElement` | 19 | 2 | 2 | **23** |
| `EventEmitter` | 11 | 5 | 2 | **18** |
| `ArrayCollection` | 11 | 0 | 0 | **11** |
| `ISerialize` | 6 | 0 | 0 | **6** |
| `IList` | 2 | 0 | 0 | **2** |
| `IObject` / `IMarshal` | 0 | 1 / 1 | 0 | **2** |
| `BaseCollection` | 0 | 1 | 0 | **1** |
| `NamespaceManager` | 0 | 0 | 0 | **0** |
| `IElement` / `IListControl` / `ICollection` / `IArrayCollection` / `IPropertyCollection` | 0 | 0 | 0 | **0** |

### 5.2 판정

**필요성 명확 (11개)** — `ExtendError` `Message` `Type` `Util` `EventEmitter` `MetaObject` `MetaElement` `MetaRegistry` `BaseCollection` `ArrayCollection` `PropertyCollection`

**필요하나 export 재검토 (5개)** — `IElement` `IListControl` `ICollection` `IArrayCollection` `IPropertyCollection`

- 클래스 **자체는 필요하다.** `Util.implements`가 런타임에 인터페이스 객체를 요구하고, `_UNION`에 실제로 참조된다.
- 다만 **하위 패키지 참조 0회**다. `index.js` 최상위 export로 노출하면 영구히 호환을 지켜야 하는 공개 API가 5개 늘어난다.
- 판단: `logic-*` 생태계 밖의 제3자가 core를 상속해 확장하는 시나리오를 지원할 것인가에 달렸다. 지원한다면 현행 유지가 맞고, 아니라면 `logic-core/interfaces` 서브 경로로 내려 최상위 표면을 줄이는 편이 낫다.

**필요하나 이름/계약 정리 필요 (3개)** — `IObject` `IMarshal` `ISerialize` → 2.2절 N2·N3

**단독 클래스로 유지할지 재검토 (2개)**

| 대상 | 검토 |
| --- | --- |
| `IListControl` | 유일 구현체가 `NamespaceManager` 하나뿐이고, 계약 4개(`add`/`del`/`has`/`find`)가 `ICollection`(`add`/`remove`/`contains`/`indexOf`)과 의미상 동일. **인터페이스 1개 + 동사 불일치 1건을 동시에 제거**할 수 있다 |
| `MetaElement` | `MetaObject`에 `_name`(필수 문자열) + `clone()`만 더한 108줄의 얇은 계층. 다만 하위 23회 참조 + "이름을 가진 메타 요소"라는 개념 경계가 뚜렷하므로 **유지 권장**. 병합 이득보다 파급이 크다 |

**export 불필요 검토 (1개)** — `NamespaceManager`

- 하위 패키지 직접 import **0회**. 전부 `MetaRegistry.namespace`를 통해 접근한다.
- 클래스로서는 완결적이고 독립 테스트도 가능하므로 **삭제 대상은 아니다.** "최상위 export가 필요한가"만 남는 질문이다.

### 5.3 진짜 문제는 "클래스가 많다"가 아니라 `MetaRegistry`가 **하나로 부족**하다는 점

`MetaRegistry` 618줄 / static 멤버 22개가 서로 다른 3가지 일을 겸한다.

| 책임 | 멤버 |
| --- | --- |
| ① 인스턴스 레지스트리 | `_list` `count` `init` `register` `release` `has` `find` `isMetaObject` |
| ② GUID 리터럴 그래프 조작 | `createMetaObject` `createReferObject` `createNsReferObject` `setMetaObject` `validObject` `isGuidObject` `hasGuidObject` `hasRefer` `findSetObject` `transformRefer` |
| ③ 클래스/네임스페이스 등록 | `namespace` `registerClass` `releaseClass` `findClass` `getClass` `loadMetaObject` |

3장에서 지적한 불투명한 이름(M5 `setMetaObject`, M6 `findSetObject`, M3 `validObject`)이 **전부 ②그룹에 몰려 있는 것은 우연이 아니다.** 한 이름 공간에 세 어휘가 섞이면서 접두로 소속을 표시할 방법이 없어진 결과다.

②를 `GuidObject`(또는 `MetaSerializer`)로 분리하면 이름이 저절로 짧고 명확해진다.

```
MetaRegistry.createMetaObject(oGuid)   →  GuidObject.materialize(oGuid)
MetaRegistry.validObject(oGuid)        →  GuidObject.isValid(oGuid)
MetaRegistry.setMetaObject(oGuid, m)   →  GuidObject.markResolved(oGuid, m)
MetaRegistry.findSetObject(oGuid, o)   →  GuidObject.resolve(oGuid, o)
```

단 하위 참조 72회 중 상당수가 ②그룹이므로 **major 버전 작업**이다. 기능 문서 4장 우선순위 7(`type.js` 분리)과 같은 시점에 묶어 처리해야 한다.

---

## 6. 권장 조치 (위험도 순)

### 즉시 — 위험 없음

| # | 조치 | 근거 |
| :-: | --- | --- |
| 1 | `EventEmitter.isLog` JSDoc 오기 수정 ("Array that stores registered event names" → boolean 설명) | 4.3 P2 |
| 2 | `MetaObject.getObject` JSDoc에서 미구현 `p_owned` 제거, 또는 시그니처에 추가 | 3.3 |
| 3 | `_` 접두의 의미("private 아님 / 메타 시스템 예약")를 README·타입 선언에 명시 | 4.1 |
| 4 | 고차 메서드 16개 파라미터에 `p_` 접두 적용 (또는 규칙 폐지를 문서로 확정) | 3.4 |

### 단기 — minor 버전 (하위 호환 별칭 유지)

| # | 조치 | 근거 |
| :-: | --- | --- |
| 5 | `_EUM_` → `_ENUM_` 도입, `_EUM_`는 별칭으로 1버전 유지 후 제거 | 4.3 P7 |
| 6 | `$KEYWORD` → `$keywords`(읽기 전용) + `_addKeyword()` 분리 | 4.2 |
| 7 | `_elemTypes` 정규화를 setter에서 걷어내고 명시적 메서드로 이동 | 4.2 |
| 8 | `PropertyCollection.exists` → `containsKey` 도입, `exists`는 별칭 | 3.1 |
| 9 | `Type.isMatchType`/`isAllowType` → `isMatchedType`/`isAllowedType` 별칭 추가 | 3.2 M2 |
| 10 | `NamespaceManager.path()` 무인자 호출이 `$storage`를 참조로 반환하는 문제 차단 | 3.2 M4 |
| 11 | 파일명 5개 어순 정정 (`array-collection.js` 등) | 2.3 |

### 중장기 — major 버전 (`type.js` 분리와 동시 결정)

| # | 조치 | 근거 |
| :-: | --- | --- |
| 12 | 포함/삭제 동사 통일 (`contains`+`containsKey` / `remove`+`removeAt`), `del`·`exists` 폐기 | 3.1 |
| 13 | `Type.matchType`/`allowType` → `assertMatchType`/`assertAllowType` | 3.2 M1 |
| 14 | `IListControl` 폐지 → `ICollection`으로 통합 | 5.2 |
| 15 | `ISerialize` → `ISerializable`, `IMarshal` → `IGuidObject` | 2.2 N2·N3 |
| 16 | `MetaRegistry` ②그룹을 `GuidObject`로 분리 | 5.3 |
| 17 | `_UNION` → `_INTERFACES`, `_PARAMS` → `_CTOR_PARAMS` | 4.3 P5·P6 |
| 18 | `ExtendError` 개명 — **비용 대비 이득이 가장 낮다.** 361회 참조. 별칭 export만 추가하고 실제 개명은 보류 권장 | 2.2 N1 |

---

## 7. 검증 방법

```bash
# 하위 패키지 클래스 참조 횟수 (5.1 표 재현)
cd /Users/logic/PJ-Git
for p in meta-entity bind-model logic-sql-entity; do echo "=== $p ==="; \
  grep -rhoE "\b(ExtendError|MetaRegistry|PropertyCollection|NamespaceManager|ICollection|IElement)\b" \
  $p/src | sort | uniq -c | sort -rn; done

# 파일명 ↔ 클래스명 대응 (2.3)
for f in src/*.js; do echo "$(basename $f) -> $(grep -oE '^/\*\*\*\* [^|]+\| [A-Za-z]+' $f | head -1 | sed 's/.*| //')"; done

# _EUM_ 오타 (4.3 P7)
grep -rn "_EUM_" src/type.js doscs/TYPE-SPEC.ko.md

# contains/exists 인자 의미 차이 (3.1), path() 누출 (3.2 M4)
node -e "import('./index.js').then(({PropertyCollection,NamespaceManager})=>{
  const c=new PropertyCollection(); c.add('a',1);
  console.log('contains(1)=',c.contains(1),' exists(\"a\")=',c.exists('a'));
  const ns=new NamespaceManager();
  console.log('path() === \$storage :', ns.path()===ns.\$storage);
})"
```
