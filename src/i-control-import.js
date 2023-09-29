/**
 * namespace _L.Interface.IImportControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;

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
    var IImportControl  = (function () {
        /**
         * 입력 컨트롤 인터페이스
         * @constructs _L.Interface.IImportControl
         * @interface
         */
        function IImportControl() {
        }
    
        IImportControl._NS = 'Interface';    // namespace

        /**
         * 입력 : 전체
         * @abstract
         */
        IImportControl.prototype.read  = function() {
            Message.error('ES013', ['read(any)']);
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