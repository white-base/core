/**
 * 객체 통제 인터페이스 입니다.
 * @interface
 */
declare interface IMarshal {

    /**
     * 객체의 고유 식별자입니다.
     * @type {string}
     */
    _guid: string;
    
    /**
     * 객체의 타입입니다.
     * @type {Function}
     */
    _type: Function;

    /**
     * 대상의 직렬화 객체를 얻습니다.
     * @param {...any[]} args - 직렬화 객체를 얻기 위한 인수들
     * @returns {object} 직렬화된 객체
     */
    getObject(...args: any[]): object;

    /**
     * 직렬화 객체를 설정합니다.
     * @param {...any[]} args - 직렬화 객체를 설정하기 위한 인수들
     */
    setObject(...args: any[]): void;
}

export = IMarshal;