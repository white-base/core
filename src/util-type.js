/**
 * namespace _L.Common.Util
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};
    _global._L.Common.Util          = _global._L.Common.Util || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
    } else {    
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));


    //==============================================================
    // 4. module implementation 
    
    /**
     * object 와 new 생성한 사용자 함수를 제외한 객쳐 여부
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isPrimitiveObj(obj) {
        if(typeof obj === 'object' && obj !== null 
            && (obj instanceof RegExp || obj instanceof Date )) {
            return true;
        }
        return false;
    }

    /**
     * 최상위 object 이거나 사용자 함수에서 생성한 객체 여부
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isObject(obj)  {
        if(typeof obj === 'object' && obj !== null && !_isPrimitiveObj(obj)) {
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
        if(_isObject(obj) && Object.keys(obj).length === 0 && getAllProperties(obj).length === 0) return true;
        return false;
    }

    /**
     * 공백이 아닌 객체 (prototype 및 속성 있는것)
     * @param {*} obj 대상 
     * @returns {boolean}
     */
    function _isFillObj(obj)  {
        if(_isObject(obj) && getAllProperties(obj).length > 0) return true;
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
     * 첫문자 대문자 여부
     * @param {string} strValue 
     * @returns {boolean}
     */
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
     * number, string, boolean, bigint, RexExp instance
     * @param {*} obj1 
     * @param {*} obj2 
     * @returns {boolean}
     */
    function _equalLiternal(obj1, obj2) {
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
    }

    /**
     * 타임명 얻기
     * @param {*} obj 
     * @returns {string}
     */
    function _typeName(obj) {
        return obj['name'];
    }

    /**
     * kind 코드, 대문자로 얻기 '_any_'...
     * @param {*} val 
     * @returns {string}
     */
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
        var regFunc2 = /\(?([\[\]{:}\s\w,]*)\)?\s*(?:=>)\s*{?(?:\s*return\s+|\s*)?([\[\]\s\w,]*);?\s*}?/;
        
        var arrFunc, arrParam;
        var result = { params: [], return: undefined };
        var arrParam = [];
        var arrRetrun;
        
        funBody = skipComment(funBody);

        try {
            if (syntax1.test(funBody)) arrFunc = regFunc1.exec(funBody);
            else if (syntax2.test(funBody)) arrFunc = regFunc2.exec(funBody);
            else throw new ExtendError(Message.get('ES071', [funBody]));
            
            if (arrFunc === null) throw new ExtendError(Message.get('ES072', [funBody]));

            arrParam = (new Function('return ['+ arrFunc[1] +']'))();
            result['params'] = arrParam;
            
            if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))()
            result['return'] = arrRetrun;

        } catch (error) {
            throw new ExtendError(Message.get('ES073', ['']), error);
        }

        return result;

        // inner function
        function skipComment(body) {    // 주석 제거 comment
            var rBody = body;
            var bloackComment = /\/\*[^](.*?)\*\//g
            var lineComment = /\/\/[^](.*?)(\n|$)/g

            rBody = rBody.replace(bloackComment, '');
            rBody = rBody.replace(lineComment, '');
            return rBody;
        }
    }

    /**
     * 타입 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasType(name) {
        var arr = [];
        
        arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
        arr = arr.concat(['array', 'function', 'object']);
        arr = arr.concat(['choice', 'union', 'class']);
        arr = arr.concat(['symbol', 'bigint', 'regexp']);

        if (typeof name !== 'string') return false;
        return arr.indexOf(name) > -1;
    }

    /**
     * choice type kind 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasKindChoice(name) {
        var arr = [];
        
        arr = arr.concat(['_ALL_', '_NON_', '_ANY_', '_ERR_']);
        arr = arr.concat(['_REQ_', '_OPT_', '_DEF_', '_EUM_']);

        if (typeof name !== 'string') return false;
        return arr.indexOf(name) > -1;
    }

    /**
     * choice type kind 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasKindArray(name) {
        var arr = [];
        
        arr = arr.concat(['_ALL_', '_ANY_']);
        arr = arr.concat(['_REQ_', '_OPT_', '_SEQ_']);

        if (typeof name !== 'string') return false;
        return arr.indexOf(name) > -1;
    }

    /**
     * 타입 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _isLeafType(name) {
        var arr = [];
        
        arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
        arr = arr.concat(['symbol', 'bigint', 'regexp', 'object']);

        if (typeof name !== 'string') return false;
        return arr.indexOf(name) > -1;
    }
    
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
            for (var i = 0; i < props.length; i++) {
                var prop = props[i];
                if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop))) allProps.push(prop);
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
    var isProtoChain = function(ctor, target) {
        var arr;
        if (typeof ctor !== 'function') return false;
        arr = getTypes(ctor);
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
     * $type : 공통 타입  
     * default : 리터럴 타입  
     * params, retrun, name, func : 함수타입  
     * create, _instance : 클래스 타입  
     * _prop : 유니언 타입  
     * @param {*} type 
     * @returns {object}
     */
    var typeObject = function(type) {
        var obj = {};
        var typeObj = _isObject(type) && type['$type'] ? type : extendType(type);
        var leafType = ['null', 'undefined', 'number', 'string', 'boolean', 'symbol', 'bigint', 'object', 'regexp'];

        obj['$type'] = typeObj['$type'];
        
        if (typeObj['default'] !== null && typeof typeObj['default'] !== 'undefined') obj['default'] = typeObj['default'];
        if (typeObj['kind'] !== null && typeof typeObj['kind'] !== 'undefined') obj['kind'] = typeObj['kind'];
        if (typeObj['params']) obj['params'] = typeObj['params'];
        if (typeObj['return']) obj['return'] = typeObj['return'];
        if (typeObj['creator']) obj['creator'] = typeObj['creator'];
        if (typeObj['_instance']) obj['_instance'] = typeObj['_instance'];

        if (leafType.indexOf(obj['$type']) > -1) {
            if (typeObj['return']) obj['default'] = typeObj['default'];
            return obj;
        }
        if (obj['$type'] === 'array' ||  obj['$type'] === 'choice') {
            obj['list'] = [];
            for(var i = 0; i < typeObj['list'].length; i++) {
                obj['list'][i] = typeObject(typeObj['list'][i]);
            }
        }
        if (obj['$type'] === 'function') {
            for(var i = 0; i < obj['params'].length; i++) {
                obj['params'][i] = typeObject(typeObj['params'][i]);
            }
            if (typeObj['return']) obj['return'] = typeObject(typeObj['return']);
        }
        if (obj['$type'] === 'class') {
            if (typeof typeObj['ref'] === 'function') {
                obj['creator'] = typeObj['ref'].name; 
                var temp = _creator(typeObj['ref']);
                obj['_instance'] = typeObject(temp);
            }
        }
        if (obj['$type'] === 'union') {
            obj['_prop'] = {};
            var temp = typeObj['ref'] || typeObj['_prop'];
            var list = getAllProperties(temp);
            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                obj['_prop'][key] = typeObject(temp[key]);
            }
        }
        return obj;
    };

    /**
     * 타입명 얻습니다.
     * @param {*} type 
     * @returns {string}
     */
    var typeOf = function (type) {
        return extendType(type)['$type'];
    };

    /**
     * js2 타입 객체를 리턴한다.   
     * 종류 : null, number, string, boolean, array, function, object, undefined, symbol, class, choice, union  
     * @memberof _L.Common.Util
     * @param {any} type 대상타입
     * @returns {object} 
     */
    var extendType = function(type) {
        var obj =  {$type: '', ref: undefined};

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
            if (type['name']) obj['name'] = type['name'];
            if (type['func']) obj['func'] = type['func'];
            if (type['params']) obj['params'] = type['params'];
            if (type['return']) obj['return'] = type['return'];
            if (!_hasType(obj['$type'])) throw new ExtendError(Message.get('ES022', ['type']));
            if (obj['$type'] === 'array') {
                obj['kind'] = obj['kind'] || '_ALL_';
                if (!_hasKindArray(obj['kind'])) throw new ExtendError(Message.get('ES022', ['array kind']));
            }
            if (obj['$type'] === 'choice') {
                if (!_hasKindChoice(obj['kind'])) throw new ExtendError(Message.get('ES022', ['choice kind']));
            }
            return obj;
        } else {
            obj['ref'] = type;
        }

        // step : (operation) 
        if (type === null) {
            obj['$type'] = 'null';
        } else if (type === Number) {
            obj['$type'] = 'number';
            obj['default'] = null;            
        } else if (type === String) {
            obj['$type'] = 'string';
            obj['default'] = null;
        } else if (type === Boolean) {
            obj['$type'] = 'boolean';
            obj['default'] = null;
        } else if (type === Array) {
            obj['$type'] = 'array';
            obj['kind'] = '_ALL_';
            obj['list'] = [];
        } else if (type === Function) {
            obj['$type'] = 'function';
            obj['params'] = [];
        } else if (type === Object) {
            obj['$type'] = 'object';
        } else if (type === RegExp) {
            obj['$type'] = 'regexp';
            obj['default'] = null;
        } else if (type === Symbol) {      // ES6+
            obj['$type'] = 'symbol';
        } else if (type === BigInt) {      // ES6+
            obj['$type'] = 'bigint';
            obj['default'] = null;
        } else if (type instanceof RegExp) {
            obj['$type'] = 'regexp';
            obj['default'] = type;
        // step : typeof
        } else if (typeof type === 'undefined') {
            obj['$type'] = 'undefined';
        } else if (typeof type === 'number') {
            obj['$type'] = 'number';
            obj['default'] = type;
        } else if (typeof type === 'string') {
            obj['$type'] = 'string';
            obj['default'] = type;
        } else if (typeof type === 'boolean') {
            obj['$type'] = 'boolean';
            obj['default'] = type;
        } else if (typeof type === 'bigint') { // ES6+
            obj['$type'] = 'bigint';
            obj['default'] = type;
        } else if (typeof type === 'symbol') { // ES6+
            obj['$type'] = 'symbol';
        // step : function
        } else if (typeof type === 'function') {
            var kind = type['_KIND'];
            if (kind) {
                kind = kind.toLowerCase();
                if (kind === 'function') obj['$type'] = 'function';
                else obj['$type'] = 'class';    // class, interface, abstract
            } else obj['$type'] = _isUpper(type.name) ? 'class' : 'function';
                
            if (obj['$type'] === 'function') {
                try {
                    var funcType  = type['_TYPE'] ? type['_TYPE'] : _getFunInfo(type.toString());
                    obj['params'] = funcType['params'];
                    obj['return'] = funcType['return'];
                } catch (err) {
                    obj['params'] = [];
                }
            }
        // step : array
        } else if (Array.isArray(type)) {
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
            // kind 검사
            if (obj['$type'] === 'array' && !_hasKindArray(obj['kind'])) throw new ExtendError(Message.get('ES022', ['array kind']));
            if (obj['$type'] === 'choice' && !_hasKindChoice(obj['kind'])) throw new ExtendError(Message.get('ES022', ['choice kind']));

        // step : object
        } else if (_isFillObj(type) || _isEmptyObj(type)) {
            obj['$type'] = 'union';
        } else if(_isPrimitiveObj(type)) {
            obj['$type'] = 'object';
        } else throw new ExtendError(Message.get('ES022', ['type']));    // Line:
        
        return obj;
    }

    /**
     * 원본타입에 대상타입이 덮어쓰기가 허용 가능한지 검사합니다.  
     * 원본타입에 대상타입으로 캐스팅이 가능하지 확인합니다.
     * @memberof _L.Common.Util
     * @param {any} origin 원본 타입
     * @param {any} target 대상 타입
     * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
     * @returns {throw?}
     */
    var _execAllow = function (origin, target, opt) {
        var oriType = extendType(origin);
        var tarType = extendType(target);
        
        opt = opt || 0;

        if (_isObject(oriType['ref']) &&  _isObject(tarType['ref']) && deepEqual(oriType, tarType)) return;
        // origin seq, opt 필수 검사
        if (oriType['kind']) {
            if ((oriType['kind'] === '_SEQ_' || oriType['kind'] === '_OPT_' || oriType['kind'] === '_REQ_') 
            && (/*typeof oriType['ref'] === 'undefined' || */ oriType['list'].length === 0)) {
                throw new ExtendError(Message.get('ES0729', ['origin', oriType['kind']]));
            }
        }
        // target seq, opt 필수 검사
        if (tarType['kind']) {
            if ((tarType['kind'] === '_SEQ_' || tarType['kind'] === '_OPT_' || tarType['kind'] === '_REQ_') 
            && (/*typeof tarType['ref'] === 'undefined' || */ tarType['list'].length === 0)) {
                throw new ExtendError(Message.get('ES0729', ['target', tarType['kind']]));
            }
        }
        // all, non, any, req, opt, seq 타입 검사
        if (oriType['kind'] && tarType['kind'] && oriType['$type'] === tarType['$type']) {
            // 거부조건
            if (oriType['kind'] === '_ALL_' && (tarType['kind'] === '_ERR_')) {
                throw new ExtendError(Message.get('ES0727', [oriType['kind'], '_NON_', tarType['kind']]));
            } 
            if (oriType['kind'] === '_NON_' && tarType['kind'] !== '_NON_') { 
                throw new ExtendError(Message.get('ES0728', [oriType['kind'], '_NON_', tarType['kind']]));
            }
            if (oriType['kind'] === '_ANY_' && (tarType['kind'] === '_ALL_' || tarType['kind'] === '_OPT_' || tarType['kind'] === '_NON_' || tarType['kind'] === '_ERR_')) {
                throw new ExtendError(Message.get('ES0727', [oriType['kind'], '_REQ_, _ALL_, _NON_', tarType['kind']]));
            }
            if (oriType['kind'] === '_ERR_' && tarType['kind'] !== '_ERR_') { 
                throw new ExtendError(Message.get('ES0728', [oriType['kind'], '_ERR_', tarType['kind']]));
            }
            
            // if (oriType['kind'] === '_ANY_' && (tarType['kind'] === '_ALL_' || tarType['kind'] === '_NON_')) {
            //     Message.error('ES0727', [oriType['kind'], '_ALL_, _NON_', tarType['kind']]);
            // }
            if (oriType['kind'] === '_OPT_' && (tarType['kind'] === '_ALL_' || tarType['kind'] === '_ANY_' || tarType['kind'] === '_NON_') ){
                throw new ExtendError(Message.get('ES0728', [oriType['kind'], '_OPT_, _SEQ_', tarType['kind']]));
            } 
            if (oriType['kind'] === '_REQ_' && (tarType['kind'] === '_ALL_' || tarType['kind'] === '_ANY_' ||  tarType['kind'] === '_OPT_' || tarType['kind'] === '_NON_')) {
                throw new ExtendError(Message.get('ES0727', [oriType['kind'], '_ANY_, _ALL_, _OPT_, _NON_', tarType['kind']]));
            }
            if (oriType['kind'] === '_SEQ_' && tarType['kind'] !== '_SEQ_') { 
                throw new ExtendError(Message.get('ES0728', [oriType['kind'], '_SEQ_', tarType['kind']]));
            }
            // 허용 조건
            if (oriType['kind'] === '_ALL_' && (tarType['kind'] !== '_NON_')) return;
            if (oriType['kind'] === '_NON_' && (tarType['kind'] === '_NON_')) return;
            if (oriType['kind'] === '_ANY_' && (tarType['kind'] === '_ANY_')) return;
        }
        
        //  원본은 초인스가 아니고, target choice 의 인 경우
        if (oriType['$type'] !== 'choice' && tarType['$type'] === 'choice' ) {
            var choType = { $type: 'choice', kind: '_REQ_', list: [origin] };
            _execAllow(choType, target, opt);
            return;
        }

        // check allow type
        if (_isLeafType(oriType['$type'])) {
            if(typeof oriType['default'] !== 'undefined' && oriType['default'] !== null && !_equalLiternal(oriType['default'], tarType['default'])) {
                throw new ExtendError(Message.get('ES0712', [oriType['$type'], oriType['default'], tarType['default']]));
            }
            // if (tarType['$type'] === 'choice') {
            //     var choType = { $type: 'choice', kind: '_OPT_', list: [oriType] };
            //     _execAllow(choType, tarType, opt);
            // } else if (oriType['$type'] !== tarType['$type']) Message.error('ES0713', [oriType['$type'], tarType['$type']]);
            if (oriType['$type'] !== tarType['$type']) throw new ExtendError(Message.get('ES0713', [oriType['$type'], tarType['$type']]));
        
        } else if (oriType['$type'] === 'array')  arrayAllow();
        else if (oriType['$type'] === 'choice') choiceAllow();
        else if (oriType['$type'] === 'class') classAllow();
        else if (oriType['$type'] === 'union') unionAllow();
        else if (oriType['$type'] === 'function') functionAllow();
        else throw new ExtendError(Message.get('ES022', ['type']));    // Line:

        // inner function
        function arrayAllow() {
            if (oriType['list'].length === 0 && !oriType['kind'] && tarType['$type'] === 'array') return;      // [], [[]], Array
            if (!Array.isArray(tarType['list'])) Message.error('ES0719', ['array']);
            
            // _ALL_ (all)
            if (oriType['kind'] === '_ALL_') {
                return;     // Line:

            // _ANY_ (any)
            } else if (oriType['kind'] === '_ANY_') {
                if (tarType['kind'] && tarType['list'].length === 0) Message.error('ES075', ['array _ANY_', 'undefined']);
                if (tarType['list'].length > 0) return;
                throw new ExtendError(Message.get('ES0738', ['array(any)', error])); // Line:
                // throw new ExtendError('array any 는 하나 이싱 요소가 존재해야 합니다.');  

            // _SEQ_ (sequence)
            } else if (oriType['kind'] === '_SEQ_') {
                if (oriType['kind'] !== tarType['kind'])  throw new ExtendError(Message.get('ES0719', ['_SEQ_']));
                if (oriType['list'].length > tarType['list'].length) {
                    throw new ExtendError(Message.get('ES0720', [oriType.toString(), tarType.toString()]));
                }

                // element check
                for (var i = 0; i < oriType['list'].length; i++) {
                    try {
                        _execAllow(oriType['list'][i], tarType['list'][i], opt);
                    } catch (error) {
                        throw new ExtendError(Message.get('ES0711', ['array', '_SEQ_', '']), error);
                    }
                }
                return;
            
            // _REQ_ (require)
            } else if (oriType['kind'] == '_REQ_') {
                // if (oriType['list'].length < tarType['list'].length) {
                //     Message.error('ES0716', ['array _OPT_', oriType.toString(), tarType.toString()]);
                // }
                if (oriType['list'].length > 0 && tarType['list'].length === 0) {
                    throw new ExtendError(Message.get('ES0717', ['array']));     // Line:
                }
                // element check
                // for (var i = 0; i < tarType['list'].length; i++) {
                //     var success = false;
                //     for (var ii = 0; ii < oriType['list'].length; ii++) {
                //         try {
                //             if (success) break;
                //             if (extendType(tarType['list'][i])['$type'] === 'choice' && extendType(oriType['list'][ii])['$type'] !== 'choice' ) {
                //                 var oriChoice = { $type: 'choice', kind: '_OPT_', list: oriType['list'] };
                //                 _execAllow(oriChoice, tarType['list'][i], opt);
                //             } else {
                //                 _execAllow(oriType['list'][ii], tarType['list'][i], opt);
                //             }
                //             success = true;

                //             // if (success) continue;
                //             // _execAllow(oriType['list'][ii], tarType['list'][i], opt);
                //             // success = true;
                //         } catch (error) {
                //             continue;
                //         }
                //     }
                //     if (!success) Message.error('ES0738', ['array(_REQ_)', extendType(tarType['list'][i])['$type']]);
                // }

            // _OPT_ (option)
            } else if (oriType['kind'] === '_OPT_') {
                if (Array.isArray(tarType['list']) && tarType['list'].length === 0) return;

                // element check
                // for (var i = 0; i < tarType['list'].length; i++) {
                //     var success = false;
                //     for (var ii = 0; ii < oriType['list'].length; ii++) {
                //         try {
                //             if (success) break;
                //             if (extendType(tarType['list'][i])['$type'] === 'choice' && extendType(oriType['list'][ii])['$type'] !== 'choice' ) {
                //                 var oriChoice = { $type: 'choice', kind: '_OPT_', list: oriType['list'] };
                //                 _execAllow(oriChoice, tarType['list'][i], opt);
                //             } else {
                //                 _execAllow(oriType['list'][ii], tarType['list'][i], opt);
                //             }
                //             success = true;

                //             // if (success) continue;
                //             // _execAllow(oriType['list'][ii], tarType['list'][i], opt);
                //             // success = true;
                //         } catch (error) {
                //             continue;
                //         }
                //     }
                //     if (!success) Message.error('ES0738', ['array(_OPT_)', extendType(tarType['list'][i])['$type']]);
                // }
            
            // throw 
            } else {              
                throw new ExtendError(Message.get('ES0735', [oriType['kind']]));     // Line:
            }

            // element check
            for (var i = 0; i < tarType['list'].length; i++) {
                var success = false;
                for (var ii = 0; ii < oriType['list'].length; ii++) {
                    try {
                        if (success) break;
                        if (extendType(tarType['list'][i])['$type'] === 'choice' && extendType(oriType['list'][ii])['$type'] !== 'choice' ) {
                            var oriChoice = { $type: 'choice', kind: '_OPT_', list: oriType['list'] };
                            _execAllow(oriChoice, tarType['list'][i], opt);
                        } else {
                            _execAllow(oriType['list'][ii], tarType['list'][i], opt);
                        }
                        success = true;

                        // if (success) continue;
                        // _execAllow(oriType['list'][ii], tarType['list'][i], opt);
                        // success = true;
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) throw new ExtendError(Message.get('ES0738', ['array(_REQ_)', extendType(tarType['list'][i])['$type']]));
            }
        }
        


        function choiceAllow() {

            // if (oriType['$type'] === 'choice' && tarType['$type'] !== 'choice' ) {
            //     var choType = { $type: 'choice', kind: '_REQ_', list: [target] };
            //     _execAllow(origin,  choType, opt);
            //     return;
            // }

            // _ALL_ (all)
            if (oriType['kind'] === '_ALL_') {
                return;

            // _ANY_ (any)
            } else if (oriType['kind'] === '_ANY_') {
                if (typeof tarType['ref'] !== 'undefined') return;
                throw new ExtendError(Message.get('ES0714', ['_ANY_', 'undefined']));
            
            // _NON_ TODO: 확인 팔요, 공통적으로 

            // _ERR_ (error)
            } else if (oriType['kind'] === '_ERR_') {
                if (oriType['$type'] !== tarType['$type'] || oriType['kind'] !== tarType['kind']) {
                    throw new ExtendError(Message.get('ES021', ['target', 'choice(err)']));
                    // throw new ExtendError('target 은 _err_ 타입만 가능합니다.');
                }
                return;
            // _SEQ_ (sequence)
            // } else if (oriType['kind'] === '_SEQ_') {   // REVIEW: 필요성 검토 필요 
            //     if (tarType['kind'] !== '_SEQ_') Message.error('ES0731', ['target', tarType['kind']]);
            //     if (oriType['list'].length > tarType['list'].length) {
            //         Message.error('ES0732', [oriType.toString(), tarType.toString()]);
            //     }
            //     if (oriType['list'].length === 0 && tarType['list'].length > 0) return;
            //     for (i = 0; i < oriType['list'].length; i++) {
            //         try {
            //             _execAllow(oriType['list'][i], tarType['list'][i], opt);
            //         } catch (error) {
            //             Message.error('ES0733', [oriType['list'][i], tarType['list'][i]]);
            //         }
            //     }

            // _REQ_ (require)
            } else if (oriType['kind'] === '_REQ_') {
                if (tarType['kind'] && tarType['ref'].length === 0) {
                    throw new ExtendError(Message.get('ES0734'));    // Line:
                }
                // var arrTarget = (tarType['kind']) ? tarType['list'] : [tarType['ref']];

                // if (oriType['list'].length > 0 && arrTarget.length === 0) {
                //     Message.error('ES0717', [oriType.toString(), arrTarget.toString(),]);
                // }
                // for (var i = 0; i < arrTarget.length; i++) {
                //     var success = false;
                //     for (var ii = 0; ii < oriType['list'].length; ii++) {
                //         try {
                //             if (success) continue;
                //             _execAllow(oriType['list'][ii], arrTarget[i], opt);
                //             success = true;
                //         } catch (error) {
                //             continue;
                //         }
                //     }
                //     if (!success) Message.error('ES0738', ['choice(_OPT_)', extendType(arrTarget[i])['$type']]);
                // }

            // _OPT_ (option)
            } else if (oriType['kind'] === '_OPT_') {
                // if (typeof tarType['ref'] === 'undefined') return;
                if (typeof target === 'undefined') return;
                // var arrTarget = (tarType['kind']) ? tarType['list'] : [tarType['ref']];

                // if (oriType['list'].length > 0 && arrTarget.length === 0) {
                //     Message.error('ES0717', [oriType.toString(), arrTarget.toString(),]);
                // }
                // for (i = 0; i < arrTarget.length; i++) {
                //     var success = false;
                //     for (var ii = 0; ii < oriType['list'].length; ii++) {
                //         try {
                //             if (success) continue;
                //             _execAllow(oriType['list'][ii], arrTarget[i], opt);
                //             success = true;
                //         } catch (error) {
                //             continue;
                //         }
                //     }
                //     if (!success) Message.error('ES0738', ['_OPT_', extendType(arrTarget[i])['$type']]);
                // }

            // _EUN_ (enumeration)
            } else if (oriType['kind'] === '_EUM_') {
                if (oriType['$type'] !== tarType['$type'] || oriType['kind'] !== tarType['kind']) {
                    throw new ExtendError(Message.get('ES021', ['target', 'choice(eum)']));
                    // throw new ExtendError('target 은 _eum_ 타입만 가능합니다.');
                }
                if (oriType['list'].length === 0) throw new ExtendError(Message.get('ES0738', ['origin']));
                // if (oriType['list'].length === 0) throw new ExtendError('origin _eum_(enum) 1개이상 항목이 필요합니디.');
                if (tarType['list'].length === 0) throw new ExtendError(Message.get('ES0738', ['target']));
                // if (tarType['list'].length === 0) throw new ExtendError('target _eum_(enum) 1개이상 항목이 필요합니디.');
                for (var ii = 0; ii < oriType['list'].length; ii++) {
                    if (!_isLiteral(oriType['list'][ii])) throw new ExtendError(Message.get('ES021', ['origin choice(eum)', '리터럴']));
                    // if (!_isLiteral(oriType['list'][ii])) throw new ExtendError('origin _eum_(enum)은 리터럴 타입만 가능합니다.');
                }
                for (var ii = 0; ii < tarType['list'].length; ii++) {
                    if (!_isLiteral(tarType['list'][ii])) throw new ExtendError(Message.get('ES021', ['target choice(eum)', '리터럴']));
                    // if (!_isLiteral(tarType['list'][ii])) throw new ExtendError('target _eum_(enum)은 리터럴 타입만 가능합니다.');
                }

            // _DEF_ (default)
            } else if (oriType['kind'] === '_DEF_') {
                if (oriType['$type'] !== tarType['$type'] || oriType['kind'] !== tarType['kind']) {
                    throw new ExtendError(Message.get('ES021', ['target choice', 'choice(def)']));
                    // throw new ExtendError('target 은 _def_ 타입만 가능합니다.');
                }
                if (oriType['list'].length === 0) throw new ExtendError(Message.get('ES0738', ['origin choice(def)']));
                // if (oriType['list'].length === 0) throw new ExtendError('origin _def_(default) 1개이상 항목이 필요합니디.');
                if (tarType['list'].length === 0) throw new ExtendError(Message.get('ES0738', ['target choice(def)']));
                // if (tarType['list'].length === 0) throw new ExtendError('target _def_(default) 1개이상 항목이 필요합니디.');
                if (!_isLiteral(oriType['list'][0])) throw new ExtendError(Message.get('ES021', ['origin choice(def)', '1번재는 리터럴타입']));
                // if (!_isLiteral(oriType['list'][0])) throw new ExtendError('origin _def_(default) 1번째는 리터럴 타입만 가능합니다.');
                if (!_isLiteral(tarType['list'][0])) throw new ExtendError(Message.get('ES021', ['target choice(def)', '1번재는 리터럴타입']));
                // if (!_isLiteral(tarType['list'][0])) throw new ExtendError('target _def_(default) 1번째는 리터럴 타입만 가능합니다.');
                // if (typeof target === 'undefined') {
                //     target = oriType['list'][0];
                //     return;
                // }

            } else {
                throw new ExtendError(Message.get('ES0735', [oriType['kind']]));
            }

            // element check


            // var arrTarget = (tarType['kind']) ? tarType['list'] : [tarType['ref']];
            var arrTarget = (tarType['kind']) ? tarType['list'] : [target];

            if (oriType['list'].length > 0 && arrTarget.length === 0) {
                throw new ExtendError(Message.get('ES0717', [oriType.toString(), arrTarget.toString(),]));
            }
            for (var i = 0; i < arrTarget.length; i++) {
                var success = false;
                for (var ii = 0; ii < oriType['list'].length; ii++) {
                    try {
                        if (success) continue;
                        _execAllow(oriType['list'][ii], arrTarget[i], opt);
                        success = true;
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) throw new ExtendError(Message.get('ES0738', ['_OPT_', extendType(arrTarget[i])['$type']]));
            }
        }
        
        function classAllow() {
            if (tarType['$type'] === 'class') {         // # class to class
                if (isProtoChain(tarType['ref'], oriType['ref'])) return;   // 1.proto check
                if (opt === 1) {
                    try {
                        // 생성비교
                        var oriObj = new oriType['ref']();
                        var tarObj = new tarType['ref']();
                        return _execAllow(oriObj, tarObj, opt);
                    } catch (error) {
                        throw new ExtendError(Message.get('ES0724', ['object', '']), error);
                    }                    
                }
            } else if (tarType['$type'] === 'union') {  // # class to union
                if (opt === 1) {
                    try {
                        // 생성비교
                        var oriObj = new oriType['ref']();
                        return _execAllow(oriObj, tarType['ref'], opt);
                    } catch (error) {
                        throw new ExtendError(Message.get('ES0724', ['object', '']), error);
                    }                    
                }
            }
            throw new ExtendError(Message.get('ES0725', ['object']));
        }

        function unionAllow() {
            var list;

            if (tarType['$type'] !== 'union') throw new ExtendError(Message.get('ES024', ['target', 'union']));
            // if (tarType['$type'] !== 'union') throw new ExtendError('union 타입이 아닙니다.');
            list = getAllProperties(oriType['ref']);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                try {
                    _execAllow(oriType['ref'][key], tarType['ref'][key], opt);
                } catch (error) {
                    throw new ExtendError(Message.get('ES0726', ['union', '']), error);
                }
            }
        }

        function functionAllow() {
            if (tarType['$type'] !== 'function')  throw new ExtendError(Message.get('ES0713', [oriType['$type'], tarType['$type']]));
            if (oriType['ref'] === Function) return;
            // special type check
            if (oriType['name']) {
                if (oriType['name'] === target.name  
                || oriType['name'] === tarType['name'] 
                || (tarType['func'] && oriType['name'] === tarType['func'].name)) return;
                throw new ExtendError(Message.get('ES0740', [oriType['name'], 'target name']));
                // throw new ExtendError('지정한 함수 이름과 다릅니다.');
            }
            if (oriType['func']) {
                if (typeof tarType['func'] !== 'function') throw new ExtendError(Message.get('ES024', ['target func', 'function']));
                // if (typeof tarType['func'] !== 'function') throw new ExtendError('func = function 타입이 아닙니다.');
                if (isProtoChain(tarType['func'], oriType['func'])) return;
                throw new ExtendError(Message.get('ES0740', ['origin', 'func 타입']));
                // throw new ExtendError('지정한 함수 func 타입이 다릅니다.');
            }

            if (!oriType['return'] && (!oriType['params'] || oriType['params'].length === 0)) return;
            if ((oriType['return'] || oriType['params'].length > 0) && !tarType) throw new ExtendError(Message.get('ES079', ['target', 'function', '_TYPE']));
            if (typeof tarType['params'] === 'undefined' && typeof tarType['return'] === 'undefined') { 
                throw new ExtendError(Message.get('ES0710', ['target', 'function', ' {params: [], return: []} ']));
            }
            // if (!oriType['return'] && oriType['params'].length === 0) return;    // success
            // if (oriType['params'].length !== tarType['params'].length) {
            //     Message.error('ES0721', ['function', 'params', oriType['params'].length]);
            // }

            if (Array.isArray(oriType['params']) && oriType['params'].length > 0) {  
                try {   // params check
                    _execAllow(['_SEQ_'].concat(oriType['params']), ['_SEQ_'].concat(tarType['params']), opt);
                } catch (error) {
                    throw new ExtendError(Message.get('ES0722', ['function', 'params', '']), error);
                }
            }
            if (oriType['return']) {            
                try {   // return check
                    _execAllow(oriType['return'], tarType['return'], opt);
                } catch (error) {
                    throw new ExtendError(Message.get('ES0722', ['function', 'return', '']), error);
                }
            }
        }
    };

    /**
     * 타입을 검사하여 메세지를 리턴
     * @param {any} type 검사할 타입 , origin
     * @param {any} target 검사대상
     * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
     * @param {string?} tarName '' 공백시 성공
     * @returns {throw?}
     */
    var _execMatch = function(type, target, opt, tarName) {
        var tarName = tarName ? tarName : 'this';
        var defType = extendType(type);
        var tarType = extendType(target);
        var prop = {};


        opt = opt || 0;

        // seq, opt 필수 검사
        if (defType['kind']) {
            if ((defType['kind'] === '_SEQ_' || defType['kind'] === '_OPT_' || defType['kind'] === '_REQ_') 
            && (typeof defType['ref'] === 'undefined' || defType['list'].length === 0)) {
                throw new ExtendError(Message.get('ES0729', ['type', defType['kind']]));
            }
        }

        // check match type
        if (defType['$type'] === 'null') {
            if (target !== null) throw new ExtendError(Message.get('ES074', [tarName, 'null']));
        
        } else if (defType['$type'] === 'undefined') {
            if (typeof target !== 'undefined') throw new ExtendError(Message.get('ES074', [tarName, 'undefined']));
        
        } else if (defType['$type'] === 'number') {
            if (typeof defType['default'] === 'number' && typeof target === 'undefined') target = defType['default']; 
            if (typeof target !== 'number') throw new ExtendError(Message.get('ES074', [tarName, 'number']));
        
        } else if (defType['$type'] === 'string') {
            if (typeof defType['default'] === 'string' && typeof target === 'undefined') target = defType['default'];
            if (typeof target !== 'string') throw new ExtendError(Message.get('ES074', [tarName, 'string']));
        
        } else if (defType['$type'] === 'boolean') {
            if (typeof defType['default'] === 'boolean' && typeof target === 'undefined') target = defType['default'];
            if (typeof target !== 'boolean') throw new ExtendError(Message.get('ES074', [tarName, 'boolean']));
        
        } else if (defType['$type'] === 'bigint') {    // ES6+
            if (typeof defType['default'] === 'bigint' && typeof target === 'undefined') target = defType['default'];
            if (typeof target !== 'bigint') throw new ExtendError(Message.get('ES074', [tarName, 'bigint']));
        
        } else if(defType['$type'] === 'symbol') {    // ES6+
            if (typeof target !== 'symbol') throw new ExtendError(Message.get('ES074', [tarName, 'symbol']));
        
        } else if (defType['$type'] === 'regexp') {
            if (defType['default'] && defType['default'] !== null && typeof target === 'undefined') target = defType['default'];
            if (!(target instanceof RegExp)) throw new ExtendError(Message.get('ES074', [tarName, 'regexp']));
        
        } else if (defType['$type'] === 'object') {
            if (tarType['$type'] !== 'object') throw new ExtendError(Message.get('ES074', [tarName, 'object']));

        } else if (defType['$type'] === 'array') arrayMatch();
        else if (defType['$type'] === 'choice') choiceMatch();
        else if (defType['$type'] === 'class') classMatch();
        else if (defType['$type'] === 'union') unionMatch();
        else if (defType['$type'] === 'function') functionMatch();        
        else throw new ExtendError(Message.get('ES022', [defType['$type']]));        // Line:


        // inner function
        function arrayMatch() {
            if (!Array.isArray(target)) throw new ExtendError(Message.get('ES024', [tarName, 'array']));
            
            // _ALL_ (all)
            if (defType['kind'] === '_ALL_') {      
                return;

            // _ANY_ (any)
            } else if (defType['kind'] === '_ANY_') {
                if (target.length === 0) throw new ExtendError(Message.get('ES0738', ['array(any)', error]));
                // if (target.length === 0) throw new ExtendError('array any 타입에는 요소를 하나 이상 가지고 있어야 합니다.');
                return;

            // _SEQ_ (sequence)
            } else if (defType['kind'] === '_SEQ_') {
                for(var i = 0; i < defType['list'].length; i++) {
                    var _elem   = defType['list'][i];
                    var _tar    = tarType['list'][i];
                    if (typeof _tar === 'undefined') throw new ExtendError(Message.get('ES075', ['array', '_SEQ_', 'index['+i+']']));    // REVIEW: 세부정보 표현
                    if (_isLiteral(_elem)) {
                        if (!_equalLiternal(_elem, _tar)) throw new ExtendError(Message.get('ES0740', ['array(seq)', '리터럴 타입']));
                        // if (!_equalLiternal(_elem, _tar)) throw new ExtendError('array seq 리터럴 타입이 다릅니다.');
                    } else {
                        if (_execMatch(_elem, _tar, opt, tarName)) throw new ExtendError(Message.get('ES0740', ['array(seq)', '리터럴 타입']));
                        // if (_execMatch(_elem, _tar, opt, tarName)) throw new ExtendError('array seq 타입이 다릅니다.');
                    }
                }
                return;

            // _REQ_ (require)
            } else if (defType['kind'] === '_REQ_') {
                if (target.length === 0) throw new ExtendError(Message.get('ES0717', ['array']));
                // if (target.length === 0) throw new ExtendError('array req 타입에는 요소를 하나 이상 가지고 있어야 합니다.');

            // _OPT_ (option)
            } else if (defType['kind'] === '_OPT_') {
                if (Array.isArray(target) && target.length === 0) return;
            }
            
            // element check
            for (var i = 0; i < target.length; i++) {
                var tar = target[i];
                var success = false;
                for (var ii = 0; ii < defType['list'].length; ii++) {
                    try {
                        var elem = defType['list'][ii];
                        if (_isLiteral(elem)) {
                            if (_equalLiternal(elem, tar)) {
                                success = true;
                                break;
                            }
                        } else {
                            _execMatch(elem, tar, opt, tarName);    // REVIEW: tarName + '['+i+']'  이렇게 들어가야 함
                            success = true;
                            break;
                        }
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) {
                    var logTitle = defType['kind'] ? 'array('+defType['kind']+')' : 'array';
                    throw new ExtendError(Message.get('ES076', [logTitle, defType.toString(), tarType.toString()]));
                }
            }
        }

        function choiceMatch() {
            // _ALL_ (all)
            if (defType['kind'] === '_ALL_') {
                return;

            // _ANY_ (any)
            } else if (defType['kind'] === '_ANY_') {
                if (typeof target !== 'undefined') return;
                throw new ExtendError(Message.get('ES0714', ['choice', '_ANY_', 'undefined']));

            // _NON_ (none)
            } else if (defType['kind'] === '_NON_') {
                if (typeof target === 'undefined') return;
                throw new ExtendError(Message.get('ES0741', ['choice(non)']));
                // throw new ExtendError(' 어떤한 값도 설정할 수 없습니다.');

            // _ERR_ (error) TODO: 테스트 필요

            // _REQ_ (require)
            } else if (defType['kind'] === '_REQ_') {
                if (defType['list'].length === 0) throw new ExtendError(Message.get('ES0734'));
                // if (defType['list'].length === 0) throw new ExtendError('_req_(require) 필수 항목이 없습니다.');

            // _OPT_ (option)
            } else if (defType['kind'] === '_OPT_') {
                if (typeof target === 'undefined') return;

            // _EUN_ (enumeration)
            } else if (defType['kind'] === '_EUM_') {
                if (defType['list'].length === 0) throw new ExtendError(Message.get('ES0738', ['origin']));
                // if (defType['list'].length === 0) throw new ExtendError('_eum_(enum) 1개이상 항목이 필요합니디.');
                for (var ii = 0; ii < defType['list'].length; ii++) {
                    if (!_isLiteral(defType['list'][ii])) throw new ExtendError(Message.get('ES021', ['origin choice(eum)', '리터럴']));
                    // if (!_isLiteral(defType['list'][ii])) throw new ExtendError('_eum_(enum)은 리터럴 타입만 가능합니다.');
                }

            // _DEF_ (default)
            } else if (defType['kind'] === '_DEF_') {
                if (defType['list'].length === 0) throw new ExtendError(Message.get('ES0738', ['origin choice(def)']));
                // if (defType['list'].length === 0) throw new ExtendError('_def_(default) 1개이상 항목이 필요합니디.');
                if (!_isLiteral(defType['list'][0])) throw new ExtendError(Message.get('ES021', ['origin choice(def)', '1번재는 리터럴타입']));
                // if (!_isLiteral(defType['list'][0])) throw new ExtendError('_def_(default) 1번째는 리터럴 타입만 가능합니다.');
                if (typeof target === 'undefined') {
                    target = defType['list'][0];
                    return;
                }
            
            // _SEQ_ (sequence) 
            // } else if (defType['kind'] === '_SEQ_') {   // REVIEW: 필요성 검토 필요
            //     Message.error('ES077', ['choice', '_SEQ_']);

            }

            // element check
            for (var ii = 0; ii < defType['list'].length; ii++) {
                try {
                    var elem = defType['list'][ii];
                    if (_isLiteral(elem)) {
                        if (_equalLiternal(elem, target)) return;
                    } else {
                        return _execMatch(elem, target, opt, tarName);
                    }
                } catch (error) {
                    continue;
                }
            }
            var logTitle = defType['kind'] ? 'choice('+defType['kind']+')' : 'choice';
            
            // throw new ExtendError(Message.get('ES076', [logTitle, defType.toString(), tarType.toString()]));
            throw new ExtendError('[ES076] choice(_OPT_) 타입 검사에 실패하였습니다. origin: ['+ defType.toString() +'], target: ['+ tarType.toString()+']',
            {'target path': tarName});
        }

        function classMatch() {
            if (tarType['$type'] === 'class') {         // # class to class
                if (typeof defType['ref'] === 'undefined') return;  // 전역 클래스 타입
                if (isProtoChain(tarType['ref'], defType['ref'])) return;
            } else if (typeof target === 'object') {    // # class to typeof 'object'
                if (target instanceof type) return;     
                if (!_isBuiltFunction(type) && target !== null && opt === 1) {
                    return _execMatch(_creator(type), target, opt, tarName);
                }
            }
            throw new ExtendError(Message.get('ES032', [tarName, _typeName(type)]));
        }

        function unionMatch() {
            var list;
            
            if (tarType['$type'] !== 'union') Message.error('ES024', ['target', 'union']);
            // if (tarType['$type'] !== 'union') throw new ExtendError('union 타입이 아닙니다.');
            list = getAllProperties(defType.ref);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = extendType(type[key]);
                // REVIEW: for 위쪽으로 이동 검토!
                if (!_isObject(target)) return Message.error('ES031', [tarName + '.' + key]);                 // target 객체유무 검사
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                // REVIEW: 재귀로 구현 체크
                if (typeof listDefType['default'] !== 'undefined' && listDefType['default'] !== null && typeof target[key] === 'undefined')      // default 설정
                    target[key] = listDefType['default'];
                if (target !== null && !(key in target)) throw new ExtendError(Message.get('ES027', [listDefType['$type'], tarName + '.' + key]));    
                _execMatch(type[key], target[key], opt, tarName +'.'+ key);
            }
        }

        function functionMatch() {
            if (tarType['$type'] !== 'function') throw new ExtendError(Message.get('ES024', [tarName, 'function']));
            if (defType['ref'] === Function) return;
            // special type check
            if (defType['name']) {
                if (defType['name'] === target.name 
                || defType['name'] === tarType['name'] 
                || (tarType['func'] && defType['name'] === tarType['func'].name)) return;
                throw new ExtendError(Message.get('ES0740', [defType['name'], 'target name']));
                // throw new ExtendError('지정한 함수 이름과 다릅니다.');
            }
            if (defType['func']) {
                if (typeof tarType['func'] !== 'function') throw new ExtendError(Message.get('ES024', ['target func', 'function']));
                // if (typeof tarType['func'] !== 'function') throw new ExtendError('func = function 타입이 아닙니다.');
                if (isProtoChain(tarType['func'], defType['func'])) return;
                throw new ExtendError(Message.get('ES0740', ['origin', 'func 타입']));
                // throw new ExtendError('지정한 함수 prop 타입이 다릅니다.');
            }

            if (!defType['return'] && (!defType['params'] || defType['params'].length === 0)) return;
            if ((defType['return'] || defType['params'].length > 0) && !tarType) throw new ExtendError(Message.get('ES079', ['target', 'function', '_TYPE']));
            if (typeof tarType['params'] === 'undefined' && typeof tarType['return'] === 'undefined') { 
                throw new ExtendError(Message.get('ES0710', ['target', 'function', ' {params: [], return: []} ']));
            }
            // params check
            if (Array.isArray(defType['params']) && defType['params'].length > 0) {  
                try {
                    _execAllow(['_SEQ_'].concat(defType['params']), ['_SEQ_'].concat(tarType['params']));
                } catch (error) {
                    throw new ExtendError(Message.get('ES0711', ['function', 'params', '']), error);
                }
            }
            // return check
            if (defType['return']) {            
                try {
                    _execAllow(defType['return'], tarType['return'], opt);
                } catch (error) {
                    throw new ExtendError(Message.get('ES0711', ['function', 'return', '']), error);
                }
            }
        }
    };

    /**
     * 원본타입에 대상타입을 적용(설정)가능 여부를 검사한다.
     * @memberof _L.Common.Util
     * @param {any} origin 
     * @param {any} target 
     * @returns {throw?} 실패시 예외를 던진다.
     */
    var allowType = function(origin, target, opt) {
        try {
            if (typeof origin === 'undefined') throw new ExtendError(Message.get('ES026', ['origin']));
            _execAllow(origin, target, opt);
        } catch (error) {
            throw new ExtendError('[ES069] allowType() 검사가 실패하였습니다.', error);
            // throw new ExtendError(Message.get('ES069', ['check allow type']), error);
        }
    };    

    /**
     * 대상의 타입 여부를 검사합니다.
     * @memberof _L.Common.Util
     * @param {any} chkType 
     * @param {any} target 
     * @returns {throw?} 실패시 예외를 던진다.
     */
    var matchType = function(chkType, target, opt) {
        try {
            if (typeof chkType === 'undefined') throw new ExtendError(Message.get('ES026', ['chkType']));
            _execMatch(chkType, target, opt);
        } catch (error) {
            // console.error(error.message);
            // throw new ExtendError(Message.get('ES069', ['check type', 'path: aa / bb ']));
            // throw new ExtendError(Message.get('ES069', ['check type', error.message]), error);
            throw new ExtendError('[ES069] matchType(type, target) 검사가 실패하였습니다.', error);
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
    var isMatchType = function(chkType, target, opt) {
        // if (typeof chkType === 'undefined') return false;
        try {
            _execMatch(chkType, target, opt);
            return true;
        } catch (error) {
            return false;
        }
    };


    //==============================================================
    // 5. module export
    if (isNode) {
        exports.getAllProperties = getAllProperties;
        exports.deepEqual = deepEqual;
        exports.isProtoChain = isProtoChain;
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
            getAllProperties: getAllProperties,
            deepEqual: deepEqual,
            isProtoChain: isProtoChain,
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