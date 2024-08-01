/**
 * 메시지 객체를 정의합니다.
 * @interface
 */
declare interface MessageObject {
    /** 메세지 */
    msg: string;

    /** 긴 메세지 */
    long: string;
}

/**
 * 객체 속성 설명자를 정의합니다.
 * @interface
 */
declare interface PropertyDescriptor {
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
declare type OnFunc = (idx: number, elem: any, _this: object) => void;

/**
 * 문자열 키와 값으로 구성된 객체 타입을 정의합니다.
 * @type
 */
declare type Iprop = { [key: string]: string };

/**
 * 참조 객체를 정의합니다.
 * @type
 */
declare type RefObject = { $ref: string /** 예: 2333-234234-... */ };

/**
 * 네임스페이스 객체를 정의합니다.
 * @type
 */
declare type NsObject = { $ns: string /** 예: Meta.MetaObject */ };

/**
 * 설정 객체를 정의합니다.
 * @type
 */
declare type SetObject = { $set: string /** 예: guid */ };

/**
 * 네임스페이스 타입 객체를 정의합니다.
 * @type
 */
declare type NsTypeObject = { _type: 'ns' };

/**
 * 네임스페이스 경로 객체를 정의합니다.
 * @type
 */
declare type PathObject = { ns: string, key: string };



export {}