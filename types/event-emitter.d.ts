/**
 * The 'EventEmitter' class provides the ability to manage event listeners and issue events.  
 */
declare class EventEmitter {

    /**
     * Internal object that stores registered events.  
     */
    $storage: object;

    /**
     * Array that stores registered event names.  
     */
    _list: string[];

    /**
     * Array that stores registered event names.  
     */
    isLog: boolean;

    /**
     * Creates an instance of the class 'EventEmitter'.  
     */
    constructor();

    /**
     * Adds a listener (function) for the event.  
     * 
     * @param event Event Name
     * @param listener Listener function
     * 
     * @example
     * var emitter = new EventEmitter();
     * 
     * function onFoo(data) {
     *     console.log('foo Event:', data);
     * }
     * 
     * emitter.on('foo', onFoo);
     * emitter.emit('foo', { key: 'value' });  // "foo Event: { key: 'value' }"
     */
    on(event: string, listener: (...args: any[]) => void): void;
    
    /**
     * Alias for method 'on().
     * 
     * @alias on
     */
    addListener(event: string, listener: (...args: any[]) => void): void;

    /**
     * Adds a one-time function for the event.  
     * 
     * @param event Event Name
     * @param listener Listener function
     * 
     * @example
     * emitter.once('bar', function(data) {
     *     console.log('bar Event:', data);
     * });
     * 
     * emitter.emit('bar', { key: 'value' });  // "bar Event: { key: 'value' }"
     * emitter.emit('bar', { key: 'value' });  // Nothing happens
     */
    once(event: string, listener: (...args: any[]) => void): void;

    /**
     * Removes the listener (function) of the specified event.  
     * 
     * @param event Event Name
     * @param listener Listener function
     * 
     * @example
     * function onQux(data) {
     *     console.log('qux Event:', data);
     * }
     * 
     * emitter.on('qux', onQux);
     * emitter.emit('qux', { key: 'value' });  // "qux Event: { key: 'value' }"
     * 
     * emitter.off('qux', onQux);
     * emitter.emit('qux', { key: 'value' });  // Nothing happens
     */
    off(event: string, listener: (...args: any[]) => void): void;
    
    /**
     * Alias of method 'off()'.  
     * 
     * @alias off
     */
    removeListener(event: string, listener: (...args: any[]) => void): void;

    /**
     * Remove all events or all listeners registered for a particular event.  
     * 
     * @param event Name of the event to be removed (Remove all events if omitted)
     * 
     *  @example
     * function onQux(data) {
     *     console.log('qux Event:', data);
     * }
     * 
     * function anotherOnQux(data) {
     *     console.log('another qux Event:', data);
     * }
     * 
     * emitter.on('qux', onQux);
     * emitter.on('qux', anotherOnQux);
     * emitter.emit('qux', { key: 'value' });  // "qux Event: { key: 'value' }", "another qux Event: { key: 'value' }"
     * 
     * emitter.removeAllListeners('qux');
     * emitter.emit('qux', { key: 'value' });  // 아무 일도 일어나지 않음
     */
    removeAllListeners(event?: string): void;

    /**
     * Runs the listener (function) of the registered event.  
     * 
     * @param event Event Name
     * @returns  'true' listener execution successful, 'false' execution failed, 'undefined' listener no
     * 
     * @example
     * function onFoo(data) {
     *     console.log('foo Event:', data);
     * }
     * 
     * emitter.on('foo', onFoo);
     * emitter.emit('foo', { key: 'value' });  // "foo Event: { key: 'value' }"
     */
    emit(event: string, ...args: any[]): boolean | undefined;
}

export default EventEmitter;
export { EventEmitter };
