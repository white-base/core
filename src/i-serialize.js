/**** i-serialize.js | _L.Interface.ISerialize ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 3. module implementation   
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
            throw new ExtendError(/EL02191/, null, ['ISerialize']);
        };

        /**
         * 가져오기(로드) 합니다.
         * @abstract
         */
        ISerialize.prototype.load  = function(String) {
            throw new ExtendError(/EL02192/, null, ['ISerialize']);
        };

        return ISerialize;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.ISerialize  = ISerialize;    // strip:
    
    // create namespace
    _global._L.Interface            = _global._L.Interface || {};

    _global._L.ISerialize = ISerialize;
    _global._L.Interface.ISerialize = ISerialize;
    
}(typeof window !== 'undefined' ? window : global));