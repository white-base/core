/**
 * 목록 인터페이스입니다.
 */
declare interface IList<T> {
    
    _list: T[];

    count: number;
}

export default IList;
export { IList };
