/**
 * namespace _L.Meta.Entity.MetaSet
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Util;
    var ISchemaControl;
    var IImportControl;
    var IExportControl;
    var ISerialize;
    var ITransaction;
    var MetaElement;
    var BaseEntity;
    var MetaTableCollection;
    var MetaViewCollection;
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
        Util                        = require('./util');
        ISchemaControl              = require('./i-control-schema').ISchemaControl;
        IImportControl              = require('./i-control-import').IImportControl;
        IExportControl              = require('./i-control-export').IExportControl;
        ISerialize                  = require('./i-serialize').ISerialize;
        ITransaction                = require('./i-transaction').ITransaction;
        MetaElement                 = require('./meta-element').MetaElement;
        BaseEntity                  = require('./base-entity').BaseEntity;
        MetaTableCollection         = require('./meta-table').MetaTableCollection;
        MetaViewCollection          = require('./meta-view').MetaViewCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Common.Util;
        ISchemaControl              = _global._L.ISchemaControl;
        IImportControl              = _global._L.IImportControl;
        IExportControl              = _global._L.IExportControl;
        ISerialize                  = _global._L.ISerialize;
        ITransaction                = _global._L.ITransaction;
        MetaElement                 = _global._L.MetaElement;
        BaseEntity                  = _global._L.BaseEntity;
        MetaTableCollection         = _global._L.MetaTableCollection;
        MetaViewCollection          = _global._L.MetaViewCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof ISchemaControl === 'undefined') throw new Error(Message.get('ES011', ['ISchemaControl', 'i-control-schema']));
    if (typeof IImportControl === 'undefined') throw new Error(Message.get('ES011', ['IImportControl', 'i-control-import']));
    if (typeof IExportControl === 'undefined') throw new Error(Message.get('ES011', ['IExportControl', 'i-control-export']));
    if (typeof ISerialize === 'undefined') throw new Error(Message.get('ES011', ['ISerialize', 'i-serialize']));
    if (typeof ITransaction === 'undefined') throw new Error(Message.get('ES011', ['ITransaction', 'i-transaction']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaElement === 'undefined') throw new Error(Message.get('ES011', ['MetaElement', 'meta-element']));
    if (typeof BaseEntity === 'undefined') throw new Error(Message.get('ES011', ['BaseEntity', 'base-entity']));
    if (typeof MetaTableCollection === 'undefined') throw new Error(Message.get('ES011', ['MetaTableCollection', 'meta-table']));
    if (typeof MetaViewCollection === 'undefined') throw new Error(Message.get('ES011', ['MetaViewCollection', 'meta-view']));

    //==============================================================
    // 4. module implementation   
    var MetaSet  = (function (_super) {
        /**
         * 메타셋
         * @constructs _L.Meta.Entity.MetaSet
         * @extends _L.Meta.MetaElement
         * @implements {_L.Interface.ISchemaControl}
         * @implements {_L.Interface.IImportControl}
         * @implements {_L.Interface.IExportControl}
         * @implements {_L.Interface.ITransaction}
         * @implements {_L.Interface.ISerialize}
         * @param {string} p_name 
         */
        function MetaSet(p_name) {
            _super.call(this, p_name);

            var tables = new MetaTableCollection(this);
            var views  = new MetaViewCollection(this);

            /**
             * 테이블 이름
             * @member {string} _L.Meta.Entity.MetaSet#setName
             */
            Object.defineProperty(this, 'setName', 
            {
                get: function() { return this._name; },
                set: function(nVal) { 
                    if (typeof nVal !== 'string') throw new ExtendError(/ES021/, null, ['setName', 'string']);
                    this.__SET$_name(nVal, this);
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 메타 테이블 컬렉션
             * @readonly
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
             * @readonly
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
                set: function(nVal) { 
                    if (typeof nVal !== 'boolean') {
                        throw new ExtendError(/ES021/, null, ['autoChanges', 'boolean']);
                    }
                    for (var i = 0; i < this.tables.count; i++) {
                        this.tables[i].rows.autoChanges = nVal;
                    }
                },
                configurable: false,
                enumerable: true
            });

            Util.implements(MetaSet, this);
        }
        Util.inherits(MetaSet, _super);
        
        MetaSet._UNION = [ISchemaControl, IImportControl, IExportControl, ITransaction, ISerialize];
        MetaSet._NS = 'Meta.Entity';    // namespace
        MetaSet._PARAMS = ['name'];     // creator parameter

        // local funciton
        function _isObject(obj) {
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }
        function _isSchema(obj) {    // 객체 여부
            if (!_isObject(obj)) return false;
            if (_isObject(obj['tables']) || _isObject(obj['views'])) return true;
            return false;
        }
        
        /**
         * 메타셋 스카마 객체로 변환
         * @param {object} p_oGuid getObject()로 얻은 객체
         * @returns {object}
         */
        MetaSet.transformSchema  = function(p_oGuid) {
            var obj = {};

            if (!_isSchema(p_oGuid)) { 
                throw new ExtendError(/ES021/, null, ['transformSchema(obj)', '{tables: ... , views: ...}']);
            }

            obj['name'] = p_oGuid['name']; 
            obj['tables'] = transformTable(p_oGuid['tables']);
            obj['views'] = transformView(p_oGuid['views']);   
            
            return obj;

            // inner function
            function transformTable(p_oGuid) {
                var obj = {};
                for (var i = 0; i < p_oGuid['_elem'].length; i++) {
                    var table = p_oGuid['_elem'][i];
                    var key = p_oGuid['_key'][i]; 
                    obj[key] = BaseEntity.transformSchema(table);
                }
                obj['$key'] = p_oGuid['_key'];
                return obj;
            }
            function transformView(p_oGuid) {
                var obj = {};
                for (var i = 0; i < p_oGuid['_elem'].length; i++) {
                    var view = p_oGuid['_elem'][i];
                    var key = p_oGuid['_key'][i]; 
                    obj[key] = BaseEntity.transformSchema(view);
                }
                obj['$key'] = p_oGuid['_key'];
                return obj;
            }
        };
        

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
        MetaSet.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            obj['setName'] = this.setName;
            obj['tables'] = this.tables.getObject(vOpt, owned);
            obj['views'] = this.views.getObject(vOpt, owned);
            return obj;                        
        };

        /**
         * 현재 객체를 초기화 후, 지정한 guid 타입의 객체를 사용하여 설정합니다.   
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object?} p_origin 현재 객체를 설정하는 원본 guid 객체  
         * 기본값은 p_oGuid 객체와 동일
         */
        MetaSet.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);

            var origin = p_origin ? p_origin : p_oGuid;
            
            this.setName = p_oGuid['setName'];
            this.tables.setObject(p_oGuid['tables'], origin);
            this.views.setObject(p_oGuid['views'], origin);
        };

        /**
         * 메타셋 복제
         * @returns {MetaSet}
         */
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
        
        /**
         * 모든 view 와 모든 table 의 row 를 초기화
         */
        MetaSet.prototype.clear  = function() {
            for(var i = 0; i < this.tables.count; i++) this.tables[i].clear();
            for(var i = 0; i < this.views.count; i++) this.views[i].clear();
        };
        
        /**
         * 전체 초기화
         */
        MetaSet.prototype.reset  = function() {
            this.tables.clear();
            this.views.clear();
        };

        /**
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 기존을 초기화 하고 불러오는 역활
         * @param {object | string} p_obj 불러오기 대상
         * @param {function?} p_parse 파서
         */
        MetaSet.prototype.load = function(p_obj, p_parse) {
            var obj = p_obj;
            var mObj;

            if (p_obj instanceof MetaSet) throw new ExtendError(/ES022/, null, ['MetaSet']);

            if (typeof obj === 'string') {
                if (typeof p_parse === 'function') obj = p_parse(obj);
                else obj = JSON.parse(obj, null);
            }
            
            if (!_isObject(obj)) throw new ExtendError(/ES021/, null, ['obj', 'object']);
            
            this.setObject(obj);
        };

        MetaSet.prototype.load._TYPE = { params: String };

        /**
         * 메타셋 객체 출력(직렬화)
         * @param {number?} p_vOpt 옵션 (0, 1, 2)
         * @param {function?} p_stringify 
         * @param {string?} p_space 
         * @returns {string}
         */
        MetaSet.prototype.output = function(p_vOpt, p_stringify, p_space) {
            var rObj = this.getObject(p_vOpt);
            var str;
            
            if (typeof p_stringify === 'function') str = p_stringify(rObj, {space: p_space} );
            else str = JSON.stringify(rObj, null, p_space);
            return str;
        };

        /**
         * object 로 로딩하기   
         * JSON 스키마 규칙   
         * { table: { columns: {}, rows: {} }}   
         * { columns: {...}, rows: {} }
         * @param {object} p_obj mObject 또는 rObject 또는 entity
         * @param {Number?} p_option 기본값  = 3
         * @param {Number} p_option.1 컬럼(구조)만 가져온다. 
         * @param {Number} p_option.2 로우(데이터)만 가져온다 (컬럼 참조)  
         * @param {Number} p_option.3 컬럼/로우를 가져온다. 로우만 존재하면 로우 이름의 빈 컬럼을 생성한다. 
         */
        MetaSet.prototype.read  = function(p_obj, p_opt) {
            var opt = typeof p_opt === 'undefined' ? 3 : p_opt;
            var entity;

            if (typeof p_obj !== 'object' || p_obj === null) throw new ExtendError(/ES021/, null, ['obj', 'object']);
            if (typeof opt !== 'number') throw new ExtendError(/ES021/, null, ['opt', 'number']);

            if (p_obj instanceof MetaSet) {
                this.setName = p_obj.setName;

                for (var i = 0; i < p_obj.tables.count; i++) {
                    var key = p_obj.tables.keyOf(i);
                    if (this.tables.indexOf(key, 1) < 0) this.tables.add(key);
                    entity = this.tables[key];
                    entity._readEntity(p_obj.tables[key], p_opt);
                }
                for (var i = 0; i < p_obj.views.count; i++) {
                    var key = p_obj.views.keyOf(i);
                    if (this.views.indexOf(key, 1) < 0) this.views.add(key);
                    entity = this.views[key];
                    entity._readEntity(p_obj.views[key], p_opt);
                }
            } else {
                if (opt % 2 === 1) this.readSchema(p_obj, opt === 3 ? true : false); // opt: 1, 3
                if (Math.floor(opt / 2) >= 1) this.readData(p_obj); // opt: 2, 3
            }
        };
        
        /**
         * 없으면 빈 컬럼을 생성해야 하는지?  
         * 이경우에 대해서 명료하게 처리햐야함 !!  
         * @param {object} p_obj object<Schema> | object<Guid>
         * @param {boolean} p_createRow true 이면, row[0] 기준으로 컬럼을 추가함
         */
        MetaSet.prototype.readSchema  = function(p_obj, p_createRow) {
            var _this = this;
            var metaSet = null;
            var obj;
            var entity;

            if (!_isObject(p_obj)) throw new ExtendError(/ES021/, null, ['obj', 'object']);

            metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;

            if (MetaRegistry.isGuidObject(metaSet)) {
                // if (MetaRegistry.hasRefer(metaSet)) metaSet = MetaRegistry.transformRefer(metaSet);  // 참조가 기본 존재함
                metaSet = MetaRegistry.transformRefer(metaSet);
                obj = MetaSet.transformSchema(metaSet);
            } else obj = metaSet;

            if (!_isSchema(obj)) throw new ExtendError(/ES021/, null, ['obj', 'object<Schema> | object<Guid>']);

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
                var prop = p_collec[key];
                if (!p_baseCollec.exist(key)) p_baseCollec.add(key);
                MetaRegistry.createSetObject(prop, p_baseCollec[key]);                 
                p_baseCollec[key]._readSchema(p_collec[key], p_createRow, obj);                    
            }
        };

        /**
         * row 들을 불러 온다
         * @param {object} p_obj object
         */
        MetaSet.prototype.readData  = function(p_obj) {
            var metaSet = null;
            var obj;

            if (!_isObject(p_obj)) throw new ExtendError(/ES021/, null, ['obj', 'object']);
            
            metaSet = p_obj['metaSet'] || p_obj['dataSet'] || p_obj;
            
            if (MetaRegistry.isGuidObject(metaSet)) {
                // if (MetaRegistry.hasRefer(metaSet)) metaSet = MetaRegistry.transformRefer(metaSet);
                metaSet = MetaRegistry.transformRefer(metaSet);
                obj = MetaSet.transformSchema(metaSet);
            } else obj = metaSet;

            if (!_isSchema(obj)) throw new ExtendError(/ES021/, null, ['obj', 'object<Schema> | object<Guid>']);
            
            if (_isObject(obj['tables'])) createRow(obj['tables'], this.tables);
            if (_isObject(obj['views'])) createRow(obj['views'], this.views);

            function createRow(p_entity, p_collec) {
                for (var key in p_entity) {
                    if (Object.hasOwnProperty.call(p_entity, key) && p_collec.exist(key)) {
                        p_collec[key].readData(p_entity[key]);
                    }
                }
            }
        };

        /**
         * 메타셋을 스키마 타입의 객체로 쓰기(내보내기)
         * @param {number} p_vOpt 
         * @returns {object} 스키마 타입
         */
        MetaSet.prototype.write  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var oSch;
            var oGuid = this.getObject(p_vOpt);

            return MetaSet.transformSchema(oGuid);
        };

        /**
         * 메타셋 스키마(컬럼)을 스키마 타입의 객체로 쓰기
         * @param {number} p_vOpt 
         * @returns {object} 스키마 타입
         */
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

        /**
         * 메타셋 데이터(로우)를 스키마 타입의 객체로 쓰기
         * @param {number} p_vOpt 
         * @returns {object} 스키마 타입
         */
        MetaSet.prototype.writeData  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var schema = this.write(vOpt);

            for (var prop in schema.tables) {
                if (prop.indexOf('$') < 0) schema.tables[prop].columns = {};
            }
            for (var prop in schema.views) {
                if (prop.indexOf('$') < 0) schema.views[prop].columns = {};
            }
            return schema;
        };

        /**
         * 메타테이블의 변경사항 허락 : commit
         */
        MetaSet.prototype.acceptChanges  = function() {
            for (let i = 0; i < this.tables.count; i++) {
                this.tables[i].acceptChanges();                
            }
        };
        
        /**
         * 메타테이블의 변경사항 취소 : rollback
         */
        MetaSet.prototype.rejectChanges  = function() {
            for (let i = 0; i < this.tables.count; i++) {
                this.tables[i].rejectChanges();                
            }
        };
        
        /**
         * 메타테이블들의 변경 유무
         * @returns {boolean} 변경 여부
         */
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