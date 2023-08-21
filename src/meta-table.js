/**
 * namespace _L.Meta.Entity.MetaTable
 * namespace _L.Meta.Entity.MetaTableCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaEntity;
    var PropertyCollection;
    var MetaTableColumnCollection;
    // var MetaRegistry;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                        = require('./util');
        PropertyCollection          = require('./collection-property').PropertyCollection;
        MetaEntity                  = require('./meta-entity').MetaEntity;
        MetaTableColumnCollection   = require('./meta-column').MetaTableColumnCollection;
        // MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {    
        Util                        = _global._L.Util;
        PropertyCollection          = _global._L.PropertyCollection;
        MetaEntity                  = _global._L.MetaEntity;
        MetaTableColumnCollection   = _global._L.MetaTableColumnCollection;
        // MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof PropertyCollection === 'undefined') throw new Error('[PropertyCollection] module load fail...');
    if (typeof MetaEntity === 'undefined') throw new Error('[MetaEntity] module load fail...');
    if (typeof MetaTableColumnCollection === 'undefined') throw new Error('[MetaTableColumnCollection] module load fail...');
    // if (typeof MetaRegistry === 'undefined') throw new Error('[MetaRegistry] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaTable  = (function (_super) {
        /**
         * 테이블 엔티티
         * @constructs _L.Meta.Entity.MetaTable
         * @extends _L.Meta.Entity.MetaEntity
         * @param {*} p_name 
         */
        function MetaTable(p_name) {
            _super.call(this, p_name);

            var tableName;
            var columns = new MetaTableColumnCollection(this);

            /**
             * 테이블 이름
             * @member {string} _L.Meta.Entity.MetaTable#tableName
             */
            Object.defineProperty(this, 'tableName', 
            {
                get: function() { return tableName; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string') throw new Error('Only [tableName] type "string" can be added');
                    if (this.metaSet && this.metaSet.tables.existTableName(newValue)) throw new Error('tableName 중복 발생!!');
                    tableName = newValue;
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
                // set: function(newValue) { 
                //     if (!(newValue instanceof MetaTableColumnCollection)) throw new Error('Only [columns] type "MetaTableColumnCollection" can be added');
                //     columns = newValue;
                // },
                configurable: false,
                enumerable: true
            });
            

            this.tableName  = p_name || '';
        }
        Util.inherits(MetaTable, _super);

        // /** @override **/
        // MetaTable.prototype.getTypes  = function() {
        //     var type = ['MetaTable'];
            
        //     return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        // };

        // /** @override */
        // MetaTable.prototype.getObject = function() {
        //     // TODO::
        // };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaTable.prototype.getObject  = function() {
            var obj = _super.prototype.getObject.call(this);

            obj.tableName = this.tableName;
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        MetaTable.prototype.setObject  = function(mObj) {
            _super.prototype.setObject.call(this, mObj);
            
            if(mObj.metaSet) this.metaSet = mObj.metaSet;
            this.columns.setObject(mObj.columns);
            this.rows.setObject(mObj.rows);
            this.tableName = mObj.tableName;
        };

        /**
         * 테이블 엔티티를 복제한다.
         * @returns {*}
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

        // MetaView.prototype.select  = function(p_filter, p_args) {
        //     var args = Array.prototype.slice.call(arguments);
        //     var items = [];
        //     var callback = null;
        //     var columnName;
        //     var view = new MetaView('select', this);
        //     var orignal = this.clone();

        //     // 매개변수 구성
        //     if (typeof p_filter === 'function') {
        //         callback = p_filter;
        //         if (Array.isArray(p_args)) items = p_args;
        //         else if (args.length > 1) items = args.splice(1);
        //     } else if (typeof p_filter === 'string') {
        //         items = args;
        //     } else if (Array.isArray(p_filter)) {
        //         items = p_filter;
        //     }

        //     return this._select(view, callback, items);
        // };

        /**
         * 엔티티를 복사한다. (조회 후 복제)
         * @param {*} p_filter 
         * @param {*} p_index 
         * @param {*} p_end 
         */
        // MetaTable.prototype.copy  = function(p_filter, p_index, p_end) {
        //     var entity = this.select(p_filter, p_index, p_end);

        //     return entity.clone();
        // };

        MetaTable.prototype.copy  = function(p_filter, p_args) {
            var args = Array.prototype.slice.call(arguments);
            var _this = this;
            // var MetaView                    = require('./meta-view').MetaView;
            var items = [];
            var callback = null;
            var columnName;
            var entity = new MetaTable(this.tableName, this);
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

            // return this._buildEntity(table, callback, items);
            return this._buildEntity(entity, callback, items).clone();
        };



        MetaTable.prototype.acceptChanges  = function() {
            this.rows.commit();
        };
        MetaTable.prototype.rejectChanges  = function() {
            this.rows.rollback();
        };
        MetaTable.prototype.getChanges  = function() {
            return this.rows._transQueue.select();
        };

        return MetaTable;
    
    }(MetaEntity));
    

     //---------------------------------------
     var MetaTableCollection  = (function (_super) {
        /**
         * 테이블 컬렉션
         * @constructs _L.Meta.Entity.MetaTableCollection
         * @extends _L.Collection.PropertyCollection
         * @param {*} p_owner 소유자 
         */
        function MetaTableCollection(p_owner) {   // COVER:
            _super.call(this, p_owner);

            this.elementType = MetaTable;   // 컬렉션타입 설정
        }
        Util.inherits(MetaTableCollection, _super);

        /**
         * 테이블 컬렉션에 엔티티 추가한다.
         * @param {String | MetaColumn} p_object 
         * @returns {MetaColumn} 등록한 아이템
         */
        MetaTableCollection.prototype.add  = function(p_object) { // COVER:
            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new MetaTable(i_name);
                i_value.metaSet = this._owner;
            } else if (p_object instanceof MetaTable) {
                i_name  = p_object.tableName;
                i_value = p_object;
                p_object.metaSet = this._owner;
            } else {
                throw new Error('string | MetaTable object [p_object].');
            }

            if (typeof i_name === 'undefined') throw new Error('There is no required value [p_name].');
            if (this.existTableName(i_name)) throw new Error('tableName 중복 발생!!');

            _super.prototype.add.call(this, i_name, i_value);

            return this[i_name];
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