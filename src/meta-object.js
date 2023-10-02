/**
 * namespace _L.Meta.MetaObject
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var IObject;
    var IMarshal;
    var MetaRegistry;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        IObject                     = require('./i-object').IObject;
        IMarshal                    = require('./i-marshal').IMarshal;
        MetaRegistry                = require('./meta-registry').MetaRegistry;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util
        IObject                     = _global._L.IObject;
        IMarshal                    = _global._L.IMarshal;
        MetaRegistry                = _global._L.MetaRegistry;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IObject === 'undefined') Message.error('ES011', ['IObject', 'i-object']);
    if (typeof IMarshal === 'undefined') Message.error('ES011', ['IMarshal', 'i-marshal']);
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);

    //==============================================================
    // 4. module implementation   
    var MetaObject  = (function () {
        /**
         * 메타 최상위 클래스 (실체)
         * @constructs _L.Meta.MetaObject
         * @implements {_L.Interface.IObject}
         * @implements {_L.Interface.IMarshal}
         */
        function MetaObject() {

            var _guid;
            
            /**
             * 유일한 값
             * @member {array} _L.Meta.MetaObject#_guid 
             */
            Object.defineProperty(this, '_guid', 
            {
                get: function() { 
                    if (!_guid) _guid = Util.createGuid();
                    return _guid;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 생성자(일급함수)
             * @member {function} _L.Meta.MetaObject#_type 
             */
            Object.defineProperty(this, '_type', 
            {
                get: function() { 
                    var proto = this.__proto__ || Object.getPrototypeOf(this);
                    return proto.constructor;
                },
                configurable: false,
                enumerable: true
            });
            
            // inner variable access
            this.__SET$_guid = function(val, call) {
                if (call instanceof MetaObject) _guid = val;    // 상속접근 허용
            }

            // 추상클래스 검사
            if (this._type.hasOwnProperty('_ABSCRACT')) {
                Message.error('ES018', [this._type.name]);
            }

            // _NS 선언이 없으면 부모의 것을 기본으로 사용!
            if (this._type && this._type._NS) this._ns = this._type._NS;
            MetaRegistry.register(this);

            Util.implements(this, IObject, IMarshal);
        }
        
        MetaObject._NS = 'Meta';        // namespace
        MetaObject._PARAMS = [];        // creator parameter
        

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }
        function _compare(p_obj1, p_obj2) { // 객체 비교
            if (p_obj1 === p_obj2) return true;
            else if (p_obj1 instanceof MetaObject && p_obj2 instanceof MetaObject) {
                var obj1 = p_obj1.getObject(2);    // _guid, $ref 제외 객체
                var obj2 = p_obj2.getObject(2);
                return Util.deepEqual(obj1, obj2);
            } else if (_isObject(p_obj1) && _isObject(p_obj2)) {
                return Util.deepEqual(p_obj1, p_obj2);
            } else return false;
        }

        /**
         * 객체 비교  
         * '===' 연산자의 객체 주소 비교가 아니고, 속성별 타입과 값에 대한 비교  
         * _guid 는 비교에서 제외됨  
         * @param {any} p_target 대상 객체
         * @param {any?} p_origin 비교 객체의 기본은 this 이며 입력시 다르객체와 비교한다.
         * @returns {boolean}
         */
        MetaObject.prototype.equal = function(p_target, p_origin) {
            var origin = p_origin || this;
            return _compare(origin, p_target);
        };

        /**
         * 객체 타입 이름 얻기 (상속포함)
         * @returns {array<function>}
         */
        MetaObject.prototype.getTypes = function() {
            return parentFunction(this);

            // inner function
            function parentFunction(obj) {
                var list = [];
                var proto = obj.__proto__ || Object.getPrototypeOf(obj);
                if (proto) {
                    list.push(proto.constructor);
                    list = list.concat(parentFunction(proto));
                }
                return list;
            }
        };

        /**
         * 상위 클래스 또는 인터페이스 구현 여부
         * @param {string | function} p_fun 함수명으로 넣으면 이름만 검색, 클래스를 넣은면 클래스 검색
         * @returns {boolean}
         */
        MetaObject.prototype.instanceOf = function(p_fun) {
            var _this = this;
            
            if (typeof p_fun === 'string') return findFunctionName(p_fun);
            if (typeof p_fun === 'function') return findFunction(p_fun);
            return false;

            // inner function
            function findFunction(fun) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (fun === types[i]) return true;
                }
                for (var i = 0; i < _this._interface.length; i++) {
                    if (fun === _this._interface[i]) return true;
                }
                return false;
            }
            function findFunctionName(funName) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (funName === types[i].name) return true;
                }
                for (var i = 0; i < _this._interface.length; i++) {
                    if (funName === _this._interface[i].name) return true;
                }
                return false;
            }
        };

        /**
         * guid 객체 얻기  
         * (순환 X, 참조 X)  
         * - opt = 0 : <기본값> 참조 관점의 요약된 객체  
         * - opt = 1 : 소유 관점의 구조의 객체, guid 관점의 중복 가능  
         * - opt = 2 : opt = 1 조건과 guid, $ref 가 제외됨  (객체 비교에 활용)
         * @virtual
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
         * @returns {object}  
         */
        MetaObject.prototype.getObject = function(p_vOpt, p_owned) {
            var vOpt = p_vOpt || 0;
            var obj = {};
            // var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (vOpt < 2 && vOpt > -1) obj['_guid'] = this._guid;
            obj['_type'] = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
            return obj;                        
        };

        /**
         * guid 객체 설정
         * @virtual
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        MetaObject.prototype.setObject  = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var fullName = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;

            if (!_isObject(p_oGuid)) Message.error('ES021', ['oGuid', 'object']);
            if (p_oGuid['_type'] !== fullName) Message.error('ES046', [p_oGuid['_type'], fullName]);
            
            if (MetaRegistry.isGuidObject(origin)) {
                if (!origin['__TRANSFORM_REFER']) {
                    origin = MetaRegistry.transformRefer(origin);
                    origin['__TRANSFORM_REFER'] = true;
                }
            } else Message.error('ES022', [typeof p_oGuid]);
            
            MetaRegistry.createSetObject(p_oGuid, this); // $set attach
        };

        return MetaObject;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaObject = MetaObject;
    } else {
        _global._L.MetaObject = MetaObject;
        _global._L.Meta.MetaObject = MetaObject;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));