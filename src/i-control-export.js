/**
 * namespace _L.Interface.IExportControl
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
    var IExportControl  = (function () {
        /**
         * 내보내기 컨트롤 인터페이스
         * @constructs _L.Interface.IExportControl
         * @interface
         */
        function IExportControl() {
        }
    
        IExportControl._NS = 'Interface';    // namespace
        IExportControl._KIND = 'interface';

        /**
         * 출력 : 전체
         * @abstract
         */
        IExportControl.prototype.write  = function() {
            throw new ExtendError(/EL02311/, null, ['IExportControl']);
        };
    
        return IExportControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IExportControl = IExportControl;
    } else {
        _global._L.IExportControl = IExportControl;
        _global._L.Interface.IExportControl = IExportControl;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));