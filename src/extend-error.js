/**** extend-error.js | _L.Common.ExtendError ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
    } else {
        var $Message                    = _global._L.Message;
    }
    var Message                 = _Message              || $Message;

    //==============================================================Á
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활
    
    var ExtendError = (function () {
        /**
         * @overload
         * @param {string} p_msg 사용자 메세지 내용
         * @param {ExtendError | object} p_prop  상위 Error 객체
         * @returns {Error}
         */

        /**
         * @overload
         * @param {Regexp} p_msg 메세지 코드
         * @param {ExtendError | object} p_prop  메세지 코드 전달 파라메터
         * @param {array<string>} p_codeVal  메세지 코드 전달 파라메터
         * @returns {Error}
         */

        /**
         * 확장오류를 생성합니다.  
         * (ES5 하위 호환성 지원을 위해서 자체 상속방식으로 처리함)
         * @constructs _L.Common.ExtendError
         * @param {string | Regexp} p_msg  메세지코드 또는 메세지
         * @param {ExtendError | object} p_prop  이전 ExtendError 객체 또는 속성타입 오류메세지
         * @param {array<string>} p_codeVal  메세지코드값의 $1, $2 변환 값
         * @example
         * new ExtendError({code:'', ctx: []})
         * new ExtendError(/E0011/, [''])
         */
        function ExtendError(p_msg, p_prop, p_codeVal) {
            var _build = '';
            var _prop;
            var _queue;    
            var _msg;

            if (p_prop instanceof ExtendError) {
                _queue = p_prop.queue;
                _prop = p_prop.prop;
            } else if (typeof p_prop  === 'object' && p_prop !== null) {
                _prop = p_prop;
            }
            
            if (typeof p_msg === 'string') {
                _msg = p_msg;
            } else if (p_msg instanceof RegExp) {
                _msg = Message.get(p_msg.source, p_codeVal);
            } else _msg = '';
            
            _build = _msg + '\n';
            
            if (_prop) _build += $buildMessageProp(_prop);
            if (_queue) _build += $buildMsgQueue(_queue); 

            // var _instance = _super.call(this, _build);
            var _instance = new Error(_build);
            
            /**
             * 이전에 발생한 message 큐
             * @member {array<string>} _L.Common.ExtendError#queue
             */
            if (_queue) _instance.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
            else _instance.queue = [];
            
            /**
             * 속성타입 오류 메세지
             * @member {object} _L.Common.ExtendError#prop
             */
            if (_prop) _instance.prop = _prop;
            else _instance.prop = {};

            _instance.queue.push(_msg);


            if (Error.captureStackTrace && !OLD_ENV) {
                Error.captureStackTrace(_instance, ExtendError);
            }

            Object.setPrototypeOf(_instance, Object.getPrototypeOf(this));
        
            return _instance;

            // inner function 
            function $buildMessageProp(obj) {
                var msg = '';
                for (var prop in obj) {
                    if (typeof obj[prop] === 'string') msg += prop + ' : '+ obj[prop] + '\n';
                    else continue;
                }
                return msg;
            }
            function $buildMsgQueue(queue) {
                var msg = '';
                var queue_cnt = queue.length;
                for (var i = queue_cnt; i > 0; i--) {
                    var mark = '';
                    for (var ii = i; ii <= queue_cnt; ii++) { mark += '#'; }
                    msg += '' + mark + ' '+ queue[i - 1] + '\n';
                }
                return msg;
            }
        }

        ExtendError._NS = 'Common';    // namespace
        
        ExtendError.prototype = Object.create(Error.prototype, {
            constructor: {
                value: Error,
                enumerable: false,
                writable: true,
                configurable: true,
            },
        });
        
        ExtendError.prototype.toString = function() {
            return 'ExtendError : ' + this.message;
        };
          
        // REVIEW: 이부분이 제거 해도 문제 없는게 맞느지 검토해야함
        // if (Object.setPrototypeOf) {
        //     Object.setPrototypeOf(ExtendError, Error);
        // } else {
        //     ExtendError.__proto__ = Error;
        // }
        // Util.inherits(ExtendError, _super);

        
        return ExtendError;

    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ExtendError = ExtendError;
    } else {
        _global._L.ExtendError = ExtendError;
        _global._L.Common.ExtendError = ExtendError;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));