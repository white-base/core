/**
 * 직렬화 인터페이스 입니다.
 * @interface IObject
 */
declare class ISerialize {

    /** 직렬화 인터페이스 입니다. */
    constructor();
    
    /** 내보내기(출력) 합니다. */
    output();

    /** 가져오기(로드) 합니다. */
    load();
}

export = ISerialize;