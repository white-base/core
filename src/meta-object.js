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
    if (typeof MetaRegistry === 'undefined') Message.error('ES011', ['MetaRegistry', 'meta-registry']);
    if (typeof IObject === 'undefined') Message.error('ES011', ['IObject', 'i-object']);
    if (typeof IMarshal === 'undefined') Message.error('ES011', ['IMarshal', 'i-marshal']);

    //==============================================================
    // 4. module implementation   
    var MetaObject  = (function () {
        /**
         * 메타 최상위 클래스 (실체)
         * @constructs _L.Meta.MetaObject
         * @abstract
         * @implements {_L.Interface.IObject}
         * @implements {_L.Interface.IMarshal}
         */
        function MetaObject() {

            var _guid;
            // var _isAbstract = false;
            /**
             * _guid
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
             * _type
             * @member {function} _L.Meta.MetaObject#_type 
             */
            Object.defineProperty(this, '_type', 
            {
                get: function() { 
                    var proto = this.__proto__ || Object.getPrototypeOf(this);            // COVER: 2
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
                Message.error('ES018', [this._type.name, 'clone()']);
            }

            // _NS 선언이 없으면 부모의 것을 기본으로 사용!
            if (this._type && this._type._NS) this._ns = this._type._NS;
            MetaRegistry.register(this);

            Util.implements(this, IObject, IMarshal);
        }
        
        MetaObject._NS = 'Meta';          // namespace
        MetaObject._PARAMS = [];         // creator parameter
        

        /**
         * 단일 객체 비교
         * getObject()
         *  -1 >= : _guid 제외, $ref 또 빠져야함
         * @param {*} p_obj1 
         * @param {*} p_obj2 
         * @returns 
         */
        
        MetaObject.prototype.__compare = function(p_obj1, p_obj2) {
            var _this = this;
            
            if (p_obj1 === p_obj2) return true;

            if (p_obj1 instanceof MetaObject && p_obj2 instanceof MetaObject) {
                var obj1 = p_obj1.getObject(2);    // _guid, $ref 제외 객체
                var obj2 = p_obj2.getObject(2);
                return Util.deepEqual(obj1, obj2);
            } else if (typeof p_obj1 === 'object' && p_obj1 !== null) {
                return Util.deepEqual(p_obj1, p_obj2);
            }
            return false;
        };

        /**
         * 객체 비교
         * === 연산자의 객체주소 비교가 아니고, 타입과 값에 대한 비교
         * 단, _guid 는 비고 제외 
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        MetaObject.prototype.equal = function(p_target) {
            if (!(p_target instanceof MetaObject)) return false;
            // if (typeof p_target !== 'object') return false;
            // return this._type === p_target._type ? true : false;
            return this.__compare(this, p_target);
        };

        /**
         * 객체 타입 이름 얻기 (상속포함)
         * @returns {array<function>}
         */
        MetaObject.prototype.getTypes = function() {
            var arr = [];
            
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
         * 상위 클래스 또는 인터페이스 구현 여부 검사
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
                // if (_this._interface) {
                for (var i = 0; i < _this._interface.length; i++) {
                    if (fun === _this._interface[i]) return true;
                }
                // }
                return false;
            }
            function findFunctionName(funName) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (funName === types[i].name) return true;
                }
                // if (_this._interface) {
                for (var i = 0; i < _this._interface.length; i++) {
                    if (funName === _this._interface[i].name) return true;
                }
                // }
                return false;
            }
        };

        /**
         * 메타 객체를 얻는다
         * -1 : _guid 제외
         * @virtual
         * @param {number} p_vOpt 레벨 옵션
         * @returns {object}
         */
        MetaObject.prototype.getObject = function(p_vOpt, p_origin) {
            var vOpt = p_vOpt || 0;
            var origin = p_origin ? p_origin : obj;
            var obj = {};

            if (vOpt < 2 && vOpt > -1) obj._guid = this._guid;
            obj._type = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * REVIEW: setObject 시점에 복제해서 사용 검토
         * @virtual
         * @param {object} p_oGuid 레벨 옵션
         */
        MetaObject.prototype.setObject  = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var fullName = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;

            if (typeof p_oGuid !== 'object') Message.error('ES021', ['oGuid', 'object']);
            if (p_oGuid._type !== fullName) Message.error('ES046', [p_oGuid._type, fullName]);
            
            if (MetaRegistry.isGuidObject(origin)) {
                // if (!origin['__TRANSFORM_REFER'] || MetaRegistry.hasRefer(origin)) {
                if (!origin['__TRANSFORM_REFER']) {
                    origin = MetaRegistry.transformRefer(origin);
                    origin['__TRANSFORM_REFER'] = true;
                }
            } else Message.error('ES022', [typeof p_oGuid]);
            
            MetaRegistry.createSetObject(p_oGuid, this); // $set 생성
        };
        // MetaObject.prototype.setObject  = function(p_mObj) {
        //     var meta;

        //     if (typeof p_mObj !== 'object') throw new Error('Only [p_mObj] type "object" can be added');
        //     meta = MetaRegistry.find(p_mObj);
        //     if (!meta) {
        //         this.__SET$_guid(p_mObj._guid, this);
        //     } else return meta;
        // };


        

        return MetaObject;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaObject = MetaObject;
    } else {    // COVER:
        _global._L.MetaObject = MetaObject;
        _global._L.Meta.MetaObject = MetaObject;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));