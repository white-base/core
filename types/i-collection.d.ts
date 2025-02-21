interface ICollection<T> {
    /**
     * 컬렉션에 요소를 추가합니다.
     * @param item 추가할 요소
     */
    add(...params: any[]): void;

    /**
     * 컬렉션에서 요소를 제거합니다.
     * @param item 제거할 요소
     */
    remove(item: T): void;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @param item 확인할 요소
     * @returns 존재 여부
     */
    contains(item: T): boolean;

    /**
     * 컬렉션에서 요소의 인덱스를 조회합니다.
     * @param item 조회할 요소
     * @returns 요소의 인덱스 (없으면 -1)
     */
    indexOf(item: T): number;
}

export default ICollection;
export { ICollection };