import IElement             = require("./i-element");
import MetaObject           = require("./meta-object");

/**
 * 메타 요소 클래스 입니다.
 */
declare class MetaElement extends MetaObject implements IElement {

    /**
     * 메타 요소 생성합니다.
     * @param name 이름
     */
    constructor(name: string);
    
    _name: string;

    /**
     * 현재 객체를 직렬화(guid 타입) 객체로 얻습니다. 
     * (순환참조는 $ref 값으로 대체된다.) 
     * @param vOpt [p_vOpt=0] 가져오기 옵션
     * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
     * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
     * - opt=2 : 비침조 구조(_guid:No,  $ref:No) 
     * @param owned [p_owned={}] 현재 객체를 소유하는 상위 객체들
     * @example
     * a.getObject(2) == b.getObject(2
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
     * (객체는 초기화 된다.)
     * @param oGuid 직렬화 할 guid 타입의 객체
     * @param origin [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
     */
    setObject(oGuid: object, origin?: object)


    /**
     * 현제 객체를 복제합니다.
     */
    clone(...args): this;


    /**
     * 인터페이스
     * @default [IElement]
     */
    static readonly _UNION: []

    /**
     * 네임스페이스
     * @default 'Meta'
     */
    static readonly _NS: string;

    /**
     * 생성자 파라메터
     * @default ['name']
     */
    static readonly _PARAM: [];
}

export = MetaElement;