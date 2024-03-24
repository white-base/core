/**
 * 객체 통제 인터페이스 입니다.
 * @interface
 */
declare class IMarshal {

    /** 객체 통제 인터페이스 입니다. */
    // constructor();

    /** 객체의 고유 식별자 */
    _guid: string;
    
    /** 객체의 타입  */
    _type: Function;

    /** 대상의 직렬화 객체를 얻습니다. */
    getObject(...args): object;

    /** 직렬화 객체를 설정합니다. */
    setObject(...args);
}

export = IMarshal;