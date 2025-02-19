/**** util.js | _L.Common.Util.- ****/
// (function(_global) {
    'use strict';

    // var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    // if (isNode) {                                                                   // strip:
    //     var _Message                    = require('./message').Message;             // strip:
    //     var _ExtendError                = require('./extend-error').ExtendError;    // strip:
    //     var _Type                       = require('./type').Type;                   // strip:
    // }                                                                               // strip:
    // var $Message                    = _global._L.Message;       // modify:
    // var $ExtendError                = _global._L.ExtendError;   // modify:
    // var $Type                       = _global._L.Type;          // modify:

    // var Message                 = _Message              || $Message;                // strip:
    // var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    // var Type                    = _Type                 || $Type;                   // strip:

    import Message from './message.js';
    import ExtendError from './extend-error.js';
    import Type from './type.js';

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
    
    //==============================================================
    // 3. module implementation   
    var _global = globalThis;
    
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활
    var Util = {};  // namespace


    // local function
    function _isObject(obj) {
        return obj != null && typeof obj === 'object';
    }

    // polyfill
    if (!Array.isArray || OLD_ENV) {
        Array.isArray = function(p_obj) {
          return Object.prototype.toString.call(p_obj) === '[object Array]';
        };
    }
    // REVIEW: 제거해둠, 대부분은 keys 는 기본으로 정의되어 있음
    // if (!Object.keys) {
    //     Object.keys = (function () {
    //         var hasOwnProperty = Object.prototype.hasOwnProperty;
    //         var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    //         var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
    //         var dontEnumsLength = dontEnums.length;
    //         return function (obj) {
    //             if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new Error('Object.keys called on non-object');
    //             var result = [];
    //             for (var prop in obj) if (hasOwnProperty.call(obj, prop)) result.push(prop);
    //             if (hasDontEnumBug) {
    //               for (var i=0; i < dontEnumsLength; i++) {
    //                 if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
    //               }
    //             }
    //             return result;
    //         }
    //     })()
    // };
    
    /**
     * 배열의 깊이를 가져옵니다.  
     * REVIEW: 필요성 검토 필요!
     * @memberof _L.Common.Util
     * @param {array} p_elem 
     * @param {number} p_depts 
     * @returns {number} 
     */
    Util.getArrayDepth = function getArrayDepth(p_elem, p_depts) {
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
    
    /**
     * guid 값을 생성합니다. (36자)
     * @memberof _L.Common.Util
     * @returns {string} 예> 'b806a5b5-75f7-a1ba-3736-17f56fb5d65a'
     */
    Util.createGuid = function createGuid() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+'000000000').substring(2,10);  
            return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 8) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 객체를 깊은 복사를합니다. (proto제외)
     * @memberof _L.Common.Util
     * @param {object} p_target 대상 객체
     * @returns {object}
     */
    Util.deepCopy = function deepCopy(p_target) {
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
    }    

    /**
     * superCtor 을 상속합니다.
     * @function
     * @memberof _L.Common.Util
     * @param {function | object} ctor 생성자 또는 생성 객체
     * @param {function | object} superCtor 상속 받을 부모 생성자 또는 객체
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
            }
        }
    }());

    /**
     * ctor 로 생성한 obj 객체의 args<funtion>의 구현 여부를 검사합니다.
     * 종류(ctor._KIND)가 'inteface'이면 allowType(), 아니면 matchType()로 검사한다.
     * @name implements
     * @function
     * @memberof _L.Common.Util
     * @param {function} p_ctor 검사 대상 생성자
     * @param {object} p_obj 검사 대상 인스턴스 객체
     * @param {function?} args 인터페이스들, ctor._UNION 정적 속성으로 설정 가능
     */
    Util.implements = function(p_ctor, p_obj, args) {
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

        for (var i = 0; i < p_ctor['_UNION'].length; i++) {
            if (p_obj._interface.indexOf(p_ctor['_UNION'][i]) < 0) {    // 인터페이스 중복 검사 후 등록
                p_obj._interface.push(p_ctor['_UNION'][i]);
                addCnt++;
            }
        }

        try {
            var beginIdx = p_obj._interface.length - addCnt;
            for (var i = beginIdx; i < p_obj._interface.length; i++) {
                if (p_ctor['_KIND'] === 'interface') {  // 인터페이스 타입과 분리
                    Type.allowType(p_obj._interface[i], p_obj, 1);
                } else Type.matchType(p_obj._interface[i], p_obj, 1);
            }
        } catch (error) { 
            throw new ExtendError(/EL01404/, error, [$typeName(p_obj), $typeName(p_obj._interface[i]), p_ctor['_KIND'] || 'class']);
        }

        if (typeof p_obj.isImplementOf === 'undefined') {   // 내부 메소드 설정
            Object.defineProperty(p_obj, 'isImplementOf',
            {
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
                for (var i = 0; i < this._interface.length; i++) {
                    if (this._interface[i].name === target) return true;  
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

    //==============================================================
    // 4. module export
    export default Util;
//     if (isNode) exports.Util = Util;    // strip:
    
//     // create namespace
//     _global._L.Common               = _global._L.Common || {};

//     _global._L.Util = Util;
//     _global._L.Common.Util = Util;

// }(typeof window !== 'undefined' ? window : global));