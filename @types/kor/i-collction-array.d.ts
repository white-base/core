import ICollection          = require("./i-collection");

/**
 * 배열 컬렉션 인터페이스입니다.
 * @interface
 * @extends ICollection
 */
declare interface IArrayCollection extends ICollection {

    /**
     * 요소를 지정된 위치에 추가합니다.
     * @param pos - 요소를 추가할 위치 (인덱스)
     * @param elem - 추가할 요소
     * @returns void
     */
    insertAt(pos: number, elem: any);
}

export = IArrayCollection;