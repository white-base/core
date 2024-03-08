/**** i-colleciton.js | _L.Interface.ICollection ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var IPartControl;
    var ILookupControl;
    var IBaseCollection;
    var Util;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};    
    
    //==============================================================
    // 2. import module
    
    if (isNode) {     
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util
        IPartControl                = _global._L.IPartControl;
        ILookupControl              = _global._L.ILookupControl;
        IBaseCollection             = _global._L.IBaseCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 4. module implementation
    var ICollection  = (function () {
        /**
         * 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.ICollection
         * @interface
         */
        function ICollection() {
        }

        ICollection._KIND = 'interface';
        ICollection._NS = 'Interface';    // namespace

        /**
         * 컬렉션에 요소를 추가합니다.
         * @abstract
         */
        ICollection.prototype.add  = function() {
            throw new ExtendError(/EL02211/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소를 제거합니다.
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            throw new ExtendError(/EL02212/, null, ['ICollection']);
        };

        /**
         * 요소가 컬렉션에 존재하는지 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            throw new ExtendError(/EL02213/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소을 조회합니다.
         * @returns {number}
         * @abstract
         */
        ICollection.prototype.indexOf  = function() {
            throw new ExtendError(/EL02214/, null, ['ICollection']);
        };

        return ICollection;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ICollection = ICollection;
    } else {
        _global._L.ICollection = ICollection;
        _global._L.Interface.ICollection = ICollection;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));