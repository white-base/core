/**
 * namespace _L.Interface.IPropertyCollection
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Interface     = global._L.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var ICollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        ICollection         = require('./i-collection');
    } else {
        Util                = global._L.Common.Util;
        ICollection         = global._L.Interface.ICollection;
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
        IPropertyCollection.prototype.propertyOf  = function() {
            throw new Error('[ propertyOf() ] Abstract method definition, fail...');
        };

        /**
         * 키(이름)로 삭제
         */
        IPropertyCollection.prototype.removeByProp  = function() {
            throw new Error('[ propertyOf() ] Abstract method definition, fail...');
        };

        /**
         * 키(이름)로 인덱스 조회
         */
        IPropertyCollection.prototype.indexOfProp  = function() {
            throw new Error('[ propertyOf() ] Abstract method definition, fail...');
        };
    
        return IPropertyCollection;
        
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IPropertyCollection;
    } else {
        global._L.IPropertyCollection = IPropertyCollection;
        // namespace
        global._L.Interface.IPropertyCollection = IPropertyCollection;
    }
    
}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));