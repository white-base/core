/**
 * 목록 인터페이스입니다.
 */
declare interface IList<T> {
    
    /**
     * 목록의 데이터를 저장하는 내부 배열입니다.
     */
    _list: T[];

    /**
     * 목록의 개수를 반환합니다. 
     */
    count: number;
}

export default IList;
export { IList };
