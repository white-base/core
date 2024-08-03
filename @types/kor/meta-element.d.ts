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
     */
    _name: string;

    /**
     * 현재 객체를 직렬화된 객체로 반환합니다.
     * 직렬화는 순환 참조를 `$ref` 값으로 대체하며, 직렬화 옵션에 따라 참조 구조, 중복 구조, 비참조 구조를 선택할 수 있습니다.
     * @param {number} [vOpt=0] - 직렬화 옵션입니다. 기본값은 `0`입니다.
     * - 0: 참조 구조 (_guid: 예, $ref: 예)
     * - 1: 중복 구조 (_guid: 예, $ref: 예)
     * - 2: 비참조 구조 (_guid: 아니오, $ref: 아니오)
     * @param {object | Array<object>} [owned={}] - 소유하는 상위 객체들입니다. 기본값은 빈 객체입니다.
     * @returns {object} 직렬화된 객체입니다.
     * 
     * @example
     * const serializedObj = element.getObject(2);
     * console.log(serializedObj); // 직렬화된 객체 출력
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화된 객체를 사용하여 현재 객체를 초기화합니다.
     * 이 과정에서 객체는 초기화되며, 직렬화된 객체(`oGuid`)를 기반으로 객체의 상태가 복원됩니다.
     * @param oGuid - 직렬화된 객체입니다.
     * @param {object} [origin=oGuid] - 원본 객체입니다. 기본값은 `oGuid`입니다.
     */
    setObject(oGuid: object, origin?: object)

    /**
     * 현재 객체를 복제합니다.
     * @param {...any} args - 복제에 사용될 추가 인수입니다.
     * @returns {this} 복제된 객체를 반환합니다.
     */
    clone(...args: any[]): this;

    /**
     * 구현된 인터페이스 목록입니다.
     * @default [IElement]
     */
    static readonly _UNION: []

    /**
     * 네임스페이스를 나타냅니다.
     * @default 'Meta'
     * @type {string}
     */
    static readonly _NS: string;

    /**
     * 생성자에 사용되는 파라미터 목록입니다.
     * @default ['name']
     */
    static readonly _PARAM: [];
}

export = MetaElement;