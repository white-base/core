/**
 * namespace _L.Collection.PropertyFunctionCollection
 * TODO: 제거 대상
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. namespace declaration
    global._L               = global._L || {};
    global._L.Collection    = global._L.Collection || {};
    
    //==============================================================
    // 2. import module
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
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    
    //==============================================================
    // 4. module implementation   
     //---------------------------------------
     var PropertyFunctionCollection  = (function (_super) {
        /**
         * 함수 프로퍼티 컬렉션
         * @constructs _L.Collection.PropertyFunctionCollection
         * @param {*} p_owner 소유자 
         * @extends _L.Collection.ProperyCollection
         */
        function PropertyFunctionCollection(p_owner) {
            _super.call(this, p_owner);

            this.elementType = Function;
        }
        Util.inherits(PropertyFunctionCollection, _super);

        /**
         * 함수속성 컬렉션을 추가한다.
         * @param {String} p_name 
         * @param {*} p_value 
         * @returns {MetaColumn} 등록한 아이템을 리턴한다.
         */
        PropertyFunctionCollection.prototype.add  = function(p_name, p_value) {

            if (typeof p_name === 'undefined') throw new Error('p_name param request fail...');
            if (typeof p_value !== 'function') throw new Error('p_value param request fail...');

            return _super.prototype.add.call(this, p_name, p_value);
        };
        
        return PropertyFunctionCollection;
    
    }(PropertyCollection));
    

    //==============================================================
    // 5. module export
    if (isNode) {     
        module.exports = PropertyFunctionCollection;
    } else {
        global._L.Collection.PropertyFunctionCollection = PropertyFunctionCollection;
    }

}(typeof window !== 'undefined' ? window : global));