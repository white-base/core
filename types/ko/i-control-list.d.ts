/**
 * 목록 제어 인터페이스입니다.
 * @interface
 */
declare interface IListControl {

    /**
     * 목록에 대상을 추가합니다.
     * @param args - 추가할 대상들
     */
    add(...args: any[]): void;

    /**
     * 목록에서 대상을 삭제합니다.
     * @param args - 삭제할 대상들
     * @returns 대상이 성공적으로 삭제되면 true, 그렇지 않으면 false
     */
    del(...args: any[]): boolean;

    /**
     * 목록에 대상의 존재 여부를 확인합니다.
     * @param args - 존재 여부를 확인할 대상들
     * @returns 대상이 존재하면 true, 그렇지 않으면 false
     */
    has(...args: any[]): boolean;

    /**
     * 목록에서 대상을 찾습니다.
     * @param args - 찾을 대상들
     * @returns 대상이 존재하면 해당 대상, 존재하지 않으면 undefined
     */
    find(...args: any[]): any | undefined;
}

export = IListControl;
