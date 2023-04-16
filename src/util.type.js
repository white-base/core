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
     * 전체 프로퍼티 조회
     * @param {object} obj Object를 제외한 프로터피 리턴
     * @param {boolean?} isObject Object를 포함 여부
     * @returns {array}  
     */
    var getAllProperties = function(obj, isObject) {
        var allProps = [], curr = obj;
        var is = isObject || false;

        do {
            var props = Object.getOwnPropertyNames(curr);
            props.forEach(function(prop) {
                if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop)))
                    allProps.push(prop);
            });
        } while (curr = Object.getPrototypeOf(curr))
        return allProps;
    }

    var validType = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        var typeDef = {type: type, name: '', default: null};
        
        // [] 여부시 OR 조건 재귀검사
        if (Array.isArray(type)) {
            for(var i = 0; i < type.length; i++) if (validType(type[i], target) === true) return true;
            return false;
        }
        // 타입 설정
        if (typeof type !== 'function' && typeof type !== 'object' && typeof type !== 'undefined') {
            typeDef.name = typeof type;
            typeDef.default = type;
            if (typeof target === 'undefined') target = type;   // 기본값 설정 REVIEW: => 필요성 여부
        } else if (typeof type === 'function' && (type === Number || type === String || type === Boolean || type === Object)) 
            typeDef.name = typeof type();
        else if (type === null) typeDef.name = 'null';
        else if (type === Array) typeDef.name = 'array';
        else if (type === Function) typeDef.name = 'function';
        else if (typeof type === 'function') typeDef.name = 'class';
        else if (typeof type === 'object') typeDef.name = 'object';
        else throw new Error('타입이 존재하지 않습니다.');
    
        // 비교
        if (typeDef.name === 'null' && typeof target !== 'undefined') {
            return true; 
        } else if (typeDef.name === 'string' && typeof target === 'string') {
            return true;
        } else if (typeDef.name === 'number' && typeof target === 'number') {
            return true;
        } else if (typeDef.name === 'boolean' && typeof target === 'boolean') {
            return true;
        } else if (typeDef.name === 'function' && typeof target === 'function') {
            return true;
        } else if (typeDef.name === 'class') {
            if (target instanceof typeDef.type) return true;
            else if (typeof target === 'object') return validType(new typeDef.type, target, parentName);
            else return false;
        } else if (typeDef.name === 'object') {
            var list = getAllProperties(typeDef.type);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var keyValue = typeDef.type[key];
                // 통과 조건 (예약어, null)
                if ('_interface' === key || 'isImplementOf' === key
                    || (type[key] === null && typeof target[key] !== 'undefined')) continue;
                // 기본값 설정
                if (typeof keyValue !== 'function' && typeof keyValue !== 'object' 
                    && typeof keyValue !== 'undefined' && typeof target[key] === 'undefined') target[key] = keyValue;

                if (!(key in target)) {
                    console.warn(' 대상 없음 ' + parentName + '.' + key + ' : ' + typeof type[key]); 
                    return false;
                } else {
                    if (validType(type[key], target[key], parentName +'.'+ key) === false) return false;
                }
            }
            return true;
        }
    };

    // OR 조건
    var checkType = function(target, types) {
        // try {
            var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
            for(var i = 0; i < arrType.length; i++) {
                if(validType(arrType[i], target) === true) return true;
            }
        // } catch (e) {
        //     console.error('CheckTypeAll() 에서 오류가 발생했습니다. ');
        //     // console.error(e);
        //     return false;
        // }
        return false;
    };

    // AND 조건
    var checkTypeAll = function(target, types) {
        // try {
            var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
            for(var i = 0; i < arrType.length; i++) {
                if (validType(arrType[i], target) === false) return false;
            }
        // } catch (e) {
        //     console.error('CheckTypeAll() 에서 오류가 발생했습니다.');
        //     console.error(e);
        //     return false;
        // }
        return true;
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.getAllProperties = getAllProperties;
        module.exports.checkType = checkType;
        module.exports.checkTypeAll = checkTypeAll;
    } else {    // COVER:
        global._L.Common.Util.getAllProperties = getAllProperties;
        global._L.Common.Util.checkType = checkType;
        global._L.Common.Util.checkTypeAll = checkTypeAll;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));