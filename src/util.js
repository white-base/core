/**
 * namespace _L.Common.Util
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    global._L               = global._L || {};
    global._L.Common        = global._L.Common || {};
    global._L.Common.Util   = global._L.Common.Util || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현    

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
        } else {    // COVER:
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
    var getArrayLevel = function (p_elem, p_depts) {    // COVER:
        var MAX     = 10;
        var level   = 0;
        
        p_depts = p_depts || 0;

        if (p_elem instanceof Array && MAX > p_depts) {
            level++;
            p_depts++;
            level = level + this.getArrayLevel(p_elem[0], p_depts);  // 재귀호출을 통해 깊이 얻기
        }
        return level;
    };
    
    /**
     * createGUID GUID 생성
     * @memberof _L.Common.Util
     */
    var createGUID = function() {
        function _p8(s) {  
            var p = (Math.random().toString(16)+'000000000').substr(2,8);  
            return s ? '-' + p.substr(0,4) + '-' + p.substr(4,4) : p ;  
        }
        return _p8() + _p8(true) + _p8(true) + _p8();
    };

    /**
     * 셀렉터의 유효성 검사 : 대상을 모두 검사하여 결과를 리턴한다.
     * 주의!! DOM(web) 에서만 작동한다.
     * @param {String | Object | Array<Object>} p_obj 
     * @returns {String} 없는 셀렉터, 통화하면 null 리턴
     * @memberof _L.Common.Util
     */
    // var validSelector = function(p_obj, p_isJQuery) {   // COVER: => bind model 로 이동함
    //     var selectors = [];

    //     // 입력형식에 따른 배열에 삽입
    //     if (typeof p_obj === 'string') selectors.push(p_obj);
    //     else if (typeof p_obj === 'array') {
    //         selectors = p_obj;
    //     } else if (typeof p_obj === 'object') {
    //         for(var prop in p_obj) {
    //             if (p_obj.hasOwnProperty(prop)) {
    //                 if (Array.isArray(p_obj[prop])) {
    //                     selectors = selectors.concat(p_obj[prop]);
    //                 } else { 
    //                     selectors.push(p_obj[prop]);
    //                 }
    //             }
    //         }
    //     }

    //     if (typeof document === 'object' && typeof document.querySelector === 'function') {     
    //         // 유효성 검사
    //         for(var i = 0; selectors.length > i; i++) {
    //             if (typeof selectors[i] !== 'string') throw new Error('Only [selectors] type "string" can be added');

    //             if (p_isJQuery === true && jQuery(selectors[i]).length === 0) {
    //                 return selectors[i];
    //             } else if (document.querySelector(selectors[i]) === null) {
    //                 return selectors[i];
    //             }
    //         }
    //     } else {
    //         throw new Error('[document.querySelector] module load fail...');
    //     }
    //     return null;
    // };

    /**
     * 전체 프로퍼티 조회
     * @param {object} obj Object를 제외한 프로터피 리턴
     * @param {boolean?} isObject Object를 포함 여부
     * @returns {array}  
     */
    var getAllProperties = function(obj, isObject) {
        var allProps = [], curr = obj;
        var is = isObject || false;

        do{
            var props = Object.getOwnPropertyNames(curr);
            props.forEach(function(prop) {
                if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop)))
                    allProps.push(prop);
            })
        }while(curr = Object.getPrototypeOf(curr))
        return allProps;
    }

    /***
         * 객체의 타입 비교
         * ori 의 속성 타입별 비교 기준 (Interface 역활)
         *  - function() {} : function 타입 또는 대상의 인스턴스 (파라메티 검사 안함)
         *  - []            : array 타입
         *  - ''            : string 타입
         *  - 0, 1, 2..     : number 타입
         *  - true, false   : boolean 타입
         *  - null          : any 타입
         *  - {}            : 재귀호출 검사!
         * @param ori 원본 객체 (인터페이스 : 타입선언)
         * @param tar 비교 객체
         */
    var equalType = function(ori, tar, oriName) {
        var typeName = '';
        var oriName = oriName ? oriName : 'this';
        var list = getAllProperties(ori);

        for(var i = 0; i < list.length; i++) {
            var key = list[i];
            // 통과 검사
            if (false
                || '_interface' === key || 'isImplementOf' === key  // 내부 예약어
                || (ori[key] === null && typeof tar[key] !== 'undefined')
                || (typeof ori[key] === 'function' && typeof tar[key] === 'function')
                || (Array.isArray(ori[key]) && Array.isArray(tar[key]))
                || (typeof ori[key] === 'function' && typeof tar[key] === 'object' && tar[key] instanceof ori[key])) {
                continue;
            }
            // 타입 검사 (예외조건)
            // if (ori[key] !== null && tar[key] === null) {
            //     throw new Error(' 대상 null ' + oriName + '.' + key);   // COVER:
            // } 
            if (!(key in tar)) {
                throw new Error(' 대상 없음 ' + oriName + '.' + key + ' : ' + typeof ori[key]);
            } else  if (Array.isArray(ori[key]) && !Array.isArray(tar[key])){
                throw new Error(' 타입 다름 ' + oriName + '.' + key + ' : array ');
            } else if (typeof ori[key] === 'function' && typeof tar[key] === 'object' && !(tar[key] instanceof ori[key])) {
                throw new Error( ori[key].name +' 객체 아님 '+ oriName +'.'+ key +' : class ');
            } else if (ori[key] !== null && !(typeof ori[key] === typeof tar[key])) {  /** 원본 null 비교 안함 */
                throw new Error(' 타입 다름 ' + oriName + '.' + key + ' : ' + typeof ori[key] + ' ');
            }
            // 재귀호출
            if (typeof ori[key] === 'object' && !Array.isArray(ori[key]) && ori[key] !== null) {
                if (equalType(ori[key], tar[key], oriName +'.'+ key) === false) return false;
            }
        }
    }

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
            return false; // COVER:
        }

        if (typeof object !== 'object') throw new Error(' object 타입이 아닙니다. ');

        Object.defineProperty(object, '_interface', {
            enumerable: false,
            configurable: true,
            get: function() { 
                return _interface;
            }
        });
    
        for(var i = 1; i < arguments.length; i++) {
            if (typeof arguments[i] === 'function') {
                // 중복 제거
                if (object._interface.indexOf(arguments[i]) < 0) {
                    object._interface.push(arguments[i]);
                    object._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                }
            } else throw new Error('함수타입만 가능합니다.');   // COVER:
            // 비교 원본 인터페이스 임시 객체 생성    
            obj = new arguments[i];
    
            // 객체 타입을 비교 (값은 비교 안함, 타입만 비교함)
            equalType(obj, object);
        }
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
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.inherits = inherits;
        module.exports.getArrayLevel = getArrayLevel;
        module.exports.createGUID = createGUID;
        // module.exports.validSelector = validSelector;   // node 에서는 테스트 불가능!
        module.exports.getAllProperties = getAllProperties;
        module.exports.implements = implement;
    } else {    // COVER:
        global._L.Common.Util.inherits = inherits;
        global._L.Common.Util.getArrayLevel = getArrayLevel;
        global._L.Common.Util.createGUID = createGUID;
        // global._L.Common.Util.validSelector = validSelector;
        global._L.Common.Util.getAllProperties = getAllProperties;
        global._L.Common.Util.implements = implement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));