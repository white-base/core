/**
 * namespace _L.Interface.ISerialize
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    // var Util;
    // var IObject;
    // var ISerialize;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
    } else {    
        Message                     = _global._L.Message;
    }

    //==============================================================
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    var ISerialize  = (function () {
        /**
         * 최상위 객체
         * @constructs _L.Interface.ISerialize
         * @interface
         */
        function ISerialize() {
        }

        ISerialize._NS = 'Interface';    // namespace

        /**
         * 출력 (내보내기)
         * @abstract
         * @returns {Stirng}
         */
        ISerialize.prototype.output  = function() {
            Message.error('ES013', ['output(...)']);
        };

        /**
         * 로드 (가져오기)
         * @abstract
         * @returns {Stirng}
         */
        ISerialize.prototype.load  = function() {
            Message.error('ES013', ['load(...)']);
        };

        return ISerialize;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ISerialize = ISerialize;
    } else {
        _global._L.ISerialize = ISerialize;
        _global._L.Interface.ISerialize = ISerialize;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));