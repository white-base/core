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

    function _isPrimitiveType(obj) {
        // 원시타입인지...
    }

    function _isUpper(strValue) {
        var firstStr = strValue.charAt(0);
        if (firstStr === '') return false;
        if(firstStr === firstStr.toUpperCase()) return true;
        else false;
    }

    /**
     * 리터럴 여부  
     * number, string, boolean, bigint, RexExp instance
     * @param {*} obj 
     * @returns 
     */
    function _isLiteral(obj) {
        if (typeof obj  === 'number') return true;
        if (typeof obj  === 'string') return true;
        if (typeof obj  === 'boolean') return true;
        if (typeof obj  === 'bigint') return true;
        if (obj instanceof RegExp) return true;
    }

    /**
     * 리터럴값 비교
     * @param {*} obj1 
     * @param {*} obj2 
     * @returns 
     */
    function _equalLiternal(obj1, obj2) {
        // var primitiveType = ['number', 'string', 'boolean', 'bigint'];
        // if (typeof obj1 !== typeof obj2) return false; 
        // if (primitiveType.indexOf(typeof obj1) > -1 && obj1 === obj2) return true;
        if (obj1 === obj2) return true;
        if (obj1 instanceof RegExp && obj2 instanceof RegExp && obj1.source === obj2.source) return true;
        return false;
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
        return obj['name'];
        // if (typeof obj === 'function') return obj['name'];
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
     * - (params 내부에는 '()' 입력 금지)  
     * - 참조형 타입 금지 : new Function() 시점에 자동 해석됨  
     * @param {*} funBody 
     * @returns {object}
     */
    function _getFunInfo(funBody) {
        var syntax1 = /\([,_\[\]{:}\w\s]*\)\s*(?:=>)?\s*{\s*.*\s*.*\s*}/;    // 제한 규칙
        var syntax2 = /(\(.*\)|\w+)\s*(?:=>).*/;
        var regFunc1 = /(?:function\s)?\(([\[\]{:}\s\w,]*)\)\s*(?:=>)?\s*{(?:\s*return\s+|\s*)?([\[\]{:}\s\w,]*);?\s*}/;
        var regFunc2 = /\(?([\[\]{:}\s\w,]*)\)?\s*(?:=>)\s*{?(?:\s*return\s+|\s*)?([\[\]{:}\s\w,]*);?\s*}?/;
        
        var arrFunc, arrParam;
        var result = { params: [], return: undefined };
        var arrParam = [];
        var arrRetrun;
        
        funBody = skipComment(funBody);

        try {

            if (syntax1.test(funBody)) {
                arrFunc = regFunc1.exec(funBody);
            } else if (syntax2.test(funBody)) {
                arrFunc = regFunc2.exec(funBody);
            } else Message.error('ES071', [funBody]);
            
            if (arrFunc === null) Message.error('ES072', [funBody]);

            arrParam = (new Function('return ['+ arrFunc[1] +']'))();
            result['params'] = arrParam;
            
            if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))()
            result['return'] = arrRetrun;

        } catch (error) {
            Message.error('ES073', [error]);
        }

        return result;

        // inner function
        // 주석 제거 comment
        function skipComment(body) {
            var rBody = body;
            var bloackComment = /\/\*[^](.*?)\*\//g
            var lineComment = /\/\/[^](.*?)(\n|$)/g

            rBody = rBody.replace(bloackComment, '');
            rBody = rBody.replace(lineComment, '');
            return rBody;
        }
    }

    function _hasType(name) {
        var arr = [];
        
        arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
        arr = arr.concat(['array', 'function', 'object']);
        arr = arr.concat(['choice', 'union', 'class']);
        arr = arr.concat(['symbol', 'bigint', 'regexp']);

        if (typeof name !== 'string') return false;
        return arr.indexOf(name) > -1;
    }
    
    // function _parentFunction(obj) {
    //     var list = [];
    //     var proto = obj.__proto__ || Object.getPrototypeOf(obj);
    //     if (proto) {
    //         list.push(proto.constructor);
    //         list = list.concat(_parentFunction(proto));
    //     }
    //     return list;
    // }

    /**
     * 전체 프로퍼티 조회
     * @memberof _L.Common.Util
     * @param {object} obj Object를 제외한 프로터피 리턴
     * @param {boolean?} hasObj Object를 포함 여부
     * @returns {array<string>}  
     */
    var getAllProperties = function(obj, hasObj) {
        var allProps = [], cur = obj;
        var is = hasObj || false;
        do {
            var props = Object.getOwnPropertyNames(cur);
            
            // props.forEach(function(prop) {
            //     if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop)))
            //         allProps.push(prop);
            // });
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop)))
                    allProps.push(prop);
            }
        } while (cur = Object.getPrototypeOf(cur))
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
                    // if (!_isObject(val1)) continue;
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
     * 대상의 상위를 포함하여 '_UNION'과 자신의 타입 목록을 가져옵니다.
     * @memberof _L.Common.Util
     * @param {function} ctor 생성자
     * @returns {array<function>}
     */
    var getTypes = function (ctor) {
        var arr = [];
        var tempArr = [];
        var union;
        var proto;

        if (typeof ctor !== 'function') return;
        
        arr.push(ctor);
        union = ctor['_UNION'] || [];
        proto = getPrototype(ctor);        
        
        if (proto !== Function.prototype) {
            arr = arr.concat(getTypes(proto));
        }
        for (var i = 0; i < union.length; i++) {
            arr = arr.concat(getTypes(union[i]));
        }
        for (var i = 0; i < arr.length; i++) {
            var idx = tempArr.indexOf(arr[i]);
            if (idx < 0) tempArr.push(arr[i]);
        }
        return tempArr;

        // innner function
        function getPrototype(ctor) {
            if (ctor.hasOwnProperty('super')) return ctor.super;
            return  Object.getPrototypeOf(ctor) || ctor.__proto__;
        }
    }

    /**
     * 생성자의 상위 또는 _UNION 에 지정된 생성자의 타입과 같은지 검사합니다.
     * @memberof _L.Common.Util
     * @param {function} ctor 생성자
     * @param {function | string} target 검사 대상
     * @returns {boolean}
     */
    var isType = function(ctor, target) {
        if (typeof ctor !== 'function') return false;
        var arr = getTypes(ctor);
        
        for (var i = 0; i < arr.length; i++) {
            if (typeof target === 'string') {
                if (target === arr[i].name) return true;    // Line:
            } else if (typeof target === 'function') {
                if (target === arr[i]) return true;
            }
        }
        return false;
    }

    /**
     * 타입의 세부 정보
     * @param {*} type 
     */
    var typeObject = function(type) {
        var obj = {};
        var typeObj = extendType(type);
        var leafType = ['null', 'undefined', 'number', 'string', 'boolean', 'symbol', 'bigint', 'object', 'regexp'];

        obj['$type'] = typeObj['$type'];
        // obj['ref'] = typeObj['ref'];
        
        if (typeObj['default'] !== null) obj['default'] = typeObj['default'];
        if (typeObj['kind'] !== null) obj['kind'] = typeObj['kind'];
        if (typeObj['params']) obj['params'] = typeObj['params'];
        if (typeObj['return']) obj['return'] = typeObj['return'];
        // if (typeObj['list']) obj['list'] = typeObj['list'];

        if (leafType.indexOf(obj['$type']) > -1) {
            if (typeObj['return']) obj['default'] = typeObj['default'];
            return obj;
        }
        // array, function, choice, union, class
        if (obj['$type'] === 'array' ||  obj['$type'] === 'choice') {
            obj['list'] = [];
            for(var i = 0; i < typeObj['list'].length; i++) {
                obj['list'][i] = typeObject(typeObj['list'][i]);
            }
            // return obj;
        }
        if (obj['$type'] === 'function') {
            for(var i = 0; i < obj['params'].length; i++) {
                obj['params'][i] = typeObject(typeObj['params'][i]);
            }
            if (typeObj['return']) obj['return'] = typeObject(typeObj['return']);
            // return obj;
        }
        if (obj['$type'] === 'class') {
            obj['creator'] = typeObj['ref'].name; 
            // obj['_union'] = {};
            var temp = _creator(typeObj['ref']);
            obj['_instance'] = typeObject(temp);
            // var list = getAllProperties(temp);
            // for (var i = 0; i < list.length; i++) {
            //     var key = list[i];
            //     if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
            //     obj['_union'][key] = typeObject(temp[key]);
            // }
            // return obj;
        }
        if (obj['$type'] === 'union') {
            // obj['val'] = {};
            var temp = typeObj['ref'];
            var list = getAllProperties(temp);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                obj[key] = typeObject(temp[key]);
            }
            // return obj;
        }
        return obj;
    };

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
    var extendType = function(type) {
        var obj =  {$type: '', ref: type, default: null, kind: null};

        obj.toString = function(){
            var temp = '';
            var arr = [];
            if (this['$type'] === 'array' || this['$type'] === 'choice') {
                for (var i = 0; i < this['list'].length; i++) {
                    var _type = extendType(this['list'][i]);
                    if (_type['kind']) arr.push(extendType(this['list'][i]).toString());
                    else arr.push(_type['$type']);
                }
                temp = arr.join(',');
            } else {
                temp = this['$type'];
                if (this['default']) temp += '('+this['default']+')';
            }
            return temp;
        }
        // special type
        if (typeof type === 'object'  && type !== null && type['$type']) {
            
            if (type['$type']) obj['$type'] = type['$type'];
            if (type['default']) obj['default'] = type['default'];
            if (type['kind']) obj['kind'] = type['kind'];
            if (type['ref']) obj['ref'] = type['ref'];
            if (type['list']) obj['list'] = type['list'];
            if (type['name']) obj['name'] = type['name'];   // REVIEW: 함수명 명시적 지정시
            if (type['params']) obj['params'] = type['params'];
            if (type['return']) obj['return'] = type['return'];

            if (!_hasType(obj['$type'])) Message.error('ES022', ['type']);
            return obj;
        }
        // seq 1 : === (operation) 
        if (type === null) {
            obj['$type'] = 'null';
            return obj;
        }
        if (type === Number) {
            obj['$type'] = 'number';
            return obj;
        }
        if (type === String) {
            obj['$type'] = 'string';
            return obj;
        }
        if (type === Boolean) {
            obj['$type'] = 'boolean';
            return obj;
        }
        if (type === Array) {
            obj['$type'] = 'array';
            obj['kind'] = '_ALL_';
            obj['list'] = [];
            return obj;
        }
        if (type === Function) {
            obj['$type'] = 'function';
            obj['params'] = [];
            return obj;
        }
        if (type === Object) {
            obj['$type'] = 'object';
            return obj;
        }
        if (type === RegExp) {
            obj['$type'] = 'regexp';
            return obj;
        }
        if (type instanceof RegExp) {
            obj['$type'] = 'regexp';
            obj['default'] = type;
            return obj;
        }
        if (type === Symbol) {      // ES6+
            obj['$type'] = 'symbol';
            return obj;
        }
        if (type === BigInt) {      // ES6+
            obj['$type'] = 'bigint';
            return obj;
        }
        // seq 2 : typeof
        if (typeof type === 'undefined') {
            obj['$type'] = 'undefined';
            return obj;
        }
        if (typeof type === 'number') {
            obj['$type'] = 'number';
            obj['default'] = type;
            return obj;
        }
        if (typeof type === 'string') {
            obj['$type'] = 'string';
            obj['default'] = type;
            return obj;
        }
        if (typeof type === 'boolean') {
            obj['$type'] = 'boolean';
            obj['default'] = type;
            return obj;
        }
        if (typeof type === 'symbol') { // ES6+
            obj['$type'] = 'symbol';
            return obj;
        }
        if (typeof type === 'bigint') { // ES6+
            obj['$type'] = 'bigint';
            obj['default'] = type;
            return obj;
        }
        if (typeof type === 'function') {
            var kind = type['_KIND'];
            if (kind) {
                kind = kind.toLowerCase();
                if (kind === 'class' || kind === 'interface') obj['$type'] = 'class';
                if (kind === 'function') obj['$type'] = 'function';
            } else {
                obj['$type'] = _isUpper(type.name) ? 'class' : 'function';
            }
            if (obj['$type'] === 'function') {
                try {
                    var funcType  = type['_TYPE'] ? type['_TYPE'] : _getFunInfo(type.toString());
                    obj['params'] = funcType['params'];
                    obj['return'] = funcType['return'];
                } catch (err) {
                    obj['params'] = [];
                }
            } else if (obj['$type'] === 'class') {
                // TODO::
            }
            return obj;
        }
        // seq 3 : instanceof
        if (Array.isArray(type)) {
            if (type.length ===  1 && Array.isArray(type[0])) {
                obj['$type'] = 'choice';
                if (type[0].length === 0) obj['kind'] = '_ANY_';
                else obj['kind'] = _getKeyCode(type[0][0]);
                obj['list'] = obj['kind'] ? type[0].slice(1) : type[0];
            } else {
                obj['$type'] = 'array';
                if (type.length === 0) obj['kind'] = '_ANY_';
                else obj['kind'] = _getKeyCode(type[0]);
                obj['list'] = obj['kind'] ? type.slice(1) : type;
            }
            if (!obj['kind']) obj['kind'] = '_OPT_';
            return obj;
        }
        // seq 4: funciton
        if (_isFillObj(type)) {
            obj['$type'] = 'union';
            return obj;
        }
        if (_isEmptyObj(type)) {        // {..}, 빈 생성자
            // obj['$type'] = 'object';
            obj['$type'] = 'union';
            return obj;
        }
        if(_isPrimitiveObj(type)) {
            obj['$type'] = 'object';
            return obj;
        }
        Message.error('ES022', ['type']);
    }

    /**
     * 타입명 얻습니다.
     * @param {*} type 
     * @returns {string}
     */
    var typeOf = function (type) {
        return extendType(type)['$type'];
    };

    /**
     * 원본타입에 대상타입이 덮어쓰기가 허용 가능한지 검사합니다.  
     * 원본타입에 대상타입으로 캐스팅이 가능하지 확인합니다.
     * @memberof _L.Common.Util
     * @param {any} ori 원본 타입
     * @param {any} tar 대상 타입
     * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
     * @returns {throw?}
     */
    var _execAllow = function (ori, tar, opt) {
        var oriDef = extendType(ori);
        var tarDef = extendType(tar);
        
        opt = opt || 0;

        if (_isObject(oriDef['ref']) &&  _isObject(tarDef['ref']) && deepEqual(oriDef, tarDef)) return;
        // ori seq, opt 필수 검사
        if (oriDef['kind']) {
            if ((oriDef['kind'] === '_SEQ_' || oriDef['kind'] === '_OPT_') 
            && (typeof oriDef['ref'] === 'undefined' || oriDef['list'].length === 0)) {
                Message.error('ES0729', ['origin', oriDef['kind']]);
            }
        }
        // tar seq, opt 필수 검사
        if (tarDef['kind']) {
            if ((tarDef['kind'] === '_SEQ_' || tarDef['kind'] === '_OPT_') 
            && (typeof tarDef['ref'] === 'undefined' || tarDef['list'].length === 0)) {
                Message.error('ES0729', ['target', tarDef['kind']]);
            }
        }

        if ((oriDef['kind']) && (tarDef['kind']) && oriDef['$type'] === tarDef['$type']) {
            // 거부조건
            if (oriDef['kind'] === '_ALL_' && (tarDef['kind'] === '_NON_')) {
                Message.error('ES0727', [oriDef['kind'], '_NON_', tarDef['kind']]);
            } 
            if (oriDef['kind'] === '_NON_' && tarDef['kind'] !== '_NON_') { 
                Message.error('ES0728', [oriDef['kind'], '_NON_', tarDef['kind']]);
            }
            if (oriDef['kind'] === '_ANY_' && (tarDef['kind'] === '_ALL_' || tarDef['kind'] === '_OPT_' || tarDef['kind'] === '_NON_')) {
                Message.error('ES0727', [oriDef['kind'], '_REQ_, _ALL_, _NON_', tarDef['kind']]);
            }
            if (oriDef['kind'] === '_OPT_' && (tarDef['kind'] === '_ALL_' || tarDef['kind'] === '_ANY_' || tarDef['kind'] === '_NON_') ){
                Message.error('ES0728', [oriDef['kind'], '_OPT_, _SEQ_', tarDef['kind']]);
            } 
            if (oriDef['kind'] === '_REQ_' && (tarDef['kind'] === '_ALL_' || tarDef['kind'] === '_ANY_' ||  tarDef['kind'] === '_OPT_' || tarDef['kind'] === '_NON_')) {
                Message.error('ES0727', [oriDef['kind'], '_ANY_, _ALL_, _OPT_, _NON_', tarDef['kind']]);
            }
            if (oriDef['kind'] === '_SEQ_' && tarDef['kind'] !== '_SEQ_') { 
                Message.error('ES0728', [oriDef['kind'], '_SEQ_', tarDef['kind']]);
            }
            // 허용 조건
            if (oriDef['kind'] === '_ALL_' && (tarDef['kind'] !== '_NON_')) return;
            if (oriDef['kind'] === '_NON_' && (tarDef['kind'] === '_NON_')) return;
            if (oriDef['kind'] === '_ANY_' && (tarDef['kind'] === '_ANY_')) return;
        }

        // primitive TODO: regexp 들어가야함
        if (['null', 'undefined', 'number', 'string', 'boolean', 'symbol', 'bigint', 'regexp'].indexOf(oriDef['$type']) > -1) {
            // if(oriDef['default'] !== null && oriDef['default'] !== tarDef['default']) {
            //     Message.error('ES0712', [oriDef['$type'], oriDef['default'], tarDef['default']]);
            // }
            if(oriDef['default'] !== null && !_equalLiternal(oriDef['default'], tarDef['default'])) {
                Message.error('ES0712', [oriDef['$type'], oriDef['default'], tarDef['default']]);
            }
            if (oriDef['$type'] === tarDef['$type']) return;
            Message.error('ES0713', [oriDef['$type'], tarDef['$type']]);
        }
        // choice
        if (oriDef['$type'] === 'choice') {   
            if (oriDef['kind'] == '_ALL_') {
                return;
            } else if (oriDef['kind'] == '_ANY_') {
                if (typeof tarDef['ref'] !== 'undefined') return;
                Message.error('ES0714', ['_ANY_', 'undefined']);
            
            } else if (oriDef['kind'] == '_SEQ_') {
                if (tarDef['kind'] !== '_SEQ_') Message.error('ES0731', ['target', tarDef['kind']]);
                if (oriDef['list'].length > tarDef['list'].length) {
                    Message.error('ES0732', [oriDef.toString(), tarDef.toString()]);
                }
                if (oriDef['list'].length === 0 && tarDef['list'].length > 0) return;
                for (i = 0; i < oriDef['list'].length; i++) {
                    try {
                        _execAllow(oriDef['list'][i], tarDef['list'][i], opt);
                    } catch (error) {
                        Message.error('ES0733', [oriDef['list'][i], tarDef['list'][i]]);
                    }
                }
                return;
            
            } else if (oriDef['kind'] == '_REQ_') {
                if (tarDef['kind'] && tarDef['ref'].length === 0) {
                    Message.error('ES0734');
                }
                var arrTarget = (tarDef['kind']) ? tarDef['list'] : [tarDef['ref']];

                if (oriDef['list'].length > 0 && arrTarget.length === 0) {
                    Message.error('ES0717', [oriDef.toString(), arrTarget.toString(),]);
                }
                for (i = 0; i < arrTarget.length; i++) {
                    var success = false;
                    for (var ii = 0; ii < oriDef['list'].length; ii++) {
                        try {
                            if (success) continue;
                            _execAllow(oriDef['list'][ii], arrTarget[i], opt);
                            success = true;
                        } catch (error) {
                            continue;
                        }
                    }
                    if (!success) Message.error('ES0738', ['choice(_OPT_)', extendType(arrTarget[i])['$type']]);
                }
                return;

            } else if (oriDef['kind'] === '_OPT_') {
                if (typeof tarDef['ref'] === 'undefined') return;
                var arrTarget = (tarDef['kind']) ? tarDef['list'] : [tarDef['ref']];

                if (oriDef['list'].length > 0 && arrTarget.length === 0) {
                    Message.error('ES0717', [oriDef.toString(), arrTarget.toString(),]);
                }
                for (i = 0; i < arrTarget.length; i++) {
                    var success = false;
                    for (var ii = 0; ii < oriDef['list'].length; ii++) {
                        try {
                            if (success) continue;
                            _execAllow(oriDef['list'][ii], arrTarget[i], opt);
                            success = true;
                        } catch (error) {
                            continue;
                        }
                    }
                    if (!success) Message.error('ES0738', ['_OPT_', extendType(arrTarget[i])['$type']]);
                }
                return;                
            } else {
                    Message.error('ES0735', [oriDef['kind']]);
            }
        }
        // array
        if (oriDef['$type'] === 'array') {    
            if (oriDef['list'].length === 0 && !oriDef['kind'] && tarDef['$type'] === 'array') return;      // [], [[]], Array
            if (!Array.isArray(tarDef['list'])) Message.error('ES0719', ['array']);
            if (oriDef['kind'] == '_ALL_') {
                return;
            } else if (oriDef['kind'] == '_ANY_') {
                if (tarDef['kind'] && tarDef['list'].length === 0) Message.error('ES075', ['array _ANY_', 'undefined']);
                if (tarDef['list'].length > 0) return;
                
            } else if (oriDef['kind'] == '_SEQ_') {
                if (oriDef['kind'] !== tarDef['kind'])  Message.error('ES0719', ['_SEQ_']);
                if (oriDef['list'].length > tarDef['list'].length) {
                    Message.error('ES0720', [oriDef.toString(), tarDef.toString()]);
                }
                for (var i = 0; i < oriDef['list'].length; i++) {
                    try {
                        _execAllow(oriDef['list'][i], tarDef['list'][i], opt);
                    } catch (error) {
                        Message.error('ES0711', ['array', '_SEQ_', error]);
                    }
                }
                return;

            } else if (oriDef['kind'] == '_REQ_') {
                if (oriDef['list'].length < tarDef['list'].length) {
                    Message.error('ES0716', ['array _OPT_', oriDef.toString(), tarDef.toString()]);
                }
                if (oriDef['list'].length > 0 && tarDef['list'].length === 0) {
                    Message.error('ES0717', ['array']);
                }
                for (var i = 0; i < tarDef['list'].length; i++) {
                    var success = false;
                    for (var ii = 0; ii < oriDef['list'].length; ii++) {
                        try {
                            if (success) continue;
                            _execAllow(oriDef['list'][ii], tarDef['list'][i], opt);
                            success = true;
                        } catch (error) {
                            continue;
                        }
                    }
                    if (!success) Message.error('ES0738', ['array(_REQ_)', extendType(tarDef['list'][i])['$type']]);
                }
                return;
            
            } else if (oriDef['kind'] === '_OPT_') {
                if (Array.isArray(tarDef['list']) && tarDef['list'].length === 0) return;
                for (var i = 0; i < tarDef['list'].length; i++) {
                    var success = false;
                    for (var ii = 0; ii < oriDef['list'].length; ii++) {
                        try {
                            if (success) continue;
                            _execAllow(oriDef['list'][ii], tarDef['list'][i], opt);
                            success = true;
                        } catch (error) {
                            continue;
                        }
                    }
                    if (!success) Message.error('ES0738', ['array(_OPT_)', extendType(tarDef['list'][i])['$type']]);
                }

            } else {              
                Message.error('ES0735', [oriDef['kind']]);
            }
        }
        // function
        if (oriDef['$type'] === 'function') { 
            if (tarDef['$type'] !== 'function')  Message.error('ES0713', [oriDef['$type'], tarDef['$type']]);
            if (oriDef['ref'] === Function) return;
            
            if (!oriDef['return'] && oriDef['params'].length === 0) return;    // success
            if (oriDef['params'].length !== tarDef['params'].length) Message.error('ES0721', ['function', 'params', oriDef['params'].length]);
            
            try {
                _execAllow(['_SEQ_'].concat(oriDef['params']), ['_SEQ_'].concat(tarDef['params']), opt);
            } catch (error) {
                Message.error('ES0722', ['function', 'params', error]);
            }

            try {
                _execAllow(oriDef['return'], tarDef['return'], opt);
            } catch (error) {
                    Message.error('ES0722', ['function', 'return', error]);
            }
            return;
        }
        // object
        if (oriDef['$type'] === 'object') {
            // if (tarDef['$type'] !== 'object') Message.error('ES0713', [oriDef['$type'], tarDef['$type']]);
            // if (tarDef['$type'] === 'object' || tarDef['$type'] === 'union') return;
            if (tarDef['$type'] === 'object') return;
            
            // if (oriDef['ref'] === tarDef['ref']) return;
            // if (_isEmptyObj(tarDef['ref'])) return;
            // if (oriDef['ref'] instanceof RegExp) {
            //     if (tarDef['ref'] instanceof RegExp && oriDef['ref'].source === tarDef['ref'].source) return;
            //     Message.error('ES0723', [oriDef['ref'].source, tarDef['ref'].source]);
            // }
            // if (oriDef['ref'] instanceof Date) {
            //     if (tarDef['ref'] instanceof Date && oriDef['ref'].getTime() === tarDef['ref'].getTime()) return;
            //     Message.error('ES0723', [oriDef['ref'].source, tarDef['ref'].source]);
            // }
            Message.error('ES0718', ['object']);
        }
        // class
        if (oriDef['$type'] === 'class') {
            
            if (tarDef['$type'] === 'class') {
                if (isType(tarDef['ref'], oriDef['ref'])) return;   // 1.proto check
                if (opt === 1) {
                    try {
                        // 생성비교
                        var oriObj = new oriDef['ref']();
                        var tarObj = new tarDef['ref']();
                        return _execAllow(oriObj, tarObj, opt);
                    } catch (error) {
                        Message.error('ES0724', ['object', error]);
                    }                    
                }
            }
            Message.error('ES0725', ['object']);

            
            // if (oriDef['ref'] === tarDef['ref']) return;
            // try {
            //     var obj1 = new oriDef['ref']();
            //     var obj2 = new tarDef['ref']();
            //     if (deepEqual(obj1, obj2)) return;  // REVIEW: allow 로 변화 해야함
            // } catch (error) {
            //     Message.error('ES0724', ['object', error]);
            // }
            // Message.error('ES0725', ['object']);
        }
        // union
        if (oriDef['$type'] === 'union') {
            if (tarDef['$type'] !== 'union') throw new Error('union 타입이 아닙니다.');
            var list = getAllProperties(oriDef['ref']);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                try {
                    _execAllow(oriDef['ref'][key], tarDef['ref'][key], opt);
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
    var _execMatch = function(type, target, parentName, opt) {
        var parentName = parentName ? parentName : 'this';
        var defType, tarType;

        opt = opt || 0;

        defType = extendType(type);
        tarType = extendType(target);

        // ori seq, opt 필수 검사
        if (defType['kind']) {
            if ((defType['kind'] === '_SEQ_' || defType['kind'] === '_OPT_') 
            && (typeof defType.ref === 'undefined' || defType['list'].length === 0)) {
                Message.error('ES0729', ['type', defType['kind']]);
            }
        }

        // primitive
        if (defType['$type'] === 'null') {
            if (target === null) return;
            Message.error('ES074', [parentName, 'null']);
        }
        if (defType['$type'] === 'undefined') {
            if (typeof target === 'undefined') return;
            Message.error('ES074', [parentName, 'undefined']);
        }
        if (defType['$type'] === 'number') {
            if (typeof defType['default'] === 'number' && typeof target === 'undefined') target = defType['default']; 
            if (typeof target === 'number') return;
            Message.error('ES074', [parentName, 'number']);
        }
        if (defType['$type'] === 'string') {
            if (typeof defType['default'] === 'string' && typeof target === 'undefined') target = defType['default'];
            if (typeof target === 'string') return;
            Message.error('ES074', [parentName, 'string']);
        }
        if (defType['$type'] === 'boolean') {
            if (typeof defType['default'] === 'boolean' && typeof target === 'undefined') target = defType['default'];
            if (typeof target === 'boolean') return;
            Message.error('ES074', [parentName, 'boolean']);
        }
        if (defType['$type'] === 'bigint') {    // ES6+
            if (typeof defType['default'] === 'bigint' && typeof target === 'undefined') target = defType['default'];
            if (typeof target === 'bigint') return;
            Message.error('ES074', [parentName, 'bigint']);
        }
        if (defType['$type'] === 'symbol') {    // ES6+
            if (typeof target === 'symbol') return;
            Message.error('ES074', [parentName, 'symbol']);
        }
        // regexp
        if (defType['$type'] === 'regexp') {
            if (defType['default'] && defType['default'] instanceof RegExp && typeof target === 'undefined') target = defType['default'];
            if (target instanceof RegExp) return;
            Message.error('ES074', [parentName, 'regexp']);
        }
        // choice
        if (defType['$type'] === 'choice') {
            if (defType['kind'] == '_ALL_') {
                return;
            } else if (defType['kind'] == '_ANY_') {
                if (typeof target !== 'undefined') return;
                Message.error('ES075', ['choice', '_ANY_', 'undefined']);
            } else if (defType['kind'] == '_NON_') {
                if (typeof target === 'undefined') return;
                throw new Error(' 어떤한 값도 설정할 수 없습니다.');
            } else if (defType['kind'] == '_REQ_') {
                // if (defType['list'].length === 0) return;
                if (defType['list'].length === 0) throw new Error('_req_(require) 필수 항목이 없습니다.');
            } else if (defType['kind'] === '_OPT_') {
                if (typeof tarType.ref === 'undefined') return;
            } else if (defType['kind'] === '_EUM_') {
                if (defType['list'].length === 0) throw new Error('_eum_(enum) 1개이상 항목이 필요합니디.');
                for (var ii = 0; ii < defType['list'].length; ii++) {
                    if (!_isLiteral(defType['list'][ii])) throw new Error('_eum_(enum)은 리터럴 타입만 가능합니다.');
                }
            } else if (defType['kind'] === '_DEF_') {
                if (defType['list'].length === 0) throw new Error('_def_(default) 1개이상 항목이 필요합니디.');
                if (!_isLiteral(defType['list'][0])) throw new Error('_def_(default) 1번째는 리터럴 타입만 가능합니다.');
                if (typeof target === 'undefined') {
                    target = defType['list'][0];
                    return;
                }
            } else if (defType['kind'] === '_SEQ_') {
                Message.error('ES077', ['choice', '_SEQ_']);
            }

            for (var ii = 0; ii < defType['list'].length; ii++) {
                try {
                    // POINT:
                    var elem = defType['list'][ii];
                    // if (_isLiteral(elem)) {
                    //     if (typeof elem === typeof target && elem.toString() === target.toString()) return;
                    // } else {
                    //     _execMatch(elem, target);
                    //     return;
                    // }
                    if (_isLiteral(elem)) {
                        if (_equalLiternal(elem, target)) return;
                    } else {
                        return _execMatch(elem, target, parentName, opt);
                    }

                    // _execMatch(defType['list'][ii], target);
                    // return;
                } catch (error) {
                    continue;
                }
            }
            var logTitle = defType['kind'] ? 'choice('+defType['kind']+')' : 'choice';
            Message.error('ES076', [logTitle, defType.toString(), tarType.toString()]);
        }
        // array
        if (defType['$type'] === 'array') {
            if ((type === Array || type.length === 0) && (Array.isArray(target) || target === Array)) return;
            if (!Array.isArray(target)) return Message.error('ES024', [parentName, 'array']);
            if (defType['kind'] == '_ALL_') {
                return;
            } else if (defType['kind'] == '_ANY_') {
                if (target.length === 0) throw new Error('array any 타입에는 요소를 하나 이상 가지고 있어야 합니다.');
                // for(var ii = 0; ii < target.length; ii++) {
                //     var tar = target[ii];
                //     if (typeof tar === 'undefined') Message.error('ES075', ['array', '_ANY_', 'undefined']);
                // }
                return;
            } else if (defType['kind'] == '_SEQ_') {
                for(var i = 0; i < defType['list'].length; i++) {
                    var elem = defType['list'][i];
                    var tar = tarType['list'][i];
                    if (typeof tar === 'undefined') Message.error('ES075', ['array', '_SEQ_', 'index['+i+']']);
                    // _execMatch(defType['list'][i], tar);
                    if (_isLiteral(elem)) {
                        // if (typeof elem !== typeof tar || elem.toString() !== tar.toString()) throw new Error('array seq 리터럴 타입이 다릅니다.');
                        if (!_equalLiternal(elem, tar)) throw new Error('array seq 리터럴 타입이 다릅니다.');
                    } else {
                        if (_execMatch(elem, tar, parentName, opt)) throw new Error('array seq 타입이 다릅니다.');
                        // return;
                    }
                }
                return;
            } else if (defType['kind'] == '_REQ_') {
                // if (defType['list'].length === 0) throw new Error('array(opt) 타입이 없습니다. ');  
                // if (Array.isArray(target) && target.length === 0) return;
                // if (defType.ref.length === 0) return;
                // beginIdx = 1;
            } else if (defType['kind'] === '_OPT_') {
                if (Array.isArray(target) && target.length === 0) return;
            }
            for (var i = 0; i < target.length; i++) {
                var tar = target[i];
                for (var ii = 0; ii < defType['list'].length; ii++) {
                    try {
                        var elem = defType['list'][ii];
                        if (_isLiteral(elem)) {
                            // if (typeof elem === typeof tar && elem.toString() === tar.toString()) return;
                            if (_equalLiternal(elem, tar)) return;
                        } else {
                            _execMatch(elem, tar, parentName, opt);
                            return;
                        }
                    } catch (error) {
                        continue;
                    }
                }
                var logTitle = defType['kind'] ? 'array('+defType['kind']+')' : 'array';
                Message.error('ES076', [logTitle, defType.toString(), tarType.toString()]);
            }
        }
        // function
        if (defType['$type'] === 'function') {
            if (typeof target !== 'function') return Message.error('ES024', [parentName, 'function']);
            if (defType['name']) {
                if (defType['name'] === target.name) return;
                throw new Error('지정한 함수 이름과 다릅니다.');
            }
            if (type === Function) return;
            // var fixType = {};
            // var fixReturns = [];
            // var tarType = target['_TYPE'];
            // var tarArgs = [];
            // var tarReturns = [];

            // try {
            //     fixType = type['_TYPE'] ? type['_TYPE'] : _getFunInfo(type.toString());
            // } catch (err) {
            //     return;
            //     // fixType = {
            //     //     params: [],
            //     //     return: null
            //     // };
            // }

            if (!defType['return'] && defType['params'].length === 0) return;    // success
            if ((defType['return'] || defType['params'].length > 0) && !tarType) Message.error('ES079', ['target', 'function', '_TYPE']);
            if (typeof tarType['params'] === 'undefined' && typeof tarType['return'] === 'undefined') { 
                Message.error('ES0710', ['target', 'function', ' {params: [], return: []} ']);
            }
            // tarArgs = (Array.isArray(tarType['params'] )) ? tarType['params'] : [tarType['params']];
            // if (defType['return']) fixReturns = (Array.isArray(defType['return'] )) ? defType['return'] : [defType['return']]; 
            // if (tarType['return']) tarReturns = (Array.isArray(tarType['return'] )) ? tarType['return'] : [tarType['return']];
            
            if (defType['params'].length > 0) {  // params 검사
                try {
                    // if (defType['params'].length > tarArgs.length) Message.error('ES0736', [defType['params'], tarArgs]);
                    _execAllow(['_SEQ_'].concat(defType['params']), ['_SEQ_'].concat(tarType['params']));
                } catch (error) {
                    Message.error('ES0711', ['function', 'params', error]);
                }
            }
            if (defType['return']) {
                try {
                    // if (tarReturns.length === 0) Message.error('ES0737', []);
                    // _execAllow([['_REQ_', defType['return'] ]], [['_REQ_', tarType['return']]])
                    _execAllow(defType['return'], tarType['return']);
                } catch (error) {
                    Message.error('ES0711', ['function', 'return', error]);
                }
            }
            return;
        }
        // object
        if (defType['$type'] === 'object') {
            
            // if (tarType['$type'] === 'object' || tarType['$type'] === 'union') return;   // REVIEW: union 타입의 허용 여부 검토 필요
            if (tarType['$type'] === 'object') return;
            
            // if (type === Object && target instanceof type) return;
            // if (type !== Object && target instanceof type.constructor) return;
            return Message.error('ES024', [parentName, 'object']);
        }
        // class
        if (defType['$type'] === 'class') {
            /**
             * 1. tar == class : proto
             * 2. tar == object : instanceof
             * 3. tar == union : match
             */
            if (tarType['$type'] === 'class' && isType(tarType['ref'], defType['ref'])) return;
            else if (typeof target === 'object') {
                if (target instanceof type) return;
                if (!_isBuiltFunction(type) && target !== null) {
                    return _execMatch(_creator(type), target, parentName, opt);
                }
            }
            return Message.error('ES032', [parentName, _typeName(type)]);
            
            // else if (tarType['$type'] === 'union' || tarType['$type'] === 'object') 

            // if (_isBuiltFunction(type)) {   // 원시 클래스 타입은 union 비교를 하지 않음!
            //     if (target instanceof type) return; 
            //     else return Message.error('ES032', [parentName, _typeName(type)]);
            // } else {
            //     if (typeof target === 'object' && target instanceof type) return;
            //     if (typeof target === 'object' && target !== null) return _execMatch(_creator(type), target, parentName);

            //     return Message.error('ES032', [parentName, _typeName(type)]);
            // }
        }
        // union
        if (defType['$type'] === 'union') {
            // if (tarType['$type'] === 'class') return _execMatch(_creator(tarType['ref']), defType['ref'], parentName);
            if (tarType['$type'] !== 'union') throw new Error('union 타입이 아닙니다.');
            var list = getAllProperties(defType.ref);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = extendType(type[key]);
                // REVIEW: for 위쪽으로 이동 검토!
                if (!_isObject(target)) return Message.error('ES031', [parentName + '.' + key]);                 // target 객체유무 검사
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                if (listDefType['default'] !== null && typeof target[key] === 'undefined')      // default 설정
                    target[key] = listDefType['default'];
                if (target !== null && !(key in target)) return Message.error('ES027', [listDefType['$type'], parentName + '.' + key]);    
                if (listDefType['$type'] === 'class'){
                    if (typeof target[key] === 'function') continue;                        // class method
                    if (typeof target[key] === 'object' && target[key] instanceof type[key]) continue;
                    else return Message.error('ES031', [parentName + '.' + key]);
                } 
                _execMatch(type[key], target[key], parentName +'.'+ key, opt);
            }
            return;
        }
        return Message.error('ES022', [defType['$type']]);
    };

    /**
     * 원본타입에 대상타입을 적용(설정)가능 여부를 검사한다.
     * @memberof _L.Common.Util
     * @param {any} origin 
     * @param {any} target 
     * @returns {throw?} 실패시 예외를 던진다.
     */
    var allowType = function(origin, target) {
        try {
            if (typeof origin === 'undefined') Message.error('ES026', ['origin']);
            _execAllow(origin, target);
        } catch (error) {
            Message.error('ES069', ['check allow type', error]);
        }
    };    


    /**
     * 대상의 타입 여부를 검사합니다.
     * @memberof _L.Common.Util
     * @param {any} chkType 
     * @param {any} target 
     * @returns {throw?} 실패시 예외를 던진다.
     */
    var matchType = function(chkType, target) {
        try {
            if (typeof chkType === 'undefined') Message.error('ES026', ['chkType']);
            _execMatch(chkType, target);
        } catch (error) {
            Message.error('ES069', ['check type', error]);
        }
    };

    /**
     * 원본타입에 대상타입을 적용(설정)가능 여부를 검사한다.
     * @memberof _L.Common.Util
     * @param {any} origin 
     * @param {any} target 
     * @param {number} opt 
     * @returns {boolean} 
     */
    var isAllowType = function(origin, target, opt) {
        try {
            _execAllow(origin, target, opt);
        } catch (error) {
            return false;
        }
        return true;
    };  

    /**
     * 대상의 타입 여부를 검사합니다.
     * @memberof _L.Common.Util
     * @param {any} chkType 
     * @param {any} target 
     * @returns {boolean} 
     */
    var isMatchType = function(chkType, target) {
        // if (typeof chkType === 'undefined') return false;
        try {
            _execMatch(chkType, target);
            return true;
        } catch (error) {
            return false;
        }
    };


    //==============================================================
    // 5. module export
    if (isNode) {
        // exports.isType = isType;
        // exports.extendTypes = extendTypes;             
        exports.getAllProperties = getAllProperties;
        exports.deepEqual = deepEqual;
        exports.isType = isType;
        exports.getTypes = getTypes;
        exports.extendType = extendType;
        exports.typeObject = typeObject;
        exports.typeOf = typeOf;
        exports.matchType = matchType;
        exports.allowType = allowType;
        exports.isMatchType = isMatchType;
        exports.isAllowType = isAllowType;
    } else {
        var ns = {
            // isType: isType,
            // extendTypes: extendTypes,
            getAllProperties: getAllProperties,
            deepEqual: deepEqual,
            isType: isType,
            getTypes: getTypes,
            extendType: extendType,
            typeObject: typeObject,
            typeOf: typeOf,
            matchType: matchType,
            allowType: allowType,
            isMatchType: isMatchType,
            isAllowType: isAllowType
        };
        _global._L.Util = ns;
        _global._L.Common.Util = ns;
    }

}(typeof window !== 'undefined' ? window : global));