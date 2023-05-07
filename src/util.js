/**
 * namespace _L.Common.Util
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var getAllProperties;
    var checkType;
    var checkUnionType;
    var validType;
    var validUnionType;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Common.Util   = _global._L.Common.Util || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {
        getAllProperties    = require('./util-type').getAllProperties;
        checkType           = require('./util-type').checkType;
        checkUnionType      = require('./util-type').checkUnionType;
        validType           = require('./util-type').validType;
        validUnionType      = require('./util-type').validUnionType;
    } else {    // COVER:
        getAllProperties    = _global._L.Common.Util.getAllProperties
        checkType           = _global._L.Common.Util.checkType
        checkUnionType      = _global._L.Common.Util.checkUnionType
        validType           = _global._L.Common.Util.validType
        validUnionType      = _global._L.Common.Util.validUnionType
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof getAllProperties === 'undefined') throw new Error('[getAllProperties] module load fail...');
    if (typeof checkType === 'undefined') throw new Error('[checkType] module load fail...');
    if (typeof checkUnionType === 'undefined') throw new Error('[checkUnionType] module load fail...');
    if (typeof validType === 'undefined') throw new Error('[validType] module load fail...');
    if (typeof validUnionType === 'undefined') throw new Error('[validUnionType] module load fail...');

    //==============================================================
    // 4. 모듈 구현    

    // polyfill
    if (!Array.isArray) {
        Array.isArray = function(arg) {
          return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

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
                        	enumerable: false,
                        	writable: true,
                        	configurable: true
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
     * @param {object} object 대상 객체
     * @param {function} args 대상 함수
     */
    var implement = function(object, args) {
        var typeName;
        var obj;    
        var _interface = [];

        function isImplementOf(target) {
            if (typeof target !== 'function') throw new Error(' 함수 타입이 아닙니다. ');
            for (var i = 0; i < this._interface.length; i++) {
                if (this._interface[i] === target) return true;  
            }
            return false;
        }

        if (typeof object !== 'object') throw new Error(' object 타입이 아닙니다. ');

        if (typeof object._interface === 'undefined') {
            Object.defineProperty(object, '_interface', {
                enumerable: false,
                configurable: true,
                get: function() { 
                    return _interface;
                }
            });
        }

        for(var i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] === 'function') {
                // 중복 제거
                if (object._interface.indexOf(arguments[i]) < 0) {
                    object._interface.push(arguments[i]);
                    // object._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                }
            } else throw new Error('함수타입만 가능합니다.');
            // 비교 원본 인터페이스 임시 객체 생성    
            // obj = new arguments[i];
    
            // 객체 타입을 비교 (값은 비교 안함, 타입만 비교함)
            // equalType(obj, object);
            validType(object, arguments[i]);
        }
        // var types = Array.prototype.slice.call(arguments, 1);

        // obj.prototype.isImplementOf = isImplementOf;
        if (typeof object.isImplementOf === 'undefined') {
            Object.defineProperty(object, 'isImplementOf',
            {
                value: isImplementOf,
                enumerable: false
            });
        }
    }

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports.inherits = inherits;
        module.exports.getArrayDepth = getArrayDepth;
        module.exports.createGuid = createGuid;
        module.exports.implements = implement;
        module.exports.getAllProperties = getAllProperties;
        module.exports.checkType = checkType;
        module.exports.checkUnionType = checkUnionType;
        module.exports.validType = validType;
        module.exports.validUnionType = validUnionType;
        // module.exports.validSelector = validSelector;   // node 에서는 테스트 불가능!
        // module.exports.equalType = equalType;
    } else {    // COVER:
        _global._L.Common.Util.inherits = inherits;
        _global._L.Common.Util.getArrayDepth = getArrayDepth;
        _global._L.Common.Util.createGuid = createGuid;
        _global._L.Common.Util.implements = implement;
        _global._L.Common.Util.getAllProperties = getAllProperties;
        _global._L.Common.Util.checkType = checkType;
        _global._L.Common.Util.checkUnionType = checkUnionType;
        _global._L.Common.Util.validType = validType;
        _global._L.Common.Util.validUnionType = validUnionType;
        // _global._L.Common.Util.equalType = equalType;
        // _global._L.Common.Util.validSelector = validSelector;
    }

}(typeof window !== 'undefined' ? window : global));