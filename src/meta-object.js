/**** meta-object.js | _L.Meta.MetaObject ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Type                       = require('./type').Type;                   // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _IObject                    = require('./i-object').IObject;            // strip:
        var _IMarshal                   = require('./i-marshal').IMarshal;          // strip:
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;  // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Type                       = _global._L.Type;              // modify:
    var $Util                       = _global._L.Util               // modify:
    var $IObject                    = _global._L.IObject;           // modify:
    var $IMarshal                   = _global._L.IMarshal;          // modify:
    var $MetaRegistry               = _global._L.MetaRegistry;      // modify:

    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Type                    = _Type                 || $Type;                   // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var IObject                 = _IObject              || $IObject;                // strip:
    var IMarshal                = _IMarshal             || $IMarshal;               // strip:
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;           // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IObject) throw new Error(Message.get('ES011', ['IObject', 'i-object']));
    if (!IMarshal) throw new Error(Message.get('ES011', ['IMarshal', 'i-marshal']));
    if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));

    //==============================================================
    // 3. module implementation   
    var MetaObject  = (function () {
        /**
         * 메타 최상위 객체를 생성합니다.
         * @constructs _L.Meta.MetaObject
         * @implements {_L.Interface.IObject}
         * @implements {_L.Interface.IMarshal}
         */
        function MetaObject() {

            var _guid;
            var _ns;
            
            /**
             * 현재 객체의 고유식별자(guid)
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
                set: function(nVal) { _guid = nVal; },
                configurable: false,
                enumerable: false
            });

            /**
             * 현재 객체의 생성자
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
                enumerable: false
            });

            Object.defineProperty(this, '_ns', 
            {
                get: function() { 
                    return _ns;
                },
                set: function(nVal) { 
                    _ns = nVal;
                },
                configurable: false,
                enumerable: false
            });
            
            // 추상클래스 검사
            if (Object.prototype.hasOwnProperty.call(this._type, '_KIND')) {
            // if (this._type.hasOwnProperty('_KIND')) {
                var kind = this._type['_KIND'].toLowerCase();
                if (['abstract', 'interface', 'enum', 'function'].indexOf(kind) > -1) {
                    throw new ExtendError(/EL03111/, null, [this._type.name, kind]);
                }
            }

            // _NS 선언이 없으면 부모의 것을 기본으로 사용!
            if (this._type && this._type._NS) this._ns = this._type._NS;
            MetaRegistry.register(this);

            Util.implements(MetaObject, this);          // strip:
        }
        MetaObject._UNION = [IObject, IMarshal];
        MetaObject._NS = 'Meta';
        MetaObject._PARAMS = [];

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
                return Type.deepEqual(obj1, obj2);
            } else if (_isObject(p_obj1) && _isObject(p_obj2)) {
                return Type.deepEqual(p_obj1, p_obj2);
            } else return false;
        }

        /**
         * 현재 객체와 target 객체를 비교합니다.  
         * (참조 주소의 비교(===)가 아니고, 속성과 값을 비교,  _guid 값은 비교 제외)  
         * @param {object} p_target 대상 객체
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
        MetaObject.prototype.equal = function(p_target) {
            return _compare(this, p_target);
        };
        Object.defineProperty(MetaObject.prototype, 'equal', {
            enumerable: false
        });

        /**
         * 현재 객체의 생성자와 상위(proto) 생성자를 목록으로 가져옵니다.  
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
        Object.defineProperty(MetaObject.prototype, 'getTypes', {
            enumerable: false
        });

        /**
         * 현재 객체의 target 인스턴스 여부를 검사합니다 .(_UNION 포함)
         * @param {function | string} p_target 함수명 또는 생성자
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
        MetaObject.prototype.instanceOf = function(p_target) {
            var _this = this;
            var unionTypes = this._interface || this._type._UNION;
            // var unionTypes = this._type['_UNION'] || [];
            // var unionTypes = this._interface || [];
            // var thisTypes = this.getTypes();

            if (typeof p_target === 'string') return $$findFunctionName(p_target);
            if (typeof p_target === 'function') return $findFunction(p_target);
            return false;

            // inner function
            function $findFunction(fun) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (fun === types[i]) return true;
                }
                
                for (var i = 0; i < unionTypes.length; i++) {
                    if (fun ===  unionTypes[i]) return true;
                }
                return false;
            }
            function $$findFunctionName(funName) {
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
        Object.defineProperty(MetaObject.prototype, 'instanceOf', {
            enumerable: false
        });

        /**
         * 현재 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        MetaObject.prototype.getObject = function(p_vOpt, p_owned) {
            var vOpt = p_vOpt || 0;
            var obj = {};
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (vOpt < 2 && vOpt > -1) obj['_guid'] = this._guid;
            obj['_type'] = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
            return obj;                        
        };
        Object.defineProperty(MetaObject.prototype, 'getObject', {
            enumerable: false
        });

        /**
         * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        MetaObject.prototype.setObject  = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var fullName = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;

            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03112/, null, [typeof p_oGuid]);
            if (p_oGuid['_type'] !== fullName) throw new ExtendError(/EL03113/, null, [p_oGuid['_type'], fullName]);
            
            if (MetaRegistry.isGuidObject(origin)) {
                if (!origin['__TRANSFORM_REFER']) {
                    origin = MetaRegistry.transformRefer(origin);
                    origin['__TRANSFORM_REFER'] = true;
                }
            } else throw new ExtendError(/EL03114/, null, [p_origin._type, p_origin._guid]);
            
            MetaRegistry.setMetaObject(p_oGuid, this); // $set attach
        };
        Object.defineProperty(MetaObject.prototype, 'setObject', {
            enumerable: false
        });

        return MetaObject;

    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.MetaObject  = MetaObject;    // strip:
    
    // create namespace
    _global._L.Meta                 = _global._L.Meta || {};

    _global._L.MetaObject = MetaObject;
    _global._L.Meta.MetaObject = MetaObject;
    
}(typeof window !== 'undefined' ? window : global));