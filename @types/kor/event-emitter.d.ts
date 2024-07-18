/**
 * 관찰자 클래스 입니다.
 */
declare class EventEmitter {
    
    /**
     * 관찰자 객체를 생성합니다.
     */
    constructor();
    
    /**
     * 전역 구독자 
     */
    $storage: object;

    /**
     * 콘솔로드 출력 여부
     */
    isLog: boolean;
    
    /**
     * 관찰자에 함수를 구독합니다.
     * @param event - 이벤트명
     * @param listener - 구독 함수
     */
    on(event: string, listener: Function): void;
   
    addListener: EventEmitter['on'];
    
    /**
     * 이벤트에 대한 일회성 함수를 추가합니다.
     * @param event - 이벤트명
     * @param listener - 구독 함수
     */
    once(event: string, listener: Function): void;

    /**
     * 관찰자에서 함수를 구독 해제합니다.
     * @param event - 이벤트명
     * @param listener - 구독 해제할 함수
     */
    off(event: string, listener: Function): void;
  
    removeListener: EventEmitter['off'];

    /**
     * 전체 이벤트 또는 지정한 이벤트에 등록된 모든 리스너를 제거합니다.
     * @param event - 이벤트명
     */
    removeAllListeners(event?: string): void;

    /**
     * 이벤트명으로 등록된 리스너(함수)를 실행합니다.
     * @param event 이벤트명
     * @returns 리스너 함수 여부를 리턴
     */
    emit(event: string): boolean;
}

export = EventEmitter;