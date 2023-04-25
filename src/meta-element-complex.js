/**
 * namespace _L.Meta.ComplexElement
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L                   = global._L || {};
    global._L.Meta              = global._L.Meta || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var MetaElement;
    var IPropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                    = require('./util');
        MetaElement             = require('./meta-element');
        IPropertyCollection     = require('./i-collection-property');

    } else {
        Util                    = global._L.Common.Util;
        MetaElement             = global._L.Meta.MetaElement;
        IPropertyCollection     = global._L.Interface.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof IPropertyCollection === 'undefined') throw new Error('[IPropertyCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ComplexElement  = (function (_super) {
        /**
         * 복합요소
         * @constructs _L.Meta.ComplexElement
         * @abstract
         * @extends _L.Meta.MetaElement
         * @implements {_L.Interface.IPropertyCollection}
         */
        function ComplexElement() {
            _super.call(this);

            var __element = [];
            var __properties = [];

            /**
             * 요소 갯수
             * @member _L.Meta.ComplexElement#count
             */
            Object.defineProperty(this, 'count', 
            {
                get: function() { return __element.length; },
                configurable: true,
                enumerable: true
            });

            /**
             * 요소 목록
             * @member _L.Meta.ComplexElement#list
             */
            Object.defineProperty(this, 'list', 
            {
                get: function() { return __element; },
                configurable: true,
                enumerable: true
            });

            /**
             * 요소 목록
             * @member _L.Meta.ComplexElement#list
             */
            Object.defineProperty(this, '_properties', 
            {
                configurable: true,
                enumerable: false,
                get: function() { return __properties; },
                set: function(newValue) { __properties = newValue; }
            });
            
            /** @implements {_L.Interface.IPropertyCollection} */
            Util.implements(this, IPropertyCollection);

        }
        Util.inherits(ComplexElement, _super);

        // TODO::
        ComplexElement.prototype.add = function() {};
        ComplexElement.prototype.remove = function() {};
        ComplexElement.prototype.removeAt = function() {};
        ComplexElement.prototype.clear = function() {};
        ComplexElement.prototype.indexOf = function() {};
        ComplexElement.prototype.exist = function() {};
        ComplexElement.prototype.contains = function() {};
        ComplexElement.prototype.propertyOf = function() {};
        ComplexElement.prototype.removeByProp = function() {};
        ComplexElement.prototype.indexOfProp  = function() {};

        return ComplexElement;
    
    }(MetaElement));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ComplexElement;
    } else {
        global._L.ComplexElement = ComplexElement;
        // namespace
        global._L.Meta.ComplexElement = ComplexElement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));