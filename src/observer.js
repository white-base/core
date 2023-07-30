/**
 * namespace _L.Common.Observer
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};

    //==============================================================
    // 2. import module

    //==============================================================Á
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    
    
    var Observer = (function () {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _L.Common.Observer
         * @param {object} p_caller 함수 호출 본문에서 this 역활 publish.apply(p_caller, ...)
         */
        function Observer(p_caller) {
            if (typeof p_caller !== 'object') throw new Error('p_caller 대상객체를 지정해야 합니다.');
            
            var isLog = false;
            var isSingleMode = false;
            var __subscribers = { any: [] };

            /*_______________________________________*/        
            // public property
            Object.defineProperty(this, 'isLog', 
            {
                get: function() { return isLog; },
                set: function(nVal) {
                    if (typeof nVal !== 'boolean') throw new Error('Only [isLog] type "boolean" can be added');
                    isLog = nVal;
                }
            });

            /** 
             * 싱글모드는 callback 같이 작동함
             * 구독자 멀티모드, 단일시(false) 마지막 등록 구독자만 활성화 (기본값:true)  
             * @member {Boolean} 
             */
            Object.defineProperty(this, 'isSingleMode',
            {
                get: function() { return isSingleMode; },
                set: function(nVal) { 
                    if (typeof nVal !== 'boolean') throw new Error('Only [isSingleMode] type "boolean" can be added');
                    isSingleMode = nVal;
                }
            });

            /*_______________________________________*/        
            // protected property

            /**
             * 등록함수의 this 
             * @protected
             * @member {object}
             */
            Object.defineProperty(this, '_caller', {
                value: p_caller,
                writable: false
            });
            
            /*_______________________________________*/        
            // priavte property

            /**
             * 전역 구독자
             * @member {object}
             */
            Object.defineProperty(this, '__subscribers',
            {
                get: function() { return __subscribers; },
                set: function(nVal) { 
                    if (typeof nVal !== 'object') throw new Error('Only [__subscribers] type "object" can be added');
                    if (typeof nVal.any === 'undefined') throw new Error('Only [__subscribers.any] type "array" can be added');
                    __subscribers = nVal;
                }
            });
            
        }

        /**
         * 구독 신청
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에 등록 된다.
         * @param {function?} p_fn  구독 콜백 함수
         * @param {string?} p_code 구독 코드명 : 기본값 'any'
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            if (typeof p_fn !== 'function') throw new Error('Only [p_fn] type "function" can be added');
            
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
                this.__subscribers = {any: []};
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
        // namespace
        _global._L.Common.Observer = Observer;
    }

}(typeof window !== 'undefined' ? window : global));