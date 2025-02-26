import EventEmitter from "./event-emitter";
import ICollection from "./i-collection";
import IList from "./i-list";
import MetaObject from "./meta-object";

declare abstract class BaseCollection<T> extends MetaObject implements ICollection<T>, IList<T> {

    /**
     * 이벤트를 처리하는 객체입니다. 컬렉션의 다양한 이벤트를 등록하고 발생시킬 때 사용됩니다.
     */
    $event: EventEmitter;
    
    /**
     * 컬렉션의 요소들을 저장하는 배열입니다.
     */
    $elements: any[];

    /**
     * 각 컬렉션 요소에 대한 getter 및 setter 메서드를 정의하는 기술자 배열입니다.
     */
    $descriptors: object[];

    /**
     * 컬렉션의 예약어 목록입니다.
     */
    $KEYWORD: string[];

    /**
     * 컬렉션의 소유 객체입니다.
     */
    _owner: object;
    
    /**
     * 컬렉션 요소의 타입 제약조건을 정의합니다.
     */
    _elemTypes: any[];

    /**
     * 컬렉션의 요소 목록을 저장하는 배열입니다. 이 배열은 컬렉션의 실제 데이터를 포함합니다.
     */
    _list: T[];

    /**
     * 컬렉션 요소 개수
     */
    get count(): number;

    /**
     * 컬렉션 요소 개수 (길이)
     */
    get length(): number;

    /**
     * 컬렉션을 생성합니다.
     * @param owner 이 컬렉션을 소유하는 객체
     */
    constructor(owner?: any);

    /**
     * 요소를 컬렉션에서 제거합니다.
     * @param item 제거할 요소
     */
    remove(item: T): boolean;

    /**
     * 지정된 위치의 요소를 제거합니다.
     * @param index 제거할 위치
     * @returns 처리 결과
     */
    removeAt(index: number): boolean;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @param item 확인할 요소
     * @returns 존재 여부
     */
    contains(item: T): boolean;

    /**
     * 요소의 인덱스를 가져옵니다.
     * @param item 요소
     * @returns 요소의 인덱스 (없으면 -1)
     */
    indexOf(item: T): number;

    /**
     * 요소를 컬렉션에 추가합니다.
     */
    abstract add(...args: any[]): void;

    /**
     * 요소를 컬렉션에서 제거합니다.
     */
    abstract _remove(...args: any[]): boolean;

    /**
     * 컬렉션을 초기화합니다.
     */
    abstract clear(): void;
}

export default BaseCollection;
export { BaseCollection };