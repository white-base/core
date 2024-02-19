/**
 * namespace _L.Common.ExtendError
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        // Message                     = require('./message').Message;
        Util                        = require('./util');
    } else {    // COVER:
        // Message                     = _global._L.Message;
        Util                        = _global._L.Util;
    }

    //==============================================================Á
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);

    //==============================================================
    // 4. module implementation   
    var ExtendError = (function (_super) {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * TODO: 필요시 구현
         * @constructs _L.Common.ExtendError
         * @param {string} p_message 사용자 메세지 내용
         * @param {ExtendError | object} p_object 속성객체 또는 상위 Error 객체
         * 우선순위 : 메세지 > 타겟 > 에러명
         */
        function ExtendError(p_message, p_object) {
            var _msg = '';
            var _prop;
            var _queue;    
            
            if (p_object instanceof ExtendError) {
                _queue = p_object.queue;
                _prop = p_object.prop;
            } else if (typeof p_object  === 'object') {
                _prop = p_object;
            }
            
            _msg = p_message + '\n';
            if (_prop) _msg += buildMessageProp(_prop);
            if (_queue) _msg += buildMsgQueue(_queue); 

            var _instance = _super.call(this, _msg);
            // _super.call(this, _msg);

            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, ExtendError);
            }

            /**
             * 에러 스텍 메세지
             * @member {array} _L.Common.ExtendError#_queue
             */
            // this.queue = [];

            /**
             * 에러 세부 메세지
             * @member {object} _L.Common.ExtendError#prop
             */
            // this.prop = {};

            if (_queue) _instance.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
            else _instance.queue = [];

            if (_prop) _instance.prop = _prop;
            else _instance.prop = {};

            _instance.queue.push(p_message);

            Object.setPrototypeOf(_instance, Object.getPrototypeOf(this));
        
            return _instance;


            // if (_queue instanceof ExtendError) this.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
            // if (_prop) this.prop = _prop;
            // this.queue.push(p_message);


            

            /**
             * 에러 메세지
             * @member {Object} 
             */

            // inner function 
            function buildMessageProp(p) {
                var msg = '';
                if (typeof p !== 'object' || p === null) return;
                for (var prop in p) {
                    if (typeof p[prop] === 'string')msg += prop + ' : '+ p[prop] + '\n';
                }
                return msg;
            }

            function buildMsgQueue(queue) {
                var msg = '';
                var queue_cnt = queue.length;
                for (var i = queue_cnt; i > 0; i--) {
                    // msg += '+' + p_object.stack[i];
                    var mark = '';
                    // msg += ;
                    
                    for (var ii = i; ii <= queue_cnt; ii++) { mark += '#'; }
                    msg += '' + mark + ' '+ queue[i - 1] + '\n';
                }
                return msg;
            }
        }
        Util.inherits(ExtendError, _super);

        ExtendError._NS = 'Common';    // namespace
        
        /**
         * 내부처리
         */
        //  ExtendError.prototype._execute = function() {
        //     // console.log('ExtendError._execute()');
        // };

        return ExtendError;
        
    }(Error));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ExtendError = ExtendError;
    } else {    // COVER:
        _global._L.ExtendError = ExtendError;
        _global._L.Common.ExtendError = ExtendError;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));