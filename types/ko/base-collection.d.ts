import ICollection          = require("./i-collection");
import IList                = require("./i-list");
import MetaObject           = require("./meta-object");
// import EventEmitter         = require("./event-emitter");
import EventEmitter        from "./event-emitter";
// import T                    = require("./T");

/**
 * 기본 컬렉션 추상 클래스입니다. 모든 컬렉션의 최상위 클래스 역할을 합니다.
 * 
 * @example
 * class MyCollection extends BaseCollection {
 *     constructor(owner: object) {
 *         super(owner);
 *     }
 * 
 *     add(element: any) {
 *         // 요소 추가 로직
 *     }
 * 
 *     clear() {
 *         // 컬렉션 초기화 로직
 *     }
 * 
 *     _remove(pos: number): boolean {
 *         // 요소 삭제 로직
 *         return true;
 *     }
 * }
 * 
 * const myCollection = new MyCollection(someOwner);
 * myCollection.add(someElement);
 * console.log(myCollection.count);
 */
declare abstract class BaseCollection extends MetaObject implements ICollection, IList {
    
    /**
     * 기본 컬렉션을 생성합니다.
     * 
     * @param owner - 컬렉션의 소유 객체입니다. 이 객체는 컬렉션의 관리와 관련된 정보를 제공할 수 있습니다.
     * @private
     */
    constructor(owner: object);

    /**
     * 이벤트를 처리하는 객체입니다. 컬렉션의 다양한 이벤트를 등록하고 발생시킬 때 사용됩니다.
     * 
     * @private
     */
    $event: EventEmitter;
    
    /**
     * 컬렉션의 요소들을 저장하는 배열입니다.
     * 
     * @private
     */
    $elements: any[];

    /**
     * 각 컬렉션 요소에 대한 getter 및 setter 메서드를 정의하는 기술자 배열입니다.
     * 
     * @private
     */
    $descriptors: object[];

    /**
     * 컬렉션의 예약어 목록입니다.
     * 
     * @private
     */
    $KEYWORD: string[];

    /**
     * 컬렉션의 소유 객체입니다.
     * 
     * @protected
     */
    _owner: object;
    
    /**
     * 컬렉션 요소의 타입 제약조건을 정의합니다.
     * 
     * @protected
     */
    _elemTypes: any[];

    /**
     * 컬렉션의 요소 목록을 저장하는 배열입니다. 이 배열은 컬렉션의 실제 데이터를 포함합니다.
     * 
     * @readonly
     */
    _list: any[];

    /**
     * 현재 컬렉션의 요소 수를 반환합니다.
     * 
     * @readonly
     */
    count: number;

    /**
     * 컬렉션에 요소를 추가하기 전에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onAdd
     * @param idx - 추가할 요소의 인덱스입니다.
     * @param elem - 추가할 요소입니다.
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onAdd = function(idx, elem, _this) {
     *     console.log(`요소 추가 전: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onAdd: (idx: number, elem: any, _this: object) => void;

    /**
     * 컬렉션에 요소를 추가한 후에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onAdded
     * @param idx - 추가된 요소의 인덱스입니다.
     * @param elem - 추가된 요소입니다.
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onAdded = function(idx, elem, _this) {
     *     console.log(`요소 추가 후: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onAdded: (idx: number, elem: any, _this: object) => void;

    /**
     * 컬렉션에서 요소를 삭제하기 전에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onRemove
     * @param idx - 삭제할 요소의 인덱스입니다.
     * @param elem - 삭제할 요소입니다.
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onRemove = function(idx, elem, _this) {
     *     console.log(`요소 삭제 전: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onRemove: (idx: number, elem: any, _this: object) => void;
    
    /**
     * 컬렉션에서 요소를 삭제한 후에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onRemoved
     * @param idx - 삭제된 요소의 인덱스입니다.
     * @param elem - 삭제된 요소입니다.
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onRemoved = function(idx, elem, _this) {
     *     console.log(`요소 삭제 후: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onRemoved: (idx: number, elem: any, _this: object) => void;

    /**
     * 컬렉션을 초기화하기 전에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onClear
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onClear = function(_this) {
     *     console.log('컬렉션 초기화 전');
     * };
     */
    onClear: (_this: object) => {};

    /**
     * 컬렉션을 초기화한 후에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onCleared
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onCleared = function(_this) {
     *     console.log('컬렉션 초기화 후');
     * };
     */
    onCleared: (_this: object)=> {};

    /**
     * 컬렉션의 요소를 변경하기 전에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onChanging
     * @param idx - 변경할 요소의 인덱스입니다.
     * @param elem - 변경할 요소입니다.
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onChanging = function(idx, elem, _this) {
     *     console.log(`요소 변경 전: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onChanging: (idx: number, elem: any, _this: object) => void;

    /**
     * 컬렉션의 요소를 변경한 후에 발생하는 이벤트입니다.
     * 
     * @event BaseCollection#onChanged
     * @param idx - 변경된 요소의 인덱스입니다.
     * @param elem - 변경된 요소입니다.
     * @param _this - 현재 컬렉션 객체입니다.
     * 
     * @example
     * myCollection.onChanged = function(idx, elem, _this) {
     *     console.log(`요소 변경 후: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onChanged: (idx: number, elem: any, _this: object) => void;

    /**
     * `onAdd` 이벤트를 발생시킵니다.
     * 
     * @param idx - 추가할 요소의 인덱스입니다.
     * @param elem - 추가할 요소입니다.
     * @listens BaseCollection#onAdd
     */
    _onAdd(idx: number, elem: any): void;

