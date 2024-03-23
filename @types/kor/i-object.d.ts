declare interface IObject {
    
    /** 현재 객체의 생성자와 상위(proto) 생성자를 목록으로 가져옵니다. */
    getTypes(): Array<Function>;

    instanceOf(target: any): boolean;
}

export = IObject;