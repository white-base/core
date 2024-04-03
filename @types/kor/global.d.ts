
// export {};

// declare global {

//     interface PropertyDescriptor {
//         configurable?: boolean;
//         enumerable?: boolean;
//         value?: any;
//         writable?: boolean;
//         get?(): any;
//         set?(v: any): void;
//     }
//     type OnFunc = (idx: number, elem: any, _this: object)=> void;

//     type Iprop = {[key: string]: string}

//     type RefObject = { $ref: string /** 2333-234234-... */ };

//     type NsObject = { $ns: string /** Meta.MetaObject */ };

//     type SetObject = { $set: string/** guid */};

//     type NsTypeObject = { _type: 'ns' };

//     type PathObject = { ns: string, key: string };

//     type ArrayKind = '_OPT_' | '_REQ_' | '_SEQ_' | '_ALL_' | '_ANY_';

//     type ChoiceKind = '_OPT_' | '_REQ_' | '_EUM_' | '_DEF_' | '_ERR_' | '_NON_' | '_ALL_' | '_ANY_';

//     interface ExtendType {
        
//         // $type?: 'undefined' | 'null' | 'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'regexp' | 'class' | 'union' | 'array' | 'choice';
        
//         /**
//          * 원본 객체
//          */
//         ref?: any;
//     }

//     interface ArrayExtendType extends ExtendType {

//         /**
//          * 배열 타입
//          */
//         $type: 'array';

//         /**
//          * $type = 'array' | 'choice' 경우, 대상으로 타입의 하위 타입
//          */
//         list?: ExtendType[];

//         /**
//          * - '_OPT_' : list 타입에 대한 선택 (optional)
//          * - '_REQ_' : list 타입에 대한 선택
//          * - '_SEQ_' : list 타입에 대한 선택
//          * - '_ALL_' : list 타입에 대한 선택
//          * - '_ANY_' : list 타입에 대한 선택
//          */
//         kind?: ArrayKind;
//     }
//     interface ChoiceExtendType extends ExtendType {
//         /**
//          * 초이스 타입
//          */
//         $type: 'choice';

//         /**
//          * $type = 'array' | 'choice' 경우, 대상으로 타입의 하위 타입
//          */
//         list?: ExtendType[];

//         /**
//          * - '_OPT_' : list 타입에 대한 선택 타입
//          * - '_REQ_' : list 타입에 대한 필수 타입
//          * - '_ALL_' : ERR을 제외한 모든 타입
//          * - '_ANY_' : undefined 아닌 모든 타입 TODO: error 타입 포함여부? 
//          * - '_NON_' : undefined 타입
//          * - '_EUM_' : enum 타입
//          * - '_DEF_' : enum & default value 타입
//          * - '_ERR_' : 에러 , 예외 타입
//          */
//         kind?: ChoiceKind;
//     }

//     interface PrimitiveExtendType extends ExtendType {
//         /**
//          * 원시 타입
//          */
//         $type: 'number' | 'string' | 'boolean' | 'bgInt' | 'regexp';

//         /**
//          * $type = number | string | boolean | BigInt | RegExp 일 경우 기본값
//          */
//         default?: number | string | boolean | BigInt | RegExp;
//     }

//     interface FunctionExtendType extends ExtendType {
//         /**
//          * 함수 타입
//          */
//         $type: 'function';

//         /**
//          * 
//          */
//         name?: string;

//         /**
//          * 
//          */
//         func?: string | Function;   // TODO: 함수명으로 사용하지만, name 으로 대체 가능

//         /**
//          * $type = 'function' 경우, 파라메터 타입
//          */
//         params?: AsyncDisposable[];
        
//         /**
//          * $type = 'function' 경우, 리턴 타입
//          */
//         return?: any;
//     }

//     interface ClassExtendType extends ExtendType {
//         /**
//          * 클래스 타입
//          */
//         $type: 'class';

//         /**
//          * 이름
//          */
//         name?: string;

