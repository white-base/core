/**** i-colleciton.js | _L.Interface.ICollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        // var _Util                       = require('./util');                        // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;       // modify:
    var $ExtendError                = _global._L.ExtendError;   // modify:
    // var $Util                       = _global._L.Util;          // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    // var Util                    = _Util                 || $Util;                   // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    // if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 3. module implementation
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
            throw new ExtendError(/EL02161/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소를 제거합니다.
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            throw new ExtendError(/EL02162/, null, ['ICollection']);
        };

        /**
         * 요소가 컬렉션에 존재하는지 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            throw new ExtendError(/EL02163/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소을 조회합니다.
         * @returns {number}
         * @abstract
         */
        ICollection.prototype.indexOf  = function() {
            throw new ExtendError(/EL02164/, null, ['ICollection']);
        };

        return ICollection;
        
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.ICollection = ICollection;      // strip:
    
    _global._L.Interface            = _global._L.Interface || {};    

    _global._L.ICollection = ICollection;
    _global._L.Interface.ICollection = ICollection;

}(typeof window !== 'undefined' ? window : global));