/**
 * 목록에 대상을 추가합니다.
 * @interface
 */
declare class IListControl {

    /** 목록 제어 인터페이스 입니다. */
    // constructor();

    /** 목록에 대상을 추가합니다. */
    add(...args);

    /** 목록에서 대상을 삭제합니다. */
    del(...args);

    /** 목록에 대상의 존재 여부를 확인합니다. */
    has(...args);

    /** 목록에서 대상을 찾습니다. */
    find(...args);
}

export = IListControl;