/**
 * 목록 인터페이스입니다.
 * @interface
 */
declare interface IList {

    /**
     * 목록입니다.
     * @type {any[]}
     */
    _list: any[];

    /**
     * 목록 갯수입니다.
     * @type {number}
     */
    count: number;
}

export = IList;
