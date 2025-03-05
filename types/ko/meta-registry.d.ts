import NamespaceManager from "./namespace-manager";
import MetaObject from "./meta-object";
import { RefObject, NsObject, SetObject } from "./T";

/**
 * `MetaRegistry`는 메타 객체의 등록과 관리를 담당하는 클래스입니다.
 */
declare class MetaRegistry {
    
    /**
     * 메타 객체 목록입니다.
     */
    static _list: any[];

    /**
     * 현재 등록된 메타 객체의 총 개수입니다. 
     */
    static get count(): number;

    /**
     * 메타 객체의 네임스페이스 관리자입니다.
     */
    static get namespace(): NamespaceManager;

    /**
     * 등록된 메타 객체 및 네임스페이스를 초기화합니다.
     */
    static init(): void;

    /**
     * 메타 객체를 등록하고, 생성자를 네임스페이스에 등록합니다.  
     * 기존에 객체가 등록되어 있으면 예외가 발생합니다.  
     * 네임스페이스에 생성자가 없을 경우 등록합니다.  
     * 
     * @param metaObj - 등록할 메타 객체
     * @throws  객체가 이미 등록된 경우 예외가 발생합니다.
     */
    static register(metaObj: MetaObject): void;

    /**
     * 등록소에서 메타 객체를 해제합니다.
     * 
     * @param metaOrGuid - 메타 객체 또는 GUID 문자열
     * @returns 제거 성공 여부 (`true` 또는 `false`)
     */
    static release(metaOrGuid: MetaObject | string): boolean;

    /**
     * 등록소에 메타 객체가 있는지 여부를 확인합니다.
     * 
     * @param metaOrGuid - GUID 타입의 객체 또는 GUID 문자열
     * @returns 존재 여부 (`true` 또는 `false`)
     */
    static has(metaOrGuid: MetaObject | object | string): boolean;

    /**
     * 등록소에서 메타 객체를 찾습니다.
     * 
     * @param metaOrGuid - GUID 타입의 객체 또는 GUID 문자열
     * @returns 찾은 메타 객체, 찾지 못한 경우 `undefined`
     */
    static find(metaOrGuid: MetaObject | object | string): MetaObject | undefined;

    /**
     * 메타 객체 여부를 확인합니다.
     * 
     * @param target - 대상 객체
     * @returns 메타 객체 여부 (`true` 또는 `false`)
     */
    static isMetaObject(target: unknown): boolean;

    /**
     * GUID 객체의 메타 객체를 생성합니다. 
     * 
     * @param guidObj - GUID 타입의 객체
     * @param guidRootObj - 초기 GUID 리터럴 객체 
     * @returns 생성된 메타 객체
     */
    static createMetaObject(guidObj: object, guidRootObj?: object): MetaObject;

    /**
     * GUID 객체의 참조 객체를 생성합니다. 
     * 
     * @param metaObj - 메타 객체
     * @returns 생성된 참조 객체 (`{ $ref: 'guid값' }`)
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createReferObject(meta);
     * console.log(obj.owner);  // Out: { $ref: '5337877c-49d6-9add-f35a-7bd31d510d4f' }
     */
    static createReferObject(metaObj: MetaObject): RefObject;

    /**
     * 함수를 네임스페이스에 등록하고 참조 객체를 생성합니다.
     * 
     * @param target - 함수 또는 생성자
     * @returns 생성된 네임스페이스 참조 객체 (`{ $ns: 'Meta.MetaElement' }`)
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createNsReferObject(meta.constructor);
     * console.log(obj.owner); // Out: { $ns: 'Meta.MetaElement' }
     */
    static createNsReferObject(target: Function): NsObject;

    /**
     * GUID 객체에 메타 객체의 GUID를 설정합니다.  
     * guidObj.$set = meta._guid  
     * 
     * @param guidObj - GUID 타입의 객체
     * @param metaObj - 메타 객체
     * @returns 설정된 객체
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = { name: 'm2' };
     * MetaRegistry.setMetaObject(obj, meta);
     * console.log(obj); // Out: {name: 'm2', $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     */
    static setMetaObject(guidObj: object, metaObj: MetaObject): MetaObject;

