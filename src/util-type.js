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

    /**
     * 
     * @param {*} type 
     * @param {*} target 
     * @param {*} parentName 
     * @returns {true | }
     */
    var __validType = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        var typeDef = {type: type, name: '', default: null};
        
        // [] 여부시 OR 조건 재귀검사
        if (Array.isArray(type)) {
            for(var i = 0; i < type.length; i++) if (validType(type[i], target) === true) return true;
            return false;
        }
        
        // 타입 설정 TODO: 함수로 도출 예정
        if (typeof type !== 'function' && typeof type !== 'object' && typeof type !== 'undefined') {
            typeDef.name = typeof type;
            typeDef.default = type;
            // if (typeof target === 'undefined') target = type;   // 기본값 설정 REVIEW: => 필요성 여부
        } else if (typeof type === 'function' && (type === Number || type === String || type === Boolean || type === Object)) 
            typeDef.name = typeof type();
        else if (type === null) typeDef.name = 'null';
        else if (type === Array) typeDef.name = 'array';
        else if (type === Function) typeDef.name = 'function';
        else if (typeof type === 'function') typeDef.name = 'class';
        else if (typeof type === 'object') typeDef.name = 'object';
        else throw new Error('타입이 존재하지 않습니다.');
    
        // 비교
        if ((typeDef.name === 'null' && typeof target !== 'undefined')
            || (typeDef.name !== 'class' && typeDef.name !== 'object' && typeDef.name === typeof target)) {
            return true;
        }
        // } else if (typeDef.name === 'string' && typeof target === 'string') {
        //     return true;
        // } else if (typeDef.name === 'number' && typeof target === 'number') {
        //     return true;
        // } else if (typeDef.name === 'boolean' && typeof target === 'boolean') {
        //     return true;
        // } else if (typeDef.name === 'function' && typeof target === 'function') {
        //     return true;
        if (typeDef.name === 'class') {
            if (target instanceof typeDef.type) return true;
            else if (typeof target === 'object') return validType(new typeDef.type, target, parentName);
            else return false;
        }
        if (typeDef.name === 'object') {
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

    // valid type check message
    // _checkTypeMesage() :

    var _getTypeMap = function(type) {
        var obj =  {name: '', default: null};

        if (type === null) {
            obj.name = 'any';
            return obj;
        }
        if (type === Number) {
            obj.name = 'number';
            return obj;
        }
        if (type === String) {
            obj.name = 'string';
            return obj;
        }
        if (type === Boolean) {
            obj.name = 'boolean';
            return obj;
        }
        if (type === Array) {
            obj.name = 'array';
            return obj;
        }
        if (type === Function) {
            obj.name = 'function';
            return obj;
        }
        if (type === Object) {
            obj.name = 'object';
            return obj;
        }
        if (typeof type === 'number') {
            obj.name = 'number';
            obj.default = type;
            return obj;
        }
        if (typeof type === 'string') {
            obj.name = 'string';
            obj.default = type;
            return obj;
        }
        if (typeof type === 'boolean') {
            obj.name = 'boolean';
            obj.default = type;
            return obj;
        }
        if (typeof type === 'function') {
            obj.name = 'class';
            return obj;
        }
        if (typeof type === 'object') {
            obj.name = 'object';
            return obj;
        }
        throw new Error('타입이 존재하지 않습니다.');
    }

    var _checkTypeMessage = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        var typeDef = {type: type, name: '', default: null};
        var returnMsg = '';
        var defType;

        if (Array.isArray(type)) {
            for(var i = 0; i < type.length; i++) {
                returnMsg = _checkTypeMessage(type[i], target);
                if (returnMsg.length > 0) return returnMsg;
            }
        }
        defType = _getTypeMap(type);

        if (defType.name === 'any' && typeof target !== 'undefined') return '';
        if (defType.name !== 'object' && defType.name === typeof target) return '';
        if (defType.name === 'class' && target instanceof type) return '';
        if (defType.default !== null && typeof target === 'undefined') {
            target = defType.default;
            return '';
        }
        if (defType.name === 'class' && typeof target === 'object') return _checkTypeMessage(new type, target, parentName);
        if (defType.name === 'object') {
            var list = getAllProperties(typeDef.type);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var objType = type[key];
                var objDefType = _getTypeMap(objType);
                
                if ('_interface' === key || 'isImplementOf' === key ) continue; // 예약어
                if (objDefType.name === 'any' && typeof target[key] !== 'undefined') continue;
                if (objDefType.default !== null && typeof target[key] === 'undefined') {
                    target[key] = objDefType.default;
                    continue;
                }
                if (!(key in target)) return ' 대상 없음 ' + parentName + '.' + key + ' : ' + typeof objType; 
                if (objDefType.name === 'class' && !(target[key] instanceof objType)) return '인스턴스 타입이 아닙니다.';


                // POINT: 
                if (objDefType.name === 'object') {

                }
                returnMsg = _checkTypeMessage(objType, target[key], parentName +'.'+ key);
                if (returnMsg.length > 0) return returnMsg;
            }
            return '';
        }
        return '맞는 타입이 없습니다.' + defType.name;
    };

    var validType = function(target, types) {
        var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
        var msg = '', arrMsg = [];

        if (arrType.length === 0) return new Error('검사할 타입이 없습니다.');

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            
            if(msg.length === 0) return true;
            else arrMsg.push(msg);
        }
        throw new Error(arrMsg);
    };

    var validUnionType = function(target, types) {
        var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
        var msg = '';
        
        if (arrType.length === 0) return new Error('검사할 타입이 없습니다.');

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            if(msg.length > 0)  throw new Error(msg);
            // if (validType(arrType[i], target) === false) return false;
        }
        return true;
    };

    // OR 조건
    var checkType = function(target, types) {
        var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
        var msg = '';

        if (arrType.length === 0) return false;

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            if(msg.length === 0) return true;
        }
        return false;
    };

    // AND 조건
    var checkUnionType = function(target, types) {
        var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
        var msg = '';
        
        if (arrType.length === 0) return false;

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            if(msg.length > 0) return false;
        }
        return true;
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.getAllProperties = getAllProperties;
        module.exports.checkType = checkType;
        module.exports.checkUnionType = checkUnionType;
        module.exports.validType = validType;
        module.exports.validUnionType = validUnionType;
    } else {    // COVER:
        global._L.Common.Util.getAllProperties = getAllProperties;
        global._L.Common.Util.checkType = checkType;
        global._L.Common.Util.checkUnionType = checkUnionType;
        global._L.Common.Util.validType = validType;
        global._L.Common.Util.validUnionType = validUnionType;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));