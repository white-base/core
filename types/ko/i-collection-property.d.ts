import ICollection from "./i-collection";

/**
 * 프로퍼티 컬렉션 인터페이스입니다.
 * @interface
 * @extends ICollection
 */
declare interface IPropertyCollection<T> extends ICollection<T> {
    /**
     * 프로퍼티 키가 존재하는지 확인합니다.
     * 
     * @param index - 확인할 프로퍼티의 인덱스
     * @returns 해당 인덱스의 키
     */
    indexToKey(index: number): string;
}

export default IPropertyCollection;
export { IPropertyCollection };