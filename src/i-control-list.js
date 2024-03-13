/**** i-control-list.js | _L.Interface.IListControl ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IListControl  = (function () {
        /**
         * 목록 제어 인터페이스 입니다.
         * @constructs _L.Interface.IListControl
         * @interface
         */
        function IListControl() {
        }

        IListControl._NS = 'Interface';    // namespace
        IListControl._KIND = 'interface';
        
        /**
         * 목록에 대상을 추가합니다.
         * @abstract
         */
        IListControl.prototype.add = function() {
            throw new ExtendError(/EL02151/, null, ['IListControl']);
        };

        /**
         * 목록에서 대상을 삭제합니다.
         * @abstract
         */
        IListControl.prototype.del  = function() {
            throw new ExtendError(/EL02152/, null, ['IListControl']);
        };

        /**
         * 목록에 대상의 존재 여부를 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IListControl.prototype.has  = function() {
            throw new ExtendError(/EL02153/, null, ['IListControl']);
        };

        /**
         * 목록에서 대상을 찾습니다.
         * @returns {any}
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