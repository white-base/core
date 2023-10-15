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

    function _isUpper(strValue) {
        var firstStr = strValue.charAt(0);
        if(firstStr === firstStr.toUpperCase()) return true;
        else false;
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

    /**
     * 함수 규칙  
     * - (args 내부에는 '()' 입력 금지)
     * - 참조형 타입 금지 : new Function() 시점에 자동 해석됨
     * 
     * @param {*} FunBody 
     * @returns 
     */
    function _getFunInfo(FunBody) {
        // var regChk = /\([,_\w\s]*\)(?:=>|\s*)?{[\s\w;]*}/;  // 제한 규칙
        var regChk = /\([,_\[\]{:}\w\s]*\)\s*(?:=>)?\s*{\s*.*\s*.*\s*}/;
        // var regFunc = /(?:function\s)?\(([\s\w,]*)\)(?:=>|\s*)?{(?:\s*return\s+)?([\w]*);?\s*}/; // 제한 규칙
        var regFunc = /(?:function\s)?\(([\[\]{:}\s\w,]*)\)\s*(?:=>)?\s*{(?:\s*return\s+|\s*)?([\[\]{:}\s\w,]*);?\s*}/;
        // var resParam = /[_\w0-1]*/g;
        var arrFunc, arrParam;
        var result = {args: [], return: undefined};

        if (regChk.test(FunBody) === false) return '함수타입 규칙이 아닙니다. : '+ FunBody;
        arrFunc = regFunc.exec(FunBody);
        if (arrFunc === null) return '함수타입 내용이 없습니다. : '+ FunBody;
        // var param = '['+ arrFunc[1] +']';
        // arrParam = JSON.parse(param);
        
        try {
            var arrParam = [];
            var arrRetrun;
            arrParam = (new Function('return ['+ arrFunc[1] +']'))();
            result.args = arrParam;
            
            if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))()
            result.return = arrRetrun;

        } catch (error) {
            return error.message;
        }

        return result;
    }

    /**
     * 전체 프로퍼티 조회
     * @memberof _L.Common.Util
     * @param {object} obj Object를 제외한 프로터피 리턴
     * @param {boolean?} hasObj Object를 포함 여부
     * @returns {array}  
     */
    var getAllProperties = function(obj, hasObj) {
        var allProps = [], curr = obj;
        var is = hasObj || false;
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

    var deepEqual = function(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== typeof obj2) return false;

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

    /**
     * js 의 타입을 객체로 리턴한다.
     * return {name: , default: null}
     * @memberof _L.Common.Util
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
            else {
                var kind = type['_KIND'];
                if (kind) {
                    kind = kind.toLowerCase();
                    if (kind === 'class' || kind === 'interface') obj.name = 'class';
                    if (kind === 'function') obj.name = 'function';
                } else {
                    obj.name = _isUpper(type.name) ? 'class' : 'function';
                }
            }
            return obj;
        }
        // seq 3 : instanceof
        if (Array.isArray(type)) {
            if (type.length === 0) {
                obj.name = 'array';
                return obj;
            }
            if (type.length ===  1 && Array.isArray(type[0])) obj.name = 'array';
            else obj.name = 'choice';
            return obj;
        }
        // if (type instanceof Array || Array.isArray(type)) {
        //     if (type.length > 0) obj.name = 'choice';
        //     else obj.name = 'array'
        //     return obj;
        // }

        // seq 4: funciton
        if (_isFillObj(type)) {
            obj.name = 'union';
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
    

    // TODO: type1 => ori, tar
    var equalType = function (ori, tar) {
        var def1 = getTypeMap(ori);
        var def2 = getTypeMap(tar);
        
        if (_isObject(ori) &&  _isObject(tar) && deepEqual(ori, tar)) return true;
        // if (def1.name !== def2.name) return false;
        if (def1.name === 'choice') {
            // var cntType2 = 0;

            var keyCode1 = _getKeyCode(ori[0]);
            if (keyCode1 == '_ANY_') {
                if (typeof tar !== 'undefined') return true;
                return false;
            } else if (keyCode1 == '_OPT_') {
                if (ori.length === 1) return true;
            } else if (keyCode1 == '_SEQ_') return false;

            var keyCode2 = Array.isArray(tar) ? _getKeyCode(tar[0]) : undefined;
            var arrType2 = Array.isArray(tar) ? tar : [tar];
            var start1 = keyCode1 ? 1 : 0;
            var start2 = keyCode2 ? 1 : 0;
            if (ori.length - start1 < arrType2.length - start2) return false;
            if (ori.length - start1 > 0 && arrType2.length - start2 === 0) return false;
            for (i = start2; i < arrType2.length; i++) {
                var success = false;
                for (var ii = start1; ii < ori.length; ii++) {
                    if (success) continue;
                    if (equalType(ori[ii], arrType2[i])) success = true;
                }
                if (!success) return false;
            }
            return true;
        }
        // 원시타입은 타입만 같은지 비교
        if (['null', 'number', 'string', 'boolean', 'symbol', 'undefined'].indexOf(def1.name) > -1) {
            if(def1.default !== null && def1.default !== def2.default) return false;
            if (def1.name === def2.name) return true;
            return false;
        }
        // array & array 조건
        if (def1.name === 'array') {
            if ((ori === Array || ori.length === 0 || (ori[0] && ori[0].length === 0)) 
            && (Array.isArray(tar) || tar === Array)) return true;      // [], [[]], Array
            if (!Array.isArray(tar)) return false;
            // if (ori.length === 1 && Array.isArray(ori[0]) && ori[0].length === 0) return true;
            
            var keyCode1 = _getKeyCode(ori[0][0]);
            var keyCode2;
            if (tar[0] && tar[0][0]) keyCode2 = _getKeyCode(tar[0][0]);
            if (keyCode1 == '_ANY_') {
                if (typeof tar[0] === 'undefined' || typeof tar[0][0] === 'undefined'
                    || tar[0].length === 0) return false;
                if (tar[0].length > 0) return true;
                return false;
            
            } else if (keyCode1 == '_OPT_') {
                if (typeof tar[0] === 'undefined' || tar[0].length === 0) return true;
                // if (type1[0].length === 1 && keyCode2 === '_ANY_') return true;
                if (ori[0].length === 1) return true;
                if (keyCode1 !== keyCode2) return false;
                var start1 = keyCode1 ? 1 : 0;
                var start2 = keyCode2 ? 1 : 0;
                if (ori[0].length - start1 < tar[0].length - start2) return false;
                if (ori[0].length - start1 > 0 && tar[0].length - start2 === 0) return false;
                for (var i = start2; i < tar[0].length; i++) {
                    var success = false;
                    for (var ii = start1; ii < ori[0].length; ii++) {
                        if (success) continue;
                        if (equalType(ori[0][ii], tar[0][i])) success = true;
                    }
                    if (!success) return false;
                }
                return true;
            
            } else if (keyCode1 == '_SEQ_') {
                if (keyCode1 !== keyCode2) return false;
                if (ori[0].length > tar[0].length) return false;
                for (var i = 1; i < ori[0].length; i++) {
                    if (!equalType(ori[0][i], tar[0][i])) return false;
                }
                return true;
            }

            return false;
        }
        
        if (def1.name === 'function') {
            if (typeof tar !== 'function') return false;
            if (ori === Function) return true;
            var info1 = ori['_TYPE'] ? ori['_TYPE'] : _getFunInfo(ori.toString());
            var info2 =  tar['_TYPE'] ? tar['_TYPE'] : _getFunInfo(tar.toString());
            if (typeof info1 === 'string') return info1;
            if (!info1.return && info1.args.length === 0) return true;
            if (typeof info2 === 'string') return info2;
            if (info1.args.length !== info2.args.length) return false;
            for (var i = 0; i < info1.args.length; i++) {
                if (!equalType(info1.args[i], info2.args[i])) return false;
            }
            return true;
        }
        if (def1.name === 'object') {
            if (def1.name !== 'object') return false;
            if (ori === tar) return true;
            if (_isEmptyObj(tar)) return true;
            if (ori instanceof RegExp) {
                if (!(tar instanceof RegExp) || ori.source !== tar.source) return false;
            }
            if (deepEqual(ori, tar)) return true;
            return false;
        }
        if (def1.name === 'class') {
            if (ori === tar) return true;
            try {
                var obj1 = new ori();
                var obj2 = new tar();
                if (deepEqual(obj1, obj2)) return true;
            } catch (error) {
                return false;
            }
            return false;
        }
        if (def1.name === 'union') {
            var list = getAllProperties(ori);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if (!equalType(ori[key], tar[key])) return false;
            }
            return true;
        }
    };

    /**
     * 타입을 검사하여 메세지를 리턴
     * TODO: 배열제네릭 검토, => [[MetaObjec]]
     * TODO: null 입력에 대한 검토, 기본 null any 표현 대체 검토, NaN 같은 고유 상수 찾기
     * @memberof _L.Common.Util
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
        
        if (defType.name === 'choice') {    // TODO:

            for(var i = 0; i < type.length; i++) {
                var keyCode = _getKeyCode(type[i]);
                
                if (keyCode == '_ANY_') {
                    if (typeof target !== 'undefined') return '';
                    return '[_any_] 타입에 undefined 입력할 수 없습니다.';
                } else if (keyCode == '_OPT_') {
                    if (typeof target === 'undefined') return '';
                    continue;
                } else if (keyCode == '_SEQ_') {
                    return '[or] 조건에 [_seq_] 키워드를 사용할 수 없습니다.';
                }
                returnMsg = checkTypeMessage(type[i], target);
                if(returnMsg.length === 0) return '';
                else arrMsg.push(returnMsg);
            }
            return arrMsg.toString();
        }
        if (defType.name === 'null') {
            if (target === null) return '';
            return parentName +'에 속성이 없습니다.';
        }
        if (defType.name === 'number') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'number') return '';
            return Message.get('ES024', [parentName, 'number']);
        }
        if (defType.name === 'string') {
            if (defType.default && typeof target === 'undefined') target = defType.default;
            if (typeof target === 'string') return '';
            return Message.get('ES024', [parentName, 'string']);
        }
        if (defType.name === 'boolean') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'boolean') return '';
            return Message.get('ES024', [parentName, 'boolean']);
        }
        if (defType.name === 'symbol') {
            if (typeof target === 'symbol') return '';
            return Message.get('ES024', [parentName, 'symbol']);
        }
        if (defType.name === 'array') {
            if ((type === Array || type.length === 0 || (type[0] && type[0].length === 0))
            && (Array.isArray(target) || target === Array)) return '';
            // if (type.length === 1 && Array.isArray(type[0]) && type[0].length === 0) return ''; // [[]]
            if (!Array.isArray(target)) return Message.get('ES024', [parentName, 'array']);

            var keyCode
            var beginIdx = 0;
            var arrType = [];

            arrType = type[0];
            keyCode = _getKeyCode(arrType[0]);

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
        // POINT:
        if (defType.name === 'function') {
            if (typeof target !== 'function') return Message.get('ES024', [parentName, 'function']);
            if (type === Function) return '';
            // var func = type.toString().replace(/ /g,'');
            // if (func === 'function(){}' || func === '()=>{}') return '';
            var info = type['_TYPE'] ? type['_TYPE'] : _getFunInfo(type.toString());
            var returns = [];
            var _type = target['_TYPE'];
            var _args = [];
            var _returns = [];
            var iType, fType;
            if (typeof info === 'string') return info;
            if (!info.return && info.args.length === 0) return '';    // success
            if ((info.return || info.args.length > 0) && !_type) return 'function._TYPE 정보가 없습니다.';
            if (!_type) return 'target[_TYPE] 객체가 없습니다.'
            if (!(_type.args.length > 0 || _type.return)) {
                return 'function._TYPE = {args: [], return: []} function _TYPE 규칙이 다릅니다.';
            }
            _args = (Array.isArray(_type.args )) ? _type.args : [_type.args];
            if (info.return) returns = (Array.isArray(info.return )) ? info.return : [info.return];
            if (_type.return) _returns = (Array.isArray(_type.return )) ? _type.return : [_type.return];
            if (info.args.length > _args.length) return 'args.length ='+ info.args.length +' 길이가 서로 다릅니다.'
            // args 검사
            for (var i = 0; i < info.args.length; i++) {
                
                // iType = getTypeMap(info.args[i]);
                // fType = getTypeMap(args[i]);
                // if (iType.name = fType.name) continue;
                if (!equalType(info.args[i], _args[i])) return false;
                /**
                 * 원시타입
                 * symbol => 원시와 같이
                 * object => 원시와 같이 비교
                 * ---
                 * array : 순환 :: [], [[..]], [['_any_',...]]
                 * or : 순환 :: [...]
                 * fun : 순환 :: 직접 입금은 금지 변수로 삽입 => 해결가능할 듯 => 자동 금지됨
                 * class(object) : 순환  :: Class
                 * and(object) : 순환 :: {....} => number 타입은 금지됨
                 */

            }
            // return 검사
            if (returns.length > _returns.length) return 'return.length ='+ returns.length +' 길이가 서로 다릅니다.'
            for (var i = 0; i < returns.length; i++) {
                if (!equalType(returns[i], _returns[i])) return 'return 타입이 서로 다릅니다.'
            }
            return '';

            // inner function
            
            

        }
        // if (defType.name === 'function') {
        //     if (typeof target === 'function') return '';
        //     return Message.get('ES024', [parentName, 'function']);
        // }
        if (defType.name === 'object') {
            if (type === Object && target instanceof type) return '';
            if (type !== Object && target instanceof type.constructor) return '';
            return Message.get('ES024', [parentName, 'object']);
        }
        if (defType.name === 'class') {
        
            if (_isBuiltFunction(type)) {
                if (target instanceof type) return ''; 
                else return Message.get('ES032', [parentName, _typeName(type)]);
            } else {
                if (typeof target === 'object' && target instanceof type) return '';
                if (typeof target === 'object' && target !== null) return checkTypeMessage(_creator(type), target, parentName);
                return Message.get('ES032', [parentName, _typeName(type)]);
            }
        }
        if (defType.name === 'union') {
            var list = getAllProperties(typeDef.type);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = getTypeMap(type[key]);
                var msg = '';
                
                // REVIEW: for 위쪽으로 이동 검토!
                if (!_isObject(target)) return Message.get('ES031', [parentName + '.' + key]);                 // target 객체유무 검사
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                if (listDefType.default !== null && typeof target[key] === 'undefined')      // default 설정
                    target[key] = listDefType.default;
                if (target !== null && !(key in target)) return Message.get('ES027', [listDefType.name, parentName + '.' + key]);    
                if (listDefType.name === 'class'){
                    if (typeof target[key] === 'function') continue;                        // class method
                    if (typeof target[key] === 'object' && target[key] instanceof type[key]) continue;
                    else return Message.get('ES031', [parentName + '.' + key]);
                } 
                msg = checkTypeMessage(type[key], target[key], parentName +'.'+ key);
                if (msg.length > 0) return msg;
            }
            return '';
        }
        return Message.get('ES022', [defType.name]);
    };

    /**
     * 타입 검사
     * @memberof _L.Common.Util
     * @param {any} chkType 
     * @param {any} target 
     * @returns {boolean} 
     */
    var checkType = function(chkType, target) {
        var msg = '';

        if (typeof chkType === 'undefined') return false;
        
        msg = checkTypeMessage(chkType, target);
        if(msg.length === 0) return true;
        return false;
    };

    /**
     * 타입 검사 
     * @memberof _L.Common.Util
     * @param {any} chkType 
     * @param {any} target 
     * @returns {boolean | Error} 성공시 true, 실패시 예외
     */
    var validType = function(chkType, target) {
        var msg = '';

        if (typeof chkType === 'undefined') Message.error('ES026', ['chkType']);
        
        msg = checkTypeMessage(chkType, target);
        if(msg.length === 0) return true;
        Message.error('ES069', ['type vaild', msg]);
    };


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.getAllProperties = getAllProperties;
        exports.deepEqual = deepEqual;
        exports.checkTypeMessage = checkTypeMessage;
        exports.getTypeMap = getTypeMap;
        exports.checkType = checkType;
        exports.validType = validType;
        exports.equalType = equalType;
    } else {
        var ns = {
            getAllProperties: getAllProperties,
            deepEqual: deepEqual,
            checkTypeMessage: checkTypeMessage,
            getTypeMap: getTypeMap,
            checkType: checkType,
            validType: validType,
            equalType: equalType
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;
    }

}(typeof window !== 'undefined' ? window : global));