import ICollection from "./i-collection";

interface IPropertyCollection<T> extends ICollection<T> {
    /**
     * 프로퍼티 키가 존재하는지 확인합니다.
     * @returns 해당 인덱스의 키
     */
    indexToKey(index: number): string;
}

export default IPropertyCollection;
export { IPropertyCollection };