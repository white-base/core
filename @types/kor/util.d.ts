/**
 * 유틸리티 모듈 입니다.
 */
declare namespace Util {
    
    /**
     * GUID 값을 생성합니다.
     * 
     * @returns 생성된 GUID 문자열입니다.
     */
    function createGuid(): string;
    
    /**
     * 객체를 깊은 복사합니다. (프로토타입 제외)
     * 
     * @param target - 깊은 복사를 할 대상 객체입니다.
     * @returns 깊은 복사된 객체입니다.
     */
    function deepCopy(target: any): object;

    /** Inherits from superCtor . */

    /**
     * superCtor 을 상속합니다.
     * 
     * @param ctor - 상속을 받을 대상 생성자 또는 객체입니다.
     * @param superCtor - 상속 받을 부모 생성자 또는 객체입니다.
     */
    function inherits(ctor: Function | object, superCtor: Function | object): void;
    
    /**
     * `ctor`로 생성한 `obj` 객체의 `args` 함수의 구현 여부를 검사합니다.
     * 종류(`ctor._KIND`)가 'interface'이면 `allowType()`을 호출하고, 
     * 그렇지 않으면 `matchType()`을 호출하여 검사합니다.
     * 
     * @param ctor - 검사 대상 생성자입니다.
     * @param obj - 검사 대상 인스턴스 객체입니다.
     * @param args - 인터페이스들입니다. `ctor._UNION` 정적 속성으로 설정 가능합니다.
     */
    function implements(ctor: Function, obj: object, args?: Function): void;
}

export = Util;