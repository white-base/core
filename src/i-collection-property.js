/**** i-colleciton-property.js | _L.Interface.IPropertyCollection ****/
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
        var _Util                       = require('./util');
        var _ICollection                = require('./i-collection').ICollection;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Util                       = _global._L.Util;
        var $ICollection                = _global._L.ICollection;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Util                    = _Util                 || $Util;
    var ICollection             = _ICollection          || $ICollection;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof ICollection === 'undefined') throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

    //==============================================================
    // 4. module implementation   
    var IPropertyCollection  = (function (_super) {
        /**
         * 프로퍼티 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.IPropertyCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IPropertyCollection() {
            _super.call(this);
        }
        Util.inherits(IPropertyCollection, _super);

        IPropertyCollection._KIND = 'interface';
        IPropertyCollection._NS = 'Interface';    // namespace

        /**
         * 프로퍼티 키가 존재하는지 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IPropertyCollection.prototype.keyOf  = function() {
            throw new ExtendError(/EL02231/, null, ['IPropertyCollection']);
        };

        return IPropertyCollection;
        
    }(ICollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IPropertyCollection = IPropertyCollection;
    } else {
        _global._L.IPropertyCollection = IPropertyCollection;
        _global._L.Interface.IPropertyCollection = IPropertyCollection; // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));