/**** base-column.js | _L.Meta.Entity.BaseColumn ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Type;
    var Util;
    var Observer;
    var MetaElement;
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
        ExtendError                 = require('./extend-error').ExtendError;
        Type                        = require('./type');
        Util                        = require('./util');
        Observer                    = require('./observer').Observer;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
        MetaElement                 = require('./meta-element').MetaElement;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Type                        = _global._L.Type;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        MetaRegistry                = _global._L.MetaRegistry;
        MetaElement                 = _global._L.MetaElement;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011',['Util', 'util']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaElement === 'undefined') throw new Error(Message.get('ES011', ['MetaElement', 'meta-element']));

    //==============================================================
    // 4. module implementation
    //--------------------------------------------------------------
    // implementation   
    var BaseColumn  = (function (_super) {
        /**
         * 컬럼 (최상위)
         * @abstract
         * @constructs _L.Meta.Entity.BaseColumn
         * @extends _L.Meta.MetaElement
         * @param {string} p_name 아이템명
         * @param {BaseEntity?} p_entity 소유 BaseEntity
         */
        function BaseColumn(p_name, p_entity) {
            _super.call(this, p_name);

            var __value         = null;
            var __key           = p_name;
            var _entity;
            var _valueTypes     = this._type._VALUE_TYPE || [];
            var defaultValue    = null;
            var caption         = null;
            var alias           = null;
            
            /**
             * 컬럼 컬렉션의 키
             * @readonly
             * @member {BaseEntity} _L.Meta.Entity.BaseColumn#__key
             */
            Object.defineProperty(this, '__key', 
            {
                get: function() { return __key; },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬럼 소유 엔티티
             * @member {BaseEntity} _L.Meta.Entity.BaseColumn#_entity
             */
            Object.defineProperty(this, '_entity', 
            {
                get: function() { return _entity; },
                set: function(nVal) { 
                    if (typeof nVal !== 'undefined' && !(nVal instanceof MetaElement && nVal.instanceOf('BaseEntity'))) {
                        throw new ExtendError(/EL05111/, null, [this.constructor.name]);
                    }
                    _entity = nVal;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * value 속성 타입 설정
             * @member {BaseEntity} _L.Meta.Entity.BaseColumn#_valueTypes
             */
            Object.defineProperty(this, '_valueTypes', 
            {
                get: function() { return _valueTypes; },
                set: function(nVal) { 
                    var arr = [];
                    if (!Array.isArray(nVal)) arr.push(nVal);
                    else arr = nVal;
                    _valueTypes = arr;  
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 컬럼명, _name 과 동일
             * @member {string} _L.Meta.Entity.BaseColumn#columnName
             */
            Object.defineProperty(this, 'columnName', 
            {
                get: function() { return this._name; },
                set: function(nVal) { 
                    if (nVal === this.columnName) return;
                    if (typeof nVal !== 'string') throw new ExtendError(/EL05112/, null, [this.constructor.name, typeof nVal]); 
                    if (_entity && _entity.columns.existColumnName(nVal)) throw new ExtendError(/EL05113/, null, [this.constructor.name, nVal]);
                    if (_entity && _entity.columns.existAlias(nVal)) throw new ExtendError(/EL05114/, null, [this.constructor.name, nVal]);
                    this.__SET$_name(nVal, this);
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 아이템 별칭 (bind전송시, 데이터 수신후 설정시 활용함)  
             * 사용처 (기본값 = columnName )
             * - Bind-command-ajax._execBind() : 데이터 전송시  
             * - BaseBind.setValue(row) : 로우값 을 엔티티에 설정시  
             * - getValue() : row 에 활용함  
             * @member {string} _L.Meta.Entity.BaseColumn#alias
             */
            Object.defineProperty(this, 'alias', 
            {
                get: function() { return typeof alias === 'string' ? alias : this.columnName; },
                set: function(nVal) { 
                   var entity = this._entity;
                   if(typeof nVal !== 'string') throw new ExtendError(/EL05115/, null, [this.constructor.name, typeof nVal]); 
                   if (entity && entity.columns.existAlias(nVal)) throw new ExtendError(/EL05116/, null, [this.constructor.name, nVal]);
                   alias = nVal;
                },
                configurable: false,
                enumerable: true
            }); 

            /**
             * 컬럼 value 의 기본값 (내부속성)
             * @member {string | number | boolean} _L.Meta.Entity.BaseColumn#default
             */
            Object.defineProperty(this, 'default', 
            {
                get: function() { return defaultValue; },
                set: function(nVal) { 
                    if (this._valueTypes.length > 0) Type.matchType([this._valueTypes], nVal);
                    defaultValue = nVal; 
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 컬럼 설명
             * @member {string} _L.Meta.Entity.BaseColumn#caption
             */
            Object.defineProperty(this, 'caption', 
            {
                get: function() { return caption; },
                set: function(nVal) { 
                    if(typeof nVal !== 'string') throw new ExtendError(/EL05117/, null, [this.constructor.name, typeof nVal]); 
                    caption = nVal; 
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 컬럼 값
             * @member {any} _L.Meta.Entity.BaseColumn#value
             */
            Object.defineProperty(this, 'value', 
            {
                get: function() { return __value; },
                set: function(nVal) { 
                    if (this._valueTypes.length > 0) Type.matchType([this._valueTypes], nVal);
                    __value = nVal; 
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
            if (p_entity) _entity = p_entity;
            
        }
        Util.inherits(BaseColumn, _super);

        BaseColumn._NS = 'Meta.Entity';     // namespace
        BaseColumn._PARAMS = ['columnName', '_entity'];    // creator parameter
        BaseColumn._KIND = 'abstract';
        BaseColumn._VALUE_TYPE = [];

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
        BaseColumn.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (vOpt < 2 && vOpt > -1 && this._entity) {
                obj['_entity'] = MetaRegistry.createReferObject(this._entity);
            }
            obj['columnName'] = this.columnName;
            if (this.default !== null) obj['default'] = this.default;
            if (this.caption !== null) obj['caption'] = this.caption;            
            if (this.__GET$alias(this) !== null) obj['alias'] = this.__GET$alias(this);
            if (this.value !== null) obj['value'] = this.value;
            return obj;                        
        };

        /**
         * 현재 객체를 초기화 후, 지정한 guid 타입의 객체를 사용하여 설정합니다.   
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object?} p_origin 현재 객체를 설정하는 원본 guid 객체  
         * 기본값은 p_oGuid 객체와 동일
         */
        BaseColumn.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var entity;

            if (p_oGuid['_entity']) {
                entity = MetaRegistry.findSetObject(p_oGuid['_entity']['$ref'], origin);
                if (!entity) throw new ExtendError(/EL05118/, null, [p_oGuid['name'], p_oGuid['_entity']['$ref']]);
                this._entity = entity;
            } 
            this.columnName = p_oGuid['columnName'];
            if (p_oGuid['default']) this.default = p_oGuid['default'];
            if (p_oGuid['caption']) this.caption = p_oGuid['caption'];
            if (p_oGuid['alias']) this.alias = p_oGuid['alias'];
            if (p_oGuid['value']) this.value = p_oGuid['value'];
        };

        /** 
         * 컬럼 복제
         * @abstract 
         */
        BaseColumn.prototype.clone = function() {
            throw new ExtendError(/EL05119/, null, []);
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