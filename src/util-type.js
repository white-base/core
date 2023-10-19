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

            if (regChk.test(funBody) === false) Message.error('ES071', [funBody]);
            arrFunc = regFunc.exec(funBody);
            if (arrFunc === null) Message.error('ES072', [funBody]);

            arrParam = (new Function('return ['+ arrFunc[1] +']'))();
            result.args = arrParam;
            
            if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))()
            result.return = arrRetrun;

        } catch (error) {
            Message.error('ES073', [error]);
        }

        return result;
    }



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
        var obj =  {name: '', val: type, default: null, opt: null};

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
            if (type.length ===  1 && Array.isArray(type[0])) {
                obj.name = 'choice';
                obj.opt = _getKeyCode(type[0][0]);
                obj.val = type[0];
            } else {
                obj.name = 'array';
                obj.opt = _getKeyCode(type[0]);
            }
            return obj;
        }
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
        var oriDef = typeKind(ori);
        var tarDef = typeKind(tar);
        
        if (_isObject(oriDef.val) &&  _isObject(tarDef.val) && deepEqual(oriDef.val, tarDef.val)) return;
        
        // 원시타입 타입
        if (['null', 'number', 'string', 'boolean', 'symbol', 'undefined'].indexOf(oriDef.name) > -1) {
            if(oriDef.default !== null && oriDef.default !== tarDef.default) {
                Message.error('ES0712', [oriDef.name, oriDef.default, tarDef.default]);
            }
            if (oriDef.name === tarDef.name) return;
                Message.error('ES0713', [oriDef.name, tarDef.name]);
        }
        if (oriDef.name === 'choice') {   // choice
            if (oriDef.val.length === 0) throw new Error('chice 에서 타입이 없습니다. ');
            if (oriDef.opt == '_ANY_') {
                if (typeof tarDef.val !== 'undefined') return;
                Message.error('ES0714', ['_ANY_', 'undefined']);
            } else if (oriDef.opt == '_OPT_') {
                if (oriDef.val.length === 1) return;
            } else if (oriDef.opt == '_SEQ_') Message.error('ES0715', ['_SEQ_']);

            var arrTarget = Array.isArray(tarDef.val) ? tarDef.val : [tarDef.val];
            var start1 = oriDef.opt ? 1 : 0;
            var start2 = tarDef.opt ? 1 : 0;
            if (oriDef.val.length - start1 < arrTarget.length - start2) {
                Message.error('ES0716', ['choice', oriDef.val.join(','), arrTarget.join(',')]);
            }
            if (oriDef.val.length - start1 > 0 && arrTarget.length - start2 === 0) {
                Message.error('ES0717', ['choice']);
            }
            for (i = start2; i < arrTarget.length; i++) {
                var success = false;
                for (var ii = start1; ii < oriDef.val.length; ii++) {
                    try {
                        if (success) continue;
                        checkAllowType(oriDef.val[ii], arrTarget[i]);
                        success = true;
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) Message.error('ES0718', ['choice']);
            }
            return;
        }
        if (oriDef.name === 'array') {    // array
            if ((oriDef.val === Array || oriDef.val.length === 0) && (Array.isArray(tarDef.val) || tarDef.val === Array)) return;      // [], [[]], Array
            if (!Array.isArray(tarDef.val)) Message.error('ES0719', ['array']);
            if (oriDef.opt == '_ANY_') {
                if (tarDef.opt && tarDef.opt !== '_ANY_') Message.error('ES0713', ['array _ANY_', tarDef.opt]);
                if (typeof tarDef.val === 'undefined' || typeof tarDef.val[0] === 'undefined') Message.error('ES075', ['array _ANY_', 'undefined']);
                if (tarDef.val.length > 0) return;
            
            } else if (oriDef.opt == '_OPT_') {
                if (typeof tarDef.val === 'undefined' || tarDef.val.length === 0) return;
                if (oriDef.val.length === 1) return;
                var start1 = oriDef.opt ? 1 : 0;
                var start2 = tarDef.opt ? 1 : 0;
                if (oriDef.val.length - start1 < tarDef.val.length - start2) {
                    Message.error('ES0716', ['array _OPT_', oriDef.val.join(','), tarDef.val.join(',')]);
                }
                if (oriDef.val.length - start1 > 0 && tarDef.val.length - start2 === 0) {
                    Message.error('ES0717', ['array']);
                }
                for (var i = start2; i < tarDef.val.length; i++) {
                    var success = false;
                    for (var ii = start1; ii < oriDef.val.length; ii++) {
                        try {
                            if (success) continue;
                            checkAllowType(oriDef.val[ii], tarDef.val[i]);
                            success = true;
                        } catch (error) {
                            continue;
                        }
                    }
                    if (!success) Message.error('ES0718', ['array']);
                }
                return;
            
            } else if (oriDef.opt == '_SEQ_') {   // Branch:
                if (oriDef.opt !== tarDef.opt)  Message.error('ES0719', ['_SEQ_']);
                if (oriDef.val.length > tarDef.val.length) Message.error('ES0720', ['array', '_SEQ_']);
                for (var i = 1; i < oriDef.val.length; i++) {
                    try {
                        checkAllowType(oriDef.val[i], tarDef.val[i]);
                    } catch (error) {
                        Message.error('ES0711', ['array', '_SEQ_', error]);
                    }
                }
                return;

            } else {
                try {
                    checkAllowType([oriDef.val], [tarDef.val]);
                    return;
                } catch (error) {
                    Message.error('ES0711', ['array', '', error]);
                }
            }
        }
        if (oriDef.name === 'function') { // function
            if (tarDef.name !== 'function')  Message.error('ES0713', ['function', oriDef.name, tarDef.name]);
            if (oriDef.val === Function) return;
            var info1 = oriDef.val['_TYPE'] ? oriDef.val['_TYPE'] : _getFunInfo(oriDef.val.toString());
            var info2 =  tarDef.val['_TYPE'] ? tarDef.val['_TYPE'] : _getFunInfo(tarDef.val.toString());
            if (!info1.return && info1.args.length === 0) return;
            if (info1.args.length !== info2.args.length) Message.error('ES0721', ['function', 'args', info1.args.length]);
            
            try {
                checkAllowType(['_SEQ_'].concat(info1.args), ['_SEQ_'].concat(info2.args));
            } catch (error) {
                Message.error('ES0722', ['function', 'args', error]);
            }

            try {
                checkAllowType(info1.return, info2.return);
            } catch (error) {
                    Message.error('ES0722', ['function', 'return', error]);
            }
            return;
        }
        if (oriDef.name === 'object') {
            if (tarDef.name !== 'object') Message.error('ES0713', ['object', oriDef.name, tarDef.name]);
            if (oriDef.val === tarDef.val) return;
            if (_isEmptyObj(tarDef.val)) return;
            if (oriDef.val instanceof RegExp) {
                if (!(tarDef.val instanceof RegExp) || oriDef.val.source !== tarDef.val.source) {
                    Message.error('ES0723', [oriDef.val.source, tarDef.val.source]);
                }
            }
            if (deepEqual(oriDef.val, tarDef.val)) return;
                Message.error('ES0718', ['object']);
        }
        if (oriDef.name === 'class') {
            if (oriDef.val === tarDef.val) return;
            try {
                var obj1 = new oriDef.val();
                var obj2 = new tarDef.val();
                if (deepEqual(obj1, obj2)) return;
            } catch (error) {
                Message.error('ES0724', ['object', error]);
            }
            Message.error('ES0725', ['object']);
        }
        if (oriDef.name === 'union') {
            var list = getAllProperties(oriDef.val);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                try {
                    checkAllowType(oriDef.val[key], tarDef.val[key])
                } catch (error) {
                    Message.error('ES0726', ['union', error]);
                }
            }
            return;
        }
    };

    /**
     * 타입을 검사하여 메세지를 리턴
     * @param {any} type 검사할 타입 , origin
     * @param {any} target 검사대상
     * @param {string?} parentName '' 공백시 성공
     * @returns {throw?}
     */
    var process = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        // var typeDef = {type: type, name: '', default: null, option: null};
        var returnMsg = '', arrMsg = [];
        var defType;

        defType = typeKind(type);
        
        
        if (defType.name === 'undefined') {
            if (typeof target === 'undefined') return;
            Message.error('ES074', [parentName, 'undefined']);
        }
        if (defType.name === 'null') {
            if (target === null) return;
            Message.error('ES074', [parentName, 'null']);
        }
        if (defType.name === 'number') {
            if (defType.default && typeof target === 'undefined') target = defType.default; 
            if (typeof target === 'number') return;
            Message.error('ES074', [parentName, 'number']);
        }
        if (defType.name === 'string') {
            if (defType.default && typeof target === 'undefined') target = defType.default;
            if (typeof target === 'string') return;
            Message.error('ES074', [parentName, 'string']);
        }
        if (defType.name === 'boolean') {
            if (defType.default && typeof target === 'undefined') target = defType.default;
            if (typeof target === 'boolean') return;
            Message.error('ES074', [parentName, 'boolean']);
        }
        if (defType.name === 'symbol') {
            if (typeof target === 'symbol') return '';
            Message.error('ES074', [parentName, 'symbol']);
        }
        if (defType.name === 'choice') {
            var beginIdx = 0;
            if (defType.opt == '_ANY_') {
                if (typeof target !== 'undefined') return;
                Message.error('ES075', ['choice', '_ANY_', 'undefined']);
            } else if (defType.opt == '_OPT_') {
                if (typeof target === 'undefined') return;
                if (defType.val.length === 1) return;
                beginIdx = 1;
            } else if (defType.opt == '_SEQ_') {
                Message.error('ES077', ['choice', '_SEQ_']);
            }
            for (var ii = beginIdx; ii < defType.val.length; ii++) {
                try {
                    process(defType.val[ii], target);
                    return;
                } catch (error) {
                    continue;
                }
            }
            Message.error('ES076', ['choice']);

        }
        if (defType.name === 'array') {
            if ((type === Array || type.length === 0) && (Array.isArray(target) || target === Array)) return;
            if (!Array.isArray(target)) return Message.error('ES024', [parentName, 'array']);
            var beginIdx = 0;
            if (defType.opt == '_ANY_') {
                for(var ii = 0; ii < target.length; ii++) {
                    var tar = target[ii];
                    if (typeof tar === 'undefined') Message.error('ES075', ['array', '_ANY_', 'undefined']);
                }
                return;
            } else if (defType.opt == '_SEQ_') {
                for(var i = 1; i < defType.val.length; i++) {
                    var tar = target[i - 1];
                    if (typeof tar === 'undefined') Message.error('ES075', ['array', '_SEQ_', i]);
                    process(defType.val[i], tar);
                }
                return;
            } else if (defType.opt == '_OPT_') {
                if (Array.isArray(target) && target.length === 0) return;
                if (defType.val.length === 1) return;
                beginIdx = 1;
            }
            for (var i = 0; i < target.length; i++) {
                for (var ii = beginIdx; ii < defType.val.length; ii++) {
                    try {
                        process(defType.val[ii], target[i]);
                        return;
                    } catch (error) {
                        continue;
                    }
                }
                Message.error('ES076', ['array']);
            }
        }
        if (defType.name === 'function') {
            if (typeof target !== 'function') return Message.error('ES024', [parentName, 'function']);
            if (type === Function) return;
            var fixType = type['_TYPE'] ? type['_TYPE'] : _getFunInfo(type.toString());
            var fixReturns = [];
            var tarType = target['_TYPE'];
            var tarArgs = [];
            var tarReturns = [];
            if (!fixType.return && fixType.args.length === 0) return;    // success
            if ((fixType.return || fixType.args.length > 0) && !tarType) Message.error('ES079', ['target', 'function', '_TYPE']);
            if (typeof tarType.args === 'undefined' && typeof tarType.return === 'undefined') { 
                Message.error('ES0710', ['target', 'function', ' {args: [], return: []} ']);
            }
            tarArgs = (Array.isArray(tarType.args )) ? tarType.args : [tarType.args];
            if (fixType.return) fixReturns = (Array.isArray(fixType.return )) ? fixType.return : [fixType.return]; 
            if (tarType.return) tarReturns = (Array.isArray(tarType.return )) ? tarType.return : [tarType.return];
            
            if (fixType.args.length > 0) {  // args 검사
                try {
                    checkAllowType(['_SEQ_'].concat(fixType.args), ['_SEQ_'].concat(tarArgs))
                } catch (error) {
                    Message.error('ES0711', ['function', 'args', error]);
                }
            }
            if (fixReturns.length > 0) {
                try {
                    checkAllowType(fixReturns, tarReturns)
                } catch (error) {
                        Message.error('ES0711', ['function', 'return', error]);
                }
            }
            return;
        }
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
                if (typeof target === 'object' && target !== null) return process(_creator(type), target, parentName);
                return Message.error('ES032', [parentName, _typeName(type)]);
            }
        }
        if (defType.name === 'union') {
            var list = getAllProperties(defType.val);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = typeKind(type[key]);
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
                process(type[key], target[key], parentName +'.'+ key);
            }
            return;
        }
        return Message.error('ES022', [defType.name]);
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
            process(chkType, target);
            
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
            process(chkType, target);
            
        } catch (error) {
            Message.error('ES069', ['check type', error]);
        }
    };


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.getAllProperties = getAllProperties;
        exports.deepEqual = deepEqual;
        exports.typeKind = typeKind;
        exports.isValidType = isValidType;
        exports.checkType = checkType;
        exports.isValidAllowType = isValidAllowType;
        exports.checkAllowType = checkAllowType;
    } else {
        var ns = {
            getAllProperties: getAllProperties,
            deepEqual: deepEqual,
            // process: process,
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