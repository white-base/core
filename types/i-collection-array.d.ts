import ICollection from "./i-collection";

/**
 * 배열 컬렉션 인터페이스입니다.
 */
declare interface IArrayCollection<T> extends ICollection<T> {

    /**
     * 요소를 지정위치에 추가합니다.
     * 
     * @param index - 추가할 위치
     * @param elem - 추가할 요소
     * @returns 추가 여부
     */
    insertAt(index: number, elem: T): boolean;
}

export default IArrayCollection;
export { IArrayCollection };