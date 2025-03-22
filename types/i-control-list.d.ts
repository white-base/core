/**
 * 목록 제어 인터페이스입니다.
 */
declare interface IListControl {
    
    /**
     * 목록에 요소를 추가합니다.
     */
    add(...args: any[]): void;

    /**
     * 목록에서 요소를 제거합니다. 
     */
    del(...args: any[]): void;

    /**
     * 목록에서 요소가 존재하는지 확인합니다.
     * 
     * @returns 요소가 존재하면 `true`, 그렇지 않으면 `false`
     */
    has(...args: any[]): boolean;

    /**
     * 목록에서 요소를 검색합니다.
     * 
     * @returns 요소가 존재하면 `true`, 그렇지 않으면 `false`
     */
    find(...args: any[]): any | undefined;
}

export default IListControl;
export { IListControl };