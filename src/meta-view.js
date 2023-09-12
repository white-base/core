/**
 * namespace _L.Meta.Entity.MetaView
 * namespace _L.Meta.Entity.MetaViewCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var MetaObject;
    var MetaEntity;
    var MetaViewColumnCollection;
    var PropertyCollection;
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
        PropertyCollection          = require('./collection-property').PropertyCollection;
        MetaObject                  = require('./meta-object').MetaObject;
        MetaEntity                  = require('./meta-entity').MetaEntity;
        MetaViewColumnCollection    = require('./meta-column').MetaViewColumnCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        PropertyCollection          = _global._L.PropertyCollection;
        MetaObject                  = _global._L.MetaObject;
        MetaEntity                  = _global._L.MetaEntity;
        MetaViewColumnCollection    = _global._L.MetaViewColumnCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof PropertyCollection === 'undefined') Message.error('ES011', ['PropertyCollection', 'collection-property']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof MetaEntity === 'undefined') Message.error('ES011', ['MetaEntity', 'meta-entity']);
    if (typeof MetaViewColumnCollection === 'undefined') Message.error('ES011', ['MetaViewColumnCollection', 'meta-column']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);

    //==============================================================
    // 4. module implementation   
    var MetaView  = (function (_super) {
        /**
         * 뷰 엔티티
         * @constructs _L.Meta.Entity.MetaView
         * @extends _L.Meta.Entity.MetaEntity
         * @param {*} p_name 
         * @param {*} p_baseEntity 
         */
        function MetaView(p_name, p_baseEntity) {
            _super.call(this, p_name);

            var _refEntity = p_baseEntity;
            var _refEntities = [];
            // var viewName;
            var columns;
            var refCollection;

            if (p_baseEntity && p_baseEntity instanceof MetaObject && p_baseEntity.instanceOf('MetaEntity')) {
                refCollection = p_baseEntity.columns;
            }
            
            /**
             * 기본 참조 컬렉션
             * // REVIEW: 필요 유무 검토 => 직렬화에 필요할 듯
             * @member {MetaViewColumnCollection} _L.Meta.Entity.MetaView#_refEntity
             */
            Object.defineProperty(this, '_refEntity', 
            {
                get: function() { return _refEntity; },
                configurable: false,
                enumerable: true
            });

            /**
             * add() 통해서 추가된 외부 엔티티 목록
             * // REVIEW: 필요 유무 검토 => 직렬화에 필요할 듯
             * @member {MetaViewColumnCollection} _L.Meta.Entity.MetaView#_refEntities
             */
            Object.defineProperty(this, '_refEntities', 
            {
                get: function() { return _refEntities; },
                configurable: false,
                enumerable: true
            });

            /**
             * 테이블 이름
             * @member {string} _L.Meta.Entity.MetaView#viewName
             */
            Object.defineProperty(this, 'viewName', 
            {
                get: function() { return this._name; },
                set: function(newValue) { 
                    if (newValue === this.viewName) return;
                    if (typeof newValue !== 'string') Message.error('ES021', ['viewName', 'string']);
                    if (this.metaSet && this.metaSet.views.existViewName(newValue)) Message.error('ES041', [newValue]);
                    // viewName = newValue;
                    this.__SET$_name(newValue, this);
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaViewColumnCollection} _L.Meta.Entity.MetaView#columns
             */
            Object.defineProperty(this, 'columns', 
            {
                get: function() { return columns; },
                configurable: false,
                enumerable: true
            });
           
            // this.viewName      = p_name || '';
            this.viewName = p_name || '';
            
            // this._refEntities   = [];
            columns = new MetaViewColumnCollection(this, refCollection);

            // inner variable access
            this.__SET$_refEntity = function(val, call) {
                if (call instanceof MetaView) _refEntity = val;
            }
        }
        Util.inherits(MetaView, _super);

        MetaView._NS = 'Meta.Entity';    // namespace
        MetaView._PARAMS = ['name', '_baseEntity'];  // creator parameter

        /**
         * 뷰 엔티티에 참조를 등록한다. (중복 제거후)
         * @param {MetaEntity} p_entity 
         */
        MetaView.prototype._regRefer  = function(p_entity) {
            if (!(p_entity instanceof MetaEntity)) Message.error('ES032', ['entity', 'MetaEntity']);
            if (this._refEntities.indexOf(p_entity) < 0) this._refEntities.push(p_entity);
        };
        
        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        MetaView.prototype.equal = function(p_target) {
            if (!_super.prototype.equal.call(this, p_target)) return false;

            if (!this._compare(this.viewName, p_target.viewName)) return false;
            if (!this._compare(this._refEntity, p_target._refEntity)) return false;
            if (!this._compare(this._refEntities, p_target._refEntities)) return false;
            return true;
        };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaView.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this, p_vOpt);
            var vOpt = p_vOpt || 0;

            obj.viewName = this.viewName;
            if (vOpt > -2 && this._refEntity) obj._refEntity = MetaRegistry.createReferObject(this._refEntity);            
            /**
             * REVIEW:
             * _refEntities 는 add 시점에 자동으로 추가되므로 필요 없을틋 
             */
            return obj;                  
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        MetaView.prototype.setObject  = function(mObj, oObj) {
            _super.prototype.setObject.call(this, mObj, oObj);
            var origin = oObj ? oObj : mObj;

            // this.metaSet = mObj.metaSet;
            if (mObj.metaSet) this.metaSet = MetaRegistry.findSetObject(origin, mObj.metaSet.$ref);
            this.columns.setObject(mObj.columns, origin);
            this.rows.setObject(mObj.rows, origin);
            this.viewName = mObj.viewName;
            this.__SET$_refEntity(mObj._refEntity, this);
        };

        /**
         * 뷰 엔티티를 복제한다.
         * @returns {*}
         */
        MetaView.prototype.clone  = function() {
            var clone = new MetaView(this.viewName);  // 뷰를 복제하면 참조타입 >> 엔티티타입으로 변경

            // 참조 복제 REVIEW::  필요성 검토 필요
            // for(var i = 0; i < this._refEntities.length; i++) {
            //     clone._refEntities.push(this._refEntities[i]);
            // }
            for(var i = 0; i < this.columns.count; i++) {
                clone.columns.add(this.columns[i].clone(clone));
            }

            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone(clone));
            }
            return clone;
        };
        
        /**
         * 엔티티를 복사한다. (조회 후 복제)
         * @param {*} p_filter 
         * @param {*} p_index 
         * @param {*} p_end 
         */
        MetaView.prototype.copy  = function(p_filter, p_args) {
            var args = Array.prototype.slice.call(arguments);
            var _this = this;
            // var MetaView                    = require('./meta-view').MetaView;
            var items = [];
            var callback = null;
            var columnName;
            var entity = new MetaView(this.viewName, this);
            var orignal = this.clone();

            // 매개변수 구성
            if (typeof p_filter === 'function') {
                callback = p_filter;
                if (Array.isArray(p_args)) items = p_args;
                else if (args.length > 1) items = args.splice(1);
            } else if (typeof p_filter === 'string') {
                items = args;
            } else if (Array.isArray(p_filter)) {
                items = p_filter;
            }

            return this._buildEntity(entity, callback, items).clone();
        };

        
        return MetaView;
    
    }(MetaEntity));
    
    //--------------------------------------------------------------
    // implementation
    var MetaViewCollection  = (function (_super) {
        /**
         * 뷰 엔티티 컬렉션
         * @constructs _L.Meta.Entity.MetaViewCollection
         * @extends _L.Meta.Entity.PropertyCollection
         * @param {*} p_owner 소유자 
         */
        function MetaViewCollection(p_owner) {    // COVER:
            _super.call(this, p_owner);

            var _baseType = MetaView;
            /**
             * 기본 생성 타입
             * @member {MetaColumnCollection} _L.Meta.Entity.MetaViewCollection#_baseType
             */
            Object.defineProperty(this, '_baseType', 
            {
                get: function() { return _baseType; },
                set: function(newValue) { 
                    if (!(newValue instanceof MetaElement && newValue.instanceOf('MetaEntity'))) {
                        Message.error('ES032', ['_baseType', 'MetaEntity']);
                    }
                    _baseType = newValue;
                },
                configurable: false,
                enumerable: true
            });

            this._elemTypes = MetaView;   // 컬렉션타입 설정
        }
        Util.inherits(MetaViewCollection, _super);

        MetaViewCollection._NS = 'Meta.Entity';    // namespace
        MetaViewCollection._PARAMS = ['_owner'];  // creator parameter

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        MetaViewCollection.prototype.equal = function(p_target) {
            if (!_super.prototype.equal.call(this, p_target)) return false;

            if (!this._compare(this._baseType, p_target._baseType)) return false;
            return true;
        };

        /**
         * 뷰 컬렉션에 뷰 엔티티를 추가한다.
         * @param {string | MetaView} p_object 
         * @param {MetaColumnCollection?} p_baseEntity
         * @returns {MetaView} 등록한 아이템
         * @example
         *  - string                    : 생성후   string      이름으로 등록 
         *  - string, colltion          : 생성후   string      이름으로  등록 (collection보냄)
         *  - entityView                :         entityView  이름으로 등록
         *  - entityView, collection    :         entityView  이름으로 등록 (collection보냄) => 오류발생
         */
        MetaViewCollection.prototype.add  = function(p_object, p_baseEntity) {    // COVER:
            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new MetaView(i_name, p_baseEntity);
                i_value.metaSet = this._owner;
            } else if (p_object instanceof MetaView) {
                if (p_baseEntity) Message.error('ES015', ['MetaView object', 'refEntity']);
                i_name  = p_object.viewName;
                i_value = p_object;
                p_object.metaSet = this._owner;
            } else Message.error('ES021', ['object', 'string, MetaView object']);

            if (typeof i_name === 'undefined') Message.error('ES051', ['viewName']);
            if (this.existViewName(i_name)) Message.error('ES042', ['viewName', i_name]);

            return _super.prototype.add.call(this, i_name, i_value);
        };

        MetaViewCollection.prototype.existViewName  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].viewName === p_key) return true;
            }
            return false;
        };

        return MetaViewCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaView = MetaView;
        exports.MetaViewCollection = MetaViewCollection;
    } else {
        _global._L.MetaView = MetaView;
        _global._L.MetaViewCollection = MetaViewCollection;
        // namespace
        _global._L.Meta.Entity.MetaView = MetaView;
        _global._L.Meta.Entity.MetaViewCollection = MetaViewCollection;
    }

}(typeof window !== 'undefined' ? window : global));