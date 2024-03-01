/**
 * namespace _L.Interface.IListControl
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
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
            throw new ExtendError(/EL02151/, null, ['IListControl']);
        };

        /**
         * 해제
         * @abstract
         */
        IListControl.prototype.del  = function() {
            throw new ExtendError(/EL02152/, null, ['IListControl']);
        };

        /**
         * 존재 여부
         * @abstract
         */
        IListControl.prototype.has  = function() {
            throw new ExtendError(/EL02153/, null, ['IListControl']);
        };

        /**
         * 조회
         * @abstract
         */
        IListControl.prototype.find  = function() {
            throw new ExtendError(/EL02154/, null, ['IListControl']);
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