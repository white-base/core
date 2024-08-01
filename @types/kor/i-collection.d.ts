/**
 * 컬렉션 인터페이스입니다.
 * @interface
 */
declare interface ICollection {

    /**
     * 컬렉션에 요소를 추가합니다.
     * @param args - 추가할 요소들
     * @returns 추가한 요소의 인덱스
     */
    add(...args: any[]): number;

    /**
     * 컬렉션에서 요소를 제거합니다.
     * @param args - 제거할 요소들
     * @returns 제가한 요소의 인덱스. 요소가 존재하지 않으면 -1
     */
    remove(...args: any[]): number;

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @param args - 확인할 요소들
     * @returns 요소가 존재하면 true, 그렇지 않으면 false
     */
    contains(...args: any[]): boolean;

    /**
     * 컬렉션에서 요소를 조회합니다.
     * @param args - 조회할 요소들
     * @returns 요소의 인덱스. 요소가 존재하지 않으면 -1
     */
    indexOf(...args: any[]): number;
}

export = ICollection;