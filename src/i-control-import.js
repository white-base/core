/**** i-control-import.js | _L.Interface.IImportControl ****/

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
    var IImportControl  = (function () {
        /**
         * 가져오기 제어 인터페이스 입니다.
         * @constructs _L.Interface.IImportControl
         * @interface
         */
        function IImportControl() {
        }
    
        IImportControl._NS = 'Interface';    // namespace
        IImportControl._KIND = 'interface';

        /**
         * 대상을 가져옵니다. (읽기)
         * @abstract
         */
        IImportControl.prototype.read  = function() {
            throw new ExtendError(/EL02321/, null, ['IImportControl']);
        };
    
        return IImportControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IImportControl = IImportControl;
    } else {
        _global._L.IImportControl = IImportControl;
        _global._L.Interface.IImportControl = IImportControl;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));