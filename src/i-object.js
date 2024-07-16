/**** i-object.js | _L.Interface.IObject ****/
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
    var IObject  = (function () {
        /**
         * 객체 인터페이스 입니다. (최상위)
         * @constructs _L.Interface.IObject 
         * @interface
         */
        function IObject() {
        }
        
        IObject._NS = 'Interface';    // namespace
        IObject._KIND = 'interface';

        /**
         * 객체 타입들을 얻습니다.
         * @returns {array<any>}
         * @abstract
         */
        IObject.prototype.getTypes  = function() {
            throw new ExtendError(/EL02111/, null, ['IObject']);
        };
        
        /**
         * 객체의 인스턴스 여부를 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IObject.prototype.instanceOf  = function() {
            throw new ExtendError(/EL02112/, null, ['IObject']);
        };

        /**
         * 객체와 비교합니다.
         * @returns {boolean}
         * @abstract
         */
        IObject.prototype.equal  = function() {
            throw new ExtendError(/EL02113/, null, ['IObject']);
        };
        
    
        return IObject;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.IObject     = IObject;      // strip:
    
    // create namespace
    _global._L.Interface            = _global._L.Interface || {};

    _global._L.IObject = IObject;
    _global._L.Interface.IObject = IObject;

}(typeof window !== 'undefined' ? window : global));