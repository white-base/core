/**
 * namespace _L.Interface.ISerialize
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
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
        ExtendError                 = require('./extend-error').ExtendError;
    } else {    
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new ExtendError(/ES011/, null, ['ExtendError', 'extend-error']);

    //==============================================================
    // 4. module implementation   
    var ISerialize  = (function () {
        /**
         * 직렬화 인터페이스
         * @constructs _L.Interface.ISerialize
         * @interface
         */
        function ISerialize() {
        }

        ISerialize._NS = 'Interface';    // namespace
        ISerialize._KIND = 'interface';

        /**
         * 출력 (내보내기)
         * @abstract
         */
        ISerialize.prototype.output  = function() {
            throw new ExtendError(/ES013/, null, ['output(...)']);
        };

        /**
         * 로드 (가져오기)
         * @abstract
         */
        ISerialize.prototype.load  = function(String) {
            throw new ExtendError(/ES013/, null, ['load(...)']);
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