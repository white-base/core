/**
 * namespace _L.Common.ExtendError
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    // var Util;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        // Util                        = require('./util');
    } else {    // COVER:
        Message                     = _global._L.Message;
        // Util                        = _global._L.Util;
    }

    //==============================================================Á
    // 3. module dependency check
    // if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 4. module implementation   
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활

    var ExtendError = (function () {
        
        /**
         * @overload
         * @param {string} p_message 사용자 메세지 내용
         * @param {ExtendError | object} p_object  상위 Error 객체
         * @returns {Error}
         */

        /**
         * @overload
         * @param {Regexp} p_message 메세지 코드
         * @param {ExtendError | object} p_object  메세지 코드 전달 파라메터
         * @param {array<string>} p_arrVal  메세지 코드 전달 파라메터
         * @returns {Error}
         */

        /**
         * 확장 에러   
         * ES5 이상 호환성 지원을 위해서 자체 상속방식으로 처리함 
         * @constructs _L.Common.ExtendError
         * @param {string | Regexp} p_message 사용자 메세지 내용
         * @param {ExtendError | object} p_object  상위 Error 객체 또는 속성 객체
         * @param {array<string>} p_arrVal  메세지 코드값
         * @example
         * new ExtendError({code:'', ctx: []})
         * new ExtendError(/E0011/, [''])
         */
        function ExtendError(p_message, p_object, p_arrVal) {
            var _build = '';
            var _prop;
            var _queue;    
            var _message;

            if (p_object instanceof ExtendError) {
                _queue = p_object.queue;
                _prop = p_object.prop;
            } else if (typeof p_object  === 'object' && p_object !== null) {
                _prop = p_object;
            }
            
            if (typeof p_message === 'string') {
                _message = p_message;
            } else if (p_message instanceof RegExp) {
                _message = Message.get(p_message.source, p_arrVal);
            } else _message = '';
            
            _build = _message + '\n';
            
            if (_prop) _build += $buildMessageProp(_prop);
            if (_queue) _build += $buildMsgQueue(_queue); 

            // var _instance = _super.call(this, _build);
            var _instance = new Error(_build);
            
            /**
             * 상위 에러 스택 메세지 (catch문)
             * @member {array} _L.Common.ExtendError#_queue
             */
            if (_queue) _instance.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
            else _instance.queue = [];
            
            /**
             * 에러 속성 메세지
             * @member {object} _L.Common.ExtendError#prop
             */
            if (_prop) _instance.prop = _prop;
            else _instance.prop = {};

            _instance.queue.push(_message);

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
        ExtendError.prototype = Object.create(Error.prototype, {
            constructor: {
              value: Error,
              enumerable: false,
              writable: true,
              configurable: true,
            },
          });
          
        // REVIEW: 이부분이 제거 해도 문제 없는게 맞느지 검토해야함
        // if (Object.setPrototypeOf) {
        //     Object.setPrototypeOf(ExtendError, Error);
        // } else {
        //     ExtendError.__proto__ = Error;
        // }
        // Util.inherits(ExtendError, _super);

        ExtendError._NS = 'Common';    // namespace
        
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