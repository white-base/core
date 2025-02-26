/**
 * 요소(독립) 인터페이스 입니다.
 * @interface
 */
declare interface IElement {
    /**
     * 요소명
     */
    _name: string;

    /**
     * 요소를 복제합니다.
     * 
     * @param args - 로드에 필요한 인수들
     * @returns 복제된 요소
     */
    clone(...args: any[]): object;
}

export default IElement;
export { IElement };