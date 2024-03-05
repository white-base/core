/**
 * namespace _L.Meta.Entity.MetaColumn
 * namespace _L.Meta.Entity.BaseColumnCollection
 * namespace _L.Meta.Entity.MetaViewColumnCollection
 * namespace _L.Meta.Entity.MetaTableColumnCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Util;
    // var Observer;
    var MetaRegistry;
    var MetaElement;
    var BaseColumn;
    var PropertyCollection;
    var MetaColumn;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
    _global._L.Meta.Entity          = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
        // Observer                    = require('./observer').Observer;
        MetaElement                 = require('./meta-element').MetaElement;
        BaseColumn                  = require('./base-column').BaseColumn;
        PropertyCollection          = require('./collection-property').PropertyCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
        MetaColumn                = require('./meta-column').MetaColumn;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util;
        // Observer                    = _global._L.Observer;
        MetaElement                 = _global._L.MetaElement;
        BaseColumn                  = _global._L.BaseColumn;
        PropertyCollection          = _global._L.PropertyCollection;
        MetaRegistry                = _global._L.MetaRegistry;
        MetaColumn                = _global._L.MetaColumn;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    // if (typeof Observer === 'undefined') throw new Error(Message.get('ES011', ['Observer', 'observer']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaElement === 'undefined') throw new Error(Message.get('ES011', ['MetaElement', 'meta-element']));
    if (typeof BaseColumn === 'undefined') throw new Error(Message.get('ES011', ['BaseColumn', 'base-column']));
    if (typeof PropertyCollection === 'undefined') throw new Error(Message.get('ES011', ['PropertyCollection', 'collection-property']));
    if (typeof MetaColumn === 'undefined') throw new Error(Message.get('ES011', ['MetaColumn', 'meta-column']));

    //==============================================================
    // 4. module implementation
    //--------------------------------------------------------------
    // implementation   
    var BaseColumnCollection  = (function (_super) {
        /**
         * 컬럼 컬렉션 (최상위)
         * @abstract
         * @constructs _L.Meta.Entity.BaseColumnCollection
         * @extends _L.Collection.PropertyCollection
         * @param {object} p_owner 소유자 
         * @param {BaseColumn?} p_baseType 기본 컬럼 타입
         */
        function BaseColumnCollection(p_owner, p_baseType) {
            _super.call(this, p_owner);
            
            var _baseType;

            /**
             * 기본 컬럼 타입
             * @member {Function} _L.Meta.Entity.BaseColumnCollection#_baseType
             */
            Object.defineProperty(this, '_baseType', 
            {
                get: function() { return _baseType; },
                set: function(nVal) { 
                    if (!(typeof nVal === 'function')) throw new ExtendError(/EL05141/, null, [this.constructor.name, typeof nVal]);
                    // if (!(new nVal('temp') instanceof BaseColumn)) throw new ExtendError('ES032', ['_baseType', 'BaseColumn']);
                    if (!(Util.isProtoChain(nVal, BaseColumn))) throw new ExtendError(/EL05142/, null, [this.constructor.name]);
                    _baseType = nVal;
                },
                enumerable: false,
                configurable: false,
            });

            // this._baseType = p_baseType || MetaColumn;
            this._baseType = p_baseType;
        }
        Util.inherits(BaseColumnCollection, _super);
        
        BaseColumnCollection._NS = 'Meta.Entity';                   // namespace
        BaseColumnCollection._PARAMS = ['_owner', '_baseType'];     // creator parameter
        BaseColumnCollection._KIND = 'abstract';


        /**
         * 컬럼을 컬렉션에 추가
         * @param {string} p_name 컬럼명
         * @param {any} p_value 컬럼객체
         * @returns {number} 추가한 index 
         */
        BaseColumnCollection.prototype.add = function(p_name, p_value) {
            
            if (this._owner.rows.count > 0) throw new ExtendError(/EL05143/, null, [this._owner.rows.count]);
            if (this.existColumnName(p_name)) throw new ExtendError(/EL05144/, null, [this.constructor.name, p_name]);
            if (this.existAlias(p_name)) throw new ExtendError(/EL05145/, null, [this.constructor.name, p_name]); 
            
            return _super.prototype.add.call(this, p_name, p_value);
        };

        /**
         * 컬럼을 컬렉션에서 삭제
         * @param {number} p_idx 
         * @returns {boolean}
         */
        BaseColumnCollection.prototype.removeAt = function(p_idx) {
            if (this._owner.rows.count > 0) throw new ExtendError(/EL05146/, null, [this._owner.rows.count]);
            return _super.prototype.removeAt.call(this, p_idx); 
        };

        /**
         * 컬렉에 모든 value 값을 default 값으로 초기화
         */
        BaseColumnCollection.prototype.initValue  = function() {
            for (var i = 0; this.count > i; i++) {
                this[i].value = this[i].default;
            }
        };

        /**
         * 컬렉션에 별칭 이름(키)가 존재하는지 검사
         * @param {string} p_key 이름
         * @returns {boolean}
         */
        BaseColumnCollection.prototype.existAlias  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].alias === p_key) return true;
            }
            return false;
        };

        /**
         * 컬렉션에 컬럼 이름(키)이 존재하는지 검사
         * @param {string} p_key 이름
         * @returns {boolean}
         */
        BaseColumnCollection.prototype.existColumnName  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].columnName === p_key) return true;
            }
            return false;
        };

        /**
         * 별칭에 대한 컬럼 객체 얻기
         * @param {string} p_key 
         * @returns {BaseColumn?}
         */
        BaseColumnCollection.prototype.alias  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].alias === p_key) return this[i];
            }
        };

        /** @abstract */
        BaseColumnCollection.prototype.addValue = function() {
            throw new ExtendError(/EL05147/, null, []);
        };

        return BaseColumnCollection;
    
    }(PropertyCollection));

    //--------------------------------------------------------------
    // implementation
    var MetaTableColumnCollection  = (function (_super) {
        /**
         * 테이블 컬럼 컬렉션  
         * 참조 컬럼은 독립적으로 가진다 (참조 금지)
         * @constructs _L.Meta.Entity.MetaTableColumnCollection
         * @extends _L.Meta.Entity.BaseColumnCollection
         * @param {object} p_owner 소유자
         */
        function MetaTableColumnCollection(p_owner) {
            _super.call(this, p_owner, MetaColumn);
        }
        Util.inherits(MetaTableColumnCollection, _super);

        MetaTableColumnCollection._NS = 'Meta.Entity';          // namespace
        MetaTableColumnCollection._PARAMS = ['_owner'];         // creator parameter

        /**
         * 테이블 컬렉션에 컬럼 추가
         * @param {string | BaseColumn} p_any 컬럼명, 매타컬럼
         * @returns {number} 등록한 index
         */
        MetaTableColumnCollection.prototype.add  = function(p_any) {
            var column;
            var key;

            if (typeof p_any === 'string') {      
                key  = p_any;
                column = new this._baseType(key, this._owner);
            } else if (p_any instanceof this._baseType) {
                key  = p_any.columnName;
                column = p_any.clone(this._owner);
            } else {
                throw new ExtendError(/EL05151/, null, [typeof p_any]); 
            }

            return _super.prototype.add.call(this, key, column);
        };

        /**
         * 이름과 값으로 컬렉션에 추가 (내부에서 생성)
         * @param {string} p_name 컬럼명
         * @param {String | Number | Boolean} p_value 
         * @returns {BaseColumn} 추가한 컬럼 객체
         */
        MetaTableColumnCollection.prototype.addValue  = function(p_name, p_value) {
            var item;
            var property = {};
            var _valueTypes = this._baseType._VALUE_TYPE;

            if (typeof p_name !== 'string') throw new ExtendError(/EL05152/, null, [typeof p_name]);
            if (_valueTypes.length > 0) Util.matchType([_valueTypes], p_value);
            
            property = { value: p_value };
            item = new this._baseType(p_name, this._owner, property);

            return this[this.add(item)];
        };

        return MetaTableColumnCollection;
    
    }(BaseColumnCollection));


    //--------------------------------------------------------------
    // implementation
    var MetaViewColumnCollection  = (function (_super) {
        /**
         * 메타 뷰 컬럼 컬렉션
         * @constructs _L.Meta.Entity.MetaViewColumnCollection
         * @extends _L.Meta.Entity.BaseColumnCollection
         * @param {object} p_owner 소유자
         */
        function MetaViewColumnCollection(p_owner) {
            _super.call(this, p_owner, MetaColumn);

            /** 
             * 참조하는 엔티티 목록
             * @readonly
             * @member {array<BaseEntity>} _L.Meta.Entity.MetaViewColumnCollection#_refEntities
             */
            Object.defineProperty(this, '_refEntities', 
            {
                get: function() { 
                    var arr = [];
                    for (var i = 0; i < this.count; i++) {
                        var column = this[i];
                        if (this._owner !== column._entity && arr.indexOf(column._entity) < 0) {
                            arr.push(column._entity);
                        }
                    }
                    return arr; 
                },
                configurable: false,
                enumerable: false
            });
        }
        Util.inherits(MetaViewColumnCollection, _super);

        MetaViewColumnCollection._NS = 'Meta.Entity';                       // namespace
        MetaViewColumnCollection._PARAMS = ['_owner', '_baseCollection'];   // creator parameter

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
        MetaViewColumnCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            
            if (vOpt === 0) {   // 참조로 바꿈
                for (var i = 0; i < obj['_elem'].length; i++) {
                    var elem = obj['_elem'][i];
                    if (vOpt < 2 && vOpt > -1 && elem['_entity'] && elem['_entity']['$ref'] !== this._owner._guid) {
                        var rObj = MetaRegistry.createReferObject(elem); // 소유자가 아니면 참조 리턴
                        obj['_elem'][i] = rObj;
                    }
                }
            }
            return obj;                  
        };

        /**
         * 뷰컬렉션에 컬럼을 추가(등록/설정)한다.  
         * - entity가 있는 컬럼을 추가할 경우 : 참조가 추가되는 것이다.  
         *      + collection 존재할 경우 최상위 컬렉션에도 참조가 등록된다.  
         * - entity가 없는 컬럼을 추가할 경우 : 자신을 소유자로 등록한다.  
         * - collection에 컬럼이 존재할 경우 : columns 객체는 무시되고, 리턴한 객체의 참조를 등록한다.  
         * - collection에 컬럼이 없을 경우 : 컬렉션에 entity를 설정한다.(참조 재귀호출시 최상위만 등록됨)  
         *      + collection 존재할 경우 entity 항상 존재한다.  
         * - entity가 있는 컬럼을 추가할 경우 : 참조가 추가되는 것이다.
         * - entity가 없는 컬럼을 추가할 경우 : 자신을 소유자로 등록한다.
         * - collection에 컬럼이 존재할 경우 : columns 객체는 무시되고, 리턴한 객체의 참조를 등록한다.
         * - collection에 컬럼이 없을 경우 : 컬렉션에 entity를 설정한다.(참조 재귀호출시 최상위만 등록됨)
         * @param {string | MetaColumn} p_any 
         * @param {BaseColumnCollection?} p_refCollection
         */
        MetaViewColumnCollection.prototype.add  = function(p_any, p_refCollection) {
            var collection;
            var key;
            var column;

            if (p_refCollection && !(p_refCollection instanceof BaseColumnCollection)) {
                throw new ExtendError(/EL05161/, null, []);
            }

            if (p_any instanceof BaseColumn) {
                key = p_any.columnName;
                column = p_any;
            } else if (typeof p_any === 'string') {
                key = p_any;
                column = new this._baseType(key, this._owner);
            } else throw new ExtendError(/EL05162/, null, [typeof p_any]);

            // baseCollection & refCollection 존재하는 경우
            if (p_refCollection instanceof BaseColumnCollection) {                                  
                collection = p_refCollection;
            } else if (this._owner && this._owner._baseEntity && this._owner._baseEntity.columns) { 
                collection = this._owner._baseEntity.columns;
            }
            
            // 컬렉션이 있는 경우 : _entity 항상 존재
            if (collection) {
                if (collection.contains(collection[key])) {
                    column = collection[key];   // 기존에 존재하면 참조 가져옴
                } else {                                                
                    collection.add(p_any);      // 없으면 컬렉션에 추가(owner 설정됨)
                    column = collection[key];
                }
            }
            if (!column._entity) column._entity = this._owner;

            return _super.prototype.add.call(this, key, column);
        };

        /**
         *  이름과 값으로 컬럼 생성하여 컬렉션에 추가
         * @param {string} p_name 컬럼명
         * @param {any} p_value 
         * @param {BaseColumnCollection?} p_refCollection
         * @returns {MetaColumn}
         */
        MetaViewColumnCollection.prototype.addValue  = function(p_name, p_value, p_refCollection) {
            var item;
            var property = {};
            var _valueTypes = this._baseType._VALUE_TYPE;

            if (typeof p_name !== 'string') throw new ExtendError(/EL05163/, null, [typeof p_name]);
            if (_valueTypes.length > 0) Util.matchType([_valueTypes], p_value);
            
            property = { value: p_value };
            item = new this._baseType(p_name, null, property);

            return this[this.add(item, p_refCollection)];
        };

        /**
         * 엔티티 모든 컬럼을 추가
         * @param {BaseEntity} p_entity 
         */
        MetaViewColumnCollection.prototype.addEntity  = function(p_entity) {
            if (typeof p_entity !== 'undefined' && !(p_entity instanceof MetaElement && p_entity.instanceOf('BaseEntity'))) {
                throw new ExtendError(/EL05164/, null, []);
            }

            for (var i = 0; p_entity.columns.count > i; i++) {
                this.add(p_entity.columns[i]);
            }
        };
        
        return MetaViewColumnCollection;
    
    }(BaseColumnCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.BaseColumnCollection                        = BaseColumnCollection;
        exports.MetaViewColumnCollection                    = MetaViewColumnCollection;
        exports.MetaTableColumnCollection                   = MetaTableColumnCollection;

    } else {
        _global._L.BaseColumnCollection                    = BaseColumnCollection;
        _global._L.MetaViewColumnCollection                = MetaViewColumnCollection;
        _global._L.MetaTableColumnCollection               = MetaTableColumnCollection;
        // namespace
        _global._L.Meta.Entity.BaseColumnCollection        = BaseColumnCollection;
        _global._L.Meta.Entity.MetaViewColumnCollection    = MetaViewColumnCollection;
        _global._L.Meta.Entity.MetaTableColumnCollection   = MetaTableColumnCollection;
    }

}(typeof window !== 'undefined' ? window : global));