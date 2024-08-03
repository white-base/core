/**
 * `EventEmitter` 클래스는 이벤트 리스너를 관리하고 이벤트를 발행하는 기능을 제공합니다.
 * 이 클래스는 Node.js의 `EventEmitter`와 유사하게 동작하며, 브라우저 환경에서도 사용할 수 있도록 설계되었습니다.
 */
declare class EventEmitter {
    
    /**
     * `EventEmitter` 클래스의 인스턴스를 생성합니다.
     */
    constructor();
    
    /**
     * 이벤트를 저장하는 내부 객체입니다.
     */
    $storage: object;

    /**
     * 콘솔 로그 출력 여부를 결정합니다.
     */
    isLog: boolean;
    
    /**
     * 지정한 이벤트에 리스너를 등록합니다.
     * 
     * @param {string} event - 이벤트 이름입니다.
     * @param {Function} listener - 이벤트 발생 시 호출될 함수입니다.
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
    on(event: string, listener: Function): void;
   
    /**
     * `on` 메서드의 별칭입니다. 이벤트 리스너를 등록할 때 사용할 수 있습니다.
     */
    addListener: EventEmitter['on'];
    
    /**
     * 한 번만 실행되는 이벤트 리스너를 등록합니다.
     * 
     * @param {string} event - 이벤트 이름입니다.
     * @param {Function} listener - 이벤트 발생 시 한 번만 호출될 함수입니다.
     * 
     * @example
     * emitter.once('bar', function(data) {
     *     console.log('bar 이벤트:', data);
     * });
     * 
     * emitter.emit('bar', { key: 'value' });  // "bar 이벤트: { key: 'value' }"
     * emitter.emit('bar', { key: 'value' });  // 아무 일도 일어나지 않음
     */
    once(event: string, listener: Function): void;

    /**
     * 지정한 이벤트의 리스너를 제거합니다.
     * 
     * @param {string} event - 이벤트 이름입니다.
     * @param {Function} listener - 제거할 리스너 함수입니다.
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
    off(event: string, listener: Function): void;
  
    /**
     * `off` 메서드의 별칭입니다. 지정한 이벤트의 리스너를 제거할 때 사용할 수 있습니다.
     */
    removeListener: EventEmitter['off'];

    /**
     * 지정한 이벤트에 대해 모든 리스너를 제거합니다. 
     * 이벤트 이름을 생략하면 모든 이벤트의 리스너를 제거합니다.
     * 
     * @param {string} [event] - 이벤트 이름입니다. 생략할 수 있습니다.
     * 
     * @example
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
     * 이벤트를 발행하고 등록된 리스너를 호출합니다.
     * 
     * @param {string} event - 이벤트 이름입니다.
     * @param {...*} args - 이벤트 리스너로 전달될 인수들입니다.
     * 
     * @example
     * function onFoo(data) {
     *     console.log('foo 이벤트:', data);
     * }
     * 
     * emitter.on('foo', onFoo);
     * emitter.emit('foo', { key: 'value' });  // "foo 이벤트: { key: 'value' }"
     */
    emit(event: string, ...args: any[]): boolean;
}

export = EventEmitter;