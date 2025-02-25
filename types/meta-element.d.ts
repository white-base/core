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
     * @param p_name 요소의 이름
     */
    constructor(p_name: string);

    /**
     * 직렬화된 객체를 가져옵니다.
     * @param p_vOpt 가져오기 옵션
     * @param p_owned 소유 객체
     * @returns 직렬화된 객체
     */
    getObject(p_vOpt?: number, p_owned?: object | Array<object>): object;

    /**
     * 직렬화된 객체를 설정합니다.
     * @param p_oGuid 직렬화 객체
     * @param origin 원본 객체
     */
    setObject(p_oGuid: object, origin?: object): void;

    /**
     * 객체를 복제합니다.
     * @returns 복제된 MetaElement
     */
    clone(): MetaElement;
}

export default MetaElement;
export { MetaElement };