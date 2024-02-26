/**
 * namespace _L.Interface.IGroupControl
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
    var IGroupControl  = (function () {
        /**
         * 그룹 컨트롤 인터페이스
         * @constructs _L.Interface.IGroupControl
         * @interface
         */
        function IGroupControl() {
        }

        IGroupControl._NS = 'Interface';    // namespace
        IGroupControl._KIND = 'interface';

        /**
         * 병합 : 그룹
         * @abstract
         */
        IGroupControl.prototype.merge  = function() {
            throw new ExtendError(/ES013/, null, ['merge(any)']);
        };

        /**
         * 복사 : 그룹
         * @abstract
         */
        IGroupControl.prototype.copy  = function() {
            throw new ExtendError(/ES013/, null, ['copy()']);
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