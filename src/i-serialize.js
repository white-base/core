/**** i-serialize.js | _L.Interface.ISerialize ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var ISerialize  = (function () {
        /**
         * 직렬화 인터페이스 입니다.
         * @constructs _L.Interface.ISerialize
         * @interface
         */
        function ISerialize() {
        }

        ISerialize._NS = 'Interface';    // namespace
        ISerialize._KIND = 'interface';

        /**
         * 내보내기(출력)를 합니다.
         * @returns {any}
         * @abstract
         */
        ISerialize.prototype.output  = function() {
            throw new ExtendError(/EL02351/, null, ['ISerialize']);
        };

        /**
         * 가져오기(로드) 합니다.
         * @abstract
         */
        ISerialize.prototype.load  = function(String) {
            throw new ExtendError(/EL02352/, null, ['ISerialize']);
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