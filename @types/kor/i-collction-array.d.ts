import ICollection          = require("./i-collection");

/**
 * 배열 컬렉션 인터페이스 입니다.
 * @interface
 */
declare interface IArrayCollection extends ICollection {

    /** 배열 컬렉션 인터페이스 입니다. */
    // constructor();

    /** 요소를 지정위치에 추가합니다. */
    insertAt(pos: number, elem: any);
}

export = IArrayCollection;