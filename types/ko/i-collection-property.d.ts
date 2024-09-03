import ICollection          from './i-collection';

/**
 * 프로퍼티 컬렉션 인터페이스입니다.
 * @interface
 * @extends ICollection
 */
declare interface IPropertyCollection extends ICollection {

    /**
     * 프로퍼티 키가 존재하는지 확인합니다.
     * @param idx - 확인할 프로퍼티의 인덱스
     * @returns 프로퍼티 키가 존재하면 true, 존재하지 않으면 false
     */
    indexToKey(idx: number);
}

export = IPropertyCollection;