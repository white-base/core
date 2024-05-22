/**** i-marshal.js | _L.Interface.IMarshal ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IMarshal  = (function () {
        /**
         * 객체 통제 인터페이스 입니다.
         * @constructs _L.Interface.IMarshal
         * @interface
         */
        function IMarshal() {

            /**
             * 객체의 고유 식별자
             * @member {string} _L.Interface.IMarshal#_guid
             */
            this._guid = String;

            /**
             * 객체의 타입
             * @member {string} _L.Interface.IMarshal#_type REVIEW:
             */
            this._type = [['_req_', Function, {$type: 'class'} ]];
        }

        IMarshal._NS = 'Interface';    // namespace
        IMarshal._KIND = 'interface';
        
        /**
         * 대상의 직렬화 객체를 얻습니다.
         * @abstract
         */
        IMarshal.prototype.getObject = function() {
            throw new ExtendError(/EL02121/, null, ['IMarshal']);
        };

        /**
         * 직렬화 객체를 설정합니다.
         * @abstract
         */
        IMarshal.prototype.setObject  = function() {
            throw new ExtendError(/EL02122/, null, ['IMarshal']);
        };

        return IMarshal;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IMarshal = IMarshal;
    } else {
        _global._L.IMarshal = IMarshal;
        _global._L.Interface.IMarshal = IMarshal;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));