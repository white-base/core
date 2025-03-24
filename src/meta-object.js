/**** meta-object.js | MetaObject ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';    
import Type from './type.js';
import Util from './util.js';
import IObject from './i-object.js';
import IMarshal from './i-marshal.js';
import MetaRegistry from './meta-registry.js';

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
     * Creates an instance of the MetaObject class.  
     * 
     * @constructs MetaObject
     * @implements {IObject}
     * @implements {IMarshal}
     */
    function MetaObject() {

        var _guid;
        var _ns;
        
        /**
         * Internal property that stores the unique identifier of the object.  
         * 
         * @readonly
         * @member {string} MetaObject#_guid 
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
         * Internal property that refers to the generator function of the object.  
         * 
         * @readonly
         * @member {function} MetaObject#_type 
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

        /**
         * Indicates the object name space.  
         * If '_type.NS' is not statically defined, use the parent's namespace as the default.  
         */
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
     * Compare the current object with the specified object.  
     * However, the '_guid' property is excluded from the comparison.  
     * 
     * @param {object} p_target To compare
     * @returns {boolean} If two objects are the same, 'true', or 'false'
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
     * Returns the creators of the current object and all the creators of the prototype chain to the array.  
     * 
     * @returns {array<function>} Array of generator functions (includes first defined constructors sequentially)
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
     * Verify that the object is an instance of a particular class.  
     * You can also examine the defined interface type (including '_UNION').  
     * 
     * @param {Function | string} p_target Class constructor function or class name (string)
     * @returns {boolean} Whether there is an instance of the specified class ('true' or 'false')
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
            
            for (var k = 0; k < unionTypes.length; k++) {
                if (fun ===  unionTypes[k]) return true;
            }
            return false;
        }
        function $$findFunctionName(funName) {
            var types = _this.getTypes();
            for (var i = 0; i < types.length; i++) {
                if (funName === types[i].name) return true;
            }
            for (var k = 0; k < unionTypes.length; k++) {
                if (funName === unionTypes[k].name) return true;
            }
            return false;
        }
    };
    Object.defineProperty(MetaObject.prototype, 'instanceOf', {
        enumerable: false
    });

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object
     * @returns {object} Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    MetaObject.prototype.getObject = function(p_vOpt) {
        var vOpt = p_vOpt || 0;
        var obj = {};
        // var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        if (vOpt < 2 && vOpt > -1) obj['_guid'] = this._guid;
        obj['_type'] = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
        return obj;                        
    };
    Object.defineProperty(MetaObject.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param {object} p_oGuid object literal of type of GUID to set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
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
export default MetaObject;
export { MetaObject };