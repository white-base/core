/**
 * namespace _L.Interface.IPropertyCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var ICollection;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                = require('./util');
        ICollection         = require('./i-collection');
    } else {
        Util                = _global._L.Common.Util;
        ICollection         = _global._L.Interface.ICollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
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
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = IPropertyCollection;
    } else {
        _global._L.IPropertyCollection = IPropertyCollection;
        _global._L.Interface.IPropertyCollection = IPropertyCollection; // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));