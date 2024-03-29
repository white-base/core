/**
 * namespace _L.Interface.IArrayCollection
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
    if (typeof ICollection === 'undefined') Message.error('ES011', ['Util', 'i-collection']);

    //==============================================================
    // 4. module implementation   
    var IArrayCollection  = (function (_super) {
        /**
         * @constructs _L.Interface.IArrayCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IArrayCollection() {
            _super.call(this);
        }
        Util.inherits(IArrayCollection, _super);

        IArrayCollection._NS = 'Interface';    // namespace

        /**
         * 조회 : 인덱스로 이름 조회
         */
        IArrayCollection.prototype.insertAt  = function() {
            Message.error('ES013', ['insertAt(pos, val, ...): bool']);
        };
    
        return IArrayCollection;
        
    }(ICollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IArrayCollection = IArrayCollection;
    } else {
        _global._L.IArrayCollection = IArrayCollection;
        _global._L.Interface.IArrayCollection = IArrayCollection; // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));