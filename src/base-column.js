/**
 * namespace _L.Meta.Entity.BaseColumn
 * namespace _L.Meta.Entity.BaseColumnCollection
 * namespace _L.Meta.Entity.MetaViewColumnCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var Observer;
    var CustomError;
    var MetaElement;
    // var PropertyCollection;
    var MetaRegistry;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
    _global._L.Meta.Entity          = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        Observer                    = require('./observer').Observer;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
        MetaElement                 = require('./meta-element').MetaElement;
        // PropertyCollection          = require('./collection-property').PropertyCollection;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        CustomError                 = _global._L.CustomError;
        MetaRegistry                = _global._L.MetaRegistry;
        MetaElement                 = _global._L.MetaElement;
        // PropertyCollection          = _global._L.PropertyCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaElement === 'undefined') Message.error('ES011', ['MetaElement', 'meta-element']);

    //==============================================================
    // 4. module implementation
    //--------------------------------------------------------------
    // implementation   
    var BaseColumn  = (function (_super) {
        /**
         * 아이템
         * @constructs _L.Meta.Entity.BaseColumn
         * @extends _L.Meta.MetaElement
         * @param {String} p_name 아이템명
         * @param {BaseEntity?} p_entity 소유 BaseEntity
         * @param {Object} p_property 속성 객체
         */
        function BaseColumn(p_name, p_entity) {
        // function BaseColumn(p_name, p_entity, p_valueTypes) {
            _super.call(this, p_name);

            // var property      = p_property || {};
            var __value         = null;
            // var columnName;
            var __key           = p_name;
            var _entity;
            // var _valueTypes     = Array.isArray(p_valueTypes) ? p_valueTypes : [];
            var _valueTypes     = this._type._TYPES || [];
            var defaultValue    = null;
            var caption         = null;
            var alias           = null;
            
            /**
             * 컬렉션 키
             * @member {BaseEntity} _L.Meta.Entity.ObjectColumn#__key
             */
            Object.defineProperty(this, '__key', 
            {
                get: function() { return __key; },
                // set: function(newValue) { 
                //     if (typeof newValue !== 'string') Message.error('ES021', ['columnName', 'string']);
                //     if (newValue.length <= 0) Message.error('ES062', ['__key.length', '0']);
                //     __key = newValue;
                // },
                configurable: false,
                enumerable: false,
            });

            /**
             * 아이템 소유 엔티티
             * @member {BaseEntity} _L.Meta.Entity.BaseColumn#_entity
             */
            Object.defineProperty(this, '_entity', 
            {
                get: function() { return _entity; },
                set: function(newValue) { 
                    if (typeof newValue !== 'undefined' && !(newValue instanceof MetaElement && newValue.instanceOf('BaseEntity'))) {
                        Message.error('ES032', ['_entity', 'BaseEntity']);
                    }
                    // var column = newValue.columns[this.columnName];
                    // if (column && column._entity !== newValue) {
                    //     newValue.columns.add(this);
                    // }
                    _entity = newValue;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * value 타입
             * @member {BaseEntity} _L.Meta.Entity.BaseColumn#_valueTypes
             */
            Object.defineProperty(this, '_valueTypes', 
            {
                get: function() { return _valueTypes; },
                set: function(newValue) { 
                    var arr = [];
                    if (!Array.isArray(newValue)) arr.push(newValue);
                    else arr = newValue;
                    _valueTypes = arr;  
                },
                configurable: false,
                enumerable: true
            });




            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {string} _L.Meta.Entity.BaseColumn#columnName
             */
            Object.defineProperty(this, 'columnName', 
            {
                get: function() { return this._name; },
                set: function(newValue) { 
                    if (newValue === this.columnName) return;
                    if (typeof newValue !== 'string') Message.error('ES021', ['columnName', 'string']); 
                    if (_entity && _entity.columns.existColumnName(newValue)) Message.error('ES042', [newValue, 'columnName']);
                    if (_entity && _entity.columns.existAlias(newValue)) Message.error('ES042', [newValue, 'alias']);
                    // columnName = newValue;
                    this.__SET$_name(newValue, this);
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 아이템 별칭 (bind전송시, 데이터 수신후 설정시 활용함)
             * 사용처 
             * - Bind-command-ajax._execBind() : 데이터 전송시
             * - BaseBind.setValue(row) : 로우값 을 엔티티에 설정시
             * - getValue() : row 에 활용함
             * 기본값 = name 값
             * @member {String} _L.Meta.Entity.BaseColumn#alias
             */
            Object.defineProperty(this, 'alias', 
            {
                get: function() { return typeof alias === 'string' ? alias : this.columnName; },
                set: function(newValue) { 
                   var entity = this._entity;
                   if(typeof newValue !== 'string') Message.error('ES021', ['alias', 'string']);
                   if (entity && entity.columns.existAlias(newValue)) Message.error('ES042', [newValue, 'alias']);
                   alias = newValue;
                },
                configurable: false,
                enumerable: true
            }); 



            /**
             * 아이템 기본값 (내부속성)
             * @member {String | Number | Boolean} _L.Meta.Entity.BaseColumn#default
             */
            Object.defineProperty(this, 'default', 
            {
                get: function() { return defaultValue; },
                set: function(newValue) { 
                    if (this._valueTypes.length > 0) Util.validType(newValue, this._valueTypes);
                    // if(typeof newValue !== 'undefined' && newValue !== null 
                    //     &&  ['string', 'number', 'boolean'].indexOf(typeof newValue) < 0) {
                    //         Message.error('ES021', ['default', 'string | boolean | number']);
                    //     }
                    defaultValue = newValue; 
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 아이템 설명 (내부속성)
             * @member {String} _L.Meta.Entity.BaseColumn#caption
             */
            Object.defineProperty(this, 'caption', 
            {
                get: function() { return caption; },
                set: function(newValue) { 
                    if(typeof newValue !== 'string') Message.error('ES021', ['caption', 'string']); 
                    caption = newValue; 
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 아이템 설명 (내부속성)
             * @member {String} _L.Meta.Entity.BaseColumn#caption
             */
            Object.defineProperty(this, 'value', 
            {
                get: function() { return __value; },
                set: function(newValue) { 
                    if (this._valueTypes.length > 0) Util.validType(newValue, this._valueTypes);
                    
                    // if(typeof newValue !== 'string') Message.error('ES021', ['caption', 'string']); 
                    __value = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            

            // inner variable access
            this.__GET$alias = function(call) {
                if (call instanceof BaseColumn) return alias;
            }
            this.__SET$__key = function(val, call) {
                if (call instanceof BaseColumn) __key = val;
            }
            // this.__SET$_valueTypes = function(val, call) {
            //     var arr = [];
            //     if (call instanceof BaseColumn) {
            //         if (!Array.isArray(val)) arr.push(val);
            //         else arr = val;
            //         _valueTypes = arr;  
            //     } 
            // }

            // this.columnName  = p_name;   
            if (p_entity) _entity = p_entity;
            
            // if (property && property != {}) this._load(property);         
        }
        Util.inherits(BaseColumn, _super);


        BaseColumn._NS = 'Meta.Entity';     // namespace
        BaseColumn._PARAMS = ['columnName', '_entity', '_property'];    // creator parameter
        BaseColumn._ABSCRACT = true;
        BaseColumn._TYPES = [];

        /**
         * 프로퍼티 속성으로 로드한다.
         * @param {object} p_property 
         */
        // BaseColumn.prototype._load = function(p_property) {
        //     if (typeof p_property === 'object' ) {
        //         for(var prop in p_property) {
        //             if (p_property.hasOwnProperty(prop) &&
        //             [   '_entity', 'default', 'caption', 
        //                 'value', 'alias'
        //             ].indexOf(prop) > -1) {
        //                 this[prop] = p_property[prop];
        //             }
        //         }
        //     } 
        //     if (['number', 'string', 'boolean'].indexOf(typeof p_property) > -1) {  
        //         this['value'] = p_property; 
        //     }
        // };        

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // BaseColumn.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this.__event.__subscribers, p_target.__event.__subscribers)) return false;            
        //     // 
        //     if (!this._compare(this._entity, p_target._entity)) return false;
        //     // if (this._entity && !this._entity.equal(p_target._entity)) return false;  
        //     if (!this._compare(this.columnName, p_target.columnName)) return false;
        //     if (!this._compare(this.alias, p_target.alias)) return false;
        //     if (!this._compare(this.default, p_target.default)) return false;
        //     if (!this._compare(this.caption, p_target.caption)) return false;
        //     if (!this._compare(this.isNotNull, p_target.isNotNull)) return false;
        //     if (!this._compare(this.isNullPass, p_target.isNullPass)) return false;
        //     if (!this._compare(this.constraints, p_target.constraints)) return false;
        //     if (!this._compare(this.value, p_target.value)) return false;
        //     if (!this._compare(this.getter, p_target.getter)) return false;
        //     if (!this._compare(this.setter, p_target.setter)) return false;
        //     return true;
        // };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        BaseColumn.prototype.getObject = function(p_vOpt, p_origin) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_origin);
            var vOpt = p_vOpt || 0;
            var origin = [];
            // var origin = p_origin ? p_origin : obj;

            if (Array.isArray(p_origin)) origin = p_origin;
            else if (p_origin) origin.push(p_origin);
            origin.push(obj);
            
            // if (vOpt > -2 && this._entity && this._entity.columns && this._entity.columns[this.__key]
            //     && this._entity.columns[this.__key] !== this) {
            //     return MetaRegistry.createReferObject(this); // 소유자가 아니면 참조 리턴
            // }

            // if (!Util.deepEqual(this.__event.__subscribers, this.__event._getInitObject())) {
            //     obj.__subscribers = this.__event.__subscribers;
            // }
            // if (this.metaName !== this.columnName) obj.columnName = this.columnName;
            if (vOpt < 2 && vOpt > -1 && this._entity) {
                obj._entity = MetaRegistry.createReferObject(this._entity);
            }
            obj.columnName = this.columnName;
            if (this.default !== null) obj.default = this.default;
            if (this.caption !== null) obj.caption = this.caption;            
            // if (this.isNotNull !== false) obj.isNotNull = this.isNotNull;
            // if (this.isNullPass !== false) obj.isNullPass = this.isNullPass;
            // if (this.constraints.length > 0) obj.constraints = Util.deepCopy(this.constraints);
            // if (this.getter !== null) obj.getter = this.getter;
            // if (this.setter !== null) obj.setter = this.setter;
            if (this.__GET$alias(this) !== null) obj.alias = this.__GET$alias(this);
            if (this.value !== null) obj.value = this.value;
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        BaseColumn.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var entity;

            // if (p_oGuid.__subscribers) {
            //     this.__event.__SET$__subscribers(p_oGuid.__subscribers, this.__event);
            // }
            if (p_oGuid._entity) {
                entity = MetaRegistry.findSetObject(origin, p_oGuid._entity.$ref);
                if (!entity) Message.error('ES015', [p_oGuid.name, '_entity']);
                this._entity = entity;
            } 
            // if (p_oGuid.columnName) this.columnName = p_oGuid.columnName;
            this.columnName = p_oGuid.columnName;
            if (p_oGuid.default) this.default = p_oGuid.default;
            if (p_oGuid.caption) this.caption = p_oGuid.caption;
            // if (p_oGuid.isNotNull) this.isNotNull = p_oGuid.isNotNull;
            // if (p_oGuid.isNullPass) this.isNullPass = p_oGuid.isNullPass;
            // if (p_oGuid.constraints) this.constraints = p_oGuid.constraints;
            // if (p_oGuid.getter) this.getter = p_oGuid.getter;
            // if (p_oGuid.setter) this.setter = p_oGuid.setter;
            if (p_oGuid.alias) this.alias = p_oGuid.alias;
            if (p_oGuid.value) this.value = p_oGuid.value;
        };

        /** @abstract */
        BaseColumn.prototype.clone = function() {
            Message.error('ES013', ['clone()']);
        };

        return BaseColumn;
    
    }(MetaElement));


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.BaseColumn                         = BaseColumn;
    } else {
        _global._L.BaseColumn                              = BaseColumn;
        _global._L.Meta.Entity.BaseColumn                  = BaseColumn;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));