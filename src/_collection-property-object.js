/**
 * namespace _L.Collection.PropertyObjectCollection
 * TODO: 제거 대상
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Collection    = global._L.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    var Util;
    var PropertyCollection;

    if (isNode) {     
        Util                = require('./util');
        PropertyCollection  = require('./collection-property');
    } else {
        Util                = global._L.Common.Util;
        PropertyCollection  = global._L.Collection.PropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    
    //==============================================================
    // 4. 모듈 구현    
     //---------------------------------------
     var PropertyObjectCollection  = (function (_super) {
        /**
         * 객체 프로퍼티 컬렉션
         * @constructs _L.Collection.PropertyObjectCollection
         * @extends _L.Collection.ProperyCollection
         * @param {*} p_owner 소유자 
         */
        function PropertyObjectCollection(p_owner) {
            _super.call(this, p_owner);

            this.elementType = Object;
        }
        Util.inherits(PropertyObjectCollection, _super);

        /**
         * 객체속성 컬렉션을 추가한다. [오버라이딩]
         * @param {String} p_name 
         * @param {*} p_value 
         * @returns {Item} 등록한 아이템을 리턴한다.
         */
        PropertyObjectCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === 'undefined') throw new Error('p_name param request fail...');
            if (!(p_value && typeof p_value !== 'object')) throw new Error('p_name param request fail...');

            return _super.prototype.add.call(this, p_name, p_value);
        };
        
        return PropertyObjectCollection;
    
    }(PropertyCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = PropertyObjectCollection;
    } else {
        global._L.Collection.PropertyObjectCollection = PropertyObjectCollection;
    }

}(typeof window !== 'undefined' ? window : global));