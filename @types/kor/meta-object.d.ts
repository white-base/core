import IObject              = require("./i-object");
import IMarshal             = require("./i-marshal");

/**
 * MetaObject 클래스는 IObject 및 IMarshal 인터페이스를 구현하여 메타 데이터를 처리하는 객체입니다.
 */
declare class MetaObject implements IObject, IMarshal {
    
    /**
     * MetaObject 클래스의 인스턴스를 생성합니다.
     */
    constructor();

    /** 
     * 객체의 고유 식별자 (GUID). 객체를 고유하게 식별합니다.
     *  @type {string}
     */
    _guid: string;

    /** 
     * 객체의 생성자 함수. 객체가 생성될 때 사용된 함수입니다.
     * @type {Function}
     */
    _type: Function;

    /**
     * 현재 객체와 지정된 객체가 동일한지 비교합니다.
     * @param target  비교할 대상 객체
     * @returns {boolean} 두 객체가 동일한지 여부
     */
    equal(target: object): boolean;

    /**
     * 현재 객체의 생성자와 프로토타입 체인의 모든 생성자를 배열로 반환합니다.
     * @returns {Array<Function>} 생성자 함수의 배열
     */
    getTypes(): Array<Function>;

    /**
     * 현재 객체가 지정된 타입의 인스턴스인지 확인합니다. (_UNION 포함)
     * @param target 확인할 대상 타입 (객체 또는 문자열)
     * @returns {boolean} 지정된 타입의 인스턴스인지 여부
     */
    instanceOf(target: object | string): boolean;

    /**
     * 현재 객체를 직렬화된 객체로 반환합니다. 
     * (순환 참조는 $ref 값으로 대체됩니다.) 
     * @param vOpt [p_vOpt=0] 직렬화 옵션 (기본값: 0)
     * - 0: 참조 구조 (_guid: 예, $ref: 예)
     * - 1: 중복 구조 (_guid: 예, $ref: 예)
     * - 2: 비참조 구조 (_guid: 아니오, $ref: 아니오)
     * @param owned [p_owned={}] 소유하는 상위 객체들 (기본값: 빈 객체)
     * @returns {object} 직렬화된 객체
     * @example
     * const serializedObj = a.getObject(2);
     * const isEqual = JSON.stringify(serializedObj) === JSON.stringify(b.getObject(2));
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화된 객체를 사용하여 현재 객체를 초기화합니다.  
     * 이 과정에서 객체는 초기화됩니다.
     * @param oGuid 직렬화된 객체
     * @param origin [p_origin=p_oGuid] 원본 객체 (기본값: oGuid)
     */
    setObject(oGuid: object, origin?: object);


    // /**
    //  * 타입정보
    //  * @default {$type: 'array'}
    //  */
    // static _: ArrayExtendType;

    /**
     * 구현된 인터페이스 목록
     * @default [IObject, IMarshal]
     */
    static readonly _UNION: []

    /**
     * 네임스페이스. 객체의 네임스페이스를 나타냅니다.
     * @default 'Meta'
     * @type {string}
     */
    static readonly _NS: string;

    /**
     * 생성자 파라미터. 생성자에 사용되는 파라미터 목록입니다.
     */
    static readonly _PARAM: [];
}

export = MetaObject;