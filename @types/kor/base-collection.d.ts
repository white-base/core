import ICollection          = require("./i-collection");
import IList                = require("./i-list");
import MetaObject           = require("./meta-object");
import EventEmitter         = require("./event-emitter");
// import T                    = require("./T");

/**
 * 기본 컬렉션 추상 클래스입니다. 모든 컬렉션의 최상위 클래스 역할을 합니다.
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
     * @param owner 소유 객체
     * @private
     */
    constructor(owner: object);

    /**
     * 이벤트 객체입니다.
     * @private
     */
    $event: EventEmitter;
    
    /**
     * 컬렉션 요소들입니다.
     * @private
     */
    $elements: any[];

    /**
     * 컬렉션 요소의 기술자들 (getter, setter)입니다.
     * @private
     */
    $descriptors: object[];

    /**
     * 컬렉션 예약어입니다.
     * @private
     */
    $KEYWORD: string[];

    /**
     * 컬렉션 소유자입니다.
     * @protected
     */
    _owner: object;
    
    /**
     * 컬렉션 요소의 타입 제약조건입니다.
     * @protected
     */
    _elemTypes: any[];

    /**
     * 컬렉션 요소의 목록입니다.
     * @readonly
     */
    _list: any[];

    /**
     * 컬렉션 요소의 갯수입니다.
     * @readonly
     */
    count: number;

    /**
     * 컬렉션 요소를 추가 전에 발생하는 이벤트 입니다.
     * @event BaseCollection#onAdd
     * @example
     * myCollection.onAdd = (idx, elem, _this) => {
     *     console.log(`요소 추가 전: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onAdd: OnFunc;

    /**
     * 컬렉션 요소를 추가한 후에 발생하는 이벤트입니다.
     * @event BaseCollection#onAdded
     * @example
     * myCollection.onAdded = (idx, elem, _this) => {
     *     console.log(`요소 추가 후: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onAdded: OnFunc;

    /**
     * 컬렉션 요소를 삭제하기 전에 발생하는 이벤트입니다.
     * @event BaseCollection#onRemove
     * @example
     * myCollection.onRemove = (idx, elem, _this) => {
     *     console.log(`요소 삭제 전: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onRemove: OnFunc;
    
    /**
     * 컬렉션 요소를 삭제한 후에 발생하는 이벤트입니다.
     * @event BaseCollection#onRemoved
     * @example
     * myCollection.onRemoved = (idx, elem, _this) => {
     *     console.log(`요소 삭제 후: 인덱스 ${idx}, 요소 ${elem}`);
     * };
     */
    onRemoved: OnFunc;

    /**
     * 컬렉션을 초기화하기 전에 발생하는 이벤트입니다.
     * @param _this 현재 컬렉션
     * @event BaseCollection#onClear
     * @example
     * myCollection.onClear = (_this) => {
     *     console.log('컬렉션 초기화 전');
     * };
     */
    onClear: (_this: object)=> {};

    /**
     * 컬렉션을 초기화한 후에 발생하는 이벤트입니다.
     * @param _this 현재 컬렉션
     * @event BaseCollection#onCleared
     * @example
     * myCollection.onCleared = (_this) => {
     *     console.log('컬렉션 초기화 후');
     * };
     */
    onCleared: (_this: object)=> {};

    /**
     * 컬렉션 요소를 변경하기 전에 발생하는 이벤트 입니다.
     * @event BaseCollection#onChanging
     */
    onChanging: OnFunc;

    /**
     * 컬렉션 요소를 변경한 후에 발생하는 이벤트 입니다.
     * @event BaseCollection#onChanged
     */
    onChanged: OnFunc;

    /**
     * onAdd 이벤트를 발생시킵니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onAdd
     */
    _onAdd(idx: number, elem: any): void;

    /**
     * onAdded 이벤트를 발생시킵니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onAdded
     */
    _onAdded(idx: number, elem: any): void;

    /**
     * onRemove 이벤트를 발생시킵니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onRemove
     */
    _onRemove(idx: number, elem: any): void;
    
    /**
     * onRemoved 이벤트를 발생시킵니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onRemoved
     */
    _onRemoved(idx: number, elem: any): void;
    
    /**
     * onClear 이벤트를 발생시킵니다.
     * @listens BaseCollection#onClear
     */
    _onClear();
    
    /**
     * onCheared 이벤트를 발생시킵니다.
     * @listens BaseCollection#onCleared
     */
    _onCleared();

    /**
     * onChanging 이벤트를 발생시킵니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onChanging
     */
    _onChanging(idx: number, elem: any);

    /**
     * onChanged 이벤트를 발생시킵니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onChanged
     */
    _onChanged(idx: number, elem: any);

    /**
     * 컬렉션에 요소를 추가할 때 설정되는 기본 기술자입니다.
     * @param idx 인덱스 번호
     * @protected
     */
    _getPropDescriptor(idx: number): object;

    /**
     * 컬렉션의 요소를 삭제합니다. (내부 사용)
     * @param pos 인덱스 위치
     * @abstract
     */
    abstract _remove(pos: number): boolean;

    /**
     * 컬렉션 객체를 직렬화(guid 타입) 객체로 반환합니다.  
     * 순환 참조는 $ref 값으로 대체됩니다.
     * @param vOpt [p_vOpt=0] 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No) 
     * @param owned [p_owned={}] 현재 객체를 소유하는 상위 객체들
     * @example
     * a.getObject(2) == b.getObject(2)
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화(guid 타입) 객체를 컬렉션 객체에 설정합니다.  
     * 객체는 초기화됩니다.
     * @param oGuid 직렬화할 guid 타입의 객체
     * @param origin [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
     */
    setObject(oGuid: object, origin?: object);

    /**
     * 컬렉션에 요소를 삭제합니다.
     * @param elem 요소
     * @example
     * const removedIndex = myCollection.remove(someElement);
     * console.log(`삭제된 요소의 인덱스: ${removedIndex}`);
     */
    remove(elem: any): number;

    /**
     * 컬렉션에서 지정된 위치의 요소를 삭제합니다.
     * @param pos 인덱스 번호
     * @example
     * const success = myCollection.removeAt(0);
     * console.log(`요소 삭제 성공: ${success}`);
     */
    removeAt(pos: number): boolean;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @param elem 요소
     * @example
     * const exists = myCollection.contains(someElement);
     * console.log(`요소 존재 여부: ${exists}`);
     */
    contains(elem): boolean;

    /**
     * 컬렉션에서 요소를 조회합니다.
     * @param elem 요소
     * @example
     * const index = myCollection.indexOf(someElement);
     * console.log(요소의 인덱스: ${index});
     */
    indexOf(elem?: any): number;

    /**
     * 컬렉션에 요소를 추가합니다.
     * @abstract
     */
    abstract add(...args: any[]): void;

    /**
     * 컬렉션을 초기화 합니다.
     * @abstract
     */
    abstract clear(): void;
}

export = BaseCollection;