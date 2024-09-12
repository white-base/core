/**
 * The 'EventEmitter' class provides the ability to manage event listeners and issue events.
 * This class works similarly to Node.js' 'EventEmitter' and is designed for use in browser environments.
 */
declare class EventEmitter {
    
    /**
     * Creates an instance of the class 'EventEmitter'.
     */
    constructor();
    
    /**
     * Internal object that stores events.
     */
    $storage: object;

    /**
     * Determines whether to output console logs.
     */
    isLog: boolean;
    
    /**
     * Register a listener for the specified event.
     * 
     * @param {string} event - Name of the event.
     * @param {Function} listener - The function to be called when an event occurs.
     * 
     * @example
     * var emitter = new EventEmitter();
     * 
     * function onFoo(data) {
     *     console.log ('foo event:', data);
     * }
     * 
     * emitter.on('foo', onFoo);
     * emitter.emit('foo', { key: 'value' });  // "foo 이벤트: { key: 'value' }"
     */
    on(event: string, listener: Function): void;
   
    /**
     * Alias of the method 'on', which can be used to register an event listener.
     */
    addListener: EventEmitter['on'];
    
    /**
     * Register an event listener that runs only once.
     * 
     * @param {string} event - Name of the event.
     * @param {Function} listener - a function that will be called only once when an event occurs.
     * 
     * @example
     * emitter.once('bar', function(data) {
     *     console.log ('bar event:', data);
     * });
     * 
     * emitter.emit('bar', { key: 'value' });  // "bar 이벤트: { key: 'value' }"
     * emitter.emit ('bar', {key: 'value'}); // Nothing happens
     */
    once(event: string, listener: Function): void;

    /**
     * Removes the listener for the specified event.
     * 
     * @param {string} event - Name of the event.
     * @param {Function} listener - Listener function to remove.
     * 
     * @example
     * function onQux(data) {
     *     console.log ('qux event:', data);
     * }
     * 
     * emitter.on('qux', onQux);
     * emitter.emit('qux', { key: 'value' });  // "qux 이벤트: { key: 'value' }"
     * 
     * emitter.off('qux', onQux);
     * emitter.emit ('qux', {key: 'value'}); // Nothing happens
     */
    off(event: string, listener: Function): void;
  
    /**
     * Alias of the 'off' method, which can be used to remove a listener for a specified event.
     */
    removeListener: EventEmitter['off'];

    /**
     * Removes all listeners for the specified event. 
     * Omitting the event name removes the listener of all events.
     * 
     * @param {string} [event] - Name of the event, which can be omitted.
     * 
     * @example
     * function onQux(data) {
     *     console.log ('qux event:', data);
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
     * emitter.emit ('qux', {key: 'value'}); // Nothing happens
     */
    removeAllListeners(event?: string): void;

    /**
     * Issue the event and call the registered listener.
     * 
     * @param {string} event - Name of the event.
     * @param {...*} args - Arguments to be passed to the event listener.
     * 
     * @example
     * function onFoo(data) {
     *     console.log ('foo event:', data);
     * }
     * 
     * emitter.on('foo', onFoo);
     * emitter.emit('foo', { key: 'value' });  // "foo 이벤트: { key: 'value' }"
     */
    emit(event: string, ...args: any[]): boolean;

}

export = EventEmitter