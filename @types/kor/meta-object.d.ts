import IObject              = require("./i-object");
import IMarshal             = require("./i-marshal");

declare class MetaObject implements IObject, IMarshal {
    
    /**
     * 메타 최상위 객체를 생성합니다.
     */
    constructor();

    /** 
     * 현재 객체의 고유식별자(guid) 
     */
    _guid: string;

    /** 
     * 현재 객체의 생성자 
     */
    _type: Function;

    /**
     * 현재 객체와 target 객체를 비교합니다.
     * @param target 
     */
    equal(target: object): boolean;

    /**
     * 현재 객체의 생성자와 상위(proto) 생성자를 목록으로 가져옵니다.
     */
    getTypes(): Array<Function>;

    /**
     * 현재 객체의 target 인스턴스 여부를 검사합니다 .(_UNION 포함)
     * @param target 
     */
    instanceOf(target: object | string): boolean;

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
}

export = MetaObject;