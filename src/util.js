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
    // var checkUnionType;
    var validType;
    // var validUnionType;

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
        // checkUnionType              = require('./util-type').checkUnionType;
        validType                   = require('./util-type').validType;
        // validUnionType              = require('./util-type').validUnionType;
    } else {    
        Message                     = _global._L.Message;
        getAllProperties            = _global._L.Util.getAllProperties
        checkTypeMessage            = _global._L.Util.checkTypeMessage
        getTypeMap                  = _global._L.Util.getTypeMap
        checkType                   = _global._L.Util.checkType
        // checkUnionType              = _global._L.Util.checkUnionType
        validType                   = _global._L.Util.validType
        // validUnionType              = _global._L.Util.validUnionType
    }

    //==============================================================
    // 3. module dependency check
    if (typeof getAllProperties === 'undefined') Message.error('ES012', ['getAllProperties', 'util-type']);
    if (typeof checkTypeMessage === 'undefined') Message.error('ES012', ['checkTypeMessage', 'util-type']);
    if (typeof getTypeMap === 'undefined') Message.error('ES012', ['getTypeMap', 'util-type']);
    if (typeof checkType === 'undefined') Message.error('ES012', ['checkType', 'util-type']);
    // if (typeof checkUnionType === 'undefined') Message.error('ES012', ['checkUnionType', 'util-type']);
    if (typeof validType === 'undefined') Message.error('ES012', ['validType', 'util-type']);
    // if (typeof validUnionType === 'undefined') Message.error('ES012', ['validUnionType', 'util-type']);
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
     * 배열 깊이를 가져옵니다.
     * @param {*} p_elem 
     * @param {*} p_depts 
     * @memberof _L.Common.Util
     */
    var getArrayDepth  = function(p_elem, p_depts) {
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
     * 고유한 식별자(guid)을 생성합니다.
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
     * 대상 객체에 인터페이스를 정의하고, 인스턴스를 검사합니다.  
     * @name implements
     * @function
     * @memberof _L.Common.Util
     * @param {object} p_obj 대상 객체
     * @param {function} args 대상 인터페이스들
     */
    var implement = function(p_obj, args) {
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
                if (p_obj._interface.indexOf(arguments[i]) < 0) { // 중복 검사 
                    p_obj._interface.push(arguments[i]);
                }
            } else Message.error('ES021', ['arguments', 'function']);

            try {
                validType(p_obj, arguments[i]);
            } catch (error) {
                Message.error('ES017', [typeName(p_obj), typeName(arguments[i]), error.message]);
            }
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
    }

    /**
     * 지정한 객체를 깊은 복사합니다.
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
     * 지정한 객체들이 같은지 깊은 비교를 합니다.
     * @param {object} obj1 
     * @param {object} obj2 
     * @memberof _L.Common.Util
     * @returns {object}
     */
    var deepEqual = function(obj1, obj2) {

        if (Array.isArray(obj1)) {
            if (obj1.length !== obj2.length) return false;
            for (var i = 0; i < obj1.length; i++) {
                var val1 = obj1[i];
                var val2 = obj2[i];
                var areObjects = _isObject(val1) && _isObject(val2);
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
                    var areObjects = _isObject(val1) && _isObject(val2);
                    if (areObjects && !deepEqual(val1, val2) || !areObjects && val1 !== val2 ) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.inherits = inherits;
        exports.getArrayDepth = getArrayDepth;
        exports.createGuid = createGuid;
        exports.implements = implement;
        exports.getAllProperties = getAllProperties;
        // exports.checkTypeMessage = checkTypeMessage;
        exports.getTypeMap = getTypeMap;
        exports.checkType = checkType;
        // exports.checkUnionType = checkUnionType;
        exports.validType = validType;
        // exports.validUnionType = validUnionType;
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
            // checkTypeMessage: checkTypeMessage,
            getTypeMap: getTypeMap,
            checkType: checkType,
            // checkUnionType: checkUnionType,
            validType: validType,
            // validUnionType: validUnionType,
            deepCopy: deepCopy,
            deepEqual: deepEqual,
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;
    }

}(typeof window !== 'undefined' ? window : global));