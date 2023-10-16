/**
 * namespace _L.Meta.Entity.MetaColumn
 * namespace _L.Meta.Entity.BaseColumnCollection
 * namespace _L.Meta.Entity.MetaViewColumnCollection
 * namespace _L.Meta.Entity.MetaTableColumnCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var Observer;
    var CustomError;
    var MetaRegistry;
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
        MetaElement                 = require('./meta-element').MetaElement;
        BaseColumn                  = require('./base-column').BaseColumn;
        PropertyCollection          = require('./collection-property').PropertyCollection;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        Observer                    = _global._L.Observer;
        CustomError                 = _global._L.CustomError;
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
    if (typeof MetaElement === 'undefined') Message.error('ES011', ['MetaElement', 'meta-element']);
    if (typeof BaseColumn === 'undefined') Message.error('ES011', ['BaseColumn', 'base-column']);
    if (typeof PropertyCollection === 'undefined') Message.error('ES011', ['PropertyCollection', 'collection-property']);

    //==============================================================
    // 4. module implementation
    //--------------------------------------------------------------
    // implementation   
    var MetaColumn  = (function (_super) {
        /**
         * 메타 컬럼
         * @constructs _L.Meta.Entity.MetaColumn
         * @extends _L.Meta.Entity.BaseColumn
         * @param {string} p_name 속성명
         * @param {BaseEntity?} p_entity 소유 BaseEntity
         * @param {object?} p_property 
         * @param {object?} p_property.default 기본값
         * @param {object?} p_property.caption 설명
         * @param {boolean?} p_property.isNotNull 필수 유무
         * @param {boolean?} p_property.isNullPass null 통과 유무
         * @param {array<object.function>?} p_property.constraints 제약조건
         * @param {(string | number | boolean)?} p_property.value value 값
         * @param {function?} p_property.getter 겟터
         * @param {function?} p_property.setter 셋터
         * @param {string?} p_property.alias 별칭
         * @param {function?} p_property.onChanged value 변경 후 이벤트
         */
        function MetaColumn(p_name, p_entity, p_property) {
            _super.call(this, p_name, p_entity);

            var __value       = null;   // 재정의
            var __event       = new Observer(this);
            var defaultValue  = null;
            var caption       = null;
            var isNotNull     = false;
            var isNullPass    = false;
            var constraints   = [];
            var getter        = null;
            var setter        = null;
            var alias         = null;

            /** 
             * 이벤트 객체
             * @private
             * @member {Object} _L.Meta.Entity.MetaColumn#__event  
             */
            Object.defineProperty(this, '__event', 
            {
                get: function() { return __event; },
                configurable: false,
                enumerable: false,
            });        

            /**
             * 컬럼 value의 필수 여부
             * @member {boolean} _L.Meta.Entity.MetaColumn#isNotNull
             */
            Object.defineProperty(this, 'isNotNull', 
            {
                get: function() { return isNotNull },
                set: function(nVal) { 
                    if(typeof nVal !== 'boolean') Message.error('ES021', ['isNotNull', 'boolean']);
                    isNotNull = nVal; 
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 컬럼 value null 통과 여부 (기본값 = false)
             * @member {boolean} _L.Meta.Entity.MetaColumn#isNullPass
             */
            Object.defineProperty(this, 'isNullPass', 
            {
                get: function() { return isNullPass },
                set: function(nVal) { 
                    if(typeof nVal !== 'boolean') Message.error('ES021', ['isNullPass', 'boolean']);
                    isNullPass = nVal; 
                },
                configurable: false,
                enumerable: true
            });
            
            /**
             * 컬럼 제약 조건 
             * @member {array<object | function>} _L.Meta.Entity.MetaColumn#constraints
             * @example
             * var c = {
             *  regex: /aa/,
             *  msg: '매칭메세지',  // return이 true면 성공시 메세지, false 실패시 메세지
             *  condition: ture     // 매칭시 성공
             * };
             */
            Object.defineProperty(this, 'constraints', 
            {
                get: function() { return constraints; },
                set: function(nVal) { 
                    var list = [];
                    constraints = [];
                    if (Array.isArray(nVal))  list = nVal;
                    else list.push(nVal);
                    for(var i = 0; list.length > i; i++) {
                        if (!(typeof list[i] === 'function' || (typeof list[i].regex === 'object' && typeof list[i].msg === 'string'))) {
                            Message.error('ES021', ['constraints', 'array<function | {regex,msg,code}>']);
                         }
                    }
                    constraints = list;
                },
                configurable: false,
                enumerable: true
            });
            
            /**
             * 컬럼 value  
             * get 우선순위 : 1. getter 있는 경우, 2. 내부값 __value  
             * set 우선순위 : 1. setter 있는 경우, 2. setter 리턴값이 없는 경우  
             * REVIEW: 정리표 보고 수정 필요!!
             * @member {string | number | boolean} _L.Meta.Entity.MetaColumn#value
             */
            Object.defineProperty(this, 'value', 
            {
                get: function() { 
                    var __val;
                    // 우선순위 : 1
                    if (typeof getter === 'function' ) {
                        __val = getter.call(this);
                        if (__value !== null && __value !== __val) {
                            this._onChanged(__val, __value);    // 검사 및 이벤트 발생
                            __value = __val;   // 내부에 저장
                        }
                    // 우선순위 : 2
                    } else __val = __value;
                    /**
                     * 분기 처리값 '__val' 없는경우 (null, undefined)
                     *  - this.__value 초기화 되지 않은 경우
                     *  - getter 리턴이 없는 경우
                     */
                    if (typeof __val === 'undefined' || __val === null) __val = __value || this.default;  
                    return __val; 
                },
                set:  function(val) { 
                    var __val, _val;
                    var _oldVal = __value;
                    if (typeof setter === 'function' ) _val = setter.call(this, val);
                    // settter 의 리턴이 여부
                    __val = typeof _val !== 'undefined' ? _val : val;
                    __val = __val === null ? '' : __val;  // null 등록 오류 처리
                    if (this._valueTypes.length > 0) Util.typeValid(this._valueTypes, __val);
                    __value = __val;
                    if (_oldVal !== __val && __val) this._onChanged(__val, _oldVal);    // 검사 및 이벤트 발생
                },
                configurable: true, // 재정의 허용
                enumerable: true
            });

            /**
             * 컬럼의 value 의 getter
             * @member {Function} _L.Meta.Entity.MetaColumn#getter
             */
            Object.defineProperty(this, 'getter', 
            {
                get: function() { return getter; },
                set: function(val) { 
                    if(typeof val !== 'function') Message.error('ES021', ['getter', 'function']);
                    getter = val;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 컬럼의 value 의 setter
             * @member {Function} _L.Meta.Entity.MetaColumn#setter
             */
            Object.defineProperty(this, 'setter', 
            {
                get: function() { return setter; },
                set: function(val) { 
                    if(typeof val !== 'function') Message.error('ES021', ['setter', 'function']);
                    setter = val;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 변경 이벤트 
             * @event _L.Meta.Entity.MetaColumn#onChanged 
             * @param {function}    p_callback
             * @param {any}         p_callback.p_nValue 신규 value 값
             * @param {any}         p_callback.p_oValue 기존 value 값
             * @param {MetaColumn}  p_callback.p_this this(컬럼객체)

             */
            Object.defineProperty(this, 'onChanged', 
            {
                set: function(fun) {
                    this.__event.subscribe(fun, 'onChanged');
                },
                configurable: false,
                enumerable: false,
            });
            

            // inner variable access
            // this.__GET$alias = function(call) {
            //     if (call instanceof MetaColumn) return alias;
            // }
            this.__GET$__value = function(call) {
                if (call instanceof MetaColumn) return __value;
            }
            this.__SET$__value = function(val, call) {
                if (call instanceof MetaColumn) __value = val;
            }
            // this.__SET$__key = function(val, call) {
            //     if (call instanceof MetaColumn) __key = val;
            // }

            if (p_property) this._load(p_property);
        }
        Util.inherits(MetaColumn, _super);

        MetaColumn._NS = 'Meta.Entity';                                 // namespace
        MetaColumn._PARAMS = ['columnName', '_entity', '_property'];    // creator parameter
        MetaColumn._VALUE_TYPE = [String, Number, Boolean];

        /**
         * @listens _L.Meta.Entity.MetaColumn#_onChanged
         */
        MetaColumn.prototype._onChanged = function(p_nValue, p_oValue) {
            p_oValue = p_oValue || this.__GET$__value(this);
            this.__event.publish('onChanged', p_nValue, p_oValue, this);
        };

        /**
         * 프로퍼티 객체로 속성 로드
         * @param {object} p_property 
         */
        MetaColumn.prototype._load = function(p_property) {
            if (typeof p_property === 'object' ) {
                for(var prop in p_property) {
                    if (p_property.hasOwnProperty(prop) &&
                    ['default', 'caption', 'isNotNull', 'isNullPass', 'constraints', 
                        'value', 'getter', 'setter', 'alias', 'onChanged'
                    ].indexOf(prop) > -1) {
                        this[prop] = p_property[prop];
                    }
                }
            }
            if (['number', 'string', 'boolean'].indexOf(typeof p_property) > -1) {  
                this['value'] = p_property; 
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
        MetaColumn.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (!Util.deepEqual(this.__event.__subscribers, this.__event._getInitObject())) {
                obj['__subscribers'] = this.__event.__subscribers;
            }
            if (this.isNotNull !== false) obj['isNotNull'] = this.isNotNull;
            if (this.isNullPass !== false) obj['isNullPass'] = this.isNullPass;
            if (this.constraints.length > 0) obj['constraints'] = Util.deepCopy(this.constraints);
            if (this.getter !== null) obj['getter'] = this.getter;
            if (this.setter !== null) obj['setter'] = this.setter;
            if (this.value !== null) obj['value'] = this.value;    // 오버라이딩
            return obj;                        
        };

        /**
         * 현재 객체를 초기화 후, 지정한 guid 타입의 객체를 사용하여 설정합니다.   
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object?} p_origin 현재 객체를 설정하는 원본 guid 객체  
         * 기본값은 p_oGuid 객체와 동일
         */
        MetaColumn.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var origin = p_origin ? p_origin : p_oGuid;
            var entity;

            if (p_oGuid['__subscribers']) {
                this.__event.__SET$__subscribers(p_oGuid['__subscribers'], this.__event);
            }
            if (p_oGuid['isNotNull']) this.isNotNull = p_oGuid['isNotNull'];
            if (p_oGuid['isNullPass']) this.isNullPass = p_oGuid['isNullPass'];
            if (p_oGuid['constraints']) this.constraints = p_oGuid['constraints'];
            if (p_oGuid['getter']) this.getter = p_oGuid['getter'];
            if (p_oGuid['setter']) this.setter = p_oGuid['setter'];
            if (p_oGuid['value']) this.value = p_oGuid['value'];
        };

        /**
         * 컬럼 복제
         * @param {BaseEntity?} p_entity 지정한 엔티티로 복제
         * @returns {MetaColumn}
         */
        MetaColumn.prototype.clone = function(p_entity) {
            var clone;
            var rObj = this.getObject();
            var entity = p_entity ? p_entity : this._entity;
            
            clone = new MetaColumn(this.columnName, entity);
            
            if (rObj['default']) clone.default = rObj['default'];
            if (rObj['caption']) clone.caption = rObj['caption'];
            if (rObj['isNotNull']) clone.isNotNull = rObj['isNotNull'];
            if (rObj['isNullPass']) clone.isNullPass = rObj['isNullPass'];
            if (rObj['constraints']) clone.constraints = rObj['constraints'];
            if (rObj['getter']) clone.getter = rObj['getter'];
            if (rObj['setter']) clone.setter = rObj['setter'];
            if (rObj['alias']) clone.alias = rObj['alias'];
            if (rObj['value']) clone.value = rObj['value'];

            return clone;
        };

        /**
         * 제약조건을 추가
         * @param {function} p_func 
         * @returns {object?} 리턴값이 없으면 검사 성공
         */
        MetaColumn.prototype.addConstraint = function(p_func) {
        };

        /**
         * 제약조건을 추가  
         * REVIEW: 정규식으로 반대 조건을 모두 나열 할수 있으므로, 항상 실패조건을 하는게 맞을지? 검토
         * @param {Regexp} p_regex 정규표현식
         * @param {string} p_msg  regexp 입력시
         * @param {string?} p_code regexp 입력시
         * @param {boolean?} p_condition <기본값 false> 성공/실패 조건
         * @param {boolean?} p_condition.false 실패조건이며<기본값>, 정규식이 매칭이 안되야 한다.
         * @param {boolean?} p_condition.true 성공조건이며 정규식이 매칭이되어야 성공(통화)  
         * @returns {object?} 리턴값이 없으면 검사 성공
         */
        MetaColumn.prototype.addConstraint = function(p_regex, p_msg, p_code, p_condition) {
            p_condition = p_condition || false;

            var constraint = {};
            if (typeof p_regex === 'function') {
                this.constraints.push(p_regex);
                return;
            }
            if (!(p_regex instanceof RegExp)) Message.error('ES021', ['regex', 'RegExp']);
            if (!(typeof p_msg === 'string')) Message.error('ES021', ['msg', 'string']);    

            constraint.regex = p_regex;
            constraint.msg = p_msg;
            constraint.code = p_code;
            constraint.condition = p_condition;
            
            this.constraints.push(constraint);
        };
        
        /**
         * 속성의 value에 유효성을 검사한다. (isNotnull, isNullPass, constraints 기준)
         * TODO: number, boolean 형이 입력될경우, 기본 제약 조건 valueTypes 검사여부 검토?, 예외가 아니고 메세지로 표현?
         * @param {string} p_value 
         * @param {object} result 메세지는 참조(객체)형 으로 전달
         * @param {number} p_option 1. isNotNull 참조 | 2: null검사 진행   |  3: null검사 무시
         */
        MetaColumn.prototype.valid = function(p_value) {
            var result = {};
            var match;
            var value = null;
            
            result.value = p_value;
            result.msg = '';
            result.code = '';
            p_value = p_value || '';

            value = typeof p_value === 'number' ? String(p_value) : p_value;  // number 형 변환

            // 1. 기본값 얻기 문자열로 변경
            value = value.trim();

            // 2. 통과조건 검사
            if (this.isNotNull === false && this.isNullPass === true && value.length === 0) return;
            if (this.isNotNull === false && this.constraints.length === 0 ) return;
            if (this.isNotNull === true && this.constraints.length === 0 && value.length > 0) return;
            
            // 3. 실패조건 검사
            if (this.isNotNull === true && this.constraints.length === 0 && value.length === 0) {
                result.msg   = Message.get('ES055', [this.name]);
                result.code  = 0;
                return result;
            }

            // 4. 제약조건 검사
            for(var i = 0; this.constraints.length > i; i++) {
                if (typeof this.constraints[i] === 'function') {
                    return this.constraints[i].call(this, this, value);     // 함수형 제약조건  
                } else {
                    match = value.match(this.constraints[i].regex);
                    if ((this.constraints[i].condition === false && match !== null) ||    // 실패 조건
                        (this.constraints[i].condition === true && match === null)) {     // 성공 조건
                        result.msg   = Message.get('ES056', [this.name, this.constraints[i].msg]);
                        result.code  = this.constraints[i].code;
                        return result;
                    }
                }
            }            
            return;
        };

        return MetaColumn;
    
    }(BaseColumn));

    //--------------------------------------------------------------
    // implementation
    var BaseColumnCollection  = (function (_super) {
        /**
         * 컬럼 컬렉션 (최상위)
         * @abstract
         * @constructs _L.Meta.Entity.BaseColumnCollection
         * @extends _L.Collection.PropertyCollection
         * @param {object} p_owner 소유자 
         * @param {BaseColumn?} p_baseType 기본 컬럼 타입
         */
        function BaseColumnCollection(p_owner, p_baseType) {
            _super.call(this, p_owner);
            
            var _baseType;

            /**
             * 기본 컬럼 타입
             * @member {Function} _L.Meta.Entity.BaseColumnCollection#_baseType
             */
            Object.defineProperty(this, '_baseType', 
            {
                get: function() { return _baseType; },
                set: function(nVal) { 
                    if (!(typeof nVal === 'function')) Message.error('ES021', ['_baseType', 'function']);
                    // if (!(new nVal('temp') instanceof BaseColumn)) Message.error('ES032', ['_baseType', 'BaseColumn']);
                    if (!(Util.isType(nVal, BaseColumn))) Message.error('ES032', ['_baseType', 'BaseColumn']);
                    _baseType = nVal;
                },
                enumerable: false,
                configurable: false,
            });

            this._baseType = p_baseType || MetaColumn;
        }
        Util.inherits(BaseColumnCollection, _super);
        
        BaseColumnCollection._NS = 'Meta.Entity';                   // namespace
        BaseColumnCollection._PARAMS = ['_owner', '_baseType'];     // creator parameter
        BaseColumnCollection._KIND = 'abstract';


        /**
         * 컬럼을 컬렉션에 추가
         * @param {string} p_name 컬럼명
         * @param {any} p_value 컬럼객체
         * @returns {number} 추가한 index 
         */
        BaseColumnCollection.prototype.add = function(p_name, p_value) {
            
            if (this._owner.rows.count > 0) Message.error('ES045', ['_owner.rows', 'column']);
            if (this.existColumnName(p_name)) Message.error('ES042', ['name', 'columnName']);
            if (this.existAlias(p_name)) Message.error('ES042', ['name', 'alias']); 
            
            return _super.prototype.add.call(this, p_name, p_value);
        };

        /**
         * 컬럼을 컬렉션에서 삭제
         * @param {number} p_idx 
         * @returns {boolean}
         */
        BaseColumnCollection.prototype.removeAt = function(p_idx) {
            if (this._owner.rows.count > 0) Message.error('ES044', ['_owner.rows', 'idx']);
            return _super.prototype.removeAt.call(this, p_idx); 
        };

        /**
         * 컬렉에 모든 value 값을 default 값으로 초기화
         */
        BaseColumnCollection.prototype.initValue  = function() {
            for (var i = 0; this.count > i; i++) {
                this[i].value = this[i].default;
            }
        };

        /**
         * 컬렉션에 별칭 이름(키)가 존재하는지 검사
         * @param {string} p_key 이름
         * @returns {boolean}
         */
        BaseColumnCollection.prototype.existAlias  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].alias === p_key) return true;
            }
            return false;
        };

        /**
         * 컬렉션에 컬럼 이름(키)이 존재하는지 검사
         * @param {string} p_key 이름
         * @returns {boolean}
         */
        BaseColumnCollection.prototype.existColumnName  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].columnName === p_key) return true;
            }
            return false;
        };

        /**
         * 별칭에 대한 컬럼 객체 얻기
         * @param {string} p_key 
         * @returns {BaseColumn?}
         */
        BaseColumnCollection.prototype.alias  = function(p_key) {
            for (var i = 0; this.count > i; i++) {
                if (this[i].alias === p_key) return this[i];
            }
        };

        /** @abstract */
        BaseColumnCollection.prototype.addValue = function() {
            Message.error('ES013', ['addValue(name, value)']);
        };

        return BaseColumnCollection;
    
    }(PropertyCollection));

    //--------------------------------------------------------------
    // implementation
    var MetaTableColumnCollection  = (function (_super) {
        /**
         * 테이블 컬럼 컬렉션  
         * 참조 컬럼은 독립적으로 가진다 (참조 금지)
         * @constructs _L.Meta.Entity.MetaTableColumnCollection
         * @extends _L.Meta.Entity.BaseColumnCollection
         * @param {object} p_owner 소유자
         */
        function MetaTableColumnCollection(p_owner) {
            _super.call(this, p_owner);
        }
        Util.inherits(MetaTableColumnCollection, _super);

        MetaTableColumnCollection._NS = 'Meta.Entity';          // namespace
        MetaTableColumnCollection._PARAMS = ['_owner'];         // creator parameter

        /**
         * 테이블 컬렉션에 컬럼 추가
         * @param {string | BaseColumn} p_any 컬럼명, 매타컬럼
         * @returns {number} 등록한 index
         */
        MetaTableColumnCollection.prototype.add  = function(p_any) {
            var column;
            var key;

            if (typeof p_any === 'string') {      
                key  = p_any;
                column = new this._baseType(key, this._owner);
            } else if (p_any instanceof this._baseType) {
                key  = p_any.columnName;
                column = p_any.clone(this._owner);
            } else {
                Message.error('ES022', ['object']); 
            }

            return _super.prototype.add.call(this, key, column);
        };

        /**
         * 이름과 값으로 컬렉션에 추가 (내부에서 생성)
         * @param {string} p_name 컬럼명
         * @param {String | Number | Boolean} p_value 
         * @returns {BaseColumn} 추가한 컬럼 객체
         */
        MetaTableColumnCollection.prototype.addValue  = function(p_name, p_value) {
            var item;
            var property = {};
            var _valueTypes = this._baseType._VALUE_TYPE;

            if (typeof p_name !== 'string') Message.error('ES021', ['name', 'string']);
            if (_valueTypes.length > 0) Util.typeValid(_valueTypes, p_value);
            
            property = { value: p_value };
            item = new this._baseType(p_name, this._owner, property);

            return this[this.add(item)];
        };

        return MetaTableColumnCollection;
    
    }(BaseColumnCollection));


    //--------------------------------------------------------------
    // implementation
    var MetaViewColumnCollection  = (function (_super) {
        /**
         * 메타 뷰 컬럼 컬렉션
         * @constructs _L.Meta.Entity.MetaViewColumnCollection
         * @extends _L.Meta.Entity.BaseColumnCollection
         * @param {object} p_owner 소유자
         */
        function MetaViewColumnCollection(p_owner) {
            _super.call(this, p_owner);

            /** 
             * 참조하는 엔티티 목록
             * @readonly
             * @member {array<BaseEntity>} _L.Meta.Entity.MetaViewColumnCollection#_refEntities
             */
            Object.defineProperty(this, '_refEntities', 
            {
                get: function() { 
                    var arr = [];
                    for (var i = 0; i < this.count; i++) {
                        var column = this[i];
                        if (this._owner !== column._entity && arr.indexOf(column._entity) < 0) {
                            arr.push(column._entity);
                        }
                    }
                    return arr; 
                },
                configurable: false,
                enumerable: false
            });
        }
        Util.inherits(MetaViewColumnCollection, _super);

        MetaViewColumnCollection._NS = 'Meta.Entity';                       // namespace
        MetaViewColumnCollection._PARAMS = ['_owner', '_baseCollection'];   // creator parameter

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
        MetaViewColumnCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            
            if (vOpt === 0) {   // 참조로 바꿈
                for (var i = 0; i < obj['_elem'].length; i++) {
                    var elem = obj['_elem'][i];
                    if (vOpt < 2 && vOpt > -1 && elem['_entity'] && elem['_entity']['$ref'] !== this._owner._guid) {
                        var rObj = MetaRegistry.createReferObject(elem); // 소유자가 아니면 참조 리턴
                        obj['_elem'][i] = rObj;
                    }
                }
            }
            return obj;                  
        };

        /**
         * 뷰컬렉션에 컬럼을 추가(등록/설정)한다.  
         * - entity가 있는 컬럼을 추가할 경우 : 참조가 추가되는 것이다.  
         *      + collection 존재할 경우 최상위 컬렉션에도 참조가 등록된다.  
         * - entity가 없는 컬럼을 추가할 경우 : 자신을 소유자로 등록한다.  
         * - collection에 컬럼이 존재할 경우 : columns 객체는 무시되고, 리턴한 객체의 참조를 등록한다.  
         * - collection에 컬럼이 없을 경우 : 컬렉션에 entity를 설정한다.(참조 재귀호출시 최상위만 등록됨)  
         *      + collection 존재할 경우 entity 항상 존재한다.  
         * - entity가 있는 컬럼을 추가할 경우 : 참조가 추가되는 것이다.
         * - entity가 없는 컬럼을 추가할 경우 : 자신을 소유자로 등록한다.
         * - collection에 컬럼이 존재할 경우 : columns 객체는 무시되고, 리턴한 객체의 참조를 등록한다.
         * - collection에 컬럼이 없을 경우 : 컬렉션에 entity를 설정한다.(참조 재귀호출시 최상위만 등록됨)
         * @param {string | MetaColumn} p_any 
         * @param {BaseColumnCollection?} p_refCollection
         */
        MetaViewColumnCollection.prototype.add  = function(p_any, p_refCollection) {
            var collection;
            var key;
            var column;

            if (p_refCollection && !(p_refCollection instanceof BaseColumnCollection)) {
                Message.error('ES032', ['refCollection', 'BaseColumnCollection']);
            }

            if (p_any instanceof BaseColumn) {
                key = p_any.columnName;
                column = p_any;
            } else if (typeof p_any === 'string') {
                key = p_any;
                column = new this._baseType(key, this._owner);
            } else Message.error('ES022', ['object '+ typeof p_any]);

            // baseCollection & refCollection 존재하는 경우
            if (p_refCollection instanceof BaseColumnCollection) {                                  
                collection = p_refCollection;
            } else if (this._owner && this._owner._baseEntity && this._owner._baseEntity.columns) { 
                collection = this._owner._baseEntity.columns;
            }
            
            // 컬렉션이 있는 경우 : _entity 항상 존재
            if (collection) {
                if (collection.contains(collection[key])) {
                    column = collection[key];   // 기존에 존재하면 참조 가져옴
                } else {                                                
                    collection.add(p_any);      // 없으면 컬렉션에 추가(owner 설정됨)
                    column = collection[key];
                }
            }
            if (!column._entity) column._entity = this._owner;

            return _super.prototype.add.call(this, key, column);
        };

        /**
         *  이름과 값으로 컬럼 생성하여 컬렉션에 추가
         * @param {string} p_name 컬럼명
         * @param {any} p_value 
         * @param {BaseColumnCollection?} p_refCollection
         * @returns {MetaColumn}
         */
        MetaViewColumnCollection.prototype.addValue  = function(p_name, p_value, p_refCollection) {
            var item;
            var property = {};
            var _valueTypes = this._baseType._VALUE_TYPE;

            if (typeof p_name !== 'string') Message.error('ES021', ['name', 'string']);
            if (_valueTypes.length > 0) Util.typeValid(_valueTypes, p_value);
            
            property = { value: p_value };
            item = new this._baseType(p_name, null, property);

            return this[this.add(item, p_refCollection)];
        };

        /**
         * 엔티티 모든 컬럼을 추가
         * @param {BaseEntity} p_entity 
         */
        MetaViewColumnCollection.prototype.addEntity  = function(p_entity) {
            if (typeof p_entity !== 'undefined' && !(p_entity instanceof MetaElement && p_entity.instanceOf('BaseEntity'))) {
                Message.error('ES032', ['entity', 'BaseEntity']);
            }

            for (var i = 0; p_entity.columns.count > i; i++) {
                this.add(p_entity.columns[i]);
            }
        };
        
        return MetaViewColumnCollection;
    
    }(BaseColumnCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaColumn                                  = MetaColumn;
        exports.BaseColumnCollection                        = BaseColumnCollection;
        exports.MetaViewColumnCollection                    = MetaViewColumnCollection;
        exports.MetaTableColumnCollection                   = MetaTableColumnCollection;

    } else {
        _global._L.MetaColumn                              = MetaColumn;
        _global._L.BaseColumnCollection                    = BaseColumnCollection;
        _global._L.MetaViewColumnCollection                = MetaViewColumnCollection;
        _global._L.MetaTableColumnCollection               = MetaTableColumnCollection;
        // namespace
        _global._L.Meta.Entity.MetaColumn                  = MetaColumn;
        _global._L.Meta.Entity.BaseColumnCollection        = BaseColumnCollection;
        _global._L.Meta.Entity.MetaViewColumnCollection    = MetaViewColumnCollection;
        _global._L.Meta.Entity.MetaTableColumnCollection   = MetaTableColumnCollection;
    }

}(typeof window !== 'undefined' ? window : global));