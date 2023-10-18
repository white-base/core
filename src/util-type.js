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
     * @param {*} funBody 
     * @returns {object}
     */
    function _getFunInfo(funBody) {
        // var regChk = /\([,_\w\s]*\)(?:=>|\s*)?{[\s\w;]*}/;  // 제한 규칙
        var regChk = /\([,_\[\]{:}\w\s]*\)\s*(?:=>)?\s*{\s*.*\s*.*\s*}/;
        // var regFunc = /(?:function\s)?\(([\s\w,]*)\)(?:=>|\s*)?{(?:\s*return\s+)?([\w]*);?\s*}/; // 제한 규칙
        var regFunc = /(?:function\s)?\(([\[\]{:}\s\w,]*)\)\s*(?:=>)?\s*{(?:\s*return\s+|\s*)?([\[\]{:}\s\w,]*);?\s*}/;
        // var resParam = /[_\w0-1]*/g;
        var arrFunc, arrParam;
        var result = {args: [], return: undefined};
        var arrParam = [];
        var arrRetrun;
        
        try {

            if (regChk.test(funBody) === false) throw new Error('함수타입 규칙이 아닙니다. : '+ funBody);;
            arrFunc = regFunc.exec(funBody);
            if (arrFunc === null) throw new Error('함수타입 내용이 없습니다. : '+ funBody);

            arrParam = (new Function('return ['+ arrFunc[1] +']'))();
            result.args = arrParam;
            
            if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))()
            result.return = arrRetrun;

        } catch (error) {
            throw new Error('function parse Fail :' + error);
        }

        return result;
    }

    /**
     * 타입을 검사하여 메세지를 리턴
     * @param {any} type 검사할 타입 , origin
     * @param {any} target 검사대상
     * @param {string?} parentName '' 공백시 성공
     * @returns {throw?}
     */
    var _check = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        var typeDef = {type: type, name: '', default: null};
        var returnMsg = '', arrMsg = [];
        var defType;

        defType = typeKind(type);
        
        
        if (defType.name === 'undefined') {
            if (typeof target === 'undefined') return;
            throw new Error(parentName +'는 undefined 속성입니다.');
        }
        if (defType.name === 'null') {
            if (target === null) return;
            throw new Error(parentName +'는 null 속성이 입니다.');
        }
        if (defType.name === 'number') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'number') return;
            return Message.error('ES024', [parentName, 'number']);
        }
        if (defType.name === 'string') {
            if (defType.default && typeof target === 'undefined') target = defType.default; // Branch:
            if (typeof target === 'string') return;
            return Message.error('ES024', [parentName, 'string']);
        }
        if (defType.name === 'boolean') {
            if (defType.default && typeof target === 'undefined') target = defType.default;     // Branch:
            if (typeof target === 'boolean') return;
            return Message.error('ES024', [parentName, 'boolean']);
        }
        if (defType.name === 'symbol') {
            if (typeof target === 'symbol') return '';
            return Message.error('ES024', [parentName, 'symbol']);
        }
        if (defType.name === 'choice') {

            for(var i = 0; i < type.length; i++) {
                var keyCode = _getKeyCode(type[i]);
                
                if (keyCode == '_ANY_') {
                    if (typeof target !== 'undefined') return;
                    throw new Error('[_any_] 타입에 undefined 입력할 수 없습니다.');
                } else if (keyCode == '_OPT_') {
                    if (typeof target === 'undefined') return;
                    if (type.length - 1 === i) return;

                    continue;
                } else if (keyCode == '_SEQ_') {
                    throw new Error('[or] 조건에 [_seq_] 키워드를 사용할 수 없습니다.');
                }
                var success = false;
                try {
                    _check(type[i], target);
                    success = true;
                } catch (error) {
                    continue;
                }
                if (success) return;
                // returnMsg = _check(type[i], target);
                // if(returnMsg.length === 0) return;      
                // else arrMsg.push(returnMsg);    //TODO: 방식 바꿔야 함 throw ...
            }
            // return arrMsg.toString();
            throw new Error('choice 검사가 실패하였습니다. ');; 
        }
        if (defType.name === 'array') {
            if ((type === Array || type.length === 0 || (type[0] && type[0].length === 0))
            && (Array.isArray(target) || target === Array)) return;
            // if (type.length === 1 && Array.isArray(type[0]) && type[0].length === 0) return ''; // [[]]
            if (!Array.isArray(target)) return Message.error('ES024', [parentName, 'array']);

            var keyCode
            var beginIdx = 0;
            var arrType = [];

            arrType = type[0];
            keyCode = _getKeyCode(arrType[0]);

            if (keyCode == '_ANY_') {
                for(var ii = 0; ii < target.length; ii++) {
                    var tar = target[ii];
                    if (typeof tar === 'undefined') throw new Error('[_any_] 타입에 undefined 입력할 수 없습니다.');
                }
                return;
            } else if (keyCode == '_SEQ_') {
                for(var i = 1; i < arrType.length; i++) {
                    var tar = target[i - 1];
                    if (typeof tar === 'undefined') throw new Error('[target]은 [i]번째 배열값이 없습니다.');
                    _check(arrType[i], tar);
                    // returnMsg = _check(arrType[i], tar);    // TODO: 방식 변경 필요
                    // if (returnMsg.length > 0) return returnMsg;
                }
                return;
            } else if (keyCode == '_OPT_') {
                if (Array.isArray(target) && target.length === 0) return;
                if (arrType.length === 1) return;
                beginIdx = 1;
            }

            for (var i = 0; i < target.length; i++) {
                for (var ii = beginIdx; ii < arrType.length; ii++) {
                    var success = false;
                    try {
                        _check(arrType[ii], target[i]);
                        success = true;
                    } catch (error) {
                        continue;
                    }
                    if (success) return;

                    // returnMsg = _check(arrType[ii], target[i]);
                    // if(returnMsg.length === 0) return;
                    // else arrMsg.push(returnMsg);    //TODO: 방식 바꿔야 함 throw ...

                }
                throw new Error('array choice 검사가 실패하였습니다. ');; 
                // return arrMsg.toString();   // i 번째 값이 검사에 실패하였습니다.   //TODO: 방식 바꿔야 함 throw ...
            }
        }
        if (defType.name === 'function') {
            if (typeof target !== 'function') return Message.error('ES024', [parentName, 'function']);
            if (type === Function) return;
            // var func = type.toString().replace(/ /g,'');
            // if (func === 'function(){}' || func === '()=>{}') return '';
            // if (!checkAllowType(type, target)) return '';



            var fixType = type['_TYPE'] ? type['_TYPE'] : _getFunInfo(type.toString());
            var fixReturns = [];
            var tarType = target['_TYPE'];
            var tarArgs = [];
            var tarReturns = [];
            if (typeof fixType === 'string') throw new Error('target 의 function _TYPE 정보가 없습니다.');  // TODO: 방식 바꿔야함
            if (!fixType.return && fixType.args.length === 0) return;    // success
            if ((fixType.return || fixType.args.length > 0) && !tarType) throw new Error('targetdml function _TYPE 정보가 없습니다.');
            // if (!tarType) return 'target[_TYPE] 객체가 없습니다.' // Branch:
            if (typeof tarType.args === 'undefined' && typeof tarType.return === 'undefined') { // Branch:
            // if (!tarType.args || !(tarType.args.length > 0 || tarType.return)) { // Branch:
            throw new Error('function._TYPE = {args: [], return: []} function _TYPE 규칙이 다릅니다.');
            }
            tarArgs = (Array.isArray(tarType.args )) ? tarType.args : [tarType.args];   // Branch:
            if (fixType.return) fixReturns = (Array.isArray(fixType.return )) ? fixType.return : [fixType.return]; // Branch:
            if (tarType.return) tarReturns = (Array.isArray(tarType.return )) ? tarType.return : [tarType.return];    // Branch:
            // if (fixType.args.length !== tarArgs.length) return 'args.length ='+ fixType.args.length +' 길이가 서로 다릅니다.'
            // args 검사
            if (fixType.args.length > 0) {
                var seqArr1 = ['_SEQ_'].concat(fixType.args);
                var seqArr2 = ['_SEQ_'].concat(tarArgs);
                try {
                    checkAllowType(seqArr1, seqArr2)
                } catch (error) {
                    throw new Error('function args 허용타입이 아닙니다.\n'+ error);
                }
                // if (!checkAllowType(seqArr1, seqArr2)) throw new Error('function args 허용타입이 아닙니다.');
            }

            // for (var i = 0; i < fixType.args.length; i++) {
                
                // iType = typeKind(info.args[i]);
                // fType = typeKind(args[i]);
                // if (iType.name = fType.name) continue;
                // if (!checkAllowType(fixType.args[i], tarArgs[i])) return false;  // Branch:
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

            // }
            // return 검사
            // if (!checkAllowType(fixReturns, tarReturns)) throw new Error('function return 허용타입이 아닙니다.');
            try {
                checkAllowType(fixReturns, tarReturns)
            } catch (error) {
                throw new Error('function return 허용타입이 아닙니다. \n'+ error);
            }

            // if (fixReturns.length > tarReturns.length) return 'return.length ='+ fixReturns.length +' 길이가 서로 다릅니다.'
            // for (var i = 0; i < fixReturns.length; i++) {
            //     if (!checkAllowType(fixReturns[i], tarReturns[i])) return 'return 타입이 서로 다릅니다.'
            // }
            return;

            // inner function
            
            

        }
        // if (defType.name === 'function') {
        //     if (typeof target === 'function') return '';
        //     return Message.get('ES024', [parentName, 'function']);
        // }
        if (defType.name === 'object') {
            if (type === Object && target instanceof type) return;
            if (type !== Object && target instanceof type.constructor) return;
            return Message.error('ES024', [parentName, 'object']);
        }
        if (defType.name === 'class') {
        
            if (_isBuiltFunction(type)) {
                if (target instanceof type) return; 
                else return Message.error('ES032', [parentName, _typeName(type)]);
            } else {
                if (typeof target === 'object' && target instanceof type) return;
                if (typeof target === 'object' && target !== null) return _check(_creator(type), target, parentName);
                return Message.error('ES032', [parentName, _typeName(type)]);
            }
        }
        if (defType.name === 'union') {
            var list = getAllProperties(typeDef.type);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = typeKind(type[key]);
                var msg = '';
                
                // REVIEW: for 위쪽으로 이동 검토!
                if (!_isObject(target)) return Message.error('ES031', [parentName + '.' + key]);                 // target 객체유무 검사
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                if (listDefType.default !== null && typeof target[key] === 'undefined')      // default 설정
                    target[key] = listDefType.default;
                if (target !== null && !(key in target)) return Message.error('ES027', [listDefType.name, parentName + '.' + key]);    
                if (listDefType.name === 'class'){
                    if (typeof target[key] === 'function') continue;                        // class method
                    if (typeof target[key] === 'object' && target[key] instanceof type[key]) continue;
                    else return Message.error('ES031', [parentName + '.' + key]);
                } 
                _check(type[key], target[key], parentName +'.'+ key);
                // msg = _check(type[key], target[key], parentName +'.'+ key);
                // if (msg.length > 0) throw new Error(msg);
            }
            return;
        }
        return Message.error('ES022', [defType.name]);
    };

    /**
     * 전체 프로퍼티 조회
     * @memberof _L.Common.Util
     * @param {object} obj Object를 제외한 프로터피 리턴
     * @param {boolean?} hasObj Object를 포함 여부
     * @returns {array<string>}  
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

    /**
     * 객체를 비교합니다.
     * @param {object} obj1 
     * @param {object} obj2 
     * @returns {boolean}
     */
    var deepEqual = function(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== typeof obj2) return false;  // Branch:

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
                if (obj1.hasOwnProperty(key)) { // Branch:
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
     * 종류 : null, number, string, boolean, array, function, object, undefined, symbol, class, choice, union  
     * - class : 인스턴스  
     * - union : { aa:null, bb:null }  
     * - choice : [String]  
     * return {name: , default: null}  
     * @memberof _L.Common.Util
     * @param {any} type 대상타입
     * @returns {object} {name: string, default: [null, any]}
     */
    var typeKind = function(type) {
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
                    if (kind === 'class' || kind === 'interface') obj.name = 'class';   // Branch:
                    if (kind === 'function') obj.name = 'function'; // Branch:
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
    
    /**
     * 타입 검사
     * @memberof _L.Common.Util
     * @param {any} origin 
     * @param {any} target 
     * @returns {boolean} 
     */
    var isValidAllowType = function(origin, target) {
        try {
            checkAllowType(origin, target);
        } catch (error) {
            return false;
        }
        return true;
    };    

    /**
     * 원본타입에 대상타입이 덮어쓰기가 허용 가능한지 검사합니다.  
     * 원본타입에 대상타입으로 캐스팅이 가능하지 확인합니다.
     * @memberof _L.Common.Util
     * @param {any} ori 원본 타입
     * @param {any} tar 대상 타입
     * @returns {throw?}
     */
    var checkAllowType = function (ori, tar) {
        var def1 = typeKind(ori);
        var def2 = typeKind(tar);
        
        if (_isObject(ori) &&  _isObject(tar) && deepEqual(ori, tar)) return;
        // if (def1.name !== def2.name) return false;
        
        // 원시타입 타입
        if (['null', 'number', 'string', 'boolean', 'symbol', 'undefined'].indexOf(def1.name) > -1) {
            if(def1.default !== null && def1.default !== def2.default) throw new Error(def1.name+ ' 타입의 default 이 다릅니다. '+  def1.default);
            if (def1.name === def2.name) return;
            throw new Error(def1.name+ ' 원시타입이 서로 다릅니다. '+  def1.name);
        }
        if (def1.name === 'choice') {   // choice
            var keyCode1 = _getKeyCode(ori[0]);
            if (keyCode1 == '_ANY_') {
                if (typeof tar !== 'undefined') return;
                throw new Error('chice 에서  _ANY_ 에는 undefined 을 사용할 수 없습니다. ');
            } else if (keyCode1 == '_OPT_') {
                if (ori.length === 1) return;
            } else if (keyCode1 == '_SEQ_') throw new Error('chice 에서  _SEQ_ 는 사용할 수 없습니다. ');

            var keyCode2 = Array.isArray(tar) ? _getKeyCode(tar[0]) : undefined;
            var arrType2 = Array.isArray(tar) ? tar : [tar];
            var start1 = keyCode1 ? 1 : 0;
            var start2 = keyCode2 ? 1 : 0;
            if (ori.length - start1 < arrType2.length - start2) throw new Error(' 대상타입의 choice 조건이 더 큽니다. '+ arrType2);
            if (ori.length - start1 > 0 && arrType2.length - start2 === 0) throw new Error(' 원본타입의 choice 조건이 존재하지만, 대상타입에는 없습니다. '+ ori);
            for (i = start2; i < arrType2.length; i++) {
                var success = false;
                for (var ii = start1; ii < ori.length; ii++) {
                    try {
                        if (success) continue;
                        checkAllowType(ori[ii], arrType2[i]);
                        success = true;
                    } catch (error) {
                        continue;
                    }
                    // if (success) continue;
                    // if (checkAllowType(ori[ii], arrType2[i])) success = true;
                }
                if (!success) throw new Error(' 원본 choice 조건에 허용되지 않습니다. ');
            }
            return;
        }
        if (def1.name === 'array') {    // array
            if ((ori === Array || ori.length === 0 || (ori[0] && ori[0].length === 0)) 
            && (Array.isArray(tar) || tar === Array)) return;      // [], [[]], Array
            if (!Array.isArray(tar)) throw new Error(' 대상타입의 Array 타입이 아닙니다. ');
            // if (ori.length === 1 && Array.isArray(ori[0]) && ori[0].length === 0) return true;
            
            var keyCode1 = _getKeyCode(ori[0][0]);
            var keyCode2;
            if (tar[0] && tar[0][0]) keyCode2 = _getKeyCode(tar[0][0]);
            if (keyCode1 == '_ANY_') {
                if (keyCode2 && keyCode2 !== '_ANY_') throw new Error(' array 대상이 _ANY_ 타입이 아닙니다. '+ keyCode2);
                if (typeof tar[0] === 'undefined' || typeof tar[0][0] === 'undefined') throw new Error('원본은 _ANY_ 타입이지만 대상이 undefined 입니다. ');
                if (tar[0].length > 0) return;
                // if (tar[0].length > 0) return true
                // else return false;   
            
            } else if (keyCode1 == '_OPT_') {
                if (typeof tar[0] === 'undefined' || tar[0].length === 0) return;
                // if (type1[0].length === 1 && keyCode2 === '_ANY_') return true;
                if (ori[0].length === 1) return;
                // if (keyCode1 !== keyCode2) return false;
                var start1 = keyCode1 ? 1 : 0;
                var start2 = keyCode2 ? 1 : 0;
                if (ori[0].length - start1 < tar[0].length - start2) throw new Error(' _OPT_ 대상타입의 choice 조건이 더 큽니다. '+ tar[0]);
                if (ori[0].length - start1 > 0 && tar[0].length - start2 === 0) throw new Error(' _OPT_ 원본타입의 choice 조건이 존재하지만, 대상타입에는 없습니다. '+ ori);
                for (var i = start2; i < tar[0].length; i++) {
                    var success = false;
                    for (var ii = start1; ii < ori[0].length; ii++) {
                        try {
                            if (success) continue;
                            checkAllowType(ori[0][ii], tar[0][i]);
                            success = true;
                        } catch (error) {
                            continue;
                        }
                        // if (success) continue;
                        // if (checkAllowType(ori[0][ii], tar[0][i])) success = true;
                    }
                    if (!success)  throw new Error(' array choice 조건에 허용되지 않습니다. ');
                }
                return;
            
            } else if (keyCode1 == '_SEQ_') {   // Branch:
                if (keyCode1 !== keyCode2)  throw new Error(' array 대상이 _SEQ_ 타입이 아닙니다. '+ keyCode2);
                if (ori[0].length > tar[0].length) throw new Error(' array 대상 _SEQ_ 타입이 적습니다. '+ tar[0]);
                for (var i = 1; i < ori[0].length; i++) {
                    try {
                        checkAllowType(ori[0][i], tar[0][i]);
                    } catch (error) {
                        throw new Error(' array _SEQ_ 조건에 허용되지 않습니다. \n'+ error);
                    }
                    

                    // if (!checkAllowType(ori[0][i], tar[0][i])) 
                }
                return;
            }
            throw new Error(' array choice 처리할 타입이 없습니다. ');
        }
        
        if (def1.name === 'function') { // function
            if (def2.name !== 'function') throw new Error(' function 의 대상이 function 타입이 아닙니다. ');
            if (ori === Function) return;
            var info1 = ori['_TYPE'] ? ori['_TYPE'] : _getFunInfo(ori.toString());
            var info2 =  tar['_TYPE'] ? tar['_TYPE'] : _getFunInfo(tar.toString());
            // if (typeof info1 === 'string') return info1;
            if (!info1.return && info1.args.length === 0) return;
            // if (typeof info2 === 'string') return info2;
            if (info1.args.length !== info2.args.length) throw new Error(' function 의 args타입의 길이가 서로 다릅니다. ');
            for (var i = 0; i < info1.args.length; i++) {
                try {
                    checkAllowType(info1.args[i], info2.args[i]);
                } catch (error) {
                    throw new Error(' function 의 args 타입 조건이 허용되지 않습니다. \n'+ error);
                }
                
                // if (!checkAllowType(info1.args[i], info2.args[i])) throw new Error(' function 의 args타입 조건이 허용되지 않습니다. ');
            }
            try {
                checkAllowType(info1.return, info2.return);
            } catch (error) {
                throw new Error(' function 의 return 타입 조건이 허용되지 않습니다. \n'+ error);
            }
            

            return;
        }
        if (def1.name === 'object') {
            if (def2.name !== 'object') throw new Error(' object 의 대상이 object 타입이 아닙니다. ');
            if (ori === tar) return;
            if (_isEmptyObj(tar)) return;
            if (ori instanceof RegExp) {
                if (!(tar instanceof RegExp) || ori.source !== tar.source) throw new Error(' RegExp의 source가 서로 다릅니다. '+ ori.source);
            }
            if (deepEqual(ori, tar)) return;
            throw new Error(' object 의 대상이 거부되었습니다. ');
        }
        if (def1.name === 'class') {
            if (ori === tar) return;
            try {
                var obj1 = new ori();
                var obj2 = new tar();
                if (deepEqual(obj1, obj2)) return;
            } catch (error) {
                throw new Error(' class 타입의 비교중에 오류가 발생하였습니다. ');
            }
            throw new Error(' class 타입의 생성 객체가 서도 다릅니다. ');
        }
        if (def1.name === 'union') {    // Branch:
            var list = getAllProperties(ori);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                try {
                    checkAllowType(ori[key], tar[key])
                } catch (error) {
                    throw new Error(' union 타입 조건이 허용되지 않습니다. \n'+ error);
                }
                // if (!checkAllowType(ori[key], tar[key])) throw new Error(' union 타입의 거부되었습니다. ');
            }
            return;
        }
    };

    

    /**
     * 타입 검사
     * @memberof _L.Common.Util
     * @param {any} chkType 
     * @param {any} target 
     * @returns {boolean} 
     */
    var isValidType = function(chkType, target) {
        if (typeof chkType === 'undefined') return false;
        try {
            _check(chkType, target);
            
        } catch (error) {
            return false;
        }
        return true;
    };

    /**
     * 타입 검사 
     * @memberof _L.Common.Util
     * @param {any} chkType 
     * @param {any} target 
     * @returns {throw?} 실패시 예외를 던진다.
     */
    var checkType = function(chkType, target) {
        var msg = '';

        if (typeof chkType === 'undefined') Message.error('ES026', ['chkType']);    // Branch:
        
        
        try {
            _check(chkType, target);
            
        } catch (error) {
            Message.error('ES069', ['check type', error]);
        }
        
        // _check(chkType, target);
        // msg = _check(chkType, target);
        // if(msg.length === 0) return;
        // Message.error('ES069', ['check type', msg]);
    };


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.getAllProperties = getAllProperties;
        exports.deepEqual = deepEqual;
        // exports._check = _check;
        exports.typeKind = typeKind;
        exports.isValidType = isValidType;
        exports.checkType = checkType;
        exports.isValidAllowType = isValidAllowType;
        exports.checkAllowType = checkAllowType;
    } else {
        var ns = {
            getAllProperties: getAllProperties,
            deepEqual: deepEqual,
            // _check: _check,
            typeKind: typeKind,
            isValidType: isValidType,
            checkType: checkType,
            isValidAllowType: isValidAllowType,
            checkAllowType: checkAllowType
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;
    }

}(typeof window !== 'undefined' ? window : global));