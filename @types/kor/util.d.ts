/**
 * 유틸리티 모듈 입니다.
 */
declare namespace Util {
    
    /**
     * guid 값을 생성합니다.
     */
    function createGuid(): string;
    
    /**
     * 객체를 깊은 복사를합니다. (proto제외)
     * @param target 대상 객체
     */
    function deepCopy(target: any): object;

    /** Inherits from superCtor . */

    /**
     * superCtor 을 상속합니다.
     * @param ctor 대상 생성자 또는 대상 객체
     * @param superCtor 상속 받을 부모 생성자 또는 상속 받을 부모 객체
     */
    function inherits(ctor: Function | object, superCtor: Function | object): void;

    
    /**
     * ctor 로 생성한 obj 객체의 args<funtion>의 구현 여부를 검사합니다.
     * 종류(ctor._KIND)가 'inteface'이면 allowType(), 아니면 matchType()로 검사한다.
     * @param ctor 검사 대상 생성자
     * @param obj 검사 대상 인스턴스 객체
     * @param args i인터페이스들, ctor._UNION 정적 속성으로 설정 가능
     */
    function implements(ctor: Function, obj: object, args?: Function): void;
}

export = Util;