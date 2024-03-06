/**** i-object.js | _L.Interface.IObject ****/

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
    var IObject  = (function () {
        /**
         * 최상위 객체 인터페이스
         * @constructs _L.Interface.IObject 
         * @interface
         */
        function IObject() {
        }
        
        IObject._NS = 'Interface';    // namespace
        IObject._KIND = 'interface';

        /**
         * 객체타입 얻기
         * @abstract
         */
        IObject.prototype.getTypes  = function() {
            throw new ExtendError(/EL02111/, null, ['IObject']);
        };
        
        /**
         * 인스턴스 여부 검사
         * @abstract
         */
        IObject.prototype.instanceOf  = function() {
            throw new ExtendError(/EL02112/, null, ['IObject']);
        };

        /**
         * 객체 비교
         * @abstract
         */
        IObject.prototype.equal  = function() {
            throw new ExtendError(/EL02113/, null, ['IObject']);
        };
        
    
        return IObject;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IObject = IObject;
    } else {
        _global._L.IObject = IObject;
        _global._L.Interface.IObject = IObject;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));