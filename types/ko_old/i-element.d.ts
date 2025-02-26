/**
 * 요소(독립) 인터페이스 입니다.
 * @interface
 */
declare interface IElement {

    /**
     * 요소를 복제합니다.
     * @returns 복제된 요소
     */
    clone(): IElement;
}

export = IElement;