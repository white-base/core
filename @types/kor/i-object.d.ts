declare class IObject {
    
    /** 객체 인터페이스 입니다. (최상위) */
    constructor();

    /** 현재 객체의 생성자와 상위(proto) 생성자를 목록으로 가져옵니다.  */
    getTypes();

    /** 객체의 인스턴스 여부를 확인합니다. */
    instanceOf();

    /** 객체와 비교합니다. */
    equal();
}

export = IObject;