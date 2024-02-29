/**
 * namespace _L.Common.Util
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var getAllProperties;
    var extendType;
    var matchType;
    var allowType;
    var isMatchType;
    var isAllowType;
    var matchType;
    var deepEqual;
    var isProtoChain;
    var getTypes;
    var typeObject;
    var typeOf;


    //==============================================================
    // 1. 의존 모듈 선언
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};
    _global._L.Common.Util          = _global._L.Common.Util || {};

    //==============================================================
    // 2. import module
    if (isNode) {
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
        getAllProperties            = require('./util-type').getAllProperties;
        extendType                  = require('./util-type').extendType;
        allowType                   = require('./util-type').allowType;
        isMatchType                 = require('./util-type').isMatchType;
        isAllowType                 = require('./util-type').isAllowType;
        matchType                   = require('./util-type').matchType;
        deepEqual                   = require('./util-type').deepEqual;
        isProtoChain                = require('./util-type').isProtoChain;
        getTypes                    = require('./util-type').getTypes;
        typeObject                  = require('./util-type').typeObject;
        typeOf                      = require('./util-type').typeOf;
    } else {    
        Message                     = _global._L.Common.Message;
        ExtendError                 = _global._L.Common.ExtendError;
        getAllProperties            = _global._L.Util.getAllProperties
        extendType                  = _global._L.Util.extendType
        allowType                   = _global._L.Util.allowType
        isMatchType                 = _global._L.Util.isMatchType
        isAllowType                 = _global._L.Util.isAllowType
        matchType                   = _global._L.Util.matchType
        deepEqual                   = _global._L.Util.deepEqual
        isProtoChain                = _global._L.Util.isProtoChain
        getTypes                    = _global._L.Util.getTypes
        typeObject                  = _global._L.Util.typeObject
        typeOf                      = _global._L.Util.typeOf
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof getAllProperties === 'undefined') throw new Error(Message.get('ES012', ['getAllProperties', 'util-type']));
    if (typeof extendType === 'undefined') throw new Error(Message.get('ES012', ['extendType', 'util-type']));
    if (typeof allowType === 'undefined')throw new Error(Message.get('ES012', ['allowType', 'util-type']));
    if (typeof isMatchType === 'undefined') throw new Error(Message.get('ES012', ['isMatchType', 'util-type']));
    if (typeof isAllowType === 'undefined') throw new Error(Message.get('ES012', ['isAllowType', 'util-type']));
    if (typeof matchType === 'undefined') throw new Error(Message.get('ES012', ['matchType', 'util-type']));
    if (typeof deepEqual === 'undefined') throw new Error(Message.get('ES012', ['deepEqual', 'util-type']));
    if (typeof isProtoChain === 'undefined') throw new Error(Message.get('ES012', ['isProtoChain', 'util-type']));
    if (typeof getTypes === 'undefined') throw new Error(Message.get('ES012', ['getTypes', 'util-type']));
    if (typeof typeObject === 'undefined') throw new Error(Message.get('ES012', ['typeObject', 'util-type']));
    if (typeof typeOf === 'undefined') throw new Error(Message.get('ES012', ['typeOf', 'util-type']));
    
    //==============================================================
    // 4. module implementation   
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활


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
                if (Object.prototype.hasOwnProperty.call(object, key)) {
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

        if (typeof p_ctor !== 'function') throw new ExtendError(/ES024/, null, ['p_ctor', 'function']);
        if (!_isObject(p_obj)) throw new ExtendError(/ES024/, null, ['p_obj', 'obj']);

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
            } else throw new ExtendError(/ES021/, null, ['arguments', 'function']);
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
                // POINT: 타입과 인터페이스 분리
                // if (typeof p_obj._interface[i]['_KIND'] === 'string' && p_obj._interface[i]['_KIND'] === 'interface') {
                if (p_ctor['_KIND'] === 'interface') {
                    allowType(p_obj._interface[i], p_obj, 1);
                } else matchType(p_obj._interface[i], p_obj, 1);
            }
        } catch (error) { 
            throw new ExtendError(/ES017/, error, [typeName(p_obj), typeName(p_obj._interface[i]), '']);
            // Message.error('ES017', [typeName(p_obj), typeName(p_obj._interface[i]), error.message]);
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
            } else throw new ExtendError(/ES021/, null, ['isImplementOf()', 'function, string']);
            return false;
        }
        function typeName(obj) {
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
    // 5. module export
    if (isNode) {     
        exports.inherits = inherits;
        exports.isProtoChain = isProtoChain;
        exports.getTypes = getTypes;
        exports.getArrayDepth = getArrayDepth;
        exports.createGuid = createGuid;
        exports.implements = implement;
        exports.getAllProperties = getAllProperties;
        exports.allowType = allowType;
        exports.extendType = extendType;
        exports.isMatchType = isMatchType;
        exports.isAllowType = isAllowType;
        exports.matchType = matchType;
        exports.deepCopy = deepCopy;
        exports.deepEqual = deepEqual;
        exports.isProtoChain = isProtoChain;
        exports.typeObject = typeObject;
        exports.typeOf = typeOf;

    } else {
        var ns = {
            inherits: inherits,
            isProtoChain: isProtoChain,
            getTypes: getTypes,
            getArrayDepth: getArrayDepth,
            createGuid: createGuid,
            implements: implement,
            getAllProperties: getAllProperties,
            allowType: allowType,
            extendType: extendType,
            isMatchType: isMatchType,
            isAllowType: isAllowType,
            matchType: matchType,
            deepCopy: deepCopy,
            deepEqual: deepEqual,
            isProtoChain: isProtoChain,
            typeObject: typeObject,
            typeOf: typeOf,
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;
    }

}(typeof window !== 'undefined' ? window : global));