/**
 * namespace _L.Meta.Entity.Entity
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaElement;
    var IGroupControl;
    var IAllControl;
    var MetaRowCollection;
    var MetaRow;
    var MetaColumnCollection;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};    
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                        = require('./util');
        IGroupControl               = require('./i-control-group');
        IAllControl                 = require('./i-control-all');
        MetaElement                 = require('./meta-element');
        MetaRowCollection           = require('./meta-row').MetaRowCollection;
        MetaRow                     = require('./meta-row').MetaRow;
        MetaColumnCollection        = require('./meta-column').MetaColumnCollection;
    } else {
        Util                    = _global._L.Common.Util;
        IGroupControl           = _global._L.Interface.IGroupControl;
        IAllControl             = _global._L.Interface.IAllControl;
        MetaElement             = _global._L.Meta.MetaElement;
        MetaRowCollection       = _global._L.Meta.Entity.MetaRowCollection;
        MetaRow                 = _global._L.Meta.Entity.MetaRow;
        MetaColumnCollection    = _global._L.Meta.Entity.MetaColumnCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IGroupControl === 'undefined') throw new Error('[IGroupControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof MetaRowCollection === 'undefined') throw new Error('[MetaRowCollection] module load fail...');
    if (typeof MetaRow === 'undefined') throw new Error('[MetaRow] module load fail...');
    if (typeof MetaColumnCollection === 'undefined') throw new Error('[MetaColumnCollection] module load fail...');


    //==============================================================
    // 4. 모듈 구현    
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

            var metaSet = null;
            // var columns = null;     
            var rows  = new MetaRowCollection(this);

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaColumnCollection} _L.Meta.Entity.MetaEntity#metaSet
             */
            Object.defineProperty(this, 'metaSet', 
            {
                get: function() { return metaSet; },
                set: function(newValue) { 
                    if (!(newValue instanceof MetaElement && newValue.instanceOf('MetaSet'))) {
                        throw new Error('Only [metaSet] type "MetaSet" can be added');
                    }
                    metaSet = newValue;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaColumnCollection} _L.Meta.Entity.MetaEntity#columns
             */
            this.columns = null;
            
            // Object.defineProperty(this, 'columns', 
            // {
            //     get: function() { return columns; },
            //     set: function(newValue) { 
            //         if (!(newValue instanceof MetaColumnCollection)) throw new Error('Only [columns] type "MetaColumnCollection" can be added');
            //         columns = newValue;
            //     },
            //     configurable: true,
            //     enumerable: true
            // });
            
            /**
             * 엔티티의 데이터(로우) 컬렉션
             * @member {MetaRowCollection} _L.Meta.Entity.MetaEntity#rows
             */
            Object.defineProperty(this, 'rows', 
            {
                get: function() { return rows; },
                // set: function(newValue) { // COVER:
                //     if (!(newValue instanceof MetaRowCollection)) throw new Error('Only [rows] type "MetaRowCollection" can be added'); 
                //     rows = newValue;
                // },
                configurable: false,
                enumerable: true
            });

            Util.implements(this, IGroupControl, IAllControl);
        }
        Util.inherits(MetaEntity, _super);

        /**
         * 아이템 추가한다. (내부)
         * @Private
         * @param {*} p_name 
         * @param {*} p_property 
         */
        MetaEntity.prototype.__addItem  = function(p_name, p_property) {
            
            if(!this.columns.contains(this.columns[p_name])) this.columns.add(p_name);
            
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    this.columns[p_name][prop] = p_property[prop];
                }
            }
        };

        /**
         * 빈 row 채운다.
         * @param {*} p_target 
         */
        MetaEntity.prototype.__fillRow  = function(p_target) {
            var itemName;
            
            for (var i = 0 ; i < this.rows.count; i++) {
                for (var ii = 0; ii < p_target.columns.count; ii++) {
                    itemName = p_target.columns[ii].name;
                    if (typeof this.rows[i][itemName] === 'undefined') {
                        this.rows[i].add(itemName, '');
                    }
                }
            }            
        };

        /**
         * 객체(JSON)를 불러온다.
         * @private 
         * @param {*} p_object 로딩할 객체
         * @param {*} p_option 로딩옵션
         */
        MetaEntity.prototype.__loadJSON  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기
            
            var entity;
            var row;
            var itemName;

            if (typeof p_object === 'undefined') throw new Error('Only [p_object] type "object" can be added');
            
            entity = p_object['entity']  || p_object['table'] || undefined;
            
            if (typeof entity === 'undefined') throw new Error('Only [p_object] type "entity | table" can be added');
            

            // 1.itmes, rows 배열로 구조 변경
            if (!Array.isArray(entity.columns)) entity.columns = [entity.columns];
            if (!Array.isArray(entity.rows)) entity.rows = [entity.rows];

            // 2.병합
            if (p_option === 1) {
                // MetaColumn 기준으로 아이템 가져오기
                if (entity.columns && entity.columns[0]) {
                    for(var i = 0; entity.columns.length > i; i++) {
                        // MetaColumn 가져오기
                        for (var prop in entity.columns[i]) {
                            if (entity.columns[i].hasOwnProperty(prop)) {
                                this.__addItem(prop, entity.columns[i][prop]);
                            }
                        }
                    }
                }

                // MetaRow 기준으로 아이템 가져오기 (첫번째 MetaRow 기준)
                if (entity.rows && entity.rows[0]) {
                    for (var prop in entity.rows[0]) {
                        if (entity.rows[0].hasOwnProperty(prop)) {
                            this.__addItem(prop, '');
                        }
                    }
                }
            }
            
            // 3.MetaRow 데이터 가져오기
            if (this.columns.count > 0 && entity.rows && entity.rows[0]) {
                for(var i = 0; entity.rows.length > i; i++) {
                    
                    row = this.newRow();
                    for (var prop in entity.rows[i]) {
                        if (entity.rows[i].hasOwnProperty(prop) && typeof row[prop] !== 'undefined') {
                            row[prop] = entity.rows[i][prop];
                        }
                    }
                    if (row.count) this.rows.add(row);
                }
            } 
            
            // 4.빈 MetaRow 채우기
            for (var i = 0 ; i < this.rows.count; i++) {
                for (var ii = 0; ii < this.columns.count; ii++) {
                    itemName = this.columns[ii].name;
                    if (typeof this.rows[i][itemName] === 'undefined') {
                        this.rows[i].add(itemName, '');
                    }
                }
            }   
        };

        /**
         * MetaEntity 를 불러(로드)온다.
         * @private
         * @param {*} p_object 대상 엔티티
         * @param {*} p_option 옵션
         */
        MetaEntity.prototype.__loadEntity  = function(p_object, p_option) {
            p_option = p_option || 1;   // 기본값 덮어쓰기

            var entity = p_object;
            var row;
            var itemName;

            // 1.병합
            if (p_option === 1) {
                // MetaColumn 기준으로 아이템 가져오기
                for(var i = 0; entity.columns.count > i; i++) {
                    itemName = entity.columns[i].name;
                    if (typeof this.columns[itemName] === 'undefined') this.columns.add(entity.columns[i]);
                }
            }
            
            // 2.Row 데이터 가져오기
            for(var i = 0; entity.rows.count > i; i++) {
                
                row = this.newRow();

                for (var ii = 0; ii < this.columns.count; ii++) {
                    itemName = this.columns[ii].name;
                    
                    // row[itemName] = typeof entity.rows[i][itemName] !== 'undefined' ? entity.rows[i][itemName] : '';
                    // 이해하기 쉽게 코드 변경
                    if (typeof entity.rows[i][itemName] !== 'undefined') {
                        row[itemName] = entity.rows[i][itemName];    
                    } else {
                        row[itemName] = ''; // COVER:
                    }
                }
                this.rows.add(row);
            }

            // 4.빈 Row 채우기
            if (p_option === 1) this.__fillRow(entity);
        };

        MetaEntity.prototype._loadEntity = function(p_entity, p_option) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            var _this = this;

            if (!(p_entity instanceof MetaEntity)) throw new Error('Only [p_entity] type "MetaEntity" can be added');
            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');

            if (opt % 2 === 1) loadColumn(); // opt: 1, 3
            if (Math.floor(opt / 2) >= 1) loadRow(); // opt: 2, 3

            function loadColumn() {
                if (_this.rows.count > 0 ) throw new Error('rows 가 존재하여, 컬럼을 추가 할 수 없습니다.');
                
                for (let i = 0; i < p_entity.columns.count; i++) {
                    var column = p_entity.columns[i].clone();
                    var key = p_entity.columns.keyOf(i);
                    if (_this.columns.exist(key))  throw new Error('기존에 key 가 존재합니다.');
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

        /** @abstract */
        MetaEntity.prototype.clone = function() {
            throw new Error('[ clone() ] Abstract method definition, fail...');
        };

        /** @abstract */
        MetaEntity.prototype.copy = function() {
            throw new Error('[ copy() ] Abstract method definition, fail...');
        };

        /** @override **/
        // Entity.prototype.getTypes = function() {
        //     var type = ['MetaEntity'];
            
        //     return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        // };

        // /** @override */
        // Entity.prototype.getObject = function() {
        //     // TODO::
        // };

        /**
         * '데이터를 가져오는게 주용도임'
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 기존에 row 가 존재하면 newRow 부터 가져오고, 기존item 은 공백이 들어감
         * @param {*} p_object MetaEntity 는 item과 row 는 쌍으로 존재함, JSON 은 row만 존재할 수 있음
         * @param {Number} p_option 
         * @param {Number} p_option.1 row 기준으로 가져옴, 없을시 item 생성, item 중복시 기존유지  <*기본값> 
         * @param {Number} p_option.2 존재하는 item 데이터만 가져오기
         */
        MetaEntity.prototype.load  = function(p_object, p_option) {
            if (p_object instanceof MetaEntity) {
                this.__loadEntity(p_object, p_option);
            } else {
                this.__loadJSON(p_object, p_option);
            }
        };
        
        /**
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 오류조건 : 컬럼 중복 발생시 오류   
         * @param {object | MetaEntity} p_target 로드 대상
         * @param {Number} p_option 
         * @param {Number} p_option.1 컬럼(구조)만 가져온다. 로우만 존재하면 로우 이름의 빈 컬럼을 생성한다.
         * @param {Number} p_option.2 로우(데이터)만 가져온다 (컬럼 참조)  
         * @param {Number} p_option.3 컬럼/로우를 가져온다 <*기본값>
         */
        MetaEntity.prototype.load  = function(p_target, p_option) {
            var opt = typeof p_option === 'undefined' ? 3 : p_option;

            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');
            
            if (p_target instanceof MetaEntity) {
                this._loadEntity(p_target, opt);
            } else if (typeof p_target === 'object') {
                this.read(p_target, opt);
            } else {
                throw new Error('[p_target] 처리할 수 없는 타입입니다. ');
            }
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
        };

        /**
         * 엔티티를 병합한다. (구조를 구성하는게 주용도임)
         * @param {*} p_target 병합할 MetaEntity (대상)
         * @param {*} p_option {item: 1, row:2}
         * @desc
         * 병합 : 컬렉션 순서에 따라 병한다.
         * MetaColumn MetaRow 가 있는 경우
         * - 1 columns, rows 병합 (기존유지) *기본값
         * - 2 columns, rows 병합 (덮어쓰기)  
         * - 3 row 안가져오기    (기존유지)
         */
        MetaEntity.prototype.merge  = function(p_target, p_option) {
            p_option = p_option || 1;    // 기본값

            var row;
            var itemName;

            // 1.유효성 검사
            if (!(p_target instanceof MetaEntity)) throw new Error('Only [p_target] type "MetaEntity" can be added');

            // 2.병합 : MetaColumn 기준으로 아이템 가져오기
            for(var i = 0; p_target.columns.count > i; i++) {
                itemName = p_target.columns[i].name;
                
                // 없으면 생성
                if (typeof this.columns[itemName] === 'undefined') {
                    this.columns.add(p_target.columns[i]);
                }
                
                // option = 2: 기존 item 덮어쓰기
                if (p_option === 2 && typeof this.columns[itemName] !== 'undefined') {
                    this.columns[itemName] = p_target.columns[itemName];
                }
            }
            
            // 3.MetaRow 데이터 가져오기
            if (p_option !== 3) {
                for(var i = 0; p_target.rows.count > i; i++) {
                    // this.rows 있는 경우
                    if (typeof this.rows[i] !== 'undefined') {  
                        row = this.rows[i];
                        for (var ii = 0; ii < p_target.columns.count; ii++) {
                            itemName = p_target.columns[ii].name;
                            if (typeof this.rows[i][itemName] === 'undefined') {    // 이름이 없는 경우
                                row.add(itemName, p_target.rows[i][itemName]);
                            } else if (p_option === 2 && typeof this.rows[i][itemName] !== 'undefined') {   // 덮어쓰기
                                row[itemName] = p_target.rows[i][itemName];     
                            }
                        }
                    // this.rows 없는 경우
                    } else {                                    
                        row = this.newRow();
                        for (var ii = 0; ii < p_target.columns.count; ii++) {
                            itemName = p_target.columns[ii].name;
                            // 덮어쓰기
                            if (p_option === 2) row[itemName] = p_target.rows[i][itemName];
                        }
                        this.rows.add(row);
                    }
                }
            }

            // 4.공백 채우기
            this.__fillRow(p_target);
        };
        
        /**
         * 새로운 MetaRow 를 추가한다.
         */
        MetaEntity.prototype.newRow  = function() {
            return new MetaRow(this);
        };

        /**
         * MetaRow 의 값을 아이템의 value에 설정한다.
         * @param {*} p_row 
         */
        MetaEntity.prototype.setValue  = function(p_row) {
            var _name = '';

            if (!(p_row instanceof MetaRow)) throw new Error('Only [p_row] type "Row" can be added');

            for(var i = 0; this.columns.count > i; i++) {
                
                // this.columns[i].value = p_row[i];
                _name = this.columns[i].alias;        // 별칭이 없을시 기본이름
                this.columns[i].value = p_row[_name];
            }
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
        MetaEntity.prototype.select  = function(p_filter, p_index, p_end) {
            var EXECEPT = '__except';
            var list = [];
            var excepts = [];
            var obj, f;
            var filterItem;
            
            // REVIEW:: 이후에 복제로 변경 검토, 자신의 생성자로 생성
            var entity = new this.constructor(this.name);   
            var idx;

            // 1.제외 아이템 조회
            if (p_filter && p_filter[EXECEPT]) {
                if (Array.isArray(p_filter[EXECEPT])) excepts = p_filter[EXECEPT];
                else if (typeof p_filter[EXECEPT] === 'string') excepts.push(p_filter[EXECEPT]);    // COVER:
            } 
            for (var i = 0; this.columns.count > i; i++) {
                if (excepts.indexOf(this.columns[i].name) < 0)  {
                    
                    // 임시함수에 객체 생성방식
                    f = function() {};
                    f.prototype = this.columns[i];
                    var obj = new f();
                    
                    // 필터 설정(등록)
                    if (p_filter && p_filter[this.columns[i].name]) {
                        filterItem = p_filter[this.columns[i].name];    
                        for(var prop in filterItem) {
                            obj[prop] = filterItem[prop];
                        }
                    }
                    if (obj[EXECEPT] !== true) list.push(obj);
                }
            }

            // 2.정렬
            list.sort(function(a, b) { return a.order - b.order; });

            // 3.리턴 MetaEntity 의 MetaColumn 구성 : 참조형
            for(var i = 0; i < list.length; i++) {
                entity.columns.add(list[i]);
            }
            
            // 4.리턴 MetaEntity 의 MetaRow 구성 : 참조형
            if (typeof p_index === 'number') {
                for(var i = p_index; i < this.rows.count; i++) {
                    // entity.rows.add(this.rows[idx]);
                    entity.rows.add(createRow(i, this));
                    if (typeof p_end === 'number' && i === p_end) break;
                }
            } else if (Array.isArray(p_index)) {
                for(var i = 0; i < p_index.length; i++) {
                    idx = p_index[i];
                    if (typeof idx === 'number' && typeof this.rows[idx] !== 'undefined') {
                        // entity.rows.add(this.rows[idx]);
                        entity.rows.add(createRow(idx, this));
                    }
                }
            }
            
            return entity;

            /** @inner row 항목을 재구성하여 생성 (내부 함수) */
            function createRow(rowIdx, orgEntity) {
                var row = entity.newRow();
                var i_name;

                for (var i = 0; entity.columns.count > i ; i++) {
                    i_name = entity.columns[i].name;
                    if (typeof row[i_name] !== 'undefined' && typeof orgEntity.rows[rowIdx][i_name] !== 'undefined') {
                        row[i_name] = orgEntity.rows[rowIdx][i_name];
                    }
                }
                return row;
            }
        };

        /**
         * object 로 로딩하기   
         * JSON 스키마 규칙   
         * { table: { columns: {}, rows: {} }}   
         * { columns: {...}, rows: {} }
         * @param {*} p_json 
         * @param {*} p_opt 1: 스키마, 2: 데이터, 3: 스키마/데이터 <*기본값*>
         */
        MetaEntity.prototype.read  = function(p_json, p_option) {
            var entity = null;
            var opt = typeof p_option === 'undefined' ? 3 : p_option;
            
            if (typeof p_json !== 'object') throw new Error('Only [p_json] type "object" can be added');
            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');

            entity = p_json['entity']  || p_json['table'] || p_json;

            if (opt % 2 === 1) this.readSchema(p_json); // opt: 1, 3
            if (Math.floor(opt / 2) >= 1) this.readData(p_json); // opt: 2, 3
        };

        MetaEntity.prototype.write  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaEntity.prototype.readSchema  = function(p_json) {
            var entity = null;
            var columns;
            var Column = this.columns.columnType;

            if (typeof entity !== 'object') throw new Error('Only [p_json] type "object" can be added');
            
            entity = p_json['entity'] || p_json['table'] || p_json;
            columns = entity['columns'];
            if (columns) {
                for (const key in columns) {
                    if (Object.hasOwnProperty.call(columns, key)) {
                        var prop = columns[key];
                        var column = new Column(key, this, prop);
                        this.columns.add(column);
                    }
                }
            }
        };

        MetaEntity.prototype.writeSchema  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaEntity.prototype.readData  = function(p_json) {
            var entity = null;
            var rows;

            if (typeof entity !== 'object') throw new Error('Only [p_json] type "object" can be added');
            
            entity = p_json['entity'] || p_json['table'] || p_json;
            rows = entity['rows'];
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

        MetaEntity.prototype.writeData  = function() {
            console.log('구현해야함');  // COVER:
        };

        return MetaEntity;
    
    }(MetaElement));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = MetaEntity;
    } else {
        _global._L.MetaEntity = MetaEntity;
        _global._L.Meta.Entity.MetaEntity = MetaEntity;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));