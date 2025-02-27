/**
 * 목록 인터페이스입니다.
 * 
 * @interface
 */
declare interface IList<T> {
    
    /**
     * 목록 데이터입니다.
     */
    _list: T[];

    /**
     * 목록 갯수입니다.
     */
    count: number;
}

export default IList;
export { IList };
