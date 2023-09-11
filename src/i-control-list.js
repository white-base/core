/**
 * namespace _L.Interface.IListControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    // var Util;
    // var IObject;
    // var IListControl;
    
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
    var IListControl  = (function () {
        /**
         * 최상위 객체
         * @constructs _L.Interface.IListControl
         * @interface
         */
        function IListControl() {
        }

        IListControl._NS = 'Interface';    // namespace
        
        /**
         * 등록
         * @abstract
         */
        IListControl.prototype.register = function() {
            Message.error('ES013', ['register(any)']);
        };

        /**
         * 해제
         * @abstract
         * @returns {boolean}
         */
        IListControl.prototype.release  = function() {
            Message.error('ES013', ['release(key)']);
        };

        /**
         * 존재 여부
         * @abstract
         * @returns {boolean}
         */
        IListControl.prototype.has  = function() {
            Message.error('ES013', ['has(any)']);
        };

        /**
         * 조회
         * @abstract
         * @returns {any}
         */
        IListControl.prototype.find  = function() {
            Message.error('ES013', ['has(any)']);
        };

        return IListControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IListControl = IListControl;
    } else {
        _global._L.IListControl = IListControl;
        _global._L.Interface.IListControl = IListControl;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));