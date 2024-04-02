import ICollection          = require("./i-collection");
import IList                = require("./i-list");
import MetaObject           = require("./meta-object");
import Observer             = require("./observer");
import T                    = require("./T");


/**
 * @param idx 인덱스 번호
 * @param elem 요소
 * @param _this 현재 컬렉션
 */
type OnFunc = (idx: number, elem: any, _this: object)=> void;

/**
 * 기본 컬렉션 추상 클래스(최상위) 입니다.
 */
declare abstract class BaseCollection extends MetaObject implements ICollection, IList {
    /**
     * 기본 컬렉션을 생성합니다.(최상위)
     * @param owner 소유 객체
     * @private
     */
    constructor(owner: object);

    /**
     * 이벤트 객체
     * @private
     */
    $event: Observer;

    /**
     * 컬렉션 소유자
     * @protected
     */
    _owner: object;
    
    /**
     * 컬렉션 요소들
     * @readonly
     */
    _elements: any[];

    /**
     *  컬렉션 요소의 기술들 (getter, setter)
     * @readonly
     */
    _descriptors: object[];

    /**
     * 컬렉션 요소의 타입 (제약조건)
     * @protected
     */
    _elemTypes: any[];

    /**
     * 컬렉션 요소의 목록
     * @readonly
     */
    list: any[];

    /**
     * 컬렉션 요소의 갯수
     * @readonly
     */
    count: number;

    /**
     *  컬렉션 예약어
     * @private
     */
    __KEYWORD: string[];

    /**
     * 컬렉션 요소를 추가 전에 발생하는 이벤트 입니다.
     * @event BaseCollection#onAdd
     */
    onAdd: T.OnFunc;

    /**
     * 컬렉션 요소를 추가 후에 발생하는 이벤트 입니다.
     * @event BaseCollection#onAdded
     */
    onAdded: T.OnFunc;

    /**
     * 컬렉션 요소를 삭제 전에 발생하는 이벤트 입니다.
     * @event BaseCollection#onRemove
     */
    onRemove: T.OnFunc;
    
    /**
     * 컬렉션 요소를 삭제 후에 발생하는 이벤트 입니다.
     * @event BaseCollection#onRemoved
     */
    onRemoved: T.OnFunc;

    /**
     * 컬렉션을 초기화 전에 발생하는 이벤트 입니다.
     * @param _this 현재 컬렉션
     * @event BaseCollection#onClear
     */
    onClear: (_this: object)=> {};

    /**
     * 컬렉션을 초기화 후에 발생하는 이벤트 입니다.
     * @param _this 현재 컬렉션
     * @event BaseCollection#onCleared
     */
    onCleared: (_this: object)=> {};

    /**
     *  컬렉션 요소를 변경 전에 발생하는 이벤트 입니다.
     * @event BaseCollection#onChanging
     */
    onChanging: T.OnFunc;

    /**
     * 컬렉션 요소를 변경 후에 발생하는 이벤트 입니다.
     * @event BaseCollection#onChanged
     */
    onChanged: T.OnFunc;

    /**
     * onAdd 이벤트를 발생합니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onAdd
     */
    _onAdd(idx: number, elem: any): void;

    /**
     * onAdded 이벤트를 발생합니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onAdded
     */
    _onAdded(idx: number, elem: any): void;

    /**
     * onRemove 이벤트를 발생합니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onRemove
     */
    _onRemove(idx: number, elem: any): void;
    
    /**
     * onRemoved 이벤트를 발생합니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onRemoved
     */
    _onRemoved(idx: number, elem: any): void;
    
    /**
     * onClear 이벤트를 발생합니다.
     * @listens BaseCollection#onClear
     */
    _onClear();
    
    /**
     * onCheared 이벤트를 발생합니다.
     * @listens BaseCollection#onCleared
     */
    _onCleared();

    /**
     * onChanging 이벤트를 발생합니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onChanging
     */
    _onChanging(idx: number, elem: any);

    /**
     * onChanged 이벤트를 발생합니다.
     * @param idx 인덱스 번호
     * @param elem 요소
     * @listens BaseCollection#onChanged
     */
    _onChanged(idx: number, elem: any);

    /**
     * 컬렉션에 요소를 추가 할 때 설정되는 기본 기술자입니다.
     * @param idx 인덱스 번호
     * @protected
     */
    _getPropDescriptor(idx: number);

    /**
     * 컬렉션의 요소를 삭제합니다. (내부)
     * @param pos 인덱스 위치
     * @abstract
     */
    abstract _remove(pos: number): boolean;


    /**
     * 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
     * (순환참조는 $ref 값으로 대체된다.) 
     * @param vOpt [p_vOpt=0] 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No) 
     * @param owned [p_owned={}] 현재 객체를 소유하는 상위 객체들
     * @example
     * a.getObject(2) == b.getObject(2
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화(guid 타입) 객체를 컬렉션 객체에 설정합니다.  
     * (객체는 초기화 된다.)
     * @param oGuid 직렬화 할 guid 타입의 객체
     * @param origin [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
     */
    setObject(oGuid: object, origin?: object);

    /**
     * 컬렉션에 요소를 삭제합니다.
     * @param elem 요소
     */
    remove(elem: any): number;

    /**
     *  컬렉션의 지정위치에 요소를 삭제합니다. 
     * @param pos 인덱스 번호
     */
    removeAt(pos: number): boolean;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @param elem 
     */
    contains(elem): boolean;

    /**
     * 컬렉션에 요소를 조회합니다.
     * @param elem 요소
     */
    indexOf(elem?: any): number;

    /**
     * 컬렉션에 요소를 추가합니다.
     * @abstract
     */
    abstract add(...args);

    /**
     * 컬렉션을 초기화 합니다.
     * @abstract
     */
    abstract clear();
}

export = BaseCollection;