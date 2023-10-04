/**
 * namespace _L.Meta.Entity.MetaRow
 * namespace _L.Meta.Entity.MetaRowCollection
 */
// var $local = {};

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var Observer;
    var IList;
    var MetaObject;
    var TransactionCollection;
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
        Observer                    = require('./observer').Observer;
        IList                       = require('./i-list').IList;
        MetaObject                  = require('./meta-object').MetaObject;
        TransactionCollection       = require('./collection-transaction').TransactionCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {    // COVER:
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        MetaObject                  = _global._L.MetaObject;
        IList                       = _global._L.IList;
        TransactionCollection       = _global._L.TransactionCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof Observer === 'undefined') Message.error('ES011', ['Observer', 'observer']);
    if (typeof IList === 'undefined') Message.error('ES011', ['IList', 'i-list']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof TransactionCollection === 'undefined') Message.error('ES011', ['TransactionCollection', 'collection-transaction']);

    //==============================================================
    // 4. module implementation   
    var MetaRow  = (function (_super) {
        /**
         * 메타 로우
         * @constructs _L.Meta.Entity.MetaRow
         * @extends _L.Meta.MetaObject
         * @param {BaseEntity} p_entity 메타엔티티
         */
        function MetaRow(p_entity) {
            _super.call(this);
            
            var __event  = new Observer(this);
            var _entity  = null;
            var _elements = [];
            var _keys = [];
            var _this   = this;

            /** 
             * 이벤트 객체
             * @protected 
             * @member {Object} _L.Meta.Entity.MetaRow#__event  
             */
            Object.defineProperty(this, '__event', {
                get: function() { return __event; },
                configurable: false,
                enumerable: false,
            });

            

            /**
             * 로우의 소유 엔티티
             * // REVIEW: 엔티티는 설정할 수 없어야함??
             * @member {BaseEntity} _L.Meta.Entity.MetaRow#_entity
             */
            Object.defineProperty(this, '_entity', 
            {
                get: function() { return _entity; },
                // set: function(nVal) {
                //     if (nVal === null) return _entity = null;
                //     if (typeof nVal !== 'undefined' && !(nVal instanceof MetaObject && nVal.instanceOf('BaseEntity'))) {
                //         Message.error('ES032', ['_entity', 'BaseEntity']);
                //     }
                //     if (this.count > 0) Message.error('ES045', ['MetaRow', '_entity']);
                //     _entity = nVal;
                // },
                configurable: false,
                enumerable: false
            });

            /** 
             * 컬랙선 내부값 
             * @protected 
             * @member {Array} _L.Meta.Entity.MetaRow#_elements  
             */
            Object.defineProperty(this, '_elements', {
                // get: function() { return _elements; },
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _elements.length; i++) arr.push(_elements[i]);
                    return arr;
                },
                // set: function(val) {
                //     _elements = val;
                // },
                configurable: false,
                enumerable: false,
            });

            Object.defineProperty(this, '_keys',
            {
                // get: function() { return _keys; },
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _keys.length; i++) arr.push(_keys[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 목록 
             * @member {Array}  _L.Meta.Entity.MetaRow#list  
             */
            Object.defineProperty(this, 'list', {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _elements.length; i++) arr.push(_elements[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });            
            
            /**
             * 컬랙션 갯수 
             * @member {Number} _L.Meta.Entity.MetaRow#count 
             */
            Object.defineProperty(this, 'count', {
                get: function() {
                    return _elements.length;
                },
                configurable: false,
                enumerable: false
            });

            /**
             * 변경전 이벤트 
             * @event _L.Meta.Entity.MetaRow#onChanged 
             */
            Object.defineProperty(this, 'onChanging', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'onChanging');
                },
                configurable: false,
                enumerable: false,
            });
            
            /**
             * 변경후 이벤트 
             * @event _L.Meta.Entity.MetaRow#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'onChanged');
                },
                configurable: false,
                enumerable: false,
            });

            // inner variable access
            this.__GET$_elements = function(call) {
                if (call instanceof MetaRow) return _elements;
            }
            // this.__GET$_keys = function(call) {
            //     if (call instanceof MetaRow) return _keys;
            // };
            this.__SET$_elements = function(val, call) {
                if (call instanceof MetaRow) _elements = val;    // 상속접근 허용
            }
            // this.__SET$_keys = function(val, call) {
            //     if (call instanceof MetaRow) _keys = val;    // 상속접근 허용
            // };
            // this.__SET$_entity = function(val, call) {
            //     if (call instanceof MetaRow) _entity = val;    // 상속접근 허용
            // };
            
            // BaseEntity 등록 & order(순서) 값 계산
            if (!(p_entity instanceof MetaObject && p_entity.instanceOf('BaseEntity'))) {
                Message.error('ES032', ['entity', 'BaseEntity']);
            }
            
            // 설정
            // if (p_entity) {
            _entity = p_entity;

            for (var i = 0; i < _entity.columns.count; i++) {
                var idx = _elements.length;
                var alias = _entity.columns[i].alias;
                _elements.push(_entity.columns[i].default);  // 기본값 등록
                _keys.push(alias);
                Object.defineProperty(this, [i], getPropDescriptor(idx));
                Object.defineProperty(this, alias, getPropDescriptor(idx));
            }
            // }

            function getPropDescriptor(p_idx) {
                return {
                    get: function() { return _elements[p_idx]; },
                    set: function(nVal) { 
                        var oldValue = _elements[p_idx];
                        var column;
                        
                        // 엔티티 항상 존재함
                        // if (_entity && _entity.columns[p_idx]) column = _entity.columns[p_idx];
                        column = _entity.columns[p_idx];
                        if (column && column._valueTypes.length > 0) Util.validType(nVal, column._valueTypes);

                        // 트렌젹션 처리 => 함수로 추출 검토
                        if (_entity && !_entity.rows.autoChanges) {
                            var etc = 'idx:'+ p_idx +', new:' + nVal + ', old:'+ oldValue;
                            var pos = _entity.rows.indexOf(this);
                            if (pos > -1) { // 컬력션에 포힘됬을때만
                                _entity.rows._transQueue.update(pos, this, this.clone(), etc);  // 변경시점에 큐를 추가함
                            }
                        }
                        // 이벤트 및 처리
                        _this._onChanging(p_idx, nVal, oldValue);
                        _elements[p_idx] = nVal;
                        _this._onChanged(p_idx, nVal, oldValue);

                    },
                    enumerable: true,
                    configurable: false
                };
            }

            Util.implements(this, IList);
        }
        Util.inherits(MetaRow, _super);

        MetaRow._NS = 'Meta.Entity';    // namespace
        MetaRow._PARAMS = ['_entity'];  // creator parameter

        /**
         * @listens _L.Meta.Entity.MetaColumn#_onChanged
         */
        MetaRow.prototype._onChanging = function(p_idx, p_nValue, p_oValue) {
            this.__event.publish('onChanging', p_idx, p_nValue, p_oValue);
        };

        /**
         * @listens _L.Meta.Entity.MetaColumn#_onChanged
         */
        MetaRow.prototype._onChanged = function(p_idx, p_nValue, p_oValue) {
            this.__event.publish('onChanged', p_idx, p_nValue, p_oValue);
        };
        /**
         * 객체 비교
         * @override
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // MetaRow.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this.__event.__subscribers, p_target.__event.__subscribers)) return false;
        //     if (!this._compare(this._entity, p_target._entity)) return false;
        //     if (!this._compare(this._elements, p_target._elements)) return false;
        //     if (!this._compare(this._keys, p_target._keys)) return false;
        //     return true;
        // };

        /**
         * 프로퍼티 기술자 설정
         * @override
         * @protected
         * @param {Number} p_idx 인덱스
         */
        // MetaRow.prototype._getPropDescriptor = function(p_idx) {
        //     // return {
        //     //     get: function() { return this._elements[p_idx]; },
        //     //     set: function(nVal) {
        //     //         var typeName;
        //     //         if (this._elemTypes.length > 0) Util.validType(nVal, this._elemTypes);
        //     //         if (nVal._entity !== this._owner) Message.error('ES032', ['_entity', 'this._owner']);
        //     //         this._transQueue.update(p_idx, nVal, this._elements[p_idx]); 
        //     //         this._elements[p_idx] = nVal;
        //     //     },
        //     //     configurable: true,
        //     //     enumerable: true,
        //     // };

        //     var _this = this;
        //     return {
        //         get: function() { return this._elements[p_idx]; },
        //         set: function(nVal) { 
        //             var oldValue = this._elements[p_idx];
        //             // 트렌젹션 처리 => 함수로 추출 검토
        //             if (this._entity && !this._entity.rows.autoChanges) {
        //                 var etc = 'idx:'+ p_idx +', new:' + nVal + ', old:'+ oldValue;
        //                 var pos = this._entity.rows.indexOf(this);
        //                 if (pos > -1) { // 컬력션에 포힘됬을때만
        //                     this._entity.rows._transQueue.update(pos, this, this.clone(), etc);  // 변경시점에 큐를 추가함
        //                 }
        //             }
        //             // 이벤트 및 처리
        //             _this._onChanging(p_idx, nVal, oldValue);
        //             this._elements[p_idx] = nVal;
        //             _this._onChanged(p_idx, nVal, oldValue);

        //         },
        //         enumerable: true,
        //         configurable: false
        //     };
        // };


        /**
         * guid 객체 얻기
         * @override
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
         * @returns {object}
         */
        MetaRow.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            // var origin = p_origin ? p_origin : obj;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            // var origin = [];

            // if (Array.isArray(p_origin)) origin = p_origin;
            // else if (p_origin) origin.push(p_origin);
            // origin.push(obj);

            if (!Util.deepEqual(this.__event.__subscribers, this.__event._getInitObject())) {
                obj['__subscribers'] = this.__event.__subscribers;
            }
            if (vOpt < 2 && vOpt > -1 && this._entity) {
                obj['_entity'] = MetaRegistry.createReferObject(this._entity);
            }
            obj['_elem'] = [];
            for (var i = 0; i < this.list.length; i++) {
                var elem = this.list[i];
                // POINT:
                // if (elem instanceof MetaObject) obj._elem.push(elem.getObject(vOpt, origin));
                // else obj._elem.push(elem);
                if (elem instanceof MetaObject) {
                    // POINT:
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj['_elem'].push(MetaRegistry.createReferObject(elem));
                    } else obj['_elem'].push(elem.getObject(vOpt, owned));
                } else obj['_elem'].push(elem);
            }

            obj['_key'] = [];
            for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i];
                obj['_key'].push(key);
            }
            return obj;                        
        };

        /**
         * guid 객체 설정
         * @override
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        MetaRow.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var entity;
            
            if (p_oGuid['_elem'].length !== p_oGuid['_key'].length) Message.error('ES063', ['_elem', '_key']);

            // this.init();
            
            if (p_oGuid['__subscribers']) {
                this.__event.__SET$__subscribers(p_oGuid['__subscribers'], this.__event);
            }
            // this._entity = p_oGuid._entity;
            // if (p_oGuid._entity) {
            //     entity = MetaRegistry.findSetObject(origin, p_oGuid._entity.$ref);
            //     if (!entity) Message.error('ES015', [p_oGuid.name, '_entity']);
            //     // this._entity = entity;
            //     this.__SET$_entity(entity. this);
            // }

            // this._keys.length = 0;
            // for(var i = 0; i < p_oGuid._key.length; i++) {
            //     var key = p_oGuid._key[i];
            //     this._keys.push(key);
            // }

            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                var elem = p_oGuid['_elem'][i];
                if (MetaRegistry.isGuidObject(elem)) {
                    // this._elements[i].setObject(elem, origin);
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.__GET$_elements(this)[i] = obj;
                    // this._elements[i] = obj;
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) Message.error('ES015', ['_elem['+ i +']', '$ref']);
                    this.__GET$_elements(this)[i] = meta;   
                    // this._elements[i] = meta;     
                // } else this._elements[i] = elem;
                } else this.__GET$_elements(this)[i] = elem;   
            }
        };

        /**
         * 배열속성 컬렉션을 전체삭제한다. [구현]
         */
        // MetaRow.prototype.init = function() {
        //     this.__event.init();
        //     // this._entity = null;
        //     this.__SET$_entity(null, this);
        //     this.__SET$_elements([], this);
        //     this.__SET$_keys([], this);
        // };

       /**
         * 객체 복제
         * @param {BaseEntity?} p_entity 대상의 엔티티
         * @returns {MetaRow}
         */
        MetaRow.prototype.clone  = function(p_entity) {
            var entity = p_entity || this._entity;
            var clone = new MetaRow(entity);
            var obj = this.getObject();

            if (obj.__subscribers) {
                clone.__event.__SET$__subscribers(obj.__subscribers, this.__event);
            }
            // clone._entity = p_entity ? p_entity : this._entity;
            clone.__SET$_elements(Util.deepCopy(obj._elem), this);
            // clone.__SET$_keys(Util.deepCopy(obj._key), this);

            // for (var i = 0; i < this.count; i++) {
            //     clone._elements[i] = this._elements[i];   // 내부 복사
            // }
            return clone;
        };
        
        return MetaRow;
    
    }(MetaObject));
    
    //---------------------------------------
    var MetaRowCollection  = (function (_super) {
        /**
         * 로우 컬렉션
         * @constructs _L.Meta.Entity.MetaRowCollection
         * @extends _L.Collection.TransactionCollection
         * @param {*} p_owner 소유자 
         */
        function MetaRowCollection(p_owner) {
            _super.call(this, p_owner);

            this._elemTypes = MetaRow;   // 컬렉션타입 설정
            this.autoChanges = true;    // 트랜젝션 기본 해제 해제입니다.
        }
        Util.inherits(MetaRowCollection, _super);

        MetaRowCollection._NS = 'Meta.Entity';    // namespace
        MetaRowCollection._PARAMS = ['_owner'];  // creator parameter

        /**
         * 프로퍼티 기술자 설정
         * @override
         * @protected
         * @param {Number} p_idx 인덱스
         */
        MetaRowCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._elements[p_idx]; },
                set: function(nVal) {
                    var typeName;
                    if (this._elemTypes.length > 0) Util.validType(nVal, this._elemTypes);
                    if (nVal._entity !== this._owner) Message.error('ES032', ['_entity', 'this._owner']);
                    this._transQueue.update(p_idx, nVal, this._elements[p_idx]); 
                    this.__GET$_elements(this)[p_idx] = nVal;
                },
                configurable: true,
                enumerable: true,
            };
        };

        /**
         * MetaRow 추가 idx 를 기준으로 검사한다.
         * @param {MetaRow} p_row 
         * @param {object} p_checkValid true: 검사 진행, false <*>: 검사 안함
         * @returns {number}
         */
        MetaRowCollection.prototype.add  = function(p_row, p_checkValid) {
            return this.insertAt(this._elements.length, p_row, p_checkValid);
        };

        /**
         * pos 위치에 추가
         * @param {*} p_pos 
         * @param {*} p_row 
         * @param {*} p_checkValid 
         * @returns {boolean}
         */
        MetaRowCollection.prototype.insertAt  = function(p_pos, p_row, p_checkValid) {
            var _this = this;
            var checkValid = p_checkValid || false;
            var result;
            var entity = p_row._entity;


            if (!(p_row instanceof MetaRow )) Message.error('ES032', ['row', 'MetaRow']);
            if (entity._guid !== this._owner._guid) Message.error('ES034', ['_guid', '_owner._guid']);
            
            // valid 검사
            if (checkValid === true) {
                for (let i = 0; i < p_row.count; i++) {
                    result = entity.columns[i].valid(p_row[i]);
                    if(result) {
                        Message.error('ES054', ['row', 'column.valid()', result.msg]);
                    }
                }
            }

            return _super.prototype.insertAt.call(this, p_pos, p_row);
        };

        return MetaRowCollection;
        
    }(TransactionCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaRow = MetaRow;
        exports.MetaRowCollection = MetaRowCollection;
    } else {
        _global._L.MetaRow = MetaRow;
        _global._L.MetaRowCollection = MetaRowCollection;
        _global._L.Meta.Entity.MetaRow = MetaRow;                       // namespace
        _global._L.Meta.Entity.MetaRowCollection = MetaRowCollection;   // namespace
    }

}(typeof window !== 'undefined' ? window : global));