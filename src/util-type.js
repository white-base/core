/**
 * namespace _L.Common.Util
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Common.Util   = _global._L.Common.Util || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)

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
     * 최상위 object 이거나 사용자 함수에서 생성한 객체 여부
     * @param {*} obj 
     * @returns 
     */
    function _isObject(obj)  {
        if(typeof obj === 'object' && obj !== null && !_isPrimitiveObj(obj)) {
            // && !(obj instanceof RegExp) && !(obj instanceof Array) && !(obj instanceof Symbol)  && !(obj instanceof Date)) {
            return true;
        }
        return false;
    }
    /**
     * 공백객체 인지 확인
     * @param {*} obj 검사대상
     * @returns 
     */
    function _isEmptyObj(obj)  {
        // if(typeof obj === 'object' && Object.keys(obj).length === 0 && getAllProperties(obj).length === 0) {
        if(_isObject(obj) && Object.keys(obj).length === 0 && getAllProperties(obj).length === 0) {
          return true;
        }
        return false;
    }
    /**
     * 공백이 아닌 객체 (prototype 및 속성 있는것)
     * @param {*} obj 대상 
     * @returns 
     */
    function _isFillObj(obj)  {
        // if(typeof obj === 'object' && getAllProperties(obj).length > 0 && !(obj instanceof RegExp)) {   // REVIEW: RegExp 빠져야 할듯!!
        if(_isObject(obj) && getAllProperties(obj).length > 0) {   // REVIEW: RegExp 빠져야 할듯!!
          return true;
        }
        return false;
    }
    /**
     * object 와 new 생성한 사용자 함수를 제외한 객쳐 여부
     * @param {*} obj 
     * @returns 
     */
    function _isPrimitiveObj(obj) {
        if(typeof obj === 'object' && obj !== null 
            && (obj instanceof RegExp || obj instanceof Date || typeof obj === 'symbol')) {
            return true;
        }
        return false;
    }
    /**
     * 내장함수 유무 => REVIEW: Function?
     * @param {*} obj 
     * @returns 
     */
    function _isBuiltFunction(obj) {
        if (typeof obj === 'function' && (false 
            || obj === Number || obj === String || obj === Boolean
            || obj === Object || obj === Array
            || obj === RegExp || obj === Date 
            || obj === Symbol || obj === BigInt
        )) return true;
        return false;
    }

    /**
     * js 의 타입을 객체로 리턴한다.
     * return {name: , default: null}
     * @param {any} type 대상타입
     * @returns {object}
     */
    var getTypeMap = function(type) {
        var obj =  {name: '', default: null};

        // seq 1 : === (operation) 
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
        // seq 2 : typeof
        if (typeof type === 'undefined') {
            obj.name = 'undefined';
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
        if (typeof type === 'symbol') { // ES6+
            obj.name = 'symbol';
            return obj;
        }
        if (typeof type === 'function') {
            if (type.name === 'Symbol') obj.name = 'symbol';
            else obj.name = 'class';
            return obj;
        }
        // seq 3 : instanceof
        if (type instanceof Array || Array.isArray(type)) {
            if (type.length > 0) obj.name = 'or';
            else obj.name = 'array'
            return obj;
        }
        // seq 4: funciton
        if (_isFillObj(type)) {
            obj.name = 'and';
            return obj;
        }
        if (_isEmptyObj(type)) {        // {..}, 빈 생성자
            obj.name = 'object';
            return obj;
        }
        if(_isPrimitiveObj(type)) {
            obj.name = 'object';
            return obj;
        }
        // if (typeof type === 'object') {
            // obj.name = 'object';
            // return obj;
        // }
        
        // if (typeof type === 'object') {
        //     if (type instanceof RegExp) obj.name = 'regexp';  
        //     else obj.name = 'object';
        //     return obj;
        // }
        throw new Error('타입이 존재하지 않습니다.');
    }

    /**
     * function 생성하는 생성자
     * @param {*} type 
     * @returns 
     */
    var _creator = function(type) {
        return new type;
        // if (typeof type === 'function') {   
        //     // if (['String', 'Number', 'Boolean', 'Symbol'].indexOf(type.name) > -1) return type();   
        //     return new type;
        // }
        // throw new Error('함수 타입만 생성할 수 있습니다.');    => 불필요함 내부적으로 사용함
    }

    /**
     * 타입을 검사하여 메세지를 리턴
     * @param {any} type 검사할 타입
     * @param {any} target 검사대상
     * @param {string} parentName '' 공백시 성공
     * @returns 
     */
    var _checkTypeMessage = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        var typeDef = {type: type, name: '', default: null};
        var returnMsg = '', arrMsg = [];
        var defType;

        defType = getTypeMap(type);
        
        // if (target === null || typeof type === 'undefined') return '대상이 null, undefined 는 검사할 수 없습니다.';

        if (defType.name === 'or') {                                                    // or
            for(var i = 0; i < type.length; i++) {
                returnMsg = _checkTypeMessage(type[i], target);
                if(returnMsg.length === 0) return '';
                else arrMsg.push(returnMsg);
            }
            return arrMsg.toString();
        }
        if (defType.name === 'any') {
            if (typeof target !== 'undefined') return '';
            return parentName +'에 속성이 없습니다.';
        }
        if (defType.name === 'number') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'number') return '';
            return parentName +'은 number 타입이 아닙니다.';
        }
        if (defType.name === 'string') {
            if (defType.default && typeof target === 'undefined') target = defType.default;
            if (typeof target === 'string') return '';
            return parentName +'은 string 타입이 아닙니다.';
        }
        if (defType.name === 'boolean') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'boolean') return '';
            return parentName +'은 boolean 타입이 아닙니다.';
        }
        if (defType.name === 'symbol') {
            if (typeof target === 'symbol') return '';
            return parentName +'은 symbol 타입이 아닙니다.';
        }
        if (defType.name === 'array') {
            if (Array.isArray(target)) return '';
            return parentName +'은 array 타입이 아닙니다.';
        }
        if (defType.name === 'function') {
            if (typeof target === 'function') return '';
            return parentName +'은 function 타입이 아닙니다.';
        }
        if (defType.name === 'object') {
            // if (typeof target === 'object') return '';
            if (type === Object && target instanceof type) return '';
            if (type !== Object && target instanceof type.constructor) return '';
            return parentName +'은 object 타입이 아닙니다.';
        }
        if (defType.name === 'class') {
        
            if (_isBuiltFunction(type)) {
                if (target instanceof type) return ''; 
                else return '대상 instance 가 아닙니다.';
            } else {
                if (typeof target === 'object' && target instanceof type) return '';
                if (typeof target === 'object' && target !== null) return _checkTypeMessage(_creator(type), target, parentName);
                return parentName +'은 instance 타입이 아닙니다.';
            }
            // && target instanceof type) return '';
            // if (typeof target === 'object' && target !== null) return _checkTypeMessage(_creator(type), target, parentName);
            // if (!_isBuiltFunction(type)) return _checkTypeMessage(_creator(type), target, parentName);
            // return parentName +'은 instance 타입이 아닙니다.';

        }
        if (defType.name === 'and') {
            var list = getAllProperties(typeDef.type);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = getTypeMap(type[key]);
                var msg = '';
                
                if (!_isObject(target)) return 'target 은 객체가 아닙니다.';                    // target 객체유무 검사
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                if (listDefType.default !== null && typeof target[key] === 'undefined')      // default 설정
                    target[key] = listDefType.default;
                if (target !== null && !(key in target))
                // if (!(key in target))                                                       // key 유무 검사
                    return ' 대상 없음 ' + parentName + '.' + key + ' : ' + typeof key;
                // if ([].indexOf(listDefType.name) > -1 && listDefType.name !== getTypeMap(target[key]).name) 
                //     return ' 타입 다름 ' + parentName + '.' + key + ' : ' + typeof key;
                if (listDefType.name === 'class'){
                    if (typeof target[key] === 'function') continue;                        // class method
                    if (typeof target[key] === 'object' && target[key] instanceof type[key]) continue;
                    else return parentName + '.' + key + '은 instance 타입이 아닙니다.';
                } 
                msg = _checkTypeMessage(type[key], target[key], parentName +'.'+ key);
                if (msg.length > 0) return msg;
            }
            return '';
        }
        return '맞는 타입이 없습니다.' + defType.name;
    };

    // OR 조건
    var checkType = function(target, types) {
        // var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
        var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '';

        if (arrType.length === 0) return false;

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            if(msg.length === 0) return true;
        }
        return false;
    };

    var validType = function(target, types) {
        // var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
        var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '', arrMsg = [];

        if (arrType.length === 0) throw new Error('검사할 타입이 없습니다.');

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            
            if(msg.length === 0) return true;
            else arrMsg.push(msg);
        }
        throw new Error(arrMsg);
    };

    // AND 조건
    var checkUnionType = function(target, types) {
        // var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);  
        var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '';
        
        if (arrType.length === 0) return false;

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            if(msg.length > 0) return false;
        }
        return true;
    };


    var validUnionType = function(target, types) {
        // var arrType = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
        var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '';
        
        if (arrType.length === 0) throw new Error('검사할 타입이 없습니다.');

        for(var i = 0; i < arrType.length; i++) {
            msg = _checkTypeMessage(arrType[i], target);
            if(msg.length > 0)  throw new Error(msg);
        }
        return true;
    };



    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports.getAllProperties = getAllProperties;
        module.exports.getTypeMap = getTypeMap;
        module.exports.checkType = checkType;
        module.exports.checkUnionType = checkUnionType;
        module.exports.validType = validType;
        module.exports.validUnionType = validUnionType;
    } else {
        _global._L.Common.Util.getAllProperties = getAllProperties;
        _global._L.Common.Util.getTypeMap = getTypeMap;
        _global._L.Common.Util.checkType = checkType;
        _global._L.Common.Util.checkUnionType = checkUnionType;
        _global._L.Common.Util.validType = validType;
        _global._L.Common.Util.validUnionType = validUnionType;
    }

}(typeof window !== 'undefined' ? window : global));