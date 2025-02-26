/**
 * 메시지 객체를 정의합니다.
 * @interface
 */
export declare interface MessageObject {
    /** 메세지 */
    msg: string;

    /** 긴 메세지 */
    long: string;
}

/**
 * 객체 속성 설명자를 정의합니다.
 * @interface
 */
export declare interface PropertyDescriptor {
    /** 속성이 설정 가능한지 여부 */
    configurable?: boolean;

    /** 속성이 열거 가능한지 여부 */
    enumerable?: boolean;

    /** 속성의 값 */
    value?: any;

    /** 속성이 쓰기 가능한지 여부 */
    writable?: boolean;

    /** 속성을 얻기 위한 getter 함수 */
    get?(): any;

    /** 속성 값을 설정하기 위한 setter 함수 */
    set?(v: any): void;
}

/**
 * 인덱스와 요소, 그리고 현재 컨텍스트를 받아 처리하는 함수 타입을 정의합니다.
 * @type
 */
// declare type OnFunc = (idx: number, elem: any, _this: object) => void;

/**
 * 문자열 키와 값으로 구성된 객체 타입을 정의합니다.
 * @type
 */
export declare type Iprop = { [key: string]: string };

/**
 * 참조 객체를 정의합니다.
 * @type
 */
export declare type RefObject = { $ref: string /** 예: 2333-234234-... */ };

/**
 * 네임스페이스 객체를 정의합니다.
 * @type
 */
export declare type NsObject = { $ns: string /** 예: Meta.MetaObject */ };

/**
 * 설정 객체를 정의합니다.
 * @type
 */
export declare type SetObject = { $set: string /** 예: guid */ };

/**
 * 네임스페이스 타입 객체를 정의합니다.
 * @type
 */
export declare type NsTypeObject = { _type: 'ns' };

/**
 * 네임스페이스 경로 객체를 정의합니다.
 * @type
 */
export declare type PathObject = { ns: string, key: string };

export declare type ArrayKind = '_OPT_' | '_REQ_' | '_SEQ_' | '_ALL_' | '_ANY_';

export declare type ChoiceKind = '_OPT_' | '_REQ_' | '_EUM_' | '_DEF_' | '_ERR_' | '_NON_' | '_ALL_' | '_ANY_';

export declare interface ExtendType {
    
    // $type?: 'undefined' | 'null' | 'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'regexp' | 'class' | 'union' | 'array' | 'choice';
    
    /**
     * 원본 객체
     */
    ref?: any;
}

export declare interface ArrayExtendType extends ExtendType {

    /**
     * 배열 타입
     */
    $type: 'array';

    /**
     * $type = 'array' | 'choice' 경우, 대상으로 타입의 하위 타입
     */
    list?: ExtendType[];

    /**
     * - '_OPT_' : list 타입에 대한 선택 (optional)
     * - '_REQ_' : list 타입에 대한 선택
     * - '_SEQ_' : list 타입에 대한 선택
     * - '_ALL_' : list 타입에 대한 선택
     * - '_ANY_' : list 타입에 대한 선택
     */
    kind?: ArrayKind;
}
export declare interface ChoiceExtendType extends ExtendType {
    /**
     * 초이스 타입
     */
    $type: 'choice';

    /**
     * $type = 'array' | 'choice' 경우, 대상으로 타입의 하위 타입
     */
    list?: ExtendType[];

    /**
     * - '_OPT_' : list 타입에 대한 선택 타입
     * - '_REQ_' : list 타입에 대한 필수 타입
     * - '_ALL_' : ERR을 제외한 모든 타입
     * - '_ANY_' : undefined 아닌 모든 타입 TODO: error 타입 포함여부? 
     * - '_NON_' : undefined 타입
     * - '_EUM_' : enum 타입
     * - '_DEF_' : enum & default value 타입
     * - '_ERR_' : 에러 , 예외 타입
     */
    kind?: ChoiceKind;
}

export declare interface PrimitiveExtendType extends ExtendType {
    /**
     * 원시 타입
     */
    $type: 'number' | 'string' | 'boolean' | 'bgInt' | 'regexp';

    /**
     * $type = number | string | boolean | BigInt | RegExp 일 경우 기본값
     */
    default?: number | string | boolean | bigint | RegExp;
}

export declare interface FunctionExtendType extends ExtendType {
    /**
     * 함수 타입
     */
    $type: 'function';

    /**
     * 
     */
    name?: string;

    /**
     * 
     */
    func?: string | Function;   // TODO: 함수명으로 사용하지만, name 으로 대체 가능

    /**
     * $type = 'function' 경우, 파라메터 타입
     */
    params?: any[];
    
    /**
     * $type = 'function' 경우, 리턴 타입
     */
    return?: any;
}

export declare interface ClassExtendType extends ExtendType {
    /**
     * 클래스 타입
     */
    $type: 'class';

    /**
     * 이름
     */
    name?: string;

    /**
     * 생성자명 
     */
    creator?: string;
    
    /**
     * 생성한 인스턴스
     */
    _instance: object;
}

export declare interface UnionExtendType extends ExtendType {
    /**
     * 조합 타입
     */
    $type: 'union';

    /**
     * union 객체
     */
    _prop: object;
}

export declare type ExtType = ArrayExtendType | ChoiceExtendType | PrimitiveExtendType 
    | FunctionExtendType | ClassExtendType | UnionExtendType;

export declare interface Function {
    
    /**
     * 인터페이스 조합 목록을 설정합니다.
     * 대상 함수를 생성자, 즉 클래스(추상클래스)로 사용할 경우
     * 구현해야할 인터페이스를 지정한다.
     * @example
     * // 검사 
     * function InterfaceA() { /.../ }
     * 
     * function ClassA() {
     *      Util.implements(PropertyCollection, this);
     * }
     * ClassA._UNION = [InterfaceA];
     */
    _UNION: Function[];

    /**
     * 네임스페이스
     * "Animal.Cat" 점으로 구분됨 네임스페이스 전체 경로를 등록한다.
     */
    _NS: string;

    /**
     * 생성자의 파라메터 파라메터 변수에 대한 내부속성명을 작성한다.
     * 필요시!,   getObject(), setObject() 시점에 활용함
     */
    _PARAMS: string[];

    /**
     * 함수의 종류를 명시적으로 지정합니다.
     * 'class'
     * 'abstract'
     * 'interface'
     * 'enum'
     * 'function'
     */
    _KIND: string;

    /**
     * 타입 명시적으로 지정
     * 
     */
    _TYPE: ExtType;

}


// export {}