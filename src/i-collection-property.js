/**
 * namespace _L.Interface.IPropertyCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var ICollection;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Interface     = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                = require('./util');
        ICollection         = require('./i-collection').ICollection;
    } else {
        Util                = _global._L.Util;
        ICollection         = _global._L.ICollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');

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

        /**
         * 조회 : 인덱스로 이름 조회
         */
        IPropertyCollection.prototype.keyOf  = function() {
            throw new Error('[ keyOf(idx) : str ] Abstract method definition, fail...');
        };

        // /**
        //  * 키(이름)로 삭제
        //  */
        // IPropertyCollection.prototype.removeByProp  = function() {
        //     throw new Error('[ keyOf() ] Abstract method definition, fail...');
        // };

        // /**
        //  * 키(이름)로 인덱스 조회
        //  */
        // IPropertyCollection.prototype.indexOfProp  = function() {
        //     throw new Error('[ keyOf() ] Abstract method definition, fail...');
        // };
    
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