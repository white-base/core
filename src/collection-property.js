/**
 * namespace _L.Collection.PropertyCollection
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Collection    = global._L.Collection || {};
    
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var BaseCollection;
    var IPropertyCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        BaseCollection      = require('./collection-base');
        IPropertyCollection = require('./i-collection-property');
    } else {    // COVER:
        Util                = global._L.Common.Util;
        BaseCollection      = global._L.Collection.BaseCollection;
        IPropertyCollection = global._L.Interface.IPropertyCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof BaseCollection === 'undefined') throw new Error('[BaseCollection] module load fail...');
    if (typeof IPropertyCollection === 'undefined') throw new Error('[IPropertyCollection] module load fail...');
    
    //==============================================================
    // 4. 모듈 구현    
    var PropertyCollection  = (function (_super) {
        /**
         * 속성타입 컬렉션 클래스
         * @constructs _L.Collection.PropertyCollection
         * @implements {_L.Interface.IPropertyCollection}
         * @extends _L.Collection.BaseCollection
         * @param {Object} p_owner 소유자
         */
        function PropertyCollection(p_owner) {
            _super.call(this, p_owner); 

            var __properties = [];

            /** @member {Array} _L.Collection.PropertyCollection#properties 속성들값 */
            Object.defineProperty(this, 'properties', 
            {
                configurable: true,
                enumerable: false,
                get: function() { return __properties; },
                set: function(newValue) { __properties = newValue; }
            });
            // 예약어 등록
            this._symbol = this._symbol.concat(['properties', 'indexOfName', 'propertyOf', 'removeByname']);
            /** implements IPropertyCollection 인터페이스 구현 */
            Util.implements(this, IPropertyCollection);
        }
        Util.inherits(PropertyCollection, _super);

        /**
         * 속성 컬렉션을 삭제한다. (내부처리) [구현]
         * @protected
         * @param {*} p_name 속성명
         * @returns {number} 삭제한 인덱스
         */
        PropertyCollection.prototype._remove = function(p_idx) {
            var count = this._element.length - 1;
            var propName = this.propertyOf(p_idx);
            
            if (typeof p_idx !== 'number') throw new Error('Only [p_idx] type "number" can be added');

            // 프로퍼티 삭제
            delete this[propName];                      
            // 원시 자료 변경
            this._element.splice(p_idx, 1);
            this.properties.splice(p_idx, 1);
            // 참조 자료 변경
            if (p_idx < count) {
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));
                    propName = this.propertyOf(i);
                    Object.defineProperty(this, propName, this._getPropDescriptor(i));
                }
                delete this[count];                     // 마지막 idx 삭제
            } else {
                delete this[p_idx];                     // idx 삭제 (끝일 경우)
            }
        };

        /**
         * 속성컬렉션을 등록한다.[구현]
         * @param {string} p_name [필수] 속성명
         * @param {?any} p_value 속성값
         * @returns {boolean} 처리결과
         */
        PropertyCollection.prototype.add = function(p_name, p_value, p_desc) {
            p_value = typeof p_value === 'undefined' ? null : p_value;
            
            var index   = this._element.length;;
            
            if (typeof p_name !== 'string') throw new Error('Only [p_name] type "string" can be added');
            if (this.elementType.length > 0) Util.validType(p_value, this.elementType);
            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(' [' + p_name + '] is a Symbol word');   
            }
            if (this.indexOfName(p_name) > -1) {
                console.warn('Warning:: 프로퍼티 이름 중복 !!');
                return false;
            }
            // before event
            this._onChanging();
            this._onAdd(index, p_value);
            // process
            this._element.push(p_value);
            this.properties.push(p_name);
            if (typeof p_desc === 'object') {
                Object.defineProperty(this, [index], p_desc);
                Object.defineProperty(this, p_name, p_desc);
            } else {
                Object.defineProperty(this, [index], this._getPropDescriptor(index));
                Object.defineProperty(this, p_name, this._getPropDescriptor(index));
            }
            // after event
            this._onChanged();
            return true;
        };

        
        /**
         * 속성컬렉션을 전체 삭제한다. [구현]
        */
       PropertyCollection.prototype.clear = function() {
           var propName
           
           // before event
           this._onChanging();
           this._onClear();
            // process
           for (var i = 0; i < this._element.length; i++) {
               propName = this.propertyOf(i);
               delete this[i];
               delete this[propName];
            }
            this._element = [];
            this.properties = [];
            // after event
            this._onChanged();
        };
        
        /**
         * 이름으로 index값 조회한다.
         * @param {String} p_name 
         * @returns {number}
        */
       PropertyCollection.prototype.indexOfName = function(p_name) {
           var idx = -1;
           
           if (typeof p_name !== 'string')  throw new Error('Only [p_name] type "string" can be added');
           for (var i = 0; i < this.properties.length; i++) {
               if (this.properties[i] === p_name) return i;
            }
            return idx;
        };
        
        /**
         * 요소 삭제
         * @param {string} p_name 삭제핳 요소명
         */
        PropertyCollection.prototype.removeByName = function(p_name) {
            var idx = this.indexOfName(p_name);

            if (typeof idx === 'number') return this.removeAt(idx);
            return false;   // COVER:
        };
        
        /**
         * 배열속성 이름 찾는다. [구현]
         * @param {Number} p_idx 인덱스
         * @returns {String}
         */
        PropertyCollection.prototype.propertyOf = function(p_idx) {
            return this.properties[p_idx];
        };

        return PropertyCollection;

    }(BaseCollection));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = PropertyCollection;
    } else {    // COVER:
        global._L.PropertyCollection = PropertyCollection;
        // namespace
        global._L.Collection.PropertyCollection = PropertyCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));