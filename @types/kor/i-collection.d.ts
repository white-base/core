/**
 * 컬렉션 인터페이스 입니다.
 * @interface
 */
declare interface ICollection {

    /** 컬렉션 인터페이스 입니다. */
    // constructor();

    /** 컬렉션에 요소를 추가합니다. */
    add(...args);

    /** 컬렉션에서 요소를 제거합니다. */
    remove(...args);

    /** 요소가 컬렉션에 존재하는지 확인합니다. */
    contains(...args);
    
    /** 컬렉션에서 요소을 조회합니다. */
    indexOf(...args);

}

export = ICollection;