//         /**
//          * 생성자명 
//          */
//         creator?: string;
        
//         /**
//          * 생성한 인스턴스
//          */
//         _instance: object;
//     }

//     interface UnionExtendType extends ExtendType {
//         /**
//          * 조합 타입
//          */
//         $type: 'union';

//         /**
//          * union 객체
//          */
//         _prop: object;
//     }

//     interface Function {
        
//         /**
//          * 인터페이스 조합 목록을 설정합니다.
//          * 대상 함수를 생성자, 즉 클래스(추상클래스)로 사용할 경우
//          * 구현해야할 인터페이스를 지정한다.
//          * @example
//          * // 검사 
//          * function InterfaceA() { /.../ }
//          * 
//          * function ClassA() {
//          *      Util.implements(PropertyCollection, this);
//          * }
//          * ClassA._UNION = [InterfaceA];
//          */
//         _UNION: Function[];

//         /**
//          * 네임스페이스
//          * "Animal.Cat" 점으로 구분됨 네임스페이스 전체 경로를 등록한다.
//          */
//         _NS: string;

        
//         /**
//          * 생성자의 파라메터 파라메터 변수에 대한 내부속성명을 작성한다.
//          * 필요시!,   getObject(), setObject() 시점에 활용함
//          */
//         _PARAMS: string[];

//         /**
//          * 함수의 종류를 명시적으로 지정합니다.
//          * 'class'
//          * 'abstract'
//          * 'interface'
//          * 'enum'
//          * 'function'
//          */
//         _KIND: string;


//         /**
//          * 타입 명시적으로 지정
//          * 
//          */
//         _TYPE: ArrayExtendType | ChoiceExtendType | PrimitiveExtendType 
//             | FunctionExtendType | ClassExtendType | UnionExtendType;

//     }
// }



declare interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
declare type OnFunc = (idx: number, elem: any, _this: object)=> void;

declare type Iprop = {[key: string]: string}

declare type RefObject = { $ref: string /** 2333-234234-... */ };

declare type NsObject = { $ns: string /** Meta.MetaObject */ };

declare type SetObject = { $set: string/** guid */};

declare type NsTypeObject = { _type: 'ns' };

declare type PathObject = { ns: string, key: string };

declare type ArrayKind = '_OPT_' | '_REQ_' | '_SEQ_' | '_ALL_' | '_ANY_';

declare type ChoiceKind = '_OPT_' | '_REQ_' | '_EUM_' | '_DEF_' | '_ERR_' | '_NON_' | '_ALL_' | '_ANY_';

declare interface ExtendType {
    
    // $type?: 'undefined' | 'null' | 'string' | 'number' | 'boolean' | 'bigint' | 'symbol' | 'regexp' | 'class' | 'union' | 'array' | 'choice';
    
    /**
     * 원본 객체
     */
    ref?: any;
}

declare interface ArrayExtendType extends ExtendType {

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
declare interface ChoiceExtendType extends ExtendType {
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

declare interface PrimitiveExtendType extends ExtendType {
    /**
     * 원시 타입
     */
    $type: 'number' | 'string' | 'boolean' | 'bgInt' | 'regexp';

    /**
     * $type = number | string | boolean | BigInt | RegExp 일 경우 기본값
     */
    default?: number | string | boolean | BigInt | RegExp;
}

declare interface FunctionExtendType extends ExtendType {
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
    params?: AsyncDisposable[];
    
    /**
     * $type = 'function' 경우, 리턴 타입
     */
    return?: any;
}

declare interface ClassExtendType extends ExtendType {
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

declare interface UnionExtendType extends ExtendType {
    /**
     * 조합 타입
     */
    $type: 'union';

    /**
     * union 객체
     */
    _prop: object;
}

declare interface Function {
    
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
    _TYPE: ArrayExtendType | ChoiceExtendType | PrimitiveExtendType 
        | FunctionExtendType | ClassExtendType | UnionExtendType;

}
