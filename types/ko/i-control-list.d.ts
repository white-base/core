/**
 * 목록 제어 인터페이스입니다.
 * 
 * @interface
 */
declare interface IListControl {
    
    /**
     * 목록에 대상을 추가합니다.
     */
    add(...args: any[]): void;

    /**
     * 목록에서 대상을 삭제합니다.
     */
    del(...args: any[]): void;

    /**
     * 목록에 대상의 존재 여부를 확인합니다.
     * 
     * @returns 존재 여부
     */
    has(...args: any[]): boolean;

    /**
     * 목록에서 대상을 찾습니다.
     * 
     * @returns 찾은 대상 또는 undefined
     */
    find(...args: any[]): any | undefined;
}

export default IListControl;
export { IListControl };