/**
 * 배열 컬렉션 인터페이스 입니다.
 * @interface
 */
declare class IArrayCollection {

    /** 배열 컬렉션 인터페이스 입니다. */
    // constructor();

    /** 요소를 지정위치에 추가합니다. */
    insertAt(pos: number, elem: any);
}

export = IArrayCollection;