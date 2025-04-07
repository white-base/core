import type ICollection from "./i-collection.d.ts";

/**
 * 프로퍼티 컬렉션 인터페이스입니다.
 */
declare interface IPropertyCollection<T> extends ICollection<T> {
    /**
     * 지정한 인덱스의 프로퍼티 키를 반환합니다.
     * 
     * @param index - 확인할 프로퍼티의 인덱스
     * @returns 해당 인덱스의 프로퍼티 키
     */
    indexToKey(index: number): string;
}

export default IPropertyCollection;
export { IPropertyCollection };