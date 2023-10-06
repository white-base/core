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
    var BaseEntity;
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
        BaseEntity                  = require('./base-entity').BaseEntity;
        MetaViewColumnCollection    = require('./meta-column').MetaViewColumnCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        PropertyCollection          = _global._L.PropertyCollection;
        MetaObject                  = _global._L.MetaObject;
        BaseEntity                  = _global._L.BaseEntity;
        MetaViewColumnCollection    = _global._L.MetaViewColumnCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof PropertyCollection === 'undefined') Message.error('ES011', ['PropertyCollection', 'collection-property']);
    if (typeof BaseEntity === 'undefined') Message.error('ES011', ['BaseEntity', 'base-entity']);
    if (typeof MetaViewColumnCollection === 'undefined') Message.error('ES011', ['MetaViewColumnCollection', 'meta-column']);

    //==============================================================
    // 4. module implementation   
    var MetaView  = (function (_super) {
        /**
         * 메타 뷰
         * @constructs _L.Meta.Entity.MetaView
         * @extends _L.Meta.Entity.BaseEntity
         * @param {string} p_name 
         * @param {BaseEntity?} p_baseEntity 기본 엔티티, 컬럼 추가시 기본엔티티에 추가 된다.
         */
        function MetaView(p_name, p_baseEntity) {
            _super.call(this, p_name);

            var _baseEntity;
            var columns = new MetaViewColumnCollection(this);
            /**
             * 메타 뷰 이름
             * @member {string} _L.Meta.Entity.MetaView#viewName
             */
            Object.defineProperty(this, 'viewName', 
            {
                get: function() { return this._name; },
                set: function(nVal) { 
                    if (nVal === this.viewName) return;
                    if (typeof nVal !== 'string') Message.error('ES021', ['viewName', 'string']);
                    this.__SET$_name(nVal, this);
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 뷰의 컬럼 컬렉션
             * @member {MetaViewColumnCollection} _L.Meta.Entity.MetaView#columns
             */
            Object.defineProperty(this, 'columns', 
            {
                get: function() { return columns; },
                set: function(nVal) { 
                    if (!(nVal instanceof MetaViewColumnCollection)) Message.error('ES032', ['columns', 'MetaViewColumnCollection']);
                    if (this.rows.count > 0) Message.error('ES047', ['rows', 'MetaRow', 'MetaViewColumnCollection']);
                    columns = nVal;
                },
                configurable: false,
                enumerable: true
            });
           
            /**
             * 기본 엔티티
             * @member {MetaViewColumnCollection} _L.Meta.Entity.MetaView#_baseEntity
             */
            Object.defineProperty(this, '_baseEntity', 
            {
                get: function() { return _baseEntity; },
                set: function(nVal) { 
                    if (!(nVal instanceof BaseEntity)) Message.error('ES032', ['_baseEntity', 'BaseEntity']);
                    _baseEntity = nVal;
                },
                configurable: false,
                enumerable: true
            });

            if (p_baseEntity) this._baseEntity = p_baseEntity;
            
        }
        Util.inherits(MetaView, _super);

        MetaView._NS = 'Meta.Entity';                   // namespace
        MetaView._PARAMS = ['name', '_baseEntity'];     // creator parameter


        /**
         * guid 객체 얻기
         * @override
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
         * @returns {object}
         */
        MetaView.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            // var origin = p_origin ? p_origin : obj;

            obj['viewName'] = this.viewName;
            if (vOpt < 2 && vOpt > -1 && this._baseEntity) {
                obj['_baseEntity'] = MetaRegistry.createReferObject(this._baseEntity);
            }
            return obj;                  
        };

        /**
         * guid 객체 설정
         * @override
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        MetaView.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var metaSet;
            var baseEntity;

            if(p_oGuid['_metaSet']) {
                metaSet = MetaRegistry.findSetObject(p_oGuid['_metaSet']['$ref'], origin);
                if (!metaSet) Message.error('ES015', [p_oGuid['name'], '_metaSet']);
                this._metaSet = metaSet;
            }
            // this.metaSet = mObj.metaSet;
            if (p_oGuid['_baseEntity']) {
                baseEntity = MetaRegistry.findSetObject(p_oGuid['_baseEntity']['$ref'], origin);
                if (!baseEntity) Message.error('ES015', [p_oGuid['name'], '_baseEntity']);
                // this.__SET$_baseEntity(baseEntity, this);
                this._baseEntity = baseEntity;
            } 
            this.columns.setObject(p_oGuid['columns'], origin);
            this.rows.setObject(p_oGuid['rows'], origin);
            this.viewName = p_oGuid['viewName'];
        };
        /**
         * 객체 복제
         * @override
         * @returns {MetaView}
         */
        MetaView.prototype.clone  = function() {
            var clone = new MetaView(this.viewName, this._baseEntity);  // 뷰를 복제하면 참조타입 >> 엔티티타입으로 변경

            // if (this.columns._baseCollection) {
            //     clone.columns.__SET$_baseCollection(this.columns._baseCollection, clone.columns);
            // }
            // for(var i = 0; i < this.columns._refEntities.length; i++) {
            //     clone.columns._refEntities.push(this.columns._refEntities[i]);
            // }
            for(var i = 0; i < this.columns.count; i++) {
                if (this.columns[i]._entity === this) clone.columns.add(this.columns[i].clone(clone));
                else clone.columns.add(this.columns[i].clone());
                // clone.columns.add(this.columns[i].clone(clone));
            }

            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone(clone));
            }

            // var mObj = this.getObject();
            // this.columns.setObject(mObj.columns);
            // this.rows.setObject(mObj.rows);
            // this.viewName = mObj.viewName;
            

            return clone;
        };
        
        /**
         * 엔티티를 복사한다. (조회 후 복제)
         * @param {overload}            type1
         * @param {function}            type1.p_filter 로우 필터 함수
         * @param {arguments<string>}   type1.p_args 컬럼명
         * @param {overload}            type2
         * @param {string}              type2.p_columns 컬럼명
         */
        MetaView.prototype.copy  = function(p_filter, p_args) {
            var args = Array.prototype.slice.call(arguments);
            var _this = this;
            var items = [];
            var callback = null;
            var entity = new MetaView(this.viewName, this);
            var orignal = this.clone();

            // 매개변수 구성
            if (typeof p_filter === 'function') {
                callback = p_filter;
                if (Array.isArray(p_args)) items = p_args;
                else if (args.length > 1) items = args.splice(1);
            } else if (Array.isArray(p_filter)) {
                items = p_filter;
            } else {
                items = args.splice(0);
            }

            return this._buildEntity(entity, callback, items);
        };

        
        return MetaView;
    
    }(BaseEntity));
    
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
             * @member {BaseColumnCollection} _L.Meta.Entity.MetaViewCollection#_baseType
             */
            Object.defineProperty(this, '_baseType', 
            {
                get: function() { return _baseType; },
                set: function(nVal) { 
                    // if (!(nVal instanceof MetaElement && nVal.instanceOf('BaseEntity'))) {
                    //     Message.error('ES032', ['_baseType', 'BaseEntity']);
                    // }
                    if (!(typeof nVal === 'function')) Message.error('ES021', ['_baseType', 'function']);
                    if (!(new nVal('temp') instanceof MetaView)) Message.error('ES032', ['_baseType', 'MetaView']);
                    _baseType = nVal;
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
         * @override
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // MetaViewCollection.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this._baseType, p_target._baseType)) return false;
        //     return true;
        // };

        /**
         * 뷰 컬렉션에 뷰 엔티티를 추가한다.
         * @param {string | MetaView} p_obj 
         * @param {BaseColumnCollection?} p_baseEntity
         * @returns {MetaView} 등록한 아이템
         * @example
         *  - string                    : 생성후   string      이름으로 등록 
         *  - string, colltion          : 생성후   string      이름으로  등록 (collection보냄)
         *  - entityView                :         entityView  이름으로 등록
         *  - entityView, collection    :         entityView  이름으로 등록 (collection보냄) => 오류발생
         */
        MetaViewCollection.prototype.add  = function(p_obj, p_baseEntity) {    // COVER:
            var view;
            var key;

            if (p_baseEntity && !(p_baseEntity instanceof BaseEntity)) {
                Message.error('ES032', ['baseEntity', 'BaseEntity']);
            }
            if (p_obj instanceof MetaView && p_baseEntity) {
                Message.error('ES016', ['baseEntity', 'MetaView']);
            }

            if (typeof p_obj === 'string') {      
                key  = p_obj;
                view = new this._baseType(key, p_baseEntity);
                view._metaSet = this._owner;
            } else if (p_obj instanceof MetaView) {
                // if (p_baseEntity) Message.error('ES015', ['MetaView object', 'refEntity']);
                key  = p_obj.viewName;
                view = p_obj;
                p_obj._metaSet = this._owner;
            } else Message.error('ES021', ['object', 'string, MetaView object']);

            // if (typeof key === 'undefined') Message.error('ES051', ['viewName']);
            if (this.existViewName(key)) Message.error('ES042', ['viewName', key]);

            return _super.prototype.add.call(this, key, view);
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