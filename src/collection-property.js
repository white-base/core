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
        BaseCollection              = require('./base-collection').BaseCollection;
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
    if (typeof BaseCollection === 'undefined') Message.error('ES011', ['BaseCollection', 'base-collection']);
    
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
             * 키값
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
            this._KEYWORD = this._KEYWORD.concat(['keys', '_keys', 'indexOf', 'keyOf']);

            Util.implements(this, IPropertyCollection);
        }
        Util.inherits(PropertyCollection, _super);

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
         * 속성 컬렉션을 삭제한다. (내부처리) [구현]
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
         * guid 객체 얻기
         * @virtual
         * @param {number} p_vOpt 레벨 옵션
         * @param {object? | array<object>?} p_owned 소유한 객체
         * @returns {object}
         */
        PropertyCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (this._descriptors.length > 0) {
                obj._desc = [];
                for (var i = 0; i < this._descriptors.length; i++) {
                    obj._desc.push(this._descriptors[i]);
                }
            }
            obj._elem = [];
            for (var i = 0; i < this.count; i++) {
                var elem = this._elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj._elem.push(MetaRegistry.createReferObject(elem));
                    } else obj._elem.push(elem.getObject(vOpt, owned));
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
         * guid 객체 설정
         * @virtual
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (p_oGuid._elem.length !== p_oGuid._key.length) Message.error('ES063', ['_elem', '_key']);
            
            if (Array.isArray(p_oGuid._desc) && p_oGuid._desc.length > 0) {
                if (p_oGuid._elem.length !== p_oGuid._desc.length) Message.error('ES063', ['_elem', '_desc']);
                for (var i = 0; i < p_oGuid._desc.length; i++) {
                    this.__GET$_descriptors(this).push(p_oGuid._desc[i]);
                }
            }

            this._keys.length = 0;
            for(var i = 0; i < p_oGuid._key.length; i++) {
                var key = p_oGuid._key[i];
                this.__GET$_keys(this).push(key);
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
                Object.defineProperty(this, key, this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid._elem.length; i++) {
                var elem = p_oGuid._elem[i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.__GET$_elements(this).push(obj);
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) Message.error('ES015', ['_elem['+ i +']', '$ref']);
                    this.__GET$_elements(this).push(meta);
                    
                } else this.__GET$_elements(this).push(elem);
            }
        };

        /**
         * 요소 또는 키를 인덱스 조회  
         * - 키 의 인덱스는 ABC._keys.indexOf('aaa') 로 조회 할수 있다.
         * @override
         * @param {string | any} p_obj key 또는 대상 객체
         * @param {boolean?} p_isKey 옵션
         * @returns {number} 없을시 -1
         */
        PropertyCollection.prototype.indexOf = function(p_obj, p_isKey) {
            var isKey = p_isKey || false;
            
            if (!isKey) return this._elements.indexOf(p_obj);
            else {
                if (!_isString(p_obj))  Message.error('ES021', ['p_isKey = true', 'string']);
                return this._keys.indexOf(p_obj);
            }
        };

        /**
         * 속성컬렉션을 등록한다.[구현]
         * @param {string} p_name [필수] 요소명
         * @param {any?} p_value 요소값
         * @returns {boolean} 처리결과
         */
        PropertyCollection.prototype.add = function(p_name, p_value, p_desc) {
            try {
                var index   = this.count;
                var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;

                if (!_isString(p_name)) Message.error('ES021', ['name', 'string']);
                if(!regex.test(p_name)) Message.error('ES068', [p_name, 'Propery.name']);
                if (this._KEYWORD.indexOf(p_name) > -1) Message.error('ES048', [p_name, 'Symbol word']);
                if (this.exist(p_name)) Message.error('ES042', [p_name, 'property._keys']);
                if (this._elemTypes.length > 0) Util.validType(p_value, this._elemTypes);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                        Message.warn('WS011', ['configurable = true', 'element']);
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = true', 'element']);
                }

                // before event
                this._onChanging();
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
                // after event
                this._onChanged();
                return index;

            } catch (error) {
                Message.error('ES019', ['insertAt()', error.message]);
            }
        };

        /**
         * 초기화
         */
        PropertyCollection.prototype.clear = function() {
            // before event
            this._onChanging();
            this._onClear();
            // data process
            for (var i = 0; i < this.count; i++) {
                var propName = this.keyOf(i);
                delete this[i];
                delete this[propName];
            }
            this.__SET$_elements([], this);
            this.__SET$_descriptors([], this);
            this.__SET$_keys([], this);
            // after event
            this._onChanged();
        };
    
        /**
         * 인덱스에 대한 키값 조회 [구현]
         * @param {number} p_idx
         * @returns {string}
         */
        PropertyCollection.prototype.keyOf = function(p_idx) {
            if (typeof p_idx !== 'number') Message.error('ES021', ['idx', 'number']);
            return this._keys[p_idx];
        };

        /**
         * 키 유무
         * REVIEW: 프로퍼티 컬렉션으로 이동 검토
         * @param {number | string} p_key index, key
         * @returns {boolean}
         */
        PropertyCollection.prototype.exist = function(p_key) {
            if (!_isString(p_key)) Message.error('ES021', ['key', 'string']);
            return this.hasOwnProperty(p_key);
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