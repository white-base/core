const { ISerialize } = require('./i-serialize');

/**
 * namespace _L.Meta.Entity.Entity
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
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
    var MetaColumnCollection;
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
        MetaColumnCollection        = require('./meta-column').MetaColumnCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
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
        MetaColumnCollection        = _global._L.MetaColumnCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IGroupControl === 'undefined') Message.error('ES011', ['IGroupControl', 'i-control-group']);
    if (typeof ISchemaControl === 'undefined') Message.error('ES011', ['ISchemaControl', 'i-control-schema']);
    if (typeof IImportControl === 'undefined') Message.error('ES011', ['IImportControl', 'i-control-import']);
    if (typeof IExportControl === 'undefined') Message.error('ES011', ['IExportControl', 'i-control-export']);
    if (typeof ISerialize === 'undefined') Message.error('ES011', ['ISerialize', 'i-serialize']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof MetaElement === 'undefined') Message.error('ES011', ['MetaElement', 'meta-element']);
    if (typeof MetaRowCollection === 'undefined') Message.error('ES011', ['MetaRowCollection', 'meta-row']);
    if (typeof MetaRow === 'undefined') Message.error('ES011', ['MetaRow', 'meta-row']);
    if (typeof MetaColumnCollection === 'undefined') Message.error('ES011', ['MetaColumnCollection', 'meta-column']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);

    //==============================================================
    // 4. module implementation   
    var MetaEntity  = (function (_super) {
        /**
         * 엔티티
         * @constructs _L.Meta.Entity.MetaEntity
         * @extends _L.Meta.MetaElement
         * @implements {_L.Interface.IGroupControl}
         * @implements {_L.Interface.IAllControl}
         * @param {*} p_name 
         * @param {*} p_metaSet 
         */
        function MetaEntity(p_name) {
            _super.call(this, p_name);

            var _metaSet = null;
            var rows  = new MetaRowCollection(this);
            var columns = null;     

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaColumnCollection} _L.Meta.Entity.MetaEntity#_metaSet
             */
            Object.defineProperty(this, '_metaSet', 
            {
                get: function() { return _metaSet; },
                set: function(newValue) { 
                    if (!(newValue instanceof MetaElement && newValue.instanceOf('MetaSet'))) {
                        Message.error('ES032', ['_metaSet', 'MetaSet']);
                    }
                    _metaSet = newValue;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaColumnCollection} _L.Meta.Entity.MetaEntity#columns
             */
            Object.defineProperty(this, 'columns', 
            {
                get: function() { return columns; },
                // set: function(newValue) { 
                //     if (!(newValue instanceof MetaColumnCollection)) Message.error('ES032', ['columns', 'MetaColumnCollection']);
                //     columns = newValue;
                // },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 엔티티의 데이터(로우) 컬렉션
             * @member {MetaRowCollection} _L.Meta.Entity.MetaEntity#rows
             */
            Object.defineProperty(this, 'rows', 
            {
                get: function() { return rows; },
                configurable: false,
                enumerable: true
            });

            Util.implements(this, IGroupControl, ISchemaControl, IImportControl, IExportControl, ISerialize);
        }
        Util.inherits(MetaEntity, _super);

        MetaEntity._NS = 'Meta.Entity';          // namespace
        MetaEntity._PARAMS = ['name'];         // creator parameter
        MetaEntity._ABSCRACT = true;

        // 3가지 타입 입력
        MetaEntity._transformSchema  = function(p_oGuid) {
            var obj  = {
                columns: null,
                rows: null
            };

            if (p_oGuid['columns'] || p_oGuid['rows']) obj = p_oGuid;
            return transformEntity(obj);

            // inner function
            function transformEntity(oGuid) {
                var obj = {};
                if (oGuid['name']) obj['name'] = oGuid['name'];
                if (oGuid['_guid']) obj['_guid'] = oGuid['_guid'];
                if (oGuid['_baseEntity']) obj['_baseEntity'] = oGuid['_baseEntity'];
                if (oGuid['columns']) obj['columns'] = transformColumn(oGuid['columns'], oGuid);
                if (oGuid['rows']) obj['rows'] = transformRow(oGuid['rows'], oGuid);
                return obj;
            }
            function transformColumn(oGuid) {
                var obj = {};
                
                // if (oGuid['$ref']) {
                //     obj['$ref'] = oGuid['$ref'];
                //     return obj;
                // }
                for (var i = 0; i < oGuid['_elem'].length; i++) {
                    var column = oGuid['_elem'][i];
                    var key = oGuid['_key'][i] || column.name;
                    
                    obj[key] = {};

                    // POINT:
                    if (column['$ref']){
                        obj[key] = column;
                    } else {
                        // if (column['_entity']['$ref']) obj[key]['_entity'] = MetaRegistry.find(column['_entity']['$ref']);
                        // if (column['_entity']['$ref'] !== mEntity['_guid']) obj[key]['_entity'] = column['_entity']['$ref'];
                        if (column._guid) obj[key]._guid = column['_guid'];
                        if (column.default) obj[key].default = column.default;
                        if (column.caption) obj[key].caption = column.caption;            
                        if (column.isNotNull) obj[key].isNotNull = column.isNotNull;
                        if (column.isNullPass) obj[key].isNullPass = column.isNullPass;
                        if (Array.isArray(column.constraints)) obj[key].constraints = Util.deepCopy(column.constraints);
                        if (column.getter) obj[key].getter = column.getter;
                        if (column.setter) obj[key].setter = column.setter;
                        if (column.alias) obj[key].alias = column.alias;
                        if (column.value) obj[key].value = column.value;
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
         * MetaEntity 를 불러(로드)온다.
         * @private
         * @param {*} p_object 대상 엔티티
         * @param {*} p_option 옵션
         */
        MetaEntity.prototype._readEntity = function(p_entity, p_option) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            var _this = this;

            if (!(p_entity instanceof MetaEntity)) Message.error('ES032', ['entity', 'MetaEntity']);
            if (typeof opt !== 'number') Message.error('ES021', ['opt', 'number']);
            if (opt % 2 === 1) loadColumn(); // opt: 1, 3
            if (Math.floor(opt / 2) >= 1) loadRow(); // opt: 2, 3

            function loadColumn() {
                if (_this.rows.count > 0 ) Message.error('ES045', ['rows', 'column']);
                
                for (let i = 0; i < p_entity.columns.count; i++) {
                    var column = p_entity.columns[i].clone();
                    var key = p_entity.columns.keyOf(i);
                    if (_this.columns.exist(key)) Message.error('ES046', ['columns', key]);
                    _this.columns.add(column);
                }
            }
            // 컬럼 기준으로 로우를 가져온다.
            function loadRow() {
                for (let i = 0; i < p_entity.rows.count; i++) {
                    // var row = p_entity.rows[i].clone();
                    // _this.columns.add(column);
                    var row = _this.newRow(this);
                    for (let ii = 0; ii < _this.columns.count; ii++) {
                        var key = _this.columns.keyOf(ii);
                        row[key] = p_entity.rows[i][key];
                    }
                    _this.rows.add(row);
                }
            }
        };

        MetaEntity.prototype._buildEntity = function(p_entity, p_callback, p_items) {
            var orignal = this.clone();
            var columnName;

            // var MetaView                    = require('./meta-view').MetaView;
            
            // entity 컬럼 구성
            if (p_items.length === 0) {
                for (var i = 0; i < this.columns.count; i++) {
                    // columnName = this.columns[i].name;
                    // entity.columns.add(columnName);  // 참조로 등록
                    p_entity.columns.add(this.columns[i]);
                }
            } else {
                for (var i = 0; i < p_items.length; i++) {
                    columnName = p_items[i];
                    if (typeof columnName !== 'string') Message.error('ES045', ['items', 'string']);
                    // if (typeof columnName.length === 0) throw new Error('빈 items 은 입력할 수 없습니다.');
                    // entity.columns.add(columnName);  // 참조로 등록
                    if (!this.columns.exist(columnName)) Message.error('ES053', ['items', 'column']);
                    p_entity.columns.add(this.columns[i]);
                }
            }

            // row 등록
            for (var i = 0; i < orignal.rows.count; i++) {
                if (!p_callback || (typeof p_callback === 'function' && p_callback.call(this, orignal.rows[i], i, p_entity))) {
                    p_entity.rows.add(createRow(orignal.rows[i]));
                } 
            }
            return p_entity;

            // inner function
            function createRow(row) {
                var alias, newRow;

                newRow = p_entity.newRow();
                for (var ii = 0; ii < p_entity.columns.count; ii++) {
                    alias = p_entity.columns[ii].alias;
                    if (p_items.length > 0 && p_items.indexOf(alias) < 0) continue;
                    newRow[alias] = row[alias];
                }
                return newRow;
            }
        };

        MetaEntity.prototype._readSchema  = function(p_obj, p_createRow, p_origin) {
            var _this = this;
            var obj = p_obj;
            var columns;
            var rows;
            var Column = this.columns._baseType;
            var origin = p_origin ? p_origin : p_obj;

            columns = obj['columns'];
            if (columns) {
                // 키 추출방식 2가지
                if (columns['$key'] && Array.isArray(columns['$key'])) {
                    for (var i = 0; i < columns['$key'].length; i++) {
                        addColumn(columns['$key'][i], columns);
                    }
                } else {
                    for (var key in columns) {
                        addColumn(key, columns);
                    }
                }
                function addColumn(key, columns) {
                    var column;
                    if (Object.hasOwnProperty.call(columns, key) && typeof columns[key] === 'object') {
                        if (_this.rows.count > 0 ) Message.error('ES045', ['rows', 'column']);
                        var prop = columns[key];
                        var obj = {};
                        if (prop['_entity'] && MetaRegistry.has(prop['_entity'])) {
                            obj['_entity'] = MetaRegistry.find(prop['_entity']);
                        }
                        for (var p in prop) {
                            obj[p] = prop[p];
                        }
                        
                        // POINT:
                        if (typeof prop === 'object' && prop['$ref']) {
                            column = MetaRegistry.findSetObject(origin, prop['$ref']);
                            if (!column) Message.error('ES015', [key, 'column']);
                        } else column = new Column(key, _this, obj);
                        MetaRegistry.createSetObject(prop, column); 
                        // column = new Column(key, _this, obj);

                        if (_this.columns.exist(key)) Message.error('ES046', ['columns', key]);
                        _this.columns.add(column);
                    }
                }
            }

            // opt
            if (p_createRow === true) {
                rows = obj['rows'];
                if (Array.isArray(rows) && rows.length > 0)
                for (var key in rows[0]) {    // rows[0] 기준
                    if (Object.hasOwnProperty.call(rows[0], key)) {
                        var prop = rows[0][key];
                        if (!this.columns.exist(key)) {
                            var column = new Column(key, this);
                            this.columns.add(column);
                        }
                    }
                }
            }
        
        };
        
        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaEntity.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this, p_vOpt);
            var vOpt = p_vOpt || 0;
            var _metaSet;

            if (vOpt > -2 && this._metaSet) obj._metaSet = MetaRegistry.createReferObject(this._metaSet);
            obj.columns = this.columns.getObject(p_vOpt);
            obj.rows = this.rows.getObject(p_vOpt);
            return obj;                        
        };

        /** 
         * 아이템과 로우를 초기화 한다.
         */
        MetaEntity.prototype.clear = function() {
            // this.columns.clear();
            this.rows.clear();
        };

        MetaEntity.prototype.reset = function() {
            this.rows.clear();
            this.columns.clear();

            // MetaView                    = require('./meta-view').MetaView;
        };

        /**
         * 새로운 MetaRow 를 추가한다.
         */
        MetaEntity.prototype.newRow  = function() {
            return new MetaRow(this);
        };

        /**
         * 아아템의 value을 MetaRow 형식으로 얻는다.
         * @returns {MetaRow}
         */
        MetaEntity.prototype.getValue  = function() {
            var row = this.newRow();
            
            for(var i = 0; this.columns.count > i; i++) {
                 row[i] = this.columns[i].value;
            }
            return row;
        };

        /**
         * MetaRow 의 값을 아이템의 value에 설정한다.
         * @param {*} p_row 
         */
        MetaEntity.prototype.setValue  = function(p_row) {
            var alias = '';

            if (!(p_row instanceof MetaRow)) Message.error('ES032', ['row', 'MetaRow']);
            for(var i = 0; this.columns.count > i; i++) {
                // this.columns[i].value = p_row[i];
                alias = this.columns[i].alias;        // 별칭이 없을시 name 설정됨
                this.columns[i].value = p_row[alias];
            }
        };

        /**
         * 병합
         * TODO: 컬럼 추가시 row 존재시 오류 발생 추가
         * @param {MetaEntity} p_target 
         * @param {object} p_option.0 로우(idx) 기준 병합, 초과 컬럼은 무시됨
         * @param {object} p_option.1 컬럼(key) 기준 병합, 초과 로우는 무시됨
         * @param {object} p_option.2 로우(idx) 기준 병합, 초과 컬럼은 채워짐
         * @param {object} p_option.3 컬럼(key) 기준 병합, 초과 컬럼은 채워짐 
         * @param {boolean} p_checkValid 로우 유효성 검사 유무 (기본:false)
         */
        MetaEntity.prototype.merge  = function(p_target, p_option, p_checkValid) {
            var opt = p_option || 0;
            var key, alias, newRow, tarRow, oriRows, tarRows, tarColumns;
            var tempRows = [], clone;
            var target;

            // 1.유효성 검사
            if (!(p_target instanceof MetaEntity)) Message.error('ES032', ['target', 'MetaEntity']);
            if (typeof p_option !== 'number') Message.error('ES021', ['option', 'number']);

            // 타겟 복제본 만들기
            target = p_target.clone();

            // opt = 0
            if (opt === 0) {
                // 로우 임시 저장 및 초기화 
                for (var i = 0; i < this.rows.count; i++) {
                    tempRows.push(this.rows[i].clone());
                }
                this.rows.clear();

                // 원본 row 추가
                for (var i = 0; i < tempRows.length; i++) {
                    newRow = this.newRow();
                    for (var ii = 0; ii < this.columns.count; ii++) {
                        alias = this.columns[ii].alias;
                        // key = this.columns.keyOf(ii);
                        if (tempRows[i][alias]) newRow[alias] = tempRows[i][alias];
                    }
                    this.rows.add(newRow, p_checkValid);
                }
                // 타겟 row 추가
                tarRows = target.rows;
                for (var i = 0; i < tarRows.count; i++) {
                    newRow = this.newRow();
                    tarRow = tarRows[i];
                    for (var ii = 0; ii < this.columns.count; ii++) {
                        alias = this.columns[ii].alias;
                        if (tarRow[alias]) newRow[alias] = tarRow[alias];
                    }
                    this.rows.add(newRow, p_checkValid);
                }
            }
            // opt = 1
            if (opt === 1) {
                tarColumns = target.columns;
                tarRows = target.rows;
                // 컬럼 중복 검사
                for (var i = 0; i < tarColumns.count; i++) {
                    alias = tarColumns[i].alias;
                    if (this.columns.exist(alias)) Message.error('ES042', ['column.name', alias]);
                    if (this.columns.existAlias(alias)) Message.error('ES042', ['column.alias', alias]);
                }
                // 로우 임시 저장 및 초기화 
                for (var i = 0; i < this.rows.count; i++) {
                    tempRows.push(this.rows[i].clone());
                }
                // for (var i = 0; i < this.rows.count; i++) {
                //     tempRows.push(this.rows[i]);
                // }

                this.rows.clear();
                // 컬럼 추가
                for (var i = 0; i < tarColumns.count; i++) {
                    clone = tarColumns[i].clone(this);
                    var key = tarColumns[i].alias;
                    clone.columnName = key;
                    clone.__SET$__key(key, clone);
                    this.columns.add(clone);
                }
                // 로우 추가 (기준:idx)
                for (var i = 0; i < tempRows.length; i++) {
                    newRow = this.newRow();
                    for (var ii = 0; ii < this.columns.count; ii++) {
                        alias = this.columns[ii].alias;
                        if (tempRows[i][alias]) {                         // 원본 로우
                            newRow[alias] = tempRows[i][alias];
                            continue;
                        }
                        if (tarRows[i][alias]) newRow[alias] = tarRows[i][alias]; // 타겟 로우
                    }
                    this.rows.add(newRow, p_checkValid);
                }                                
            }
            // opt = 2
            if (opt === 2) {
                tarColumns = target.columns;
                tarRows = target.rows;
                // 로우 임시 저장 및 초기화 
                for (var i = 0; i < this.rows.count; i++) {
                    tempRows.push(this.rows[i].clone());
                }
                // for (var i = 0; i < this.rows.count; i++) {
                //     tempRows.push(this.rows[i])
                // }
                this.rows.clear();
                // 컬럼 추가
                for (var i = 0; i < tarColumns.count; i++) {
                    // key = tarColumns.keyOf(i);
                    alias = tarColumns[i].alias;
                    if (!this.columns.exist(alias)) {
                        clone = tarColumns[i].clone(this);
                        clone.name = alias;
                        this.columns.add(clone);
                    }
                }
                // for (var i = 0; i < tarColumns.count; i++) {
                //     clone = tarColumns[i].clone(this);
                //     clone.name = tarColumns[i].alias;
                //     this.columns.add(clone);
                // }
                
                // 로우 추가 : 원본
                for (var i = 0; i < tempRows.length; i++) {
                    newRow = this.newRow();
                    for (var ii = 0; ii < this.columns.count; ii++) {
                        alias = this.columns[ii].alias;
                        // key = this.columns.keyOf(ii);
                        if (tempRows[i][alias]) newRow[alias] = tempRows[i][alias];
                    }
                    this.rows.add(newRow, p_checkValid);
                }
                // 로우 추가 : 타겟
                for (var i = 0; i < tarRows.count; i++) {
                    newRow = this.newRow();
                    for (var ii = 0; ii < this.columns.count; ii++) {
                        alias = this.columns[ii].alias;
                        // key = this.columns.keyOf(ii);
                        if (tarRows[i][alias]) newRow[alias] = tarRows[i][alias];
                    }
                    this.rows.add(newRow, p_checkValid);
                }
            }
            // opt = 3
            if (opt === 3) {
                tarColumns = target.columns;
                tarRows = target.rows;
                // 컬럼 중복 검사
                for (var i = 0; i < tarColumns.count; i++) {
                    // key = tarColumns.keyOf(i);
                    alias = tarColumns[i].alias;
                    if (this.columns.exist(alias)) Message.error('ES042', ['columnName', alias]);
                    if (this.columns.existAlias(alias)) Message.error('ES042', ['alais', alias]);
                    // key = tarColumns[i].alias;
                    // if (this.columns.exist(key)) throw new Error('컬럼 중복 발생 '+ key);
                }
                // 로우 임시 저장 및 초기화 
                for (var i = 0; i < this.rows.count; i++) {
                    tempRows.push(this.rows[i].clone());
                }
                // for (var i = 0; i < this.rows.count; i++) {
                //     tempRows.push(this.rows[i])
                // }
                this.rows.clear();
                // 컬럼 추가
                for (var i = 0; i < tarColumns.count; i++) {
                    clone = tarColumns[i].clone(this);
                    clone.name = tarColumns[i].alias;
                    this.columns.add(clone);
                }
                // for (var i = 0; i < tarColumns.count; i++) {
                //     // this.columns.add(tarColumns[i].clone());
                //     clone = tarColumns[i].clone();
                //     clone.name = tarColumns[i].alias;
                //     this.columns.add(clone);
                // }
                // 로우 추가 (idx)
                for (var i = 0; i < tempRows.length; i++) {
                    newRow = this.newRow();
                    for (var ii = 0; ii < this.columns.count; ii++) {
                        alias = this.columns[ii].alias;
                        if (tempRows[i][alias]) {                         // 원본 로우
                            newRow[alias] = tempRows[i][alias];
                            continue;
                        }
                        if (tarRows[i][alias]) newRow[alias] = tarRows[i][alias]; // 타겟 로우

                        // key = this.columns.keyOf(ii);
                        // if (tempRows[i][key]) {                         // 원본 로우
                        //     newRow[key] = tempRows[i][key];
                        //     continue;
                        // }
                        // if (tarRows[i][key]) newRow[key] = tarRows[i][key]; // 타겟 로우
                    }
                    this.rows.add(newRow, p_checkValid);
                }     
                // 타겟 로우가 클 경우 로우 추가
                if (tempRows.length < tarRows.count) {
                    for (var i = tempRows.length; i < tarRows.count; i++) {
                        newRow = this.newRow();
                        for (var ii = 0; ii < this.columns.count; ii++) {
                            alias = this.columns[ii].alias;
                            if (tarRows[i][alias]) newRow[alias] = tarRows[i][alias];
                            // key = this.columns.keyOf(ii);
                            // if (tarRows[i][key]) newRow[key] = tarRows[i][key];
                        }
                        this.rows.add(newRow, p_checkValid);
                    }
                }
            }
        };

        /** 
         * 엔티티를 조회(검색) 한다.
         * @param {Object} p_filter 필터객체
         * @param {(Number | Array<Number>)?} p_index 인덱스 시작번호 또는 목록
         * @param {Number?} p_end 인덱스 종료번호
         * @return {MetaEntity}
         * @example
         * // 상속기법을 이용함
         * filter = {
         *  __except : ['name'...],        // 제외 아이템 (1방법)
         *  아이템명: { __except: true }    // 아이템 제외 (2방법)
         *  아이템명: { order: 100 }        // 속성 오버라이딩
         * }
         */
        MetaEntity.prototype.select  = function(p_filter, p_args) {
            var args = Array.prototype.slice.call(arguments);
            var _this = this;
            var MetaView = MetaRegistry.ns.find('Meta.Entity.MetaView');
            
            // var MetaView = require('./meta-view').MetaView;
            if (!MetaView) Message.error('ES0110', ['Meta.Entity.MetaView', 'MetaRegistry.ns']);

            var view = new MetaView('select', this);
            var items = [];
            var callback = null;
            var columnName;
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

            return this._buildEntity(view, callback, items);
        };
            
        /**
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 기존을 초기화 하고 불러오는 역활
         * @param {string} p_target 로드 대상
         * @param {function?} p_parse 파서
         */
        MetaEntity.prototype.load = function(p_obj, p_parse) {
            var obj = p_obj;
            var mObj;
            
            // if (p_obj instanceof MetaEntity) {
            //     this._readEntity(p_obj, 3);
            // } else if (typeof p_obj === 'object') {
            //     mObj = MetaRegistry.hasRefer(p_obj) ? MetaRegistry.transformRefer(p_obj) : p_obj;
            //     this.setObject(mObj);
            // } else {
            //     throw new Error('[p_obj] 처리할 수 없는 타입입니다. ');
            // }
            if (p_obj instanceof MetaEntity) Message.error('ES022', ['MetaEntity']);

            // if (typeof obj === 'string') obj = JSON.parse(obj, p_reviver()); 
            if (typeof obj === 'string') {
                if (typeof p_parse === 'function') obj = p_parse(obj);
                else obj = JSON.parse(obj, null);
            }

            // 기존에 존재하면 기존 객체 리턴
            // if (MetaRegistry.has(obj)) return MetaRegistry.findSetObject(obj);
            
            this.setObject(obj);
            // if (MetaRegistry.isGuidObject(obj)) {
            //     mObj = MetaRegistry.hasRefer(obj) ? MetaRegistry.transformRefer(obj) : p_obj;
            //     this.setObject(mObj);
            // } else Message.error('ES022', ['obj']);
        };

        
        // MetaEntity.prototype.output = function(p_vOpt, p_replacer) {
        //     var rObj = this.getObject(p_vOpt);
        //     var str = JSON.stringify(rObj, p_replacer(), 2);
        //     return str;
        // };
        MetaEntity.prototype.output = function(p_stringify, p_space, p_vOpt) {
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
         * @param {Number} p_option 
         * @param {Number} p_option.1 컬럼(구조)만 가져온다. 로우만 존재하면 로우 이름의 빈 컬럼을 생성한다.
         * @param {Number} p_option.2 로우(데이터)만 가져온다 (컬럼 참조)  
         * @param {Number} p_option.3 컬럼/로우를 가져온다 <*기본값>
         */
        MetaEntity.prototype.read  = function(p_obj, p_option) {
            var entity = null;
            var opt = typeof p_option === 'undefined' ? 3 : p_option;

            if (typeof p_obj !== 'object') Message.error('ES021', ['obj', 'object']);
            if (typeof opt !== 'number') Message.error('ES021', ['option', 'number']);
            
            // if (p_obj instanceof MetaObject) throw new Error('[p_obj] MetaObject 인스턴스는 읽을 수 없습니다.');
            // if (MetaRegistry.hasRefer(p_obj)) mObj = MetaRegistry.transformRefer(obj);;

            if (p_obj instanceof MetaEntity) {
                this._readEntity(p_obj, 3);
            } else if (typeof p_obj === 'object') {
                if (p_obj.viewName) this.viewName = p_obj.viewName;
                if (p_obj.tableName) this.tableName = p_obj.tableName;
    
                if (opt % 2 === 1) this.readSchema(p_obj, opt === 3 ? true : false); // opt: 1, 3
                if (Math.floor(opt / 2) >= 1) this.readData(p_obj); // opt: 2, 3
            }
        };

        
        
        /**
         * 없으면 빈 컬럼을 생성해야 하는지?
         * 이경우에 대해서 명료하게 처리햐야함 !!
         * @param {object} p_obj gObj | obj   
         * @param {*} p_createRow true 이면, row[0] 기준으로 컬럼을 추가함
         */
        MetaEntity.prototype.readSchema  = function(p_obj, p_createRow) {
            var obj = p_obj;
            


            if (typeof p_obj !== 'object') Message.error('ES021', ['obj', 'object']);

            if (MetaRegistry.isGuidObject(p_obj)) {
                if (MetaRegistry.hasRefer(p_obj)) obj = MetaRegistry.transformRefer(p_obj);
                else obj = p_obj;
                obj = MetaEntity._transformSchema(obj); // gObj >> sObj<요약>
            }

            // table <-> view 서로 호환됨
            // if (this.instanceOf('MetaView') && entity['viewName']) this['viewName'] = entity['viewName'];
            // if (this.instanceOf('MetaTable') && entity['tableName']) this['tableName'] = entity['tableName'];
            
            this._readSchema(obj, p_createRow);
        };
        

        

        /**
         * 존재하는 로우만 가져온다.
         * @param {*} p_obj 
         */
        MetaEntity.prototype.readData  = function(p_obj) {
            var obj = p_obj;
            var rows;

            if (typeof p_obj !== 'object') Message.error('ES021', ['obj', 'object']);

            if (MetaRegistry.isGuidObject(p_obj)) {
                if (MetaRegistry.hasRefer(p_obj)) obj = MetaRegistry.transformRefer(p_obj);
                obj = MetaEntity._transformSchema(p_obj);
            }

            // if (MetaRegistry.isGuidObject(p_obj) && MetaRegistry.hasRefer(p_obj)) {
            //     p_obj = MetaRegistry.transformRefer(p_obj);
            // }

            rows = obj['rows'] || obj;
            if (Array.isArray(rows) && this.columns.count > 0) {
                for (var i = 0; i < rows.length; i++) {
                    var row = this.newRow(this);
                    for (var key in rows[i]) {
                        if (Object.hasOwnProperty.call(row, key)) {
                            row[key] = rows[i][key];
                        }
                    }
                    this.rows.add(row);
                }
            }
        };

        MetaEntity.prototype.write  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var obj = this.writeSchema(vOpt);
            
            obj.rows = this.writeData(vOpt).rows;
            return obj;
        };

        MetaEntity.prototype.writeSchema  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var obj = { columns: {}, rows: [] };

            obj._guid = this._guid;
            if(this._baseEntity) obj._baseEntity = MetaRegistry.createReferObject(this._baseEntity); 

            // if (this.instanceOf('MetaView')) obj.viewName = this.viewName;
            // if (this.instanceOf('MetaTable')) obj.tableName = this.tableName;

            for(var i = 0; i < this.columns.count; i++) {
                var column = this.columns[i];
                var key = this.columns.keyOf(i);
                var cObj = {};
                var rObj = column.getObject(p_vOpt);

                cObj._guid = column._guid;
                if (rObj.cloumnName) cObj.cloumnName = column.columnName;
                if (rObj.default) cObj.default = rObj.default;
                if (rObj.caption) cObj.caption = rObj.caption;
                if (rObj.isNotNull) cObj.isNotNull = rObj.isNotNull;
                if (rObj.constraints) cObj.constraints = rObj.constraints;
                if (rObj.getter) cObj.getter = rObj.getter;
                if (rObj.setter) cObj.setter = rObj.setter;
                if (rObj.alias) cObj.alias = rObj.alias;
                if (rObj.value) cObj.alias = rObj.value;
                
                obj.columns[key] = cObj;
            }

            // TODO: 요소이름에서 _key 제외해야 함
            obj.columns['$key'] = [];
            for (var i = 0; i < this.columns['_keys'].length; i++) {
                var key = this.columns['_keys'][i];
                obj.columns['$key'].push(key);
            }
            return obj;
        };

        MetaEntity.prototype.writeData  = function(p_vOpt) {
            var vOpt = p_vOpt || 0;
            var obj = { rows: [] };
            
            for(var i = 0; i < this.rows.count; i++) {
                var row = this.rows[i];
                var rObj = {};
                for(var ii = 0; ii < row.list.length; ii++) {
                    var rValue = row.list[ii];
                    var rKey = row['_keys'][ii];
                    rObj[rKey] = rValue;
                }
                obj.rows.push(rObj);
            }
            return obj;
        };

        /** @abstract */
        MetaEntity.prototype.clone = function() {
            Message.error('ES013', ['clone()']);
        };

        /** @abstract */
        MetaEntity.prototype.copy = function() {
            Message.error('ES013', ['copy()']);
        };

        return MetaEntity;
    
    }(MetaElement));


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaEntity = MetaEntity;
    } else {
        _global._L.MetaEntity = MetaEntity;
        _global._L.Meta.Entity.MetaEntity = MetaEntity;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));