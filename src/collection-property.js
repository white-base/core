/**
 * namespace _L.Collection.PropertyCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var IPropertyCollection;
    var BaseCollection;
    var MetaObject;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Collection    = _global._L.Collection || {};
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                = require('./util');
        IPropertyCollection = require('./i-collection-property').IPropertyCollection;
        BaseCollection      = require('./collection-base').BaseCollection;
        MetaObject          = require('./meta-object').MetaObject;
    } else {
        Util                = _global._L.Util;
        IPropertyCollection = _global._L.IPropertyCollection;
        BaseCollection      = _global._L.BaseCollection;
        MetaObject          = _global._L.MetaObject;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IPropertyCollection === 'undefined') throw new Error('[IPropertyCollection] module load fail...');
    if (typeof BaseCollection === 'undefined') throw new Error('[BaseCollection] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    
    //==============================================================
    // 4. 모듈 구현    
    // KeyCollection
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

            var _keys = [];

            Object.defineProperty(this, '_keys',
            {
                configurable: false,
                enumerable: false,
                get: function() { return _keys; },
                set: function(newValue) { 
                    // TODO: string, len 체크
                    _keys = newValue; 
                },
            });
            /** @member {Array} _L.Collection.PropertyCollection#_keys 속성들값 */

            // Object.defineProperty(this, 'keys',
            // {
            //     configurable: false,
            //     enumerable: false,
            //     get: function() { return _keys; },
            // });

            // 예약어 등록
            this._symbol = this._symbol.concat(['keys', '_keys', 'indexOf', 'keyOf']);
            /** implements IPropertyCollection 인터페이스 구현 */
            Util.implements(this, IPropertyCollection);
        }
        Util.inherits(PropertyCollection, _super);

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        PropertyCollection.prototype.getObject  = function() {
            var obj = _super.prototype.getObject.call(this);

            obj._elem = [];
            obj.elementType = this.elementType;
            for (var i = 0; i < this._element.length; i++) {
                var elem = this._element[i];
                if (elem instanceof MetaObject) obj._elem.push(elem.getObject());
                else obj._elem.push(elem);
            }
            obj._key = [];
            for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i];
                obj._key.push(key);
            }
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        PropertyCollection.prototype.setObject  = function(mObj) {
            _super.prototype.setObject.call(this, mObj);

            this.clear();
            for(var i = 0; i < mObj._elem.length; i++) {
                var elem = mObj._elem[i];
                var key = mObj._key[i];
                if (elem['_guid'] && elem['_type']) {   // REVIEW: add() 통해서 생성되는 데이터 타입도 검사해야함
                    this.add(key);
                    this[key].setObject(elem);
                } else {
                    this.add(key, elem);
                } 
            }
            // TODO: add(desc) 이것도 별도로 저장해둬야 함
            // obj.metaName = mObj.name;
        };

        /**
         * 속성 컬렉션을 삭제한다. (내부처리) [구현]
         * @protected
         * @param {*} p_name 속성명
         * @returns {number} 삭제한 인덱스
         */
        PropertyCollection.prototype._remove = function(p_idx) {
            var count = this._element.length - 1;
            var propName = this.keyOf(p_idx);   // number 검사함
            
            // if (typeof p_idx !== 'number') throw new Error('Only [p_idx] type "number" can be added'); 

            // 프로퍼티 삭제
            delete this[propName];                      
            // 원시 자료 변경
            this._element.splice(p_idx, 1);
            this._keys.splice(p_idx, 1);
            // 참조 자료 변경
            if (p_idx < count) {
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));
                    propName = this.keyOf(i);
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
            // p_value = typeof p_value === 'undefined' ? null : p_value;
            var index   = this._element.length;;
            
            if (typeof p_name !== 'string') throw new Error('Only [p_name] type "string" can be added');
            if (this.elementType.length > 0) Util.validType(p_value, this.elementType);
            // 예약어 검사
            if (this._symbol.indexOf(p_name) > -1) {
                throw new Error(' [' + p_name + '] is a Symbol word');   
            }
            if (this.exist(p_name)) {
                console.warn('Warning:: 프로퍼티 이름 중복 !!');
                return false;
            }
            // before event
            this._onChanging();
            this._onAdd(index, p_value);
            // process
            this._element.push(p_value);
            this._keys.push(p_name);
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
               propName = this.keyOf(i);
               delete this[i];
               delete this[propName];
            }
            this._element = [];
            this._keys = [];
            // after event
            this._onChanged();
        };
        
    //     /**
    //      * 이름으로 index값 조회한다.
    //      * @param {String} p_name 
    //      * @returns {number}
    //     */
    //    PropertyCollection.prototype.indexOfProp = function(p_name) {
    //        var idx = -1;
           
    //        if (typeof p_name !== 'string')  throw new Error('Only [p_name] type "string" can be added');
    //        for (var i = 0; i < this._keys.length; i++) {
    //            if (this._keys[i] === p_name) return i;
    //         }
    //         return idx;
    //     };
    
        /**
         * 
         * @param {string | any} p_obj key 또는 대상 객체
         * @param {number} p_opt 옵션 :  0 = 요소로 조회, 1 = idx로 조회  REVIEW: 타입은 소문자로 바꿔야 함
         * @returns 
         */
        PropertyCollection.prototype.indexOf = function(p_obj, p_opt) {
            var opt = p_opt || 0;
            
            if (opt === 0) {
                return this._element.indexOf(p_obj);
            }
            if (opt === 1) {    
                if (typeof p_obj !== 'string')  throw new Error('Only [p_obj] type "string" can be added'); 
                // return this._element.indexOf(this[p_obj]);
                for (var i = 0; i < this._keys.length; i++) {
                    if (this._keys[i] === p_obj) return i;
                 }
            }            
            return -1;
        };
        
        /**
         * 배열속성 이름 찾는다. [구현]
         * @param {number} p_obj 대상객체 또는 idx
         * @returns {string}
         */
        PropertyCollection.prototype.keyOf = function(p_idx) {
            if (typeof p_idx !== 'number')  throw new Error('Only [p_idx] type "number" can be added'); 
            return this._keys[p_idx];
        };

        // /**
        //  * 요소 삭제
        //  * @param {string} p_name 삭제핳 요소명
        //  */
        // PropertyCollection.prototype.removeByProp = function(p_name) {
        //     var idx = this.indexOfProp(p_name);

        //     if (typeof idx === 'number') return this.removeAt(idx);
        //     return false;   
        // };
        // overriding
        // overload
        return PropertyCollection;

    }(BaseCollection));
    

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.PropertyCollection = PropertyCollection;
    } else {
        _global._L.PropertyCollection = PropertyCollection;
        _global._L.Collection.PropertyCollection = PropertyCollection;      // namespace
    }

}(typeof window !== 'undefined' ? window : global));