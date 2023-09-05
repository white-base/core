/**
 * namespace _L.Meta.Entity.Entity
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaObject;
    var MetaElement;
    var IGroupControl;
    var IAllControl;
    var MetaRowCollection;
    var MetaRow;
    var MetaColumnCollection;
    var MetaView;
    var MetaRegistry;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                        = require('./util');
        IGroupControl               = require('./i-control-group').IGroupControl;
        IAllControl                 = require('./i-control-all').IAllControl;
        MetaObject                  = require('./meta-object').MetaObject;
        MetaElement                 = require('./meta-element').MetaElement;
        MetaRowCollection           = require('./meta-row').MetaRowCollection;
        MetaRow                     = require('./meta-row').MetaRow;
        MetaColumnCollection        = require('./meta-column').MetaColumnCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Util                        = _global._L.Util;
        IGroupControl               = _global._L.IGroupControl;
        IAllControl                 = _global._L.IAllControl;
        MetaObject                  = _global._L.MetaObject;
        MetaElement                 = _global._L.MetaElement;
        MetaRowCollection           = _global._L.MetaRowCollection;
        MetaRow                     = _global._L.MetaRow;
        MetaColumnCollection        = _global._L.MetaColumnCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IGroupControl === 'undefined') throw new Error('[IGroupControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof MetaRowCollection === 'undefined') throw new Error('[MetaRowCollection] module load fail...');
    if (typeof MetaRow === 'undefined') throw new Error('[MetaRow] module load fail...');
    if (typeof MetaColumnCollection === 'undefined') throw new Error('[MetaColumnCollection] module load fail...');
    if (typeof MetaRegistry === 'undefined') throw new Error('[MetaRegistry] module load fail...');

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

            var metaSet = null;
            var columns = null;     
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
            Object.defineProperty(this, 'columns', 
            {
                get: function() { return columns; },
                set: function(newValue) { 
                    if (!(newValue instanceof MetaColumnCollection)) throw new Error('Only [columns] type "MetaColumnCollection" can be added');
                    columns = newValue;
                },
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

            Util.implements(this, IGroupControl, IAllControl);
        }
        Util.inherits(MetaEntity, _super);

        MetaEntity._NS = 'Meta.Entity';          // namespace
        MetaEntity._PARAMS = ['name'];         // creator parameter

        // 3가지 타입 입력
        MetaEntity._transformObject  = function(mObj) {
            var obj  = {
                columns: null,
                rows: null
            };

            if (mObj['columns'] || mObj['rows']) obj = mObj;
            return transformEntity(obj);

            // inner function
            function transformEntity(mObj) {
                var obj = {};
                if (mObj['name']) obj['name'] = mObj['name'];
                if (mObj['columns']) obj['columns'] = transformColumn(mObj['columns']);
                if (mObj['rows']) obj['rows'] = transformRow(mObj['rows']);
                return obj;
            }
            function transformColumn(mObj) {
                var obj = {};
                for (var i = 0; i < mObj['_elem'].length; i++) {
                    var column = mObj['_elem'][i];
                    var key = mObj['_key'][i] || column.name;
                    obj[key] = column;
                }
                obj['_key'] = mObj['_key'];
                return obj;
            }
            function transformRow(mObj) {
                var arr = [];
                for (var i = 0; i < mObj['_elem'].length; i++) {
                    var rows = mObj['_elem'][i];
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
         * 아이템 추가한다. (내부)
         * @Private
         * @param {*} p_name 
         * @param {*} p_property 
         */
        // MetaEntity.prototype.__addItem  = function(p_name, p_property) {
            
        //     if(!this.columns.contains(this.columns[p_name])) this.columns.add(p_name);
            
        //     if (typeof p_property === 'object' ) {
        //         for(var prop in p_property) {
        //             this.columns[p_name][prop] = p_property[prop];
        //         }
        //     }
        // };

        /**
         * 빈 row 채운다.
         * @param {*} p_target 
         */
        // MetaEntity.prototype.__fillRow  = function(p_target) {
        //     var itemName;
            
        //     for (var i = 0 ; i < this.rows.count; i++) {
        //         for (var ii = 0; ii < p_target.columns.count; ii++) {
        //             itemName = p_target.columns[ii].name;
        //             if (typeof this.rows[i][itemName] === 'undefined') {
        //                 this.rows[i].add(itemName, '');
        //             }
        //         }
        //     }            
        // };

        /**
         * 객체(JSON)를 불러온다.
         * @private 
         * @param {*} p_object 로딩할 객체
         * @param {*} p_option 로딩옵션
         */
        // MetaEntity.prototype.__loadJSON  = function(p_object, p_option) {
        //     p_option = p_option || 1;   // 기본값 덮어쓰기
            
        //     var entity;
        //     var row;
        //     var itemName;

        //     if (typeof p_object === 'undefined') throw new Error('Only [p_object] type "object" can be added');
            
        //     entity = p_object['entity']  || p_object['table'] || undefined;
            
        //     if (typeof entity === 'undefined') throw new Error('Only [p_object] type "entity | table" can be added');
            

        //     // 1.itmes, rows 배열로 구조 변경
        //     if (!Array.isArray(entity.columns)) entity.columns = [entity.columns];
        //     if (!Array.isArray(entity.rows)) entity.rows = [entity.rows];

        //     // 2.병합
        //     if (p_option === 1) {
        //         // MetaColumn 기준으로 아이템 가져오기
        //         if (entity.columns && entity.columns[0]) {
        //             for(var i = 0; entity.columns.length > i; i++) {
        //                 // MetaColumn 가져오기
        //                 for (var prop in entity.columns[i]) {
        //                     if (entity.columns[i].hasOwnProperty(prop)) {
        //                         this.__addItem(prop, entity.columns[i][prop]);
        //                     }
        //                 }
        //             }
        //         }

        //         // MetaRow 기준으로 아이템 가져오기 (첫번째 MetaRow 기준)
        //         if (entity.rows && entity.rows[0]) {
        //             for (var prop in entity.rows[0]) {
        //                 if (entity.rows[0].hasOwnProperty(prop)) {
        //                     this.__addItem(prop, '');
        //                 }
        //             }
        //         }
        //     }
            
        //     // 3.MetaRow 데이터 가져오기
        //     if (this.columns.count > 0 && entity.rows && entity.rows[0]) {
        //         for(var i = 0; entity.rows.length > i; i++) {
                    
        //             row = this.newRow();
        //             for (var prop in entity.rows[i]) {
        //                 if (entity.rows[i].hasOwnProperty(prop) && typeof row[prop] !== 'undefined') {
        //                     row[prop] = entity.rows[i][prop];
        //                 }
        //             }
        //             if (row.count) this.rows.add(row);
        //         }
        //     } 
            
        //     // 4.빈 MetaRow 채우기
        //     for (var i = 0 ; i < this.rows.count; i++) {
        //         for (var ii = 0; ii < this.columns.count; ii++) {
        //             itemName = this.columns[ii].name;
        //             if (typeof this.rows[i][itemName] === 'undefined') {
        //                 this.rows[i].add(itemName, '');
        //             }
        //         }
        //     }   
        // };

        /**
         * MetaEntity 를 불러(로드)온다.
         * @private
         * @param {*} p_object 대상 엔티티
         * @param {*} p_option 옵션
         */
        // MetaEntity.prototype.__readEntity  = function(p_object, p_option) {
        //     p_option = p_option || 1;   // 기본값 덮어쓰기

        //     var entity = p_object;
        //     var row;
        //     var itemName;

        //     // 1.병합
        //     if (p_option === 1) {
        //         // MetaColumn 기준으로 아이템 가져오기
        //         for(var i = 0; entity.columns.count > i; i++) {
        //             itemName = entity.columns[i].name;
        //             if (typeof this.columns[itemName] === 'undefined') this.columns.add(entity.columns[i]);
        //         }
        //     }
            
        //     // 2.Row 데이터 가져오기
        //     for(var i = 0; entity.rows.count > i; i++) {
                
        //         row = this.newRow();

        //         for (var ii = 0; ii < this.columns.count; ii++) {
        //             itemName = this.columns[ii].name;
                    
        //             // row[itemName] = typeof entity.rows[i][itemName] !== 'undefined' ? entity.rows[i][itemName] : '';
        //             // 이해하기 쉽게 코드 변경
        //             if (typeof entity.rows[i][itemName] !== 'undefined') {
        //                 row[itemName] = entity.rows[i][itemName];    
        //             } else {
        //                 row[itemName] = ''; // COVER:
        //             }
        //         }
        //         this.rows.add(row);
        //     }

        //     // 4.빈 Row 채우기
        //     if (p_option === 1) this.__fillRow(entity);
        // };

        MetaEntity.prototype._readEntity = function(p_entity, p_option) {
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

        MetaEntity.prototype._buildEntity = function(entity, p_callback, p_items) {
            var orignal = this.clone();
            var columnName;

            // var MetaView                    = require('./meta-view').MetaView;
            
            // entity 컬럼 구성
            if (p_items.length === 0) {
                for (var i = 0; i < this.columns.count; i++) {
                    // columnName = this.columns[i].name;
                    // entity.columns.add(columnName);  // 참조로 등록
                    entity.columns.add(this.columns[i]);
                }
            } else {
                for (var i = 0; i < p_items.length; i++) {
                    columnName = p_items[i];
                    if (typeof columnName !== 'string') throw new Error('items 은 문자열만 가능합니다.');
                    // if (typeof columnName.length === 0) throw new Error('빈 items 은 입력할 수 없습니다.');
                    // entity.columns.add(columnName);  // 참조로 등록
                    if (!this.columns.exist(columnName)) throw new Error('items 의 column 이 없습니다.');
                    entity.columns.add(this.columns[i]);
                }
            }

            // row 등록
            for (var i = 0; i < orignal.rows.count; i++) {
                if (!p_callback || (typeof p_callback === 'function' && p_callback.call(this, orignal.rows[i], i, entity))) {
                    entity.rows.add(createRow(orignal.rows[i]));
                } 
            }

            return entity;

            // row 등록
            function createRow(p_row) {
                var alias, newRow;

                newRow = entity.newRow();
                for (var ii = 0; ii < entity.columns.count; ii++) {
                    alias = entity.columns[ii].alias;
                    if (p_items.length > 0 && p_items.indexOf(alias) < 0) continue;
                    newRow[alias] = p_row[alias];
                }
                return newRow;
            }
        };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaEntity.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this);

            obj.metaSet = MetaRegistry.createReferObject(this.metaSet);
            obj.columns = this.columns.getObject(p_vOpt);
            obj.rows = this.rows.getObject(p_vOpt);
            return obj;                        
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
        // MetaEntity.prototype.load  = function(p_object, p_option) {
        //     if (p_object instanceof MetaEntity) {
        //         this.__readEntity(p_object, p_option);
        //     } else {
        //         this.__loadJSON(p_object, p_option);
        //     }
        // };
        
        

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
        // MetaEntity.prototype.merge  = function(p_target, p_option) {
        //     p_option = p_option || 1;    // 기본값

        //     var row;
        //     var itemName;

        //     // 1.유효성 검사
        //     if (!(p_target instanceof MetaEntity)) throw new Error('Only [p_target] type "MetaEntity" can be added');

        //     // 2.병합 : MetaColumn 기준으로 아이템 가져오기
        //     for(var i = 0; p_target.columns.count > i; i++) {
        //         itemName = p_target.columns[i].name;
                
        //         // 없으면 생성
        //         if (typeof this.columns[itemName] === 'undefined') {
        //             this.columns.add(p_target.columns[i]);
        //         }
                
        //         // option = 2: 기존 item 덮어쓰기
        //         if (p_option === 2 && typeof this.columns[itemName] !== 'undefined') {
        //             this.columns[itemName] = p_target.columns[itemName];
        //         }
        //     }
            
        //     // 3.MetaRow 데이터 가져오기
        //     if (p_option !== 3) {
        //         for(var i = 0; p_target.rows.count > i; i++) {
        //             // this.rows 있는 경우
        //             if (typeof this.rows[i] !== 'undefined') {  
        //                 row = this.rows[i];
        //                 for (var ii = 0; ii < p_target.columns.count; ii++) {
        //                     itemName = p_target.columns[ii].name;
        //                     if (typeof this.rows[i][itemName] === 'undefined') {    // 이름이 없는 경우
        //                         row.add(itemName, p_target.rows[i][itemName]);
        //                     } else if (p_option === 2 && typeof this.rows[i][itemName] !== 'undefined') {   // 덮어쓰기
        //                         row[itemName] = p_target.rows[i][itemName];     
        //                     }
        //                 }
        //             // this.rows 없는 경우
        //             } else {                                    
        //                 row = this.newRow();
        //                 for (var ii = 0; ii < p_target.columns.count; ii++) {
        //                     itemName = p_target.columns[ii].name;
        //                     // 덮어쓰기
        //                     if (p_option === 2) row[itemName] = p_target.rows[i][itemName];
        //                 }
        //                 this.rows.add(row);
        //             }
        //         }
        //     }

        //     // 4.공백 채우기
        //     this.__fillRow(p_target);
        // };
        
        


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

            if (!(p_row instanceof MetaRow)) throw new Error('Only [p_row] type "Row" can be added');

            for(var i = 0; this.columns.count > i; i++) {
                // this.columns[i].value = p_row[i];
                alias = this.columns[i].alias;        // 별칭이 없을시 name 설정됨
                this.columns[i].value = p_row[alias];
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
        // MetaEntity.prototype.select  = function(p_filter, p_index, p_end) {
        //     var EXECEPT = '__except';
        //     var list = [];
        //     var excepts = [];
        //     var obj, f;
        //     var filterItem;
            
        //     // REVIEW:: 이후에 복제로 변경 검토, 자신의 생성자로 생성
        //     var entity = new this.constructor(this.name);   
        //     var idx;


        //     // var MetaView                    = require('./meta-view').MetaView;

        //     // 1.제외 아이템 조회
        //     if (p_filter && p_filter[EXECEPT]) {
        //         if (Array.isArray(p_filter[EXECEPT])) excepts = p_filter[EXECEPT];
        //         else if (typeof p_filter[EXECEPT] === 'string') excepts.push(p_filter[EXECEPT]);    // COVER:
        //     }
        //     for (var i = 0; this.columns.count > i; i++) {
        //         if (excepts.indexOf(this.columns[i].name) < 0)  {
                    
        //             // 임시함수에 객체 생성방식
        //             f = function() {};
        //             f.prototype = this.columns[i];
        //             var obj = new f();
                    
        //             // 필터 설정(등록)
        //             if (p_filter && p_filter[this.columns[i].name]) {
        //                 filterItem = p_filter[this.columns[i].name];    
        //                 for(var prop in filterItem) {
        //                     obj[prop] = filterItem[prop];
        //                 }
        //             }
        //             if (obj[EXECEPT] !== true) list.push(obj);
        //         }
        //     }

        //     // 2.정렬
        //     list.sort(function(a, b) { return a.order - b.order; });

        //     // 3.리턴 MetaEntity 의 MetaColumn 구성 : 참조형
        //     for(var i = 0; i < list.length; i++) {
        //         entity.columns.add(list[i]);
        //     }
            
        //     // 4.리턴 MetaEntity 의 MetaRow 구성 : 참조형
        //     if (typeof p_index === 'number') {
        //         for(var i = p_index; i < this.rows.count; i++) {
        //             // entity.rows.add(this.rows[idx]);
        //             entity.rows.add(createRow(i, this));
        //             if (typeof p_end === 'number' && i === p_end) break;
        //         }
        //     } else if (Array.isArray(p_index)) {
        //         for(var i = 0; i < p_index.length; i++) {
        //             idx = p_index[i];
        //             if (typeof idx === 'number' && typeof this.rows[idx] !== 'undefined') {
        //                 // entity.rows.add(this.rows[idx]);
        //                 entity.rows.add(createRow(idx, this));
        //             }
        //         }
        //     }
            
        //     return entity;

        //     /** @inner row 항목을 재구성하여 생성 (내부 함수) */
        //     function createRow(rowIdx, orgEntity) {
        //         var row = entity.newRow();
        //         var i_name;

        //         for (var i = 0; entity.columns.count > i ; i++) {
        //             i_name = entity.columns[i].name;
        //             if (typeof row[i_name] !== 'undefined' && typeof orgEntity.rows[rowIdx][i_name] !== 'undefined') {
        //                 row[i_name] = orgEntity.rows[rowIdx][i_name];
        //             }
        //         }
        //         return row;
        //     }
        // };

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
            if (!(p_target instanceof MetaEntity)) throw new Error('Only [p_target] type "MetaEntity" can be added');
            if (typeof p_option !== 'number') throw new Error('Only [p_option] type "Number" can be added');

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
                    if (this.columns.exist(alias)) throw new Error('column.name 중복 발생 '+ key);
                    if (this.columns.existAlias(alias)) throw new Error('column.alias 중복 발생 '+ key);
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
                    clone.columnName = tarColumns[i].alias;
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
                    if (this.columns.exist(alias)) throw new Error('column.name 중복 발생 '+ key);
                    if (this.columns.existAlias(alias)) throw new Error('column.alias 중복 발생 '+ key);
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

        MetaEntity.prototype.select  = function(p_filter, p_args) {
            var args = Array.prototype.slice.call(arguments);
            var _this = this;
            var MetaView                    = require('./meta-view').MetaView;
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

            // function createView(view, p_callback, p_items) {
            //     var orignal = _this.clone();
            //     var columnName;

            //     // var MetaView                    = require('./meta-view').MetaView;
                
            //     // view 컬럼 구성
            //     if (p_items.length === 0) {
            //         for (var i = 0; i < _this.columns.count; i++) {
            //             columnName = _this.columns[i].name;
            //             view.columns.add(columnName);  // 참조로 등록
            //         }
            //     } else {
            //         for (var i = 0; i < p_items.length; i++) {
            //             columnName = p_items[i];
            //             if (typeof columnName !== 'string') throw new Error('items 은 문자열만 가능합니다.');
            //             if (typeof columnName.length === 0) throw new Error('빈 items 은 입력할 수 없습니다.');
            //             view.columns.add(columnName);  // 참조로 등록
            //         }
            //     }

            //     // row 등록
            //     for (var i = 0; i < orignal.rows.count; i++) {
            //         if (!p_callback || (typeof p_callback === 'function' && p_callback.call(_this, orignal.rows[i], i, view))) {
            //             view.rows.add(createRow(orignal.rows[i]));
            //         } 
            //     }

            //     return view;

            //     function createRow(p_row) {
            //         var alias, newRow;
    
            //         newRow = view.newRow();
            //         for (var ii = 0; ii < view.columns.count; ii++) {
            //             alias = view.columns[ii].alias;
            //             if (p_items.length > 0 && p_items.indexOf(alias) < 0) continue;
            //             newRow[alias] = p_row[alias];
            //         }
            //         return newRow;
            //     }    
            // }
        };
        
        // MetaEntity.prototype.select  = function(p_filter, p_arg) {
            
        // };

        /**
         * 불러오기/가져오기 (!! 병합용도가 아님)
         * 기존을 초기화 하고 불러오는 역활
         * @param {object | MetaEntity} p_target 로드 대상
         */
        MetaEntity.prototype.load = function(p_obj, p_parse) {
            var obj = p_obj;
            var mObj;
            
            // if (p_obj instanceof MetaEntity) {
            //     this._readEntity(p_obj, 3);
            // } else if (typeof p_obj === 'object') {
            //     mObj = MetaRegistry.hasReferObject(p_obj) ? MetaRegistry.transformRefer(p_obj) : p_obj;
            //     this.setObject(mObj);
            // } else {
            //     throw new Error('[p_obj] 처리할 수 없는 타입입니다. ');
            // }
            if (p_obj instanceof MetaEntity) throw new Error('[MetaEntity] 타입을 load() 할수 없습니다. read()로 읽으세요.');

            // if (typeof obj === 'string') obj = JSON.parse(obj, p_reviver()); 
            if (typeof obj === 'string') {
                if (typeof p_parse === 'function') obj = p_parse(obj);
                else obj = JSON.parse(obj, null);
            }

            // 기존에 존재하면 기존 객체 리턴
            if (MetaRegistry.hasMetaObject(obj)) return MetaRegistry.find(obj['_guid']);
            
            if (MetaRegistry.isGuidObject(obj)) {
                mObj = MetaRegistry.hasReferObject(obj) ? MetaRegistry.transformRefer(obj) : p_obj;
                this.setObject(mObj);
            } else {
                throw new Error('[p_obj] 처리할 수 없는 타입입니다. ');
            }
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

            if (typeof p_obj !== 'object') throw new Error('Only [p_obj] type "object" can be added');
            if (typeof opt !== 'number') throw new Error('[p_option] 은 number 타입만 가능합니다. ');
            
            // if (p_obj instanceof MetaObject) throw new Error('[p_obj] MetaObject 인스턴스는 읽을 수 없습니다.');
            // if (MetaRegistry.hasReferObject(p_obj)) mObj = MetaRegistry.transformRefer(obj);;

            if (p_obj instanceof MetaEntity) {
                this._readEntity(p_obj, 3);
            } else if (typeof p_obj === 'object') {
                // TODO: 이름 통일 필요
                if (p_obj.viewName) this.viewName = p_obj.viewName;
                if (p_obj.tableName) this.tableName = p_obj.tableName;
    
                if (opt % 2 === 1) this.readSchema(p_obj, opt === 3 ? true : false); // opt: 1, 3
                if (Math.floor(opt / 2) >= 1) this.readData(p_obj); // opt: 2, 3
            }
        };

        
        
        /**
         * 없으면 빈 컬럼을 생성해야 하는지?
         * 이경우에 대해서 명료하게 처리햐야함 !!
         * @param {*} p_obj 
         * @param {*} p_createRow true 이면, row[0] 기준으로 컬럼을 추가함
         */
        MetaEntity.prototype.readSchema  = function(p_obj, p_createRow) {
            var _this = this;
            var obj = p_obj;
            var columns;
            var rows;
            var Column = this.columns._baseType;

            if (typeof p_obj !== 'object') throw new Error('Only [p_obj] type "object" can be added');

            if (MetaRegistry.isGuidObject(p_obj)) {
                if (MetaRegistry.hasReferObject(p_obj)) obj = MetaRegistry.transformRefer(p_obj);
                else obj = p_obj;
                obj = MetaEntity._transformObject(obj);
            }

            // table <-> view 서로 호환됨
            // if (this.instanceOf('MetaView') && entity['viewName']) this['viewName'] = entity['viewName'];
            // if (this.instanceOf('MetaTable') && entity['tableName']) this['tableName'] = entity['tableName'];
            
            columns = obj['columns'];
            if (columns) {
                for (var key in columns) {
                    // if (Object.hasOwnProperty.call(columns, key) && typeof columns[key] === 'object') {
                    //     if (this.rows.count > 0 ) throw new Error('[제약조건] rows 가 존재하여, 컬럼을 추가 할 수 없습니다.');
                    //     var prop = columns[key];
                    //     if (prop['_entity'] && MetaRegistry.hasMetaObject(prop['_entity'])) {
                    //         prop['_entity'] = MetaRegistry.find(prop['_entity']['_guid']);
                    //     }
                    //     var column = new Column(key, this, prop);
                    //     if (this.columns.exist(key)) throw new Error('기존에 key 가 존재합니다.');
                    //     this.columns.add(column);
                    // }
                }
                // 키 추출방식 2가지
                if (columns['_key'] && Array.isArray(columns['_key'])) {
                    for (var i = 0; i < columns['_key'].length; i++) {
                        addColumn(columns['_key'][i], columns);
                    }
                } else {
                    for (var key in columns) {
                        addColumn(key, columns);
                    }
                }
                function addColumn(key, columns) {
                    if (Object.hasOwnProperty.call(columns, key) && typeof columns[key] === 'object') {
                        if (_this.rows.count > 0 ) throw new Error('[제약조건] rows 가 존재하여, 컬럼을 추가 할 수 없습니다.');
                        var prop = columns[key];
                        if (prop['_entity'] && MetaRegistry.hasMetaObject(prop['_entity'])) {
                            prop['_entity'] = MetaRegistry.find(prop['_entity']['_guid']);
                        }
                        var column = new Column(key, _this, prop);
                        if (_this.columns.exist(key)) throw new Error('기존에 key 가 존재합니다.');
                        _this.columns.add(column);
                    }
                }

                // for(var i = 0; i < columns._elem.length; i++) {
                //     var elem = columns._elem[i];
                //     var key = columns._key[i];  // 없을경우 $key 도 경우에 삽입 TODO:
                //     var column = new Column(key, this, elem);
                //     if (this.rows.count > 0 ) throw new Error('[제약조건] rows 가 존재하여, 컬럼을 추가 할 수 없습니다.');
                //     if (this.columns.exist(key)) throw new Error('기존에 key 가 존재합니다.');
                //     this.columns.add(column);
                // }
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
            // rows = p_obj['rows'];
            // if (rows && p_createRow === true) {
            //     if (Array.isArray(rows._elem) && rows._elem.length > 0)
            //     var row = rows._elem[0];
            //     if (Array.isArray(row['_key']) && row['key'].length > 0) {
            //         for (var i = 0; i < row.length; i++) {
            //             var key = row[i];
            //             if (!this.columns.exist(key)) {
            //                 var column = new Column(key, this);
            //                 this.columns.add(column);
            //             }
            //         }
            //     }
            // }
        };
        

        /**
         * 존재하는 로우만 가져온다.
         * @param {*} p_obj 
         */
        MetaEntity.prototype.readData  = function(p_obj) {
            var obj = p_obj;
            var rows;

            if (typeof p_obj !== 'object') throw new Error('Only [p_obj] type "object" can be added');

            if (MetaRegistry.isGuidObject(p_obj)) {
                if (MetaRegistry.hasReferObject(p_obj)) obj = MetaRegistry.transformRefer(p_obj);
                obj = MetaEntity._transformObject(p_obj);
            }

            // if (MetaRegistry.isGuidObject(p_obj) && MetaRegistry.hasReferObject(p_obj)) {
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

        MetaEntity.prototype.write  = function() {
            var obj = this.writeSchema();
            
            obj.rows = this.writeData().rows;
            return obj;
        };

        // MetaEntity.prototype.writeSchema  = function() {
        //     var obj = {
        //         columns: {}
        //     };

        //     if (this.instanceOf('MetaView')) obj.viewName = this.viewName;
        //     if (this.instanceOf('MetaTable')) obj.tableName = this.tableName;

        //     for(var i = 0; i < this.columns.count; i++) {
        //         var key = this.columns.keyOf(i);
        //         obj.columns[key] = this.columns[i].getObject(p_vOpt);
        //     }
        //     return obj;
        // };
        MetaEntity.prototype.writeSchema  = function() {
            var obj = { columns: {}, rows: [] };

            // if (this.instanceOf('MetaView')) obj.viewName = this.viewName;
            // if (this.instanceOf('MetaTable')) obj.tableName = this.tableName;

            for(var i = 0; i < this.columns.count; i++) {
                var column = this.columns[i];
                var key = this.columns.keyOf(i);
                var cObj = {};
                var rObj = column.getObject();

                // TODO: 기본값과 같은경우, 없는경우 생략 getObject 를 기준으로 가져와야 맞을듯
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
            obj.columns['_key'] = [];
            for (var i = 0; i < this.columns['_keys'].length; i++) {
                var key = this.columns['_keys'][i];
                obj.columns['_key'].push(key);
            }
            return obj;
        };

        MetaEntity.prototype.writeData  = function() {
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
            throw new Error('[ clone() ] Abstract method definition, fail...');
        };

        /** @abstract */
        MetaEntity.prototype.copy = function() {
            throw new Error('[ copy() ] Abstract method definition, fail...');
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