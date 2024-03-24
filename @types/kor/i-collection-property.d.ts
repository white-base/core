/**
 * 프로퍼티 컬렉션 인터페이스 입니다.
 * @interface
 */
declare interface IPropertyCollection {

    /** 프로퍼티 컬렉션 인터페이스 입니다. */
    // constructor();

    /** 프로퍼티 키가 존재하는지 확인합니다. */
    keyOf(idx: number);
}

export = IPropertyCollection;