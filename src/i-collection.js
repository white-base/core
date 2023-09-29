/**
 * namespace _L.Interface.ICollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
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
        Util                        = require('./util');
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util
        IPartControl                = _global._L.IPartControl;
        ILookupControl              = _global._L.ILookupControl;
        IBaseCollection             = _global._L.IBaseCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);

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

    
        ICollection._NS = 'Interface';    // namespace

        /**
         * 등록 : insert
         * @abstract
         */
        ICollection.prototype.add  = function() {
            Message.error('ES013', ['add(any): boolean']);
        };

        /**
         * 삭제 (객체, 이름) : delete
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            Message.error('ES013', ['remove(elem) : boolean']);
        };

        /**
         * 유무 검사 (소유) : read (select)
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            Message.error('ES013', ['contains()']);
        };

        /**
         * 찾기 (번호) : read(select)
         * @abstract
         */
        ICollection.prototype.indexOf  = function() {
            Message.error('ES013', ['indexOf()']);
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