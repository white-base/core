/**** trans-queue.js | _L.Common.Observer ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util');                        // strip:
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
    var Observer = (function () {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _L.Common.Observer
         * @param {object} p_caller 함수 호출 본문에서 this 역활 publish.apply(p_caller, ...)
         */
        function Observer(p_caller) {
            if (typeof p_caller !== 'object') throw new ExtendError(/EL01511/, null, [typeof p_caller]);
            
            var $subscribers = this._getInitObject();
            var isLog = false;
            var isSingleMode = false;

            /*_______________________________________*/        
            // priavte property
            
            /**
             * 전역 구독자  
             * @private
             * @member {object}  _L.Common.Observer#$subscribers  
             */
            Object.defineProperty(this, '$subscribers',
            {
                get: function() { return $subscribers; },
                set: function(nVal) { 
                    if (typeof nVal !== 'object') throw new ExtendError(/EL01514/, null, [typeof val]);
                    if (typeof nVal.any === 'undefined') throw new ExtendError(/EL01515/, null, []);
                    $subscribers = nVal;    
                },
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
             * @member {Array}  _L.Common.Observer#_list  
             */
            Object.defineProperty(this, '_list', {
                get: function() {
                    var arr = [];
                    for (var prop in this.$subscribers) {
                        var elem = this.$subscribers[prop];
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
                    if (typeof nVal !== 'boolean') throw new ExtendError(/EL01512/, null, [typeof nVal]);
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
                    if (typeof nVal !== 'boolean') throw new ExtendError(/EL01513/, null, [typeof nVal]);
                    isSingleMode = nVal;
                }
            });

            // inner variable access
            // this.__SET$$subscribers = function(val, call) {
            //     if (call instanceof Observer) { // 상속접근 허용
            //         if (typeof val !== 'object') throw new ExtendError(/EL01514/, null, [typeof val]);
            //         if (typeof val.any === 'undefined') throw new ExtendError(/EL01515/, null, []);
            //         $subscribers = val;    
            //     }
            // }
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
         * 관찰자를 초기화
         */
        Observer.prototype.init = function() {
            var obj = this._getInitObject();
            this.$subscribers = obj;
        };

        /**
         * 구독 신청
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에 등록 된다.
         * @param {function} p_fn  구독 콜백 함수
         * @param {string?} [p_code = 'any'] 구독 코드명
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            if (typeof p_fn !== 'function') throw new ExtendError(/EL01516/, null, [typeof p_fn]);
            
            if (this.isSingleMode && this.$subscribers[p_code]) this.unsubscribe(p_code);    // 싱글모드시 초기화
            if (typeof this.$subscribers[p_code] === 'undefined') {
                this.$subscribers[p_code] = [];
            }
            this.$subscribers[p_code].push(p_fn);
        };
        
        /**
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에서 취소 된다.
         * @param {string?} p_code 이벤트 코드명 : 없으면 전체 초기함
         * @param {function?} p_fn 이벤트 콜백 함수
         */
        Observer.prototype.unsubscribe = function(p_code, p_fn) {
            if (typeof p_code === 'undefined')  {
                // this.$subscribers = {any: []};
                this.init();
                return;
            }

            if (this.$subscribers[p_code]) {
                if (typeof p_fn === 'function') {
                    for (var i = 0; i < this.$subscribers[p_code].length; i++) {
                        if (this.$subscribers[p_code][i] === p_fn) {
                            this.$subscribers[p_code].splice(i, 1);
                        }
                    }
                } else delete this.$subscribers[p_code];
            } 
        };

        /**
         * 구독 함수 전체 또는 지정 구독을 호출한다. publishAny(p1, p2);
         * @param {string?} [p_code = 'any'] 이벤트 코드명
         */
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || 'any';
            
            var args = Array.prototype.slice.call(arguments);
            var arr = args.length >= 1 ? args.splice(1) : [];
            
            if (p_code in this.$subscribers) {
                for (var i = 0; i < this.$subscribers[p_code].length; i++) {
                    if (typeof this.$subscribers[p_code][i] === 'function') {
                        this.$subscribers[p_code][i].apply(this._caller, arr);
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
    // 4. module export
    if (isNode) exports.Observer = Observer;        // strip:
    
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    _global._L.Observer = Observer;
    _global._L.Common.Observer = Observer; 

}(typeof window !== 'undefined' ? window : global));