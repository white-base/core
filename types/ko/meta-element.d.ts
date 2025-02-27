import IElement from "./i-element";
import MetaObject from "./meta-object";

/**
 * MetaElement 클래스는 MetaObject를 상속하며, IElement 인터페이스를 구현합니다.
 */
declare class MetaElement extends MetaObject implements IElement {

    /**
     * 요소명
     */
    _name: string;

    /**
     * MetaElement 인스턴스를 생성합니다.
     * 
     * @param name - 요소의 이름
     */
    constructor(name: string);

    /**
     * 직렬화된 객체를 가져옵니다.
     * 
     * @param mode - 가져오기 옵션   
     * opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * opt=2 : 비침조 구조(_guid:No,  $ref:No)  
     * @param context - 현재 객체를 소유하는 상위 객체들
     * @returns guid 타입 객체
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
     * 
     * @param serializedObj - 직렬화 객체
     * @param originalObj - 원본 객체
     */
    setObject(serializedObj: object, originalObj?: object): void;

    /**
     * 현재 객체를 복제합니다.
     * 
     * @returns 복제된 MetaElement
     */
    clone(): MetaElement;
}

export default MetaElement;
export { MetaElement };