    /**
     * GUID 객체의 유효성 검사를 합니다.  
     * 1. 객체의 GUID 값 중복 여부 확인  
     * 2. 객체의 '$ref' 값 존재 여부 확인  
     * 3. 객체의 '$ns' 값 존재 여부 확인  
     * 4. 객체의 '_key'와 '_elem' 개수 검사  
     * 
     * @param guidObj - 검사할 GUID 객체
     * @returns 검사 결과 (`true` 또는 `false`)
     */
    static validObject(guidObj: object): boolean;

    /**
     * 대상 객체가 GUID 객체인지 여부를 확인합니다.
     * 
     * @param target - 확인할 대상 객체
     * @returns GUID 객체 여부 (`true` 또는 `false`)
     */
    static isGuidObject(target: object): boolean;

    /**
     * 원본 객체에 GUID 객체가 포함되어 있는지 확인합니다.  
     * 
     * @param guidObj - 확인할 GUID 객체 또는 GUID 문자열
     * @param guidRootObj - 조회 대상의 GUID 리터럴 객체 
     * @returns 포함 여부 (`true` 또는 `false`)
     */
    static hasGuidObject(guidObj: object | string, guidRootObj: object | object[]): boolean;

    /**
     * GUID 객체에 참조 타입 요소가 포함되어 있는지 확인합니다.  
     * 참조 타입은 `$ref`와 `$ns`입니다.  
     * 
     * @param guidObj - 확인할 GUID 객체
     * @returns 포함 여부 (`true` 또는 `false`)
     */
    static hasRefer(guidObj: object): boolean;

    /**
     * 저장소에서 설정된 GUID 객체를 검색합니다.  
     * 
     * @param guidObj - 조회할 GUID 객체 또는 GUID 문자열
     * @param guidRootObj - 조회 대상이 포함된 GUID 리터럴 객체  
     * @returns 조회된 메타 객체
     */
    static findSetObject(guidObj: object | string, guidRootObj: object): MetaObject;

    /**
     * GUID 객체의 참조 요소 값을 실제 객체 참조로 변환합니다.  
     * 변환 대상: `$ns`는 `[Object Object]`로 변환됩니다.  
     * 
     * @param guidObj - 변환할 GUID 객체
     * @returns 변환된 메타 객체
     */
    static transformRefer(guidObj: object): object;

    /**
     * 지정된 네임스페이스에 생성자 또는 객체를 등록합니다.  
     * 중복 검사를 수행한 후 등록하며, 기본 제공 함수(Array, String, Number 등)는 저장하지 않습니다. 
     * 
     * @param target - 등록할 대상(클래스 생성자 또는 객체)
     * @param namespace - 네임스페이스 이름 (점 `.`으로 구분)
     * @param classOrFuncName - 대상 이름 (클래스명 또는 함수명), 지정하지 않으면 네임스페이스의 마지막 이름이 적용됩니다.  
     */
    static registerClass(target: Function | object, namespace: string, classOrFuncName?: string): void;

    /**
     * 네임스페이스에서 등록된 항목을 해제합니다.
     * 
     * @param nsPath - 네임스페이스 전체 경로 (`string`)
     * @returns 삭제 성공 여부 (`true` 또는 `false`)
     */
    static releaseClass(nsPath: string): boolean;

    /**
     * 네임스페이스에서 지정된 생성자 또는 객체를 찾아 전체 경로를 반환합니다.
     * 
     * @param target - 생성자 또는 객체
     * @returns 네임스페이스 전체 경로, 찾지 못한 경우 `undefined`
     */
    static findClass(target: Function): string | undefined;

    /**
     * 네임스페이스에서 지정된 전체 경로에 해당하는 생성자 또는 객체를 반환합니다.
     * 
     * @param nsPath - 네임스페이스 전체 경로
     * @returns 해당하는 객체 또는 생성자, 찾지 못한 경우 `undefined`
     */
    static getClass(nsPath: string): object | undefined;

    /**
     * 직렬화된 JSON 문자열을 파싱하여 `MetaObject`로 변환합니다.
     * 
     * @param str - 직렬화된 JSON 문자열
     * @param jsonParser - JSON 파서 함수 (기본값은 `JSON.parse`)
     * @returns 변환된 메타 객체
     */
    static loadMetaObject(str: string, jsonParser?: Function): MetaObject;
}

export default MetaRegistry;
export { MetaRegistry };
