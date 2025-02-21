interface IElement {
    /**
     * 요소명
     */
    _name: string;

    /**
     * 요소를 복제합니다.
     * @returns 복제된 요소
     */
    clone(): any;
}

export default IElement;
export { IElement };