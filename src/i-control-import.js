/**
 * namespace _L.Interface.IImportControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;

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
    var IImportControl  = (function () {
        /**
         * 입력 컨트롤 인터페이스
         * @constructs _L.Interface.IImportControl
         * @interface
         */
        function IImportControl() {
        }
    
        IImportControl._NS = 'Interface';    // namespace
        IImportControl._KIND = 'interface';

        /**
         * 입력 : 전체
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