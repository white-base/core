import IElement             = require("./i-element");
import MetaObject           = require("./meta-object");

/**
 * MetaElement 클래스는 MetaObject를 상속하며, IElement 인터페이스를 구현합니다.  
 * 메타 데이터를 나타내는 요소를 표현합니다.
 */
declare class MetaElement extends MetaObject implements IElement {

    /**
     * MetaElement 클래스의 인스턴스를 생성합니다.
     * @param name 요소의 이름
     */
    constructor(name: string);
    
    /**
     * 요소의 이름. MetaElement의 고유 식별자 역할을 합니다.
     * @type {string}
     */
    _name: string;

    /**
     * 현재 객체를 직렬화된 객체로 반환합니다.
     * 순환 참조는 $ref 값으로 대체됩니다.
     * @param [vOpt=0] 직렬화 옵션 (기본값: 0)
     * - 0: 참조 구조 (_guid: 예, $ref: 예)
     * - 1: 중복 구조 (_guid: 예, $ref: 예)
     * - 2: 비참조 구조 (_guid: 아니오, $ref: 아니오)
     * @param [owned={}] 소유하는 상위 객체들 (기본값: 빈 객체)
     * @returns {object} 직렬화된 객체
     * @example
     * const serializedObj = element.getObject(2);
     * console.log(serializedObj);
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    
    /**
     * 직렬화된 객체를 사용하여 현재 객체를 초기화합니다.
     * 이 과정에서 객체는 초기화됩니다.
     * @param oGuid 직렬화된 객체
     * @param [origin=oGuid] 원본 객체 (기본값: oGuid)
     */
    setObject(oGuid: object, origin?: object)


    /**
     * 현재 객체를 복제합니다.
     * @param {...any} args 복제에 사용될 추가 인수
     * @returns {this} 복제된 객체
     */
    clone(...args: any[]): this;


    /**
     * 구현된 인터페이스 목록
     * @default [IElement]
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
     * @default ['name']
     */
    static readonly _PARAM: [];
}

export = MetaElement;