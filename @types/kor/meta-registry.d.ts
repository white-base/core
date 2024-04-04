
/// <reference path="global.d.ts" />

import NamespaceManager     = require("./namespace-manager");
import MetaObject           = require("./meta-object");
// import T                    = require("./T");

/**
 * 메타 객체 등록소 클래스 입니다.
 * @static
 */
declare class MetaRegistry {

    /**
     * 메타 객체 목록 (참조값)
     * @readonly
     */
    static list: any[];

    /**
     * 메타 객체 전체 갯수
     * @readonly
     */
    static count: number;

    /**
     * 메타 객체의 네임스페이스
     * @readonly
     */
    static ns: NamespaceManager;

    /**
     * 등록된 메타 객체 및 네임스페이스를 초기화 합니다.
     */
    static init();

    /**
     * 메타 객체를 등록하고, 생성자를 네임스페이스에 등록합니다.  
     * - 기존에 객체가 등록되어 있으면 예외가 발생합니다.  
     * - 네임스페이스에 생성자가 없을 경우 등록합니다.
     * @param meta 메타 객체
     */
    static register(meta: MetaObject);

    /**
     * 등록소에서 메타 객체를 해제합니다. 
     * @param meta 메타 객체 또는 guid
     */
    static release(meta: MetaObject | string): boolean;

    /**
     * 등록소에 메타 객체 여부를 확인합니다.
     * @param oGuid  guid 타입의 객체 또는 guid
     */
    static has(oGuid: object | string): boolean;

    /**
     * 등록소에서 메타 객체를 찾습니다.
     * @param oGuid guid 타입의 객체 또는 guid
     */
    static find(oGuid: object | string): MetaObject | undefined;

    /**
     * 매타 객체 여부를 확인합니다.  
     * @param target 대상 객체
     */
    static isMetaObject(target: object): boolean;

    /**
     * guid 객체에 대한 메타 객체를 생성합니다.
     * @param oGuid guid 타입의 객체
     * @param origin [origin=p_oGuid] 현재 객체를 설정하는 원본 객체
     */
    static createMetaObject(oGuid: object, origin?: object): MetaObject;

    
    /**
     * guid 객체에 대한 guid 참조를 생성합니다.  
     * @param meta 메타 객체
     * @returns ex> {$ref: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     * @example
     * var meta = new MetaElement('m1');
     * obj.onwer = MetaRegistry.createReferObject(meta);
     * console.log(obj.onwer); // { $ref : '5337877c-49d6-9add-f35a-7bd31d510d4f' }
     */
    static createReferObject(meta: MetaObject): RefObject;

    /**
     * target을 네임스페이스에 등록하고, 참조를 생성합니다.
     * 
     * @param target 함수 또는 생성자
     * @returns ex> { $ns: 'Meta.MetaObject'}
     * @example
     * var meta = new MetaElement('m1');
     * obj.onwer = MetaRegistry.createReferObject(meta);
     * console.log(obj);                // {onwer: {$ns: 'Meta.MetaElement'}}
     */
    static createNsReferObject(target: Function): NsObject;

    /**
     * guid 객체에 메타 객체의 guid 를 설정합니다.  
     * - oGuid.$set = meta._guid
     * @param oGuid guid 타입의 객체
     * @param meta guid을 가지는 객체 
     * @returns ex> { $set: ''5337877c-49d6-9add-f35a-7bd31d510d4f'}
     * @example
     * var meta = new MetaElement('m1');    // meta.guid = '5337877c-49d6-9add-f35a-7bd31d510d4f'
     * var obj = { name: 'm2' };
     * MetaRegistry.setMetaObject(obj, meta);
     * console.log(obj);                    // {name: 'm2, $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     */
    static setMetaObject(oGuid: object, meta: MetaObject): SetObject;

    /**
     * guid 객체의 유효성 검사를 합니다.  
     * 1. 객체의 guid 값의 중복 여부 확인합니다.  
     * 2. 객체의 '$ref'을 값으로 가지는 guid 객체의 존재 여부를 확인합니다.  
     * 3. 객체의 '$ns'을 값으로 하는 네임스페이스의 존재 여부를 확인합니다.  
     * 4. 객체의 '_key'와 '_elem' 의 갯수가 같은지 검사합니다.  
     * @param oGuid 검사할 guid 객체
     */
    static validObject(oGuid: object): boolean;

    /**
     * guid 객체 여부를 확인합니다.
     * @param target 확인 대상
     */
    static isGuidObject(target: object): boolean;

    /**
     * origin 객체에 guid 객체의 포함 여부를 확인합니다.
     * @param oGuid 확인 대상
     * @param origin  원본 객체
     */
    static hasGuidObject(oGuid: object | string, origin: object | object[]): boolean;

    /**
     * guid 객체에 참조타입 요소가 포함되어 있는지 확인힙니다.  
     * - 참조타입 : $ref: '', $ns:''
     * @param oGuid 확인 대상
     */
    static hasRefer(oGuid: object): boolean;

    /**
     * origin 객체에 설정된 guid 객체를 찾습니다.  
     * 1. guid 객체 내부에서 guid 값의 요소 조회 ?  
     * 2. 조회한 요소의 $set 값을 사용하여  메타객체 저장소헤 대상 객체 조회 ?   
     * @param oGuid 조회 대상 guid 값 또는  guid 객체
     * @param origin 원본 객체
     */
    static findSetObject(oGuid: object | string, origin: object): MetaObject;

    /**
     * guid 객체의 참조요소값을 객체 참조로 변환합니다.  
     * 변환대상 : $ns => [object object]
     * @param oGuid 변환할 guid 객체
     */
    static transformRefer(oGuid: object): object;

    /**
     * 네임스페이스(ns)에 생성자 또는 객체를 등록합니다.  
     * - 중복 검사 후 등록  
     * - 기본제공 함수는 내부 저장하지 않음  
     * @param target 대상
     * @param ns fullname 또는 네임스페이스 
     * @param key 대상 이름
     */
    static registerClass(target: Function | object, ns: string, key: string);

    /**
     * 네임스페이스(ns)에 생성자 또는 객체를 해제합니다.
     * @param fullName 네임스페이스 전체 이름
     */
    static releaseClass(fullName: string): boolean;

    /**
     * 네임스페이스(ns)에서 생성자 또는 객체를 찾아서 전체 경로를 돌려줍니다.
     * @param target 생성자 또는 객체 
     */
    static findClass(target: Function): string | undefined;

    /**
     * 네임스페이스(ns)에서 전체이름에 대한 생성자 또는 객체를 얻습니다.
     * @param fullName 전체경로
     */
    static getClass(fullName: string): object | Function | undefined;

    /**
     * 직렬화한 guid 문자열을 파싱하여 MetaObject 로 불러옵니다.  
     * @param str guid 객체를 직렬화한 문자열
     * @param parse JSON 파서
     */
    static loadMetaObject(str: string, parse?: Function): MetaObject;
}

export = MetaRegistry;