/**
 * 요소(독립) 인터페이스 입니다.
 */
declare interface IElement {
    
    /**
     * 요소의 이름을 저장하는 내부 속성입니다.
     */
    _name: string;

    /**
     * 현재 요소의 복사본을 생성합니다.
     * 
     * @param args - 로드에 필요한 인수들
     * @returns 복제된 요소
     */
    clone(...args: any[]): this;
}

export default IElement;
export { IElement };