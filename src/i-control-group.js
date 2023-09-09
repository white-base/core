/**
 * namespace _L.Interface.IGroupControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;

    //==============================================================
    // 1. namespace declaration
    _global._L                  = _global._L || {};
    _global._L.Interface        = _global._L.Interface || {};    
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                 = require('./message').Message;
    } else {    
        Message                 = _global._L.Message;
    }
    //==============================================================
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    var IGroupControl  = (function () {
        /**
         * @constructs _L.Interface.IGroupControl
         * @interface
         */
        function IGroupControl() {
        }

        IGroupControl._NS = 'Interface';    // namespace

        /**
         * 병합 : 그룹
         * @abstract
         */
        IGroupControl.prototype.merge  = function() {
            Message.error('ES013', ['merge(any)']);
        };

        /**
         * 복사 : 그룹
         * @abstract
         */
        IGroupControl.prototype.copy  = function() {
            Message.error('ES013', ['copy()']);
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