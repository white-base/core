/**
 * namespace _L.Meta.Entity.Entity
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Util;
    var MetaObject;
    var MetaElement;
    var IGroupControl;
    var ISchemaControl;
    var IImportControl;
    var IExportControl;
    var ISerialize;
    var MetaRowCollection;
    var MetaRow;
    var BaseColumnCollection;
    var MetaRegistry;

    //==============================================================
    // 1. namespace declaration
    _global._L                  = _global._L || {};
    _global._L.Meta             = _global._L.Meta || {};
    _global._L.Meta.Entity      = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
        IGroupControl               = require('./i-control-group').IGroupControl;
        ISchemaControl              = require('./i-control-schema').ISchemaControl;
        IImportControl              = require('./i-control-import').IImportControl;
        IExportControl              = require('./i-control-export').IExportControl;
        ISerialize                  = require('./i-serialize').ISerialize;
        MetaObject                  = require('./meta-object').MetaObject;
        MetaElement                 = require('./meta-element').MetaElement;
        MetaRowCollection           = require('./meta-row').MetaRowCollection;
        MetaRow                     = require('./meta-row').MetaRow;
        BaseColumnCollection        = require('./collection-entity').BaseColumnCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util;
        IGroupControl               = _global._L.IGroupControl;
        ISchemaControl              = _global._L.ISchemaControl;
        IImportControl              = _global._L.IImportControl;
        IExportControl              = _global._L.IExportControl;
        ISerialize                  = _global._L.ISerialize;
        MetaObject                  = _global._L.MetaObject;
        MetaElement                 = _global._L.MetaElement;
        MetaRowCollection           = _global._L.MetaRowCollection;
        MetaRow                     = _global._L.MetaRow;
        BaseColumnCollection        = _global._L.BaseColumnCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IGroupControl === 'undefined') throw new Error(Message.get('ES011', ['IGroupControl', 'i-control-group']));
    if (typeof ISchemaControl === 'undefined') throw new Error(Message.get('ES011', ['ISchemaControl', 'i-control-schema']));
    if (typeof IImportControl === 'undefined') throw new Error(Message.get('ES011', ['IImportControl', 'i-control-import']));
    if (typeof IExportControl === 'undefined') throw new Error(Message.get('ES011', ['IExportControl', 'i-control-export']));
    if (typeof ISerialize === 'undefined') throw new Error(Message.get('ES011', ['ISerialize', 'i-serialize']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
    if (typeof MetaElement === 'undefined') throw new Error(Message.get('ES011', ['MetaElement', 'meta-element']));
    if (typeof MetaRowCollection === 'undefined') throw new Error(Message.get('ES011', ['MetaRowCollection', 'meta-row']));
    if (typeof MetaRow === 'undefined') throw new Error(Message.get('ES011', ['MetaRow', 'meta-row']));
    if (typeof BaseColumnCollection === 'undefined') throw new Error(Message.get('ES011', ['BaseColumnCollection', 'meta-column']));

    //==============================================================
    // 4. module implementation   

    // /**
    //  * 병합 옵션입니다.
    //  * @readonly
    //  * @enum {number}
    //  * @memberof  _L.Meta.Entity.BaseEntity
    //  */
    // var EnumMerge = {
    //     /** 로우 기준, 초과 컬럼 무시 */
    //     Row_Limit: 0,
    //     /** 컬럼 기준, 초과 로우 무시 */
    //     Column_Limit: 1,
    //     /** 컬럼 기준, 초과 컬럼 채움 */
    //     Row_Over: 2,
    //     /** 컬럼 기준, 넘침 로우 채움 */
    //     Column_Over: 3
    // };

    // function eMerge() {
    //     /**
    //      * 병합 옵션입니다.
    //      * @readonly
    //      * @enum {number | string}
    //      * @memberof  _L.Meta.Entity
    //      */
    //     var eMerge = {
    //         /** 로우 기준, 초과 컬럼 무시 */
    //         Row_Limit: 0,
    //         /** 컬럼 기준, 초과 로우 무시 */
    //         Column_Limit: 1,
    //         /** 컬럼 기준, 초과 컬럼 채움 */
    //         Row_Over: 2,
    //         /** 컬럼 기준, 넘침 로우 채움 
    //          * @type {string}
    //         */
    //         Column_Over: 'S'
    //     };
    //     return eMerge;
    // }
        


    var BaseEntity  = (function (_super) {
        /**
         * 기본 엔티티 (최상위)
         * @abstract
         * @constructs _L.Meta.Entity.BaseEntity
         * @extends _L.Meta.MetaElement
         * @implements {_L.Interface.IGroupControl}
         * @implements {_L.Interface.ISchemaControl}
         * @implements {_L.Interface.IImportControl}
         * @implements {_L.Interface.IExportControl}
         * @implements {_L.Interface.ISerialize}
         * @param {string} p_name 
         * @param {MetaSet?} p_metaSet 메타셋
         */
        function BaseEntity(p_name) {
            _super.call(this, p_name);

            var _metaSet = null;
            var rows  = new MetaRowCollection(this);

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaSet} _L.Meta.Entity.BaseEntity#_metaSet
             */
            Object.defineProperty(this, '_metaSet', 
            {
                get: function() { return _metaSet; },
                set: function(nVal) { 
                    if (!(nVal instanceof MetaElement && nVal.instanceOf('MetaSet'))) {
                        throw new ExtendError(/EL05311/, null, [this.constructor.name]);
                    }
                    _metaSet = nVal;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @readonly
             * @member {BaseColumnCollection} _L.Meta.Entity.BaseEntity#columns
             */
            Object.defineProperty(this, 'columns', 
            {
                get: function() { 
                    throw new ExtendError(/EL05312/, null, [this.constructor.name]);
                },
                configurable: true, // 하위에서 재정의 해야함
                enumerable: true
            });
            
            /**
             * 엔티티의 데이터(로우) 컬렉션
             * @readonly
             * @member {MetaRowCollection} _L.Meta.Entity.BaseEntity#rows
             */
            Object.defineProperty(this, 'rows', 
            {
                get: function() { return rows; },
                configurable: false,
                enumerable: true
            });

            Util.implements(BaseEntity, this);
        }
        Util.inherits(BaseEntity, _super);
        
        BaseEntity._UNION = [IGroupControl, ISchemaControl, IImportControl, IExportControl, ISerialize];
        BaseEntity._NS = 'Meta.Entity';         // namespace
        BaseEntity._PARAMS = ['name'];          // creator parameter
        BaseEntity._KIND = 'abstract';

        
        // local funciton
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }
        function _isSchema(obj) {    // 객체 여부
            if (!_isObject(obj)) return false;
            if (_isObject(obj['columns']) || _isObject(obj['rows'])) return true;
            return false;
        }

        
        /**
         * 엔티티 스카마 객체로 변환  (static method)
         * @param {object} p_oGuid getObject()로 얻은 객체
         * @static
         * @returns {object}
         */
        BaseEntity.transformSchema  = function(p_oGuid) {
            var obj = {};
            var oGuid = p_oGuid;

            try {
                if (!_isSchema(p_oGuid)) { 
                    throw new ExtendError(/EL05331/, null, [p_oGuid.columns, p_oGuid.rows]);
                }

                if (oGuid['_guid']) obj['_guid'] = oGuid['_guid'];
                if (oGuid['_baseEntity']) obj['_baseEntity'] = oGuid['_baseEntity'];
                obj['columns'] = transformColumn(oGuid['columns'], oGuid);
                obj['rows'] = transformRow(oGuid['rows'], oGuid);
                
            } catch (error) {
                throw new ExtendError(/EL05332/, error, []);
            }
            
            return obj;

            // inner funciton
            function transformColumn(oGuid, origin) {
                var obj = {};
                for (var i = 0; i < oGuid['_elem'].length; i++) {
                    var column = oGuid['_elem'][i];
                    var key = oGuid['_key'][i];
                    obj[key] = {};
                    if (column['$ref']) obj[key] = column;
                    else {
                        if (column['_entity'] && column['_entity']['$ref'] !== origin['_guid']) {
                            obj[key]._entity = {};
                            obj[key]._entity['$ref'] = column['_entity']['$ref'];
                        } 
                        if (column._guid) obj[key]._guid = column['_guid'];
                        if (column.default) obj[key].default = column['default'];
                        if (column.caption) obj[key].caption = column['caption'];            
                        if (column.isNotNull) obj[key].isNotNull = column['isNotNull'];
                        if (column.isNullPass) obj[key].isNullPass = column['isNullPass'];
                        if (Array.isArray(column.constraints)) {
                            obj[key]['constraints'] = Util.deepCopy(column['constraints']);
                        }
                        if (column.getter) obj[key].getter = column['getter'];
                        if (column.setter) obj[key].setter = column['setter'];
                        if (column.alias) obj[key].alias = column['alias'];
                        if (column.value) obj[key].value = column['value'];
                    }

                }
                obj['$key'] = oGuid['_key'];
                return obj;
            }
            function transformRow(oGuid) {
                var arr = [];
                for (var i = 0; i < oGuid['_elem'].length; i++) {
                    var rows = oGuid['_elem'][i];
                    var obj = {};
                    for (var ii = 0; ii < rows['_elem'].length; ii++) {
                        var row = rows['_elem'][ii];
                        var key = rows['_key'][ii];
                        obj[key] = row;
                    }
                    arr.push(obj);
                }
                return arr;
            }
        };
        
        /**
         * 엔티티 대상에 로우 만들기
         * @protected
         * @param {BaseEntity} p_entity 빌드 대상 엔티티
         * @param {function} p_callback 로우 대상 조회 콜백
         * @param {array<string>} p_items 선택할 로우명 , [] 또는 undefined 시 전체 선택
         * @returns {BaseEntity}
         */
        BaseEntity.prototype._buildEntity = function(p_entity, p_callback, p_items) {
            var orignal = this.clone();
            var columnName;
            var column;

            try {
                // columns 구성
                if (p_items.length === 0) {
                    for (var i = 0; i < this.columns.count; i++) {
                        p_entity.columns.add(this.columns[i]);  // 참조로 등록
                    }
    
                } else {
                    for (var i = 0; i < p_items.length; i++) {
                        columnName = p_items[i];
                        if (!_isString(columnName)) throw new ExtendError(/EL05321/, null, [i, typeof columnName]);
                        if (!this.columns.exist(columnName)) throw new ExtendError(/EL05322/, null, [columnName]);
                        
                        column = this.columns.alias(columnName)
                        p_entity.columns.add(column);
                    }
                }
    
                // rows 등록
                for (var i = 0; i < orignal.rows.count; i++) {  
                    if (!p_callback || (typeof p_callback === 'function' 
                        && p_callback.call(this, orignal.rows[i], i, p_entity))) {
                        p_entity.rows.add(createRow(orignal.rows[i]));
                    } 
                }
                return p_entity;
                
            } catch (error) {
                throw new ExtendError(/EL05323/, error, []);
            }

            // inner function
            function createRow(row) {
                var alias, newRow;
                newRow = p_entity.newRow();
                for (var ii = 0; ii < p_entity.columns.count; ii++) {
                    alias = p_entity.columns[ii].alias;
                    newRow[alias] = row[alias];
                }
                return newRow;
            }
        };

        /**
         * BaseEntity 읽기(로드)
         * @protected
         * @param {BaseEntity} p_object 대상 엔티티
         * @param {number} p_option 옵션
         */
        BaseEntity.prototype._readEntity = function(p_entity, p_option) {
            var opt = p_option || 3;
            var _this = this;

            try {
                if (!(p_entity instanceof BaseEntity)) throw new ExtendError(/EL05324/, null, []);
                if (typeof opt !== 'number') throw new ExtendError(/EL05325/, null, [typeof opt]);
            
                if (opt % 2 === 1) loadColumn(); // opt: 1, 3
                if (Math.floor(opt / 2) >= 1) loadRow(); // opt: 2, 3
                return;
                
            } catch (error) {
                throw new ExtendError(/EL05326/, error, [opt]);
            }

            // inner function
            function loadColumn() {
                if (_this.rows.count > 0 ) throw new ExtendError(/EL05327/, null, [opt]);
                for (let i = 0; i < p_entity.columns.count; i++) {
                    var column = p_entity.columns[i].clone();
                    var key = p_entity.columns.keyOf(i);
                    if (_this.columns.exist(key)) throw new ExtendError(/EL05328/, null, [key]);
                    _this.columns.add(column);
                }
            }
            function loadRow() {    // 컬럼 기준으로 로우를 가져온다.
                for (let i = 0; i < p_entity.rows.count; i++) {
                    var row = _this.newRow(this);
                    for (let ii = 0; ii < _this.columns.count; ii++) {
                        var key = _this.columns.keyOf(ii);
                        row[key] = p_entity.rows[i][key];
                    }
                    _this.rows.add(row);
                }
            }
        };


        /**
         * 스키마 읽기
         * @param {object} p_obj 대상 객체
         * @param {boolean} p_createRow 기본값 = false, 컬럼이 없을경우 로우이름의 컬럼 생성 여부
         * @param {object} p_origin 원본 객체
         */
        BaseEntity.prototype._readSchema  = function(p_obj, p_isCreateRow, p_origin) {
            var _this = this;
            var obj = p_obj;
            var columns;
            var rows;
            var Column = this.columns._baseType;
            var origin = p_origin ? p_origin : p_obj;
            
            try {

                if (obj['_guid']) MetaRegistry.setMetaObject(obj, this); 

                if (obj._baseEntity && obj._baseEntity['$ref']) {
                    obj['_baseEntity'] = MetaRegistry.findSetObject(obj._baseEntity['$ref'], origin);
                    if (!obj['_baseEntity']) throw new ExtendError(/EL05329/, null, [obj._baseEntity['$ref']]);
                }
                columns = obj['columns'];
                if (columns) {
                        // 1. $key 인덱스 기준으로 컬럼명 추출
                        if (columns['$key'] && Array.isArray(columns['$key'])) {
                            for (var i = 0; i < columns['$key'].length; i++) {
                                
                                    addColumn(columns['$key'][i], columns);
                                }
                        // 2. 무작위로 컬럼명 추출
                        } else for (var key in columns) addColumn(key, columns);
                        

                }
                // opt
                if (p_isCreateRow === true) {
                    rows = obj['rows'];
                    if (Array.isArray(rows) && rows.length > 0)
                    for (var key in rows[0]) {    // rows[0] 기준
                        if (Object.prototype.hasOwnProperty.call(rows[0], key) && !this.columns.existAlias(key)) {
                            var prop = rows[0][key];
                            if (!this.columns.exist(key)) {
                                var column = new Column(key, this);
                                this.columns.add(column);
                            }
                        }
                    }
                }

            } catch (error) {
                throw new ExtendError(/EL0532A/, error, []);
            }

            // innner function
            function addColumn(key, columns) {
                var column;
                if (_isObject(columns[key])) {
                    if (_this.rows.count > 0 ) throw new ExtendError(/EL0532B/, null, []);
                    var prop = columns[key];
                    var obj = {};
                    if (_isObject(prop) && prop['$ref']) {
                        column = MetaRegistry.findSetObject(prop['$ref'], origin);
                        if (!column) throw new ExtendError(/EL0532C/, null, [key, prop['$ref']]);
                    } else {
                        if (_isObject(prop['_entity']) && prop['_entity']['$ref']) {
                            prop['_entity'] = MetaRegistry.findSetObject(prop['_entity']['$ref'], origin);
                            if (!prop['_entity']) throw new ExtendError(/EL0532D/, null, [key, '_entity']);
                        }
                        for (var p in prop) obj[p] = prop[p];

                        column = new Column(key, null, obj);
                    }
                    if(prop['_guid']) MetaRegistry.setMetaObject(prop, column); 
                    if (_this.columns.exist(key)) throw new ExtendError(/EL0532E/, null, [key]);
                    _this.columns.add(column);
                }
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
        BaseEntity.prototype.getObject = function(p_vOpt, p_owned) {
            var obj;
            var vOpt = p_vOpt || 0;
            var owned;

            obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (vOpt < 2 && vOpt > -1 && this._metaSet) {
                obj['_metaSet'] = MetaRegistry.createReferObject(this._metaSet);
            }
            obj['columns'] = this.columns.getObject(vOpt, owned);
            obj['rows'] = this.rows.getObject(vOpt, owned);
            return obj;                        
        };

        /** 
         * rows(데이터) 초기화 한다
         */
        BaseEntity.prototype.clear = function() {
            this.rows.clear();
        };

        /** 
         * columns, rows(데이터)를 초기화 한다
         */
        BaseEntity.prototype.reset = function() {
            
            this.rows.clear();
            this.columns.clear();
        };

        /**
         * 새로운 MetaRow 를 추가한다.
         * @returns {MetaRow} columns 구조의 row를 생성
         */
        BaseEntity.prototype.newRow  = function() {
            return new MetaRow(this);
        };

        /**
         * 컬럼의 value 값을 MetaRow 타입 객체로 얻기
         * @returns {MetaRow}
         */
        BaseEntity.prototype.getValue  = function() {
            var row = this.newRow();
            
            for(var i = 0; this.columns.count > i; i++) {
                 row[i] = this.columns[i].value;
            }
            return row;
        };

        /**
         * MetaRow 의 값을 컬럼의 value에 설정한다.
         * @param {MetaRow} p_row 
         */
        BaseEntity.prototype.setValue  = function(p_row) {
            var alias = '';

            try {
                if (!(p_row instanceof MetaRow)) throw new ExtendError(/EL05333/, null, []);
                for(var i = 0; this.columns.count > i; i++) {
                    alias = this.columns[i].alias;        // 별칭이 없을시 name 설정됨
                    this.columns[i].value = p_row[alias];
                }
                
            } catch (error) {
                throw new ExtendError(/EL05334/, error, []);
            }
        };

        /**
         * 엔티티(테이블/뷰)와 병합
         * @param {BaseEntity} p_target 
         * @param {object} p_option 옵션
         * @param {object} p_option.0 로우(idx) 기준 병합, 초과 컬럼은 무시됨 <**>
         * @param {object} p_option.1 컬럼(key) 기준 병합, 초과 로우는 무시됨
         * @param {object} p_option.2 로우(idx) 기준 병합, 초과 컬럼은 채워짐
         * @param {object} p_option.3 컬럼(key) 기준 병합, 초과 로우는 채워짐 
         * @param {boolean} p_matchType 로우 유효성 검사 유무 (기본:false)
         */
        BaseEntity.prototype.merge  = function(p_target, p_option, p_matchType) {
            var opt = p_option || 0;
            var key, alias, newRow, tarRow, oriRows, tarRows, tarColumns;
            var tempRows = [], clone;
            var target;

            
            try {
                // 1. 유효성 검사
                if (!(p_target instanceof BaseEntity)) throw new ExtendError(/EL05341/, null, []);
                if (typeof p_option !== 'number') throw new ExtendError(/EL05342/, null, [typeof p_option]);

                // 2. 타겟 복제본 만들기
                target = p_target.clone();

                // opt = 0
                if (opt === 0) {
                    // 3-1. 로우 임시 저장 및 초기화 
                    for (var i = 0; i < this.rows.count; i++) {
                        tempRows.push(this.rows[i].clone());
                    }
                    this.rows.clear();
                    // 3-2. 원본 row 추가
                    for (var i = 0; i < tempRows.length; i++) {
                        newRow = this.newRow();
                        for (var ii = 0; ii < this.columns.count; ii++) {
                            alias = this.columns[ii].alias;
                            if (tempRows[i][alias]) newRow[alias] = tempRows[i][alias];
                        }
                        this.rows.add(newRow, p_matchType);
                    }
                    // 3-3. 타겟 row 추가
                    tarRows = target.rows;
                    for (var i = 0; i < tarRows.count; i++) {
                        newRow = this.newRow();
                        tarRow = tarRows[i];
                        for (var ii = 0; ii < this.columns.count; ii++) {
                            alias = this.columns[ii].alias;
                            if (tarRow[alias]) newRow[alias] = tarRow[alias];
                        }
                        this.rows.add(newRow, p_matchType);
                    }
                }
                // opt = 1
                if (opt === 1) {
                    tarColumns = target.columns;
                    tarRows = target.rows;
                    // 3-1. 컬럼 중복 검사
                    for (var i = 0; i < tarColumns.count; i++) {
                        alias = tarColumns[i].alias;
                        if (this.columns.exist(alias)) throw new ExtendError(/EL05343/, null, [i, alias]);
                        if (this.columns.existAlias(alias)) throw new ExtendError(/EL05344/, null, [i, alias]);
                    }
                    // 3-2. 로우 임시 저장 및 초기화 
                    for (var i = 0; i < this.rows.count; i++) {
                        tempRows.push(this.rows[i].clone());
                    }
                    this.rows.clear();
                    // 3-3. 컬럼 추가
                    for (var i = 0; i < tarColumns.count; i++) {
                        clone = tarColumns[i].clone(this);
                        var key = tarColumns[i].alias;
                        clone.columnName = key;
                        clone.__SET$__key(key, clone);
                        this.columns.add(clone);
                    }
                    // 3-4. 로우 추가 (기준:idx)
                    for (var i = 0; i < tempRows.length; i++) {
                        newRow = this.newRow();
                        for (var ii = 0; ii < this.columns.count; ii++) {
                            alias = this.columns[ii].alias;
                            if (tempRows[i][alias]) {                         // 원본 로우
                                newRow[alias] = tempRows[i][alias];
                                continue;
                            } else if (tarRows[i] && tarRows[i][alias]) newRow[alias] = tarRows[i][alias]; // 타겟 로우
                        }
                        this.rows.add(newRow, p_matchType);
                    }                                
                }
                // opt = 2
                if (opt === 2) {
                    tarColumns = target.columns;
                    tarRows = target.rows;
                    // 3-1. 로우 임시 저장 및 초기화 
                    for (var i = 0; i < this.rows.count; i++) {
                        tempRows.push(this.rows[i].clone());
                    }
                    this.rows.clear();
                    // 3-2. 컬럼 추가
                    for (var i = 0; i < tarColumns.count; i++) {
                        alias = tarColumns[i].alias;
                        if (!this.columns.exist(alias)) {
                            clone = tarColumns[i].clone(this);
                            clone.name = alias;
                            this.columns.add(clone);
                        }
                    }
                    // 3-3. 로우 추가 : 원본
                    for (var i = 0; i < tempRows.length; i++) {
                        newRow = this.newRow();
                        for (var ii = 0; ii < this.columns.count; ii++) {
                            alias = this.columns[ii].alias;
                            if (tempRows[i][alias]) newRow[alias] = tempRows[i][alias];
                        }
                        this.rows.add(newRow, p_matchType);
                    }
                    // 3-4. 로우 추가 : 타겟
                    for (var i = 0; i < tarRows.count; i++) {
                        newRow = this.newRow();
                        for (var ii = 0; ii < this.columns.count; ii++) {
                            alias = this.columns[ii].alias;
                            if (tarRows[i][alias]) newRow[alias] = tarRows[i][alias];
                        }
                        this.rows.add(newRow, p_matchType);
                    }
                }
                // opt = 3
                if (opt === 3) {
                    tarColumns = target.columns;
                    tarRows = target.rows;
                    // 3-1. 컬럼 중복 검사
                    for (var i = 0; i < tarColumns.count; i++) {
                        alias = tarColumns[i].alias;
                        if (this.columns.exist(alias)) throw new ExtendError(/EL05345/, null, [i, alias]);
                        if (this.columns.existAlias(alias)) throw new ExtendError(/EL05346/, null, [i, alias]);
                    }
                    // 3-2. 로우 임시 저장 및 초기화 
                    for (var i = 0; i < this.rows.count; i++) {
                        tempRows.push(this.rows[i].clone());
                    }
                    this.rows.clear();
                    // 3-3. 컬럼 추가
                    for (var i = 0; i < tarColumns.count; i++) {
                        clone = tarColumns[i].clone(this);
                        clone.name = tarColumns[i].alias;
                        this.columns.add(clone);
                    }
                    // 3-4. 로우 추가 (idx)
                    for (var i = 0; i < tempRows.length; i++) {
                        newRow = this.newRow();
                        for (var ii = 0; ii < this.columns.count; ii++) {
                            alias = this.columns[ii].alias;
                            if (tempRows[i][alias]) {                         // 원본 로우
                                newRow[alias] = tempRows[i][alias];
                                continue;
                            }else newRow[alias] = tarRows[i][alias]; // 타겟 로우
                        }
                        this.rows.add(newRow, p_matchType);
                    }     
                    // 3-5. 타겟 로우가 클 경우 로우 추가
                    if (tempRows.length < tarRows.count) {
                        for (var i = tempRows.length; i < tarRows.count; i++) {
                            newRow = this.newRow();
                            for (var ii = 0; ii < this.columns.count; ii++) {
                                alias = this.columns[ii].alias;
                                if (tarRows[i][alias]) newRow[alias] = tarRows[i][alias];
                            }
                            this.rows.add(newRow, p_matchType);
                        }
                    }
                }
            } catch (error) {
                throw new ExtendError(/EL05347/, error, [opt]);
            }
        };

        /**
         * 엔티티의 지정한 컬럼과 조건의 row 를 조회
         * @param {function | array<string>| arguments<string>} p_filter 
         * @param {(array<string> | arguments<string>)?} p_args filter 설정시 컬럼명
         * @returns {MetaView}
         */
        BaseEntity.prototype.select  = function(p_filter, p_args) {
            var args = Array.prototype.slice.call(arguments);
            var _this = this;
            var MetaView;
            var columnNames = [];
            var callback;
            var view;

            try {
                args = Array.prototype.slice.call(arguments);
                MetaView = MetaRegistry.ns.find('Meta.Entity.MetaView');
                
                if (!MetaView) throw new ExtendError(/EL05335/, null, ['Meta.Entity.MetaView']);
                
                view = new MetaView('select');
    
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
                // 엔티티 빌드
                return this._buildEntity(view, callback, columnNames);

            } catch (error) {
                throw new ExtendError(/EL05336/, error, []);
            }

        };
        
        /**
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 기존을 초기화 하고 불러오는 역활
         * @param {object | string} p_obj 불러오기 대상
         * @param {function?} p_parse 파서
         */
        BaseEntity.prototype.load = function(p_obj, p_parse) {
            var obj = p_obj;
            
            
            try {
                if (p_obj instanceof BaseEntity) throw new ExtendError(/EL05351/, null, []);
                if (typeof obj === 'string') {
                    if (typeof p_parse === 'function') obj = p_parse(obj);
                    else obj = JSON.parse(obj, null);
                }    
                if (!_isObject(obj)) throw new ExtendError(/EL05352/, null, [typeof obj]);
                this.setObject(obj);
                
            } catch (error) {
                throw new ExtendError(/EL05353/, error, []);
            }
        };

        // BaseEntity.prototype.load._TYPE = { params: String };

        /**
         * 객체 출력(직렬화)
         * @param {number?} p_vOpt 옵션 (0, 1, 2)
         * @param {function?} p_stringify 
         * @param {string?} p_space 
         * @returns {string}
         */
        BaseEntity.prototype.output = function(p_vOpt, p_stringify, p_space) {
            var rObj;
            var str;

            rObj = this.getObject(p_vOpt);
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
        BaseEntity.prototype.read  = function(p_obj, p_option) {
            var entity = null;
            var opt = typeof p_option === 'undefined' ? 3 : p_option;

            
            try {
                if (!_isObject(p_obj)) throw new ExtendError(/EL05354/, null, [typeof p_obj]);
                if (typeof opt !== 'number') throw new ExtendError(/EL05355/, null, [typeof opt]);
                if (opt <= 0 || opt > 3) throw new ExtendError(/EL05356/, null, [opt]);

                if (p_obj instanceof BaseEntity) {
                    this._readEntity(p_obj, p_option);
                } else{
                    if (p_obj.viewName) this.viewName = p_obj.viewName;
                    if (p_obj.tableName) this.tableName = p_obj.tableName;
                    // 스키마 및 데이터 읽기
                    if (opt % 2 === 1) this.readSchema(p_obj, opt === 3 ? true : false); // opt: 1, 3
                    if (Math.floor(opt / 2) >= 1) this.readData(p_obj); // opt: 2, 3
                }
                
            } catch (error) {
                throw new ExtendError(/EL05357/, error, []);
            }
        };
        
        /**
         * 없으면 빈 컬럼을 생성해야 하는지?  
         * 이경우에 대해서 명료하게 처리햐야함 !!  
         * @param {object} p_obj object<Schema> | object<Guid>
         * @param {boolean} p_createRow true 이면, row[0] 기준으로 컬럼을 추가함
         */
        BaseEntity.prototype.readSchema  = function(p_obj, p_createRow) {
            var obj = p_obj;
            
            
            try {
                if (!_isObject(p_obj)) throw new ExtendError(/EL05358/, null, [typeof p_obj]);
                if (MetaRegistry.isGuidObject(p_obj)) {
                    if (MetaRegistry.hasRefer(p_obj)) obj = MetaRegistry.transformRefer(p_obj);
                    obj = BaseEntity.transformSchema(obj); // gObj >> sObj<요약>
                }
                if (!_isSchema(obj)) throw new ExtendError(/EL05359/, null, [obj.columns, obj.rows]);
    
                this._readSchema(obj, p_createRow);
                
            } catch (error) {
                throw new ExtendError(/EL0535A/, error, []);
            }
        };        

        /**
         * 존재하는 로우만 읽기
         * @param {object} p_obj 
         */
        BaseEntity.prototype.readData  = function(p_obj) {
            var obj = p_obj;
            var rows;

            
            try {
                if (!_isObject(p_obj)) throw new ExtendError(/EL0535B/, null, [typeof p_obj]);
    
                if (MetaRegistry.isGuidObject(p_obj)) {
                    if (MetaRegistry.hasRefer(p_obj)) obj = MetaRegistry.transformRefer(p_obj);
                    obj = BaseEntity.transformSchema(p_obj);
                }
                if (!_isSchema(obj)) throw new ExtendError(/EL0535C/, null, [obj.columns, obj.rows]);
                
                rows = obj['rows'];
                if (Array.isArray(rows) && this.columns.count > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        var row = this.newRow(this);
                        for (var key in rows[i]) {
                            if (Object.prototype.hasOwnProperty.call(row, key)) row[key] = rows[i][key];
                        }
                        this.rows.add(row);
                    }
                }
                
            } catch (error) {
                throw new ExtendError(/EL0535D/, error, []);
            }
        };

        /**
         * 엔티티를 컬럼과 로우를 스키마 타입의 객체로 쓰기(내보내기)
         * @param {number} p_vOpt 
         * @returns {object} 스키마 타입
         */
        BaseEntity.prototype.write  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var oGuid;
            
            oGuid = this.getObject(vOpt);
            return BaseEntity.transformSchema(oGuid);
        };

        /**
         * 엔티티 스키마(컬럼)을 스키마 타입의 객체로 쓰기
         * @param {number} p_vOpt 
         * @returns {object} 스키마 타입
         */
        BaseEntity.prototype.writeSchema  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var schema;

            schema = this.write(vOpt);
            schema.rows = [];
            return schema;                
        };

        /**
         * 엔티티 데이터(로우)를 스키마 타입의 객체로 쓰기
         * @param {number} p_vOpt 
         * @returns {object} 스키마 타입
         */
        BaseEntity.prototype.writeData  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var schema;
            
            schema = this.write(vOpt);
            schema.columns = {};
            return schema;
        };

        /** 
         * 엔티티 복제
         * @abstract 
         * @returns {BaseEntity} 복제한 객체
         */
        BaseEntity.prototype.clone = function() {
            throw new ExtendError(/EL05337/, null, []);
        };

        /** 
         * 엔티티 복사
         * @abstract 
         * @returns {MetaView} 복사한 뷰 객체
         */
        BaseEntity.prototype.copy = function() {
            throw new ExtendError(/EL05348/, null, []);
        };

        

        return BaseEntity;
    
    }(MetaElement));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.BaseEntity = BaseEntity;
    } else {
        _global._L.BaseEntity = BaseEntity;
        _global._L.Meta.Entity.BaseEntity = BaseEntity;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));