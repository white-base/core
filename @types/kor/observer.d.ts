declare class Observer {
    
    /** 관찰자 객체를 초기화합니다. */
    init();
    
    /**
     * 관찰자에 함수를 구독합니다.
     * @param fn 
     * @param code 
     */
    subscribe(fn: Function, code?: string): void;
   
    /**
     * 관찰자에 함수를 구독해제합니다.
     * @param code 
     * @param fn 
     */
    unsubscribe(code?: string, fn?: Function): void;
  
    /**
     * 발행합니다. 구독 함수를 호출 합니다.
     * @param code 
     */
    publish(code?: string): void;
}

export = Observer;