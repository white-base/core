import IElement from "./i-element";
import MetaObject from "./meta-object";

declare class MetaElement extends MetaObject implements IElement {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    /**
     * 요소명
     */
    _name: string;

    constructor(p_name: string);

    /**
     * 직렬화된 객체를 가져옵니다.
     * @param p_vOpt 가져오기 옵션
     * @returns 직렬화된 객체
     */
    getObject(p_vOpt?: number): object;

    /**
     * 직렬화된 객체를 설정합니다.
     * @param p_oGuid 직렬화 객체
     */
    setObject(p_oGuid: object): void;

    /**
     * 객체를 복제합니다.
     * @returns 복제된 MetaElement
     */
    clone(): MetaElement;
}

export default MetaElement;
export { MetaElement };