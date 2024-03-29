/**
 * namespace _L.Interface.IPartControl
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
    var IPartControl  = (function () {
        /**
         * @constructs _L.Interface.IPartControl
         * @interface
         */
        function IPartControl() {
        }
    
        IPartControl._NS = 'Interface';    // namespace

        /**
         * 단일 등록
         * @abstract
         */
        IPartControl.prototype.add  = function() {
            Message.error('ES013', ['add(any): boolean']);
        };

        /**
         * 단일 삭제
         * @abstract
         */
        IPartControl.prototype.remove  = function() {
            Message.error('ES013', ['remove(any): boolean']);
        };
    
        return IPartControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IPartControl = IPartControl;
    } else {
        _global._L.IPartControl = IPartControl;
        _global._L.Interface.IPartControl = IPartControl;       // namespace
    }

}(typeof window !== 'undefined' ? window : global));