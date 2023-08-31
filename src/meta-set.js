/**
 * namespace _L.Meta.Entity.MetaSet
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var ISchemaControl;
    var IAllControl;
    var ITransaction;
    var MetaElement;
    var MetaEntity;
    var MetaTableCollection;
    var MetaViewCollection;
    var MetaRegistry;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L               = _global._L || {};
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                    = require('./util');
        ISchemaControl          = require('./i-control-schema').ISchemaControl;
        IAllControl             = require('./i-control-all').IAllControl;
        ITransaction            = require('./i-transaction').ITransaction;
        MetaElement             = require('./meta-element').MetaElement;
        MetaEntity              = require('./meta-entity').MetaEntity;
        MetaTableCollection     = require('./meta-table').MetaTableCollection;
        MetaViewCollection      = require('./meta-view').MetaViewCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Util                    = _global._L.Common.Util;
        ISchemaControl          = _global._L.ISchemaControl;
        IAllControl             = _global._L.IAllControl;
        ITransaction            = _global._L.ITransaction;
        MetaElement             = _global._L.MetaElement;
        MetaEntity              = _global._L.MetaEntity;
        MetaTableCollection     = _global._L.MetaTableCollection;
        MetaViewCollection      = _global._L.MetaViewCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof ISchemaControl === 'undefined') throw new Error('[ISchemaControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');
    if (typeof ITransaction === 'undefined') throw new Error('[ITransaction] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof MetaEntity === 'undefined') throw new Error('[MetaEntity] module load fail...');
    if (typeof MetaTableCollection === 'undefined') throw new Error('[MetaTableCollection] module load fail...');
    if (typeof MetaViewCollection === 'undefined') throw new Error('[MetaViewCollection] module load fail...');
    if (typeof MetaRegistry === 'undefined') throw new Error('[MetaRegistry] module load fail...');

    //==============================================================
    // 4. module implementation   
    var MetaSet  = (function (_super) {
        /**
         * 엔티티
         * @constructs _L.Meta.Entity.MetaSet
         * @extends _L.Meta.MetaElement
         * @implements {_L.Interface.ISchemaControl}
         * @implements {_L.Interface.IAllControl}
         * @implements {_L.Interface.ITransaction}
         * @param {*} p_name 
         */
        function MetaSet(p_name) {
            _super.call(this, p_name);

            var setName;
            var tables = new MetaTableCollection(this);
            var views  = new MetaViewCollection(this);

            /**
             * 테이블 이름
             * @member {string} _L.Meta.Entity.MetaSet#setName
             */
            Object.defineProperty(this, 'setName', 
            {
                get: function() { return setName; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string') throw new Error('Only [setName] type "string" can be added');
                    setName = newValue;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 트랜젝션 사용 유무 (기본값: 사용 false)
             * @member {boolean}  _L.Meta.Entity.MetaSet#autoChanges
             */
            Object.defineProperty(this, 'autoChanges', {
                set: function(newValue) { 
                    if (typeof newValue !== 'boolean') {
                        throw new Error('Only [autoChanges] type "boolean" can be added');
                    }
                    for (var i = 0; i < this.tables.count; i++) {
                        this.tables[i].rows.autoChanges = newValue;
                    }
                },
                configurable: false,
                enumerable: true
            });

            
            /**
             * 메타 테이블 컬렉션
             * @member {MetaTableCollection} _L.Meta.Entity.MetaSet#tables
             */
            Object.defineProperty(this, 'tables', 
            {
                get: function() { return tables; },
                configurable: false,
                enumerable: true
            });
            
            /**
             * 메타 뷰 컬렉션
             * @member {MetaViewCollection} _L.Meta.Entity.MetaSet#views
             */
            Object.defineProperty(this, 'views', 
            {
                get: function() { return views; },
                configurable: false,
                enumerable: true
            });

            this.setName  = p_name || '';
            
            // this._implements(ISchemaControl, IAllControl);
            Util.implements(this, ISchemaControl, IAllControl, ITransaction);
        }
        Util.inherits(MetaSet, _super);

        MetaSet._NS = 'Meta.Entity';    // namespace
        MetaSet._PARAMS = ['name'];  // creator parameter

        // 3가지 타입 입력
        MetaSet._transformObject  = function(mObj) {
            var obj  = {
                tables: null,
                views: null
            };

            if (mObj['tables'] || mObj['views']) obj = mObj;
            return transformSet(obj);

            // inner function
            function transformSet(mObj) {
                var obj = {};
                if (mObj['name']) obj['name'] = mObj['name'];
                if (mObj['tables']) obj['tables'] = transformTable(mObj['tables']);
                if (mObj['views']) obj['views'] = transformView(mObj['views']);
                return obj;
            }
            function transformTable(mObj) {
                var obj = {};
                for (var i = 0; i < mObj['_elem'].length; i++) {
                    var table = mObj['_elem'][i];
                    var key = mObj['_key'][i] || table.name;
                    obj[key] = MetaEntity._transformObject(table);
                }
                return obj;
            }
            function transformView(mObj) {
                var obj = {};
                for (var i = 0; i < mObj['_elem'].length; i++) {
                    var view = mObj['_elem'][i];
                    var key = mObj['_key'][i] || view.name;
                    obj[key] = MetaEntity._transformObject(view);
                }
                return obj;
            }
        };
        
        MetaSet.prototype._loadMetaSet = function(p_metaSet, p_option) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            var _this = this;

            if (!(p_metaSet instanceof MetaEntity)) throw new Error('Only [p_metaSet] type "MetaEntity" can be added');
            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');

            if (p_metaSet.tables) loadEntity(p_metaSet.tables, this.tables); 
            if (p_metaSet.views) loadEntity(p_metaSet.views, this.views); 


            function loadEntity(p_target, p_orignal) {
                if (!(p_target instanceof MetaTableCollection || p_target instanceof MetaViewCollection )) {
                    throw new Error('[p_target] 컬렉션이 아닙니다.');
                }
                for (var i = 0; i < p_target.count; i++) {
                    var key = p_target.keyOf(i);
                    if (p_orignal.exist(key))  throw new Error('기존에 entity 가 존재합니다.');
                    p_orignal._loadEntity(p_target[i], opt);
                }
            }
        };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaSet.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this);

            obj.setName = this.setName;
            obj.tables = this.tables.getObject(p_vOpt);
            obj.views = this.views.getObject(p_vOpt);
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        MetaSet.prototype.setObject  = function(mObj) {
            _super.prototype.setObject.call(this, mObj);
            
            this.setName = mObj.setName;
            this.tables = mObj.columns;
            this.views = mObj.rows;
        };


        MetaSet.prototype.clone  = function() {
            var clone = new MetaSet(this.setName);

            for(var i = 0; i < this.tables.count; i++) {
                clone.tables.add(this.tables[i].clone());
            }

            for(var i = 0; i < this.views.count; i++) {
                clone.views.add(this.views[i].clone());
            }
            return clone;
        };

        
        MetaSet.prototype.clear  = function() {
            for(var i = 0; i < this.tables.count; i++) this.tables[i].clear();
            for(var i = 0; i < this.views.count; i++) this.views[i].clear();
        };
        
        MetaSet.prototype.reset  = function() {
            this.tables.clear();
            this.views.clear();
        };
        
        MetaSet.prototype.load  = function(p_target, p_opt) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;

            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');
            
            if (p_target instanceof MetaSet) {
                this._loadMetaSet(p_target, opt);
            } else if (typeof p_target === 'object') {
                this.read(p_target, opt);
            } else {
                throw new Error('[p_target] 처리할 수 없는 타입입니다. ');
            }
        };

        MetaSet.prototype.output = function(p_obj) {
            console.log('구현해야함');  // COVER:
        };

        
        // MetaSet.prototype.read  = function(p_obj, p_opt) {
        //     var metaSet = null;
        //     var opt = typeof p_option === 'undefined' ? 3 : p_option;
            
        //     if (typeof p_obj !== 'object') throw new Error('Only [p_obj] type "object" can be added');
        //     if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');

            
        //     metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;

        //     if (opt % 2 === 1) this.readSchema(p_obj, opt === 3 ? true : false); // opt: 1, 3
        //     if (Math.floor(opt / 2) >= 1) this.readData(p_obj); // opt: 2, 3
        // };

        MetaSet.prototype.read  = function(p_obj, p_opt) {
            var metaSet = null;
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            
            if (typeof p_obj !== 'object') throw new Error('Only [p_obj] type "object" can be added');
            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');

            if (p_obj instanceof MetaEntity) {
                if (p_obj.setName && p_obj.setName.length > 0) this.setName = p_obj.setName;
                for (var i = 0; i < this.tables.count; i++) {
                    this.tables[i]._readEntity(p_obj, p_opt);
                }
                for (var i = 0; i < this.views.count; i++) {
                    this.views[i]._readEntity(p_obj, p_opt);
                }
            } else if (typeof p_obj === 'object') {
                // metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;
                if (opt % 2 === 1) this.readSchema(p_obj, opt === 3 ? true : false); // opt: 1, 3
                if (Math.floor(opt / 2) >= 1) this.readData(p_obj); // opt: 2, 3
            }
            
        };

        

        MetaSet.prototype.readSchema  = function(p_obj, p_createRow) {
            var metaSet = null;
            var obj;

            metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;

            if (MetaRegistry.isGuidObject(metaSet)) {
                if (MetaRegistry.hasReferObject(metaSet)) metaSet = MetaRegistry.transformRefer(metaSet);
                obj = MetaSet._transformObject(metaSet);
            } else obj = metaSet;

            if (obj['tables']) createEntity(obj['tables'], this.tables);
            if (obj['views']) createEntity(obj['views'], this.views);
            return;

            // inner funciton
            function createEntity(p_entity, p_collec) {
                for (var key in p_entity) {
                    if (Object.hasOwnProperty.call(p_entity, key)) {
                        if (p_collec.exist(key)) throw new Error('"'+ key +'"가 존재하여, entity를 추가 할 수 없습니다.');
                        p_collec.add(key);
                        p_collec[key].readSchema(p_entity[key], p_createRow);
                    }
                }
            }
        };

        /**
         * row 들을 불러 온다
         * @param {object} p_obj object
         */
        MetaSet.prototype.readData  = function(p_obj) {
            var metaSet = null;
            var obj;
            var rows;

            if (typeof p_obj !== 'object') throw new Error('Only [p_obj] type "object" can be added');
            
            metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;


            if (MetaRegistry.isGuidObject(metaSet)) {
                if (MetaRegistry.hasReferObject(metaSet)) metaSet = MetaRegistry.transformRefer(metaSet);
                obj = MetaSet._transformObject(metaSet);
            } else obj = metaSet;

            // metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;
            
            if (obj['tables']) createRow(obj['tables'], this.tables);
            if (obj['views']) createRow(obj['views'], this.views);

            function createRow(p_entity, p_collec) {
                for (var key in p_entity) {
                    if (Object.hasOwnProperty.call(p_entity, key) && p_collec.exist(key)) {
                        p_collec[key].readData(p_entity[key]);
                    }
                }
            }
        };

        MetaSet.prototype.write  = function() {
            console.log('구현해야함');  // COVER:
        };
        
        MetaSet.prototype.writeSchema  = function() {
            console.log('구현해야함');  // COVER:
            // TODO: 참조 존재시 오류 또는 "경고"
        };

        MetaSet.prototype.writeData  = function() {
            console.log('구현해야함');  // COVER:
        };


        MetaSet.prototype.acceptChanges  = function() {
            for (let i = 0; i < this.tables.count; i++) {
                this.tables[i].acceptChanges();                
            }
        };
        
        MetaSet.prototype.rejectChanges  = function() {
            for (let i = 0; i < this.tables.count; i++) {
                this.tables[i].rejectChanges();                
            }
        };
        
        // MetaSet.prototype.getChanges  = function() {
        //     var arr = {tables: {}};

        //     for (let i = 0; i < this.tables.count; i++) {
        //         var table = this.tables[i];
        //         if (table.getChanges().length > 0) {
        //             arr.tables[table.tableName] = table.getChanges();
        //         }
        //     }
        //     return arr;
        // };
        
        MetaSet.prototype.hasChanges  = function() {
            for (let i = 0; i < this.tables.count; i++) {
                var table = this.tables[i];
                if (table.getChanges().length > 0) return true;
            }
            return false;
        };

        return MetaSet;
    
    }(MetaElement));
    

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaSet = MetaSet;
    } else {
        _global._L.MetaSet = MetaSet;
        _global._L.Meta.Entity.MetaSet = MetaSet;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));