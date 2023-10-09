/**
 * namespace _L.Common.Util
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};
    _global._L.Common.Util          = _global._L.Common.Util || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
    } else {    
        Message                     = _global._L.Message;
    }

    //==============================================================
    // 3. module dependency check

    //==============================================================
    // 4. module implementation 
    
    /**
     * 최상위 object 이거나 사용자 함수에서 생성한 객체 여부
     * @param {*} obj 
     * @returns {boolean}
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
     * @returns {boolean}
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
     * @returns {boolean}
     */
    function _isFillObj(obj)  {
        // if(typeof obj === 'object' && getAllProperties(obj).length > 0 && !(obj instanceof RegExp)) {
        if(_isObject(obj) && getAllProperties(obj).length > 0) {
          return true;
        }
        return false;
    }
    /**
     * object 와 new 생성한 사용자 함수를 제외한 객쳐 여부
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isPrimitiveObj(obj) {
        if(typeof obj === 'object' && obj !== null 
            && (obj instanceof RegExp || obj instanceof Date || typeof obj === 'symbol')) {
            return true;
        }
        return false;
    }
    /**
     * 내장함수 유무
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isBuiltFunction(obj) {
        if (typeof obj === 'function' && (false 
            || obj === Number || obj === String || obj === Boolean
            || obj === Object || obj === Array || obj === Function
            || obj === RegExp || obj === Date 
            || obj === Symbol || obj === BigInt
        )) return true;
        return false;
    }

    /**
     * 전체 프로퍼티 조회
     * @param {object} obj Object를 제외한 프로터피 리턴
     * @param {boolean?} isObj Object를 포함 여부
     * @returns {array}  
     */
    var getAllProperties = function(obj, isObj) {
        var allProps = [], curr = obj;
        var is = isObj || false;
        do {
            var props = Object.getOwnPropertyNames(curr);
            
            // props.forEach(function(prop) {
            //     if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop)))
            //         allProps.push(prop);
            // });
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop)))
                    allProps.push(prop);
            }
        } while (curr = Object.getPrototypeOf(curr))
        return allProps;
    };

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
            obj.name = 'null';
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
        if (Array.isArray(type)) {
            if (type.length === 0) {
                obj.name = 'array';
                return obj;
            }
            if (type.length ===  1 && Array.isArray(type[0])) obj.name = 'array';
            else obj.name = 'or';
            return obj;
        }
        // if (type instanceof Array || Array.isArray(type)) {
        //     if (type.length > 0) obj.name = 'or';
        //     else obj.name = 'array'
        //     return obj;
        // }

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
        Message.error('ES022', ['type']);
    }

    /**
     * function 생성하는 생성자
     * @param {*} type 
     * @returns {object}
     */
    var _creator = function(type) {
        return new type;
        // if (typeof type === 'function') {   
        //     // if (['String', 'Number', 'Boolean', 'Symbol'].indexOf(type.name) > -1) return type();   
        //     return new type;
        // }
        // throw new Error('함수 타입만 생성할 수 있습니다.');    => 불필요함 내부적으로 사용함
    }

    function _typeName(obj) {
        return obj.name;
        // if (typeof obj === 'function') return obj.name;
        // if (typeof obj === 'object' && obj !== null) {
        //     var proto = obj.__proto__ || Object.getPrototypeOf(obj); 
        //     return  proto.constructor.name;
        // }
        // return 'unknown';
    }

    function _getKeyCode(val) {
        var reg = /^_[a-zA-Z]+_/;
        var result;

        if (typeof val !== 'string') return;
        result = reg.exec(val);
        if (result !== null) return result[0].toUpperCase();
    }
    // REVIEW: 보류 함수 본문도 해석해야 하는 이슈가 있음
    function _getFunInfo(FunBody) {
        var regChk = /\([,_\w\s]*\)(?:=>|\s*)?{[\s\w]*}/;
        var regFunc = /(?:function\s)?\(([\s\w,]*)\)(?:=>|\s*)?{(?:return\s+)?([\w]*)\s*}/;
        var resParam = /[_\w]*/;
        var arrFunc, arrParam;
        var result = {args: [], return: null};

        if (regChk.test(FunBody) === false) return '함수타입 규칙이 아닙니다. function(arg..) { returType }';
        arrFunc = regFunc.exec(FunBody);
        if (arrFunc === null) return '함수타입 규칙이 아닙니다. function(arg..) { returType }';
        result.return = arrFunc[2];
        arrParam = regFunc.exec(arrFunc[1]);
        if(Array.isArray(arrParam)) {
            result.args = arrFunc.splice(1);
        }
        return result;
    }

    /**
     * 타입을 검사하여 메세지를 리턴
     * TODO: 배열제네릭 검토, => [[MetaObjec]]
     * TODO: null 입력에 대한 검토, 기본 null any 표현 대체 검토, NaN 같은 고유 상수 찾기
     * @param {any} type 검사할 타입
     * @param {any} target 검사대상
     * @param {string} parentName '' 공백시 성공
     * @returns {string?}
     */
    var checkTypeMessage = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        var typeDef = {type: type, name: '', default: null};
        var returnMsg = '', arrMsg = [];
        var defType;

        defType = getTypeMap(type);
        
        // if (target === null || typeof type === 'undefined') return '대상이 null, undefined 는 검사할 수 없습니다.';

        if (defType.name === 'or') {    // TODO:

            for(var i = 0; i < type.length; i++) {
                var keyCode = _getKeyCode(type[i]);
                
                if (keyCode == '_ANY_') {
                    if (typeof target !== 'undefined') return '';
                    return '[_any_] 타입에 undefined 입력할 수 없습니다.';
                } else if (keyCode == '_OPT_') {
                    if (typeof target === 'undefined') return '';
                    continue;
                } else if (keyCode == '_SEQ_') {
                    // if (!Array.isArray(target)) return '[target]은 배열 타입이 아닙니다.';
                    // for(var ii = 1; ii < type.length; ii++) {
                    //     var tar = target[ii - 1];
                    //     if (!tar) return '[target]은 [i]번째 배열값이 없습니다.';
                    //     returnMsg = checkTypeMessage(type[ii], tar);
                    //     if (returnMsg.length > 0) return returnMsg;
                    // }
                    // return '';
                    return '[or] 조건에 [_seq_] 키워드를 사용할 수 없습니다.';
                }
                
                returnMsg = checkTypeMessage(type[i], target);
                if(returnMsg.length === 0) return '';
                else arrMsg.push(returnMsg);
            }
            return arrMsg.toString();
        }
        // if (defType.name === 'or') {
        //     for(var i = 0; i < type.length; i++) {
        //         returnMsg = checkTypeMessage(type[i], target);
        //         if(returnMsg.length === 0) return '';
        //         else arrMsg.push(returnMsg);
        //     }
        //     return arrMsg.toString();
        // }
        if (defType.name === 'any') {
            if (typeof target !== 'undefined') return '';
            return parentName +'에 속성이 없습니다.';
        }
        if (defType.name === 'number') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'number') return '';
            return Message.get('ES024', [parentName, 'number']);
            // return parentName +'은 number 타입이 아닙니다.';
        }
        if (defType.name === 'string') {
            if (defType.default && typeof target === 'undefined') target = defType.default;
            if (typeof target === 'string') return '';
            return Message.get('ES024', [parentName, 'string']);
            // return parentName +'은 string 타입이 아닙니다.';
        }
        if (defType.name === 'boolean') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'boolean') return '';
            return Message.get('ES024', [parentName, 'boolean']);
            // return parentName +'은 boolean 타입이 아닙니다.';
        }
        if (defType.name === 'symbol') {
            if (typeof target === 'symbol') return '';
            return Message.get('ES024', [parentName, 'symbol']);
            // return parentName +'은 symbol 타입이 아닙니다.';
        }
        if (defType.name === 'array') { // TODO:
            if (!Array.isArray(target)) return Message.get('ES024', [parentName, 'array']);
            if (type.length === 0 && Array.isArray(target)) return '';  // success
            if (type.length === 1 && Array.isArray(type[0]) && type[0].length === 0) return '';  // success

            var keyCode
            var beginIdx = 0;
            var arrType = [];
            if (type.length > 0 && Array.isArray(type[0])) {
                arrType = type[0];
                keyCode = _getKeyCode(arrType[0]);
            }

            if (keyCode == '_ANY_') {
                for(var ii = 0; ii < target.length; ii++) {
                    var tar = target[ii];
                    if (typeof tar === 'undefined') return '[_any_] 타입에 undefined 입력할 수 없습니다.';
                }
                return '';
            } else if (keyCode == '_SEQ_') {
                for(var i = 1; i < arrType.length; i++) {
                    var tar = target[i - 1];
                    if (typeof tar === 'undefined') return '[target]은 [i]번째 배열값이 없습니다.';
                    returnMsg = checkTypeMessage(arrType[i], tar);
                    if (returnMsg.length > 0) return returnMsg;
                }
                return '';
            } else if (keyCode == '_OPT_') {
                if (typeof target === 'undefined') return '';
                if (Array.isArray(target) && target.length === 0) return '';
                beginIdx = 1;
            }

            for (var i = 0; i < target.length; i++) {
                for (var ii = beginIdx; ii < arrType.length; ii++) {
                    returnMsg = checkTypeMessage(arrType[ii], target[i]);
                    if(returnMsg.length === 0) return '';
                    else arrMsg.push(returnMsg);
                }
                return arrMsg.toString();   // i 번째 값이 검사에 실패하였습니다.
            }
            
        }
        // if (defType.name === 'array') {
        //     if (Array.isArray(target)) return '';
        //     return Message.get('ES024', [parentName, 'array']);
        // }        
        if (defType.name === 'function') {
            if (typeof target === 'function') return '';
            return Message.get('ES024', [parentName, 'function']);
        }
        if (defType.name === 'object') {
            // if (typeof target === 'object') return '';
            if (type === Object && target instanceof type) return '';
            if (type !== Object && target instanceof type.constructor) return '';
            return Message.get('ES024', [parentName, 'object']);
            // return parentName +'은 object 타입이 아닙니다.';
        }
        if (defType.name === 'class') {
        
            if (_isBuiltFunction(type)) {
                if (target instanceof type) return ''; 
                else return Message.get('ES032', [parentName, _typeName(type)]);
                // else return '대상 instance 가 아닙니다.';
            } else {
                if (typeof target === 'object' && target instanceof type) return '';
                if (typeof target === 'object' && target !== null) return checkTypeMessage(_creator(type), target, parentName);
                return Message.get('ES032', [parentName, _typeName(type)]);
                // return parentName +'은 instance 타입이 아닙니다.';
            }
            // && target instanceof type) return '';
            // if (typeof target === 'object' && target !== null) return checkTypeMessage(_creator(type), target, parentName);
            // if (!_isBuiltFunction(type)) return checkTypeMessage(_creator(type), target, parentName);
            // return parentName +'은 instance 타입이 아닙니다.';

        }
        if (defType.name === 'and') {
            var list = getAllProperties(typeDef.type);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = getTypeMap(type[key]);
                var msg = '';
                
                if (!_isObject(target)) return Message.get('ES031', [parentName + '.' + key]);                 // target 객체유무 검사
                // if (!_isObject(target)) return 'target 은 객체가 아닙니다.';                    // target 객체유무 검사
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                if (listDefType.default !== null && typeof target[key] === 'undefined')      // default 설정
                    target[key] = listDefType.default;
                if (target !== null && !(key in target)) return Message.get('ES027', [listDefType.name, parentName + '.' + key]);    
                // return ' 대상 없음 ' + parentName + '.' + key + ' : ' + typeof key;
                // if (!(key in target))                                                       // key 유무 검사
                
                // if ([].indexOf(listDefType.name) > -1 && listDefType.name !== getTypeMap(target[key]).name) 
                //     return ' 타입 다름 ' + parentName + '.' + key + ' : ' + typeof key;
                if (listDefType.name === 'class'){
                    if (typeof target[key] === 'function') continue;                        // class method
                    if (typeof target[key] === 'object' && target[key] instanceof type[key]) continue;
                    else return Message.get('ES031', [parentName + '.' + key]);
                    // else return parentName + '.' + key + '은 instance 타입이 아닙니다.';
                } 
                msg = checkTypeMessage(type[key], target[key], parentName +'.'+ key);
                if (msg.length > 0) return msg;
            }
            return '';
        }
        return Message.get('ES022', [defType.name]);
    };

    // OR 조건
    var checkType = function(target, chkType) {
        // var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '';

        // if (arrType.length === 0) return false;
        if (typeof chkType === 'undefined') return false;

        // for(var i = 0; i < arrType.length; i++) {
        //     msg = checkTypeMessage(arrType[i], target);
        //     if(msg.length === 0) return true;
        // }
        msg = checkTypeMessage(chkType, target);
        if(msg.length === 0) return true;

        return false;
    };

    var validType = function(target) {
        var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '', arrMsg = [];

        if (arrType.length === 0) Message.error('ES026', ['arguments.length == 0']);

        // for(var i = 0; i < arrType.length; i++) {
        //     msg = checkTypeMessage(arrType[i], target);
            
        //     if(msg.length === 0) return true;
        //     else arrMsg.push(msg);
        // }
        
            msg = checkTypeMessage(arrType, target);  // TODO: target 이 앞으로 가야 맞을듯
            if(msg.length === 0) return true;

        Message.error('ES066', [arrMsg]);
    };

    // AND 조건 => REVIEW: 필요 없을듯
    var checkUnionType = function(target) {
        var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '';
        
        if (arrType.length === 0) return false;

        for(var i = 0; i < arrType.length; i++) {
            msg = checkTypeMessage(arrType[i], target);
            if(msg.length > 0) return false;
        }
        return true;
    };

    var validUnionType = function(target) {
        var arrType = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];
        var msg = '';
        
        if (arrType.length === 0) Message.error('ES026', ['arguments.length == 0']);

        for(var i = 0; i < arrType.length; i++) {
            msg = checkTypeMessage(arrType[i], target);

            if(msg.length > 0) Message.error('ES065', [msg]);
        }
        return true;
    };



    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.getAllProperties = getAllProperties;
        exports.checkTypeMessage = checkTypeMessage;
        exports.getTypeMap = getTypeMap;
        exports.checkType = checkType;
        exports.checkUnionType = checkUnionType;
        exports.validType = validType;
        exports.validUnionType = validUnionType;
    } else {
        var ns = {
            getAllProperties: getAllProperties,
            checkTypeMessage: checkTypeMessage,
            getTypeMap: getTypeMap,
            checkType: checkType,
            checkUnionType: checkUnionType,
            validType: validType,
            validUnionType: validUnionType
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;
    }

}(typeof window !== 'undefined' ? window : global));