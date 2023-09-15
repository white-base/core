/**
 * namespace _L.Interface.IElement
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
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
    } else {    
        Message                     = _global._L.Message;
    }

    //==============================================================
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    var IElement  = (function () {
        /**
         * 최상위 객체
         * @constructs _L.Interface.IElement
         * @interface
         */
        function IElement() {
            /**
             * 요소명
             * @member {string} _L.Interface.IList#_name
             */
            this._name = String;
        }

        IElement._NS = 'Interface';    // namespace

        /**
         * 복제
         * @abstract
         * @returns {Stirng}
         */
        IElement.prototype.clone  = function() {
            Message.error('ES013', ['clone()']);
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