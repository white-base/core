export declare class Observer {
    /**
     * 관찰자
     * @param p_caller 
     */
    constructor(p_caller: object);
    init(): void;
    subscribe(p_fn: Function, p_code: string): void;
    // 구독 취고
    unsubscribe(p_fn: Function, p_code: string): void;
    /**
     * 출판
     * @param p_code 
     */
    publish(p_code: string): void
}


export declare class Message {
    static init(): void;
    /**
     * 오류 메세지
     * @param p_code dd
     * @param p_aValue aa
     */
    static get(p_code: string, p_aValue: Array<string>): string;
    
}

// export = Observer;