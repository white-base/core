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
    var IListControl  = (function () {
        /**
         * 리스트 컨트롤 인터페이스
         * @constructs _L.Interface.IListControl
         * @interface
         */
        function IListControl() {
        }

        IListControl._NS = 'Interface';    // namespace
        IListControl._KIND = 'interface';
        
        /**
         * 등록
         * @abstract
         */
        IListControl.prototype.add = function() {
            Message.error('ES013', ['add(key)']);
        };

        /**
         * 해제
         * @abstract
         */
        IListControl.prototype.del  = function() {
            Message.error('ES013', ['del(key)']);
        };

        /**
         * 존재 여부
         * @abstract
         */
        IListControl.prototype.has  = function() {
            Message.error('ES013', ['has(any)']);
        };

        /**
         * 조회
         * @abstract
         */
        IListControl.prototype.find  = function() {
            Message.error('ES013', ['find(any)']);
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