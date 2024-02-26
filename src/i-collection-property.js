/**
 * namespace _L.Interface.IPropertyCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Util;
    var ICollection;

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
        ICollection                 = require('./i-collection').ICollection;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util;
        ICollection                 = _global._L.ICollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new ExtendError(/ES011/, null, ['ExtendError', 'extend-error']);
    if (typeof Util === 'undefined') throw new ExtendError(/ES011/, null, ['Util', 'util']);
    if (typeof ICollection === 'undefined') throw new ExtendError(/ES011/, null, ['ICollection', 'i-collection']);

    //==============================================================
    // 4. module implementation   
    var IPropertyCollection  = (function (_super) {
        /**
         * 프로퍼티 컬렉션 인터페이스 
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
         * 조회 : 인덱스로 이름 조회
         * @abstract
         */
        IPropertyCollection.prototype.keyOf  = function() {
            throw new ExtendError(/ES013/, null, ['keyOf(idx): str']);
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