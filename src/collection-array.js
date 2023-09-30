/**
 * namespace _L.Collection.ArrayCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var BaseCollection;
    var IArrayCollection;
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
        IArrayCollection            = require('./i-collection-array').IArrayCollection;
        BaseCollection              = require('./base-collection').BaseCollection;
        MetaObject                  = require('./meta-object').MetaObject;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {    
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        IArrayCollection            = _global._L.IArrayCollection;
        BaseCollection              = _global._L.BaseCollection;
        MetaObject                  = _global._L.MetaObject;
        MetaRegistry                = _global._L.MetaRegistry;
    }
    
    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IArrayCollection === 'undefined') Message.error('ES011', ['IArrayCollection', 'i-collection-array']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof BaseCollection === 'undefined') Message.error('ES011', ['BaseCollection', 'base-collection']);
    
    //==============================================================
    // 4. module implementation
    var ArrayCollection  = (function (_super) {
        /**
         * 배열타입 컬렉션 클래스
         * @constructs _L.Collection.ArrayCollection
         * @implements {_L.Interface.IArrayCollection}
         * @extends _L.Collection.BaseCollection
         * @param {object} p_owner 소유 객체
         */
        function ArrayCollection(p_owner) {
            _super.call(this, p_owner);

            Util.implements(this, IArrayCollection);
        }
        Util.inherits(ArrayCollection, _super);

        ArrayCollection._NS = 'Collection';     // namespace
        ArrayCollection._PARAMS = ['_owner'];   // creator parameter

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }
        
        /**
         * 배열속성 컬렉션을 삭제한다.(내부처리) [구현]
         * @protected
         * @param {number} p_idx 인덱스 번호
         * @returns {boolean}
         */
        ArrayCollection.prototype._remove = function(p_idx) {
            var count = this.count - 1;   // [idx] 포인트 이동
            
            this.__GET$_elements(this).splice(p_idx, 1);
            this.__GET$_descriptors(this).splice(p_idx, 1);
            
            if (p_idx < count) {
                for (var i = p_idx; i < count; i++) {   // 참조 변경(이동)
                    var desc = this._descriptors[i] ? this._descriptors[i] : this._getPropDescriptor(i);
                    Object.defineProperty(this, [i], desc);
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
        ArrayCollection.prototype.getObject = function(p_vOpt, p_owned) {
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
            for (var i = 0; i < this._elements.length; i++) {
                var elem = this._elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj._elem.push(MetaRegistry.createReferObject(elem));
                    } else obj._elem.push(elem.getObject(vOpt, owned));
                } else obj._elem.push(elem);
            }
            return obj;                        
        };

        /**
         * guid 객체 설정
         * @virtual
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        ArrayCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (Array.isArray(p_oGuid._desc) && p_oGuid._desc.length > 0) {
                for (var i = 0; i < p_oGuid._desc.length; i++) {
                    this.__GET$_descriptors(this).push(p_oGuid._desc[i]);
                }
            }
            for(var i = 0; i < p_oGuid._elem.length; i++) {
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid._elem.length; i++) {
                var elem = p_oGuid._elem[i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.__GET$_elements(this).push(obj);
                    
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem.$ref, origin);
                    if (!meta) Message.error('ES015', ['_elem['+ i +']', '$ref']);
                    this.__GET$_elements(this).push(meta);  
                
                } else this.__GET$_elements(this).push(elem);
            }

        };        

        /**
         * 배열속성 컬렉션을 추가한다. [구현]
         * @param {any} p_value [필수] 요소값
         * @param {object} p_desc 프로퍼티 기술 객체
         * @returns {number} 추가한 인덱스
         */
        ArrayCollection.prototype.add = function(p_value, p_desc) {
            var pos = this.count;
            this.insertAt(pos, p_value, p_desc);
            return pos;
        };

        /**
         * 배열속성 컬렉션을 초기화 [구현]
         */
        ArrayCollection.prototype.clear = function() {
            // before evnet
            this._onChanging();
            // data process
            for (var i = 0; i < this.count; i++) delete this[i];
            this.__SET$_elements([], this);
            this.__SET$_descriptors([], this);
            // after event
            this._onClear();
            this._onChanged();
        };

        /**
         * 지정 위치에 요소 추가
         * @param {number} p_pos 
         * @param {any} p_value 
         * @param {object} p_desc 
         * @returns {boolean}
         */
        ArrayCollection.prototype.insertAt = function(p_pos, p_value, p_desc) {
            try {
                var index   = this.count;

                if (typeof p_pos !== 'number') Message.error('ES021', ['pos', 'number']);
                if (index < p_pos) Message.error('ES061', ['pos']);
                if (p_pos < 0) Message.error('ES062', ['pos', '0']);
                if (this._elemTypes.length > 0) Util.validType(p_value, this._elemTypes);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                    Message.warn('WS011', ['configurable = false', 'element']); 
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = false', 'element']);
                }

                // before event
                this._onChanging();
                this._onAdd(p_pos, p_value);
                // data process
                this.__GET$_elements(this).splice(p_pos, 0, p_value);            
                this.__GET$_descriptors(this).splice(p_pos, 0, p_desc);
                // property define
                if (_isObject(p_desc)) {
                    Object.defineProperty(this, [p_pos], p_desc);
                } else {
                    Object.defineProperty(this, [p_pos], this._getPropDescriptor(p_pos));
                }
                // reindexing
                for (var i = p_pos + 1; i < this.count; i++) {
                    var desc = this._descriptors[i] ? this._descriptors[i] : this._getPropDescriptor(i);
                    Object.defineProperty(this, [i], desc);
                }
                // after event
                this._onChanged();
                return true;

            } catch (error) {
                Message.error('ES019', ['insertAt()', error.message]);
            }
        };

        return ArrayCollection;

    }(BaseCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ArrayCollection = ArrayCollection;
    } else {    
        _global._L.ArrayCollection = ArrayCollection;
        _global._L.Collection.ArrayCollection = ArrayCollection;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));