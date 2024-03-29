/**
 * namespace _L.Meta.Entity.MetaColumn
 * namespace _L.Meta.Entity.MetaColumnCollection
 * namespace _L.Meta.Entity.MetaViewColumnCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var Observer;
    var CustomError;
    var MetaElement;
    // var MetaEntity;
    var PropertyCollection;
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
        CustomError                 = require('./custom-error').CustomError;
        MetaElement                 = require('./meta-element').MetaElement;
        // MetaEntity                  = require('./meta-entity').MetaEntity;
        PropertyCollection          = require('./collection-property').PropertyCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        CustomError                 = _global._L.CustomError;
        MetaElement                 = _global._L.MetaElement;
        // MetaEntity                  = _global._L.MetaEntity;
        PropertyCollection          = _global._L.PropertyCollection;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof Observer === 'undefined') Message.error('ES011', ['Observer', 'observer']);
    if (typeof CustomError === 'undefined') Message.error('ES011', ['CustomError', 'custom-error']);
    if (typeof MetaElement === 'undefined') Message.error('ES011', ['MetaElement', 'meta-element']);
    // if (typeof MetaEntity === 'undefined') Message.error('ES011', ['MetaEntity', 'meta-entity']);
    if (typeof PropertyCollection === 'undefined') Message.error('ES011', ['PropertyCollection', 'collection-property']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);

    //==============================================================
    // 4. module implementation
    //--------------------------------------------------------------
    // implementation   
    var MetaColumn  = (function (_super) {
        /**
         * 아이템
         * @constructs _L.Meta.Entity.MetaColumn
         * @extends _L.Meta.MetaElement
         * @param {String} p_name 아이템명
         * @param {MetaEntity?} p_entity 소유 MetaEntity
         * @param {Object} p_property 속성 객체
         */
        function MetaColumn(p_name, p_entity, p_property) {
            _super.call(this, p_name);

            var __value       = null;
            var __event        = new Observer(this);
            // var columnName;
            var _entity;
            var defaultValue  = null;
            var caption       = null;
            var isNotNull     = false;
            var isNullPass    = false;
            var constraints   = [];
            var getter        = null;
            var setter        = null;
            var alias         = null;

            

            /**
             * value 내부값 (필터 및 getter/setter 무시)
             * @private
             * @member {*} _L.Meta.Entity.MetaColumn#__value
             */
            // Object.defineProperty(this, '__value', 
            // {
            //     get: function() { return __value; },
            //     set: function(newValue) { 
            //         // 직접 입력하면 안됨
            //         // throw new Error('Only getter !! ');
            //         __value = newValue;
            //     },
            //     configurable: true,
            //     enumerable: true
            // });

            /** 
             * 이벤트 객체
             * @protected 
             * @member {Object} _L.Meta.Entity.MetaColumn#__event  
             */
            Object.defineProperty(this, '__event', {
                get: function() { 
                    return __event;
                },
                enumerable: false,
                configurable: false,
            });        
            
            /**
             * 아이템 소유 엔티티
             * @member {MetaEntity} _L.Meta.Entity.MetaColumn#_entity
             */
            Object.defineProperty(this, '_entity', 
            {
                get: function() { return _entity; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if (newValue && !(newValue instanceof MetaElement && newValue.instanceOf('MetaEntity'))) {
                        Message.error('ES032', ['_entity', 'MetaEntity']);
                    }
                    _entity = newValue;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {string} _L.Meta.Entity.MetaColumn#columnName
             */
            Object.defineProperty(this, 'columnName', 
            {
                get: function() { return this._name; },
                set: function(newValue) { 
                    if (newValue === this.columnName) return;
                    if (typeof newValue !== 'string') Message.error('ES021', ['columnName', 'string']);
                    if (_entity && _entity.columns.existColumnName(newValue)) Message.error('ES042', [newValue, 'columnName']);
                    if (_entity && _entity.columns.existAlias(newValue)) Message.error('ES042', [newValue, 'alias']);
                    // columnName = newValue;
                    this.__SET$_name(newValue, this);
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 아이템 별칭 (bind전송시, 데이터 수신후 설정시 활용함)
             * 사용처 
             * - Bind-command-ajax._execBind() : 데이터 전송시
             * - BaseBind.setValue(row) : 로우값 을 엔티티에 설정시
             * - getValue() : row 에 활용함
             * 기본값 = name 값
             * @member {String} _L.Meta.Entity.MetaColumn#alias
             */
            Object.defineProperty(this, 'alias', 
            {
                get: function() { return typeof alias === 'string' ? alias : this.columnName; },
                set: function(newValue) { 
                   var entity = this._entity;
                   if(typeof newValue !== 'string') Message.error('ES021', ['alias', 'string']);
                   if (entity && entity.columns.existAlias(newValue)) Message.error('ES042', [newValue, 'alias']);
                   alias = newValue;
                },
                configurable: true,
                enumerable: true
            }); 



            /**
             * 아이템 기본값 (내부속성)
             * @member {String | Number | Boolean} _L.Meta.Entity.MetaColumn#default
             */
            Object.defineProperty(this, 'default', 
            {
                get: function() { return defaultValue; },
                set: function(newValue) { 
                    if(typeof newValue !== 'undefined' && newValue !== null 
                        &&  ['string', 'number', 'boolean'].indexOf(typeof newValue) < 0) {
                            Message.error('ES021', ['default', 'string | boolea | number']);
                        }
                    defaultValue = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 설명 (내부속성)
             * @member {String} _L.Meta.Entity.MetaColumn#caption
             */
            Object.defineProperty(this, 'caption', 
            {
                get: function() { return caption; },
                set: function(newValue) { 
                    if(typeof newValue !== 'string') Message.error('ES021', ['caption', 'string']);
                    caption = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 value의 Null 여부
             * @member {Boolean} _L.Meta.Entity.MetaColumn#isNotNull
             */
            Object.defineProperty(this, 'isNotNull', 
            {
                // get: function() { 
                //     var isReturn;
                //     isReturn = constraints.length > 0 ? true : isNotNull;
                //     return isReturn; 
                // },
                get: function() { return isNotNull },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') Message.error('ES021', ['isNotNull', 'boolean']);
                    isNotNull = newValue; 
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템 value null 통과 여부 (기본값 = false)
             * @member {Boolean} _L.Meta.Entity.MetaColumn#isNullPass
             */
            Object.defineProperty(this, 'isNullPass', 
            {
                get: function() { return isNullPass },
                set: function(newValue) { 
                    if(typeof newValue !== 'boolean') Message.error('ES021', ['isNullPass', 'boolean']);
                    isNullPass = newValue; 
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 아이템 제약 조건 
             * @member {Array<Object>} _L.Meta.Entity.MetaColumn#constraints
             * @example
             * var c = {
             *  regex: /aa/,
             *  msg: '매칭메세지',  // return이 true면 성공시 메세지, false 실패시 메세지
             *  return: ture     // 매칭시 싱공실패 여부 
             * };
             */
            Object.defineProperty(this, 'constraints', 
            {
                get: function() { return constraints; },
                set: function(newValue) { 
                    var list = [];
                    
                    // 배열로 일반화
                    if (Array.isArray(newValue))  list = newValue;
                    else list.push(newValue);   // COVER:

                    // 유효성 검사
                    for(var i = 0; list.length > i; i++) {
                        if (!(typeof list[i] === 'function' || (typeof list[i].regex === 'object' && typeof list[i].msg === 'string'))) {
                            Message.error('ES021', ['constraints', 'array<function | {regex,msg,code}>']);
                         }
                    }
                    constraints = list;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 아이템 value
             * @member {*} _L.Meta.Entity.MetaColumn#value
             */
            Object.defineProperty(this, 'value', 
            {
                get: function() { 
                    var __val;
                    
                    // 우선순위 : 1
                    if (typeof getter === 'function' ) {
                        
                        __val = getter.call(this);
                        
                        // 검사 및 이벤트 발생
                        if (__value !== null && __value !== __val) {
                            this._onChanged(__val, __value);
                            __value = __val;   // 내부에 저장
                        }
                    
                    // 우선순위 : 2
                    } else {
                        __val = __value;
                    }
                    
                    /**
                     * 분기 처리값 '__val' 없는경우 (null, undefined)
                     *  - this.__value 초기화 되지 않은 경우
                     *  - getter 리턴이 없는 경우
                     */
                    if (typeof __val === 'undefined' || __val === null) {
                        __val = __value || this.default;  
                    }

                    return __val; 
                },
                set:  function(val) { 
                    var __val, _val;
                    var _oldVal = __value;
                    if (typeof setter === 'function' ) _val = setter.call(this, val);
                    
                    // settter 의 리턴이 여부
                    if (typeof _val !== 'undefined') __val = _val;
                    else __val = val; 

                    __val = __val === null ? '' : __val;  // null 등록 오류 처리
                    if(['number', 'string', 'boolean'].indexOf(typeof __val) < 0) {
                        Message.error('ES021', ['value', 'number, string, boolean']);
                    }
                    __value = __val;
                    // 검사 및 이벤트 발생
                    if (_oldVal !== __val && __val) this._onChanged(__val, _oldVal);
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템의 value 의 getter
             * @member {Function} _L.Meta.Entity.MetaColumn#getter
             */
            Object.defineProperty(this, 'getter', 
            {
                get: function() { return getter; },
                set: function(val) { 
                    if(val !== null && typeof val !== 'function') Message.error('ES021', ['getter', 'function']);
                    getter = val;
                },
                configurable: true,
                enumerable: true
            });

            /**
             * 아이템의 value 의 setter
             * @member {Function} _L.Meta.Entity.MetaColumn#setter
             */
            Object.defineProperty(this, 'setter', 
            {
                get: function() { return setter; },
                set: function(val) { 
                    if(val !== null && typeof val !== 'function') Message.error('ES021', ['setter', 'function']);
                    setter = val;
                },
                configurable: true,
                enumerable: true
            });

            
            /**
             * 변경 이벤트 
             * @event _L.Meta.Entity.MetaColumn#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                set: function(fun) {
                    this.__event.subscribe(fun, 'onChanged');
                },
                enumerable: true,
                configurable: true,
            });
            

            // inner variable access
            this.__GET$alias = function(call) {
                if (call instanceof MetaColumn) return alias;
            }
            // inner variable access
            this.__GET$__value = function(call) {
                if (call instanceof MetaColumn) return __value;
            }
            // inner variable access
            this.__SET$__value = function(val, call) {
                if (call instanceof MetaColumn) __value = val;
            }

            // MetaEntity 등록 & order(순서) 값 계산
            if (p_entity && p_entity instanceof MetaElement && p_entity.instanceOf('MetaEntity')) {
                _entity    = p_entity;
            }
            
            this.columnName  = p_name || '';            
            if (p_property) this._load(p_property);
        }
        Util.inherits(MetaColumn, _super);


        MetaColumn._NS = 'Meta.Entity';     // namespace
        MetaColumn._PARAMS = ['columnName', '_entity', '_property'];    // creator parameter

        /**
         * @listens _L.Meta.Entity.MetaColumn#_onChanged
         */
        MetaColumn.prototype._onChanged = function(p_nValue, p_oValue) {
            p_oValue = p_oValue || this.__GET$__value(this);
            this.__event.publish('onChanged', p_nValue, p_oValue);
        };

        /**
         * 프로퍼티 속성으로 로드한다.
         * @param {object} p_property 
         */
        MetaColumn.prototype._load = function(p_property) {
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    [   '_entity', 'default', 'caption', 
                        'isNotNull', 'isNullPass', 'constraints', 
                        'value', 'getter', 'setter', 'alias', 'onChanged' 
                    ].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            } else if (['number', 'string', 'boolean'].indexOf(typeof p_property) > -1) {
                this['value'] = p_property; // COVER:
            }
        };

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // MetaColumn.prototype.equal = function(p_target) {
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

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaColumn.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this, p_vOpt);
            var vOpt = p_vOpt || 0;
            
            if (!Util.deepEqual(this.__event.__subscribers, this.__event._getInitObject())) {
                obj.__subscribers = this.__event.__subscribers;
            }
            // if (this.metaName !== this.columnName) obj.columnName = this.columnName;
            if (vOpt > -2 && this._entity) obj._entity = MetaRegistry.createReferObject(this._entity);
            obj.columnName = this.columnName;
            if (this.default !== null) obj.default = this.default;
            if (this.caption !== null) obj.caption = this.caption;            
            if (this.isNotNull !== false) obj.isNotNull = this.isNotNull;
            if (this.isNullPass !== false) obj.isNullPass = this.isNullPass;
            if (this.constraints.length > 0) obj.constraints = this.constraints;    // REVIEW: 배열 검사 필요
            if (this.getter !== null) obj.getter = this.getter;
            if (this.setter !== null) obj.setter = this.setter;
            if (this.__GET$alias(this) !== null) obj.alias = this.__GET$alias(this);
            if (this.value !== null) obj.value = this.value;
            return obj;                        
        };

        /**
         * TODO: setObject 시점에 초기화 해야함
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        MetaColumn.prototype.setObject  = function(mObj, oObj) {
            _super.prototype.setObject.call(this, mObj, oObj);
            
            var origin = oObj ? oObj : mObj;
            var entity;

            if (mObj.__subscribers) {
                this.__event.__SET$__subscribers(mObj.__subscribers, this.__event);
            }
            if (mObj._entity) {
                entity = MetaRegistry.findSetObject(origin, mObj._entity.$ref);
                if (!entity) Message.error('ES015', [mObj.name, '_entity']);
                this._entity = entity;
            } 
            if (mObj.columnName) this.columnName = mObj.columnName;
            if (mObj.default) this.default = mObj.default;
            if (mObj.caption) this.caption = mObj.caption;
            if (mObj.isNotNull) this.isNotNull = mObj.isNotNull;
            if (mObj.isNullPass) this.isNullPass = mObj.isNullPass;
            if (mObj.constraints) this.constraints = mObj.constraints;
            if (mObj.getter) this.getter = mObj.getter;
            if (mObj.setter) this.setter = mObj.setter;
            if (mObj.alias) this.alias = mObj.alias;
            if (mObj.value) this.value = mObj.value;
        };

        /**
         * 아이템을 복제한다. 
         * @param {MetaEntity?} p_entity 지정한 엔티티로 복제한다.
         * @returns 
         */
        MetaColumn.prototype.clone = function(p_entity) {
            var clone = new MetaColumn(this.name);
            var constraints = [];
            var entity = this._entity;

            if (p_entity && p_entity instanceof MetaElement && p_entity.instanceOf('MetaEntity')) {
                entity    = p_entity;
            }

            if (this._entity) clone['_entity']            = entity;
            if (this.alias !== this.columnName) clone['alias'] = this.alias;
            if (this.columnName) clone['columnName']    = this.columnName;
            if (this.type) clone['type']                = this.type;
            if (this.default) clone['default']          = this.default;
            if (this.caption) clone['caption']          = this.caption;
            if (this.isNotNull) clone['isNotNull']      = this.isNotNull;
            if (this.isNullPass) clone['isNullPass']     = this.isNullPass;
            for (var i = 0; this.constraints.length > i; i++) {
                constraints.push(this.constraints[i]);
            }
            if (this.constraints) clone['constraints']  = constraints;
            if (this.__GET$__value(this)) clone['__value']          = this.__GET$__value(this);
            if (this.getter) clone['getter']            = this.getter;
            if (this.setter) clone['setter']            = this.setter;
            
            // 이벤트 복사 (REVIEW:: 개선필요!!)
            if (this.__event.__subscribers.onChanged) {
                for (var i = 0; this.__event.__subscribers.onChanged.length > i; i++) {  // COVER:
                    clone['onChanged'] = this.__event.__subscribers.onChanged[i];
                }
            }
            
            return clone;
        };
        // 변형 POINT:
        MetaColumn.prototype.clone = function(p_entity) {
            var clone = new MetaColumn(this.columnName);
            var rObj = this.getObject();

            if (rObj.columnName) clone.columnName = rObj.columnName;
            clone._entity = p_entity ? p_entity : this._entity;
            if (rObj.default) clone.default = rObj.default;
            if (rObj.caption) clone.caption = rObj.caption;
            if (rObj.isNotNull) clone.isNotNull = rObj.isNotNull;
            if (rObj.isNullPass) clone.isNullPass = rObj.isNullPass;
            if (rObj.constraints) clone.constraints = rObj.constraints;
            if (rObj.getter) clone.getter = rObj.getter;
            if (rObj.setter) clone.setter = rObj.setter;
            if (rObj.alias) clone.alias = rObj.alias;
            if (rObj.value) clone.value = rObj.value;

            return clone;
        };

        /**
         * 제약조건을 추가한다.
         * REVIEW: addConstraint vs setConstraint 와 적합성 검토
         * @param {*} p_regex 
         * @param {*} p_msg 
         * @param {*} p_code 
         * @param {*} p_return 
         */
        MetaColumn.prototype.setConstraint = function(p_regex, p_msg, p_code, p_return) {
            p_return = p_return || false;

            var constraint = {};

            if (!(p_regex instanceof RegExp)) Message.error('ES021', ['regex', 'RegExp']);
            if (!(typeof p_msg === 'string')) Message.error('ES021', ['msg', 'string']);

            constraint.regex = p_regex;
            constraint.msg = p_msg;
            constraint.code = p_code;
            constraint.return = p_return;
            
            this.constraints.push(constraint);
        };
        
        /**
         * 아이템의 value에 유효성을 검사한다. (isNotnull, isNullPass, constraints 기준)
         * @param {string} p_value 
         * @param {object} r_result 메세지는 참조(객체)형 으로 전달
         * @param {number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
         */
        // MetaColumn.prototype.valid = function(p_value, r_result, p_option) {
        MetaColumn.prototype.valid = function(p_value, r_result) {
            // p_option = p_option || 1;   
            r_result.value = p_value;
            r_result.msg = '';
            r_result.code = '';
            p_value = p_value || '';
            
            var result;
            var value = null;

            // if (!(typeof p_value === 'string')) throw new Error('Only [p_value] type 'string' can be added');
            p_value = typeof p_value === 'number' ? String(p_value) : p_value;  // number 형 변환

            // 1. 기본값 얻기
            value = p_value === null || typeof p_value === 'undefined' ? this.default : p_value;
            value = value.trim();

            // 2-1. 통과조건 검사
            if (false
                || (this.isNotNull === false && this.constraints.length === 0 ) 
                || (this.isNotNull === false && this.isNullPass === true && value.length === 0)
                || (this.isNotNull === true && this.constraints.length === 0 && value.length > 0)
            ){
                return true;
            }
            // 2-2. 실패조건 검사
            if (this.isNotNull === true && this.constraints.length === 0 && value.length === 0) {
                r_result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
                r_result.code  = 0;
                return false;
            }

            // 2-3. 제약조건 검사
            for(var i = 0; this.constraints.length > i; i++) {

                if (typeof this.constraints[i] === 'function') {
                    return this.constraints[i].call(this, this, p_value, r_result);     // 함수형 제약조건  // COVER:
                } else {
                    result = p_value.match(this.constraints[i].regex);
    
                    if ((this.constraints[i].return === false && result !== null) ||    // 실패 조건
                        (this.constraints[i].return === true && result === null)) {     // 성공 조건
       
                        r_result.msg   = this.constraints[i].msg;
                        r_result.code  = this.constraints[i].code;
                        return false;
                    }
                }
            }            
            // // 3. 결과(Null) 검사
            // if ((p_option === 1 && this.isNotNull === true && p_value.trim().length <= 0) || 
            //     (p_option === 2 && p_value.trim().length <= 0)) {
                
            //     r_result.msg   = this.caption+'('+this.name+')은  공백을 입력할 수 없습니다.';
            //     r_result.code  = 0;
            //     return false;
            // }
            return true;
        };

        return MetaColumn;
    
    }(MetaElement));

    //--------------------------------------------------------------
    // implementation
    var MetaColumnCollection  = (function (_super) {
        /**
         * 아이템 컬렉션 (최상위)
         * @constructs _L.Meta.Entity.MetaColumnCollection
         * @extends _L.Collection.PropertyCollection
         * @abstract
         * @param {*} p_owner 소유자 
         */
        function MetaColumnCollection(p_owner, p_baseType) {
            _super.call(this, p_owner);
            
            var _baseType;

            /**
             * 아이템의 타입
             * @member {Function} _L.Meta.Entity.MetaColumnCollection#_baseType
             */
            Object.defineProperty(this, '_baseType', 
            {
                get: function() { 
                    return _baseType; 
                },
                set: function(newValue) { 
                    if (!(typeof newValue === 'function')) Message.error('ES021', ['_baseType', 'function']);
                    if (!(new newValue() instanceof MetaColumn)) Message.error('ES032', ['_baseType', 'MetaColumn']);
                    _baseType = newValue;
                },
                enumerable: true,
                configurable: false,
            });

            this._baseType = p_baseType || MetaColumn;
        }
        Util.inherits(MetaColumnCollection, _super);
        
        MetaColumnCollection._NS = 'Meta.Entity';          // namespace
        MetaColumnCollection._PARAMS = ['_owner', '_baseType'];         // creator parameter

        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // MetaColumnCollection.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this._baseType, p_target._baseType)) return false;
        //     return true;
        // };

        /**
         * 컬렉션에 아이템 유무를 검사한다.
         * @param {*} p_elem 
         * @returns {*} 
         */
        MetaColumnCollection.prototype.contains = function(p_elem) {
            if (p_elem instanceof MetaColumn) {
                return this.indexOf(p_elem.columnName, 1) > -1;
            } else {
                return _super.prototype.contains.call(this, p_elem);
            }
        };

        MetaColumnCollection.prototype.add = function(p_name, p_value) {
            
            if (this._owner.rows.count > 0) Message.error('ES045', ['_owner.rows', 'column']);
            if (this.existColumnName(p_name)) Message.error('ES042', ['name', 'columnName']);
            if (this.existAlias(p_name)) Message.error('ES042', ['name', 'alias']);
            
            return _super.prototype.add.call(this, p_name, p_value);
        };

        MetaColumnCollection.prototype.removeAt = function(p_idx) {
            if (this._owner.rows.count > 0) Message.error('ES044', ['_owner.rows', 'idx']);
            return _super.prototype.removeAt.call(this, p_idx);
        };

        /**
         *  이름과 값으로 아이템 생성하여 컬렉션에 추가한다.
         * @param {*} p_name 아이템명
         * @param {String | Number | Boolean} p_value 
         * @returns {MetaColumn}
         */
        MetaColumnCollection.prototype.addValue  = function(p_name, p_value) {
            var item;
            var property = {};

            if (typeof p_name !== 'string') Message.error('ES021', ['name', 'string']);
            if(['number', 'string', 'boolean'].indexOf(typeof p_value) < 0) {
                Message.error('ES021', ['value', 'number, string, boolean']);
            }
            
            property = { value: p_value };

            item = new this._baseType(p_name, this._owner, property);

            return this.add(item);
        };

        /**
         *  이름과 값으로 아이템 생성하여 컬렉션에 추가한다.
         * @param {*} p_name 아이템명
         * @param {String | Number | Boolean} p_value 
         * @returns {MetaColumn}
         */
        MetaColumnCollection.prototype.initValue  = function() {
            for (var i = 0; this.count > i; i++) {
                this[i].value = this[i].default;
            }
        };

        /**
         * 별칭이 존재하는지 검사
         * @param {*} p_key 
         * @returns 
         */
        MetaColumnCollection.prototype.existAlias  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].alias === p_key) return true;
            }
            return false;
        };

        /**
         * 컬럼명이 존재하는지 검사
         * @param {*} p_key 
         * @returns 
         */
        MetaColumnCollection.prototype.existColumnName  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].columnName === p_key) return true;
            }
            return false;
        };

        /**
         * 별칭에대한 컬럼 조회
         * @param {*} p_key 
         * @returns 
         */
        MetaColumnCollection.prototype.alias  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].alias === p_key) return this[i];
            }
        };

        return MetaColumnCollection;
    
    }(PropertyCollection));

    //--------------------------------------------------------------
    // implementation
    var MetaTableColumnCollection  = (function (_super) {
        /**
         * 테이블 아이템 컬렉션
         * @constructs _L.Meta.Entity.MetaTableColumnCollection
         * @extends _L.Meta.Entity.MetaColumnCollection
         * @param {*} p_owner 소유자
         */
        function MetaTableColumnCollection(p_owner) {
            _super.call(this, p_owner);
        }
        Util.inherits(MetaTableColumnCollection, _super);

        MetaTableColumnCollection._NS = 'Meta.Entity';          // namespace
        MetaTableColumnCollection._PARAMS = ['_owner'];         // creator parameter

        /**
         * 테이블컬렉션에 아이템을 추가한다.
         * @param {string | MetaColumn} p_object 
         * @returns {MetaColumn} 등록한 아이템
         */
        MetaTableColumnCollection.prototype.add  = function(p_object) {
            var i_value;
            var i_name;

            if (typeof p_object === 'string') {      
                i_name  = p_object;
                i_value = new this._baseType(i_name, this._owner);
            } else if (p_object instanceof this._baseType) {
                // MetaTable 직접만 적용(참조형 아이템 소유 못함)
                i_name  = p_object.columnName;
                i_value = p_object.clone();
                i_value._entity = this._owner;
            } else {
                Message.error('ES022', ['object']);
            }

            if (typeof i_name === 'undefined') Message.error('ES051', ['name | obj.columnName']);

            return _super.prototype.add.call(this, i_name, i_value);
        };

        return MetaTableColumnCollection;
    
    }(MetaColumnCollection));


    //--------------------------------------------------------------
    // implementation
    var MetaViewColumnCollection  = (function (_super) {
        /**
         * @constructs _L.Meta.Entity.MetaViewColumnCollection
         * @extends _L.Meta.Entity.MetaColumnCollection
         * @param {*} p_owner 소유자
         * @param {MetaColumnCollection?} p_baseCollection 참조기본 컬렉션
         */
        function MetaViewColumnCollection(p_owner, p_baseCollection) {
            _super.call(this, p_owner);

            var _baseCollection = p_baseCollection;
            var _refEntities = [];

            if (p_baseCollection && !(p_baseCollection instanceof MetaColumnCollection)) Message.error('ES032', ['_baseCollection', 'MetaColumnCollection']);

            // if (p_baseCollection && !(p_baseCollection instanceof MetaColumnCollection)) {
            //     throw new Error('Error!! MetaColumnCollection object [p_baseCollection].');   // COVER:
            // }
            /**
             * 엔티티의 아이템(속성) 컬렉션
             * @member {MetaColumnCollection} _L.Meta.Entity.MetaViewColumnCollection#_baseCollection
             */
            Object.defineProperty(this, '_baseCollection', 
            {
                get: function() { return _baseCollection; },
                // set: function(newValue) { 
                //     if (!(newValue instanceof MetaColumnCollection)) Message.error('ES032', ['_baseCollection', 'MetaColumnCollection']);
                //     _baseCollection = newValue;
                // },
                configurable: false,
                enumerable: true
            });

            Object.defineProperty(this, '_refEntities', 
            {
                get: function() { return _refEntities; },
                configurable: false,
                enumerable: true
            });
            // if (p_baseCollection) this._baseCollection = p_baseCollection;

            /** @protected */
            // this._baseCollection = p_baseCollection;
            
            // inner variable access
            this.__SET$_baseCollection = function(val, call) {
                if (call instanceof MetaViewColumnCollection) _baseCollection = val;
            }
        }
        Util.inherits(MetaViewColumnCollection, _super);

        MetaViewColumnCollection._NS = 'Meta.Entity';                       // namespace
        MetaViewColumnCollection._PARAMS = ['_owner', '_baseCollection'];   // creator parameter

        MetaViewColumnCollection.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this, p_vOpt);
            var vOpt = p_vOpt || 0;

            if (this._baseCollection) obj._baseCollection = MetaRegistry.createReferObject(this._baseCollection);
            if (vOpt > -2 && this._refEntities.length > 0) {
                obj._refEntities = [];
                for (var i = 0; i < this._refEntities.length; i++) {
                    obj._refEntities.push(MetaRegistry.createReferObject(this._refEntities[i]));
                }
            }
            // if (vOpt > -2 && this._baseEntity) obj._baseEntity = MetaRegistry.createReferObject(this._baseEntity);
            /**
             * REVIEW:
             * _refEntities 는 add 시점에 자동으로 추가되므로 필요 없을틋 
             */
            return obj;                  
        };

        MetaViewColumnCollection.prototype.setObject = function(mObj, oObj) {
            _super.prototype.setObject.call(this, mObj, oObj);
            
            var origin = oObj ? oObj : mObj;
            var baseCollection, obj;

            if (mObj._baseCollection) {
                baseCollection = MetaRegistry.findSetObject(origin, mObj._baseCollection.$ref);
                if (!baseCollection) Message.error('ES015', [mObj.name, '_baseCollection']);
                this.__SET$_baseCollection(baseCollection, this);
                // this._baseCollection = baseCollection;
            }
            if (Array.isArray(mObj) && mObj._refEntities.length > 0) {
                for (var i = 0; i < mObj._refEntities.length; i++) {
                    obj = MetaRegistry.findSetObject(origin, mObj._refEntities[i].$ref);
                    if (!obj) Message.error('ES015', [mObj.name, '_refEntities']);    
                    this._refEntities.push(obj);
                }
            }
            // if (vOpt > -2 && this._baseEntity) obj._baseEntity = MetaRegistry.createReferObject(this._baseEntity);
            /**
             * REVIEW:
             * _refEntities 는 add 시점에 자동으로 추가되므로 필요 없을틋 
             */
            return obj;                  
        };


        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // MetaViewColumnCollection.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;

        //     if (!this._compare(this._baseCollection, p_target._baseCollection)) return false;
        //     return true;
        // };

        /**
         * 뷰 엔티티에 참조를 등록한다. (중복 제거후)
         * @param {MetaEntity} p_entity 
         */
        MetaViewColumnCollection.prototype._regRefer  = function(p_entity) {
            if(!(p_entity instanceof MetaElement && p_entity.instanceOf('MetaEntity'))) {
                Message.error('ES032', ['entity', 'MetaEntity']);
            }
            if (this._refEntities.indexOf(p_entity) < 0) this._refEntities.push(p_entity);
        };
        


        /**
         * 뷰컬렉션에 아이템을 추가(등록/설정)한다.
         * @param {String | MetaColumn} p_object 
         * @param {?MetaColumnCollection} p_refCollection
         * @example
         *  - base(all),    string | Itme, Collection   => Collection 에 생성후 자신에 등록 
         *  - base(N),      string | Itme               => this 에 생성후 자신에 등록
         *  - base(Y),      string | MetaColumn         => Base 에 생성후 자신에 등록
         * 
         *   // string                       => 생성 및 자신에 등록
         *   // string <base>                => 생성 및 소유처에 등록
         *   // MetaColumn                         => 생성 및 자신에 등록
         *   // MetaColumn <base>                  => 생성 및 소유처에 등록
         *   // string, collection           => 참조만 등록
         *   // string, collection <base>    => 참조만 등록
         * 
         *  TODO:: filter 옵션 : 충돌방지에 이용
         *  TODO:: 객체 비교는 string 이 아니고 값과 타입을 비교해야함 (그래야 참조를 사용)
         */
        MetaViewColumnCollection.prototype.add  = function(p_object, p_refCollection) {
            var collection;
            var i_name;
            var i_value;

            if (p_object instanceof MetaColumn) {
                // 아이템 소유자 설정
                if (p_object._entity === null) p_object._entity = this._owner;
                i_name = p_object.columnName;
                i_value = p_object;
            } else if (typeof p_object === 'string') {
                i_name = p_object;
                i_value = new this._baseType(i_name, this._owner);
            // } else if (p_object instanceof MetaElement && p_object.instanceOf('MetaEntity')) {
            //     // 아아템 가져오기
            //     for (var i = 0; p_object.columns.count > i; i++) {
            //         this.add(p_object.columns[i]);
            //     }
            } else {
                // 메세지 윈위치 TODO:
                Message.error('ES022', [p_object._type.name]);
            }

            // TODO:: 이름 충돌검사

            // baseCollection & refCollection 의 경우
            if (p_refCollection instanceof MetaColumnCollection) {            // 전달값으로 기본컬렉션 지정시
                collection = p_refCollection;
            } else if (this._baseCollection instanceof MetaColumnCollection) { // 기본컬렉션 존재시
                collection = this._baseCollection;
            }
            
            // 기본참조 컬렉션 또는 전달참조 컬렉션인 경우
            if (collection) {
                if (collection.contains(collection[i_name])) {          // 기존에 존재하는지
                    i_value = collection[i_name];                       // 참조 가져옴
                } else {                                                
                    collection.add(p_object);                           // 컬렉션에 등록 
                    i_value = collection[i_name];
                }
                
                // REVIEW:: 의존성을 낮추기 위해서 검사후 등록
                // 소유객체에 참조 등록 (중복제거됨)
                if (this._regRefer) {
                    this._regRefer(collection._owner);
                }
            }
            
            return _super.prototype.add.call(this, i_name, i_value);
        };

        /**
         * 엔티티 추가한다.
         * REVIEW:: 제거 대상 add() 로 합쳐짐
         * @param {MetaEntity} p_entity 
         */
        MetaViewColumnCollection.prototype.addEntity  = function(p_entity) {
            // REVIEW: MetaEntity 로 변경 요망
            if (typeof p_entity === 'undefined' && !(p_entity instanceof MetaElement && p_entity.instanceOf('MetaEntity'))) {
                Message.error('ES032', ['entity', 'MetaEntity']);
            }

            for (var i = 0; p_entity.columns.count > i; i++) {
                this.add(p_entity.columns[i]);
            }
        };
        
        return MetaViewColumnCollection;
    
    }(MetaColumnCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaColumn                         = MetaColumn;
        exports.MetaColumnCollection               = MetaColumnCollection;
        exports.MetaViewColumnCollection           = MetaViewColumnCollection;
        exports.MetaTableColumnCollection          = MetaTableColumnCollection;

    } else {
        _global._L.MetaColumn                              = MetaColumn;
        _global._L.MetaColumnCollection                    = MetaColumnCollection;
        _global._L.MetaViewColumnCollection                = MetaViewColumnCollection;
        _global._L.MetaTableColumnCollection               = MetaTableColumnCollection;
        // namespace
        _global._L.Meta.Entity.MetaColumn                  = MetaColumn;
        _global._L.Meta.Entity.MetaColumnCollection        = MetaColumnCollection;
        _global._L.Meta.Entity.MetaViewColumnCollection    = MetaViewColumnCollection;
        _global._L.Meta.Entity.MetaTableColumnCollection   = MetaTableColumnCollection;
    }

}(typeof window !== 'undefined' ? window : global));