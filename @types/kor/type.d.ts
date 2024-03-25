/**
 * 타입 모듈 입니다.
 */
declare namespace Type {
    
    /**
     * 전체 프로퍼티를 조회합니다.
     * @param obj Object를 제외한 프로퍼티 객체 리턴
     * @param hasObj Object를 포함 여부
     */
    function getAllProperties(obj: object, hasObj: boolean): Array<string>;
    
    /**
     * 객체를 비교합니다. (proto 제외)
     * @param obj1 원본 객체
     * @param obj2 비교 대상 객체
     */
    function deepEqual(obj1: any, obj2: object): boolean;
    
    /**
     * 함수 타입을 가져옵니다.(_UNION 포함)  
     * 배열에 대상(ctor) 부터 순서대로 리턴 
     * @param ctor 생성자
     * @param hasUnion [true] _UNION 포함 여부
     */
    function getTypes(ctor: Function, hasUnion: boolean | true): Array<Function>;
    
    /**
     * 함수 타입의 prototype(상속) 타입 여부를 검사합니다.
     * @param ctor 생성자
     * @param target 검사 대상
     */
    function isProtoChain(ctor: Function, target: Function | string): boolean;
    
    /**
     * 함수 타입의 prototype(상속) 또는 _UNION 타입 여부를 검사합니다.
     * @param ctor 생성자
     * @param target 검사 대상
     */
    function hasType(ctor: Function, target: Function | string): boolean;
    
    /**
     * 확장타입 객체를 얻습니다. (하위 타입 포함)  
     * @param target target type
     * @example
     * var returnObject = {
     *     $ype: '',       // common
     *     default: null,  // string, number, boolean, regexp
     *     kind: '',       // array, choice
     *     creator: null,  // class
     *     _instance: {},  // class
     *     _prop: {},      // union
     *     params: [],     // function
     *     return: null,   // function
     *     name: name,     // function
     *     func: null,     // function
     * }
     */
    function typeObject(target: any): object;
    
    /**
     * 확장타입명을 얻습니다.
     * @param target 대상
     */
    function typeOf(target: any): string;
    
    /**
     * 확장타입을 얻는다.
     * @param target 대상
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    function extendType(target: any): object;
    
    /**
     * 확장타입이 대상타입을 허용하는지 검사합니다.
     * @param extType 확장 타입
     * @param tarType 검사 대상 타입
     * @param opt [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     */
    function allowType(extType: any, tarType: any, opt?: number): Error | undefined;
    
    /**
     * 확장타입이 대상과 매치되는지 검사합니다.
     * @param extType 확장 타입
     * @param target 검사 대상
     * @param opt [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     */
    function matchType(extType: any, target: any, opt?: number): Error | undefined;
    
    /**
     * 확장타입이 대상타입을 허용하는지 여부를 확인합니다.
     * @param extType 확장 타입
     * @param tarType 검사 대상 타입
     * @param opt [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     */
    function isAllowType(extType: any, tarType: any, opt?: number): boolean;
    
    /**
     * 확장타입이 대상과 매치되는지 여부를 확인합니다.
     * @param extType 확장 타입
     * @param target 검사 대상
     * @param opt [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     */
    function isMatchType(extType: any, target: any, opt?: number): boolean;

}

export = Type;