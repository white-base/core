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
         * 메타 최상위 클래스의 새 인스턴스를 초기화합니다.
         * @constructs _L.Meta.MetaObject
         * @implements {_L.Interface.IObject}
         * @implements {_L.Interface.IMarshal}
         */
        function MetaObject() {

            var _guid;
            
            /**
             * 현재 객체의 고유한 식별자을 가져옵니다.
             * @readonly
             * @member {string} _L.Meta.MetaObject#_guid 
             * @example
             * var obj = MetaObject();
             * console.log(obj._guid);      // '5337877c-49d6-9add-f35a-7bd31d510d4f' unique key code
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
             * 현재 인스턴스의 type 을 가져옵니다.
             * @readonly
             * @member {function} _L.Meta.MetaObject#_type 
             * @example
             * var obj = new MetaObject();
             * obj._type === MetaObject;        // true
             * console.log(typeof obj._type);   // 'function'
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
            if (this._type.hasOwnProperty('_KIND')) {
                var kind = this._type['_KIND'].toLowerCase();
                if (['abstract', 'interface', 'enum', 'function'].indexOf(kind) > -1) {
                    Message.error('ES018', [this._type.name]);
                }
            }

            // _NS 선언이 없으면 부모의 것을 기본으로 사용!
            if (this._type && this._type._NS) this._ns = this._type._NS;
            MetaRegistry.register(this);

            Util.implements(MetaObject, this, IObject, IMarshal);
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
         * 지정된 객체가 현재 객체와 같은지 확인합니다.
         * '===' 연산자의 객체 주소 비교가 아니고, 속성별 타입과 값에 대한 비교  
         * _guid 는 비교에서 제외됨  
         * @param {any} p_target 대상 객체
         * @param {any?} p_origin 비교 객체의 기본은 this 이며 입력시 다르객체와 비교한다.
         * @returns {boolean}
         * @example
         * var meta1 = new MetaObject();
         * var meta2 = new MetaObject();
         * meta1.equal(meta2);      // true
         * meta2.equal(meat1);      // true
         * meta1 === meta2;         // false
         * 
         * var obj1 = {a: 1};
         * var obj2 = {a: 1};
         * this.equal(obj1, obj2);  // true
         */
        MetaObject.prototype.equal = function(p_target, p_origin) {
            var origin = p_origin || this;
            return _compare(origin, p_target);
        };

        /**
         * 현재 객체의 상속타입을 Array 타입으로 가져옵니다.
         * @returns {array<function>}
         * @example
         * var obj = new MetaObject();
         * var arr = obj.getTypes();
         * arr[0] === MetaObject;   // true
         * arr[1] === Object;       // true
         * console.log(arr.length); // 2
         * 
         * var elem = new MetaElement('e1');   // Inherited MetaObject 
         * var arr = elem.getTypes();
         * arr[0] === MetaElement;  // true
         * arr[1] === MetaObject;   // true
         * arr[2] === Object;       // true
         * console.log(arr.length); // 3
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
         * 상위 클래스 또는 인터페이스의 인스턴지 인지 확인합니다.
         * @param {string | function} p_fun 함수명으로 넣으면 이름만 검색, 클래스를 넣은면 클래스 검색
         * @returns {boolean}
         * @example
         * var obj = new MetaObject();
         * obj.instanceOf('MetaObject');    // true
         * obj.instanceOf('Object');        // true
         * obj.instanceOf(MetaObject);      // true
         * obj.instanceOf(Object);          // true
         * obj.instanceOf(String);          // false
         * 
         * var elem = new MetaElement('e1');// Inherited MetaObject 
         * obj.instanceOf('MetaElement');   // true
         * obj.instanceOf('MetaObject');    // true
         * obj.instanceOf('Object');        // true
         * obj.instanceOf(MetaElement);     // true
         * obj.instanceOf(MetaObject);      // true
         * obj.instanceOf(Object);          // true
         * obj.instanceOf(String);          // false
         */
        MetaObject.prototype.instanceOf = function(p_fun) {
            var _this = this;
            // var unionTypes = this._type['_UNION'] || [];
            var unionTypes = this._interface || [];
            var thisTypes = this.getTypes();

            if (typeof p_fun === 'string') return findFunctionName(p_fun);
            if (typeof p_fun === 'function') return findFunction(p_fun);
            return false;

            // inner function
            function findFunction(fun) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (fun === types[i]) return true;
                }
                
                for (var i = 0; i < unionTypes.length; i++) {
                    if (fun ===  unionTypes[i]) return true;
                }
                return false;
            }
            function findFunctionName(funName) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (funName === types[i].name) return true;
                }
                for (var i = 0; i < unionTypes.length; i++) {
                    if (funName === unionTypes[i].name) return true;
                }
                return false;
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
        MetaObject.prototype.getObject = function(p_vOpt, p_owned) {
            var vOpt = p_vOpt || 0;
            var obj = {};
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (vOpt < 2 && vOpt > -1) obj['_guid'] = this._guid;
            obj['_type'] = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
            return obj;                        
        };

        /**
         * 현재 객체를 초기화 후, 지정한 guid 타입의 객체를 사용하여 설정합니다.   
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object?} p_origin 현재 객체를 설정하는 원본 guid 객체  
         * 기본값은 p_oGuid 객체와 동일
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