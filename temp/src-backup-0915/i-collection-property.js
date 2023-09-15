/**
 * namespace _L.Interface.IPropertyCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
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
        Util                        = require('./util');
        ICollection                 = require('./i-collection').ICollection;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        ICollection                 = _global._L.ICollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof ICollection === 'undefined') Message.error('ES011', ['ICollection', 'i-collection']);

    //==============================================================
    // 4. module implementation   
    var IPropertyCollection  = (function (_super) {
        /**
         * @constructs _L.Interface.IPropertyCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IPropertyCollection() {
            _super.call(this);
        }
        Util.inherits(IPropertyCollection, _super);

        IPropertyCollection._NS = 'Interface';    // namespace

        /**
         * 조회 : 인덱스로 이름 조회
         */
        IPropertyCollection.prototype.keyOf  = function() {
            Message.error('ES013', ['keyOf(idx): str']);
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