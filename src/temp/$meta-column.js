/**** meta-column.js | _L.Meta.Entity.MetaColumn ****/

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
    _global._L.Meta.Entity          = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Type                       = require('./type');
        var _Util                       = require('./util');
        var _Observer                   = require('./observer').Observer;
        var _BaseColumn                 = require('./base-column').BaseColumn;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Type                       = _global._L.Type;
        var $Util                       = _global._L.Util;
        var $Observer                   = _global._L.Observer;
        var $BaseColumn                 = _global._L.BaseColumn;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Type                    = _Type                 || $Type;
    var Util                    = _Util                 || $Util;
    var Observer                = _Observer             || $Observer;
    var BaseColumn              = _BaseColumn           || $BaseColumn;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof Observer === 'undefined') throw new Error(Message.get('ES011', ['Observer', 'observer']));
    if (typeof BaseColumn === 'undefined') throw new Error(Message.get('ES011', ['BaseColumn', 'base-column']));

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
                    if(typeof nVal !== 'boolean') throw new ExtendError(/EL05131/, null, [this.constructor.name, typeof nVal]);
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
                    if(typeof nVal !== 'boolean') throw new ExtendError(/EL05132/, null, [this.constructor.name, typeof nVal]);
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
                            throw new ExtendError(/EL05133/, null, [this.constructor.name, i, typeof nVal.regex, typeof nVal.msg]);
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
                    if (this._valueTypes.length > 0) Type.matchType([this._valueTypes], __val);
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
                    if(typeof val !== 'function') throw new ExtendError(/EL05134/, null, [this.constructor.name, typeof val]);
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
                    if(typeof val !== 'function') throw new ExtendError(/EL05135/, null, [this.constructor.name, typeof val]);
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
                    // if (p_property.hasOwnProperty(prop) &&
                    if (Object.prototype.hasOwnProperty.call(p_property, prop) &&
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

            if (!Type.deepEqual(this.__event.__subscribers, this.__event._getInitObject())) {
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
            if (!(p_regex instanceof RegExp)) throw new ExtendError(/EL05136/, null, []);
            if (!(typeof p_msg === 'string')) throw new ExtendError(/EL05137/, null, [typeof p_msg]);    

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


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaColumn                                 = MetaColumn;
    } else {
        _global._L.MetaColumn                              = MetaColumn;
        // namespace
        _global._L.Meta.Entity.MetaColumn                  = MetaColumn;
    }

}(typeof window !== 'undefined' ? window : global));