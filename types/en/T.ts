// /**
//  * 메시지 객체를 정의합니다.
//  * @interface
//  */
// declare interface MessageObject {
//     /** 메세지 */
//     msg: string;

//     /** 긴 메세지 */
//     long: string;
// }

// /**
//  * 객체 속성 설명자를 정의합니다.
//  * @interface
//  */
// declare interface PropertyDescriptor {
//     /** 속성이 설정 가능한지 여부 */
//     configurable?: boolean;

//     /** 속성이 열거 가능한지 여부 */
//     enumerable?: boolean;

//     /** 속성의 값 */
//     value?: any;

//     /** 속성이 쓰기 가능한지 여부 */
//     writable?: boolean;

//     /** 속성을 얻기 위한 getter 함수 */
//     get?(): any;

//     /** 속성 값을 설정하기 위한 setter 함수 */
//     set?(v: any): void;
// }

// /**
//  * 인덱스와 요소, 그리고 현재 컨텍스트를 받아 처리하는 함수 타입을 정의합니다.
//  * @type
//  */
// // declare type OnFunc = (idx: number, elem: any, _this: object) => void;

// /**
//  * 문자열 키와 값으로 구성된 객체 타입을 정의합니다.
//  * @type
//  */
// declare type Iprop = { [key: string]: string };

// /**
//  * 참조 객체를 정의합니다.
//  * @type
//  */
// declare type RefObject = { $ref: string /** 예: 2333-234234-... */ };

// /**
//  * 네임스페이스 객체를 정의합니다.
//  * @type
//  */
// declare type NsObject = { $ns: string /** 예: Meta.MetaObject */ };

// /**
//  * 설정 객체를 정의합니다.
//  * @type
//  */
// declare type SetObject = { $set: string /** 예: guid */ };

// /**
//  * 네임스페이스 타입 객체를 정의합니다.
//  * @type
//  */
// declare type NsTypeObject = { _type: 'ns' };

// /**
//  * 네임스페이스 경로 객체를 정의합니다.
//  * @type
//  */
// declare type PathObject = { ns: string, key: string };



// export {}


/**
 * Defines a message object.
 * @interface
 */
export declare interface MessageObject {
    /** Message */
    msg: string;

    /** Long message */
    long: string;
}

export declare interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
// declare type OnFunc = (idx: number, elem: any, _this: object) => void;

export declare type Iprop = {[key: string]: string}

export declare type RefObject = { $ref: string /** 2333-234234-... */ };

export declare type NsObject = { $ns: string /** Meta.MetaObject */ };

export declare type SetObject = { $set: string/** guid */};

export declare type NsTypeObject = { _type: 'ns' };

export declare type PathObject = { ns: string, key: string };

export declare type ArrayKind = '_OPT_' | '_REQ_' | '_SEQ_' | '_ALL_' | '_ANY_';

export declare type ChoiceKind = '_OPT_' | '_REQ_' | '_EUM_' | '_DEF_' | '_ERR_' | '_NON_' | '_ALL_' | '_ANY_';

export declare interface ExtendType {
    
    // $type?: 'undefined' | 'null' | 'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'regexp' | 'class' | 'union' | 'array' | 'choice';
    
    /**
     * Source Object
     */
    ref?: any;
}

export declare interface ArrayExtendType extends ExtendType {

    /**
     * Array Type
     */
    $type: 'array';

    /**
     * $type = 'array' | 'choice', subtype of target type
     */
    list?: ExtendType[];

    /**
     * - '_OPT_': Select the list type (optional)
     * - '_REQ_': Select for list type
     * - '_SEQ_' : Selection for list type
     * - '_ALL_': Select for list type
     * - '_ANY_' : Select for list type
     */
    kind?: ArrayKind;
}
export declare interface ChoiceExtendType extends ExtendType {
    /**
     * CHOICE TYPE
     */
    $type: 'choice';

    /**
     * $type = 'array' | 'choice', subtype of target type
     */
    list?: ExtendType[];

    /**
     * - '_OPT_': Selection type for list type
     * - '_REQ_': Required type for list type
     * - '_ALL_' : All types except ERR
     * - '_ANY_' : All types TODO: error type included or not defined? 
     * - '_NON_' : undefined type
     * - '_EUM_' : enum type
     * - '_DEF_' : enum & default value type
     * - '_ERR_': error, exception type
     */
    kind?: ChoiceKind;
}

export declare interface PrimitiveExtendType extends ExtendType {
    /**
     * Raw Type
     */
    $type: 'number' | 'string' | 'boolean' | 'bgInt' | 'regexp';

    /**
     * Default for $type = number | string | boolean | BigInt | RegExp
     */
    default?: number | string | boolean | bigint | RegExp;
}

export declare interface FunctionExtendType extends ExtendType {
    /**
     * Function type
     */
    $type: 'function';

    /**
     * 
     */
    name?: string;

    /**
     * 
     */
    func?: string | Function; // TODO: Use as function name, but can be replaced by name

    /**
     * $type = for 'function', parameter type
     */
    params?: any[];
    
    /**
     * $type = for 'function', return type
     */
    return?: any;
}

export declare interface ClassExtendType extends ExtendType {
    /**
     * Class Type
     */
    $type: 'class';

    /**
     * Name
     */
    name?: string;

    /**
     * Generator name 
     */
    creator?: string;
    
    /**
     * Instances created
     */
    _instance: object;
}

export declare interface UnionExtendType extends ExtendType {
    /**
     * Combination type
     */
    $type: 'union';

    /**
     * union object
     */
    _prop: object;
}


export declare type ExtType = ArrayExtendType | ChoiceExtendType | PrimitiveExtendType 
    | FunctionExtendType | ClassExtendType | UnionExtendType;

export declare interface Function {
    
    /**
     * Sets the interface combination list.
     * If the target function is used as a constructor, that is, a class (abstract class)
     * Specifies the interface to be implemented.
     * @example
     * // Inspection 
     * function InterfaceA() { /.../ }
     * 
     * function ClassA() {
     *      Util.implements(PropertyCollection, this);
     * }
     * ClassA._UNION = [InterfaceA];
     */
    _UNION: Function[];

    /**
     * Namespace
     * Register the full path of the namespace separated by the "Animal.Cat" point.
     */
    _NS: string;

    
    /**
     * We write an internal adjunct statement for the generator's parameter parameters.
     * If required, use at the time of getObject(), setObject()
     */
    _PARAMS: string[];

    /**
     * Explicitly specifies the type of function.
     * 'class'
     * 'abstract'
     * 'interface'
     * 'enum'
     * 'function'
     */
    _KIND: string;


    /**
     * Specifying Type explicitly
     * 
     */
    _TYPE: ExtType;

}

// export {}
