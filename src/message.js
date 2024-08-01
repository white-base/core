/**** message.js | _L.Common.Message ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _messageCode                = require('./message-code').messageCode;    // strip:
    }                                                                               // strip:
    var $messageCode                    = _global._L.messageCode.core;              // modify:

    var messageCode                     = _messageCode  || $messageCode;            // strip:

    //==============================================================
    // 2. module dependency check
    //==============================================================
    // 3. module implementation       
    var Message = (function () {
       /**
        * 메세지와 코드를 관리합니다. (static)
        * @constructs _L.Common.Message
        * @static
        */
       function Message() { 
        }
        Message._NS = 'Common';     // namespace

        // inner function
        function isObject(obj) {
            return obj && typeof obj === 'object' && !Array.isArray(obj);
        }
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }
        function deepMerge(target, source) {
            for (var key in source) {
                if (source.hasOwnProperty(key)) {
                    var targetValue = target[key];
                    var sourceValue = source[key];
                    if (isObject(sourceValue)) {
                        if (!isObject(targetValue)) {
                            target[key] = {};
                        }
                        target[key] = deepMerge(target[key], sourceValue);
                    } else {
                        target[key] = sourceValue;
                    }
                }
            }
            return target;
        }

        // var define
        var $storage = {};
        var lang = 'kor';
        // var isLong = false;
        
        /**
         * 메시지 코드 스토리지
         * @member {string} _L.Common.Message#$storage
         */
        Object.defineProperty(Message, "$storage", {
            get: function() { 
                // if (!$storage) {
                //     var objs = [];
                //     for (var key in messageCode) {
                //         if (Object.prototype.hasOwnProperty.call(messageCode, key)) {
                //             objs.push(messageCode[key]);
                //         }
                //     }
                //     $storage = deepMerge.apply(null, {}, objs);
                // }
                return $storage;
            },
            set: function(val) { 
                deepMerge($storage, val);
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * 메세지 언어 
         * @member {string} _L.Common.Message#lang
         */
        Object.defineProperty(Message, "lang", {
            get: function() { return lang; },
            set: function(val) { 
                if (!Message.$storage[val]) throw new Error('The ['+ val +'] language does not exist.');
                lang = val;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * 긴 메세지 여부
         * @member {string} _L.Common.Message#isLong
         */
        // Object.defineProperty(Message, "isLong", {
        //     get: function() { return isLong; },
        //     set: function(val) { 
        //         isLong = val; 
        //     },
        //     configurable: false,
        //     enumerable: false,
        // });

        // local function
        function _getCodeObject(code){
            var MSG = Message.$storage[lang];
            // var div, part, num;

            if (!_isString(code)) return;

            // div = code.substring(0, 1);
            // part = code.substring(1, 4);
            // num = code.substring(4, code.length);
            // if (!MSG[div] || !MSG[div] || !MSG[div][part]) return;
            // return MSG[div][part][num];

            return MSG[code];
        }
        

        function _buildMessage(code, arr) {
            var str = _getCodeObject(code);
            var msg;

            if (!_isString(str)) return 'There are no messages about the code.' ;
            // if (typeof str !== 'string') return 'There are no messages about the code.' 
            
            msg = $build(str);
            // if (isLong) {
            //     long = $build(str);
            //     if (long.length > 0) msg += '\n' + long;
            // }
            return $intro(code) + msg;

            // inner function
            function $build(p_msg) {
                var msg = p_msg;
                var result;
                var max = 0;
                
                // if (!msg) return msg;
                result = msg.match(/\$\d+/g);
                if (!Array.isArray(result)) return msg;
                for (var i = 0; i < result.length; i++) {
                    var num = Number(result[i].replace('$', ''));
                    if (num > max) max = num;
                }
                for (var i = 1; i <= max; i++) {
                    var val = arr[i - 1];
                    msg = msg.replace(new RegExp('\\$'+ i, 'g'), val);
                }
                return msg;
            }
            function $intro(code) {
                var intro = '';
                var firstChar = code.substring(0, 1);
                
                if (firstChar === 'E') intro = 'Error';
                else if (firstChar === 'W') intro = 'Warn';
                return intro + ' ['+ code +'] ';
            }
        }

        /**
         * 메세지 코드에 대한 문자열를 얻습니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         * @returns {string}
         */
        Message.get = function(p_code, p_aValue) {
            return _buildMessage(p_code, p_aValue);
        };

        /**
         * 메세지 코드에 대한 Error 객체를 생성해서 예외룰 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.error = function(p_code, p_aValue) {
            throw new Error(Message.get(p_code, p_aValue));
        };

        /**
         * 메세지 코드에 대한 console.warn 을 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.warn = function(p_code, p_aValue) {
            console.warn(Message.get(p_code, p_aValue));
        };

        return Message;
    }());

    Message.$storage = messageCode;

    //==============================================================
    // 4. module export
    if (isNode) exports.Message     = Message;      // strip:
    
    // create namespace
    _global._L.Common               = _global._L.Common || {};

    _global._L.Message = Message;
    _global._L.Common.Message = Message;

}(typeof window !== 'undefined' ? window : global));