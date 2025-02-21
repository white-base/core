declare class EventEmitter {
    /**
     * 네임스페이스
     */
    static readonly _NS: string;

    /**
     * log 출력 여부
     */
    isLog: boolean;

    /**
     * 이벤트에 대한 리스너(함수)를 추가합니다.
     * @param p_event 이벤트 명
     * @param p_listener 리스너 함수
     */
    on(p_event: string, p_listener: (...args: any[]) => void): void;
    addListener(p_event: string, p_listener: (...args: any[]) => void): void;

    /**
     * 이벤트에 대한 일회성 함수를 추가합니다.
     * @param p_event 이벤트 명
     * @param p_listener 리스너 함수
     */
    once(p_event: string, p_listener: (...args: any[]) => void): void;

    /**
     * 지정한 이벤트 의 리스너(함수)를 제거합니다.
     * @param p_event 이벤트 명
     * @param p_listener 리스너 함수
     */
    off(p_event: string, p_listener: (...args: any[]) => void): void;
    removeListener(p_event: string, p_listener: (...args: any[]) => void): void;

    /**
     * 전체 이벤트 또는 지정한 이벤트에 등록된 이벤트명과 리스너를 모두 제거합니다.
     * @param p_event 이벤트명 (선택사항)
     */
    removeAllListeners(p_event?: string): void;

    /**
     * 이벤트명으로 등록된 리스너(함수)를 실행합니다.
     * @param p_event 이벤트명
     * @returns 리스너가 실행되었는지 여부 
     * true: 실행 함, false: 실행 안함, undefined: 처리 실패 
     */
    emit(p_event: string, ...args: any[]): boolean | undefined;
}

export default EventEmitter;
export { EventEmitter };
