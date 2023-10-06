/**
 * namespace _L.Meta.Entity.ObjectColumn
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var Observer;
    var CustomError;
    var MetaRegistry;
    var MetaObject;
    var MetaElement;
    var BaseColumn;
    var PropertyCollection;

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
        MetaObject                  = require('./meta-object').MetaObject;
        MetaElement                 = require('./meta-element').MetaElement;
        BaseColumn                  = require('./base-column').BaseColumn;
        PropertyCollection          = require('./collection-property').PropertyCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        CustomError                 = _global._L.CustomError;
        MetaObject                  = _global._L.MetaObject;
        MetaElement                 = _global._L.MetaElement;
        BaseColumn                  = _global._L.BaseColumn;
        PropertyCollection          = _global._L.PropertyCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof Observer === 'undefined') Message.error('ES011', ['Observer', 'observer']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof MetaElement === 'undefined') Message.error('ES011', ['MetaElement', 'meta-element']);
    if (typeof BaseColumn === 'undefined') Message.error('ES011', ['BaseColumn', 'base-column']);
    if (typeof PropertyCollection === 'undefined') Message.error('ES011', ['PropertyCollection', 'collection-property']);   // ~ Branch:

    //==============================================================
    // 4. module implementation
    //--------------------------------------------------------------
    // implementation   
    var ObjectColumn  = (function (_super) {
        /**
         * 객체 컬럼
         * @constructs _L.Meta.Entity.ObjectColumn
         * @extends _L.Meta.Entity.BaseColumn
         * @param {string} p_name 객체컬럼명
         * @param {BaseEntity?} p_entity 소유 BaseEntity
         * @param {object?} p_property 
         * @param {object?} p_property.default 기본값
         * @param {string?} p_property.caption 설명
         * @param {object?} p_property.value value 값
         * @param {string?} p_property.alias 별칭
         */
        function ObjectColumn(p_name, p_entity, p_property) {
            _super.call(this, p_name, p_entity);

            if (p_property) this._load(p_property);
        }
        Util.inherits(ObjectColumn, _super);

        ObjectColumn._NS = 'Meta.Entity';     // namespace
        ObjectColumn._PARAMS = ['columnName', '_entity', '_property'];    // creator parameter
        ObjectColumn._TYPES = [Object];


        /**
         *  프로퍼티 객체로 속성 로드
         * @param {object} p_property 
         */
        ObjectColumn.prototype._load = function(p_property) {
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    ['default', 'caption', 'value', 'alias'].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            } else Message.error('ES021', ['p_property', 'object']);
        };

        /**
         * guid 객체 얻기
         * override
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
         * @returns {object}
         */
        ObjectColumn.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            var defValue = this.default;
            var value = this.value;

            if (defValue instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(defValue, owned)) {
                    obj['default'] = MetaRegistry.createReferObject(defValue);
                } else obj['default'] = defValue.getObject(vOpt, owned);
            }

            if (value instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(value, owned)) {
                    obj['value'] = MetaRegistry.createReferObject(value);
                } else obj['value'] = value.getObject(vOpt, owned);
            }
            return obj;                        
        };

        /**
         * guid 객체 설정
         * override
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        ObjectColumn.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var elem;

            // 주의! defuault 설정후 value 설정 :getObject() 와 동일
            elem = p_oGuid['default'];
            if (typeof elem === 'object' && elem !== null) {
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this['default'] = obj;
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) Message.error('ES015', ['ObjectColumn.default', '$ref']);
                    this['default'] = meta;
                }
            }

            elem = p_oGuid['value'];
            if (typeof elem === 'object' && elem !== null) {
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.value = obj;
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) Message.error('ES015', ['ObjectColumn.value', '$ref']);
                    this.value = meta;
                }
            }
        };

        /**
         * 객체 복제
         * override
         * @param {BaseEntity?} p_entity 지정한 엔티티로 복제
         * @returns {ObjectColumn}
         */
        ObjectColumn.prototype.clone = function(p_entity) {
            var clone;
            var rObj = this.getObject();
            var entity = p_entity ? p_entity : this._entity;

            clone = new ObjectColumn(this.columnName, entity);

            if (rObj['default']) clone.default = this['default'];
            if (rObj['caption']) clone.caption = rObj['caption'];
            if (rObj['alias']) clone.alias = rObj['alias'];
            if (rObj['value']) clone.value = this.value;

            return clone;
        };

        return ObjectColumn;
    
    }(BaseColumn));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ObjectColumn                                = ObjectColumn;

    } else {
        _global._L.ObjectColumn                              = ObjectColumn;
        _global._L.Meta.Entity.ObjectColumn                  = ObjectColumn;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));