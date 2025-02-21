import IArrayCollection from "./i-collection-array";
import BaseCollection from "./base-collection";

declare class ArrayCollection<T> extends BaseCollection<T> implements IArrayCollection<T> {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    constructor(p_owner?: any);

    /**
     * 요소를 컬렉션에서 제거합니다.
     */
    _remove(): void;

    /**
     * 요소를 컬렉션에 추가합니다.
     * @param p_elem 추가할 요소
     * @returns 추가된 인덱스
     */
    add(p_elem: T): number;

    /**
     * 컬렉션을 초기화합니다.
     */
    clear(): void;

    /**
     * 지정한 위치에 요소를 추가합니다.
     * @param p_pos 추가할 위치
     * @param p_elem 추가할 요소
     * @returns 성공 여부
     */
    insertAt(p_pos: number, p_elem: T): boolean;

    /**
     * 요소를 직렬화된 객체로 가져옵니다.
     * @param p_vOpt 옵션 값
     * @returns 직렬화된 객체
     */
    getObject(p_vOpt?: number): object;

    /**
     * 직렬화된 객체를 설정합니다.
     * @param p_oGuid 직렬화 객체
     */
    setObject(p_oGuid: object): void;
}

export default ArrayCollection;
export { ArrayCollection };
