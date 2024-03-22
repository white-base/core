// export declare class Observer {
//     /**
//      * 관찰자
//      * @param p_caller 
//      */
//     constructor(p_caller: object);
//     init(): void;
//     subscribe(p_fn: Function, p_code: string): void;
//     // 구독 취고
//     unsubscribe(p_fn: Function, p_code: string): void;
//     /**
//      * 출판
//      * @param p_code 
//      */
//     publish(p_code: string): void
// }

declare class Observer {
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
// export type ss = string;

export = Observer;