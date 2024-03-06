/**** i-element.js | _L.Interface.IElement ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    // var Util;
    // var IObject;
    // var IElement;
    
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
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IElement  = (function () {
        /**
         * 독립 요소 클래스
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
         * 복제
         * @abstract
         */
        IElement.prototype.clone  = function() {
            throw new ExtendError(/EL02131/, null, ['IElement']);
        };

        return IElement;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IElement = IElement;
    } else {
        _global._L.IElement = IElement;
        _global._L.Interface.IElement = IElement;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));