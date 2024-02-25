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
            else throw new ExtendError(/EL01301/, null, [funBody]);
            
            if (arrFunc === null) throw new ExtendError(/EL01302/, null, [funBody]);

            arrParam = (new Function('return ['+ arrFunc[1] +']'))();
            result['params'] = arrParam;
            
            if (arrFunc[2] !== '') arrRetrun = (new Function('return '+ arrFunc[2]))()
            result['return'] = arrRetrun;

        } catch (error) {
            throw new ExtendError(/EL01303/, null, [''], error);
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
     * 
     * extType: array(_ANY_)
     * tarType: choice(_ALL_)
     * tarType: choice(_NON_)[string, number]
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
                    // POINT:
                    // if (_type['kind']) arr.push(extendType(this['list'][i]).toString());
                    // if (this['$type'] === _type['$type']) arr.push(extendType(this['list'][i]).toString());
                    // else {
                        if (_type['default'] && _type['default'] !== null) {
                            var def;
                            if (_type['$type'] === 'string') def = '\''+ _type['default'] +'\'';
                            else def = _type['default'];
                            arr.push(_type['$type'] + '('+ def +')');
                        } else arr.push(_type['$type']);
                    // }
                }
                if (this['kind'] === '_OPT_' || this['kind'] === '_REQ_' || this['kind'] === '_SEQ_' || this['kind'] === '_EUM_' || this['kind'] === '_DEF_') {
                    temp = this['$type'] +'('+ this['kind'] +')['+ arr.join(', ')+ ']';
                } else temp = this['$type'] +'('+ this['kind'] +')';
                
            } else {
                temp = this['$type'];
                if (this['default'] && this['default'] !== null) {
                    if (this['$type'] === 'string') temp += '(\''+ this['default'] +'\')';
                    else temp += '('+this['default']+')';
                }
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
            if (!_hasType(obj['$type'])) throw new ExtendError(/EL01304/, null, [obj['$type']]);
            if (obj['$type'] === 'array') {
                obj['kind'] = obj['kind'] || '_ALL_';
                if (!_hasKindArray(obj['kind'])) throw new ExtendError(/EL01305/, null, [obj['kind']]);
            }
            if (obj['$type'] === 'choice') {
                if (!_hasKindChoice(obj['kind'])) throw new ExtendError(/EL01306/, null, [obj['kind']]);
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
            if (obj['$type'] === 'array' && !_hasKindArray(obj['kind'])) throw new ExtendError(/EL01307/, null, [obj['kind']]);
            if (obj['$type'] === 'choice' && !_hasKindChoice(obj['kind'])) throw new ExtendError(/EL01308/, null, [obj['kind']]);

        // step : object
        } else if (_isFillObj(type) || _isEmptyObj(type)) {
            obj['$type'] = 'union';
        } else if(_isPrimitiveObj(type)) {
            obj['$type'] = 'object';
        } else throw new ExtendError(/EL01309/, null, ['type']);    // Line:
        
        return obj;
    }

    /**
     * 원본타입에 대상타입이 덮어쓰기가 허용 가능한지 검사합니다.  
     * 원본타입에 대상타입으로 캐스팅이 가능하지 확인합니다.
     * @memberof _L.Common.Util
     * @param {any} extType 원본 타입
     * @param {any} tarType 대상 타입
     * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
     * @param {string?} pathName '' 공백시 성공
     * @returns {throw?}
     */
    var _execAllow = function (extType, tarType, opt, pathName) {
        var eType = extendType(extType);
        var tType = extendType(tarType);
        var prop = {};
        var sExt = eType.toString(), sTar = tType.toString();
        var typeMsg = 'extType:['+ sExt +'], tarType:['+ sTar +']';
        
        pathName = pathName ? pathName : 'extType';
        if (pathName !== 'extType' || !pathName) prop['error path'] = pathName;
        opt = opt || 0;

        if (_isObject(eType['ref']) &&  _isObject(tType['ref']) && deepEqual(eType, tType)) return;
        // origin seq, opt 필수 검사
        if (eType['kind']) {
            if ((eType['kind'] === '_SEQ_' || eType['kind'] === '_OPT_' || eType['kind'] === '_REQ_' || eType['kind'] === '_EUM_'|| eType['kind'] === '_DEF_') 
            && (/*typeof oriType['ref'] === 'undefined' || */ eType['list'].length === 0)) {
                throw new ExtendError(/EL01201/, prop, ['extType', sExt]);
            }
        }
        // tarType seq, opt 필수 검사
        if (tType['kind']) {
            if ((tType['kind'] === '_SEQ_' || tType['kind'] === '_OPT_' || tType['kind'] === '_REQ_'  || tType['kind'] === '_EUM_'|| tType['kind'] === '_DEF_') 
            && (/*typeof tType['ref'] === 'undefined' || */ tType['list'].length === 0)) {
                throw new ExtendError(/EL01201/, prop, ['tarType', sTar]);
            }
        }
        // all, non, any, req, opt, seq 타입 검사
        if (eType['kind'] && tType['kind'] && eType['$type'] === tType['$type']) {
            // 거부조건
            if (eType['kind'] === '_ALL_' && (tType['kind'] === '_ERR_')) {
                throw new ExtendError(/EL01202/, prop, [eType['$type'], sTar]);
            } 
            if (eType['kind'] === '_NON_' && tType['kind'] !== '_NON_') { 
                throw new ExtendError(/EL01203/, prop, [eType['$type'], sTar]);
            }
            if (eType['kind'] === '_ANY_' && (tType['kind'] === '_ALL_' || tType['kind'] === '_OPT_' || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                throw new ExtendError(/EL01204/, prop, [eType['$type'], sTar]);
            }
            if (eType['kind'] === '_ERR_' && tType['kind'] !== '_ERR_') { 
                throw new ExtendError(/EL01205/, prop, [eType['$type'], sTar]);
            }
            
            // if (oriType['kind'] === '_ANY_' && (tType['kind'] === '_ALL_' || tType['kind'] === '_NON_')) {
            //     Message.error('ES0727', [oriType['kind'], '_ALL_, _NON_', tType['kind']]);
            // }
            if (eType['kind'] === '_OPT_' && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                throw new ExtendError(/EL01206/, prop, [eType['$type'], sTar]);
            } 
            if (eType['kind'] === '_REQ_' && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' ||  tType['kind'] === '_OPT_' || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                throw new ExtendError(/EL01207/, prop, [eType['$type'], sTar]);
            }
            // if (eType['$type'] === 'array' eType['kind'] === '_SEQ_' && tType['kind'] !== '_SEQ_') { 
            //     throw new ExtendError(/EL01208/, prop, [eType['$type'], sTar]);
            // }
            // 허용 조건
            if (eType['kind'] === '_ALL_' && (tType['kind'] !== '_ERR_')) return;   // REVIEW: 상단으로 통합 대기
            if (eType['kind'] === '_NON_' && (tType['kind'] === '_NON_')) return;   // REVIEW: 상단에서 걸러짐, 제거 검토
            if (eType['kind'] === '_ANY_' && (tType['kind'] === '_ANY_')) return;   
        }
        
        //  원본은 초이스가 아니고, tarType choice 의 인 경우
        if (eType['$type'] !== 'choice' && tType['$type'] === 'choice' ) {
            var choType = { $type: 'choice', kind: '_REQ_', list: [extType] };
            _execAllow(choType, tarType, opt, pathName);
            return;
        }

        // check allow type
        if (_isLeafType(eType['$type'])) {
            if(typeof eType['default'] !== 'undefined' && eType['default'] !== null && !_equalLiternal(eType['default'], tType['default'])) {
                throw new ExtendError(/EL01209/, prop, [eType['$type'], eType, tType]);
            }
            // if (tType['$type'] === 'choice') {
            //     var choType = { $type: 'choice', kind: '_OPT_', list: [oriType] };
            //     _execAllow(choType, tType, opt);
            // } else if (oriType['$type'] !== tType['$type']) Message.error('ES0713', [oriType['$type'], tType['$type']]);
            if (eType['$type'] !== tType['$type']) throw new ExtendError(/EL0120A/, prop, [eType['$type'], tType['$type']]);
        
        } else if (eType['$type'] === 'array')  arrayAllow();
        else if (eType['$type'] === 'choice') choiceAllow();
        else if (eType['$type'] === 'class') classAllow();
        else if (eType['$type'] === 'union') unionAllow();
        else if (eType['$type'] === 'function') functionAllow();
        else throw new ExtendError(/EL0120B/, prop, ['type']);    // Line:

        // inner function
        function arrayAllow() {
            // if (oriType['list'].length === 0 && !oriType['kind'] && tType['$type'] === 'array') return;      // [], [[]], Array
            if (eType['list'].length === 0 && tType['$type'] === 'array') return;      // [], [[]], Array
            if (tType['$type'] !== 'array' || !Array.isArray(tType['list'])) throw new ExtendError(/EL01211/, prop, [tType['$type']]);
            
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                return;     // Line:

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (tType['kind'] && tType['list'].length === 0) throw new ExtendError(/EL01212/, prop, ['array _ANY_', 'undefined']);  // REVIEW: 발생하지 않음
                if (tType['list'].length > 0) return;
                throw new ExtendError(/EL01213/, prop, ['array(any)', error]); // Line: // REVIEW: 발생하지 않음
                // throw new ExtendError('array any 는 하나 이싱 요소가 존재해야 합니다.');  

            // _SEQ_ (sequence)
            } else if (eType['kind'] === '_SEQ_') {
                if (eType['kind'] !== tType['kind'])  throw new ExtendError(/EL01214/, prop, [tType]);
                if (eType['list'].length > tType['list'].length) {
                    throw new ExtendError(/EL01215/, prop, [eType.list.length, tType.list.length]);
                }

                // element check
                for (var i = 0; i < eType['list'].length; i++) {
                    try {
                        _execAllow(eType['list'][i], tType['list'][i], opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01216/, error, [i]);
                    }
                }
                return;
            
            // _REQ_ (require)
            } else if (eType['kind'] == '_REQ_') {
                // if (oriType['list'].length < tType['list'].length) {
                //     Message.error('ES0716', ['array _OPT_', oriType.toString(), tType.toString()]);
                // }
                if (eType['list'].length > 0 && tType['list'].length === 0) {
                    throw new ExtendError(/EL01217/, prop, ['array']);     // Line: // REVIEW: 발생할 수 없음
                }
                // element check
                // for (var i = 0; i < tType['list'].length; i++) {
                //     var success = false;
                //     for (var ii = 0; ii < oriType['list'].length; ii++) {
                //         try {
                //             if (success) break;
                //             if (extendType(tType['list'][i])['$type'] === 'choice' && extendType(oriType['list'][ii])['$type'] !== 'choice' ) {
                //                 var oriChoice = { $type: 'choice', kind: '_OPT_', list: oriType['list'] };
                //                 _execAllow(oriChoice, tType['list'][i], opt);
                //             } else {
                //                 _execAllow(oriType['list'][ii], tType['list'][i], opt);
                //             }
                //             success = true;

                //             // if (success) continue;
                //             // _execAllow(oriType['list'][ii], tType['list'][i], opt);
                //             // success = true;
                //         } catch (error) {
                //             continue;
                //         }
                //     }
                //     if (!success) Message.error('ES0738', ['array(_REQ_)', extendType(tType['list'][i])['$type']]);
                // }

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (Array.isArray(tType['list']) && tType['list'].length === 0) return;

                // element check
                // for (var i = 0; i < tType['list'].length; i++) {
                //     var success = false;
                //     for (var ii = 0; ii < oriType['list'].length; ii++) {
                //         try {
                //             if (success) break;
                //             if (extendType(tType['list'][i])['$type'] === 'choice' && extendType(oriType['list'][ii])['$type'] !== 'choice' ) {
                //                 var oriChoice = { $type: 'choice', kind: '_OPT_', list: oriType['list'] };
                //                 _execAllow(oriChoice, tType['list'][i], opt);
                //             } else {
                //                 _execAllow(oriType['list'][ii], tType['list'][i], opt);
                //             }
                //             success = true;

                //             // if (success) continue;
                //             // _execAllow(oriType['list'][ii], tType['list'][i], opt);
                //             // success = true;
                //         } catch (error) {
                //             continue;
                //         }
                //     }
                //     if (!success) Message.error('ES0738', ['array(_OPT_)', extendType(tType['list'][i])['$type']]);
                // }
            
            // throw 
            } else {              
                throw new ExtendError(/EL01218/, prop, [eType['kind']]);     // Line:
            }

            // element check
            for (var i = 0; i < tType['list'].length; i++) {
                var success = false;
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    try {
                        if (success) break;
                        if (extendType(tType['list'][i])['$type'] === 'choice' && extendType(eType['list'][ii])['$type'] !== 'choice' ) {
                            var oriChoice = { $type: 'choice', kind: '_OPT_', list: eType['list'] };
                            _execAllow(oriChoice, tType['list'][i], opt, pathName);
                        } else {
                            _execAllow(eType['list'][ii], tType['list'][i], opt, pathName);
                        }
                        success = true;

                        // if (success) continue;
                        // _execAllow(oriType['list'][ii], tType['list'][i], opt);
                        // success = true;
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) throw new ExtendError(/EL01219/, prop, [eType, tType]);
            }
        }
        


        function choiceAllow() {

            // if (oriType['$type'] === 'choice' && tType['$type'] !== 'choice' ) {
            //     var choType = { $type: 'choice', kind: '_REQ_', list: [target] };
            //     _execAllow(origin,  choType, opt);
            //     return;
            // }

            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (typeof tType['ref'] !== 'undefined') return;
                throw new ExtendError(/EL01221/, prop, ['_ANY_', 'undefined']);
            
            // _NON_ 
            } else if  (eType['kind'] === '_NON_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL01223/, prop, []);
                }
                return;

            // _ERR_ (error)
            } else if (eType['kind'] === '_ERR_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL01222/, prop, []);
                    // throw new ExtendError('target 은 _err_ 타입만 가능합니다.');
                }
                return;
            // _SEQ_ (sequence)
            // } else if (oriType['kind'] === '_SEQ_') {   // REVIEW: 필요성 검토 필요 
            //     if (tType['kind'] !== '_SEQ_') Message.error('ES0731', ['target', tType['kind']]);
            //     if (oriType['list'].length > tType['list'].length) {
            //         Message.error('ES0732', [oriType.toString(), tType.toString()]);
            //     }
            //     if (oriType['list'].length === 0 && tType['list'].length > 0) return;
            //     for (i = 0; i < oriType['list'].length; i++) {
            //         try {
            //             _execAllow(oriType['list'][i], tType['list'][i], opt);
            //         } catch (error) {
            //             Message.error('ES0733', [oriType['list'][i], tType['list'][i]]);
            //         }
            //     }

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {
                if (tType['kind'] && tType['ref'].length === 0) {
                    // throw new ExtendError(/EL01223/, prop, []);    // Line:  REVIEW: 발생할 수 없음
                }
                // var arrTarget = (tType['kind']) ? tType['list'] : [tType['ref']];

                // if (oriType['list'].length > 0 && arrTarget.length === 0) {
                //     Message.error('ES0717', [oriType.toString(), arrTarget.toString(),]);
                // }
                // for (var i = 0; i < arrTarget.length; i++) {
                    var success = false;
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
            } else if (eType['kind'] === '_OPT_') {
                // if (typeof tType['ref'] === 'undefined') return;
                if (typeof tarType === 'undefined') return;
                // var arrTarget = (tType['kind']) ? tType['list'] : [tType['ref']];

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
            } else if (eType['kind'] === '_EUM_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL01224/, prop, []);
                    // throw new ExtendError('target 은 _eum_ 타입만 가능합니다.');
                }
                if (eType['list'].length === 0) throw new ExtendError(/EL01225/, prop, ['extType']);    // REVIEW: 발생하지 않음
                // if (oriType['list'].length === 0) throw new ExtendError('origin _eum_(enum) 1개이상 항목이 필요합니디.');
                if (tType['list'].length === 0) throw new ExtendError(/EL01226/, prop, ['tarType']);   // REVIEW: 발생하지 않음
                // if (tType['list'].length === 0) throw new ExtendError('target _eum_(enum) 1개이상 항목이 필요합니디.');
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    if (!_isLiteral(eType['list'][ii])) throw new ExtendError(/EL01227/, prop, [ii, extendType(eType['list'][ii])]);
                    // if (!_isLiteral(oriType['list'][ii])) throw new ExtendError('origin _eum_(enum)은 리터럴 타입만 가능합니다.');
                }
                for (var ii = 0; ii < tType['list'].length; ii++) {
                    if (!_isLiteral(tType['list'][ii])) throw new ExtendError(/EL01228/, prop, [ii, extendType(tType['list'][ii])]);
                    // if (!_isLiteral(tType['list'][ii])) throw new ExtendError('target _eum_(enum)은 리터럴 타입만 가능합니다.');
                }

            // _DEF_ (default)
            } else if (eType['kind'] === '_DEF_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL01229/, prop, []);
                    // throw new ExtendError('target 은 _def_ 타입만 가능합니다.');
                }
                if (eType['list'].length === 0) throw new ExtendError(/EL0122A/, prop, ['extType choice(def)']);    // REVIEW: 발생하지 않음
                // if (oriType['list'].length === 0) throw new ExtendError('origin _def_(default) 1개이상 항목이 필요합니디.');
                if (tType['list'].length === 0) throw new ExtendError(/EL0122B/, prop, ['tarType choice(def)']);    // REVIEW: 발생하지 않음
                // if (tType['list'].length === 0) throw new ExtendError('target _def_(default) 1개이상 항목이 필요합니디.');
                if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL0122C/, prop, [extendType(eType['list'][0])]);
                // if (!_isLiteral(oriType['list'][0])) throw new ExtendError('origin _def_(default) 1번째는 리터럴 타입만 가능합니다.');
                if (!_isLiteral(tType['list'][0])) throw new ExtendError(/EL0122D/, prop,  [extendType(tType['list'][0])]);
                // if (!_isLiteral(tType['list'][0])) throw new ExtendError('target _def_(default) 1번째는 리터럴 타입만 가능합니다.');
                // if (typeof target === 'undefined') {
                //     target = oriType['list'][0];
                //     return;
                // }

            } else {
                throw new ExtendError(/EL0122E/, prop, [eType['kind']]);    // REVIEW: 발생하지 않음
            }

            // element check


            // var arrTarget = (tType['kind']) ? tType['list'] : [tType['ref']];
            var arrTarget = (tType['kind']) ? tType['list'] : [tarType];

            if (eType['list'].length > 0 && arrTarget.length === 0) {
                throw new ExtendError(/EL0122F/, prop, [eType.toString(), arrTarget.toString(),]);  // REVIEW: 발생하지 않음
            }
            for (var i = 0; i < arrTarget.length; i++) {
                var success = false;
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    try {
                        if (success) continue;
                        _execAllow(eType['list'][ii], arrTarget[i], opt, pathName);
                        success = true;
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) throw new ExtendError(/EL0122G/, prop, [i, eType, extendType(arrTarget[i])['$type']]);
            }
        }
        
        function classAllow() {
            if (tType['$type'] === 'class') {         // # class to class
                if (isProtoChain(tType['ref'], eType['ref'])) return;   // 1.proto check
                if (opt === 1) {
                    try {
                        // 생성비교
                        var oriObj = new eType['ref']();
                        var tarObj = new tType['ref']();
                        return _execAllow(oriObj, tarObj, opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01231/, error, []);
                    }                    
                }
                throw new ExtendError(/EL01232/, prop, [opt]);

            } else if (tType['$type'] === 'union') {  // # class to union
                if (opt === 1) {
                    try {
                        // 생성비교
                        var oriObj = new eType['ref']();
                        return _execAllow(oriObj, tType['ref'], opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01233/, error, []);
                    }                    
                }
                throw new ExtendError(/EL01234/, prop, [opt]);

            }
            throw new ExtendError(/EL01235/, prop, [tType]);
        }

        function unionAllow() {
            var list;

            if (tType['$type'] !== 'union') throw new ExtendError(/EL01241/, prop, [tType]);
            // if (tType['$type'] !== 'union') throw new ExtendError('union 타입이 아닙니다.');
            list = getAllProperties(eType['ref']);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                if (!(key in tType['ref'])) throw new ExtendError(/EL01242/, prop, [key, typeOf(extType[key])]);      
                try {
                    _execAllow(eType['ref'][key], tType['ref'][key], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01243/, error, [key]);
                }
            }
        }

        function functionAllow() {
            if (tType['$type'] !== 'function')  throw new ExtendError(/EL01251/, prop, [tType]);
            if (eType['ref'] === Function) return;
            // special type check
            if (eType['name']) {
                if (eType['name'] === tarType.name  
                || eType['name'] === tType['name'] 
                || (tType['func'] && eType['name'] === tType['func'].name)) return;
                throw new ExtendError(/EL01252/, prop, [eType['name'], tType.name]);
                // throw new ExtendError('지정한 함수 이름과 다릅니다.');
            }
            if (eType['func']) {
                if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01253/, prop, []);
                // if (typeof tType['func'] !== 'function') throw new ExtendError('func = function 타입이 아닙니다.');
                if (isProtoChain(tType['func'], eType['func'])) return;
                throw new ExtendError(/EL01254/, prop, []);
                // throw new ExtendError('지정한 함수 func 타입이 다릅니다.');
            }

            if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
            // if ((eType['return'] || eType['params'].length > 0) && !tType) throw new ExtendError(/EL01254/, prop, ['tarType', 'function', '_TYPE']);
            if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
                throw new ExtendError(/EL01255/, prop, [extendType(eType.params), typeOf(eType.return)]);
            }
            // if (!oriType['return'] && oriType['params'].length === 0) return;    // success
            // if (oriType['params'].length !== tType['params'].length) {
            //     Message.error('ES0721', ['function', 'params', oriType['params'].length]);
            // }

            if (Array.isArray(eType['params']) && eType['params'].length > 0) {  
                try {   // params check
                    _execAllow(['_SEQ_'].concat(eType['params']), ['_SEQ_'].concat(tType['params']), opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01256/, error, []);
                }
            }
            if (eType['return']) {            
                try {   // return check
                    _execAllow(eType['return'], tType['return'], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01257/, error, []);
                }
            }
        }
    };

    /**
     * 타입을 검사하여 메세지를 리턴
     * @param {any} extType 검사할 타입 , extType 
     * @param {any} target 검사대상
     * @param {number} opt 허용옵션 : 0 = 기본, 1 = 타입생성 비교 
     * @param {string?} pathName '' 공백시 성공
     * @returns {throw?}
     */
    var _execMatch = function(extType, target, opt, pathName) {
        var eType = extendType(extType);
        var tType = extendType(target);
        var prop = {};
        var sExt = eType.toString(), sTar = tType.toString();
        var typeMsg = 'extType:['+ sExt +'], tType:['+ sTar +']';
        
        pathName = pathName ? pathName : 'extType';
        if (pathName !== 'extType') prop['error path'] = pathName;    // TODO: 'target' 명칭의 중복 수정필요
        opt = opt || 0;

        // seq, opt 필수 검사
        if (eType['kind']) {
            if ((eType['kind'] === '_SEQ_' || eType['kind'] === '_OPT_' || eType['kind'] === '_REQ_' || eType['kind'] === '_EUM_'|| eType['kind'] === '_DEF_') 
            && (typeof eType['ref'] === 'undefined' || eType['list'].length === 0)) {
                throw new ExtendError(/EL01101/, prop, ['extType', sExt]);
            }
        }

        // check match type
        if (eType['$type'] === 'null') {
            if (target !== null) throw new ExtendError(/EL01102/, prop, ['null', sTar]);
            // if (target !== null) throw new ExtendError(Message.get('EL01102', [sTar]), prop);
        
        } else if (eType['$type'] === 'undefined') {
            if (typeof target !== 'undefined') throw new ExtendError(/EL01102/, prop, ['undefined', sTar]);
            // if (typeof target !== 'undefined') throw new ExtendError(Message.get('EL01102', [pathName, 'undefined']) + typeMsg, prop);
        
        } else if (eType['$type'] === 'string') {
            if (typeof eType['default'] === 'string' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'string') throw new ExtendError(/EL01102/, prop, ['string', sTar]);
            // if (typeof target !== 'string') throw new ExtendError(Message.get('EL01102', [pathName, 'string']) + typeMsg, prop);
        
        } else if (eType['$type'] === 'number') {
            if (typeof eType['default'] === 'number' && typeof target === 'undefined') target = eType['default']; 
            if (typeof target !== 'number') throw new ExtendError(/EL01102/, prop, ['number', sTar]);
            // if (typeof target !== 'number') throw new ExtendError(Message.get('EL01102', [pathName, 'number']) + typeMsg, prop);
        
        } else if (eType['$type'] === 'boolean') {
            if (typeof eType['default'] === 'boolean' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'boolean') throw new ExtendError(/EL01102/, prop, ['boolean', sTar]);
            // if (typeof target !== 'boolean') throw new ExtendError(Message.get('EL01102', [pathName, 'boolean']) + typeMsg, prop);
        
        } else if (eType['$type'] === 'bigint') {    // ES6+
            if (typeof eType['default'] === 'bigint' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'bigint') throw new ExtendError(/EL01102/, prop, ['bigint', sTar]);
            // if (typeof target !== 'bigint') throw new ExtendError(Message.get('EL01102', [pathName, 'bigint']) + typeMsg, prop);
        
        } else if(eType['$type'] === 'symbol') {    // ES6+
            if (typeof target !== 'symbol') throw new ExtendError(/EL01102/, prop, ['symbol', sTar]);
            // if (typeof target !== 'symbol') throw new ExtendError(Message.get('EL01102', [pathName, 'symbol']) + typeMsg, prop);
        
        } else if (eType['$type'] === 'regexp') {
            if (eType['default'] && eType['default'] !== null && typeof target === 'undefined') target = eType['default'];
            if (!(target instanceof RegExp)) throw new ExtendError(/EL01102/, prop, ['regexp', sTar]);
            // if (!(target instanceof RegExp)) throw new ExtendError(Message.get('EL01102', [pathName, 'regexp']) + typeMsg, prop);
        
        } else if (eType['$type'] === 'object') {
            if (tType['$type'] !== 'object') throw new ExtendError(/EL01102/, prop, ['object', sTar]);
            // if (tType['$type'] !== 'object') throw new ExtendError(Message.get('EL01102', [pathName, 'object']) + typeMsg, prop);

        } else if (eType['$type'] === 'array') arrayMatch();
        else if (eType['$type'] === 'choice') choiceMatch();
        else if (eType['$type'] === 'class') classMatch();
        else if (eType['$type'] === 'union') unionMatch();
        else if (eType['$type'] === 'function') functionMatch();        
        else throw new ExtendError(/EL01103/, prop, []);        // Line:    의미적으로 걸러짐

        // inner function
        function arrayMatch() {
            if (!Array.isArray(target)) throw new ExtendError(/EL01111/, prop, [sTar]);
            
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {      
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (target.length === 0) throw new ExtendError(/EL01112/, prop, [target.length]);
                // if (target.length === 0) throw new ExtendError('array any 타입에는 요소를 하나 이상 가지고 있어야 합니다.');
                return;

            // _SEQ_ (sequence)
            } else if (eType['kind'] === '_SEQ_') {
                if (eType['list'].length > target.length) throw new ExtendError(/EL01113/, prop, [eType['list'].length, tType['list'].length]);    // REVIEW: 세부정보 표현
                for(var i = 0; i < eType['list'].length; i++) {
                    var _elem   = eType['list'][i];
                    var _tar    = tType['list'][i];
                    // if (typeof _tar === 'undefined') throw new ExtendError(/EL01113/, prop, [eType['list'].length, tType['list'].length]);    // REVIEW: 세부정보 표현
                    if (_isLiteral(_elem)) {
                        if (!_equalLiternal(_elem, _tar)) throw new ExtendError(/EL01114/, prop, [i, _elem, _tar]);
                        // if (!_equalLiternal(_elem, _tar)) throw new ExtendError('array seq 리터럴 타입이 다릅니다.');
                    } else {
                        try {
                            _execMatch(_elem, _tar, opt, pathName)
                        } catch (error) {
                            throw new ExtendError(/EL01115/, error, [i, typeOf(_elem)]);
                        }
                        // if (_execMatch(_elem, _tar, opt, pathName)) throw new ExtendError('array seq 타입이 다릅니다.');
                    }
                }
                return;

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {
                if (target.length === 0) throw new ExtendError(/EL01116/,  prop, [target.length]);
                // if (target.length === 0) throw new ExtendError('array req 타입에는 요소를 하나 이상 가지고 있어야 합니다.');

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (Array.isArray(target) && target.length === 0) return;
            }
            
            // element check
            for (var i = 0; i < target.length; i++) {
                var tar = target[i];
                var success = false;
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    try {
                        var elem = eType['list'][ii];
                        if (_isLiteral(elem)) {
                            if (_equalLiternal(elem, tar)) {
                                success = true;
                                break;
                            }
                        } else {
                            _execMatch(elem, tar, opt, pathName);    // REVIEW: pathName + '['+i+']'  이렇게 들어가야 함
                            success = true;
                            break;
                        }
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) {
                    // var logTitle = defType['kind'] ? 'array('+defType['kind']+')' : 'array';
                    // throw new ExtendError(Message.get('ES076', [logTitle, defType.toString(), tType.toString()]), prop);
                    // throw new ExtendError('[ES076] array('+defType['kind']+') 타입 검사에 실패하였습니다. type: ['+ defType.toString() +'], target: ['+ tType.toString()+']', prop);
                    throw new ExtendError(/EL01117/, prop, [eType.toString(), tType.toString()]);
                }
            }
        }

        function choiceMatch() {
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (typeof target !== 'undefined') return;
                throw new ExtendError(/EL01121/, prop, []);

            // _NON_ (none)
            } else if (eType['kind'] === '_NON_') {
                if (typeof target === 'undefined') return;
                throw new ExtendError(/EL01122/, []);
                // throw new ExtendError(' 어떤한 값도 설정할 수 없습니다.');
                
                // _ERR_ (error)
            } else if (eType['kind'] === '_ERR_') {
                if (target instanceof Error) return;
                throw new ExtendError(/EL01123/, []);

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {
                // if (eType['list'].length === 0) throw new ExtendError(/EL01124/, prop);
                // if (defType['list'].length === 0) throw new ExtendError('_req_(require) 필수 항목이 없습니다.');

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (typeof target === 'undefined') return;

            // _EUN_ (enumeration)
            } else if (eType['kind'] === '_EUM_') {
                // if (eType['list'].length === 0) throw new ExtendError(/EL01125/, prop, ['extType']);
                // if (defType['list'].length === 0) throw new ExtendError('_eum_(enum) 1개이상 항목이 필요합니디.');
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    if (!_isLiteral(eType['list'][ii])) throw new ExtendError(/EL01126/, prop, [ii, typeOf(eType['list'][ii])]);
                    // if (!_isLiteral(eType['list'][ii])) throw new ExtendError(/EL01126/, prop, ['extType choice(eum)', '리터럴']);
                    // if (!_isLiteral(defType['list'][ii])) throw new ExtendError('_eum_(enum)은 리터럴 타입만 가능합니다.');
                }

            // _DEF_ (default)
            } else if (eType['kind'] === '_DEF_') {
                // if (eType['list'].length === 0) throw new ExtendError(/EL011277/, prop, ['extType choice(def)']);
                // if (defType['list'].length === 0) throw new ExtendError('_def_(default) 1개이상 항목이 필요합니디.');
                if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL01128/, prop, [typeOf(eType['list'][0])]);
                // if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL01128/, prop, ['extType choice(def)', '1번재는 리터럴타입']);
                // if (!_isLiteral(defType['list'][0])) throw new ExtendError('_def_(default) 1번째는 리터럴 타입만 가능합니다.');
                if (typeof target === 'undefined') {
                    target = eType['list'][0];
                    return;
                }
            }

            // element check
            for (var ii = 0; ii < eType['list'].length; ii++) {
                try {
                    var elem = eType['list'][ii];
                    if (_isLiteral(elem)) {
                        if (_equalLiternal(elem, target)) return;
                    } else {
                        return _execMatch(elem, target, opt, pathName);
                    }
                } catch (error) {
                    continue;
                }
            }
            // var logTitle = defType['kind'] ? 'choice('+defType['kind']+')' : 'choice';
            
            // throw new ExtendError(Message.get('ES076', [logTitle, defType.toString(), tType.toString()]));
            // throw new ExtendError('[ES076] choice('+defType['kind']+') 타입 검사에 실패하였습니다. type: ['+ defType.toString() +'], target: ['+ tType.toString()+']', prop);
            throw new ExtendError(/EL01129/, prop,[eType, tType]);
        }

        function classMatch() {
            // try {
                if (tType['$type'] === 'class') {         // # class to class
                    if (typeof eType['ref'] === 'undefined') return;  // 전역 클래스 타입
                    if (isProtoChain(tType['ref'], eType['ref'])) return;
                } else if (typeof target === 'object') {    // # class to typeof 'object'
                    if (target instanceof extType) return;     
                    if (!_isBuiltFunction(extType) && target !== null && opt === 1) {
                        try {
                            var subPath = pathName === 'target' ? '<instance>' : pathName + '<instance>';
                            return _execMatch(_creator(extType), target, opt, subPath);
                        } catch (error) {
                            throw new ExtendError(/EL01131/, error);
                        }
                    }
                    // throw new ExtendError(Message.get('ES032', [pathName, _typeName(extType)])+ typeMsg, prop);
                    throw new ExtendError(/EL01132/, prop, [_typeName(extType)]);
                }
                throw new ExtendError(/EL01133/, prop, [tType]);                

            // } catch (error) {
            //     throw new ExtendError('ES000 클래스 타입 검사에 실패하였습니다. class: '+ _typeName(type), error);                
            // }
        }

        function unionMatch() {
            var list;
            
            if (tType['$type'] !== 'union') throw new ExtendError(/EL01141/, prop, [tType]);
            // if (tType['$type'] !== 'union') throw new ExtendError('union 타입이 아닙니다.');
            list = getAllProperties(eType.ref);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = extendType(extType[key]);
                // REVIEW: for 위쪽으로 이동 검토!
                // if (!_isObject(target)) throw new ExtendError(/EL01142/, prop, [pathName + '.' + key]);                 // target 객체유무 검사
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                // REVIEW: 재귀로 구현 체크
                if (typeof listDefType['default'] !== 'undefined' && listDefType['default'] !== null && typeof target[key] === 'undefined')      // default 설정
                target[key] = listDefType['default'];
                if (target !== null && !(key in target)) throw new ExtendError(/EL01142/, prop, [key, typeOf(extType[key])]);    
                try {
                    var subPath = pathName +'[\''+ key+'\']';
                    _execMatch(extType[key], target[key], opt, subPath);
                } catch (error) {
                    throw new ExtendError(/EL01143/, error, [key]);
                }
            }
        }

        function functionMatch() {
            if (tType['$type'] !== 'function') throw new ExtendError(/EL01151/, prop, [tType]);
            if (eType['ref'] === Function) return;
            // special type check
            if (eType['name']) {
                if (eType['name'] === target.name 
                || eType['name'] === tType['name'] 
                || (tType['func'] && eType['name'] === tType['func'].name)) return;
                throw new ExtendError(/EL01152/, prop, [eType['name'], target.name]);
                // throw new ExtendError('지정한 함수 이름과 다릅니다.');
            }
            if (eType['func']) {
                if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01153/, prop, []);
                // if (typeof tType['func'] !== 'function') throw new ExtendError('func = function 타입이 아닙니다.');
                if (isProtoChain(tType['func'], eType['func'])) return;
                throw new ExtendError(/EL01154/, prop, []);
                // throw new ExtendError('지정한 함수 prop 타입이 다릅니다.');
            }

            if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
            // if ((eType['return'] || eType['params'].length > 0) && !tType) throw new ExtendError(/EL01155/, prop, ['target', 'function', '_TYPE']);
            if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
                throw new ExtendError(/EL01155/, prop, [extendType(eType.params), typeOf(eType.return)]);
            }
            // params check
            if (Array.isArray(eType['params']) && eType['params'].length > 0) {  
                try {
                    _execAllow(['_SEQ_'].concat(eType['params']), ['_SEQ_'].concat(tType['params']), opt, pathName);
                } catch (error) {
                    // throw new ExtendError('[EL01156] 타입검사 : function params 를 array(seq) 변환한 검사에 실패하였습니다.' + typeMsg, error);
                    throw new ExtendError(/EL01156/, error, []);
                }
            }
            // return check
            if (eType['return']) {            
                try {
                    _execAllow(eType['return'], tType['return'], opt, pathName);
                } catch (error) {
                    throw new ExtendError(/EL01157/, prop, []);
                }
            }
        }
    };

    /**
     * 원본타입에 대상타입을 적용(설정)가능 여부를 검사한다.
     * @memberof _L.Common.Util
     * @param {any} extType 
     * @param {any} target 
     * @returns {throw?} 실패시 예외를 던진다.
     */
    var allowType = function(extType, target, opt) {
        try {
            // if (typeof extType === 'undefined') throw new ExtendError(Message.get('ES026', ['extType']));
            _execAllow(extType, target, opt);
        } catch (error) {
            throw new ExtendError(/EL0130A/, error);
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
            // if (typeof chkType === 'undefined') throw new ExtendError(Message.get('ES026', ['chkType']));
            _execMatch(chkType, target, opt);
        } catch (error) {
            // console.error(error.message);
            // throw new ExtendError(Message.get('ES069', ['check type', 'path: aa / bb ']));
            // throw new ExtendError(Message.get('ES069', ['check type', error.message]), error);
            // error.prop['type map'] = JSON.stringify(typeObject(chkType), null, '\t');  
            throw new ExtendError(/EL0130B/, error);
            // throw new ExtendError('[EL0131B] matchType(extType, target) 검사가 실패하였습니다.', error);
        }
    };

    /**
     * 원본타입에 대상타입을 적용(설정)가능 여부를 검사한다.
     * @memberof _L.Common.Util
     * @param {any} extType 
     * @param {any} target 
     * @param {number} opt 
     * @returns {boolean} 
     */
    var isAllowType = function(extType, target, opt) {
        try {
            _execAllow(extType, target, opt);
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