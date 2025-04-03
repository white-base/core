/**** trans-queue.js | EventEmitter ****/
//==============================================================
import ExtendError from './extend-error.js';
// import Util from './util.js';
// import Message from './message.js';
  
var EventEmitter = (function () {
    /**
     * Creates an instance of the class 'EventEmitter'.
     * @constructs EventEmitter
     */
    function EventEmitter() {
        
        var $storage = {};
        var isLog = false;

        /**
         * Internal object that stores registered events.  
         * 
         * @private
         * @member {object}  EventEmitter#$subscribers  
         */
        Object.defineProperty(this, '$storage', {
            get: function() { return $storage; },
            set: function(nVal) { 
                if (!_isObject(nVal)) throw new ExtendError(/EL01501/, null, [this.constructor.name, nVal]);
                $storage = nVal;
            },
            configurable: false,
            enumerable: false
        });

        /**
         * Array that stores registered event names.  
         * 
         * @protected
         * @member {object}  EventEmitter#_list  
         */
        Object.defineProperty(this, '_list', {
            get: function() { 
                return Object.keys(this.$storage);
            },
            configurable: false,
            enumerable: false
        });

        /**
         * Array that stores registered event names.
         * 
         * @member {boolean}  EventEmitter#isLog  
         */
        Object.defineProperty(this, 'isLog', {
            get: function() { return isLog; },
            set: function(nVal) {
                if (typeof nVal !== 'boolean') throw new ExtendError(/EL01502/, null, [this.constructor.name, nVal]);
                isLog = nVal;
            }
        });
    }
    EventEmitter._NS = 'Common';    // namespace

    // local function
    function _isString(obj) {    // 공백 아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }

    /**
     * Adds a listener (function) for the event.  
     * 
     * @param {string} p_event Event Name
     * @param {function} p_listener Listener function
     */
    EventEmitter.prototype.on = function(p_event, p_listener) {
        if (!_isString(p_event)) throw new ExtendError(/EL01503/, null, [typeof p_event]);
        if (typeof p_listener !== 'function') throw new ExtendError(/EL01504/, null, [typeof p_listener]);
        
        if (typeof this.$storage[p_event] !== 'object') {
            this.$storage[p_event] = [];
        }
        if (this.$storage[p_event].indexOf(p_listener) === -1) {
            this.$storage[p_event].push(p_listener);
        }
        // this.$storage[p_event].push(p_listener);

    };
    /** Alias for method 'on(). */
    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
    
    /**
     * Adds a one-time function for the event.  
     * 
     * @param {string} p_event Event Name
     * @param {function} p_listener Listener function
     */
    EventEmitter.prototype.once = function(p_event, p_listener) {
        var self = this;

        if (!_isString(p_event)) throw new ExtendError(/EL01505/, null, [typeof p_event]);
        if (typeof p_listener !== 'function') throw new ExtendError(/EL01506/, null, [typeof p_listener]);

        function onceListener() {
            self.off(p_event, onceListener);
            p_listener.apply(self, arguments);
        }
        this.on(p_event, onceListener);
    };

    /**
     * Removes the listener (function) of the specified event.  
     * 
     * @param {string} p_event Event Name
     * @param {function} p_listener Listener function
     */
    EventEmitter.prototype.off = function(p_event, p_listener) {
        if (!_isString(p_event)) throw new ExtendError(/EL01507/, null, [typeof p_event]);
        if (typeof p_listener !== 'function') throw new ExtendError(/EL01508/, null, [typeof p_listener]);
        
        if (typeof this.$storage[p_event] === 'object') {
            var idx = this.$storage[p_event].indexOf(p_listener);
            if (idx > -1) {
                this.$storage[p_event].splice(idx, 1);
            }
        }
    };
    /** Alias of method 'off()'. */
    EventEmitter.prototype.removeListener = EventEmitter.prototype.off; // 별칭

    /**
     * Remove all events or all listeners registered for a particular event.  
     * @param {string} [p_event] Name of the event to be removed (Remove all events if omitted)
     */
    EventEmitter.prototype.removeAllListeners = function(p_event) {
        if (!p_event) {
            this.$storage = {};  // 초기화
        }
        if (typeof this.$storage[p_event] === 'object') {
            delete this.$storage[p_event];
        }
    };

    /**
     * Runs the listener (function) of the registered event.  
     * 
     * @param {string} p_event Event Name
     * @returns {boolean | undefined}  'true' listener execution successful, 'false' execution failed, 'undefined' listener no
     */
    EventEmitter.prototype.emit = function(p_event) {
        var args = [].slice.call(arguments, 1);
        var listeners = [];
        // var isListener = false;
        var isReturn;

        if (!_isString(p_event)) throw new ExtendError(/EL01509/, null, [typeof p_event]);

        if (typeof this.$storage[p_event] === 'object') {
            listeners = this.$storage[p_event].slice();
            for (var i = 0; i < listeners.length; i++) {
                isReturn = listeners[i].apply(this, args);
                if (isReturn === false) return false;
            }
        }
        if (this.isLog) console.log('['+p_event+'] 이벤트가 밸생하였습니다.');

        return listeners.length > 0 ? true : undefined;
    };

    return EventEmitter;
    
}());

export default EventEmitter;
export { EventEmitter };