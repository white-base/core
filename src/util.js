/**
 * namespace _L.Common.Util
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var getAllProperties;
    var checkTypeMessage;
    var getTypeMap;
    var checkType;
    var checkUnionType;
    var validType;
    var validUnionType;

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
        checkTypeMessage            = require('./util-type').checkTypeMessage;
        getTypeMap                  = require('./util-type').getTypeMap;
        checkType                   = require('./util-type').checkType;
        checkUnionType              = require('./util-type').checkUnionType;
        validType                   = require('./util-type').validType;
        validUnionType              = require('./util-type').validUnionType;
    } else {    
        Message                     = _global._L.Message;
        getAllProperties            = _global._L.Util.getAllProperties
        checkTypeMessage            = _global._L.Util.checkTypeMessage
        getTypeMap                  = _global._L.Util.getTypeMap
        checkType                   = _global._L.Util.checkType
        checkUnionType              = _global._L.Util.checkUnionType
        validType                   = _global._L.Util.validType
        validUnionType              = _global._L.Util.validUnionType
    }

    //==============================================================
    // 3. module dependency check
    if (typeof getAllProperties === 'undefined') Message.error('ES012', ['getAllProperties', 'util-type']);
    if (typeof checkTypeMessage === 'undefined') Message.error('ES012', ['checkTypeMessage', 'util-type']);
    if (typeof getTypeMap === 'undefined') Message.error('ES012', ['getTypeMap', 'util-type']);
    if (typeof checkType === 'undefined') Message.error('ES012', ['checkType', 'util-type']);
    if (typeof checkUnionType === 'undefined') Message.error('ES012', ['checkUnionType', 'util-type']);
    if (typeof validType === 'undefined') Message.error('ES012', ['validType', 'util-type']);
    if (typeof validUnionType === 'undefined') Message.error('ES012', ['validUnionType', 'util-type']);
    //==============================================================
    // 4. module implementation   

    
    // polyfill
    if (!Array.isArray) {
        Array.isArray = function(p_obj) {
          return Object.prototype.toString.call(p_obj) === '[object Array]';
        };
    }
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
            var dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
            var dontEnumsLength = dontEnums.length;
            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
                var result = [];
                for (var prop in obj) if (hasOwnProperty.call(obj, prop)) result.push(prop);
                if (hasDontEnumBug) {
                  for (var i=0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
                  }
                }
                return result;
            }
        })()
    };

    /**
     * inherits(대상, 부모) : 상속
     * @function
     * @memberof _L.Common.Util
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
     * 배열 깊이 얻기
     * @param {*} p_elem 
     * @param {*} p_depts 
     * @memberof _L.Common.Util
     */
    var getArrayDepth = function (p_elem, p_depts) {
        var MAX     = 10;
        var level   = 0;
        
        p_depts = p_depts || 0;

        if (p_elem instanceof Array && MAX > p_depts) {
            level++;
            p_depts++;
            level = level + this.getArrayDepth(p_elem[0], p_depts);  // 재귀호출을 통해 깊이 얻기
        }
        return level;
    };
    
    /**
     * createGuid Guid 생성
     * @memberof _L.Common.Util
     */
    var createGuid = function() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+'000000000').substr(2,8);  
            return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 구현 제약 조건 검사
     * @param {object} p_obj 대상 객체
     * @param {function} args 대상 함수
     */
    var implement = function(p_obj, args) {
        // var obj;    
        var _interface = [];
        var msg = '';

        if (typeof p_obj !== 'object') Message.error('ES024', ['this(target)', 'obj']);
        if (typeof p_obj._interface === 'undefined') {
            Object.defineProperty(p_obj, '_interface', {
                get: function() { 
                    return _interface;
                },
                configurable: false,
                enumerable: false,
            });
        }

        for(var i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] === 'function') {
                // 중복 제거
                if (p_obj._interface.indexOf(arguments[i]) < 0) {
                    p_obj._interface.push(arguments[i]);
                    // object._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                }
            } else Message.error('ES021', ['arguments', 'function']);
            // 비교 원본 인터페이스 임시 객체 생성    
            // obj = new arguments[i];
    
            // 객체 타입을 비교 (값은 비교 안함, 타입만 비교함)
            // equalType(obj, object);
            
            try {
                validType(p_obj, arguments[i]);
            } catch (error) {
                Message.error('ES017', [typeName(p_obj), typeName(arguments[i]), error.message]);
            }
            // msg = checkTypeMessage(arguments[i], object);
            // if (msg.length > 0) Message.error('ES017', [typeName(object), typeName(arguments[i]), msg]);

        }
        // var types = Array.prototype.slice.call(arguments, 1);

        // obj.prototype.isImplementOf = isImplementOf;
        if (typeof p_obj.isImplementOf === 'undefined') {
            Object.defineProperty(p_obj, 'isImplementOf',
            {
                value: isImplementOf,
                enumerable: false
            });
        }

        // inner function
        function isImplementOf(target) {
            // if (typeof target !== 'function') Message.error('ES024', ['target', 'function']);
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
            if (typeof obj === 'object' && obj !== null) {
                var proto = obj.__proto__ || Object.getPrototypeOf(obj); 
                return  proto.constructor.name;
            }
            return 'unknown';
        }
    }

    var deepCopy = function(object) {
        if (object === null || typeof object !== "object") {
          return object;
        }
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
        // 최신버전 of
        // for (var key of Object.keys(object)) {   
        //   copy[key] = deepCopy(object[key]);
        // }
        return copy;
    }

    var deepEqual = function(obj1, obj2) {

        if (Array.isArray(obj1)) {
            if (!Array.isArray(obj1)) return false;
            if (obj1.length !== obj2.length) return false;
            for (var i = 0; i < obj1.length; i++) {
                var val1 = obj1[i];
                var val2 = obj2[i];
                var areObjects = isObject(val1) && isObject(val2);
                if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2 ) {
                    return false;
                }
            }
        } else {
            if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
            for (var key in obj1) {
                if (obj1.hasOwnProperty(key)) {
                    var val1 = obj1[key];
                    var val2 = obj2[key];
                    var areObjects = isObject(val1) && isObject(val2);
                    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2 ) {
                        return false;
                    }
                }
            }
        }
        return true;
        
        // inner function
        function isObject(obj) {
            return obj != null && typeof obj === 'object';
        }
    }
    // 최신 문법 of
    //   var deepEqual = function(object1, object2) {
    //     var keys1 = Object.keys(object1);
    //     var keys2 = Object.keys(object2);
    //     if (keys1.length !== keys2.length) return false;
    //     for (const key of keys1) {
    //       var val1 = object1[key];
    //       var val2 = object2[key];
    //       var areObjects = isObject(val1) && isObject(val2);
    //       if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2 ) {
    //         return false;
    //       }
    //     }
    //     return true;
    //     function isObject(obj) {
    //         return obj != null && typeof obj === 'object';
    //     }
    //   }

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.inherits = inherits;
        exports.getArrayDepth = getArrayDepth;
        exports.createGuid = createGuid;
        exports.implements = implement;
        exports.getAllProperties = getAllProperties;
        exports.checkTypeMessage = checkTypeMessage;
        exports.getTypeMap = getTypeMap;
        exports.checkType = checkType;
        exports.checkUnionType = checkUnionType;
        exports.validType = validType;
        exports.validUnionType = validUnionType;
        exports.deepCopy = deepCopy;
        exports.deepEqual = deepEqual;
        // module.exports.validSelector = validSelector;   // node 에서는 테스트 불가능!
        // module.exports.equalType = equalType;
    } else {
        var ns = {
            inherits: inherits,
            getArrayDepth: getArrayDepth,
            createGuid: createGuid,
            implements: implement,
            getAllProperties: getAllProperties,
            checkTypeMessage: checkTypeMessage,
            getTypeMap: getTypeMap,
            checkType: checkType,
            checkUnionType: checkUnionType,
            validType: validType,
            validUnionType: validUnionType,
            deepCopy: deepCopy,
            deepEqual: deepEqual,
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;

        // _global._L.Util.inherits = inherits;
        // _global._L.Util.getArrayDepth = getArrayDepth;
        // _global._L.Util.createGuid = createGuid;
        // _global._L.Util.implements = implement;
        // _global._L.Util.getAllProperties = getAllProperties;
        // _global._L.Util.checkType = checkType;
        // _global._L.Util.checkUnionType = checkUnionType;
        // _global._L.Util.validType = validType;
        // _global._L.Util.validUnionType = validUnionType;

        // _global._L.Common.Util.inherits = inherits;
        // _global._L.Common.Util.getArrayDepth = getArrayDepth;
        // _global._L.Common.Util.createGuid = createGuid;
        // _global._L.Common.Util.implements = implement;
        // _global._L.Common.Util.getAllProperties = getAllProperties;
        // _global._L.Common.Util.checkType = checkType;
        // _global._L.Common.Util.checkUnionType = checkUnionType;
        // _global._L.Common.Util.validType = validType;
        // _global._L.Common.Util.validUnionType = validUnionType;
        // _global._L.Common.Util.equalType = equalType;
        // _global._L.Common.Util.validSelector = validSelector;
    }

}(typeof window !== 'undefined' ? window : global));