/**
 * namespace _L.Collection.PropertyCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var IPropertyCollection;
    var BaseCollection;
    var MetaObject;
    var MetaRegistry;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        IPropertyCollection         = require('./i-collection-property').IPropertyCollection;
        BaseCollection              = require('./collection-base').BaseCollection;
        MetaObject                  = require('./meta-object').MetaObject;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        IPropertyCollection         = _global._L.IPropertyCollection;
        BaseCollection              = _global._L.BaseCollection;
        MetaObject                  = _global._L.MetaObject;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IPropertyCollection === 'undefined') Message.error('ES011', ['IPropertyCollection', 'i-collection-property']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof BaseCollection === 'undefined') Message.error('ES011', ['BaseCollection', 'collection-base']);
    
    //==============================================================
    // 4. module implementation   
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

            /** 
             * 속성들값
             * @member {Array} _L.Collection.PropertyCollection#_keys 
             */
            Object.defineProperty(this, '_keys',
            {
                get: function() { return _keys; },
                configurable: false,
                enumerable: false
            });

            // inner variable access
            this.__SET$_keys = function(val, call) {
                if (call instanceof PropertyCollection) _keys = val;    // 상속접근 허용
            }

            // 예약어 등록 
            this._KEYWORD = this._KEYWORD.concat(['keys', '_keys', 'indexOf', 'keyOf']);
            Util.implements(this, IPropertyCollection);
        }
        Util.inherits(PropertyCollection, _super);

        PropertyCollection._NS = 'Collection';      // namespace
        PropertyCollection._PARAMS = ['_owner'];    // creator parameter

        /**
         * 속성 컬렉션을 삭제한다. (내부처리) [구현]
         * @protected
         * @param {*} p_name 속성명
         * @returns {number} 삭제한 인덱스
         */
        PropertyCollection.prototype._remove = function(p_idx) {
            var count = this._elements.length - 1;
            var propName = this.keyOf(p_idx);   // number 검사함
            
            // if (typeof p_idx !== 'number') throw new Error('Only [p_idx] type "number" can be added'); 

            // 프로퍼티 삭제
            delete this[propName];                      
            // 원시 자료 변경
            this._elements.splice(p_idx, 1);
            this._keys.splice(p_idx, 1);
            this._descriptors.splice(p_idx, 1);
            // 참조 자료 변경
            if (p_idx < count) {
                for (var i = p_idx; i < count; i++) {
                    var desc = this._descriptors[i] ? this._descriptors[i] : this._getPropDescriptor(i);
                    propName = this.keyOf(i);
                    Object.defineProperty(this, [i], desc);
                    Object.defineProperty(this, propName, desc);
                    // Object.defineProperty(this, [i], this._getPropDescriptor(i));
                    // propName = this.keyOf(i);
                    // Object.defineProperty(this, propName, this._getPropDescriptor(i));
                }
                delete this[count];                     // 마지막 idx 삭제
            } else {
                delete this[p_idx];                     // idx 삭제 (끝일 경우)
            }
            return true;
        };

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // PropertyCollection.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;
            
        //     if (!this._compare(this._keys, p_target._keys)) return false;
        //     return true;
        // };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        // PropertyCollection.prototype.getObject = function(p_vOpt, p_origin) {
        //     var obj = _super.prototype.getObject.call(this, p_vOpt, p_origin);
        //     var vOpt = p_vOpt || 0;
        //     var origin = [];
        //     // var origin = p_origin ? p_origin : obj;

        //     if (Array.isArray(p_origin)) origin = p_origin;
        //     else if (p_origin) origin.push(p_origin);
        //     origin.push(obj);
            
        //     if (this._descriptors.length > 0) {
        //         obj._desc = [];
        //         for (var i = 0; i < this._descriptors.length; i++) {
        //             obj._desc.push(this._descriptors[i]);
        //         }
        //     }
        //     obj._elem = [];
        //     for (var i = 0; i < this._elements.length; i++) {
        //         var elem = this._elements[i];
        //         // POINT:
        //         // if (elem instanceof MetaObject) obj._elem.push(elem.getObject(vOpt, origin));
        //         // else obj._elem.push(elem)
        //         if (elem instanceof MetaObject) {
        //             if (MetaRegistry.hasGuidObject(elem, origin)) {
        //                 obj._elem.push(MetaRegistry.createReferObject(elem));
        //             } else obj._elem.push(elem.getObject(vOpt, origin));
        //         } else obj._elem.push(elem);
        //     }

        //     obj._key = [];
        //     for (var i = 0; i < this._keys.length; i++) {
        //         var key = this._keys[i];
        //         obj._key.push(key);
        //     }
        //     return obj;                        
        // };
        // POINT: 2
        PropertyCollection.prototype.getObject = function(p_vOpt, p_origin) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_origin);
            var vOpt = p_vOpt || 0;
            var origin = [];

            if (Array.isArray(p_origin)) origin = p_origin;
            else if (p_origin) origin.push(p_origin);
            origin.push(obj);

            if (this._descriptors.length > 0) {
                obj._desc = [];
                for (var i = 0; i < this._descriptors.length; i++) {
                    obj._desc.push(this._descriptors[i]);
                }
            }
            obj._elem = [];
            for (var i = 0; i < this._elements.length; i++) {
                var elem = this._elements[i];
                // POINT:
                // if (elem instanceof MetaObject) obj._elem.push(elem.getObject(vOpt, origin));
                // else obj._elem.push(elem)
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, origin)) {
                        obj._elem.push(MetaRegistry.createReferObject(elem));
                    } else obj._elem.push(elem.getObject(vOpt, origin));
                } else obj._elem.push(elem);
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
        PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (p_oGuid._elem.length !== p_oGuid._key.length) Message.error('ES063', ['_elem', '_key']);
            
            if (Array.isArray(p_oGuid._desc) && p_oGuid._desc.length > 0) {
                if (p_oGuid._elem.length !== p_oGuid._desc.length) Message.error('ES063', ['_elem', '_desc']);
                for (var i = 0; i < p_oGuid._desc.length; i++) {
                    this._descriptors.push(p_oGuid._desc[i]);
                }
            }

            this._keys.length = 0;
            for(var i = 0; i < p_oGuid._key.length; i++) {
                var key = p_oGuid._key[i];
                this._keys.push(key);
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
                Object.defineProperty(this, key, this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid._elem.length; i++) {
                var elem = p_oGuid._elem[i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this._elements.push(obj);
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(origin, elem.$ref);
                    if (!meta) Message.error('ES015', ['_elem['+ i +']', '$ref']);
                    this._elements.push(meta);
                    
                } else this._elements.push(elem);
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
            var index   = this._elements.length;;
            var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;
            
            

            if (typeof p_name !== 'string') Message.error('ES021', ['name', 'string']);
            if(!regex.test(p_name)) Message.error('ES068', [p_name, 'Propery.name']);
            if (this._elemTypes.length > 0) Util.validType(p_value, this._elemTypes);
            // 예약어 검사
            if (this._KEYWORD.indexOf(p_name) > -1) {
                Message.error('ES048', [p_name, 'Symbol word']);
            }
            if (this.exist(p_name)) {
                Message.error('ES042', [p_name, 'property._keys']);
                // console.warn('Warning:: 프로퍼티 이름 중복 !!');
                // return false;
            }
            if (typeof p_desc === 'object' ) {
                if (p_desc.configurable === false ) {
                    Message.warn('WS011', ['configurable = true', 'element']);
                }
                if (p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = true', 'element']);
                }
                // console.warn('[configurable = false] 대상 [컬렉션 요소]는 삭제 할 수 없습니다.');
            }
            // before event
            this._onChanging();
            this._onAdd(index, p_value);
            // data process
            this._elements.push(p_value);
            this._keys.push(p_name);
            this._descriptors.push(p_desc);
            // property define
            if (typeof p_desc === 'object') {
                Object.defineProperty(this, [index], p_desc);
                Object.defineProperty(this, p_name, p_desc);
            } else {
                Object.defineProperty(this, [index], this._getPropDescriptor(index));
                Object.defineProperty(this, p_name, this._getPropDescriptor(index));
            }
            // after event
            this._onChanged();
            return index;
        };

        /**
         * 초기화
         */
        PropertyCollection.prototype.clear = function() {
           var propName
           
           // before event
           this._onChanging();
           this._onClear();
            // process
           for (var i = 0; i < this._elements.length; i++) {
               propName = this.keyOf(i);
               delete this[i];
               delete this[propName];
            }
            this.__SET$_elements([], this);
            this.__SET$_descriptors([], this);
            this.__SET$_keys([], this);
            // this._elements = [];
            // this._keys = [];
            // after event
            this._onChanged();
        };
    
        /**
         * 
         * @param {string | any} p_obj key 또는 대상 객체
         * @param {number} p_opt 옵션 :  0 = 요소로 조회, 1 = idx로 조회
         * @returns 
         */
        PropertyCollection.prototype.indexOf = function(p_obj, p_opt) {
            var opt = p_opt || 0;
            
            if (opt === 0) {
                return this._elements.indexOf(p_obj);
            }
            if (opt === 1) {    
                if (typeof p_obj !== 'string')  Message.error('ES021', ['opt=1', 'string']);
                // return this._elements.indexOf(this[p_obj]);
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
            if (typeof p_idx !== 'number') Message.error('ES021', ['idx', 'number']);
            return this._keys[p_idx];
        };

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