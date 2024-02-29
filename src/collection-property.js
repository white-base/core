/**
 * namespace _L.Collection.PropertyCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
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
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
        IPropertyCollection         = require('./i-collection-property').IPropertyCollection;
        BaseCollection              = require('./base-collection').BaseCollection;
        MetaObject                  = require('./meta-object').MetaObject;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util;
        IPropertyCollection         = _global._L.IPropertyCollection;
        BaseCollection              = _global._L.BaseCollection;
        MetaObject                  = _global._L.MetaObject;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IPropertyCollection === 'undefined') throw new Error(Message.get('ES011', ['IPropertyCollection', 'i-collection-property']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
    if (typeof BaseCollection === 'undefined') throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));
    
    //==============================================================
    // 4. module implementation   
    var PropertyCollection  = (function (_super) {
        /**
         * 속성타입 컬렉션 클래스
         * @constructs _L.Collection.PropertyCollection
         * @implements {_L.Interface.IPropertyCollection}
         * @extends _L.Collection.BaseCollection
         * @param {object} p_owner 소유 객체
         */
        function PropertyCollection(p_owner) {
            _super.call(this, p_owner); 

            var _keys = [];

            /** 
             * 컬렉션에 있는 요소의 키값을 목록으로 가져옵니다. (참조값)
             * @readonly
             * @member {Array} _L.Collection.PropertyCollection#_keys 
             */
            Object.defineProperty(this, '_keys',
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _keys.length; i++) arr.push(_keys[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false
            });

            // inner variable access
            this.__GET$_keys = function(call) {
                if (call instanceof PropertyCollection) return _keys;
            }
            this.__SET$_keys = function(val, call) {
                if (call instanceof PropertyCollection) _keys = val;
            }


            // 예약어 등록 
            this.__KEYWORD = this.__KEYWORD.concat(['_keys', 'indexOf', 'exist', 'keyOf']);

            Util.implements(PropertyCollection, this);
        }
        Util.inherits(PropertyCollection, _super);
        
        PropertyCollection._UNION = [IPropertyCollection];
        PropertyCollection._NS = 'Collection';      // namespace
        PropertyCollection._PARAMS = ['_owner'];    // creator parameter

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }

        /**
         * 컬렉션에서 지정된 요소를 제거합니다. (내부)
         * @protected
         * @param {number} p_idx 속성명
         * @returns {boolean} 
         */
        PropertyCollection.prototype._remove = function(p_idx) {
            var count = this.count - 1;
            var propName = this.keyOf(p_idx);   // number 검사함
            
            delete this[propName];      // 프로퍼티 삭제

            this.__GET$_elements(this).splice(p_idx, 1);
            this.__GET$_keys(this).splice(p_idx, 1);
            this.__GET$_descriptors(this).splice(p_idx, 1);
            
            if (p_idx < count) {        // 참조 자료 변경
                for (var i = p_idx; i < count; i++) {
                    var desc = this._descriptors[i] ? this._descriptors[i] : this._getPropDescriptor(i);
                    propName = this.keyOf(i);
                    Object.defineProperty(this, [i], desc);
                    Object.defineProperty(this, propName, desc);
                }
                delete this[count];     // 마지막 idx 삭제
            } else {
                delete this[p_idx];     // idx 삭제 (끝일 경우)
            }
            return true;
        };

        /**
         * 현재 객체의 guid 타입의 객체를 가져옵니다.  
         * - 순환참조는 $ref 값으로 대체된다.
         * @param {number} p_vOpt 가져오기 옵션
         * - opt = 0 : 참조 구조의 객체 (_guid: Yes, $ref: Yes)  
         * - opt = 1 : 소유 구조의 객체 (_guid: Yes, $ref: Yes)  
         * - opt = 2 : 소유 구조의 객체 (_guid: No,  $ref: No)   
         * 객체 비교 : equal(a, b)  
         * a.getObject(2) == b.getObject(2)   
         * @param {(object | array<object>)?} p_owned 현재 객체를 소유하는 상위 객체들
         * @returns {object}  
         */
        PropertyCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (this._descriptors.length > 0) {
                obj['_desc'] = [];
                for (var i = 0; i < this._descriptors.length; i++) {
                    obj['_desc'].push(this._descriptors[i]);
                }
            }
            obj['_elem'] = [];
            for (var i = 0; i < this.count; i++) {
                var elem = this._elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj['_elem'].push(MetaRegistry.createReferObject(elem));
                    } else obj['_elem'].push(elem.getObject(vOpt, owned));
                } else obj['_elem'].push(elem);
            }
            obj['_key'] = [];
            for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i];
                obj['_key'].push(key);
            }
            return obj;                        
        };

        /**
         * 현재 객체를 초기화 후, 지정한 guid 타입의 객체를 사용하여 설정합니다.   
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object?} p_origin 현재 객체를 설정하는 원본 guid 객체  
         * 기본값은 p_oGuid 객체와 동일
         */
        PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (p_oGuid['_elem'].length !== p_oGuid['_key'].length) throw new ExtendError(/ES063/, null, ['_elem', '_key']);
            
            if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
                if (p_oGuid['_elem'].length !== p_oGuid['_desc'].length) throw new ExtendError(/ES063/, null, ['_elem', '_desc']);
                for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                    this.__GET$_descriptors(this).push(p_oGuid['_desc'][i]);
                }
            }

            this.__SET$_keys([], this);
            for(var i = 0; i < p_oGuid['_key'].length; i++) {
                var key = p_oGuid['_key'][i];
                this.__GET$_keys(this).push(key);
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
                Object.defineProperty(this, key, this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                var elem = p_oGuid['_elem'][i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.__GET$_elements(this).push(obj);
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) throw new ExtendError(/ES015/, null, ['_elem['+ i +']', '$ref']);
                    this.__GET$_elements(this).push(meta);
                    
                } else this.__GET$_elements(this).push(elem);
            }
        };

        /**
         * 지정(키, 요소)된 요소의 인덱스를 가져옵니다.  
         * @param {string | any} p_obj 키 또는 지정할 객체
         * @param {boolean?} p_isKey 키로 조회 여부
         * @returns {number} 없을시 -1
         */
        PropertyCollection.prototype.indexOf = function(p_obj, p_isKey) {
            var isKey = p_isKey || false;
            
            if (!isKey) return this._elements.indexOf(p_obj);
            else {
                if (!_isString(p_obj))  throw new ExtendError(/ES021/, null, ['p_isKey = true', 'string']);
                return this._keys.indexOf(p_obj);
            }
        };

        /**
         * 컬렉션에 지정된 이름으로 요소를 추가합니다.
         * @param {string} p_name [필수] 요소명
         * @param {any?} p_value 요소
         * @param {object?} p_desc 기술자
         * @returns {boolean} 결과
         */
        PropertyCollection.prototype.add = function(p_name, p_value, p_desc) {
            try {
                var index   = this.count;
                var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;
                // var types = ['_req_'];

                // types = [types.concat(this._elemTypes)];
                
                if (!_isString(p_name)) throw new ExtendError(/ES021/, null, ['name', 'string']);
                if(!regex.test(p_name)) throw new ExtendError(/ES068/, null, [p_name, 'Propery.name']);
                if (this.__KEYWORD.indexOf(p_name) > -1) throw new ExtendError(/ES048/, null, [p_name, 'Symbol word']);
                if (this.exist(p_name)) throw new ExtendError(/ES042/, null, [p_name, 'property._keys']);
                if (this._elemTypes.length > 0) Util.matchType([this._elemTypes], p_value);
                // if (this._elemTypes.length > 0) Util.matchType(types, p_value);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                        Message.warn('WS011', ['configurable = true', 'element']);
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = true', 'element']);
                }

                this._onAdd(index, p_value);
                // data process
                this.__GET$_elements(this).push(p_value);
                this.__GET$_keys(this).push(p_name);
                this.__GET$_descriptors(this).push(p_desc);
                // property define
                if (_isObject(p_desc)) {
                    Object.defineProperty(this, [index], p_desc);
                    Object.defineProperty(this, p_name, p_desc);
                } else {
                    Object.defineProperty(this, [index], this._getPropDescriptor(index));
                    Object.defineProperty(this, p_name, this._getPropDescriptor(index));
                }
                this._onAdded(index, p_value);

                return index;

            } catch (error) {
                throw new ExtendError(/ES019/, null, ['insertAt()', error.message]);
            }
        };

        /**
         * 컬렉션을 초기화 합니다.  (_element, _descriptors, _keys)  
         * 이벤트는 초기화 되지 않습니다.
         */
        PropertyCollection.prototype.clear = function() {
            this._onClear();
            
            for (var i = 0; i < this.count; i++) {
                var propName = this.keyOf(i);
                delete this[i];
                delete this[propName];
            }
            this.__SET$_elements([], this);
            this.__SET$_descriptors([], this);
            this.__SET$_keys([], this);
            
            this._onCleared();
        };
    
        /**
         * 지정된 키로 요소의 인덱스를 가져옵니다.
         * @param {number} p_idx
         * @returns {string}
         */
        PropertyCollection.prototype.keyOf = function(p_idx) {
            if (typeof p_idx !== 'number') throw new ExtendError(/ES021/, null, ['idx', 'number']);
            return this._keys[p_idx];
        };

        /**
         * 컬렉션에 이름이 지정된 열이 있는지 여부를 확인합니다.
         * @param {string} p_key 요소키, 컬렉션키
         * @returns {boolean}
         */
        PropertyCollection.prototype.exist = function(p_key) {
            if (!_isString(p_key)) throw new ExtendError(/ES021/, null, ['key', 'string']);
            return Object.prototype.hasOwnProperty.call(this, p_key);
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