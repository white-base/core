/**** trans-queue.js | _L.Common.EventEmitter ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util').Util;                   // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Util                       = _global._L.Util;              // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Util                    = _Util                 || $Util;                   // strip:

    //==============================================================Á
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 3. module implementation  
    var EventEmitter = (function () {
        /**
         * 이벤트 발행 클래스
         * @constructs _L.Common.EventEmitter
         */
        function EventEmitter() {
            
            var $storage = {};
            var isLog = false;

            /**
             * 리스너 객체 스토리지
             * @private
             * @member {object}  _L.Common.EventEmitter#$subscribers  
             */
            Object.defineProperty(this, '$storage',
            {
                get: function() { return $storage; },
                set: function(nVal) { 
                    if (!_isObject(nVal)) throw new ExtendError(/EL01501/, null, [this.constructor.name, nVal]);
                    $storage = nVal;
                },
                configurable: false,
                enumerable: false
            });

            /**
             * 전체 이벤트명
             * @private
             * @member {object}  _L.Common.EventEmitter#list  
             */
            Object.defineProperty(this, 'list',
                {
                    get: function() { 
                        return Object.keys(this.$storage);
                    },
                    configurable: false,
                    enumerable: false
                });

            /**
             * log 출력 여부
             * @member {boolean}  _L.Common.EventEmitter#isLog  
             */
            Object.defineProperty(this, 'isLog', 
            {
                get: function() { return isLog; },
                set: function(nVal) {
                    if (typeof nVal !== 'boolean') throw new ExtendError(/EL01502/, null, [this.constructor.name, nVal]);
                    isLog = nVal;
                }
            });
        }
        EventEmitter._NS = 'Common';    // namespace

        // local function
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        /**
         * 이벤트에 대한 리스너(함수)를 추가합니다. 
         * @param {string} p_event 이벤트 명
         * @param {function} p_listener 리스너 함수
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
        EventEmitter.prototype.addListener = EventEmitter.prototype.on; // 별칭
        
        /**
         * 이벤트에 대한 일회성 함수를 추가합니다. 
         * @param {string} p_event 이벤트 명
         * @param {function} p_listener 리스너 함수
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
         * 지정한 이벤트 의 리스너(함수)를 제거합니다. (이벤트명은 유지)
         * @param {string} p_event 이벤트 명
         * @param {function} p_listener 리스너 함수
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
        EventEmitter.prototype.removeListener = EventEmitter.prototype.off; // 별칭

        /**
         * 전체 이벤트 또는 지정한 이벤트에 등록된 이벤트명과 리스너를 모두 제거합니다.
         * @param {string} [p_event] 이벤트명
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
         * 이벤트명으로 등록된 리스너(함수)를 실행합니다.
         * @param {string} p_event 이벤트명
         * @returns {boolean} 리스너가 실행되었는지 여부
         */
        EventEmitter.prototype.emit = function(p_event) {
            var args = [].slice.call(arguments, 1);
            var listeners;
            var isListener = false;

            if (!_isString(p_event)) throw new ExtendError(/EL01509/, null, [typeof p_event]);

            if (typeof this.$storage[p_event] === 'object') {
                listeners = this.$storage[p_event].slice();
                for (var i = 0; i < listeners.length; i++) {
                    listeners[i].apply(this, args);
                }
                if (listeners.length > 0) isListener = true;
            }

            if (this.isLog) {
                console.log('['+p_event+'] 이벤트가 밸생하였습니다.');
            }
            return isListener;
        };

        return EventEmitter;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.EventEmitter    = EventEmitter;        // strip:
    
    // create namespace
    _global._L.Common                   = _global._L.Common || {};

    _global._L.EventEmitter = EventEmitter;
    _global._L.Common.EventEmitter = EventEmitter; 

}(typeof window !== 'undefined' ? window : global));