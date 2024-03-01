/**
 * namespace _L.Interface.ICollection
 */
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
         * 컬렉션 최상위 인터페이스
         * @constructs _L.Interface.ICollection
         * @interface
         */
        function ICollection() {
        }

        ICollection._KIND = 'interface';
        ICollection._NS = 'Interface';    // namespace

        /**
         * 등록 : insert
         * @abstract
         */
        ICollection.prototype.add  = function() {
            throw new ExtendError(/EL02211/, null, ['ICollection']);
        };

        /**
         * 삭제 (객체, 이름) : delete
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            throw new ExtendError(/EL02212/, null, ['ICollection']);
        };

        /**
         * 유무 검사 (소유) : read (select)
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            throw new ExtendError(/EL02213/, null, ['ICollection']);
        };

        /**
         * 찾기 (번호) : read(select)
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