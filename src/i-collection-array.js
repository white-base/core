/**** i-colleciton-array.js | _L.Interface.IArrayCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};     // Branch:
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util');                        // strip:
        var _ICollection                = require('./i-collection').ICollection;    // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $ICollection                = _global._L.ICollection;       // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var ICollection             = _ICollection          || $ICollection;            // strip:

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof ICollection === 'undefined') throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

    //==============================================================
    // 4. module implementation   
    var IArrayCollection  = (function (_super) {
        /**
         * 배열 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.IArrayCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IArrayCollection() {
            _super.call(this);
        }
        Util.inherits(IArrayCollection, _super);
        
        IArrayCollection._KIND = 'interface';
        IArrayCollection._NS = 'Interface';    // namespace

        /**
         * 요소를 지정위치에 추가합니다.
         * @abstract
         */
        IArrayCollection.prototype.insertAt  = function() {
            throw new ExtendError(/EL02221/, null, ['IArrayCollection']);
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