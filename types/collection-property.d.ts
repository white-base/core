import IPropertyCollection from "./i-collection-property";
import BaseCollection from "./base-collection";
import MetaObject from "./meta-object";

declare class PropertyCollection<T> extends BaseCollection<T> implements IPropertyCollection<T> {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    constructor(p_owner?: any);

    /**
     * 요소를 컬렉션에서 제거합니다.
     */
    _remove(): void;

    /**
     * 컬렉션을 초기화합니다.
     */
    clear(): void;

    /**
     * 프로퍼티 컬렉션에 요소를 추가합니다.
     * 
     * @param key - key 요소의 키입니다.
     * @param elem - 추가할 요소입니다.
     * @param {PropertyDescriptor} [desc] - 요소에 대한 프로퍼티 기술자 객체입니다. 선택값입니다.
     * @returns {number} 추가된 요소의 인덱스입니다.
     */
    add(key: string, elem: any,  desc?: PropertyDescriptor): number;

    /**
     * 프로퍼티 컬렉션 객체를 직렬화(guid 타입) 객체로 가져옵니다.
     * @param p_vOpt 옵션 값
     * @returns 직렬화된 객체
     */
    getObject(p_vOpt?: number): object;

    /**
     * 직렬화된 객체를 설정합니다.
     * @param p_oGuid 직렬화 객체
     */
    setObject(p_oGuid: object): void;

    /**
     * 컬렉션의 키 존재 여부를 확인합니다.
     * @param p_key 키 값
     * @returns 존재 여부
     */
    exist(p_key: string): boolean;

    /**
     * 인덱스 값을 기반으로 키를 조회합니다.
     * @param index 조회할 인덱스
     * @returns 해당 인덱스의 키
     */
    indexToKey(index: number): string;
}

export default PropertyCollection;
export { PropertyCollection };