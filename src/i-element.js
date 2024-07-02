/**** i-element.js | _L.Interface.IElement ****/
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
    var IElement  = (function () {
        /**
         * 요소(독립) 인터페이스 입니다.
         * @constructs _L.Interface.IElement
         * @interface
         */
        function IElement() {
            /**
             * 요소명
             * @member {string} _L.Interface.IElement#_name
             */
            this._name = String;
        }

        IElement._NS = 'Interface';    // namespace
        IElement._KIND = 'interface';

        /**
         * 요소를 복제합니다.
         * @returns {any}
         * @abstract
         */
        IElement.prototype.clone  = function() {
            throw new ExtendError(/EL02131/, null, ['IElement']);
        };

        return IElement;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.IElement = IElement;    // strip:

    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};
    
    _global._L.IElement = IElement;
    _global._L.Interface.IElement = IElement;
    
}(typeof window !== 'undefined' ? window : global));