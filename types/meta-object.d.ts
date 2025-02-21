import IObject from "./i-object";
import IMarshal from "./i-marshal";

declare class MetaObject implements IObject, IMarshal {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    /**
     * 고유 식별자
     */
    readonly _guid: string;

    /**
     * 객체 타입
     */
    readonly _type: Function;

    /**
     * 네임스페이스
     */
    _ns: string;

    constructor();

    /**
     * 객체와 비교합니다.
     * @param p_target 비교할 대상
     * @returns 비교 결과
     */
    equal(p_target: any): boolean;

    /**
     * 객체 타입을 가져옵니다.
     * @returns 타입 배열
     */
    getTypes(): Function[];

    /**
     * 특정 타입의 인스턴스인지 확인합니다.
     * @param p_target 함수 또는 타입명
     * @returns 인스턴스 여부
     */
    instanceOf(p_target: Function | string): boolean;

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
}

export default MetaObject;
export { MetaObject };