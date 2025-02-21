import EventEmitter from "./event-emitter";
import ICollection from "./i-collection";
import IList from "./i-list";
import MetaObject from "./meta-object";

declare abstract class BaseCollection<T> extends MetaObject implements ICollection<T>, IList<T> {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    /**
     * 컬렉션 요소 목록
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
     * 이벤트 객체
     */
    protected $event: EventEmitter;

    constructor(p_owner?: any);

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
     * @param item 추가할 요소
     */
    abstract add(...params: any[]): void;

    /**
     * 요소를 컬렉션에서 제거합니다.
     */
    abstract _remove(): void;

    /**
     * 컬렉션을 초기화합니다.
     */
    abstract clear(): void;
}

export default BaseCollection;
export { BaseCollection };