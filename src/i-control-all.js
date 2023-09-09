/**
 * namespace _L.Interface.IAllControl
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
    var IAllControl  = (function () {
        /**
         * @constructs _L.Interface.IAllControl
         * @interface
         */
        function IAllControl() {
        }
    
        IAllControl._NS = 'Interface';    // namespace

        /**
         * 복제 : 전체
         * @abstract
         */
        IAllControl.prototype.clone  = function() {
            Message.error('ES013', ['clone(): obj']);
        };

        /**
         * 로드 : 전체
         * @abstract
         */
        IAllControl.prototype.load  = function() {
            Message.error('ES013', ['load(any)']);
        };

        /**
         * 삭제 : 전체
         * @abstract
         */
        IAllControl.prototype.clear  = function() {
            Message.error('ES013', ['clear()']);
        };
    
        return IAllControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IAllControl = IAllControl;
    } else {
        _global._L.IAllControl = IAllControl;
        _global._L.Interface.IAllControl = IAllControl;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));