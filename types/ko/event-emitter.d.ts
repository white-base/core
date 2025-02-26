/**
 * 이벤트를 발생시키고 리스너를 등록하는 클래스입니다.
 */
declare class EventEmitter {

    /**
     * 이벤트를 저장하는 내부 객체입니다.
     */
    $storage: object;

    /**
     * 전체 이벤트명
     */
    _list: object;

    /**
     * log 출력 여부
     */
    isLog: boolean;

    /**
     * `EventEmitter` 클래스의 인스턴스를 생성합니다.
     */
    constructor();

    /**
     * 이벤트에 대한 리스너(함수)를 추가합니다.
     * 
     * @param event - 이벤트 명
     * @param listener - 리스너 함수
     */
    on(event: string, listener: (...args: any[]) => void): void;
    
    /**
     * `on()` 메서드의 별칭입니다.
     * 
     * @alias on
     */
    addListener(event: string, listener: (...args: any[]) => void): void;

    /**
     * 이벤트에 대한 일회성 함수를 추가합니다.
     * 
     * @param event - 이벤트 명
     * @param listener - 리스너 함수
     */
    once(event: string, listener: (...args: any[]) => void): void;

    /**
     * 지정한 이벤트 의 리스너(함수)를 제거합니다.
     * 
     * @param event - 이벤트 명
     * @param listener - 리스너 함수
     */
    off(event: string, listener: (...args: any[]) => void): void;
    
    /**
     * `off()` 메서드의 별칭입니다.
     * 
     * @alias off
     */
    removeListener(event: string, listener: (...args: any[]) => void): void;

    /**
     * 전체 이벤트 또는 지정한 이벤트에 등록된 이벤트명과 리스너를 모두 제거합니다.
     * 
     * @param event - 이벤트명 (선택사항)
     */
    removeAllListeners(event?: string): void;

    /**
     * 이벤트명으로 등록된 리스너(함수)를 실행합니다.
     * 
     * @param event - 이벤트명
     * @returns 리스너가 실행되었는지 여부 
     * true: 실행 함, false: 실행 안함, undefined: 처리 실패 
     */
    emit(event: string, ...args: any[]): boolean | undefined;
}

export default EventEmitter;
export { EventEmitter };
