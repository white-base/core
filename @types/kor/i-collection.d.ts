declare class ICollection {

    /** 컬렉션 인터페이스 입니다. */
    constructor();

    /** 컬렉션에 요소를 추가합니다. */
    add();

    /** 컬렉션에서 요소를 제거합니다. */
    remove();

    /** 요소가 컬렉션에 존재하는지 확인합니다. */
    contains();
    
    /** 컬렉션에서 요소을 조회합니다. */
    indexOf();

}

export = ICollection;