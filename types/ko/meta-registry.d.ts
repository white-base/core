import NamespaceManager from "./namespace-manager";
import MetaObject from "./meta-object";
import { RefObject, NsObject, SetObject } from "./T";

/**
 * 메타 객체 등록소입니다. (static)
 */
declare class MetaRegistry {
    
    /**
     * 메타 객체 목록 (참조값)
     */
    static _list: any[];

    /**
     * 메타 객체 전체 갯수
     */
    static get count(): number;

    /**
     * 메타 객체의 네임스페이스
     */
    static get namespace(): NamespaceManager;

    /**
     * 등록된 메타 객체 및 네임스페이스를 초기화합니다.
     */
    static init(): void;

    /**
     * 메타 객체를 등록하고, 생성자를 네임스페이스에 등록합니다.
     * - 기존에 객체가 등록되어 있으면 예외가 발생합니다.  
     * - 네임스페이스에 생성자가 없을 경우 등록합니다.
     * 
     * @param meta - 메타 객체
     */
    static register(meta: MetaObject): void;

    /**
     * 등록소에서 메타 객체를 해제합니다.
     * 
     * @param meta - 메타 객체 또는 GUID
     * @returns 성공 여부
     */
    static release(meta: MetaObject | string): boolean;

    /**
     * 등록소에 메타 객체 여부를 확인합니다.
     * 
     * @param oGuid - GUID 타입의 객체 또는 GUID
     * @returns 존재 여부
     */
    static has(oGuid: object | string): boolean;

    /**
     * 등록소에서 메타 객체를 찾습니다.
     * 
     * @param oGuid - GUID 타입의 객체 또는 GUID
     * @returns 메타 객체 또는 undefined
     */
    static find(oGuid: object | string): MetaObject | undefined;

    /**
     * 매타 객체 여부를 확인합니다.
     * 
     * @param target - 대상 객체
     * @returns 존재 여부
     */
    static isMetaObject(target: object): boolean;

    /**
     * GUID 객체에 대한 메타 객체를 생성합니다.
     * 
     * @param oGuid - GUID 타입의 객체입니다.
     * @param origin - 현재 객체를 설정하는 원본 객체입니다. 기본값은 `oGuid`입니다.
     */
    static createMetaObject(oGuid: object, origin?: object): MetaObject;

    /**
     * GUID 객체에 대한 참조 객체를 생성합니다.
     * 
     * @param meta - 메타 객체입니다.
     * @returns 생성된 참조 객체를 반환합니다. { $ref: 'guid값' }
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createReferObject(meta);
     * console.log(obj.owner); // { $ref: '5337877c-49d6-9add-f35a-7bd31d510d4f' }
     */
    static createReferObject(meta: MetaObject): RefObject;

    /**
     * 함수를 네임스페이스에 등록하고 참조 객체를 생성합니다.
     * 
     * @param target - 함수 또는 생성자입니다.
     * @returns 생성된 네임스페이스 참조 객체를 반환합니다.
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createNsReferObject(meta.constructor);
     * console.log(obj.owner); // { $ns: 'Meta.MetaElement' }
     */
    static createNsReferObject(target: Function): NsObject;

    /**
     * GUID 객체에 메타 객체의 GUID를 설정합니다.
     * - oGuid.$set = meta._guid
     * @param oGuid - GUID 타입의 객체입니다.
     * @param meta - GUID를 가지는 메타 객체입니다.
     * @returns 설정된 객체를 반환합니다.
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = { name: 'm2' };
     * MetaRegistry.setMetaObject(obj, meta);
     * console.log(obj); // {name: 'm2', $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     */
    static setMetaObject(oGuid: object, meta: MetaObject): MetaObject;

    /**
     * GUID 객체의 유효성 검사를 합니다.
     *  유효성 검사는 다음을 포함합니다:
     * 1. 객체의 GUID 값 중복 여부 확인
     * 2. 객체의 '$ref' 값 존재 여부 확인
     * 3. 객체의 '$ns' 값 존재 여부 확인
     * 4. 객체의 '_key'와 '_elem' 갯수 검사
     * 
     * @param oGuid - 검사할 GUID 객체입니다.
     * @returns GUID 객체 여부를 반환합니다.
     */
    static validObject(oGuid: object): boolean;

    /**
     * 대상 객체가 GUID 객체인지 여부를 확인합니다.
     * 
     * @param target - 확인할 대상입니다.
     * @returns GUID 객체 여부를 반환합니다.
     */
    static isGuidObject(target: object): boolean;

    /**
     * 원본 객체에 GUID 객체가 포함되어 있는지 확인합니다.
     * 
     * @param oGuid - 확인할 GUID 객체 또는 문자열입니다.
     * @param origin - 원본 객체입니다.
     * @returns 포함 여부를 반환합니다.
     */
    static hasGuidObject(oGuid: object | string, origin: object | object[]): boolean;

    /**
     * GUID 객체에 참조 타입 요소가 포함되어 있는지 확인합니다.
     * 참조 타입은 `$ref`와 `$ns`입니다.
     * 
     * @param oGuid - 확인할 GUID 객체입니다.
     * @returns 포함 여부를 반환합니다.
     */
    static hasRefer(oGuid: object): boolean;

    /**
     * 원본 객체에서 설정된 GUID 객체를 찾습니다.
     * 
     * @param oGuid - 조회할 GUID 값 또는 GUID 객체입니다.
     * @param origin - 원본 객체입니다.
     * @returns 조회된 메타 객체를 반환합니다.
     */
    static findSetObject(oGuid: object | string, origin: object): MetaObject;

    /**
     * GUID 객체의 참조 요소 값을 객체 참조로 변환합니다.
     * 변환 대상: `$ns`는 `[object Object]`로 변환됩니다.
     * 
     * @param oGuid - 변환할 GUID 객체입니다.
     * @returns 변환된 객체를 반환합니다.
     */
    static transformRefer(oGuid: object): object;

    /**
     * 네임스페이스에 생성자 또는 객체를 등록합니다.
     * 중복 검사를 수행한 후 등록하며, 기본 제공 함수는 내부에 저장하지 않습니다.
     * 
     * @param target - 등록할 대상입니다.
     * @param ns - 네임스페이스 이름입니다.
     * @param key - 대상 이름입니다.
     */
    static registerClass(target: Function | object, ns: string, key: string): void;

    /**
     * 네임스페이스(ns)에서 생성자 또는 객체를 해제합니다.
     * 
     * @param fullName - 네임스페이스 전체 이름
     * @returns 삭제 성공 여부
     */
    static releaseClass(fullName: string): boolean;

    /**
     * 네임스페이스(ns)에서 생성자 또는 객체를 찾아 전체 경로를 돌려줍니다.
     * 
     * @param target - 생성자 또는 객체
     * @returns 네임스페이스 전체 이름 또는 undefined
     */
    static findClass(target: Function): string | undefined;

    /**
     * 네임스페이스(ns)에서 전체 이름에 대한 생성자 또는 객체를 얻습니다.
     * 
     * @param fullName - 전체 경로
     * @returns 객체 또는 생성자
     */
    static getClass(fullName: string): object | undefined;

    /**
     * 직렬화된 GUID 문자열을 파싱하여 `MetaObject`로 변환합니다.
     * 
     * @param str - 직렬화된 GUID 문자열입니다.
     * @param parse - JSON 파서 함수입니다. 기본값은 `JSON.parse`입니다.
     * @returns 파싱된 메타 객체를 반환합니다.
     */
    static loadMetaObject(str: string, parse?: Function): MetaObject;
}

export default MetaRegistry;
export { MetaRegistry };
