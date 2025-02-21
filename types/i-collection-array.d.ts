import ICollection from "./i-collection";

interface IArrayCollection<T> extends ICollection<T> {
    /**
     * 요소를 지정위치에 추가합니다.
     * @param index 추가할 위치
     * @param item 추가할 요소
     */
    insertAt(index: number, item: T): void;
}

export default IArrayCollection;
export { IArrayCollection };