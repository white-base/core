interface IListControl {
    /**
     * 목록에 대상을 추가합니다.
     */
    add(...params: any[]): void;

    /**
     * 목록에서 대상을 삭제합니다.
     * @param item 삭제할 대상
     */
    del(...params: any[]): void;

    /**
     * 목록에 대상의 존재 여부를 확인합니다.
     * @param item 확인할 대상
     * @returns 존재 여부
     */
    has(...params: any[]): boolean;

    /**
     * 목록에서 대상을 찾습니다.
     * @param item 찾을 대상
     * @returns 찾은 대상 또는 undefined
     */
    find(...params: any[]): any | undefined;
}

export default IListControl;
export { IListControl };