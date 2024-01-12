/**
 * namespace _L.Common.Util
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var getAllProperties;
    var typeObject;
    var allowType;
    var isMatchType;
    var matchType;
    var deepEqual;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};
    _global._L.Common.Util          = _global._L.Common.Util || {};

    //==============================================================
    // 2. import module
    if (isNode) {
        Message                     = require('./message').Message;
        getAllProperties            = require('./util-type').getAllProperties;
        typeObject                    = require('./util-type').typeObject;
        allowType              = require('./util-type').allowType;
        isMatchType                   = require('./util-type').isMatchType;
        matchType                   = require('./util-type').matchType;
        deepEqual                   = require('./util-type').deepEqual;
    } else {    
        Message                     = _global._L.Message;
        getAllProperties            = _global._L.Util.getAllProperties
        typeObject                    = _global._L.Util.typeObject
        allowType              = _global._L.Util.allowType
        isMatchType                   = _global._L.Util.isMatchType
        matchType                   = _global._L.Util.matchType
        deepEqual                   = _global._L.Util.deepEqual
    }

    //==============================================================
    // 3. module dependency check
    if (typeof getAllProperties === 'undefined') Message.error('ES012', ['getAllProperties', 'util-type']);
    if (typeof typeObject === 'undefined') Message.error('ES012', ['typeObject', 'util-type']);
    if (typeof allowType === 'undefined') Message.error('ES012', ['allowType', 'util-type']);
    if (typeof isMatchType === 'undefined') Message.error('ES012', ['isMatchType', 'util-type']);
    if (typeof matchType === 'undefined') Message.error('ES012', ['matchType', 'util-type']);
    if (typeof deepEqual === 'undefined') Message.error('ES012', ['deepEqual', 'util-type']);
    
    //==============================================================
    // 4. module implementation   

    // local function
    function _isObject(obj) {``
        return obj != null && typeof obj === 'object';
    }

    // polyfill
    if (!Array.isArray) {
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
     * 배열 깊이를 가져옵니다.
     * REVIEW: 필요성 검토 필요!
     * @param {array} p_elem 
     * @param {number} p_depts 
     * @memberof _L.Common.Util
     */
    var getArrayDepth  = function(p_elem, p_depts) {
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
     * 고유한 식별자(guid)을 생성합니다.
     * @memberof _L.Common.Util
     * @returns {string}
     */
    var createGuid = function() {

        function _p8(s) {  
            var p = (Math.random().toString(16)+'000000000').substring(2,10);  
            return s ? '-' + p.substring(0, 4) + '-' + p.substring(4, 8) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 지정한 객체를 깊은 복사를 하여 회신합니다.
     * @param {object} object 
     * @memberof _L.Common.Util
     * @returns {object}
     */
    var deepCopy = function(object) {
        if (!_isObject(object)) {
          return object;
        }
        if (object instanceof RegExp) return object;

        // 객체인지 배열인지 판단
        var copy = Array.isArray(object) ? [] : {};
       
        if (Array.isArray(object)) {
            for (var i = 0; i < object.length; i++) {
                copy[i] = deepCopy(object[i]);
            }
        } else {
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    copy[key] = deepCopy(object[key]);
                }
            }
        }
        return copy;
    }    

    /**
     * 지정한 부모(생성자)를 상속합니다.
     * @function
     * @memberof _L.Common.Util
     * @param {object} ctor 대상
     * @param {object} superCtor 상속 받는 부모 생성자
     */
    var inherits = (function () {

        if (typeof Object.create === 'function') {
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
     * 대상 객체에 인터페이스를 정의하고, 인스턴스를 검사합니다.  
     * @name implements
     * @function
     * @memberof _L.Common.Util
     * @param {function} p_ctor 적용할 생성자
     * @param {object} p_obj 검사 대상 인스턴스 객체
     * @param {function?} args 인터페이스들,  ctor._UNION 으로 설정 가능
     */
    var implement = function(p_ctor, p_obj, args) {
        var _interface = [];
        var msg = '';
        var addCnt = 0;
        // var union = [];

        if (typeof p_ctor !== 'function') Message.error('ES024', ['p_ctor', 'function']);
        if (!_isObject(p_obj)) Message.error('ES024', ['p_obj', 'obj']);

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
            } else Message.error('ES021', ['arguments', 'function']);
        }

        for (var i = 0; i < p_ctor['_UNION'].length; i++) {
            if (p_obj._interface.indexOf(p_ctor['_UNION'][i]) < 0) {
                p_obj._interface.push(p_ctor['_UNION'][i]);
                addCnt++;
            }
        }

        try {
            var beginIdx = p_obj._interface.length - addCnt;
            for (var i = beginIdx; i < p_obj._interface.length; i++) {
                matchType(p_obj._interface[i], p_obj);
            }
        } catch (error) {
            Message.error('ES017', [typeName(p_obj), typeName(p_obj._interface[i]), error.message]);
        }

        if (typeof p_obj.isImplementOf === 'undefined') {   // 내부 메소드 설정
            Object.defineProperty(p_obj, 'isImplementOf',
            {
                value: isImplementOf,
                configurable: false,
                enumerable: false
            });
        }

        // inner function
        function isImplementOf(target) {
            if (typeof target === 'function') {
                for (var i = 0; i < this._interface.length; i++) {
                    if (this._interface[i] === target) return true;  
                }
            } else if (typeof target === 'string') {
                for (var i = 0; i < this._interface.length; i++) {
                    if (this._interface[i].name === target) return true;  
                }
            } else Message.error('ES021', ['isImplementOf()', 'function, string']);
            return false;
        }
        function typeName(obj) {
            if (typeof obj === 'function') return obj.name;
            if (_isObject(obj)) {
                var constructor = getType(obj);
                return  constructor.name;
            }
            // return 'unknown';
        }
        function getType(obj) {
            var proto = obj.__proto__ || Object.getPrototypeOf(obj);
            return proto.constructor;
        }
    };

    /**
     * 대상의 상위를 포함하여 '_UNION'과 자신의 타입 목록을 가져옵니다.
     * @memberof _L.Common.Util
     * @param {function} ctor 생성자
     * @returns {array<function>}
     */
    var getTypes = function (ctor) {
        var arr = [];
        var tempArr = [];
        var union;
        var proto;

        if (typeof ctor !== 'function') return;
        
        arr.push(ctor);
        union = ctor['_UNION'] || [];
        proto = getPrototype(ctor);        
        
        if (proto !== Function.prototype) {
            arr = arr.concat(getTypes(proto));
        }
        for (var i = 0; i < union.length; i++) {
            arr = arr.concat(getTypes(union[i]));
        }
        for (var i = 0; i < arr.length; i++) {
            var idx = tempArr.indexOf(arr[i]);
            if (idx < 0) tempArr.push(arr[i]);
        }
        return tempArr;

        // innner function
        function getPrototype(ctor) {
            if (ctor.hasOwnProperty('super')) return ctor.super;
            return  Object.getPrototypeOf(ctor) || ctor.__proto__;
        }
    }

    /**
     * 생성자의 상위 또는 _UNION 에 지정된 생성자의 타입과 같은지 검사합니다.
     * @memberof _L.Common.Util
     * @param {function} ctor 생성자
     * @param {function | string} target 검사 대상
     * @returns {boolean}
     */
    var isType = function(ctor, target) {
        if (typeof ctor !== 'function') return false;
        var arr = getTypes(ctor);
        
        for (var i = 0; i < arr.length; i++) {
            if (typeof target === 'string') {
                if (target === arr[i].name) return true;    // Line:
            } else if (typeof target === 'function') {
                if (target === arr[i]) return true;
            }
        }
        return false;
    }

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.inherits = inherits;
        exports.isType = isType;
        exports.getTypes = getTypes;
        exports.getArrayDepth = getArrayDepth;
        exports.createGuid = createGuid;
        exports.implements = implement;
        exports.getAllProperties = getAllProperties;
        exports.allowType = allowType;
        exports.typeObject = typeObject;
        exports.isMatchType = isMatchType;
        exports.matchType = matchType;
        exports.deepCopy = deepCopy;
        exports.deepEqual = deepEqual;
    } else {
        var ns = {
            inherits: inherits,
            isType: isType,
            getTypes: getTypes,
            getArrayDepth: getArrayDepth,
            createGuid: createGuid,
            implements: implement,
            getAllProperties: getAllProperties,
            allowType: allowType,
            typeObject: typeObject,
            isMatchType: isMatchType,
            matchType: matchType,
            deepCopy: deepCopy,
            deepEqual: deepEqual,
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;
    }

}(typeof window !== 'undefined' ? window : global));