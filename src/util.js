/**** util.js | Util ****/
//==============================================================
import ExtendError      from './extend-error.js';
import Type             from './type.js';
   
var _global = globalThis;

var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활

/**
 * This is a utility module.
 */
var Util = {};

// local function
function _isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

/**
 * Returns the nested depth of the array.  
 * REVIEW: 필요성 검토 필요!
 * 
 * @param {array} p_elem Array elements
 * @param {number} p_depts Current depth (default: 0)
 * @returns {number} Maximum nested depth of array
 */
function getArrayDepth(p_elem, p_depts) {
    var MAX     = 10;
    var level   = 0;
    
    p_depts = p_depts || 0;
    if (p_elem instanceof Array && MAX > p_depts) {
        level++;
        p_depts++;
        level = level + getArrayDepth(p_elem[0], p_depts);
    }
    return level;
};
Util.getArrayDepth = getArrayDepth;

/**
 * Creates a 36-digit GUID.  
 * 
 * @returns {string} GUID string generated
 */
function createGuid() {
    function _p8(s) {  
        var p = (Math.random().toString(16)+'000000000').substring(2,10);  
        return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 8) : p ;  
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
};
Util.createGuid = createGuid;

/**
 * Deep copy of the object (except prototype)  
 * 
 * @param {object} p_target Destination object to copy
 * @returns {object} copied object
 */
function deepCopy(p_target) {
    var nobj;

    if (!_isObject(p_target)) {
        return p_target;
    }
    if (p_target instanceof RegExp) return p_target;

    // 객체인지 배열인지 판단
    nobj = Array.isArray(p_target) ? [] : {};
    
    if (Array.isArray(p_target)) {
        for (var i = 0; i < p_target.length; i++) {
            nobj[i] = deepCopy(p_target[i]);
        }
    } else {
        for (var key in p_target) {
            if (Object.prototype.hasOwnProperty.call(p_target, key)) {
                nobj[key] = deepCopy(p_target[key]);
            }
        }
    }
    return nobj;
};
Util.deepCopy = deepCopy;

/**
 * Sets the specified creator to inherit the parent creator.   
 * 
 * @function
 * @param {function | object} ctor generator function or object
 * @param {function | object} superCtor Parent generator function or object
 */
Util.inherits = (function () {
    if (typeof Object.create === 'function' && !OLD_ENV) {
        // implementation from standard node.js 'Util' module
        return function(ctor, superCtor) {
            if (superCtor) {
                ctor.super = superCtor;
                ctor.prototype = Object.create(superCtor.prototype, {
                    constructor: {
                        value: ctor,
                        writable: true,
                        configurable: true,
                        enumerable: false,
                    }
                });
            }
        };
    } else {
        // old school shim for old browsers
        return function (ctor, superCtor) {
            if (superCtor) {
                ctor.super = superCtor;
                var TempCtor = function () {};
                TempCtor.prototype = superCtor.prototype;
                ctor.prototype = new TempCtor();
                ctor.prototype.constructor = ctor;
            }
        };
    }
}());

/**
 * Verify that the object implements the specified interface.  
 * Verify that the 'obj' object created with 'ctor' implements the interface provided by 'interfaces'.  
 * If 'ctor._KIND' is 'Interface', use 'allowType()' to confirm.  
 * Otherwise, use 'matchType()' to confirm.  
 * 
 * @name implements
 * @function
 * @param {function} p_ctor Generator to be examined
 * @param {object} p_obj object to be examined
 * @param {function?} args List of interfaces to check
 */

function _implements(p_ctor, p_obj) {
    var _interface = [];
    var addCnt = 0;

    if (typeof p_ctor !== 'function') throw new ExtendError(/EL01401/, null, [typeof p_ctor]);
    if (!_isObject(p_obj)) throw new ExtendError(/EL01402/, null, [typeof p_obj]);

    if (typeof p_obj._interface === 'undefined') {
        Object.defineProperty(p_obj, '_interface', {
            get: function() { 
                return _interface;
            },
            configurable: false,
            enumerable: false,
        });
    }    

    if (!p_ctor['_UNION']) p_ctor['_UNION'] = [];
    
    for(var i = 2; i < arguments.length; i++) {
        if (typeof arguments[i] === 'function') {
            if (p_obj._interface.indexOf(arguments[i]) < 0) { // 중복 검사 
                p_obj._interface.push(arguments[i]);
                addCnt++;
            }
        } else throw new ExtendError(/EL01403/, null, [i - 2, typeof arguments[i]]);
    } 

    for (var j = 0; j < p_ctor['_UNION'].length; j++) {
        if (p_obj._interface.indexOf(p_ctor['_UNION'][j]) < 0) {    // 인터페이스 중복 검사 후 등록
            p_obj._interface.push(p_ctor['_UNION'][j]);
            addCnt++;
        }
    }

    try {
        var beginIdx = p_obj._interface.length - addCnt;
        for (var k = beginIdx; k < p_obj._interface.length; k++) {
            if (p_ctor['_KIND'] === 'interface') {  // 인터페이스 타입과 분리
                Type.allowType(p_obj._interface[k], p_obj, 1);
            } else Type.matchType(p_obj._interface[k], p_obj, 1);
        }
    } catch (error) { 
        throw new ExtendError(/EL01404/, error, [$typeName(p_obj), $typeName(p_obj._interface[i]), p_ctor['_KIND'] || 'class']);
    }

    if (typeof p_obj.isImplementOf === 'undefined') {   // 내부 메소드 설정
        Object.defineProperty(p_obj, 'isImplementOf', {
            value: $isImplementOf,
            configurable: false,
            enumerable: false
        });
    }

    // inner function
    function $isImplementOf(target) {
        if (typeof target === 'function') {
            for (var i = 0; i < this._interface.length; i++) {
                if (this._interface[i] === target) return true;  
            }
        } else if (typeof target === 'string') {
            for (var j = 0; j < this._interface.length; j++) {
                if (this._interface[j].name === target) return true;  
            }
        } else throw new ExtendError(/EL01405/, null, [typeof target]);
        return false;
    }
    function $typeName(obj) {
        var proto;
        var constructor;
        if (typeof obj === 'function') {
            return obj.name;
        } else if (typeof obj === 'object') {
            proto = !OLD_ENV && Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.__proto__ ;
            constructor = proto.constructor;
            return  constructor.name;
        } else return 'unknown name';
    }
};
Util.implements = _implements;

export default Util;
export { Util };