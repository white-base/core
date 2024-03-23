declare class IListControl {

    /** 목록 제어 인터페이스 입니다. */
    constructor();

    /** 목록에 대상을 추가합니다. */
    add();

    /** 목록에서 대상을 삭제합니다. */
    del();

    /** 목록에 대상의 존재 여부를 확인합니다. */
    has();

    /** 목록에서 대상을 찾습니다. */
    find();
}

export = IListControl;