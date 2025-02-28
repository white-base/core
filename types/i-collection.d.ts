/**
 * 컬렉션 인터페이스입니다.
 */
declare interface ICollection<T> {
    
    /**
     * 컬렉션에 요소를 추가합니다.
     * @returns 추가한 요소의 인덱스
     */
    add(...args: any[]): number;

    /**
     * 컬렉션에서 요소를 제거합니다.
     * 
     * @param elem - 제거할 요소
     * @returns 제가한 요소의 인덱스. 요소가 존재하지 않으면 -1
     */
    remove(elem: T): number;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * 
     * @param elem - 확인할 요소
     * @returns 존재 여부
     */
    contains(elem: T): boolean;

    /**
     * 컬렉션에서 요소의 인덱스를 조회합니다.
     * 
     * @param elem - 조회할 요소
     * @returns 요소의 인덱스 (없으면 -1)
     */
    indexOf(elem: T): number;
}

export default ICollection;
export { ICollection };