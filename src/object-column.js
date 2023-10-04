/**
 * namespace _L.Meta.Entity.ObjectColumn
 * namespace _L.Meta.Entity.BaseColumnCollection
 * namespace _L.Meta.Entity.MetaViewColumnCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var Observer;
    var CustomError;
    var MetaRegistry;
    var MetaObject;
    var MetaElement;
    var BaseColumn;
    var PropertyCollection;

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
        MetaObject                  = require('./meta-object').MetaObject;
        MetaElement                 = require('./meta-element').MetaElement;
        BaseColumn                  = require('./base-column').BaseColumn;
        PropertyCollection          = require('./collection-property').PropertyCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        CustomError                 = _global._L.CustomError;
        MetaObject                  = _global._L.MetaObject;
        MetaElement                 = _global._L.MetaElement;
        BaseColumn                  = _global._L.BaseColumn;
        PropertyCollection          = _global._L.PropertyCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof Observer === 'undefined') Message.error('ES011', ['Observer', 'observer']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);
    if (typeof MetaElement === 'undefined') Message.error('ES011', ['MetaElement', 'meta-element']);
    if (typeof BaseColumn === 'undefined') Message.error('ES011', ['BaseColumn', 'base-column']);
    if (typeof PropertyCollection === 'undefined') Message.error('ES011', ['PropertyCollection', 'collection-property']);   // ~ Branch:

    //==============================================================
    // 4. module implementation
    //--------------------------------------------------------------
    // implementation   
    var ObjectColumn  = (function (_super) {
        /**
         * 아이템
         * @constructs _L.Meta.Entity.ObjectColumn
         * @extends _L.Meta.MetaElement
         * @param {String} p_name 아이템명
         * @param {BaseEntity?} p_entity 소유 BaseEntity
         * @param {Object} p_property 속성 객체
         */
        function ObjectColumn(p_name, p_entity, p_property) {
            _super.call(this, p_name, p_entity, [Object]);

            // var __value       = null;   // 재정의
            // // var __event        = new Observer(this);
            // // var __key           = p_name;
            // // var columnName;
            // // var _entity;
            // var defaultValue  = null;
            // var caption       = null;
            // var isNotNull     = false;
            // var isNullPass    = false;
            // var constraints   = [];
            // var getter        = null;
            // var setter        = null;
            // var alias         = null;

            // if (typeof _key !== 'string') Message.error('ES021', ['name', 'string']);
            // if (_key.length <= 0) Message.error('ES062', ['name.length', '0']);

            // /**
            //  * value 내부값 (필터 및 getter/setter 무시)
            //  * @private
            //  * @member {*} _L.Meta.Entity.ObjectColumn#__value
            //  */
            // Object.defineProperty(this, '__value', 
            // {
            //     get: function() { return __value; },
            //     set: function(nVal) { 
            //         // 직접 입력하면 안됨
            //         // throw new Error('Only getter !! ');
            //         __value = nVal;
            //     },
            //     configurable: true,
            //     enumerable: true
            // });

            // /** 
            //  * 이벤트 객체
            //  * @protected 
            //  * @member {Object} _L.Meta.Entity.ObjectColumn#__event  
            //  */
            // Object.defineProperty(this, '__event', {
            //     get: function() { 
            //         return __event;
            //     },
            //     configurable: false,
            //     enumerable: false,
            // });        
            
            // /**
            //  * 컬렉션 키
            //  * @member {BaseEntity} _L.Meta.Entity.ObjectColumn#__key
            //  */
            // Object.defineProperty(this, '__key', 
            // {
            //     get: function() { return __key; },
            //     // set: function(nVal) { 
            //     //     if (typeof nVal !== 'string') Message.error('ES021', ['columnName', 'string']);
            //     //     if (nVal.length <= 0) Message.error('ES062', ['__key.length', '0']);
            //     //     __key = nVal;
            //     // },
            //     configurable: false,
            //     enumerable: false,
            // });
            
            // /**
            //  * 아이템 소유 엔티티
            //  * @member {BaseEntity} _L.Meta.Entity.ObjectColumn#_entity
            //  */
            // Object.defineProperty(this, '_entity', 
            // {
            //     get: function() { return _entity; },
            //     set: function(nVal) { 
            //         if (typeof nVal !== 'undefined' && !(nVal instanceof MetaElement && nVal.instanceOf('BaseEntity'))) {
            //             Message.error('ES032', ['_entity', 'BaseEntity']);
            //         }
            //         _entity = nVal;
            //     },
            //     configurable: false,
            //     enumerable: true
            // });




            // /**
            //  * 엔티티의 아이템(속성) 컬렉션
            //  * @member {string} _L.Meta.Entity.ObjectColumn#columnName
            //  */
            // Object.defineProperty(this, 'columnName', 
            // {
            //     get: function() { return this._name; },
            //     set: function(nVal) { 
            //         if (nVal === this.columnName) return;
            //         if (typeof nVal !== 'string') Message.error('ES021', ['columnName', 'string']); 
            //         if (_entity && _entity.columns.existColumnName(nVal)) Message.error('ES042', [nVal, 'columnName']);
            //         if (_entity && _entity.columns.existAlias(nVal)) Message.error('ES042', [nVal, 'alias']);
            //         // columnName = nVal;
            //         this.__SET$_name(nVal, this);
            //     },
            //     configurable: false,
            //     enumerable: true
            // });

            // /**
            //  * 아이템 별칭 (bind전송시, 데이터 수신후 설정시 활용함)
            //  * 사용처 
            //  * - Bind-command-ajax._execBind() : 데이터 전송시
            //  * - BaseBind.setValue(row) : 로우값 을 엔티티에 설정시
            //  * - getValue() : row 에 활용함
            //  * 기본값 = name 값
            //  * @member {String} _L.Meta.Entity.ObjectColumn#alias
            //  */
            // Object.defineProperty(this, 'alias', 
            // {
            //     get: function() { return typeof alias === 'string' ? alias : this.columnName; },
            //     set: function(nVal) { 
            //        var entity = this._entity;
            //        if(typeof nVal !== 'string') Message.error('ES021', ['alias', 'string']);
            //        if (entity && entity.columns.existAlias(nVal)) Message.error('ES042', [nVal, 'alias']);
            //        alias = nVal;
            //     },
            //     configurable: false,
            //     enumerable: true
            // }); 



            // /**
            //  * 아이템 기본값 (내부속성)
            //  * @member {String | Number | Boolean} _L.Meta.Entity.ObjectColumn#default
            //  */
            // Object.defineProperty(this, 'default', 
            // {
            //     get: function() { return defaultValue; },
            //     set: function(nVal) { 
            //         if(typeof nVal !== 'undefined' && nVal !== null 
            //             &&  ['string', 'number', 'boolean'].indexOf(typeof nVal) < 0) {
            //                 Message.error('ES021', ['default', 'string | boolean | number']);
            //             }
            //         defaultValue = nVal; 
            //     },
            //     configurable: false,
            //     enumerable: true
            // });

            // /**
            //  * 아이템 설명 (내부속성)
            //  * @member {String} _L.Meta.Entity.ObjectColumn#caption
            //  */
            // Object.defineProperty(this, 'caption', 
            // {
            //     get: function() { return caption; },
            //     set: function(nVal) { 
            //         if(typeof nVal !== 'string') Message.error('ES021', ['caption', 'string']); 
            //         caption = nVal; 
            //     },
            //     configurable: false,
            //     enumerable: true
            // });

            // /**
            //  * 아이템 value의 Null 여부
            //  * @member {Boolean} _L.Meta.Entity.ObjectColumn#isNotNull
            //  */
            // Object.defineProperty(this, 'isNotNull', 
            // {
            //     // get: function() { 
            //     //     var isReturn;
            //     //     isReturn = constraints.length > 0 ? true : isNotNull;
            //     //     return isReturn; 
            //     // },
            //     get: function() { return isNotNull },
            //     set: function(nVal) { 
            //         if(typeof nVal !== 'boolean') Message.error('ES021', ['isNotNull', 'boolean']);
            //         isNotNull = nVal; 
            //     },
            //     configurable: false,
            //     enumerable: true
            // });

            // /**
            //  * 아이템 value null 통과 여부 (기본값 = false)
            //  * @member {Boolean} _L.Meta.Entity.ObjectColumn#isNullPass
            //  */
            // Object.defineProperty(this, 'isNullPass', 
            // {
            //     get: function() { return isNullPass },
            //     set: function(nVal) { 
            //         if(typeof nVal !== 'boolean') Message.error('ES021', ['isNullPass', 'boolean']);
            //         isNullPass = nVal; 
            //     },
            //     configurable: false,
            //     enumerable: true
            // });
            
            // /**
            //  * 아이템 제약 조건 
            //  * @member {Array<Object>} _L.Meta.Entity.ObjectColumn#constraints
            //  * @example
            //  * var c = {
            //  *  regex: /aa/,
            //  *  msg: '매칭메세지',  // return이 true면 성공시 메세지, false 실패시 메세지
            //  *  return: ture     // 매칭시 싱공실패 여부 
            //  * };
            //  */
            // Object.defineProperty(this, 'constraints', 
            // {
            //     get: function() { return constraints; },
            //     set: function(nVal) { 
            //         var list = [];
                    
            //         // 초기화
            //         constraints = [];
                    
            //         // 배열로 일반화
            //         if (Array.isArray(nVal))  list = nVal;
            //         else list.push(nVal);

            //         // 유효성 검사
            //         for(var i = 0; list.length > i; i++) {
            //             if (!(typeof list[i] === 'function' || (typeof list[i].regex === 'object' && typeof list[i].msg === 'string'))) {
            //                 Message.error('ES021', ['constraints', 'array<function | {regex,msg,code}>']);
            //              }
            //         }
            //         constraints = list;
            //     },
            //     configurable: false,
            //     enumerable: true
            // });
            
            // /**
            //  * 아이템 value
            //  * @override 재정의함
            //  * @member {*} _L.Meta.Entity.ObjectColumn#value
            //  */
            // Object.defineProperty(this, 'value', 
            // {
            //     get: function() { 
            //         var __val;
                    
            //         // 우선순위 : 1
            //         if (typeof getter === 'function' ) {
                        
            //             __val = getter.call(this);
                        
            //             // 검사 및 이벤트 발생
            //             if (__value !== null && __value !== __val) {
            //                 this._onChanged(__val, __value);
            //                 __value = __val;   // 내부에 저장
            //             }
                    
            //         // 우선순위 : 2
            //         } else {
            //             __val = __value;
            //         }
                    
            //         /**
            //          * 분기 처리값 '__val' 없는경우 (null, undefined)
            //          *  - this.__value 초기화 되지 않은 경우
            //          *  - getter 리턴이 없는 경우
            //          */
            //         if (typeof __val === 'undefined' || __val === null) {
            //             __val = __value || this.default;  
            //         }

            //         return __val; 
            //     },
            //     set:  function(val) { 
            //         var __val, _val;
            //         var _oldVal = __value;
            //         if (typeof setter === 'function' ) _val = setter.call(this, val);
                    
            //         // settter 의 리턴이 여부
            //         if (typeof _val !== 'undefined') __val = _val;
            //         else __val = val; 

            //         __val = __val === null ? '' : __val;  // null 등록 오류 처리
            //         if(['number', 'string', 'boolean'].indexOf(typeof __val) < 0) {
            //             Message.error('ES021', ['value', 'number, string, boolean']);
            //         }
            //         __value = __val;
            //         // 검사 및 이벤트 발생
            //         if (_oldVal !== __val && __val) this._onChanged(__val, _oldVal);
            //     },
            //     configurable: true, // 하위에서 재정의 할수 있음
            //     enumerable: true
            // });

            // /**
            //  * 아이템의 value 의 getter
            //  * @member {Function} _L.Meta.Entity.ObjectColumn#getter
            //  */
            // Object.defineProperty(this, 'getter', 
            // {
            //     get: function() { return getter; },
            //     set: function(val) { 
            //         if(val !== null && typeof val !== 'function') Message.error('ES021', ['getter', 'function']);
            //         getter = val;
            //     },
            //     configurable: false,
            //     enumerable: true
            // });

            // /**
            //  * 아이템의 value 의 setter
            //  * @member {Function} _L.Meta.Entity.ObjectColumn#setter
            //  */
            // Object.defineProperty(this, 'setter', 
            // {
            //     get: function() { return setter; },
            //     set: function(val) { 
            //         if(val !== null && typeof val !== 'function') Message.error('ES021', ['setter', 'function']);
            //         setter = val;
            //     },
            //     configurable: false,
            //     enumerable: true
            // });

            
            // /**
            //  * 변경 이벤트 
            //  * @event _L.Meta.Entity.ObjectColumn#onChanged 
            //  */
            // Object.defineProperty(this, 'onChanged', {
            //     set: function(fun) {
            //         this.__event.subscribe(fun, 'onChanged');
            //     },
            //     configurable: false,
            //     enumerable: false,
            // });
            

            // inner variable access
            // this.__GET$alias = function(call) {
            //     if (call instanceof ObjectColumn) return alias;
            // }
            // this.__GET$__value = function(call) {
            //     if (call instanceof ObjectColumn) return __value;
            // }
            // this.__SET$__value = function(val, call) {
            //     if (call instanceof ObjectColumn) __value = val;
            // }
            // this.__SET$__key = function(val, call) {
            //     if (call instanceof ObjectColumn) __key = val;
            // }

            // BaseEntity 등록 & order(순서) 값 계산
            // if (p_entity && p_entity instanceof MetaElement && p_entity.instanceOf('BaseEntity')) {
            //     _entity    = p_entity;
            // }
            
            // this.columnName  = p_name || '';            
            if (p_property) this._load(p_property);
        }
        Util.inherits(ObjectColumn, _super);


        ObjectColumn._NS = 'Meta.Entity';     // namespace
        ObjectColumn._PARAMS = ['columnName', '_entity', '_property'];    // creator parameter
        ObjectColumn._TYPES = [Object];

        // /**
        //  * @listens _L.Meta.Entity.ObjectColumn#_onChanged
        //  */
        // ObjectColumn.prototype._onChanged = function(p_nValue, p_oValue) {
        //     p_oValue = p_oValue || this.__GET$__value(this);
        //     this.__event.publish('onChanged', p_nValue, p_oValue);
        // };

        /**
         * 프로퍼티 속성으로 로드한다.
         * @param {object} p_property 
         */
        ObjectColumn.prototype._load = function(p_property) {
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    [   '_entity', // REVIEW: _entity getObject/setObject 에서 한쪽으로 통일
                    'default', 'caption', 
                        'value', 'alias'
                    ].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            } else Message.error('ES021', ['p_property', 'object']);
            // if (['number', 'string', 'boolean'].indexOf(typeof p_property) > -1) {  
            //     this['value'] = p_property; 
            // }
        };

        /**
         * 객체 비교
         * @override
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // ObjectColumn.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this.__event.__subscribers, p_target.__event.__subscribers)) return false;            
        //     // 
        //     if (!this._compare(this._entity, p_target._entity)) return false;
        //     // if (this._entity && !this._entity.equal(p_target._entity)) return false;  
        //     if (!this._compare(this.columnName, p_target.columnName)) return false;
        //     if (!this._compare(this.alias, p_target.alias)) return false;
        //     if (!this._compare(this.default, p_target.default)) return false;
        //     if (!this._compare(this.caption, p_target.caption)) return false;
        //     if (!this._compare(this.isNotNull, p_target.isNotNull)) return false;
        //     if (!this._compare(this.isNullPass, p_target.isNullPass)) return false;
        //     if (!this._compare(this.constraints, p_target.constraints)) return false;
        //     if (!this._compare(this.value, p_target.value)) return false;
        //     if (!this._compare(this.getter, p_target.getter)) return false;
        //     if (!this._compare(this.setter, p_target.setter)) return false;
        //     return true;
        // };

        
        // ObjectColumn.prototype.getObject = function(p_vOpt, p_origin) {
        //     var obj = _super.prototype.getObject.call(this, p_vOpt, p_origin);
        //     var vOpt = p_vOpt || 0;
        //     var origin = p_origin ? p_origin : obj;
        //     var defValue = this.default;
        //     var value = this.value;

        //     if (defValue instanceof MetaObject) {
        //         if (MetaRegistry.hasGuidObject(defValue, origin)) {
        //             obj.default = MetaRegistry.createReferObject(defValue);
        //         } else obj.default = defValue.getObject(vOpt, origin);
        //     }

        //     if (value instanceof MetaObject) {
        //         if (MetaRegistry.hasGuidObject(value, origin)) {
        //             obj.value = MetaRegistry.createReferObject(value);
        //         } else obj.value = value.getObject(vOpt, origin);
        //     }
        //     return obj;                        
        // };
        // // POINT: 2


        /**
         * guid 객체 얻기
         * @override
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
         * @returns {object}
         */
        ObjectColumn.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            // var origin = [];
            var defValue = this.default;
            var value = this.value;

            // if (Array.isArray(p_origin)) origin = p_origin;
            // else if (p_origin) origin.push(p_origin);
            // origin.push(obj);

            if (defValue instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(defValue, owned)) {
                    obj['default'] = MetaRegistry.createReferObject(defValue);
                } else obj['default'] = defValue.getObject(vOpt, owned);
            }

            if (value instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(value, owned)) {
                    obj['value'] = MetaRegistry.createReferObject(value);
                } else obj['value'] = value.getObject(vOpt, owned);
            }
            return obj;                        
        };

        /**
         * guid 객체 설정
         * @override
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        ObjectColumn.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var elem;

            // 주의! defuault 설정후 value 설정 :getObject() 와 동일
            elem = p_oGuid['default'];
            if (typeof elem === 'object' && elem !== null) {
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this['default'] = obj;
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) Message.error('ES015', ['ObjectColumn.default', '$ref']);
                    this['default'] = meta;
                }
            }

            elem = p_oGuid['value'];
            if (typeof elem === 'object' && elem !== null) {
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.value = obj;
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) Message.error('ES015', ['ObjectColumn.value', '$ref']);
                    this.value = meta;
                }
            }
            

                // }else if (elem !== null) this.value = elem;

            // var entity;
            // if (p_oGuid.__subscribers) {
            //     this.__event.__SET$__subscribers(p_oGuid.__subscribers, this.__event);
            // }
            // if (p_oGuid._entity) {
            //     entity = MetaRegistry.findSetObject(origin, p_oGuid._entity.$ref);
            //     if (!entity) Message.error('ES015', [p_oGuid.name, '_entity']);
            //     this._entity = entity;
            // } 
            // if (p_oGuid.columnName) this.columnName = p_oGuid.columnName;
            // this.columnName = p_oGuid.columnName;
            // if (p_oGuid.default) this.default = p_oGuid.default;
            // if (p_oGuid.caption) this.caption = p_oGuid.caption;
            // if (p_oGuid.isNotNull) this.isNotNull = p_oGuid.isNotNull;
            // if (p_oGuid.isNullPass) this.isNullPass = p_oGuid.isNullPass;
            // if (p_oGuid.constraints) this.constraints = p_oGuid.constraints;
            // if (p_oGuid.getter) this.getter = p_oGuid.getter;
            // if (p_oGuid.setter) this.setter = p_oGuid.setter;
            // if (p_oGuid.alias) this.alias = p_oGuid.alias;
            // if (p_oGuid.value) this.value = p_oGuid.value;
        };

        /**
         * 객체 복제
         * @override
         * @param {BaseEntity?} p_entity 지정한 엔티티로 복제
         * @returns {ObjectColumn}
         */
        ObjectColumn.prototype.clone = function(p_entity) {
            var clone = new ObjectColumn(this.columnName);
            var rObj = this.getObject();

            // if (rObj.columnName) clone.columnName = rObj.columnName;
            clone.columnName = rObj.columnName;
            clone._entity = p_entity ? p_entity : this._entity;
            if (rObj.default) clone.default = this.default;
            if (rObj.caption) clone.caption = rObj.caption;
            // if (rObj.isNotNull) clone.isNotNull = rObj.isNotNull;
            // if (rObj.isNullPass) clone.isNullPass = rObj.isNullPass;
            // if (rObj.constraints) clone.constraints = rObj.constraints;
            // if (rObj.getter) clone.getter = rObj.getter;
            // if (rObj.setter) clone.setter = rObj.setter;
            if (rObj.alias) clone.alias = rObj.alias;
            if (rObj.value) clone.value = this.value;

            return clone;
        };

        // /**
        //  * 제약조건을 추가
        //  * @param {*} p_regex 
        //  * @param {*} p_msg 
        //  * @param {*} p_code 
        //  * @param {*} p_condition 
        //  */
        // ObjectColumn.prototype.addConstraint = function(p_regex, p_msg, p_code, p_condition) {
        //     p_condition = p_condition || false;

        //     var constraint = {};
        //     if (typeof p_regex === 'function') {
        //         this.constraints.push(p_regex);
        //         return;
        //     }
        //     if (!(p_regex instanceof RegExp)) Message.error('ES021', ['regex', 'RegExp']);
        //     if (!(typeof p_msg === 'string')) Message.error('ES021', ['msg', 'string']);    

        //     constraint.regex = p_regex;
        //     constraint.msg = p_msg;
        //     constraint.code = p_code;
        //     constraint.condition = p_condition;
            
        //     this.constraints.push(constraint);
        // };
        
        // /**
        //  * 아이템의 value에 유효성을 검사한다. (isNotnull, isNullPass, constraints 기준)
        //  * @param {string} p_value 
        //  * @param {object} result 메세지는 참조(객체)형 으로 전달
        //  * @param {number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
        //  */
        // // ObjectColumn.prototype.valid = function(p_value, result, p_option) {
        // ObjectColumn.prototype.valid = function(p_value) {
        //     // p_option = p_option || 1;   
        //     var result = {};
        //     var match;
        //     var value = null;
            
        //     result.value = p_value;
        //     result.msg = '';
        //     result.code = '';
        //     p_value = p_value || '';
            

        //     // if (!(typeof p_value === 'string')) throw new Error('Only [p_value] type 'string' can be added');
        //     p_value = typeof p_value === 'number' ? String(p_value) : p_value;  // number 형 변환

        //     // 1. 기본값 얻기
        //     value = p_value === null || typeof p_value === 'undefined' ? this.default : p_value;    // Branch: REVIEW: 필요한 로직인가?
        //     value = value.trim();

        //     // 2-1. 통과조건 검사
        //     if ((this.isNotNull === false && this.constraints.length === 0 ) 
        //         || (this.isNotNull === false && this.isNullPass === true && value.length === 0)
        //         || (this.isNotNull === true && this.constraints.length === 0 && value.length > 0)){
        //         return;
        //         // return true;
        //     }
        //     // 2-2. 실패조건 검사
        //     if (this.isNotNull === true && this.constraints.length === 0 && value.length === 0) {
        //         result.msg   = Message.get('ES055', [this.name]);
        //         // result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
        //         result.code  = 0;
        //         return result;
        //         // return false;
        //     }

        //     // 2-3. 제약조건 검사
        //     for(var i = 0; this.constraints.length > i; i++) {

        //         if (typeof this.constraints[i] === 'function') {
        //             return this.constraints[i].call(this, this, p_value);     // 함수형 제약조건  
        //         } else {
        //             match = p_value.match(this.constraints[i].regex);
    
        //             if ((this.constraints[i].condition === false && match !== null) ||    // 실패 조건
        //                 (this.constraints[i].condition === true && match === null)) {     // 성공 조건
       
        //                 result.msg   = Message.get('ES056', [this.name, this.constraints[i].msg]);
        //                 // result.msg   = this.constraints[i].msg;
        //                 result.code  = this.constraints[i].code;
        //                 return result;
        //                 // return false;
        //             }
        //         }
        //     }            
        //     // // 3. 결과(Null) 검사
        //     // if ((p_option === 1 && this.isNotNull === true && p_value.trim().length <= 0) || 
        //     //     (p_option === 2 && p_value.trim().length <= 0)) {
                
        //     //     r_result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
        //     //     r_result.code  = 0;
        //     //     return false;
        //     // }
        //     return;
        //     // return true;
        // };

        return ObjectColumn;
    
    }(BaseColumn));
    


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ObjectColumn                         = ObjectColumn;

    } else {
        _global._L.ObjectColumn                              = ObjectColumn;
        _global._L.Meta.Entity.ObjectColumn                  = ObjectColumn;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));