/**
 * 직렬화 인터페이스 입니다.
 * @interface 
 */
declare interface ISerialize {

    /**
     * 객체를 직렬화하여 내보냅니다.
     * @param {...any} args - 직렬화에 필요한 인수들
     * @returns {string} 직렬화된 문자열
     */
    output(...args): string;

    /**
     * 직렬화된 데이터를 가져와서 객체를 로드합니다.
     * @param {...any} args - 로드에 필요한 인수들
     */
    load(...args): void;
}

export = ISerialize;