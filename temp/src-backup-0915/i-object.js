/**
 * namespace _L.Interface.IObject
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
    var IObject  = (function () {
        /**
         * 최상위 객체 인터페이스
         * @constructs _L.Interface.IObject 
         * @interface
         */
        function IObject() {
        }
        
        IObject._NS = 'Interface';    // namespace

        /**
         * 객체타입 얻기
         */
        IObject.prototype.getTypes  = function() {
            Message.error('ES013', ['getTypes(): array<function>']);
        };
        
        /**
         * 인스턴스 여부 검사
         * @returns {Boolean}
         */
        IObject.prototype.instanceOf  = function() {
            Message.error('ES013', ['instanceOf(function | string): boolean']);
        };

        /**
         * 객체타입 얻기
         */
        IObject.prototype.equal  = function() {
            Message.error('ES013', ['equal(meta): boolean']);
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