/**
 * namespace _L.Meta.Entity.MetaSet
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var ISchemaControl;
    var IImportControl;
    var IExportControl;
    var ISerialize;
    var ITransaction;
    var MetaElement;
    var MetaEntity;
    var MetaTableCollection;
    var MetaViewCollection;
    var MetaRegistry;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
    _global._L.Meta.Entity          = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        ISchemaControl              = require('./i-control-schema').ISchemaControl;
        IImportControl              = require('./i-control-import').IImportControl;
        IExportControl              = require('./i-control-export').IExportControl;
        ISerialize                  = require('./i-serialize').ISerialize;
        ITransaction                = require('./i-transaction').ITransaction;
        MetaElement                 = require('./meta-element').MetaElement;
        MetaEntity                  = require('./meta-entity').MetaEntity;
        MetaTableCollection         = require('./meta-table').MetaTableCollection;
        MetaViewCollection          = require('./meta-view').MetaViewCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Common.Util;
        ISchemaControl              = _global._L.ISchemaControl;
        IImportControl              = _global._L.IImportControl;
        IExportControl              = _global._L.IExportControl;
        ISerialize                  = _global._L.ISerialize;
        ITransaction                = _global._L.ITransaction;
        MetaElement                 = _global._L.MetaElement;
        MetaEntity                  = _global._L.MetaEntity;
        MetaTableCollection         = _global._L.MetaTableCollection;
        MetaViewCollection          = _global._L.MetaViewCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof ISchemaControl === 'undefined') Message.error('ES011', ['ISchemaControl', 'i-control-schema']);
    if (typeof IImportControl === 'undefined') Message.error('ES011', ['IImportControl', 'i-control-import']);
    if (typeof IExportControl === 'undefined') Message.error('ES011', ['IExportControl', 'i-control-export']);
    if (typeof ISerialize === 'undefined') Message.error('ES011', ['ISerialize', 'i-serialize']);
    if (typeof ITransaction === 'undefined') Message.error('ES011', ['ITransaction', 'i-transaction']);
    if (typeof MetaElement === 'undefined') Message.error('ES011', ['MetaElement', 'meta-element']);
    if (typeof MetaEntity === 'undefined') Message.error('ES011', ['MetaEntity', 'meta-entity']);
    if (typeof MetaTableCollection === 'undefined') Message.error('ES011', ['MetaTableCollection', 'meta-table']);
    if (typeof MetaViewCollection === 'undefined') Message.error('ES011', ['MetaViewCollection', 'meta-view']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);

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
                get: function() { return this._name; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string') Message.error('ES021', ['setName', 'string']);
                    // setName = newValue;
                    this.__SET$_name(newValue, this);
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

            /**
             * 트랜젝션 사용 유무 (기본값: 사용 false)
             * @member {boolean}  _L.Meta.Entity.MetaSet#autoChanges
             */
            Object.defineProperty(this, 'autoChanges', {
                set: function(newValue) { 
                    if (typeof newValue !== 'boolean') {
                        Message.error('ES021', ['autoChanges', 'boolean']);
                    }
                    for (var i = 0; i < this.tables.count; i++) {
                        this.tables[i].rows.autoChanges = newValue;
                    }
                },
                configurable: false,
                enumerable: true
            });

            this.setName  = p_name || '';
            
            // this._implements(ISchemaControl, IAllControl);
            Util.implements(this, ISchemaControl, IImportControl, IExportControl, ITransaction, ISerialize);
        }
        Util.inherits(MetaSet, _super);

        MetaSet._NS = 'Meta.Entity';    // namespace
        MetaSet._PARAMS = ['name'];  // creator parameter

        // 3가지 타입 입력
        MetaSet._transformSchema  = function(p_oGuid) {
            var obj  = {
                tables: null,
                views: null
            };

            if (p_oGuid['tables'] || p_oGuid['views']) obj = p_oGuid;
            return transformSet(obj);

            // inner function
            function transformSet(p_oGuid) {
                var obj = {};
                if (p_oGuid['name']) obj['name'] = p_oGuid['name'];
                if (p_oGuid['tables']) obj['tables'] = transformTable(p_oGuid['tables']);
                if (p_oGuid['views']) obj['views'] = transformView(p_oGuid['views']);
                return obj;
            }
            function transformTable(p_oGuid) {
                var obj = {};
                for (var i = 0; i < p_oGuid['_elem'].length; i++) {
                    var table = p_oGuid['_elem'][i];
                    var key = p_oGuid['_key'][i] || table.name;
                    obj[key] = MetaEntity._transformSchema(table);
                }
                obj['$key'] = p_oGuid['_key'];
                return obj;
            }
            function transformView(p_oGuid) {
                var obj = {};
                for (var i = 0; i < p_oGuid['_elem'].length; i++) {
                    var view = p_oGuid['_elem'][i];
                    var key = p_oGuid['_key'][i] || view.name;
                    obj[key] = MetaEntity._transformSchema(view);
                }
                obj['$key'] = p_oGuid['_key'];
                return obj;
            }
        };
        MetaSet._isSchema  = function(p_oSch) {
            if (p_oSch === null || typeof p_oSch !== 'object') return false;
            if (p_oSch['tables'] || p_oSch['views']) return true;
            return false;
        };
        
        MetaSet.prototype._loadMetaSet = function(p_metaSet, p_option) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            var _this = this;

            if (!(p_metaSet instanceof MetaEntity)) Message.error('ES032', ['metaSet', 'MetaSet']);
            if (typeof opt !== 'number') Message.error('ES021', ['option', 'number']);

            if (p_metaSet.tables) loadEntity(p_metaSet.tables, this.tables); 
            if (p_metaSet.views) loadEntity(p_metaSet.views, this.views); 


            function loadEntity(p_target, p_orignal) {
                if (!(p_target instanceof MetaTableCollection || p_target instanceof MetaTableCollection )) {
                    Message.error('ES032', ['target', 'MetaTableCollection, MetaTableCollection']);
                }
                for (var i = 0; i < p_target.count; i++) {
                    var key = p_target.keyOf(i);
                    if (p_orignal.exist(key)) Message.error('ES046', ['collection', key]);
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
            var obj = _super.prototype.getObject.call(this, p_vOpt);

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
        MetaSet.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;
            
            this.setName = p_oGuid.setName;
            this.tables.setObject(p_oGuid.tables, origin);
            this.views.setObject(p_oGuid.views, origin);
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

        MetaSet.prototype.load = function(p_obj, p_parse) {
            var obj = p_obj;
            var mObj;

            if (p_obj instanceof MetaSet) Message.error('ES022', ['MetaSet']);

            if (typeof obj === 'string') {
                if (typeof p_parse === 'function') obj = p_parse(obj);
                else obj = JSON.parse(obj, null);
            }

            this.setObject(obj);
            // if (MetaRegistry.isGuidObject(obj)) {
            //     mObj = MetaRegistry.hasRefer(obj) ? MetaRegistry.transformRefer(obj) : p_obj;
            //     this.setObject(mObj);
            // } else Message.error('ES022', ['obj']);
        };

        MetaSet.prototype.output = function(p_stringify, p_space, p_vOpt) {
            var rObj = this.getObject(p_vOpt);
            var str;
            
            if (typeof p_stringify === 'function') str = p_stringify(rObj, {space: p_space} );
            else str = JSON.stringify(rObj, null, p_space);
            return str;
        };

        MetaSet.prototype.read  = function(p_obj, p_opt) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            
            if (typeof p_obj !== 'object') Message.error('ES021', ['obj', 'object']);
            if (typeof opt !== 'number') Message.error('ES021', ['opt', 'number']);

            if (p_obj instanceof MetaSet) {
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
            var _this = this;
            var metaSet = null;
            var obj;
            var entity;

            metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;
            obj = metaSet;

            if (MetaRegistry.isGuidObject(metaSet)) {
                if (MetaRegistry.hasRefer(metaSet)) metaSet = MetaRegistry.transformRefer(metaSet);
                obj = MetaSet._transformSchema(metaSet);
            } else if (!MetaSet._isSchema(obj)) Message.error('ES021', ['obj', 'object<Schema> | object<Guid>']);


            if (obj['tables']) {
                entity = obj['tables'];
                if (entity['$key'] && Array.isArray(entity['$key'])) {
                    for (var i = 0; i < entity['$key'].length; i++) {
                        addEntity(entity['$key'][i], entity, this.tables);
                    }
                } else for (var key in entity) addEntity(key, entity, this.tables);
            }
            if (obj['views']) {
                entity = obj['views'];
                if (entity['$key'] && Array.isArray(entity['$key'])) {
                    for (var i = 0; i < entity['$key'].length; i++) {
                        addEntity(entity['$key'][i], entity, this.views);
                    }
                } else for (var key in entity) addEntity(key, entity, this.views);
            }
            return;

            // inner funciton
            function addEntity(key, p_collec, p_baseCollec) {
                var prop;

                if (Object.hasOwnProperty.call(p_collec, key) && typeof p_collec[key] === 'object') {
                    prop = p_collec[key];
                    // if (prop['_metaSet'] && MetaRegistry.has(prop['_metaSet'])) {
                    //     prop['_metaSet'] = MetaRegistry.find(prop['_metaSet']);
                    // }
                    if (p_baseCollec.exist(key)) Message.error('ES046', ['entity', key]);
                    p_baseCollec.add(key);
                    
                    // POINT:
                    MetaRegistry.createSetObject(prop, p_baseCollec[key]); 
                    
                    p_baseCollec[key]._readSchema(p_collec[key], p_createRow, obj);                    
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

            if (typeof p_obj !== 'object') Message.error('ES021', ['obj', 'object']);
            
            metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;
            obj = metaSet;

            if (MetaRegistry.isGuidObject(metaSet)) {
                if (MetaRegistry.hasRefer(metaSet)) metaSet = MetaRegistry.transformRefer(metaSet);
                obj = MetaSet._transformSchema(metaSet);
            } else if (!MetaSet._isSchema(obj)) Message.error('ES021', ['obj', 'object<Schema> | object<Guid>']);


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

        // MetaSet.prototype.write  = function(p_vOpt) {
        //     var vOpt = p_vOpt || 0;
        //     var obj = { tables: {}, views: {} };
        //     var schema;
        //     var data;

        //     obj.setName = this.setName;
        //     // for(var i = 0; i < this.tables.count; i++) {
        //     //     var table = this.tables[i];
        //     //     var key = this.tables._keys[i];
        //     //     var tObj = table.writeSchema();
        //     //     tObj.rows = table.writeData().rows;
        //     //     obj.tables[key] = tObj;
        //     // }
        //     schema = this.writeSchema(vOpt);
        //     obj.tables = schema.tables;
        //     obj.views = schema.views;

        //     // obj.tables['_key'] = tObj['_key'];

        //     // for(var i = 0; i < this.views.count; i++) {
        //     //     var view = this.views[i];
        //     //     var key = this.views._keys[i];
        //     //     var vObj = view.writeSchema();
        //     //     vObj.rows = view.writeData().rows;
        //     //     obj.views[key] = vObj;
        //     // }

        //     for(var i = 0; i < this.tables.count; i++) {
        //         var table = this.tables[i];
        //         var key = this.tables._keys[i];
        //         obj.tables[key].rows = table.writeData(vOpt).rows;
        //     }
        //     for(var i = 0; i < this.views.count; i++) {
        //         var views = this.views[i];
        //         var key = this.views._keys[i];
        //         obj.views[key].rows = views.writeData(vOpt).rows;
        //     }

        //     return obj;
        // };
        // POINT:
        MetaSet.prototype.write  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var oSch;
            var oGuid = this.getObject(p_vOpt);

            return MetaSet._transformSchema(oGuid);
        };

        // MetaSet.prototype.writeSchema  = function(p_vOpt) {
        //     var vOpt = p_vOpt || 0;
        //     var obj = { tables: {}, views: {} };

        //     obj.setName = this.setName;
        //     for(var i = 0; i < this.tables.count; i++) {
        //         var table = this.tables[i];
        //         var key = this.tables._keys[i];
        //         obj.tables[key] = table.writeSchema(vOpt);
        //     }
        //     obj.tables['$key'] = [];
        //     for (var i = 0; i < this.tables['_keys'].length; i++) {
        //         var key = this.tables['_keys'][i];
        //         obj.tables['$key'].push(key);
        //     }

        //     for(var i = 0; i < this.views.count; i++) {
        //         var view = this.views[i];
        //         var key = this.views._keys[i];
        //         obj.views[key] = view.writeSchema(vOpt);
        //     }
        //     obj.views['$key'] = [];
        //     for (var i = 0; i < this.views['_keys'].length; i++) {
        //         var key = this.views['_keys'][i];
        //         obj.views['$key'].push(key);
        //     }
        //     return obj;
        // };
        // POINT:
        MetaSet.prototype.writeSchema  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var schema = this.write(vOpt);
            
            for (var prop in schema.tables) {
                if (prop.indexOf('$') < 0) schema.tables[prop].rows = [];
            }
            for (var prop in schema.views) {
                if (prop.indexOf('$') < 0) schema.views[prop].rows = [];
            }
            return schema;
            
        };

        // MetaSet.prototype.writeData  = function(p_vOpt) {
        //     var vOpt = p_vOpt || 0;
        //     var obj = { tables: {}, views: {} };

        //     obj.setName = this.setName;
        //     for(var i = 0; i < this.tables.count; i++) {
        //         var table = this.tables[i];
        //         var key = this.tables._keys[i];
        //         obj.tables[key] = table.writeData(vOpt);
        //     }
        //     for(var i = 0; i < this.views.count; i++) {
        //         var view = this.views[i];
        //         var key = this.views._keys[i];
        //         obj.views[key] = view.writeData(vOpt);
        //     }
        //     return obj;
        // };
        // POINT:
        MetaSet.prototype.writeData  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var schema = this.write(vOpt);

            for (var prop in schema.tables) {
                if (prop.indexOf('$') < 0) schema.tables[prop].columns = {};
            }
            for (var prop in schema.views) {
                if (prop.indexOf('$') < 0) schema.views[prop].columns = {};
            }
            // schema.columns = {};
            return schema;
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