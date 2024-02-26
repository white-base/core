/**
 * namespace _L.Common.Observer
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Util;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
    } else {    
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util
    }

    //==============================================================Á
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new ExtendError(/ES011/, null, ['Util', 'util']);

    //==============================================================
    // 4. module implementation   
        var Observer = (function () {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _L.Common.Observer
         * @param {object} p_caller 함수 호출 본문에서 this 역활 publish.apply(p_caller, ...)
         */
        function Observer(p_caller) {
            if (typeof p_caller !== 'object') throw new ExtendError(/ES031/, null, ['caller']);
            
            var __subscribers = this._getInitObject();
            var isLog = false;
            var isSingleMode = false;

            /*_______________________________________*/        
            // priavte property
            
            /**
             * 전역 구독자
             * @private
             * @member {object}  _L.Common.Observer#__subscribers  
             */
            Object.defineProperty(this, '__subscribers',
            {
                get: function() { return __subscribers; },
                configurable: false,
                enumerable: false
            });

            /**
             * 호출함수의 this 
             * @protected
             * @member {object} _L.Common.Observer#_caller  
             */
            Object.defineProperty(this, '_caller', {
                value: p_caller,
                writable: false
            });

            /**
             * 목록 
             * @member {Array}  _L.Common.Observer#list  
             */
            Object.defineProperty(this, 'list', {
                get: function() {
                    var arr = [];
                    for (var prop in this.__subscribers) {
                        var elem = this.__subscribers[prop];
                        for (var i = 0; i < elem.length; i++) {
                            var obj = {};
                            obj[prop] = {};
                            obj[prop][i] = elem[i];
                            arr.push(obj);
                        }
                    }
                    return arr;
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 콘솔로드 출력 여부
             * @member {boolean}  _L.Common.Observer#isLog  
             */
            Object.defineProperty(this, 'isLog', 
            {
                get: function() { return isLog; },
                set: function(nVal) {
                    if (typeof nVal !== 'boolean') throw new ExtendError(/ES021/, null, ['isLog', 'boolean']);
                    isLog = nVal;
                }
            });

            /** 
             * 싱글모드는 callback 같이 작동함
             * 구독자 멀티모드, 단일시(false) 마지막 등록 구독자만 활성화 (기본값:true)  
             * @member {boolean} _L.Common.Observer#isSingleMode  
             */
            Object.defineProperty(this, 'isSingleMode',
            {
                get: function() { return isSingleMode; },
                set: function(nVal) { 
                    if (typeof nVal !== 'boolean') throw new ExtendError(/ES021/, null, ['isSingleMode', 'boolean']);
                    isSingleMode = nVal;
                }
            });



            // inner variable access
            this.__SET$__subscribers = function(val, call) {
                if (call instanceof Observer) { // 상속접근 허용
                    if (typeof val !== 'object') throw new ExtendError(/ES021/, null, ['__subscribers', 'object']);
                    if (typeof val.any === 'undefined') throw new ExtendError(/ES021/, null, ['__subscribers.any', 'array']);
                    __subscribers = val;    
                }
            }
        }

        Observer._NS = 'Common';    // namespace
        Observer._PARAMS = ['_caller'];  // creator parameter

        /**
         * 초기화 객체 얻기
         * @returns {object}
         */
        Observer.prototype._getInitObject = function() {
            return { any: [] };
        };
        
        /**
         * 초기화
         */
        Observer.prototype.init = function() {
            var obj = this._getInitObject();
            this.__SET$__subscribers(obj, this);
        };

        /**
         * 구독 신청
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에 등록 된다.
         * @param {function?} p_fn  구독 콜백 함수
         * @param {string?} p_code 구독 코드명 : 기본값 'any'
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            if (typeof p_fn !== 'function') throw new ExtendError(/ES021/, null, ['fn', 'function']);
            
            if (this.isSingleMode && this.__subscribers[p_code]) this.unsubscribe(p_code);    // 싱글모드시 초기화
            if (typeof this.__subscribers[p_code] === 'undefined') {
                this.__subscribers[p_code] = [];
            }
            this.__subscribers[p_code].push(p_fn);
        };
        
        /**
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에서 취소 된다.
         * @param {string?} p_code 이벤트 코드명 : 없으면 전체 초기함
         * @param {function?} p_fn 이벤트 콜백 함수
         */
        Observer.prototype.unsubscribe = function(p_code, p_fn) {
            if (typeof p_code === 'undefined')  {
                // this.__subscribers = {any: []};
                this.init();
                return;
            }

            if (this.__subscribers[p_code]) {
                if (typeof p_fn === 'function') {
                    for (var i = 0; i < this.__subscribers[p_code].length; i++) {
                        if (this.__subscribers[p_code][i] === p_fn) {
                            this.__subscribers[p_code].splice(i, 1);
                        }
                    }
                } else delete this.__subscribers[p_code];
            } 
        };

        /**
         * 구독 함수 전체 또는 지정 구독을 호출한다. publishAny(p1, p2);
         * @param {string?} p_code 이벤트 코드명 : 기본값 'any'
         */
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || 'any';
            
            var args = Array.prototype.slice.call(arguments);
            var arr = args.length >= 1 ? args.splice(1) : [];
            
            if (p_code in this.__subscribers) {
                for (var i = 0; i < this.__subscribers[p_code].length; i++) {
                    if (typeof this.__subscribers[p_code][i] === 'function') {
                        this.__subscribers[p_code][i].apply(this._caller, arr);
                    }
                }
            }
            
            if (this.isLog) {
                console.log('publish() 이벤트 발생 [' + this._caller.constructor.name + '] type:' + p_code);
            }
        };

        return Observer;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.Observer = Observer;
    } else {
        _global._L.Observer = Observer;
        _global._L.Common.Observer = Observer;  // namespace
    }

}(typeof window !== 'undefined' ? window : global));