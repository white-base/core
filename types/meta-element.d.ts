import IElement from "./i-element";
import MetaObject from "./meta-object";

/**
 * MetaElement 클래스는 MetaObject를 상속하며, IElement 인터페이스를 구현합니다.
 */
declare class MetaElement extends MetaObject implements IElement {

    /**
     * 요소의 이름입니다.
     */
    _name: string;

    /**
     * MetaElement 인스턴스를 생성합니다.
     * 
     * @param name - 요소의 이름
     */
    constructor(name: string);

    /**
     * 객체를 GUID 타입의 객체 리터럴로 반환합니다.
     * 
     * @param mode - 가져오기 모드  
     * mode=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * mode=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * mode=2 : 비침조 구조(_guid:No,  $ref:No)   
     * @param context - 현재 객체를 포함(소유)하는 상위 객체
     * @returns GUID 타입의 객체 리터럴
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * GUID 타입의 객체 리터럴을 인스턴스 객체로 변환하여 설정합니다.
     * 
     * @param guidObj - 설정할 GUID 타입의 객체 리터럴
     * @param guidRootObj - 변환 과정에서 참조되는 초기 GUID 리터럴 객체  
     */
    setObject(guidObj: object, guidRootObj?: object): void;

    /**
     * 현재 객체를 복제합니다.
     * 
     * @returns 복제된 객체
     */
    clone(): this;
}

export default MetaElement;
export { MetaElement };