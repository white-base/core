/**
 * namespace _L.Meta.Entity.MetaTable
 * namespace _L.Meta.Entity.MetaTableCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var BaseEntity;
    var PropertyCollection;
    var MetaTableColumnCollection;
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
        BaseEntity                  = require('./base-entity').BaseEntity;
        MetaTableColumnCollection   = require('./meta-column').MetaTableColumnCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {    
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        PropertyCollection          = _global._L.PropertyCollection;
        BaseEntity                  = _global._L.BaseEntity;
        MetaTableColumnCollection   = _global._L.MetaTableColumnCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof PropertyCollection === 'undefined') Message.error('ES011', ['PropertyCollection', 'collection-property']);
    if (typeof BaseEntity === 'undefined') Message.error('ES011', ['BaseEntity', 'base-entity']);
    if (typeof MetaTableColumnCollection === 'undefined') Message.error('ES011', ['MetaTableColumnCollection', 'meta-column']);

    //==============================================================
    // 4. module implementation   
    //--------------------------------------------------------------
    // implementation
    var MetaTable  = (function (_super) {
        /**
         * 테이블 엔티티
         * @constructs _L.Meta.Entity.MetaTable
         * @extends _L.Meta.Entity.BaseEntity
         * @param {*} p_name 
         */
        function MetaTable(p_name) {
            _super.call(this, p_name);

            // var tableName;
            var columns;

            /**
             * 테이블 이름
             * @member {string} _L.Meta.Entity.MetaTable#tableName
             */
            Object.defineProperty(this, 'tableName', 
            {
                get: function() { return this._name; },
                set: function(newValue) { 
                    if (newValue === this.tableName) return;
                    if (typeof newValue !== 'string') Message.error('ES021', ['tableName', 'string']);
                    // if (this._metaSet && this._metaSet.tables.existTableName(newValue)) Message.error('ES042', ['tableName', newValue]);
                    // tableName = newValue;
                    this.__SET$_name(newValue, this);
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaTableColumnCollection} _L.Meta.Entity.MetaTable#columns
             */
            Object.defineProperty(this, 'columns', 
            {
                get: function() { return columns; },
                set: function(newValue) { 
                    if (!(newValue instanceof MetaTableColumnCollection)) Message.error('ES032', ['columns', 'MetaTableColumnCollection']);
                    if (this.rows.count > 0) Message.error('ES047', ['rows', 'MetaRow', 'MetaTableColumnCollection']);
                    columns = newValue;
                },
                configurable: false,
                enumerable: true
            });
            

            // this.tableName  = p_name || '';
            this.columns = new MetaTableColumnCollection(this);

        }
        Util.inherits(MetaTable, _super);

        MetaTable._NS = 'Meta.Entity';    // namespace
        MetaTable._PARAMS = ['name'];  // creator parameter

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // MetaTable.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this.tableName, p_target.tableName)) return false;
        //     return true;
        // };
        
        /**
         * guid 객체 얻기
         * @virtual
         * @param {number} p_vOpt 레벨 옵션
         * @param {object?} p_owned 소유한 객체
         * @returns {object}
         */
        MetaTable.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            // var origin = p_origin ? p_origin : obj;

            obj.tableName = this.tableName;
            return obj;                        
        };

        /**
         * guid 객체 설정
         * @virtual
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        MetaTable.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var metaSet;

            if(p_oGuid._metaSet) {
                metaSet = MetaRegistry.findSetObject(p_oGuid._metaSet.$ref, origin);
                if (!metaSet) Message.error('ES015', [p_oGuid.name, 'metaSet']);
                this._metaSet = metaSet;
            }
            this.columns.setObject(p_oGuid.columns, origin);
            this.rows.setObject(p_oGuid.rows, origin);
            this.tableName = p_oGuid.tableName;
        };

        /**
         * 객체 복제
         * @virtual
         * @returns {MetaTable}
         */
        MetaTable.prototype.clone  = function() {
            var clone = new MetaTable(this.tableName);
            
            // columns 복제본 추가
            for(var i = 0; i < this.columns.count; i++) {
                clone.columns.add(this.columns[i].clone(clone));
            }
            
            // rows 복제본 추가
            for(var i = 0; i < this.rows.count; i++) {
                clone.rows.add(this.rows[i].clone(clone));
            }
            return clone;
        };

        /**
         * 엔티티를 복사한다. (조회 후 복제)
         * @param {function | string | array} p_filter 
         * @param {*} p_args
         */
        MetaTable.prototype.copy  = function(p_filter, p_args) {
            var args = Array.prototype.slice.call(arguments);
            var _this = this;
            // var MetaView                    = require('./meta-view').MetaView;
            var columnNames = [];
            var callback = null;
            var columnName;
            var entity = new MetaTable(this.tableName, this);
            var orignal = this.clone();

            // 매개변수 구성
            if (typeof p_filter === 'function') {
                callback = p_filter;
                if (Array.isArray(p_args)) columnNames = p_args;
                else if (args.length > 1) columnNames = args.splice(1);
            } else if (Array.isArray(p_filter)) {
                columnNames = p_filter;
            } else {
                columnNames = args.splice(0);
            }

            return this._buildEntity(entity, callback, columnNames);
        };

        /**
         * 변경사항 허락 : commit
         */
        MetaTable.prototype.acceptChanges  = function() {
            this.rows.commit();
        };

        /**
         * 변경사항 취소 : rollback
         */
        MetaTable.prototype.rejectChanges  = function() {
            this.rows.rollback();
        };

        /**
         * 변경목록 얻기
         * @returns 
         */
        MetaTable.prototype.getChanges  = function() {
            return this.rows._transQueue.select();
        };

        return MetaTable;
    
    }(BaseEntity));
    
    //--------------------------------------------------------------
    // implementation
     var MetaTableCollection  = (function (_super) {
        /**
         * 테이블 컬렉션
         * @constructs _L.Meta.Entity.MetaTableCollection
         * @extends _L.Collection.PropertyCollection
         * @param {*} p_owner 소유자 
         */
        function MetaTableCollection(p_owner) {   // COVER:
            _super.call(this, p_owner);

            var _baseType = MetaTable;
            /**
             * 기본 생성 타입
             * @member {BaseColumnCollection} _L.Meta.Entity.MetaTableCollection#_baseType
             */
            Object.defineProperty(this, '_baseType', 
            {
                get: function() { return _baseType; },
                set: function(newValue) { 
                    if (!(typeof newValue === 'function')) Message.error('ES021', ['_baseType', 'function']);
                    if (!(new newValue('temp') instanceof MetaTable)) Message.error('ES032', ['_baseType', 'MetaTable']);
                    // if (!(newValue instanceof MetaElement && newValue.instanceOf('BaseEntity'))) {
                    //     Message.error('ES032', ['_baseType', 'BaseEntity']);
                    // }
                    _baseType = newValue;
                },
                configurable: false,
                enumerable: true
            });

            this._elemTypes = MetaTable;   // 컬렉션타입 설정

        }
        Util.inherits(MetaTableCollection, _super);

        MetaTableCollection._NS = 'Meta.Entity';    // namespace
        MetaTableCollection._PARAMS = ['_owner'];  // creator parameter

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // MetaTableCollection.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this._baseType, p_target._baseType)) return false;
        //     return true;
        // };

        /**
         * 테이블 컬렉션에 엔티티 추가한다.
         * @param {String | MetaColumn} p_any 
         * @returns {MetaColumn} 등록한 아이템
         */
        MetaTableCollection.prototype.add  = function(p_any) { // COVER:
            var table;
            var key;

            if (typeof p_any === 'string' && p_any.length > 0) {      
                key  = p_any;
                table = new this._baseType(key);
                table._metaSet = this._owner;
            } else if (p_any instanceof MetaTable) {
                key  = p_any.tableName;
                table = p_any;
                p_any._metaSet = this._owner;
            } else Message.error('ES021', ['object', 'string, MetaTable object']);

            // if (typeof key === 'undefined') Message.error('ES051', ['tableName']);
            if (this.existTableName(key)) Message.error('ES042', ['tableName', key]);

            _super.prototype.add.call(this, key, table);

            return this[key];
        };

        MetaTableCollection.prototype.existTableName  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].tableName === p_key) return true;
            }
            return false;
        };
        
        return MetaTableCollection;
    
    }(PropertyCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaTable = MetaTable;
        exports.MetaTableCollection = MetaTableCollection;
    } else {
        _global._L.MetaTable = MetaTable;
        _global._L.MetaTableCollection = MetaTableCollection;
        // namespace
        _global._L.Meta.Entity.MetaTable = MetaTable;
        _global._L.Meta.Entity.MetaTableCollection = MetaTableCollection;
    }

}(typeof window !== 'undefined' ? window : global));