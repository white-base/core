/**
 * `EventEmitter` 클래스는 이벤트 리스너를 관리하고 이벤트를 발행하는 기능을 제공합니다.
 */
declare class EventEmitter {

    /**
     * `EventEmitter` 클래스의 인스턴스를 생성합니다.
     */
    constructor();
        
    /**
     * 등록된 이벤트를 저장하는 내부 객체입니다.  
     */
    $storage: object;

    /**
     * 등록된 이벤트명을 저장하는 배열입니다. 
     */
    protected _list: string[];

    /**
     * 등록된 이벤트명을 저장하는 배열입니다. 
     */
    isLog: boolean;

    /**
     * 이벤트에 대한 리스너(함수)를 추가합니다.
     * 
     * @param event - 이벤트 명
     * @param listener - 리스너 함수
     * 
     * @example
     * var emitter = new EventEmitter();
     * 
     * function onFoo(data) {
     *     console.log('foo 이벤트:', data);
     * }
     * 
     * emitter.on('foo', onFoo);
     * emitter.emit('foo', { key: 'value' });  // "foo 이벤트: { key: 'value' }"
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
     * 
     * @example
     * emitter.once('bar', function(data) {
     *     console.log('bar 이벤트:', data);
     * });
     * 
     * emitter.emit('bar', { key: 'value' });  // "bar 이벤트: { key: 'value' }"
     * emitter.emit('bar', { key: 'value' });  // 아무 일도 일어나지 않음
     */
    once(event: string, listener: (...args: any[]) => void): void;

    /**
     * 지정한 이벤트 의 리스너(함수)를 제거합니다.
     * 
     * @param event - 이벤트 명
     * @param listener - 리스너 함수
     * 
     * @example
     * function onQux(data) {
     *     console.log('qux 이벤트:', data);
     * }
     * 
     * emitter.on('qux', onQux);
     * emitter.emit('qux', { key: 'value' });  // "qux 이벤트: { key: 'value' }"
     * 
     * emitter.off('qux', onQux);
     * emitter.emit('qux', { key: 'value' });  // 아무 일도 일어나지 않음
     */
    off(event: string, listener: (...args: any[]) => void): void;
    
    /**
     * `off()` 메서드의 별칭입니다.
     * 
     * @alias off
     */
    removeListener(event: string, listener: (...args: any[]) => void): void;

    /**
     * 모든 이벤트 또는 특정 이벤트에 등록된 리스너를 모두 제거합니다.
     * 
     * @param event -  제거할 이벤트명 (생략 시 모든 이벤트 제거)
     * 
     *  @example
     * function onQux(data) {
     *     console.log('qux 이벤트:', data);
     * }
     * 
     * function anotherOnQux(data) {
     *     console.log('another qux 이벤트:', data);
     * }
     * 
     * emitter.on('qux', onQux);
     * emitter.on('qux', anotherOnQux);
     * emitter.emit('qux', { key: 'value' });  // "qux 이벤트: { key: 'value' }", "another qux 이벤트: { key: 'value' }"
     * 
     * emitter.removeAllListeners('qux');
     * emitter.emit('qux', { key: 'value' });  // 아무 일도 일어나지 않음
     */
    removeAllListeners(event?: string): void;

    /**
     * 등록된 이벤트의 리스너(함수)를 실행합니다. 
     * 
     * @param event - 이벤트명
     * @returns `true` 리스너 실행 성공, `false` 실행 실패, `undefined` 리스너 없음
     * 
     * @example
     * function onFoo(data) {
     *     console.log('foo 이벤트:', data);
     * }
     * 
     * emitter.on('foo', onFoo);
     * emitter.emit('foo', { key: 'value' });  // "foo 이벤트: { key: 'value' }"
     */
    emit(event: string, ...args: any[]): boolean | undefined;
}

export default EventEmitter;
export { EventEmitter };