    /**
     * `onAdded` 이벤트를 발생시킵니다.
     * 
     * @param idx - 추가된 요소의 인덱스입니다.
     * @param elem - 추가된 요소입니다.
     * @listens BaseCollection#onAdded
     */
    _onAdded(idx: number, elem: any): void;

    /**
     *`onRemove` 이벤트를 발생시킵니다. 
     * @param idx - 삭제할 요소의 인덱스입니다.
     * @param elem - 삭제할 요소입니다.
     * @listens BaseCollection#onRemove
     */
    _onRemove(idx: number, elem: any): void;
    
    /**
     * `onRemoved` 이벤트를 발생시킵니다. 
     * @param idx - 삭제할 요소의 인덱스입니다.
     * @param elem - 삭제할 요소입니다.
     * @listens BaseCollection#onRemoved
     */
    _onRemoved(idx: number, elem: any): void;
    
    /**
     * `onClear` 이벤트를 발생시킵니다.
     * @listens BaseCollection#onClear
     */
    _onClear();
    
    /**
     * `onCheared` 이벤트를 발생시킵니다.
     * @listens BaseCollection#onCleared
     */
    _onCleared();

    /**
     * `onChanging` 이벤트를 발생시킵니다.
     * @param idx - 변경할 요소의 인덱스입니다.
     * @param elem - 변경할 요소입니다.
     * @listens BaseCollection#onChanging
     */
    _onChanging(idx: number, elem: any);

    /**
     * `onChanged` 이벤트를 발생시킵니다.
     * @param idx - 변경된 요소의 인덱스입니다.
     * @param elem - 변경된 요소입니다.
     * @listens BaseCollection#onChanged
     */
    _onChanged(idx: number, elem: any);

    /**
     * 컬렉션에 요소를 추가할 때 설정되는 기본 기술자입니다.
     * 
     * @param idx - 기술자를 가져올 요소의 인덱스입니다.
     * @protected
     */
    _getPropDescriptor(idx: number): object;

    /**
     * 컬렉션의 요소를 삭제합니다. (내부 사용)
     * 
     * @param pos - 삭제할 요소의 인덱스입니다.
     * @returns 삭제 성공 여부를 나타내는 불리언 값입니다.
     * @abstract
     */
    abstract _remove(pos: number): boolean;

    /**
     * 컬렉션 객체를 직렬화(guid 타입) 객체로 반환합니다.  
     * 순환 참조는 $ref 값으로 대체됩니다.
     * 
     * @param {number} [vOpt=0] - 직렬화 옵션입니다.
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No) 
     * @param {object | Array<object>} [owned={}] - 현재 객체를 소유하는 상위 객체들입니다. 기본값은 빈 객체입니다.
     * 
     * @example
     * a.getObject(2) == b.getObject(2)
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화(guid 타입) 객체를 컬렉션 객체에 설정합니다.  
     * 객체는 초기화됩니다.
     * 
     * @param oGuid - 직렬화된 객체입니다.
     * @param {object} [origin=p_oGuid] - 현재 객체를 설정하는 원본 객체입니다. 기본값은 oGuid입니다.
     */
    setObject(oGuid: object, origin?: object);

    /**
     * 컬렉션에 요소를 삭제합니다.
     * 
     * @param elem - 삭제할 요소입니다.
     * @returns 삭제된 요소의 인덱스입니다.
     * 
     * @example
     * const removedIndex = myCollection.remove(someElement);
     * console.log(`삭제된 요소의 인덱스: ${removedIndex}`);
     */
    remove(elem: any): number;

    /**
     * 컬렉션에서 지정된 위치의 요소를 삭제합니다.
     * 
     * @param pos - 삭제할 요소의 인덱스입니다.
     * @returns 요소 삭제 성공 여부를 나타내는 불리언 값입니다.
     * 
     * @example
     * const success = myCollection.removeAt(0);
     * console.log(`요소 삭제 성공: ${success}`);
     */
    removeAt(pos: number): boolean;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * 
     * @param elem - 확인할 요소입니다.
     * @returns 요소의 존재 여부를 나타내는 불리언 값입니다.
     * 
     * @example
     * const exists = myCollection.contains(someElement);
     * console.log(`요소 존재 여부: ${exists}`);
     */
    contains(elem): boolean;

    /**
     * 컬렉션에서 요소를 조회합니다.
     * 
     * @param elem - 조회할 요소입니다.
     * @returns 요소의 인덱스입니다. 요소가 존재하지 않으면 -1을 반환합니다.
     * 
     * @example
     * const index = myCollection.indexOf(someElement);
     * console.log(요소의 인덱스: ${index});
     */
    indexOf(elem?: any): number;

    /**
     * 컬렉션에 요소를 추가합니다.
     * 
     * @abstract
     */
    abstract add(...args: any[]): number;

    /**
     * 컬렉션을 초기화 합니다.
     * @abstract
     */
    abstract clear(): void;
}

export = BaseCollection;