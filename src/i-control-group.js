/**** i-control-group.js | _L.Interface.IGroupControl ****/

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
    var IGroupControl  = (function () {
        /**
         * 그룹 제어 인터페이스 입니다.
         * @constructs _L.Interface.IGroupControl
         * @interface
         */
        function IGroupControl() {
        }

        IGroupControl._NS = 'Interface';    // namespace
        IGroupControl._KIND = 'interface';

        /**
         * 병합합니다.
         * @abstract
         */
        IGroupControl.prototype.merge  = function() {
            throw new ExtendError(/EL02331/, null, ['IGroupControl']);
        };

        /**
         * 복사합니다.
         * @returns {any}
         * @abstract
         */
        IGroupControl.prototype.copy  = function() {
            throw new ExtendError(/EL02332/, null, ['IGroupControl']);
        };

        return IGroupControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IGroupControl = IGroupControl;
    } else {
        _global._L.IGroupControl = IGroupControl;
        _global._L.Interface.IGroupControl = IGroupControl;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));