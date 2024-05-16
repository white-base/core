/**** extend-error.js | _L.Common.ExtendError ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
    } else {
        var $Message                    = _global._L.Message;
    }
    var Message                 = _Message              || $Message;

    //==============================================================Á
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활
    
    var ExtendError = (function () {
        /**
         * @overload
         * @param {string} p_msg 사용자 메세지 내용
         * @param {ExtendError | object} p_prop  상위 Error 객체
         * @returns {Error}
         */

        /**
         * @overload
         * @param {Regexp} p_msg 메세지 코드
         * @param {ExtendError | object} p_prop  메세지 코드 전달 파라메터
         * @param {array<string>} p_codeVal  메세지 코드 전달 파라메터
         * @returns {Error}
         */

        /**
         * 확장오류를 생성합니다.  
         * (ES5 하위 호환성 지원을 위해서 자체 상속방식으로 처리함)
         * @constructs _L.Common.ExtendError
         * @param {string | Regexp} p_msg  메세지코드 또는 메세지
         * @param {ExtendError | object} p_prop  이전 ExtendError 객체 또는 속성타입 오류메세지
         * @param {array<string>} p_codeVal  메세지코드값의 $1, $2 변환 값
         * @example
         * new ExtendError({code:'', ctx: []})
         * new ExtendError(/E0011/, [''])
         */
        function ExtendError(p_msg, p_prop, p_codeVal) {
            var _build = '';
            var _prop;
            var _queue;    
            var _msg;

            if (p_prop instanceof ExtendError) {
                _queue = p_prop.queue;
                _prop = p_prop.prop;
            } else if (typeof p_prop  === 'object' && p_prop !== null) {
                _prop = p_prop;
            }
            
            if (typeof p_msg === 'string') {
                _msg = p_msg;
            } else if (p_msg instanceof RegExp) {
                _msg = Message.get(p_msg.source, p_codeVal);
            } else _msg = '';
            
            _build = _msg + '\n';
            
            if (_prop) _build += $buildMessageProp(_prop);
            if (_queue) _build += $buildMsgQueue(_queue); 

            // var _instance = _super.call(this, _build);
            var _instance = new Error(_build);
            
            /**
             * 이전에 발생한 message 큐
             * @member {array<string>} _L.Common.ExtendError#queue
             */
            if (_queue) _instance.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
            else _instance.queue = [];
            
            /**
             * 속성타입 오류 메세지
             * @member {object} _L.Common.ExtendError#prop
             */
            if (_prop) _instance.prop = _prop;
            else _instance.prop = {};

            _instance.queue.push(_msg);


            if (Error.captureStackTrace && !OLD_ENV) {
                Error.captureStackTrace(_instance, ExtendError);
            }

            Object.setPrototypeOf(_instance, Object.getPrototypeOf(this));
        
            return _instance;

            // inner function 
            function $buildMessageProp(obj) {
                var msg = '';
                for (var prop in obj) {
                    if (typeof obj[prop] === 'string') msg += prop + ' : '+ obj[prop] + '\n';
                    else continue;
                }
                return msg;
            }
            function $buildMsgQueue(queue) {
                var msg = '';
                var queue_cnt = queue.length;
                for (var i = queue_cnt; i > 0; i--) {
                    var mark = '';
                    for (var ii = i; ii <= queue_cnt; ii++) { mark += '#'; }
                    msg += '' + mark + ' '+ queue[i - 1] + '\n';
                }
                return msg;
            }
        }

        ExtendError._NS = 'Common';    // namespace
        
        ExtendError.prototype = Object.create(Error.prototype, {
            constructor: {
                value: Error,
                enumerable: false,
                writable: true,
                configurable: true,
            },
        });
        
        ExtendError.prototype.toString = function() {
            return 'ExtendError : ' + this.message;
        };
          
        // REVIEW: 이부분이 제거 해도 문제 없는게 맞느지 검토해야함
        // if (Object.setPrototypeOf) {
        //     Object.setPrototypeOf(ExtendError, Error);
        // } else {
        //     ExtendError.__proto__ = Error;
        // }
        // Util.inherits(ExtendError, _super);

        
        return ExtendError;

    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ExtendError = ExtendError;
    } else {
        _global._L.ExtendError = ExtendError;
        _global._L.Common.ExtendError = ExtendError;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** util-type.js _L.Common.Type.- ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};
    _global._L.Common.Type          = _global._L.Common.Type || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    
    //==============================================================
    // 4. module implementation 
    var OLD_ENV = _global.OLD_ENV ? _global.OLD_ENV : false;    // 커버리지 테스트 역활
    
    /**
     * object 와 new 생성한 사용자 함수를 제외한 객쳐 여부
     * @param {*} obj 
     * @returns {boolean}
     */
    function _isPrimitiveObj(obj) { // REVIEW: 정리 필요, 의미적으로 명료하게..
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
    function _isObject(obj)  {  // REVIEW: 정리 필요, 의미적으로 명료하게
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
     * @returns {boolean}
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
    function _parseFunc(funBody) {
        var syntax1 = /\([,_\[\]{:}\w\s]*\)\s*(?:=>)?\s*{\s*.*\s*.*\s*}/;    // 제한 규칙
        var syntax2 = /(\(.*\)|\w+)\s*(?:=>).*/;
        var regFunc1 = /(?:function\s)?\(([\[\]{:}\s\w,]*)\)\s*(?:=>)?\s*{(?:\s*return\s+|\s*)?([\[\]{:}\s\w,]*);?\s*}/;
        var regFunc2 = /\(?([\[\]{:}\s\w,]*)\)?\s*(?:=>)\s*{?(?:\s*return\s+|\s*)?([\[\]\s\w,]*);?\s*}?/;
        
        var arrFunc, arrParam;
        var result = { params: [], return: undefined };
        var arrParam = [];
        var arrRetrun;
        
        funBody = $skipComment(funBody);

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
            throw new ExtendError(/EL01303/, error, ['']);
        }

        return result;

        // inner function
        function $skipComment(body) {    // 주석 제거 comment
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
        
        if (typeof name !== 'string') return false;

        arr = arr.concat(['null', 'undefined', 'number', 'string', 'boolean']);
        arr = arr.concat(['array', 'function', 'object']);
        arr = arr.concat(['choice', 'union', 'class']);
        arr = arr.concat(['symbol', 'bigint', 'regexp']);
        arr = arr.concat(['etc']);  // 예외 오류 코드 검출 

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

        return arr.indexOf(name) > -1;
    }

    /**
     * choice type kind 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasKindChoice(name) {
        var arr = [];
        
        if (typeof name !== 'string') return false;
        
        arr = arr.concat(['_ALL_', '_ANY_', '_NON_', '_ERR_']);
        arr = arr.concat(['_REQ_', '_OPT_', '_DEF_', '_EUM_']);
        arr = arr.concat(['_ETC_']);  // 예외 오류 코드 검출 

        return arr.indexOf(name) > -1;
    }

    /**
     * choice type kind 여부
     * @param {string} name 
     * @returns {boolean}
     */
    function _hasKindArray(name) {
        var arr = [];
        
        if (typeof name !== 'string') return false;

        arr = arr.concat(['_ALL_', '_ANY_']);
        arr = arr.concat(['_REQ_', '_OPT_', '_SEQ_']);
        arr = arr.concat(['_ETC_']);  // 예외 오류 코드 검출 

        return arr.indexOf(name) > -1;
    }
    
    /**
     * 전체 프로퍼티를 조회합니다.
     * @memberof _L.Common.Type
     * @param {object} obj  Object를 제외한 프로퍼티 객체 리턴
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
     * 객체를 비교합니다. (proto 제외)
     * @memberof _L.Common.Type
     * @param {any} obj1 
     * @param {any} obj2 
     * @returns {boolean}
     */
    var deepEqual = function(obj1, obj2) {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== typeof obj2) return false;
        if ($_isPrimitiveType(obj1) && !(obj1 === obj2)) return false;
        if (typeof obj1 === 'function' && !$equalFunction(obj1, obj2)) return false;

        if (Array.isArray(obj1)) {
            if (obj1.length !== obj2.length) return false;
            for (var i = 0; i < obj1.length; i++) {
                var val1 = obj1[i];
                var val2 = obj2[i];
                if (!deepEqual(val1, val2)) return false;
            }
        } else {
            if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
            for (var key in obj1) {
                if (Object.prototype.hasOwnProperty.call(obj1, key)) {
                    var val1 = obj1[key];
                    var val2 = obj2[key];
                    if (!deepEqual(val1, val2)) return false;
                }
            }
        }
        return true;
        // inner function
        function $equalFunction(fun1, fun2) {
            // if (typeof fun1 !== 'function') return false;
            // if (typeof fun2 !== 'function') return false;
            if (fun1 === fun2 || fun1.toString() === fun2.toString()) return true;
            return false;
        }
        function $_isPrimitiveType(obj) {
            if (typeof obj === 'string' || typeof obj === 'number' 
                || typeof obj === 'boolean' || typeof obj === 'undefined' || typeof obj === 'bigint') return true;
            return false;
        }
    }

    /**
     * 함수 타입을 가져옵니다. (_UNION 포함)  
     * ctor 자신부터 리턴 배열에 push
     * @memberof _L.Common.Type
     * @param {function} ctor 생성자
     * @param {boolean} [hasUnion= true] _UNION 포함 여부
     * @returns {array<function>} 
     */
    var getTypes = function (ctor, hasUnion) {
        var arr = [];
        var tempArr = [];
        var union;
        var proto;

        hasUnion = hasUnion === false ? false : true;
        
        if (typeof ctor !== 'function') throw new ExtendError(/EL0130C/, null, [typeof ctor]);

        arr.push(ctor);
        proto = $getPrototype(ctor);        
        
        if (proto !== Function.prototype) {
            arr = arr.concat(getTypes(proto, hasUnion));
        }
        if (hasUnion) {
            union = ctor['_UNION'] || [];
            for (var i = 0; i < union.length; i++) {
                arr = arr.concat(getTypes(union[i], hasUnion));
            }
        }

        for (var i = 0; i < arr.length; i++) {
            var idx = tempArr.indexOf(arr[i]);
            if (idx < 0) tempArr.push(arr[i]);
        }
        return tempArr;

        // innner function
        function $getPrototype(ctor) {
            // if (ctor.hasOwnProperty('super')) return ctor.super;
            if (Object.prototype.hasOwnProperty.call(ctor, 'super')) return ctor.super;
            return !OLD_ENV && typeof Object.getPrototypeOf === 'function' ? Object.getPrototypeOf(ctor) : ctor.__proto__;
        }
    }
    /**
     * 함수 타입의 prototype(상속) 타입 여부를 검사합니다.
     * @memberof _L.Common.Type
     * @param {function} ctor 생성자
     * @param {function | string} target 검사 대상
     * @returns {boolean}
     */
    var isProtoChain = function(ctor, target) {
        var arr;
        if (typeof ctor !== 'function') return false;
        if (!(typeof target === 'function' || typeof target === 'string')) return false;

        arr = getTypes(ctor, false);
        for (var i = 0; i < arr.length; i++) {
            if (typeof target === 'string') {
                if (target === arr[i].name) return true;
            } else {
                if (target === arr[i]) return true;
            }
        }
        return false;
    }

    /**
     * 함수 타입의 prototype(상속) 또는 _UNION 타입 여부를 검사합니다.
     * @memberof _L.Common.Type
     * @param {function} ctor 생성자
     * @param {function | string} target 검사 대상
     * @returns {boolean}
     */
    var hasType = function(ctor, target) {
        var arr;
        if (typeof ctor !== 'function') return false;
        if (!(typeof target === 'function' || typeof target === 'string')) return false;

        arr = getTypes(ctor);
        for (var i = 0; i < arr.length; i++) {
            if (typeof target === 'string') {
                if (target === arr[i].name) return true;
            } else {
                if (target === arr[i]) return true;
            }
        }
        return false;
    }

    /**
     * 확장타입 객체를 얻습니다. (하위 타입 포함)  
     * @memberof _L.Common.Type
     * @param {*} target 
     * @returns {object}
     * @example
     * var obj = {
     *      $ype: '',
     *      default: null,                  // string, number, boolean, regexp
     *      kind: '',                       // array, choice
     *      creator: null, _instance: {},   // class
     *      _prop: {},                      // union
     *      params: [], return: null,       // function
     *      name: name, func: null,
     * }
     */
    var typeObject = function(target) {
        var obj = {};
        var typeObj = _isObject(target) && target['$type'] ? target : extendType(target);
        var leafType = ['null', 'undefined', 'number', 'string', 'boolean', 'symbol', 'bigi¡nt', 'object', 'regexp'];

        obj['$type'] = typeObj['$type'];
        
        if (typeObj['default'] !== null && typeof typeObj['default'] !== 'undefined') obj['default'] = typeObj['default'];
        if (typeObj['kind'] !== null && typeof typeObj['kind'] !== 'undefined') obj['kind'] = typeObj['kind'];
        if (typeObj['params']) obj['params'] = typeObj['params'];
        if (typeObj['return']) obj['return'] = typeObj['return'];
        if (typeObj['creator']) obj['creator'] = typeObj['creator'];
        if (typeObj['_instance']) obj['_instance'] = typeObj['_instance'];

        if (leafType.indexOf(obj['$type']) > -1) {
            if (typeObj['default']) obj['default'] = typeObj['default'];
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
     * 확장타입명을 얻습니다.
     * @memberof _L.Common.Type
     * @param {*} target 
     * @returns {string}
     */
    var typeOf = function (target) {
        return extendType(target)['$type'];
    };

    /**
     * 확장타입을 얻는다.
     * @memberof _L.Common.Type
     * @param {any} target 대상타입
     * @returns {object} 
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    var extendType = function(target) {
        var obj =  { $type: '', ref: undefined };

        obj.toString = function(){
            var temp = '';
            var arr = [];
            if (this['$type'] === 'array' || this['$type'] === 'choice') {
                for (var i = 0; i < this['list'].length; i++) {
                    var _type = extendType(this['list'][i]);
                    if (_type['default'] && _type['default'] !== null) {
                        var def;
                        if (_type['$type'] === 'string') def = '\''+ _type['default'] +'\'';
                        else def = _type['default'];
                        arr.push(_type['$type'] + '('+ def +')');
                    } else arr.push(_type['$type']);
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
        if (typeof target === 'object'  && target !== null && target['$type']) {
            obj['$type'] = target['$type'];
            if (target['default']) obj['default'] = target['default'];
            if (target['kind']) obj['kind'] = target['kind'];
            if (target['ref']) obj['ref'] = target['ref'];
            if (target['list']) obj['list'] = target['list'];
            if (target['name']) obj['name'] = target['name'];
            if (target['func']) obj['func'] = target['func'];
            if (target['params']) obj['params'] = target['params'];
            if (target['return']) obj['return'] = target['return'];
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
            obj['ref'] = target;
        }

        // step : operation
        if (target === null) {
            obj['$type'] = 'null';
        } else if (target === Number) {
            obj['$type'] = 'number';
            obj['default'] = null;            
        } else if (target === String) {
            obj['$type'] = 'string';
            obj['default'] = null;
        } else if (target === Boolean) {
            obj['$type'] = 'boolean';
            obj['default'] = null;
        } else if (target === Array) {
            obj['$type'] = 'array';
            obj['kind'] = '_ALL_';
            obj['list'] = [];
        } else if (target === Function) {
            obj['$type'] = 'function';
            obj['params'] = [];
        } else if (target === Object) {
            obj['$type'] = 'object';
        } else if (target === RegExp) {
            obj['$type'] = 'regexp';
            obj['default'] = null;
        } else if (target === Symbol) {      // ES6+
            obj['$type'] = 'symbol';
        } else if (target === BigInt) {      // ES6+
            obj['$type'] = 'bigint';
            obj['default'] = null;
        } else if (target instanceof RegExp) {
            obj['$type'] = 'regexp';
            obj['default'] = target;
        // step : typeof
        } else if (typeof target === 'undefined') {
            obj['$type'] = 'undefined';
        } else if (typeof target === 'number') {
            obj['$type'] = 'number';
            obj['default'] = target;
        } else if (typeof target === 'string') {
            obj['$type'] = 'string';
            obj['default'] = target;
        } else if (typeof target === 'boolean') {
            obj['$type'] = 'boolean';
            obj['default'] = target;
        } else if (typeof target === 'bigint') { // ES6+
            obj['$type'] = 'bigint';
            obj['default'] = target;
        } else if (typeof target === 'symbol') { // ES6+
            obj['$type'] = 'symbol';
        // step : function
        } else if (typeof target === 'function') {
            var kind = target['_KIND'];
            if (kind) {
                kind = kind.toLowerCase();
                if (kind === 'function') obj['$type'] = 'function';
                else obj['$type'] = 'class';    // class, interface, abstract
            } else obj['$type'] = _isUpper(target.name) ? 'class' : 'function';
                
            if (obj['$type'] === 'function') {
                try {
                    var funcType  = target['_TYPE'] ? target['_TYPE'] : _parseFunc(target.toString());
                    obj['params'] = funcType['params'];
                    obj['return'] = funcType['return'];
                } catch (err) {
                    obj['params'] = [];
                }
            }
        // step : array
        } else if (Array.isArray(target)) {
            if (target.length ===  1 && Array.isArray(target[0])) {
                obj['$type'] = 'choice';
                if (target[0].length === 0) obj['kind'] = '_ANY_';
                else obj['kind'] = _getKeyCode(target[0][0]);
                obj['list'] = obj['kind'] ? target[0].slice(1) : target[0];
            } else {
                obj['$type'] = 'array';
                if (target.length === 0) obj['kind'] = '_ANY_';
                else obj['kind'] = _getKeyCode(target[0]);
                obj['list'] = obj['kind'] ? target.slice(1) : target;
            }
            if (!obj['kind']) obj['kind'] = '_OPT_';
            // kind 검사
            if (obj['$type'] === 'array' && !_hasKindArray(obj['kind'])) throw new ExtendError(/EL01307/, null, [obj['kind']]);
            if (obj['$type'] === 'choice' && !_hasKindChoice(obj['kind'])) throw new ExtendError(/EL01308/, null, [obj['kind']]);

        // step : object
        } else if (_isFillObj(target) || _isEmptyObj(target)) {
            obj['$type'] = 'union';
        
        // REVIEW:  기타 모든 함수는 object 로 처리한다. 더 좋은 방법이 있으면 대체 한다.
        } else {
        // } else if(_isPrimitiveObj(type)) {
            obj['$type'] = 'object';
        }
        // } else throw new ExtendError(/EL01309/, null, []);    // REVIEW: 커버리지 확인시 주석 처리
        return obj;
    }

    /**
     * 원본타입에 대상타입이 덮어쓰기가 허용 가능한지 검사합니다.  
     * 원본타입에 대상타입으로 캐스팅이 가능하지 확인합니다.
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
        
        pathName = pathName ? pathName : 'extType';
        if (pathName !== 'extType' || !pathName) prop['error path'] = pathName;
        opt = opt || 0;

        // if (_isObject(eType['ref']) && _isObject(tType['ref']) && deepEqual(eType, tType)) return; // REVIEW: 필요없어  보이지만 잠시 남겨둠
        // origin seq, opt 필수 검사
        if (eType['kind']) {
            if ((eType['kind'] === '_SEQ_' || eType['kind'] === '_OPT_' || eType['kind'] === '_REQ_' || eType['kind'] === '_EUM_'|| eType['kind'] === '_DEF_') 
            && eType['list'].length === 0) {
                throw new ExtendError(/EL01201/, prop, ['extType', sExt]);
            }
        }
        // tarType seq, opt 필수 검사
        if (tType['kind']) {
            if ((tType['kind'] === '_SEQ_' || tType['kind'] === '_OPT_' || tType['kind'] === '_REQ_'  || tType['kind'] === '_EUM_'|| tType['kind'] === '_DEF_') 
            && tType['list'].length === 0) {
                throw new ExtendError(/EL01201/, prop, ['tarType', sTar]);
            }
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
                throw new ExtendError(/EL01202/, prop, [eType['$type'], eType, tType]);
            }
            if (eType['$type'] !== tType['$type']) throw new ExtendError(/EL01203/, prop, [eType['$type'], tType['$type']]);
        
        } else if (eType['$type'] === 'array')  $arrayAllow();
        else if (eType['$type'] === 'choice') $choiceAllow();
        else if (eType['$type'] === 'class') $classAllow();
        else if (eType['$type'] === 'union') $unionAllow();
        else if (eType['$type'] === 'function') $functionAllow();
        else throw new ExtendError(/EL01204/, prop, []);

        // inner function
        function $arrayAllow() {
            if (tType['$type'] !== 'array' || !Array.isArray(tType['list'])) throw new ExtendError(/EL01211/, prop, [tType['$type']]);
            
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (tType['kind'] === '_ANY_') return;
                if (tType['kind'] === '_ALL_' || tType['kind'] === '_OPT_') {
                    throw new ExtendError(/EL01212/, prop, [sTar]);
                }
                return;

            // _SEQ_ (sequence)
            } else if (eType['kind'] === '_SEQ_') {
                if (eType['kind'] !== tType['kind'])  throw new ExtendError(/EL01213/, prop, [tType]);
                if (eType['list'].length > tType['list'].length) {
                    throw new ExtendError(/EL01214/, prop, [eType.list.length, tType.list.length]);
                }

                // element check
                for (var i = 0; i < eType['list'].length; i++) {
                    try {
                        _execAllow(eType['list'][i], tType['list'][i], opt, pathName);
                    } catch (error) {
                        throw new ExtendError(/EL01215/, error, [i]);
                    }
                }
                return;
            
            // _REQ_ (require)
            } else if (eType['kind'] == '_REQ_') {
                if (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' || tType['kind'] === '_OPT_') {
                    throw new ExtendError(/EL01216/, prop, [eType['$type'], sTar]);
                }

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' ) {
                    throw new ExtendError(/EL01217/, prop, [eType['$type'], sTar]);
                }
            
            // _ETC_
            } else {
                throw new ExtendError(/EL01218/, prop, [eType['kind']]);
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
                    } catch (error) {
                        continue;
                    }
                }
                if (!success) throw new ExtendError(/EL01219/, prop, [eType, tType]);
            }
        }

        function $choiceAllow() {
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {
                if (tType['$type'] === tType['$type'] && tType['kind'] === '_ERR_') {
                    throw new ExtendError(/EL01221/, prop, [eType['$type'], sTar]);
                }
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (tType['$type'] === 'undefined') throw new ExtendError(/EL01222/, prop, ['_ANY_', 'undefined']);
                if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_OPT_' || tType['kind'] === '_ERR_' || tType['kind'] === '_NON_')) {
                    throw new ExtendError(/EL01223/, prop, [sTar]);
                }
                return;
            
            // _NON_ 
            } else if  (eType['kind'] === '_NON_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    // 4
                    throw new ExtendError(/EL01224/, prop, [sTar]);
                }
                return;

            // _ERR_ (error)
            } else if (eType['kind'] === '_ERR_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    // 5
                    throw new ExtendError(/EL01225/, prop, [sTar]);
                }
                return;

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {
                if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' 
                || tType['kind'] === '_OPT_' || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                    // 6
                    throw new ExtendError(/EL01226/, prop, [sTar]);
                }

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (tType['$type'] === 'undefined') return;
                if (eType['$type'] === tType['$type'] && (tType['kind'] === '_ALL_' || tType['kind'] === '_ANY_' 
                || tType['kind'] === '_NON_' || tType['kind'] === '_ERR_')) {
                    // 7
                    throw new ExtendError(/EL01227/, prop, [sTar]);
                }
            
                // _EUN_ (enumeration)
            } else if (eType['kind'] === '_EUM_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL01228/, prop, []);
                }
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    if (!_isLiteral(eType['list'][ii])) throw new ExtendError(/EL01229/, prop, [ii, extendType(eType['list'][ii])]);
                }
                for (var ii = 0; ii < tType['list'].length; ii++) {
                    if (!_isLiteral(tType['list'][ii])) throw new ExtendError(/EL0122A/, prop, [ii, extendType(tType['list'][ii])]);
                }

            // _DEF_ (default)
            } else if (eType['kind'] === '_DEF_') {
                if (eType['$type'] !== tType['$type'] || eType['kind'] !== tType['kind']) {
                    throw new ExtendError(/EL0122B/, prop, []);
                }
                if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL0122C/, prop, [extendType(eType['list'][0])]);
                if (!_isLiteral(tType['list'][0])) throw new ExtendError(/EL0122D/, prop,  [extendType(tType['list'][0])]);

            // _ETC_
            } else {
                throw new ExtendError(/EL0122E/, prop, [eType['kind']]);
            }

            // element check
            var arrTarget = (tType['kind']) ? tType['list'] : [tarType];
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
                if (!success) throw new ExtendError(/EL0122F/, prop, [i, eType, extendType(arrTarget[i])['$type']]);
            }
        }
        
        function $classAllow() {
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

        function $unionAllow() {
            var list;

            if (tType['$type'] !== 'union') throw new ExtendError(/EL01241/, prop, [tType]);
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

        function $functionAllow() {
            if (tType['$type'] !== 'function')  throw new ExtendError(/EL01251/, prop, [tType]);
            if (eType['ref'] === Function) return;
            // special type check
            if (eType['name']) {
                if (eType['name'] === tarType.name  
                || eType['name'] === tType['name'] 
                || (tType['func'] && eType['name'] === tType['func'].name)) return;
                throw new ExtendError(/EL01252/, prop, [eType['name'], tType.name]);
            }
            if (eType['func']) {
                if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01253/, prop, []);
                if (isProtoChain(tType['func'], eType['func'])) return;
                throw new ExtendError(/EL01254/, prop, []);
            }

            if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
            if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
                throw new ExtendError(/EL01255/, prop, [extendType(eType.params), typeOf(eType.return)]);
            }
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
        
        } else if (eType['$type'] === 'undefined') {
            if (typeof target !== 'undefined') throw new ExtendError(/EL01102/, prop, ['undefined', sTar]);
        
        } else if (eType['$type'] === 'string') {
            if (typeof eType['default'] === 'string' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'string') throw new ExtendError(/EL01102/, prop, ['string', sTar]);
        
        } else if (eType['$type'] === 'number') {
            if (typeof eType['default'] === 'number' && typeof target === 'undefined') target = eType['default']; 
            if (typeof target !== 'number') throw new ExtendError(/EL01102/, prop, ['number', sTar]);
        
        } else if (eType['$type'] === 'boolean') {
            if (typeof eType['default'] === 'boolean' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'boolean') throw new ExtendError(/EL01102/, prop, ['boolean', sTar]);
        
        } else if (eType['$type'] === 'bigint') {    // ES6+
            if (typeof eType['default'] === 'bigint' && typeof target === 'undefined') target = eType['default'];
            if (typeof target !== 'bigint') throw new ExtendError(/EL01102/, prop, ['bigint', sTar]);
        
        } else if(eType['$type'] === 'symbol') {    // ES6+
            if (typeof target !== 'symbol') throw new ExtendError(/EL01102/, prop, ['symbol', sTar]);
        
        } else if (eType['$type'] === 'regexp') {
            if (eType['default'] && eType['default'] !== null && typeof target === 'undefined') target = eType['default'];
            if (!(target instanceof RegExp)) throw new ExtendError(/EL01102/, prop, ['regexp', sTar]);
        
        } else if (eType['$type'] === 'object') {
            if (tType['$type'] !== 'object') throw new ExtendError(/EL01102/, prop, ['object', sTar]);

        } else if (eType['$type'] === 'array') $arrayMatch();
        else if (eType['$type'] === 'choice') $choiceMatch();
        else if (eType['$type'] === 'class') $classMatch();
        else if (eType['$type'] === 'union') $unionMatch();
        else if (eType['$type'] === 'function') $functionMatch();        
        else throw new ExtendError(/EL01103/, prop, []);

        // inner function
        function $arrayMatch() {
            if (!Array.isArray(target)) throw new ExtendError(/EL01111/, prop, [sTar]);
            
            // _ALL_ (all)
            if (eType['kind'] === '_ALL_') {      
                return;

            // _ANY_ (any)
            } else if (eType['kind'] === '_ANY_') {
                if (target.length === 0) throw new ExtendError(/EL01112/, prop, [target.length]);
                return;

            // _SEQ_ (sequence)
            } else if (eType['kind'] === '_SEQ_') {
                if (eType['list'].length > target.length) throw new ExtendError(/EL01113/, prop, [eType['list'].length, tType['list'].length]);    // REVIEW: 세부정보 표현
                for(var i = 0; i < eType['list'].length; i++) {
                    var _elem   = eType['list'][i];
                    var _tar    = tType['list'][i];
                    if (_isLiteral(_elem)) {
                        if (!_equalLiternal(_elem, _tar)) throw new ExtendError(/EL01114/, prop, [i, _elem, _tar]);
                    } else {
                        try {
                            _execMatch(_elem, _tar, opt, pathName)
                        } catch (error) {
                            throw new ExtendError(/EL01115/, error, [i, typeOf(_elem)]);
                        }
                    }
                }
                return;

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {
                if (target.length === 0) throw new ExtendError(/EL01116/,  prop, [target.length]);

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (Array.isArray(target) && target.length === 0) return;
    
            // _ETC_
            } else {
                throw new ExtendError(/EL01117/,  prop, [eType['kind']]);
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
                    throw new ExtendError(/EL01118/, prop, [eType.toString(), tType.toString()]);
                }
            }
        }

        function $choiceMatch() {
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
                
            // _ERR_ (error)
            } else if (eType['kind'] === '_ERR_') {
                if (target instanceof Error) return;
                throw new ExtendError(/EL01123/, []);

            // _REQ_ (require)
            } else if (eType['kind'] === '_REQ_') {

            // _OPT_ (option)
            } else if (eType['kind'] === '_OPT_') {
                if (typeof target === 'undefined') return;

            // _EUN_ (enumeration)
            } else if (eType['kind'] === '_EUM_') {
                for (var ii = 0; ii < eType['list'].length; ii++) {
                    if (!_isLiteral(eType['list'][ii])) throw new ExtendError(/EL01124/, prop, [ii, typeOf(eType['list'][ii])]);
                }

            // _DEF_ (default)
            } else if (eType['kind'] === '_DEF_') {
                if (!_isLiteral(eType['list'][0])) throw new ExtendError(/EL01125/, prop, [typeOf(eType['list'][0])]);
                if (typeof target === 'undefined') {
                    target = eType['list'][0];
                    return;
                }

            // _ETC_
            } else {
                throw new ExtendError(/EL01126/,  prop, [eType['kind']]);
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
            throw new ExtendError(/EL01127/, prop,[eType, tType]);
        }

        function $classMatch() {
            if (tType['$type'] === 'class') {         // # class to class
                if (typeof eType['ref'] === 'undefined') return;  // 전역 클래스 타입
                if (isProtoChain(tType['ref'], eType['ref'])) return;
            } else if (typeof target === 'object') {    // # class to typeof 'object'
                if (target instanceof extType) return;     
                if (!_isBuiltFunction(extType) && target !== null && opt === 1) {
                    try {
                        var subPath = pathName === 'extType' ? '<instance>' : pathName + '<instance>';
                        return _execMatch(_creator(extType), target, opt, subPath);
                    } catch (error) {
                        throw new ExtendError(/EL01131/, error);
                    }
                }
                throw new ExtendError(/EL01132/, prop, [_typeName(extType)]);
            }
            throw new ExtendError(/EL01133/, prop, [tType]);                
        }

        function $unionMatch() {
            var list;
            
            if (tType['$type'] !== 'union') throw new ExtendError(/EL01141/, prop, [tType]);
            list = getAllProperties(eType.ref);

            for (var i = 0; i < list.length; i++) {
                var key = list[i];
                var listDefType = extendType(extType[key]);
                // REVIEW: for 위쪽으로 이동 검토!
                if ('_interface' === key || 'isImplementOf' === key ) continue;             // 예약어
                // REVIEW: 재귀로 구현 체크
                if (typeof listDefType['default'] !== 'undefined' && listDefType['default'] !== null && typeof target[key] === 'undefined')      // default 설정
                target[key] = listDefType['default'];
                // POINT:
                // if (target !== null && !(key in target)) throw new ExtendError(/EL01142/, prop, [key, typeOf(extType[key])]);    
                try {
                    var subPath = pathName +'[\''+ key+'\']';
                    _execMatch(extType[key], target[key], opt, subPath);
                } catch (error) {
                    throw new ExtendError(/EL01143/, error, [key]);
                }
            }
        }

        function $functionMatch() {
            if (tType['$type'] !== 'function') throw new ExtendError(/EL01151/, prop, [tType]);
            if (eType['ref'] === Function) return;
            // special type check
            if (eType['name']) {
                if (eType['name'] === target.name 
                || eType['name'] === tType['name'] 
                || (tType['func'] && eType['name'] === tType['func'].name)) return;
                throw new ExtendError(/EL01152/, prop, [eType['name'], target.name]);
            }
            if (eType['func']) {
                if (typeof tType['func'] !== 'function') throw new ExtendError(/EL01153/, prop, []);
                if (isProtoChain(tType['func'], eType['func'])) return;
                throw new ExtendError(/EL01154/, prop, []);
            }

            if (!eType['return'] && (!eType['params'] || eType['params'].length === 0)) return;
            if (typeof tType['params'] === 'undefined' && typeof tType['return'] === 'undefined') { 
                throw new ExtendError(/EL01155/, prop, [extendType(eType.params), typeOf(eType.return)]);
            }
            // params check
            if (Array.isArray(eType['params']) && eType['params'].length > 0) {  
                try {
                    _execAllow(['_SEQ_'].concat(eType['params']), ['_SEQ_'].concat(tType['params']), opt, pathName);
                } catch (error) {
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
     * 확장타입이 대상타입을 허용하는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} tarType 검사 대상 타입
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {throw?} 실패시 예외
     */
    var allowType = function(extType, tarType, opt) {
        try {
            _execAllow(extType, tarType, opt);
        } catch (error) {
            throw new ExtendError(/EL0130A/, error);
        }
    };    

    /**
     * 확장타입이 대상과 매치되는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} target 검사 대상
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {throw?} 실패시 예외
     */
    var matchType = function(extType, target, opt) {
        try {
            _execMatch(extType, target, opt);
        } catch (error) {
            throw new ExtendError(/EL0130B/, error);
        }
    };

    /**
     * 확장타입이 대상타입을 허용하는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} target 검사 대상 타입
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {boolean} 검사 통과 여부
     */
    var isAllowType = function(extType, tarType, opt) {
        try {
            _execAllow(extType, tarType, opt);
        } catch (error) {
            return false;
        }
        return true;
    };  

    /**
     * 확장타입이 대상과 매치되는지 검사합니다.
     * @memberof _L.Common.Type
     * @param {any} extType 확장 타입
     * @param {any} target 검사 대상
     * @param {number} [opt=0] 허용옵션 : 0 = 기존 유지, 1 = class 타입 생성
     * @returns {boolean} 검사 통과 여부
     */
    var isMatchType = function(extType, target, opt) {
        try {
            _execMatch(extType, target, opt);
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
        exports.hasType = hasType;
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
            hasType: hasType,
            getTypes: getTypes,
            extendType: extendType,
            typeObject: typeObject,
            typeOf: typeOf,
            matchType: matchType,
            allowType: allowType,
            isMatchType: isMatchType,
            isAllowType: isAllowType
        };
        _global._L.Type = ns;
        _global._L.Common.Type = ns;
    }

}(typeof window !== 'undefined' ? window : global));
/**** trans-queue.js | _L.Common.Observer ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Util                       = require('./util');
    } else {    
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Util                       = _global._L.Util
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Util                    = _Util                 || $Util;

    //==============================================================Á
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 4. module implementation  
    var Observer = (function () {
        /**
         * 구독자 클래스 (이벤트에 활용)
         * @constructs _L.Common.Observer
         * @param {object} p_caller 함수 호출 본문에서 this 역활 publish.apply(p_caller, ...)
         */
        function Observer(p_caller) {
            if (typeof p_caller !== 'object') throw new ExtendError(/EL01511/, null, [typeof p_caller]);
            
            var $subscribers = this._getInitObject();
            var isLog = false;
            var isSingleMode = false;

            /*_______________________________________*/        
            // priavte property
            
            /**
             * 전역 구독자  
             * @private
             * @member {object}  _L.Common.Observer#$subscribers  
             */
            Object.defineProperty(this, '$subscribers',
            {
                get: function() { return $subscribers; },
                set: function(nVal) { 
                    if (typeof nVal !== 'object') throw new ExtendError(/EL01514/, null, [typeof val]);
                    if (typeof nVal.any === 'undefined') throw new ExtendError(/EL01515/, null, []);
                    $subscribers = nVal;    
                },
                configurable: false,
                enumerable: false
            });

            /**
             * 호출함수의 this 
             * @protected
             * @member {object} _L.Common.Observer#_caller  
             */
            Object.defineProperty(this, '_caller', {
                value: p_caller,
                writable: false
            });

            /**
             * 목록 
             * @member {Array}  _L.Common.Observer#_list  
             */
            Object.defineProperty(this, '_list', {
                get: function() {       // Line:
                    var arr = [];
                    for (var prop in this.$subscribers) {
                        var elem = this.$subscribers[prop];
                        for (var i = 0; i < elem.length; i++) {
                            var obj = {};
                            obj[prop] = {};
                            obj[prop][i] = elem[i];
                            arr.push(obj);
                        }
                    }
                    return arr;
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 콘솔로드 출력 여부
             * @member {boolean}  _L.Common.Observer#isLog  
             */
            Object.defineProperty(this, 'isLog', 
            {
                get: function() { return isLog; },
                set: function(nVal) {
                    if (typeof nVal !== 'boolean') throw new ExtendError(/EL01512/, null, [typeof nVal]);
                    isLog = nVal;
                }
            });

            /** 
             * 싱글모드는 callback 같이 작동함
             * 구독자 멀티모드, 단일시(false) 마지막 등록 구독자만 활성화 (기본값:true)  
             * @member {boolean} _L.Common.Observer#isSingleMode  
             */
            Object.defineProperty(this, 'isSingleMode',
            {
                get: function() { return isSingleMode; },
                set: function(nVal) { 
                    if (typeof nVal !== 'boolean') throw new ExtendError(/EL01513/, null, [typeof nVal]);
                    isSingleMode = nVal;
                }
            });

            // inner variable access
            // this.__SET$$subscribers = function(val, call) {
            //     if (call instanceof Observer) { // 상속접근 허용
            //         if (typeof val !== 'object') throw new ExtendError(/EL01514/, null, [typeof val]);
            //         if (typeof val.any === 'undefined') throw new ExtendError(/EL01515/, null, []);
            //         $subscribers = val;    
            //     }
            // }
        }

        Observer._NS = 'Common';    // namespace
        Observer._PARAMS = ['_caller'];  // creator parameter

        /**
         * 초기화 객체 얻기
         * @returns {object}
         */
        Observer.prototype._getInitObject = function() {
            return { any: [] };
        };
        
        /**
         * 관찰자를 초기화
         */
        Observer.prototype.init = function() {
            var obj = this._getInitObject();
            this.$subscribers = obj;
        };

        /**
         * 구독 신청
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에 등록 된다.
         * @param {function} p_fn  구독 콜백 함수
         * @param {string?} [p_code = 'any'] 구독 코드명
         */
        Observer.prototype.subscribe = function(p_fn, p_code) {
            p_code = p_code || 'any';

            if (typeof p_fn !== 'function') throw new ExtendError(/EL01516/, null, [typeof p_fn]);
            
            if (this.isSingleMode && this.$subscribers[p_code]) this.unsubscribe(p_code);    // 싱글모드시 초기화
            if (typeof this.$subscribers[p_code] === 'undefined') {
                this.$subscribers[p_code] = [];
            }
            this.$subscribers[p_code].push(p_fn);
        };
        
        /**
         * 이벤트 'p_code'를 입력하지 않으면 전역(any)에서 취소 된다.
         * @param {string?} p_code 이벤트 코드명 : 없으면 전체 초기함
         * @param {function?} p_fn 이벤트 콜백 함수
         */
        Observer.prototype.unsubscribe = function(p_code, p_fn) {
            if (typeof p_code === 'undefined')  {
                // this.$subscribers = {any: []};
                this.init();
                return;
            }

            if (this.$subscribers[p_code]) {
                if (typeof p_fn === 'function') {
                    for (var i = 0; i < this.$subscribers[p_code].length; i++) {
                        if (this.$subscribers[p_code][i] === p_fn) {
                            this.$subscribers[p_code].splice(i, 1);
                        }
                    }
                } else delete this.$subscribers[p_code];
            } 
        };

        /**
         * 구독 함수 전체 또는 지정 구독을 호출한다. publishAny(p1, p2);
         * @param {string?} [p_code = 'any'] 이벤트 코드명
         */
        Observer.prototype.publish = function(p_code) {
            p_code = p_code || 'any';
            
            var args = Array.prototype.slice.call(arguments);
            var arr = args.length >= 1 ? args.splice(1) : [];
            
            if (p_code in this.$subscribers) {
                for (var i = 0; i < this.$subscribers[p_code].length; i++) {
                    if (typeof this.$subscribers[p_code][i] === 'function') {
                        this.$subscribers[p_code][i].apply(this._caller, arr);
                    }
                }
            }
            
            if (this.isLog) {
                console.log('publish() 이벤트 발생 [' + this._caller.constructor.name + '] type:' + p_code);
            }
        };

        return Observer;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.Observer = Observer;
        _global._L.Observer = Observer;
        _global.Observer = Observer;

    } else {
        _global._L.Observer = Observer;
        _global._L.Common.Observer = Observer;  // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** message.js | _L.Common.Message ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module

    //==============================================================Á
    // 3. module dependency check

    //==============================================================
    // 4. module implementation       
    var Message = (function () {
       /**
        * 메세지와 코드를 관리합니다. (static)
        * @constructs _L.Common.Message
        * @static
        */
       function Message() { 
        }

        Message._NS = 'Common';     // namespace
        
        // var define
        var lang = 'kor';
        var isLong = false;

        /**
         * 객체 레벨
         * 1. 종류
         * 2. 구분코드
         * 3. 순번
         */
        var $STORAGE = {
            eng: {
                E: { // Error
                    S01: { // failure
                        0: {
                            msg: '{$1}',
                            long: 'Etc Error',
                            memo: ''
                        },
                        1: {
                            msg: 'Failed to import module ["$1"]',
                            long: 'Load the ["$1"] module through require("...$2"). ',
                            memo: '1: class name, 2: file name'
                        },
                        2: {
                            msg: 'Failed to import function ["$1"()]',
                            long: 'Invoke the ["$1"()] function through require("...$2"). ',
                            memo: '1: function name, 2: file name'
                        },
                        3: {
                            msg: '[$1] is an abstract method.',
                            long: ''
                        },
                        4: {
                            msg: '[$1] should set [$2]. ',
                            long: ''
                        },
                        5: {
                            msg: 'Linking reference [$2] to [$1] failed. ',
                            long: ''
                        },
                        6: {
                            msg: 'You cannot enter [$1] and [$2] at the same time. ',
                            long: ''
                        },
                        7: {
                            msg: 'Class [$1] must implement [$2]. ',
                            long: '$3'
                        },
                        8: {
                            msg: '[$1] cannot create an abstract class.',
                            long: ''
                        },
                        9: {
                            msg: 'Failed to register collection [$1].',
                            long: '[$2]'
                        },
                        10: {
                            msg: 'Failed to retrieve [$1] from [$2].',
                            long: '$3'
                        },
                        11: {
                            msg: 'You need to redefine [$1].',
                            long: 'Inherit and redefine [$2].'
                        },
                    },
                    S02: { // type
                        1: {
                            msg: '[$1] can only be of type [$2].',
                            long: ''
                        },
                        2: {
                            msg: '[$1] is a type that cannot be processed. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1] type cannot be [$2]. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1] is not of type [$2]. ',
                            long: ''
                        },
                        5: {
                            msg: '[$1] does not have a type. ',
                            long: ''
                        },
                        6: {
                            msg: 'Type [$1] does not exist. ',
                            long: ''
                        },
                        7: {
                            msg: 'There is no [$2] of type [$1]. ',
                            long: 'Define [$2].'
                        },
                    },
                    S03: { // object
                        1: {
                            msg: '[$1] is not an object. ',
                            long: ''
                        },
                        2: {
                            msg: '[$1] is not an instance of [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1] is not an object that implements the [$2] interface. ',
                            long: ''
                        },
                        4: {
                            msg: 'The object in [$1] is different from [$2]. ',
                            long: ''
                        },
                    },
                   
                    S04: { // duplicate
                        1: {
                            msg: 'A duplicate occurred in [$1]. ',
                            long: '$2'
                        },
                        2: {
                            msg: '[$1] overlaps with [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: 'Duplicate [$1] is prohibited. ',
                            long: ''
                        },
                        4: {
                            msg: 'Cannot remove [$2] because [$1] exists. ',
                            long: ''
                        },
                        5: {
                            msg: 'Cannot add [$2] because [$1] exists. ',
                            long: ''
                        },
                        6: {
                            msg: '[$2] exists in [$1]. ',
                            long: ''
                        },
                        7: {
                            msg: '[$3] cannot be added because [$2] exists in [$1]. ',
                            long: ''
                        },
                        8: {
                            msg: '[$1] is a reserved word. ',
                            long: ''
                        },
                    },
                    S05: { // required
                        1: {
                            msg: 'Required value [$1] is missing. ',
                            long: ''
                        },
                        2: {
                            msg: '[$1] requires [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: '[$2] does not exist in [$1]. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1] is not a valid character in the [$2] test. ',
                            long: 'test result : $3'
                        },
                        5: {
                            msg: 'You cannot enter a space in [$1]. ',
                            long: ''
                        },
                        6: {
                            msg: 'Constraint failed on [$1]. ',
                            long: '$2'
                        },
                    },
                    S06: { // scope
                        1: {
                            msg: 'The size of [$1] exceeds the range.',
                            long: ''
                        },
                        2: {
                            msg: '[$1] cannot be less than [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1] and [$2] have different lengths. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1] is a private type. You cannot set it directly. ',
                            long: 'If you want to force it, set it to __SET$$1(val, target object).'
                        },
                        5: {
                            msg: 'and(&&) condition check failed. ',
                            long: '$1'
                        },
                        6: {
                            msg: 'or(||) condition check failed. ',
                            long: '$1'
                        },
                        7: {
                            msg: '[$1] ranges from [$2] to [$3].',
                            long: ''
                        },
                        8: {
                            msg: '[$1] does not match rule [$2].',
                            long: ''
                        },
                        9: {
                            msg: '[$1] Condition check failed. ',
                            long: '$2'
                        },
                    },
                },
                W: { // warning
                    S01: { // range
                        1: {
                            msg: '[$1] target [$2] cannot be deleted.',
                            long: 'If you set "configurable = true, writable = true" you can delete it later. '
                        },
                    }
                },
                W: {    // warning
                    S01: { // range
                        1: {
                            msg: '',
                            long: ''
                        },
                    }
                },
                I: {    // Information
                    S01: {  // 범위
                            1: {
                            msg: '[$2] [$1]',
                            long: ''
                        },
                    },
                }
            },
            kor: { // 구분 코드 : 중복, 필수, 타입, 범위, 객체
                E: {        // Error
                    S01: {  // 실패
                        0: {    // ES010
                            msg: '{$1}',
                            long: '기타 오류',
                            memo: '1: 오류내용'
                        },
                        1: {    // ES011
                            msg: '["$1"] 모듈을 가져오는데 실패하였습니다.',
                            long: '',
                            memo: '1:클래스명, 2:파일명'
                        },
                        2: {    // ES012
                            msg: '["$1"()] 함수를 가져오는데 실패하였습니다.',
                            long: '',
                            memo: '1:함수명, 2:파일명'
                        },
                        3: {    // ES013
                            msg: '[$1]는 [$2] 처리가 실패하였습니다.',
                            long: '',
                            memo: '1:처리 대상, 2:처리 내용'
                        },
                    },  
                    S02: {  // 타입
                        1: {    // ES021
                            msg: '[$1]는 [$2] 타입만 가능합니다.',
                            long: '',
                            memo: '1:검사 대상, 2: 대상의 타입'
                        },
                        2: {    // ES022
                            msg: '[$1]는 처리할 수 없는 타입니다.', 
                            long: '',
                            memo: '1:실패 대상 타입'
                        },
                        3: {    // ES023
                            msg: '[$1]는 [$2]타입이 아닙니다.',
                            long: '',
                            memo: '1:검사 대상, 2: 목표 타입'
                        },
                    },
                    S03: {  // 객체
                        1: {    // ES031
                            msg: '[$1]는 객체가 아닙니다.',
                            long: '',
                            memo: '1:검사 대상'
                        },
                        2: {    // ES032
                            msg: '[$1]는 [$2]의 인스턴스가 아닙니다.',
                            long: '',
                            memo: '1:대상이름, 2:생성자'
                        },
                        3: {    // ES033
                            msg: '[$1]의 객체가 [$2]와 다릅니다.',
                            long: '',
                            memo: '1:비교 대상, 2:목표 대상'
                        },
                    },
                    
                    S04: {  // 중복
                        1: {    // ES041
                            msg: '[$1]는 [$2]와 중복이 발생했습니다.',
                            long: '',
                            memo: '1:대상, 2:목표'
                        },
                        2: {    // ES042
                            msg: '[$1]에 [$2]가 존재하여 [$3]를 재거 할 수 없습니다.',
                            long: '',
                            memo: '1:목표, 2:중복대상, 3:제거대상'
                        },
                        3: {    // ES043
                            msg: '[$1]에 [$1]가 존재하여 [$3]를 추가 할 수 없습니다.',
                            long: '',
                            memo: '1:목표, 2:중복대상, 3:추가대상'
                        },
                        4: {    // ES044
                            msg: '[$1]는 예약어 입니다.',
                            long: '',
                            memo: '1:중복예약어'
                        },
                    },
                    S05: {  // 필수
                        1: {    // ES051
                            msg: '필수값 [$1]이 없습니다.',
                            long: '',
                            memo: '1:필수값'
                        },
                        2: {    // ES052
                            msg: '[$1]에는 [$2]이 필요합니다.',
                            long: '',
                            memo: '1:대상, 2:필수조건'
                        },
                        3: {    // ES053
                            msg: '[$1]에 [$2]이 존재하지 않습니다.',
                            long: '',
                            memo: '1:대상, 2:필수조건'
                        },
                        4: {    // ES054
                            msg: '[$1]에 공백을 입력할 수 없습니다.',
                            long: '',
                            memo: '1:대상'
                        },
                    },
                    S06: {  // 범위
                        1: {    // ES061
                            msg: '[$1]의 [$2] 범위를 초과하였습니다.',
                            long: '',
                            memo: '1:대상, 2: 범위'
                        },
                        2: {    // ES062
                            msg: '[$1]는 [$2]보다 작을 수가 없습니다.',
                            long: '',
                            memo: '1:대상, 2: 기준'
                        },
                        3: {    // ES063
                            msg: '[$1]와 [$2]의 길이가 다릅니다.',
                            long: '',
                            memo: '1:대상, 2: 목표'
                        },
                        4: {    // ES064
                            msg: 'and(&&) 조건 검사에 실패하였습니다. $1',
                            long: '',
                            memo: '1:조건'
                        },
                        5: {    // ES065
                            msg: 'or(||) 조건 검사에 실패하였습니다. $1',
                            long: '',
                            memo: '1:조건'
                        },
                        6: {    // ES066
                            msg: '[$1]의 범위는 [$2]에서 [$3]까지 입니다. ',
                            long: '',
                            memo: '1:대상, 2:시작, 3: 종료'
                        },
                    },
                    
                    // 위치 기준 메세지
                    L01: {  // Common.*
                        100: {  // util-type : match
                            msg: 'util-type.js match',
                        },
                        101: {  // EL01101  
                            msg: '타입 매치 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
                        },
                        102: {  // EL01102  
                            msg: '타입 매치 : target 은 \'$1\' 타입이 아닙니다. tarType: $2',
                        },
                        103: {  // EL01103  
                            msg: '타입 매치 : 처리할 수 없는 타입니다. ',
                        },
                        
                        // match array
                        111: {  // EL01111  
                            msg: '배열 매치 : target 은 array 타입이 아닙니다. tarType: $1',
                        },
                        112: {  // EL01112  
                            msg: '배열 매치 : array(_ANY_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
                        },
                        113: {  // EL01113  
                            msg: '배열 매치 : array(_SEQ_) 타입의 길이보다 target array 의 길이가 작습니다. extType.length = $1, target.length = $2',
                        },
                        114: {  // EL01114  
                            msg: '배열 매치 : array(_SEQ_) [$1]번째 리터럴 타입이 target 값과 다릅니다. extType[$1] = $2, target[$1] = $3',
                        },
                        115: {  // EL01115  
                            msg: '배열 매치 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다. extType[$1] = $2',
                        },
                        116: {  // EL01116  
                            msg: '배열 매치 : array(_REQ_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
                        },
                        117: {  // EL01117   
                            msg: '배열 매치 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
                        },
                        118: {  // EL01118   
                            msg: '배열 매치 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },
                        
                        // match choice
                        121: {  // EL01121  
                            msg: '초이스 매치 : choice(_ANY_) 타입에 \'undefined\' 은 사용할 수 없습니다.',
                        },
                        122: {  // EL01122  
                            msg: '초이스 매치 : choice(_NON_) 타입에 \'undefined\' 만 가능합니다.',
                        },
                        123: {  // EL01123  
                            msg: '초이스 매치 : choice(_ERR_) 타입에 Errror 인스턴스 만 가능합니다.',
                        },
                        124: {  // EL01124  
                            msg: '초이스 매치 : choice(_EUM_) 타입의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
                        },
                        125: {  // EL01125  
                            msg: '초이스 매치 : choice(_DEF_) 타입의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
                        },
                        126: {  // EL01126  
                            msg: '초이스 매치 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
                        },
                        127: {  // EL01127  
                            msg: '초이스 매치 : choice 세부 타입 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },
                        
                        // match class
                        131: {  // EL01131
                            msg: '클래스 매치 : class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
                        },
                        132: {  // EL01132  
                            msg: '클래스 매치 : target은 [$1]의 인스턴스가 아닙니다.',
                        },
                        133: {  // EL01133
                            msg: '클래스 매치 : target 이 class, object, union 타입이 아닙니다. tarType: $1',
                        },
                        
                        // match union
                        141: {  // EL01141 
                            msg: '유니언 매치 : target 은 union 타입이 아닙니다. tarType: $1',
                        },
                        142: {  // EL01142 
                            msg: '유니언 매치 : target[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
                        },
                        143: {  // EL01143 
                            msg: '유니언 매치 : \'$1\' 타입 검사가 실패하였습니다.',
                        },
                        
                        // match function
                        151: {  // EL01151 
                            msg: '함수 매치 : target 은 function 타입이 아닙니다. tarType: $1',
                        },
                        152: {  // EL01152 
                            msg: '함수 매치 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
                        },
                        153: {  // EL01153 
                            msg: '함수 매치 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
                        },
                        154: {  // EL01154 
                            msg: '함수 매치 : extType.func 과 target.func 서로 다릅니다.(proto check)',
                        },
                        155: {  // EL01155 
                            msg: '함수 매치 : target의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
                        },
                        156: {  // EL01156 
                            msg: '함수 매치 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
                        },
                        157: {  // EL01157 
                            msg: '함수 매치 : return 허용검사가 거부되었습니다.',
                        },
                        
                        // allow
                        200: {
                            msg: 'util-type.js allow',
                        },
                        201: {  // EL01201   
                            msg: '타입 허용 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
                        },
                        202: {  // EL01202  
                            msg: '타입 허용 : $1 타입의 리터럴 값과 다릅니다. extType = $2, tarType = $3',
                        },
                        203: {  // EL01203  
                            msg: '타입 허용 : $1 타입이 아닙니다. tarType = $2',
                        },
                        204: {  // EL01204  
                            msg: '타입 허용 : 처리할 수 없는 타입입니다.',
                        },
                        
                        // allow array
                        211: {  // EL01211  
                            msg: '배열 허용 : array 타입이 아닙니다. tarType: $1',
                        },
                        212: {  // EL01212  
                            msg: '타입 허용 : array(_ANY_) 타입에 array(_ALL_, _OPT_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        213: {  // EL01213  
                            msg: '배열 허용 : array(_SEQ_) 타입에 array(_SEQ_) 타입만 허용합니다. tarType: $1',
                        },
                        214: {  // EL01214  
                            msg: '배열 허용 :extType 의 array(_SEQ_) 타입의 길이보다 tarType 은 같거나 커야합니다. extType.length = $1, target.length = $2',
                        },
                        215: {  // EL01215  
                            msg: '배열 허용 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다.',
                        },
                        216: {  // EL01216  
                            msg: '배열 허용 : array(_REQ_) 타입에 array(_ALL_, _ANY_, _OPT_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        217: {  // EL01217  
                            msg: '배열 허용 : array(_OPT_) 타입에 array(_ALL_, _ANY_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        218: {  // EL01218  
                            msg: '배열 허용 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
                        },
                        219: {  // EL01219
                            msg: '배열 허용 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },

                        // allow choice 
                        221: {  // EL01221 
                            msg: '초이스 허용 : choice(_ALL_) 타입에 choice(_ERR_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        222: {  // EL01222 
                            msg: '초이스 허용 : choice(_ANY_) 타입에 \'undefined\' 타입은 사용할 수 없습니다.',
                        },
                        223: {  // EL01223 
                            msg: '초이스 허용 : choice(_ANY_) 타입에 choice(_NON_, _ERR_), \'undefined\' 타입을 허용하지 않습니다. tarType: $1',
                        },
                        224: {  // EL01224 
                            msg: '초이스 허용 : choice(_NON_) 타입에 choice(_NON_) 타입만 허용합니다. tarType: $1',
                        },
                        225: {  // EL01225 
                            msg: '초이스 허용 : choice(_ERR_) 타입에 choice(_ERR_) 타입만 가능합니다. tarType: $1',
                        },
                        226: {  // EL01226 
                            msg: '초이스 허용 : choice(_REQ_) 타입에 choice(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        227: {  // EL01227 
                            msg: '초이스 허용 : choice(_OPT_) 타입에 choice(_ALL_, _ANY_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        228: {  // EL01228 
                            msg: '초이스 허용 : choice(_EUM_) 타입에 choice(_EUM_) 타입만 가능합니다.',
                        },
                        229: {  // EL01229 
                            msg: '초이스 허용 : choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
                        },
                        '22A': {  // EL0122A 
                            msg: '초이스 허용 : tarType choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. tarType[$1]: $2',
                        },
                        '22B': {  // EL0122B 
                            msg: '초이스 허용 : choice(_DEF_) 타입에 choice(_DEF_) 타입만 가능합니다.',
                        },
                        '22C': {  // EL0122C 
                            msg: '초이스 허용 : extType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
                        },
                        '22D': {  // EL0122D 
                            msg: '초이스 허용 : tarType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. tarType[0]: $1',
                        },
                        '22E': {  // EL0122E 
                            msg: '초이스 허용 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
                        },
                        '22F': {  // EL0122F 
                            msg: '초이스 허용 : tarType[$1] = $3 타입에 허용하는 extType 이 없습니다. extType = $2',
                        },


                        // allow class
                        231: {  // EL01231  
                            msg: '클래스 허용 : extType, tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
                        },
                        232: {  // EL01232  
                            msg: '클래스 허용 : class to class 허용이 거부 되었습니다. (opt = $1)',
                        },
                        233: {  // EL01233  
                            msg: '클래스 허용 : tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
                        },
                        234: {  // EL01234  
                            msg: '클래스 허용 : class to union 허용이 거부 되었습니다. (opt = $1)',
                        },
                        235: {  // EL01235  
                            msg: '클래스 허용 : tarType 이 class, union 타입이 아닙니다. tarType: $1',
                        },
                        
                        // allow union
                        241: {  // EL01241  
                            msg: '유니언 허용 : tarType 은 union 타입이 아닙니다. tarType: $1',
                        },
                        242: {  // EL01242  
                            msg: '유니언 허용 : tarType[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
                        },
                        243: {  // EL01243  
                            msg: '유니언 허용 : \'$1\' 타입 검사가 실패하였습니다.',
                        },
                        
                        // allow function
                        251: {  // EL01251 
                            msg: '함수 허용 : tarType 은 function 타입이 아닙니다. tarType: $1',
                        },
                        252: {  // EL01252 
                            msg: '함수 허용 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
                        },
                        253: {  // EL01253 
                            msg: '함수 허용 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
                        },
                        254: {  // EL01254 
                            msg: '함수 허용 : extType.func 과 target.func 서로 다릅니다.(proto check)',
                        },
                        255: {  // EL01255 
                            msg: '함수 허용 : tarType의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
                        },
                        256: {  // EL01256 
                            msg: '함수 허용 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
                        },
                        257: {  // EL01257 
                            msg: '함수 허용 : return 허용검사가 거부되었습니다.',
                        },

                        // util-type.js etc
                        300: {
                            msg: 'util-type.js etc'
                        },
                        301: {  // EL01301  
                            msg: '파싱 검사 : function 규칙이 아닙니다. "$1"',
                        },
                        302: {  // EL01302  
                            msg: '파싱 검사 : function 에 argument, body 내용이 없습니다. "$1"',
                        },
                        303: {  // EL01303  
                            msg: '파싱 검사 : function 파싱 실패 $1',
                        },
                        304: {  // EL01304  
                            msg: '타입 검사 : [$1]는 처리할 수 스페셜타입 입니다.',
                        },
                        305: {  // EL01305  
                            msg: '타입 검사 : array($1) 타입은 처리할 수 없는 스페설타입 입니다.',
                        },
                        306: {  // EL01306  
                            msg: '타입 검사 : choice($1) 타입은 처리할 수 없는 스페셜타입 입니다.',
                        },
                        307: {  // EL01307  
                            msg: '타입 검사 : array($1) 타입은 처리할 수 없는 타입 입니다.',
                        },
                        308: {  // EL01308  
                            msg: '타입 검사 : choice($1) 타입은 처리할 수 없는 타입 입니다.',
                        },
                        // 309: {  // EL01309  
                        //     msg: '[$1]는 처리할 수 없는 타입니다. ',
                        // },
                        '30A': {  // EL0130A  
                            msg: '타입 허용 : allowType(extType, tarType) 검사가 실패하였습니다.'
                        },
                        '30B': {  // EL0130B  
                            msg: '타입 매치 : matchType(extType, target) 검사가 실패하였습니다.'
                        },
                        '30C': {  // EL0130C
                            msg: 'ctor 이 function 타입이 아닙니다. typeof ctor = $1'
                        },
                        
                        // util.js
                        401: {  // EL01401
                            msg: 'implements(ctor, obj, args..); ctor 이 <function> 타입이 아닙니다. typeof ctor == \'$1\''
                        },
                        402: {  // EL01402
                            msg: 'implements(ctor, obj, args..); obj 이 <object> 타입이 아닙니다. typeof obj == \'$1\''
                        },
                        403: {  // EL01403
                            msg: 'implements(ctor, obj, args..); args[$1] 이 <function> 타입이 아닙니다. typeof args[$1] == \'$2\''
                        },
                        404: {  // EL01404
                            msg: '[$1] 는 [$2] 타입을 구현해야 합니다. $1._KIND = \'$3\''
                        },
                        405: {  // EL01405
                            msg: 'isImplementOf(target); target 은 <function, string> 타입만 가능합니다. typeof target = \'$1\''
                        },

                        // etc
                        500: {
                            msg: ''
                        },
                        510: {  // observer.js
                            msg: ''
                        },
                        511: {  // EL01511
                            msg: 'new Observer(caller); caller 는 \'object\' 타입이 아닙니다. typeof caller = $1'
                        },
                        512: {  // EL01512
                            msg: 'Observer.isLog 는 \'boolean\' 타입이 아닙니다. typeof isLog = $1'
                        },
                        513: {  // EL01513
                            msg: 'Observer.isSingleMode 는 \'boolean\' 타입이 아닙니다. typeof isSingleMode = $1'
                        },
                        514: {  // EL01514
                            msg: 'Observer.__$subscribers 값은  \'object\' 타입이 아닙니다. typeof __$subscribers = $1'
                        },
                        515: {  // EL01515
                            msg: 'Observer.__$subscribers[\'any\'] 객체가 없습니다. { any: undefined }'
                        },
                        516: {  // EL01516
                            msg: 'subscribe(fn, code); fn 는 \'function\' 타입이 아닙니다. typeof fn = $1'
                        },

                    },
                    L02: {  // Interface.*
                        
                        // use Meta.* 
                        100: {
                            msg: 'Meta.*'
                        },
                        110: {  // i-object.js
                            msg: ''
                        },
                        111: {  // EL02111
                            msg: 'getTypes(): array<function> 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        112: {  // EL02112
                            msg: 'instanceOf(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        113: {  // EL02113
                            msg: 'equal(any): boolena 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        120: {  // i-marshal.js
                            msg: ''
                        },
                        121: {  // EL02121
                            msg: 'getObject(opt?, origin?): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        122: {  // EL02122
                            msg: 'setObject(mObj) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        130: {  // i-element.js
                            msg: ''
                        },
                        131: {  // EL02131
                            msg: 'clone(): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        140: {  // i-list.js
                            msg: ''
                        },
                        150: {  // i-control-list.js
                            msg: ''
                        },
                        151: {  // EL02151
                            msg: 'add(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        152: {  // EL02152
                            msg: 'del(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        153: {  // EL02153
                            msg: 'has(key): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        154: {  // EL02154
                            msg: 'find(any): any 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },

                        // use Collection.*
                        200: {
                            msg: 'Collectoin.*'
                        },
                        210: {  // i-collection.js
                            msg: ''
                        },
                        211: {  // EL02211
                            msg: 'add(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        212: {  // EL02212
                            msg: 'remove(elem): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        213: {  // EL02213
                            msg: 'cantains(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        214: {  // EL02214
                            msg: 'indexOf(any): number 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        220: {  // i-collection-array.js
                            msg: ''
                        },
                        221: {  // EL02221
                            msg: 'insertAt(pos, val, ..): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        230: {  // i-collection-property.js
                            msg: ''
                        },
                        231: {  // EL02231
                            msg: 'keyOf(idx): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },

                        // use Meta.Entity.*
                        300: {
                            msg: 'Meta.Entity.*'
                        },
                        310: {  // i-control-export.js
                            msg: ''
                        },
                        311: {  // EL02311
                            msg: 'write(opt): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        320: {  // i-control-import.js
                            msg: ''
                        },
                        321: {  // EL02321
                            msg: 'read(object) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        330: {  // i-control-group.js
                            msg: ''
                        },
                        331: {  // EL02331
                            msg: 'merge(any, opt) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        332: {  // EL02332
                            msg: 'copy(filter) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        340: {  // i-control-schema.js
                            msg: ''
                        },
                        341: {  // EL02341
                            msg: 'readSchema(json) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        342: {  // EL02342
                            msg: 'writeSchema(opt): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        350: {  // i-serialize.js
                            msg: ''
                        },
                        351: {  // EL02351
                            msg: 'output(opt, ...): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        352: {  // EL02352
                            msg: 'load(any, ...) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        360: {  // i-transaction.js
                            msg: ''
                        },
                        361: {  // EL02361
                            msg: 'acceptChanges() 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        362: {  // EL02362
                            msg: 'rejectChanges() 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                    },
                    L03: {  // Meta.*
                        100: {
                            msg: ''
                        },
                        110: {  // meta-object.js
                            msg: ''
                        },
                        111: {  // EL03111
                            msg: 'abstract, interface, enum 타입은 생성할 수 없습니다. $1[\'_KIND\'] = \'$2\''
                        },
                        112: {  // EL03112
                            msg: 'setObject(oGuid, origin); oGuid 는 \'object\' 타입입니다. typeof oGuid = \'$1\''
                        },
                        113: {  // EL03113
                            msg: 'setObject(oGuid, origin); 네임스페이스가 서로 다릅니다. this._type = $1, oGuid._type = $2'
                        },
                        114: {  // EL03114
                            msg: 'setObject(oGuid, origin); origin 은 Guid 객체가 아닙니다. origin._type = \'$1\', origin._guid = \'$2\''
                        },
                        120: {  // meta-element.js
                            msg: ''
                        },
                        121: {  // EL03121
                            msg: '$name; val 은 \'string\' 타입입니다. typeof val = \'$1\''
                        },
                        122: {  // EL03122
                            msg: '$name; val.length 은 0 보다 커야 합니다.'
                        },
                        
                        200: {  // meta-registry.js
                            msg: ''
                        },
                        210: {  // 객체
                            msg: ''
                        },
                        211: {  // EL03211
                            msg: 'register(meta); 등록할 meta 가 Guid 객체가 아닙니다. meta._type = \'$1\', meta._guid = \'$2\''
                        },
                        212: {  // EL03212
                            msg: 'register(meta); 등록할 meta._guid 가 이미 등록되어 있습니다. meta._guid = \'$1\''
                        },
                        213: {  // EL03213
                            msg: 'release(meta); 해제할 meta 는 string(guid) | object(Guid) 타입만 가능합니다. typeof meta = \'$1\''
                        },
                        
                        220: {  // create
                            msg: ''
                        },
                        221: {  // EL03221
                            msg: 'createMetaObject(oGuid, origin); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        222: {  // EL03222
                            msg: 'createMetaObject(oGuid, origin); oGuid._type 은 \'string\' 타입만 가능합니다.(length > 0) typeof oGuid._type = \'$1\''
                        },
                        223: {  // EL03223
                            msg: 'createMetaObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\''
                        },
                        224: {  // EL03224
                            msg: 'createMetaObject(oGuid, origin); [$1] 네임스페이스가 \'function\' 타입이 아닙니다. typeof coClass = \'$2\''
                        },
                        225: {  // EL03225
                            msg: 'createReferObject(meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\''
                        },
                        226: {  // EL03226
                            msg: 'createReferObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\''
                        },
                        227: {  // EL03227
                            msg: 'createNsReferObject(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\''
                        },

                        230: {  // ns Class
                            msg: ''
                        },
                        231: {  // EL03231
                            msg: 'registerClass(fun, ns, key); fun 이 \'function\' 타입이 아닙니다. typeof fun = \'$1\''
                        },
                        232: {  // EL03232
                            msg: 'registerClass(fun, ns, key); ns 가 \'string\' 타입이 아닙니다. typeof ns = \'$1\''
                        },
                        233: {  // EL03233
                            msg: 'registerClass(fun, ns, key); key 가 \'string\' 타입이 아닙니다. typeof key = \'$1\''
                        },
                        234: {  // EL03234
                            msg: 'releaseClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\''
                        },
                        235: {  // EL03235
                            msg: 'findClass(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\''
                        },
                        236: {  // EL03236
                            msg: 'getClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\''
                        },

                        240: {  // set, transform, load
                            msg: ''
                        },
                        241: {  // EL03241
                            msg: 'setMetaObject(oGuid, meta); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        242: {  // EL03242
                            msg: 'setMetaObject(oGuid, meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\''
                        },
                        243: {  // EL03243
                            msg: 'setMetaObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\''
                        },
                        244: {  // EL03244
                            msg: 'transformRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        245: {  // EL03245
                            msg: 'transformRefer(oGuid); $1[\'$2\'][\'$ns\'] 는 \'function\' 타입이 아닙니다.'
                        },
                        246: {  // EL03246
                            msg: 'loadMetaObject(str, parse?); str 은 \'string\' 타입만 가능합니다. typeof str = \'$1\''
                        },
                        247: {  // EL03247
                            msg: 'loadMetaObject(str, parse?); str 을 파싱한 객체가 Guid 객체가 아닙니다. obj._type = \'$1\', obj._guid = \'$2\''
                        },
                        
                        250: {  // has, valid, find
                            msg: ''
                        },
                        251: {  // EL03251
                            msg: 'validObject(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        252: {  // EL03252
                            msg: 'hasGuidObject(oGuid, origin); guid 는 \'string\' 타입만 가능합니다.(length > 0) typeof guid = \'$1\''
                        },
                        253: {  // EL03253
                            msg: 'hasGuidObject(oGuid, origin); origin[$1]는 \'object\' 타입이 아닙니다. typeof origin[$1] = \'$2\''
                        },
                        254: {  // EL03254
                            msg: 'hasRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        255: {  // EL03255
                            msg: 'hasRefer(oGuid); oGuid 가 Guid 객체가 아닙니다. oGuid._type = \'$1\', oGuid._guid = \'$2\''
                        },
                        256: {  // EL03256
                            msg: 'findSetObject(oGuid, origin); [ oGuid._guid | oGuid ]는 \'string\' 타입만 가능합니다.(length > 0) guid = \'$1\''
                        },
                        257: {  // EL03257
                            msg: 'findSetObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\''
                        },

                        300: {  // namespace-manager.js
                            msg: ''
                        },
                        310: {  // private function, proterty
                            msg: ''
                        },
                        311: {  // EL03311
                            msg: 'NamespaceManager.isOverlap 은  \'boolean\' 타입만 가능합니다. typeof isOverlap = $1'
                        },
                        312: {  // EL03312
                            msg: '_getArray(ns); ns 는 유효한 네임스페이스 이름 규칙이 아닙니다. ns = $1'
                        },
                        313: {  // EL03313
                            msg: '_getArray(ns); ns 타입은 \'string\', \'array<string>\' 타입만 가능합니다. typeof ns = $1'
                        },
                        314: {  // EL03314
                            msg: '_getArray(ns); ns[$1] 는 \'string\' 타입이 아닙니다. typeof ns[$1] = $2'
                        },
                        315: {  // EL03315
                            msg: '_getArray(ns); ns[$1] 는 유효한 이름 규칙이 아닙니다. ns[$1] = $1'
                        },
                        320: {  // addNamespace, delNamespace, path
                            msg: ''
                        },
                        321: {  // EL03321
                            msg: 'addNamespace(ns); 네임스페이스 추가가 실패하였습니다.'
                        },
                        322: {  // EL03322
                            msg: 'delNamespace(ns); 네임스페이스 삭제가 실패하였습니다.'
                        },
                        323: {  // EL03323
                            msg: 'path(ns); 네임스페이스 경로 얻기에 실패하였습니다.'
                        },
                        330: {  // add, del 
                            msg: ''
                        },
                        331: {  // EL03331
                            msg: 'add(fullName, elem); [$1] 는 유효한 이름 규칙이 아닙니다.'
                        },
                        332: {  // EL03332
                            msg: 'add(fullName, elem); elem 이 이미 등록되었습니다. 중복허용 [this.isOverlap = \'true\']'
                        },
                        333: {  // EL03333
                            msg: 'add(fullName, elem); 네임스페이스에 요소 등록이 실패하였습니다.'
                        },
                        334: {  // EL03334
                            msg: 'del(fullName); 네임스페이스에 요소 삭제가 실패하였습니다.'
                        },
                        340: {  // getPath, output, load
                            msg: ''
                        },
                        341: {  // EL03341
                            msg: 'getPath(elem); elem 값이 없습니다. typeof elem = $1'
                        },
                        342: {  // EL03342
                            msg: 'output(stringify, space); 네임스페이스 내보내기가 실패하였습니다. $1'
                        },
                        343: {  // EL03343
                            msg: 'load(str, parse); str 는 \'string\' 타입이 아닙니다. typeof str = $1'
                        },
                        344: {  // EL03344
                            msg: 'load(str, parse); 네임스페이스 로딩이 실패하였습니다. $1'
                        },
                    },
                    L04: {  // Collection.*
                        100: {
                            msg: ''
                        },
                        110: {  // base-collection.js
                            msg: ''
                        },
                        111: {  // EL04111
                            msg: '_remove(idx): boolean 는 추상메소드 입니다. 구현해야 합니다.'
                        },
                        112: {  // EL04112
                            msg: 'setObject(oGuid, origin); oGuid 의 _owner 연결이 실패하였습니다. guid = $1'
                        },
                        113: {  // EL04113
                            msg: 'removeAt(idx); idx 는 \'number\' 타입이 아닙니다. typeof idx = $1'
                        },
                        114: {  // EL04114
                            msg: 'add(any): number 는 추상메소드 입니다. 구현해야 합니다.'
                        },
                        115: {  // EL04115
                            msg: 'clear() 는 추상메소드 입니다. 구현해야 합니다.'
                        },
                        200: {
                            msg: ''
                        },
                        
                        210: {  // collection-array.js
                            msg: ''
                        },
                        211: {  // EL04211
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'][$1] 의 _elements 연결이 실패하였습니다. guid = $2'
                        },
                        212: {  // EL04212
                            msg: 'insertAt(pos, value, desc); pos 는 \'number\' 타입이 아닙니다. typeof pos = $1'
                        },
                        213: {  // EL04213
                            msg: 'insertAt(pos, value, desc); pos 는 this.count 보다 클 수 없습니다. pos = $1, count = $2'
                        },
                        214: {  // EL04214
                            msg: 'insertAt(pos, value, desc);  pos 는 0 보다 작을 수 없습니다. pos = $1'
                        },
                        215: {  // EL04215
                            msg: 'insertAt(pos, value, desc); 등록이 실패하였습니다. pos = $1, value = $2'
                        },

                        220: {  // collection-property.js
                            msg: ''
                        },
                        221: {  // EL04221
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_key\'].length = $2 길이가 서로 다릅니다.'
                        },
                        222: {  // EL04222
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_desc\'].length = $2 길이가 서로 다릅니다.'
                        },
                        223: {  // EL04223
                            msg: 'setObject(oGuid, origin); oGuid._elem[$1] guid 를 찾을 수 없습니다. guid = $2' 
                        },
                        224: {  // EL04224
                            msg: 'indexOf(obj, isKey); key로 인덱스값을 찾을 경우 obj 는 \'string\' 타입이어야 합니다. typeof obj = $1'
                        },
                        225: {  // EL04225
                            msg: 'add(name, value, desc); name 이 \'string\' 타입이 아닙니다. typeof name = $1'
                        },
                        226: {  // EL04226
                            msg: 'add(name, value, desc); name = \'$1\' 이 이름규칙에 맞지 않습니다. 규칙 = \'$2\''
                        },
                        227: {  // EL04227
                            msg: 'add(name, value, desc); name = \'$1\' 이 예약어 입니다.'
                        },
                        228: {  // EL04228
                            msg: 'add(name, value, desc); name = \'$1\' 이 기존 이름과 중복이 발생했습니다.'
                        },
                        229: {  // EL04229
                            msg: 'add(name, value, desc); 추가가 실패하였습니다. name = \'$1\', value = \'$2\''
                        },
                        '22A': {  // EL0422A
                            msg: 'keyOf(idx); idx 이 \'number\' 타입이 아닙니다. typeof idx = $1'
                        },
                        '22B': {  // EL0422B
                            msg: 'exist(key); key 이 \'string\' 타입이 아닙니다.(length > 0) typeof key = $1'
                        },
                        
                        300: {
                            msg: ''
                        },
                        310: {  // collection-transaction.js
                            msg: ''
                        },
                        311: {  // EL04311
                            msg: '$1.autoChanges 는 \'boolean\' 타입입니다. typeof aucoChanges = \'$2\''
                        },
                        320: {  // trans-queue.js
                            msg: ''
                        },
                        321: {  // EL04321
                            msg: 'collection 값이 [MetaObject] 을 상속한 인스턴스가 아닙니다.'
                        },
                        322: {  // EL04322
                            msg: 'collection 이 [IArrayCollection] 을 구현한 인스턴스가 아닙니다.'
                        },
                        323: {  // EL04323
                            msg: 'rollback(); \'$1\' 는 처리할 수 없는 cmd 입니다.'
                        },
                    },
                    L05: {  // Meta.Entity.*
                        100: {
                            msg: ''
                        },
                        110: {  // BaseColumn
                            msg: ''
                        },
                        111: {  // EL05111
                            msg: '$1._entity 값이 [MetaElement] 인스턴스가 아닙니다.'
                        },
                        112: {  // EL05112
                            msg: '$1.columnName 는 \'string\' 타입입니다. typeof columnName = \'$2\''
                        },
                        113: {  // EL05113
                            msg: '기존에 $1.columnName \'$2\'이 존재합니다.'
                        },
                        114: {  // EL05114
                            msg: '기존에 $1.alias \'$2\'이 존재하여 columnName 을 설정할 수 없습니다.'
                        },
                        115: {  // EL05115
                            msg: '$1.alias 는 \'string\' 타입입니다. typeof alias = \'$2\''
                        },
                        116: {  // EL05116
                            msg: '기존에 $1.alias \'$2\'이 존재합니다.'
                        },
                        117: {  // EL05117
                            msg: '$1.caption 는 \'string\' 타입입니다. typeof caption = \'$2\''
                        },
                        118: {  // EL05118
                            msg: 'setObject(oGuid, origin); oGuid.[\'_entity\'] guid 를 찾을 수 없습니다. name = $1, guid = $2' 
                        },
                        119: {  // EL05119
                            msg: 'clone() 은 추상메소드 입니다. 상속해서 구현해야 합니다.'
                        },

                        120: {  // ObjectColumn
                            msg: ''
                        },
                        121: {  // EL05121
                            msg: '_load(prop); prop 는 \'object\' 타입입니다. typeof prop = \'$2\''
                        },
                        122: {  // EL05122
                            msg: 'setObject(oGuid, origin); oGuid.[\'default\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },
                        123: {  // EL05123
                            msg: 'setObject(oGuid, origin); oGuid.[\'value\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },

                        130: {  // MetaColumn
                            msg: ''
                        },
                        131: {  // EL05131
                            msg: '$1.isNotNull 는 \'boolean\' 타입입니다. typeof isNotNull = \'$2\''
                        },
                        132: {  // EL05132
                            msg: '$1.isNullPass 는 \'boolean\' 타입입니다. typeof isNullPass = \'$2\''
                        },
                        133: {  // EL05133
                            msg: '$1.constraints 의 배열 요소는 \'function\' | {regex: RegExp, msg: string} 타입입니다. typeof [$2].regex = \'$3\', [$2].msg = \'$4\''
                        },
                        134: {  // EL05134
                            msg: '$1.getter 는 \'function\' 타입입니다. typeof getter = \'$2\''
                        },
                        135: {  // EL05135
                            msg: '$1.setter 는 \'function\' 타입입니다. typeof setter = \'$2\''
                        },
                        136: {  // EL05136
                            msg: 'addConstraint(regex, msg, code, condition); regex 는 RegExp 인스턴스가 아닙니다.'
                        },
                        137: {  // EL05137
                            msg: 'addConstraint(regex, msg, code, condition); msg 는 \'string\' 타입입니다. typeof msg = \'$1\''
                        },

                        140: {  // BaseColumnCollection
                            msg: ''
                        },
                        141: {  // EL05141
                            msg: '$1._baseType 는 \'function\' 타입입니다. typeof getter = \'$2\''
                        },
                        142: {  // EL05142
                            msg: '$1._baseType [BaseColumn]의 prototype 이 연결되어 있어야 합니다.(상속)'
                        },
                        143: {  // EL05143
                            msg: 'add(name, vlaue); _onwer 의 rows 가 존재하여 columnColleciton 을 추가할 수 없습니다. _onwer.rows.count = $1'
                        },
                        144: {  // EL05144
                            msg: 'add(name, vlaue); $1 에 \'$2\' 존재하여 추가할 수 없습니다.'
                        },
                        145: {  // EL05145
                            msg: 'add(name, vlaue); $1 에 alias \'$2\'이 존재하여 추가할 수 없습니다.'
                        },
                        146: {  // EL05146
                            msg: 'removeAt(idx); _onwer 의 rows 가 존재하여 columnColleciton 을 제거할 수 없습니다. _onwer.rows.count  = $1'
                        },
                        147: {  // EL05147
                            msg: 'addValue(name, value) 은 추상메소드 입니다. 구현해야 합니다.'
                        },

                        150: {  // MetaTableColumnCollection
                            msg: ''
                        },
                        151: {  // EL05151
                            msg: 'add(any); any 는 \'string\' | [BaseColumn] 타입입니다. typeof any = $1'
                        },
                        152: {  // EL05152
                            msg: 'addValue(name, value); name 은 \'string\' 타입입니다. typeof name = $1'
                        },
                        160: {  // MetaViewColumnCollection
                            msg: ''
                        },
                        161: {  // EL05161
                            msg: 'add(any, refCol); refCol 값이 [BaseColumnCollection] 타입이 아닙니다.'
                        },
                        162: {  // EL05162
                            msg: 'add(any, refCol); any 는 \'string\' | [BaseColumn] 타입입니다. typeof any = $1'
                        },
                        163: {  // EL05163
                            msg: 'addValue(name, value, refCol); name 은 \'string\' 타입입니다. typeof name = $1'
                        },
                        164: {  // EL05164
                            msg: 'addEntity(entity); entity 값이 [BaseEntity] 타입이 아닙니다.'
                        },

                        200: {  //
                            msg: ''
                        },
                        210: {  // MetaRow
                            msg: ''
                        },
                        211: {  // EL05211
                            msg: '$1.constructor(entity) 값이 [BaseEntity] 타입이 아닙니다.'
                        },
                        212: {  // EL05212
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_key\'].length = $2 길이가 서로 다릅니다.'
                        },
                        213: {  // EL05213
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'][$1] guid 를 찾을 수 없습니다. guid = $2'
                        },

                        220: {  // MetaRowCollection
                            msg: ''
                        },
                        221: {  // EL05221
                            msg: 'target의 _entity 객체와 $1._onwer 객체가 같이야 합니다.'
                        },
                        222: {  // EL05222
                            msg: 'insertAt(pos, row, isCheck); row 는 [MetaRow] 타입이 아닙니다.'
                        },
                        223: {  // EL05223
                            msg: 'insertAt(pos, row, isCheck); row 의 _entity 객체와 $1._onwer 객체가 같이야 합니다.'
                        },
                        224: {  // EL05224
                            msg: 'insertAt(pos, row, isCheck); row[$1] 의 유효성 검사(valid)가 실패하였습니다. fail msg = \'$2\''
                        },

                        300: {  // base-entity.js
                            msg: ''
                        },
                        310: {  // property
                            msg: ''
                        },
                        311: {  // EL05311
                            msg: '$1._mestaset 값은 [MetaSet] 타입이 아닙니다.'
                        },
                        312: {  // EL05312
                            msg: '$1.columns 속성을 재정의해야 합니다.'
                        },

                        320: {  // private method :: _buildEntity, _readEntity, _readSchema - 14
                            msg: ''
                        },
                        321: {  // EL05321
                            msg: '_buildEntity(entity, cb, items); items[$1] 가 \'string\' 타입이 아닙니다. typeof items[$1] = $2'
                        },
                        322: {  // EL05322
                            msg: '_buildEntity(entity, cb, items); this.columns 에 \'$1\' 컬럼명이 존재하여 추가할 수 없습니다.'
                        },
                        323: {  // EL05323
                            msg: '_buildEntity(entity, cb, items); entity 에 대한 row 생성이 실패하였습니다.'
                        },
                        324: {  // EL05324
                            msg: '_readEntity(entity, opt); entity 가 [BaseEntity] 타입이 아닙니다.'
                        },
                        325: {  // EL05325
                            msg: '_readEntity(entity, opt); opt 가 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        326: {  // EL05326
                            msg: '_readEntity(entity, opt); entity 읽기가 실패하였습니다. opt = $1'
                        },
                        327: {  // EL05327
                            msg: '_readEntity(entity, opt); this.rows 가 존재하여 컬럼을 load 할 수 없습니다. opt = $1'
                        },
                        328: {  // EL05328
                            msg: '_readEntity(entity, opt); this.columns 에 \'$1\' 컬럼명이 존재하여 추가할 수 없습니다.'
                        },
                        329: {  // EL05329
                            msg: '_readSchema(obj, isRow, origin); obj._baseEntity guid를 찾을 수 없습니다. guid = $1'
                        },
                        '32A': {  // EL0532A
                            msg: '_readSchema(obj, isRow, origin); 스키마 읽기가 실패하였습니다.'
                        },
                        '32B': {  // EL0532B
                            msg: '_readSchema(obj, isRow, origin); this.rows 가 존재하여 컬럼을 추가 할 수 없습니다.'
                        },
                        '32C': {  // EL0532C
                            msg: '_readSchema(obj, isRow, origin); this.columns[$1] guid를 찾을 수 없습니다. guid = $2'
                        },
                        '32D': {  // EL0532D
                            msg: '_readSchema(obj, isRow, origin); this.columns[$1]._entity guid를 찾을 수 없습니다. guid = $2'
                        },
                        '32E': {  // EL0532E
                            msg: '_readSchema(obj, isRow, origin); this.columns 에 \'$1\' 컬럼명이 존재하여 추가할 수 없습니다.'
                        },

                        330: {  // method :: transformSchema(static), setValue, clone, select - 7, 예외 없음 : getValue, clear, reset, newRow, getObject, setObject
                            msg: ''
                        },
                        331: {  // EL05331
                            msg: 'BaseEntity.transformSchema(oGuid); oGuid 는 스키마 객체가 아닙니다. oGuid = {columns: $1, rows: $2}'
                        },
                        332: {  // EL05332
                            msg: 'BaseEntity.transformSchema(oGuid); 스키마 변환이 실패하였습니다.'
                        },
                        333: {  // EL05333
                            msg: 'setValue(row); row 가 [MetaRow] 타입이 아닙니다.'
                        },
                        334: {  // EL05334
                            msg: 'setValue(row); columns 에 row 설정이 실패하였습니다.'
                        },
                        335: {  // EL05335
                            msg: 'select(filter, ...); MetaRegistry.ns 에서 \'$1\' 가져오는데 싪패하였습니다.'
                        },
                        336: {  // EL05336
                            msg: 'select(filter, ...); 조회가 실패하였습니다.'
                        },
                        337: {  // EL05337
                            msg: 'clone() 은 추상메소드 입니다. 구현해야 합니다.'
                        },

                        340: {  // merge, copy - 8
                            msg: ''
                        },
                        341: {  // EL05341
                            msg: 'merge(target, opt, isMath); target 이 [BaseEntity] 타입이 아닙니다.'
                        },
                        342: {  // EL05342
                            msg: 'merge(target, opt, isMath); opt 이 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        343: {  // EL05343
                            msg: 'merge(target, opt, isMath); opt = 1, target.columns[$1].name = \'$2\' 이 column name 에 존재합니다.'
                        },
                        344: {  // EL05344
                            msg: 'merge(target, opt, isMath); opt = 1, target.columns[$1].name = \'$2\' 이 column alias 에 존재합니다.'
                        },
                        345: {  // EL05345
                            msg: 'merge(target, opt, isMath); opt = 3, target.columns[$1].name = \'$2\' 이 columns name 에 존재합니다.'
                        },
                        346: {  // EL05346
                            msg: 'merge(target, opt, isMath); opt = 3, target.columns[$1].name = \'$2\' 이 columns alias 에 존재합니다.'
                        },
                        347: {  // EL05347
                            msg: 'merge(target, opt, isMath); 병합이 실패하였습니다. opt = $1'
                        },
                        348: {  // EL05348
                            msg: 'copy() 은 추상메소드 입니다. 구현해야 합니다.'
                        },

                        350: {  // load, read, readSchema, readDate - 12
                            msg: ''
                        },
                        351: {  // EL05351
                            msg: 'load(obj, parse); [BaseEntity] 타입의 obj 는 로드할 수 없습니다.'
                        },
                        352: {  // EL05352
                            msg: 'load(obj, parse); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        353: {  // EL05353
                            msg: 'load(obj, parse); 로드가 실패하였습니다.'
                        },
                        354: {  // EL05354
                            msg: 'read(obj, opt); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        355: {  // EL05355
                            msg: 'read(obj, opt); opt 이 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        356: {  // EL05356
                            msg: 'read(obj, opt); opt 값은 범위(1 ~ 3)가 아닙니다. obj = $1'
                        },
                        357: {  // EL05357
                            msg: 'read(obj, opt); 읽기가 실패하였습니다.'
                        },
                        358: {  // EL05358
                            msg: 'readSchema(obj, isCreate, origin); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        359: {  // EL05359
                            msg: 'readSchema(obj, isCreate, origin); obj 는 스키마 객체가 아닙니다. obj = {columns: $1, rows: $2}'
                        },
                        '35A': {  // EL0535A
                            msg: 'readSchema(obj, isCreate, origin); 스카미 읽기가 실패하였습니다.'
                        },
                        '35B': {  // EL0535B
                            msg: 'readData(obj); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        '35C': {  // EL0535C
                            msg: 'readData(obj); obj 는 스키마 객체가 아닙니다. obj = {columns: $1, rows: $2}'
                        },
                        '35D': {  // EL0535D
                            msg: 'readData(obj); 데이터 읽기가 실패하였습니다.'
                        },

                        360: {  // output, write, writeSchema, writeData
                            msg: ''
                        },
                        361: {  // EL05361
                            msg: ''
                        },

                        400: {
                            msg: ''
                        },
                        410: {  // MetaTable
                            msg: ''
                        },
                        411: {  // EL05411
                            msg: '$1.tableName 값은 \'string\' 타입이 아닙니다. typeof tableName = $2'
                        },
                        412: {  // EL05412
                            msg: '$1.columns 값은 [MetaTableColumnCollection] 타입이 아닙니다.'
                        },
                        413: {  // EL05413
                            msg: '$1.rows 존재하여 columns 을 설정할 수 없습니다. rows.count = $2'
                        },
                        414: {  // EL05414
                            msg: 'setObject(oGuid, origin); oGuid.[\'_metaSet\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },

                        420: {  // MetaTableColleciton
                            msg: ''
                        },
                        421: {  // EL05421
                            msg: '$1._baseType 값은 function 타입이 아닙니다. typeof _baseType = $2'
                        },
                        422: {  // EL05422
                            msg: '$1._baseType [MetaTable]의 prototype 이 연결되어 있어야 합니다.(상속)'
                        },
                        423: {  // EL05423
                            msg: 'add(any); any 는 \'string\' | [MetaTable] 타입만 가능합니다. typeof any = $1'
                        },
                        424: {  // EL05424
                            msg: 'add(any); tableName = \'$1\'이 기존에 존재합니다.'
                        },

                        430: {  // MetaView
                            msg: ''
                        },
                        431: {  // EL05431
                            msg: '$1.viewName 값은 \'string\' 타입이 아닙니다. typeof viewName = $2'
                        },
                        432: {  // EL05432
                            msg: '$1.columns 값은 [MetaViewColumnCollection] 타입이 아닙니다.'
                        },
                        433: {  // EL05433
                            msg: '$1.rows 존재하여 columns 을 설정할 수 없습니다. rows.count = $2'
                        },
                        434: {  // EL05434
                            msg: '$1._baseEntity 값은 [BaseEntity] 타입이 아닙니다.'
                        },
                        435: {  // EL05435
                            msg: 'setObject(oGuid, origin); oGuid.[\'_metaSet\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },
                        436: {  // EL05436
                            msg: 'setObject(oGuid, origin); oGuid.[\'_baseEntity\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },

                        440: {  // MetaViewColleciton
                            msg: ''
                        },
                        441: {  // EL05441
                            msg: '$1._baseType 값은 \'function\' 타입이 아닙니다. typeof _baseType = $2'
                        },
                        442: {  // EL05442
                            msg: '$1._baseType [MetaView]의 prototype 이 연결되어 있어야 합니다.(상속)'
                        },
                        443: {  // EL05443
                            msg: 'add(obj, baseEntity); [MetaView] 타입의 obj와  baseEntity 를 동시에 입력할 수 없습니다.'
                        },
                        444: {  // EL05444
                            msg: 'add(obj, baseEntity); baseEntity 는 [BaseEntity] 타입이 아닙니다.'
                        },
                        445: {  // EL05445
                            msg: 'add(obj, baseEntity); obj 는 \'string\' | [MetaView] 타입만 가능합니다. typeof obj = $1'
                        },
                        446: {  // EL05446
                            msg: 'add(obj, baseEntity); viewName = \'$1\'이 기존에 존재합니다.'
                        },

                        450: {  // MetaSet
                            msg: ''
                        },
                        451: {  // EL05451
                            msg: '$1.setName 값은 \'string\' 타입이 아닙니다. typeof setName = $2'
                        },
                        452: {  // EL05452
                            msg: '$1.autoChanges 값은 \'boolean\' 타입이 아닙니다. typeof setName = $2'
                        },
                        453: {  // EL05453
                            msg: 'MetaSet.transformSchema(oGuid); oGuid 는 스키마 객체가 아닙니다. oGuid = {tables: .., views: ..}'
                        },
                        454: {  // EL05454
                            msg: 'load(obj, parse); [MetaSet] 타입의 obj 는 로드할 수 없습니다.'
                        },
                        455: {  // EL05455
                            msg: 'load(obj, parse); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        456: {  // EL05456
                            msg: 'read(obj, opt); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        457: {  // EL05457
                            msg: 'read(obj, opt); opt 이 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        458: {  // EL05458
                            msg: 'readSchema(obj, isCreate); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        459: {  // EL05459
                            msg: 'readSchema(obj, isCreate); obj 는 스키마 객체가 아닙니다. obj = {tables: $1, views: $2}'
                        },
                        '45A': {  // EL0545A
                            msg: 'readData(obj); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        '45B': {  // EL0545B
                            msg: 'readData(obj); obj 는 스키마 객체가 아닙니다. obj = {tables: $1, views: $2}'
                        },

                    },

                    /**
                     * 네임스페이스 기준으로 분리하면 적합할 듯
                     * L01 : Common.*       message.js<제외>, extend-error.js<자체>, util.js:4, util-type.js:100~, observer.js:6, load-namespace.js <없음>
                     *  - 100 : util-type match
                     *  - 200 : util-type allow
                     *  - 300 : util-type etc
                     *  - 400 : util
                     * 
                     * L02 : Interface.*    i-*.js:26  <14개>
                     *  - 100 : Meta.*,            i-object.js, i-marshal.js, i-element.js, i-list.js, i-control-list.js
                     *  - 200 : Collectoin.*       i-collectin.js, i-collectin-array.js, i-collection-property.js
                     *  - 300 : Meta.Entity.*      i-control-export.js, i-control-group.js, i-control-import.js, i-control-schema.js, i-serialize.js, i-transaction.js
                     * 
                     * L03 : Meta
                     *  - 100 : meta-object.js:4, meta-element.js:2
                     *  - 200 : meta-register.js:28
                     *      + 10 : 객체 등록 관련-5
                     *      + 20 : create 관련-11
                     *      + 30 : 네임스페이스 동록 관련-4 
                     *      + 40 : 변경 관련  11
                     *      + 50 : 조회 관련
                     *  - 300~ : namespace-manager.js:10
                     *      + 10 : private, prop
                     *      + 20 : ns 제어
                     *      + 30 : ns 요소 제어
                     *      + 40 : 기타
                     * L04 : Collection
                     *  - 100 : base-collection.js:5
                     *  - 200 : collection-array.js:5, collection-property.js:11
                     *  - 300 : collection-transaction.js:1, trans-queue.js, 
                     * 
                     * L05 : Meta.Entity
                     *  - 100 : 
                     *      + 10 : base-column-9
                     *      + 20 : object-column-3
                     *      + 30 : meta-column-7
                     *      + 40 : base-column-collection-7
                     *      + 50 : table-column-collection-2
                     *      + 60 : view -column-collection-4
                     *  - 200 : row
                     *      + 10 : meta-row.js:7 
                     *  - 300 : base-entity.js:34
                     *      + 10 : 속성-2
                     *      + 20 : private method-11
                     *      + 30 : 자체 메소드 :: seValue-1,  select-1,, clone-1
                     *      + 40 : merge-6, copy-1
                     *      + 50 : load-2, output
                     *      + 60 : read-3, readSchema-2, readDate-2
                     * 
                     *  - 400 : 
                     *      + 10 : meta-table.js:9
                     *      + 20 : colleciton-4
                     *      + 30 : meta-view.js:13
                     *      + 40 : collection-6
                     *      + 50 :  meta-set.js:11
                     * 
                     * POINT:
                     * G01 : 전역 코드? L01 에 적용가능?
                     */
                },
                W: {    // warning
                    S01: {  // 범위
                        1: {
                            msg: '[$1] 대상 [$2]는 삭제 할 수 없습니다.',
                            long: '"configurable = true, writable = true" 로 설정하시면 이후 삭제 가능합니다. '
                        },
                    }
                },
                I: {    // Information
                    S01: {  // 범위
                            1: {
                            msg: '[$2] [$1]',
                            long: ''
                        },
                    },
                }
            }
        };
        
        /**
         * 메세지 언어 
         * @member {string} _L.Common.Message#lang
         */
        Object.defineProperty(Message, "lang", {
            get: function() { return lang; },
            set: function(val) { 
                if (!$STORAGE[val]) throw new Error('The ['+ val +'] language does not exist.');
                lang = val; 
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * 긴 메세지 여부
         * @member {string} _L.Common.Message#isLong
         */
        Object.defineProperty(Message, "isLong", {
            get: function() { return isLong; },
            set: function(val) { 
                isLong = val; 
            },
            configurable: false,
            enumerable: false,
        });

        // local function
        function _getCodeObject(code){
            var MSG = $STORAGE[lang];
            var div, part, num;

            if (typeof code !== 'string') return;
            
            div = code.substring(0, 1);
            part = code.substring(1, 4);
            num = code.substring(4, code.length);
            if (!MSG[div] || !MSG[div] || !MSG[div][part]) return;

            return MSG[div][part][num];
        }
        

        function _buildMessage(code, arr) {
            var obj = _getCodeObject(code);
            var msg, long;

            if (typeof obj !== 'object') return $intro(code) + 'There are no messages about the code.' 
            
            msg = $build(obj.msg);
            if (isLong) {
                long = $build(obj.long);
                if (long.length > 0) msg += '\n' + long;
            }
            return $intro(code) + msg;

            // inner function
            function $build(p_msg) {
                var msg = p_msg || '';
                var result;
                var max = 0;
                
                if (msg === '') return msg;
                result = msg.match(/\$\d+/g);
                if (!Array.isArray(result)) return msg;

                max = result.reduce((acc, cur, idx) => { 
                    var num = Number(cur.replace('$',''));
                    return acc < num ? num : acc; 
                }, 0);
                    
                for (var i = 1; i <= max; i++) {
                    var val = arr[i -1];
                    msg = msg.replace(new RegExp('\\$'+ i, 'g'), val);
                }
                return msg;
            }
            function $intro(code) {
                var div;
                var intro = '';

                if (typeof code === 'string' && code.length > 0) {
                    div = code.substring(0, 1);
                    if (div === 'E') intro = '['+code+'] ';
                    else if (div === 'W') intro = '['+code+'] ';
                    else if (div === 'I') intro = '['+code+'] ';
                    else intro = '['+code+'] ';
                }
                return intro;
            }
        }

        /**
         * 메세지를 초기화 합니다. TODO: 꼭 필요할까? 필요없을듯
         */
        Message.init = function() {
            this.lang = 'eng';
            this.isLong = false;
        };

        /**
         * 메세지 코드에 대한 문자열를 얻습니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         * @returns {string}
         */
        Message.get = function(p_code, p_aValue) {
            return _buildMessage(p_code, p_aValue);
        };

        /**
         * 메세지 코드에 대한 객체를 얻습니다.
         * @param {string} p_code 메시지 코드
         * @returns {object} {msg: '메세지', long: '긴메세지'}
         */
        Message.getObject = function(p_code) {
            return _getCodeObject(p_code);
        };

        /**
         * 메세지 코드에 대한 Error 객체를 생성해서 예외룰 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.error = function(p_code, p_aValue) {
            throw new Error(Message.get(p_code, p_aValue));
        };

        /**
         * 메세지 코드에 대한 console.warn 을 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.warn = function(p_code, p_aValue) {
            console.warn(Message.get(p_code, p_aValue));
        };



        return Message;
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.Message = Message;
    } else {
        _global._L.Message = Message;
        _global._L.Common.Message = Message;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** i-object.js | _L.Interface.IObject ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    
    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IObject  = (function () {
        /**
         * 객체 인터페이스 입니다. (최상위)
         * @constructs _L.Interface.IObject 
         * @interface
         */
        function IObject() {
        }
        
        IObject._NS = 'Interface';    // namespace
        IObject._KIND = 'interface';

        /**
         * 객체 타입들을 얻습니다.
         * @returns {array<any>}
         * @abstract
         */
        IObject.prototype.getTypes  = function() {
            throw new ExtendError(/EL02111/, null, ['IObject']);
        };
        
        /**
         * 객체의 인스턴스 여부를 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IObject.prototype.instanceOf  = function() {
            throw new ExtendError(/EL02112/, null, ['IObject']);
        };

        /**
         * 객체와 비교합니다.
         * @returns {boolean}
         * @abstract
         */
        IObject.prototype.equal  = function() {
            throw new ExtendError(/EL02113/, null, ['IObject']);
        };
        
    
        return IObject;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IObject = IObject;
    } else {
        _global._L.IObject = IObject;
        _global._L.Interface.IObject = IObject;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** i-marshal.js | _L.Interface.IMarshal ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IMarshal  = (function () {
        /**
         * 객체 통제 인터페이스 입니다.
         * @constructs _L.Interface.IMarshal
         * @interface
         */
        function IMarshal() {

            /**
             * 객체의 고유 식별자
             * @member {string} _L.Interface.IMarshal#_guid
             */
            this._guid = String;

            /**
             * 객체의 타입
             * @member {string} _L.Interface.IMarshal#_type
             */
            this._type = [['_req_', Function, {$type: 'class'} ]];
        }

        IMarshal._NS = 'Interface';    // namespace
        IMarshal._KIND = 'interface';
        
        /**
         * 대상의 직렬화 객체를 얻습니다.
         * @abstract
         */
        IMarshal.prototype.getObject = function() {
            throw new ExtendError(/EL02121/, null, ['IMarshal']);
        };

        /**
         * 직렬화 객체를 설정합니다.
         * @abstract
         */
        IMarshal.prototype.setObject  = function() {
            throw new ExtendError(/EL02122/, null, ['IMarshal']);
        };

        return IMarshal;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IMarshal = IMarshal;
    } else {
        _global._L.IMarshal = IMarshal;
        _global._L.Interface.IMarshal = IMarshal;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** i-colleciton.js | _L.Interface.ICollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};    
    
    //==============================================================
    // 2. import module
    
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Util                       = require('./util');
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Util                       = _global._L.Util
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Util                    = _Util                 || $Util;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

    //==============================================================
    // 4. module implementation
    var ICollection  = (function () {
        /**
         * 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.ICollection
         * @interface
         */
        function ICollection() {
        }

        ICollection._KIND = 'interface';
        ICollection._NS = 'Interface';    // namespace

        /**
         * 컬렉션에 요소를 추가합니다.
         * @abstract
         */
        ICollection.prototype.add  = function() {
            throw new ExtendError(/EL02211/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소를 제거합니다.
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            throw new ExtendError(/EL02212/, null, ['ICollection']);
        };

        /**
         * 요소가 컬렉션에 존재하는지 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            throw new ExtendError(/EL02213/, null, ['ICollection']);
        };

        /**
         * 컬렉션에서 요소을 조회합니다.
         * @returns {number}
         * @abstract
         */
        ICollection.prototype.indexOf  = function() {
            throw new ExtendError(/EL02214/, null, ['ICollection']);
        };

        return ICollection;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ICollection = ICollection;
    } else {
        _global._L.ICollection = ICollection;
        _global._L.Interface.ICollection = ICollection;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** i-colleciton-property.js | _L.Interface.IPropertyCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Util                       = require('./util');
        var _ICollection                = require('./i-collection').ICollection;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Util                       = _global._L.Util;
        var $ICollection                = _global._L.ICollection;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Util                    = _Util                 || $Util;
    var ICollection             = _ICollection          || $ICollection;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof ICollection === 'undefined') throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

    //==============================================================
    // 4. module implementation   
    var IPropertyCollection  = (function (_super) {
        /**
         * 프로퍼티 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.IPropertyCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IPropertyCollection() {
            _super.call(this);
        }
        Util.inherits(IPropertyCollection, _super);

        IPropertyCollection._KIND = 'interface';
        IPropertyCollection._NS = 'Interface';    // namespace

        /**
         * 프로퍼티 키가 존재하는지 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IPropertyCollection.prototype.keyOf  = function() {
            throw new ExtendError(/EL02231/, null, ['IPropertyCollection']);
        };

        return IPropertyCollection;
        
    }(ICollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IPropertyCollection = IPropertyCollection;
    } else {
        _global._L.IPropertyCollection = IPropertyCollection;
        _global._L.Interface.IPropertyCollection = IPropertyCollection; // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** i-element.js | _L.Interface.IElement ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IElement  = (function () {
        /**
         * 요소(독립) 인터페이스 입니다.
         * @constructs _L.Interface.IElement
         * @interface
         */
        function IElement() {
            /**
             * 요소명
             * @member {string} _L.Interface.IElement#_name
             */
            this._name = String;
        }

        IElement._NS = 'Interface';    // namespace
        IElement._KIND = 'interface';

        /**
         * 요소를 복제합니다.
         * @returns {any}
         * @abstract
         */
        IElement.prototype.clone  = function() {
            throw new ExtendError(/EL02131/, null, ['IElement']);
        };

        return IElement;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IElement = IElement;
    } else {
        _global._L.IElement = IElement;
        _global._L.Interface.IElement = IElement;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** i-list.js | _L.Interface.IList ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IList  = (function () {
        /**
         * 목록 인터페이스 입니다.
         * @constructs _L.Interface.IList
         * @interface
         */
        function IList() {

            /**
             * 목록
             * @member {array} _L.Interface.IList#_list
             */
            this._list = Array;
            
            /**
             * 목록 갯수
             * @member {number} _L.Interface.IList#count
             */
            this.count = Number;
        }

        IList._NS = 'Interface';    // namespace
        IList._KIND = 'interface';

        return IList;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IList = IList;
    } else {
        _global._L.IList = IList;
        _global._L.Interface.IList = IList;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** i-control-list.js | _L.Interface.IListControl ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var IListControl  = (function () {
        /**
         * 목록 제어 인터페이스 입니다.
         * @constructs _L.Interface.IListControl
         * @interface
         */
        function IListControl() {
        }

        IListControl._NS = 'Interface';    // namespace
        IListControl._KIND = 'interface';
        
        /**
         * 목록에 대상을 추가합니다.
         * @abstract
         */
        IListControl.prototype.add = function() {
            throw new ExtendError(/EL02151/, null, ['IListControl']);
        };

        /**
         * 목록에서 대상을 삭제합니다.
         * @abstract
         */
        IListControl.prototype.del  = function() {
            throw new ExtendError(/EL02152/, null, ['IListControl']);
        };

        /**
         * 목록에 대상의 존재 여부를 확인합니다.
         * @returns {boolean}
         * @abstract
         */
        IListControl.prototype.has  = function() {
            throw new ExtendError(/EL02153/, null, ['IListControl']);
        };

        /**
         * 목록에서 대상을 찾습니다.
         * @returns {any}
         * @abstract
         */
        IListControl.prototype.find  = function() {
            throw new ExtendError(/EL02154/, null, ['IListControl']);
        };

        return IListControl;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IListControl = IListControl;
    } else {
        _global._L.IListControl = IListControl;
        _global._L.Interface.IListControl = IListControl;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** i-serialize.js | _L.Interface.ISerialize ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

    //==============================================================
    // 4. module implementation   
    var ISerialize  = (function () {
        /**
         * 직렬화 인터페이스 입니다.
         * @constructs _L.Interface.ISerialize
         * @interface
         */
        function ISerialize() {
        }

        ISerialize._NS = 'Interface';    // namespace
        ISerialize._KIND = 'interface';

        /**
         * 내보내기(출력)를 합니다.
         * @returns {any}
         * @abstract
         */
        ISerialize.prototype.output  = function() {
            throw new ExtendError(/EL02351/, null, ['ISerialize']);
        };

        /**
         * 가져오기(로드) 합니다.
         * @abstract
         */
        ISerialize.prototype.load  = function(String) {
            throw new ExtendError(/EL02352/, null, ['ISerialize']);
        };

        return ISerialize;
        
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ISerialize = ISerialize;
    } else {
        _global._L.ISerialize = ISerialize;
        _global._L.Interface.ISerialize = ISerialize;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** i-colleciton-array.js | _L.Interface.IArrayCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};     // Branch:
    _global._L.Interface            = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Util                       = require('./util');
        var _ICollection                = require('./i-collection').ICollection;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Util                       = _global._L.Util;
        var $ICollection                = _global._L.ICollection;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Util                    = _Util                 || $Util;
    var ICollection             = _ICollection          || $ICollection;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof ICollection === 'undefined') throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

    //==============================================================
    // 4. module implementation   
    var IArrayCollection  = (function (_super) {
        /**
         * 배열 컬렉션 인터페이스 입니다.
         * @constructs _L.Interface.IArrayCollection
         * @interface
         * @extends  _L.Interface.ICollection
         */
        function IArrayCollection() {
            _super.call(this);
        }
        Util.inherits(IArrayCollection, _super);
        
        IArrayCollection._KIND = 'interface';
        IArrayCollection._NS = 'Interface';    // namespace

        /**
         * 요소를 지정위치에 추가합니다.
         * @abstract
         */
        IArrayCollection.prototype.insertAt  = function() {
            throw new ExtendError(/EL02221/, null, ['IArrayCollection']);
        };
    
        return IArrayCollection;
        
    }(ICollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.IArrayCollection = IArrayCollection;
    } else {
        _global._L.IArrayCollection = IArrayCollection;
        _global._L.Interface.IArrayCollection = IArrayCollection; // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** namespace-manager.js | _L.Meta.NamespaceManager ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Type                       = require('./type');
        var _Util                       = require('./util');
        var _IList                      = require('./i-list').IList;
        var _IListControl               = require('./i-control-list').IListControl;
        var _ISerialize                 = require('./i-serialize').ISerialize;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Type                       = _global._L.Type;
        var $Util                       = _global._L.Util;
        var $IList                      = _global._L.IList;
        var $IListControl               = _global._L.IListControl;
        var $ISerialize                 = _global._L.ISerialize;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Type                    = _Type                 || $Type;
    var Util                    = _Util                 || $Util;
    var IList                   = _IList                || $IList;
    var IListControl            = _IListControl         || $IListControl;
    var ISerialize              = _ISerialize           || $ISerialize;
    
    //==============================================================Á
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IList === 'undefined') throw new Error(Message.get('ES011', ['IList', 'i-list']));
    if (typeof IListControl === 'undefined') throw new Error(Message.get('ES011', ['IListControl', 'i-control-list']));
    if (typeof ISerialize === 'undefined') throw new Error(Message.get('ES011', ['ISerialize', 'i-serialize']));

    //==============================================================
    // 4. module implementation   
    var NamespaceManager = (function () {
        /**
         * 네임스페이스 관리자를 생성합니다.
         * @constructs _L.Meta.NamespaceManager
         */
        function NamespaceManager() {

            var _storage = this.$createNsRefer();
            var _elemTypes  = []; 
            var isOverlap = false;
            
            
            /**
             * 내부 변수 접근
             * @member {string} _L.Meta.NamespaceManager#$storage
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$storage',
            {
                set: function(nVal) { _storage = nVal; },
                configurable: false,
                enumerable: false,
            });

            /**
             * 네임스페이스 저장소
             * @member {array} _L.Meta.NamespaceManager#_storage 
             * @private
             * @readonly
             */
            Object.defineProperty(this, '_storage',
            {
                get: function() { return _storage; },
                configurable: false,
                enumerable: false
            });

            /** 
             * 네임스페이스 요소 타입, elemTypes.length == 0 전체허용
             * @member {array<any>}  _L.Meta.NamespaceManager#_elemTypes  
             * @protected
             */
            Object.defineProperty(this, '_elemTypes', 
            {
                get: function() {
                    return _elemTypes;
                },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    _elemTypes = arrType;
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 네임스페이스 요소 목록
             * @member {array<string>}  _L.Meta.NamespaceManager#_list
             * @readonly
             */
            Object.defineProperty(this, '_list', 
            {
                get: function() {
                    var storage = this._storage;
                    var arr = [];
                    var stack = [];
                    findElement(storage);
                    return arr;

                    // inner function
                    function findElement(target) { 
                        for (var prop in target) {
                            if (prop === '_type') continue;
                            var ns = target[prop];
                            stack.push(prop);
                            if (!ns['_type']) {
                                arr.push(stack.join('.'));
                            } else findElement(ns);
                            stack.pop();
                        }
                    }
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 네임스페이스 요소 갯수
             * @member {number} _L.Meta.NamespaceManager#count 
             * @readonly
             */
            Object.defineProperty(this, 'count', 
            {
                get: function() {
                    return this._list.length;
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 중복 요소 등록 허용 여부, 기본값 = false (중복금지)
             * @member {boolean} _L.Meta.NamespaceManager#isOverlap
             */
            Object.defineProperty(this, 'isOverlap',
            {
                get: function() { return isOverlap; },
                set: function(val) { 
                    if (typeof val !== 'boolean') throw new ExtendError(/EL03311/, null, [typeof val]);
                    isOverlap = val;
                },
                configurable: false,
                enumerable: true
            });

            // inner variable access
            // this.__SET$storage = function(val, call) {
            //     if (call instanceof NamespaceManager) _storage = val;
            // }

            this._$KEYWORD = ['namespace', 'ns', 'NS', '_type'];    // 금지단어

            Util.implements(NamespaceManager, this);
        }
        NamespaceManager._UNION = [IList, IListControl];
        NamespaceManager._NS = 'Meta';
        
        // local function
        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }

        function _validNamespace(nsName) {  // 네임스페이스 이름 검사
            var regex = /^[_a-zA-Z]([.]?[_0-9a-zA-Z])*$/;
            return regex.test(nsName)
        }

        function _validName(sName) {   // 이름 검사
            var regex = /^[_a-zA-Z]([_0-9a-zA-Z])*$/;
            return regex.test(sName)
        }

        function _getArray(ns) {  // 네임스페이스 문자열 배열로 얻기
            var sections = [];
            if (ns === '') return sections;
            if (typeof ns === 'string') {
                if (!_validNamespace(ns)) throw new ExtendError(/EL03312/, null, [ns]);
                sections = ns.split('.');
            } else if (Array.isArray(ns)) {
                sections = ns;
            } else throw new ExtendError(/EL03313/, null, [typeof ns]);

            for (var i = 0; i < sections.length; i++) {
                var sName =sections[i];
                if (!_isString(sName)) throw new ExtendError(/EL03314/, null, [i, typeof sName]);
                if (!_validName(sName)) throw new ExtendError(/EL03315/, null, [i, sName]);
            }
            return sections;
        }
        
        /**
         * 네임스페이스 저장소 초기화 객체를 생성합니다.
         * @returns {object} {_type: 'ns'}
         * @private
         */
        NamespaceManager.prototype.$createNsRefer = function() {
            return { _type: 'ns' };
        };

        /**
         * 네임스페이스 경로객체를 얻습니다.
         * @param {string | object} p_elem 얻을 요소
         * @returns {object} {ns: '..', key: '..'}
         * @protected
         */
        NamespaceManager.prototype._getPathObject = function(p_elem) {
            var fullName;
            var arr;
            var key;
            var nsPath;
            var obj = {};

            if (_isString(p_elem)) fullName = p_elem;
            else fullName = this.getPath(p_elem);
            
            if (typeof fullName !== 'string') return;

            arr = fullName.split('.');
            key = arr.pop();
            nsPath = arr.join('.');
            obj['ns'] = nsPath;
            obj['key'] = key;
            return obj;
        };
        
        /**
         * 네임스페이스를 초기화 합니다.
         */
        NamespaceManager.prototype.init = function() {
            this.$storage = this.$createNsRefer();
        };

        /**
         * 네임스페이스에 경로를 추가합니다.
         * @param {string | array<string>} p_ns 네임스페이스 이름
         */
        NamespaceManager.prototype.addNamespace = function(p_ns) {
            var parent = this._storage;
            var sections;
        
            try {
                sections = _getArray(p_ns);

                if (this._$KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1); // 최상위 에약어 제거
            
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (typeof parent[sections[i]] === 'undefined') {
                        parent[sections[i]] = this.$createNsRefer();
                    }
                    parent = parent[sections[i]];
                }

            } catch (error) {
                throw new ExtendError(/EL03321/, error, []);
            }
        };

        /**
         * 네임스페이스에 경로를 삭제합니다.
         * @param {string | array<string>} p_ns 네임스페이스 이름
         */
        NamespaceManager.prototype.delNamespace = function(p_ns) {
            var parent = this._storage;
            var sections;
        
            try {
                sections = _getArray(p_ns);

                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName] && parent[sName]['_type'] === 'ns') {
                        if (i === sections.length - 1) delete parent[sName];
                        else parent = parent[sName];
                    } else return;
                }
            } catch (error) {
                throw new ExtendError(/EL03322/, error, []);
            }
        };

        /**
         * 네임스페이스에 경로 객체를 얻습니다.
         * @param {string | array<sting>} p_ns 네임스페이스 이름
         * @returns {object} 경로에 대한 객체
         */
        NamespaceManager.prototype.path = function(p_ns) {
            var parent = this._storage;
            var sections;

            if (!p_ns) return parent;
            
            try {
                sections = _getArray(p_ns);

                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName] && parent[sName]['_type'] === 'ns') {
                        if (i === sections.length - 1) return parent[sName];    
                        parent = parent[sName];
                    } else return;
                }
                
            } catch (error) {
                throw new ExtendError(/EL03323/, error, []);
            }
        };

        /**
         * 네임스페이스의 경로에 요소를 추가합니다.
         * @param {string} p_fullName 네임스페이스 전체 경로명
         * @param {any} p_elem 요소
         */
        NamespaceManager.prototype.add = function(p_fullName, p_elem) {
            var parent = this._storage;
            var sections;
            var oPath;
            var key;
            var ns;

            try {
                oPath = this._getPathObject(p_fullName);
                key = oPath['key'];
                ns = oPath['ns'];
                sections = _getArray(ns);
    
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);  // []로 감싸서 choice 타입으로 변환됨
                if (!_validName(key)) throw new ExtendError(/EL03331/, null, [key]);
                if (!this.isOverlap && this.getPath(p_elem)) {
                    throw new ExtendError(/EL03332/, null, []);
                }
                
                if (sections.length === 0) {    // 최상위 등록
                    parent[key] = p_elem;
                    return;
                } else this.addNamespace(ns);
    
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (i === sections.length - 1) { 
                        parent[sName][key] = p_elem;
                    } else parent = parent[sName];
                }
                
            } catch (error) {
                throw new ExtendError(/EL03333/, error, []);
            }
        };

        /**
         * 네임스페이스의 경로에 요소를 삭제합니다.
         * @param {string} p_fullname 네임스페이스 전체 경로명
         * @returns {boolean}
         */
        NamespaceManager.prototype.del = function(p_fullName) {
            var parent = this._storage;
            var sections;

            try {
                sections = _getArray(p_fullName);
    
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName]) {
                        if (i === sections.length - 1) {
                            delete parent[sName];
                            return true;
                        } else parent = parent[sName];
                    } else return false;
                }
                
            } catch (error) {
                throw new ExtendError(/EL03334/, error, []);
            }

        };

        /**
         * 네임스페이스에 요소가 있는지 확인합니다.
         * @param {string | any} p_elem 경로 | 객체
         * @returns {boolean}
         */
        NamespaceManager.prototype.has = function(p_elem) {
            if (_isString(p_elem) && this.find(p_elem)) return true;
            else if (typeof this.getPath(p_elem) === 'string') return true;
            return false;
        };

        /**
         * 네임스페이스의 경로에 요소를 찾아서 돌려줍니다.
         * @param {string | array<string>} p_fullName 네임스페이스 전체 경로명
         * @returns {(object | function)?}
         */
        NamespaceManager.prototype.find = function(p_fullName) {
            var parent = this._storage;
            var sections;

            try {
                sections = _getArray(p_fullName);   // try undefined
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName]) {
                        if (i === sections.length - 1) return parent[sName];
                        else parent = parent[sName];
                    } else return;
                }
                
            } catch (error) {
                return;                
            }
        };
        
        /**
         * 네임스페이스에 요소로 경로를 얻습니다.  
         * (중복시 첫번째 요소 return)
         * @param {any} p_elem 얻을 객체
         * @returns {string?}
         */
        NamespaceManager.prototype.getPath = function(p_elem) {
            var namespace = this._storage;
            var stack = [];

            if (!p_elem) throw new ExtendError(/EL03341/, null, [typeof p_elem]);

            if ($findElement(namespace)) {
                return stack.join('.');
            } else return;

            // inner function
            function $findElement(target) { 
                for(var prop in target) {
                    var obj = target[prop];
                    if (obj === 'ns') continue;
                    if (obj && obj['_type'] === 'ns') {
                        stack.push(prop);
                        if($findElement(obj)) return true;
                    } else {
                        if (obj === p_elem) {
                            stack.push(prop);
                            return true;
                        }
                    }
                }
                stack.pop();
                return false;
            }
        };

        /**
         * 네임스페이스 저장소를 문자열로 내보냅니다.  
         * 함수를 JSON 으로 출력하기 위해서 별도의 stringify 지정해야합니다.!
         * @param {function?} p_stringify JSON stringify
         * @param {string?} p_space 공백
         * @returns {string} 직렬화한 문자열
         */
        NamespaceManager.prototype.output = function(p_stringify, p_space) {
            var arr = [];
            var obj;
            var str;
            var temp = {list: arr};

            try {
                for (var i = 0; i < this._list.length; i++) {
                    var fullName    = this._list[i];
                    var fun         = this.find(fullName);
                    var nObj        = this._getPathObject(fullName);
                    obj = { 
                        ns: nObj.ns, 
                        key: nObj.key, 
                        full: fullName, 
                        elem: fun
                    };
                    arr.push(obj);
                }
    
                if (typeof p_stringify === 'function') str = p_stringify(temp, {space: p_space} );
                else str = JSON.stringify(temp, null, p_space);
                return str;
                
            } catch (error) {
                throw new ExtendError(/EL03342/, error, [error]);
            }
            
        };

        /**
         * 문자열을 파싱해서 네임스페이스 저장소로 가져옵니다.  
         * @param {string} p_str 직렬화한 문자열
         * @param {function?} p_parse JSON 파서
         */
        NamespaceManager.prototype.load = function(p_str, p_parse) {
            var arr = [];
            
            if (!_isString(p_str)) throw new ExtendError(/EL03343/, null, [typeof p_str]);
            
            try {
                if (typeof p_parse === 'function') arr = p_parse(p_str);
                else arr = JSON.parse(p_str, null);
                
                this.init();
                for (var i = 0; i < arr['list'].length; i++) {
                    var o = arr['list'][i];
                    var fun = o['elem'];
                    this.add(o['full'], fun);
                }

            } catch (error) {
                throw new ExtendError(/EL03344/, error, [error.message]);
            }
        };

        return NamespaceManager;
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.NamespaceManager = NamespaceManager;
    } else {
        _global._L.NamespaceManager = NamespaceManager;
        _global._L.Meta.NamespaceManager = NamespaceManager;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** meta-registry.js | _L.Meta.MetaRegistry ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
    // _global._L.MetaRegistry         = _global._L.MetaRegistry || {}; // 대상의 로딩중

    //==============================================================
    // 2. import module
    var $Message                    = _global._L.Message;
    var $ExtendError                = _global._L.ExtendError;
    var $Util                       = _global._L.Util;
    var $NamespaceManager           = _global._L.NamespaceManager;

    // var $MetaObject                 = _global._L.MetaObject;

    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Util                       = require('./util');
        var _NamespaceManager           = require('./namespace-manager').NamespaceManager;
        // if (!$MetaObject) var _MetaObject                 = require('./meta-object').MetaObject;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Util                    = _Util                 || $Util;
    var NamespaceManager        = _NamespaceManager     || $NamespaceManager;

    // var MetaObject              = _MetaObject           || $MetaObject;

    //==============================================================Á
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof NamespaceManager === 'undefined') throw new Error(Message.get('ES011', ['NamespaceManager', 'namespace-manager']));

    // if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 4. module implementation       
    var MetaRegistry = (function () {
        /**
         * 메타 객체 등록소입니다. (static)
         * @constructs _L.Meta.MetaRegistry
         * @static
         */
        function MetaRegistry() { 
        }

        MetaRegistry._NS = 'Meta';    // namespace

        // var define
        var _list = [];
        var namespace = new NamespaceManager();
    
        /**
         * 메타 객체 목록 (참조값)
         * @member {any[]} _L.Meta.MetaRegistry#_list
         * @readonly
         */
        Object.defineProperty(MetaRegistry, "_list", 
        {
            get: function() { 
                var arr = [];
                for (var i = 0; i < _list.length; i++) arr.push(_list[i]);
                return arr;
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * 메타 객체 전체 갯수
         * @member {number} _L.Meta.MetaRegistry#count
         * @readonly
         */
        Object.defineProperty(MetaRegistry, "count", 
        {
            get: function() { return _list.length; },
            configurable: false,
            enumerable: true,
        });        

        /**
         * 메타 객체의 네임스페이스
         * @member {NamespaceManager} _L.Meta.MetaRegistry#ns
         * @readonly
         */
        Object.defineProperty(MetaRegistry, "ns", 
        {
            get: function() { return namespace; },
            configurable: false,
            enumerable: true,
        });

        // local function
        function _isBuiltFunction(obj) {    // 내장함수 여부
            if (typeof obj === 'function' && (false 
                || obj === Number || obj === String 
                || obj === Boolean || obj === Function
                || obj === Object || obj === Array
                || obj === RegExp || obj === Date 
                || obj === Symbol || obj === BigInt
            )) return true;
            return false;
        }

        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }
        
        function _getGuidList(oGuid, arr) {  //객체 배열 리턴
            arr = arr || [];
            if (MetaRegistry.isGuidObject(oGuid)) arr.push(oGuid);
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (_isObject(oGuid[i])) _getGuidList(oGuid[i], arr);
                }
            } else if (_isObject(oGuid)) {
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop])) _getGuidList(oGuid[prop], arr);
                }
            }
            return arr;
        };

        /**
         * 등록된 메타 객체 및 네임스페이스를 초기화 합니다.
         */
        MetaRegistry.init = function() {
            _list.length = 0;
            this.ns.init();
        };

        /**
         * 메타 객체를 등록하고, 생성자를 네임스페이스에 등록합니다.  
         * - 기존에 객체가 등록되어 있으면 예외가 발생합니다.  
         * - 네임스페이스에 생성자가 없을 경우 등록합니다.
         * @param {MetaObject} p_meta 메타 객체
         */
        MetaRegistry.register = function(p_meta) {
            var _ns;
            var key;
            var type;
            var fullName;

            if (!this.isMetaObject(p_meta)) throw new ExtendError(/EL03211/, null, [p_meta._type, p_meta._guid]);
            if (this.has(p_meta)) throw new ExtendError(/EL03212/, null, [p_meta._guid]);

            _ns         = p_meta['_ns'] || '';
            type        = p_meta['_type'];
            key         = type.name;
            fullName    = p_meta['_ns'] && p_meta['_ns'].length > 0 ?  _ns +'.'+key : key;

            _list.push(p_meta);  // 객체 등록
            this.registerClass(type, _ns, key); // 클래스 등록
        };

        /**
         * 등록소에서 메타 객체를 해제합니다. 
         * @param {MetaObject | string} p_meta 메타 객체 또는 guid
         * @returns {boolean} 성공 여부
         */
        MetaRegistry.release = function(p_meta) {
            var guid;

            if (typeof p_meta !== 'object' && typeof p_meta !== 'string') {
                throw new ExtendError(/EL03213/, null, [typeof p_meta]);
            }

            guid = typeof p_meta === 'string' ? p_meta : p_meta['_guid'];
            if (!_isString(guid)) return false;

            for(var i = 0; i < _list.length; i++) {
                if (_list[i]['_guid'] === guid) {
                    _list.splice(i, 1);
                    return true;
                }
            }
            return false;
        };

        /**
         * 등록소에 메타 객체 여부를 확인합니다.
         * @param {object | string} p_oGuid  guid 타입의 객체 또는 guid
         * @returns {boolean} 존재 여부
         */
        MetaRegistry.has = function(p_oGuid) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;

            if (!_isString(guid)) return false;

            for(var i = 0; i < _list.length; i++) {
                if (_list[i]['_guid'] === guid) return true;
            }
            return false;
        };
        
        /**
         * 등록소에서 메타 객체를 찾습니다.
         * @param {object | string} p_oGuid guid 타입의 객체 또는 guid
         * @returns {MetaObject?}
         */
        MetaRegistry.find = function(p_oGuid) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
            
            if (!_isString(guid)) return;
            
            for(var i = 0; i < _list.length; i++) {
                if (_list[i]['_guid'] === guid) return _list[i];
            }
        };

        /**
         * 매타 객체 여부를 확인합니다.  
         * @param {object} p_target 대상 객체
         * @returns {boolean}
         */
        MetaRegistry.isMetaObject = function(p_target) {
            if (!_isObject(p_target)) return false;
            if (_isString(p_target['_guid']) && typeof p_target['_type'] === 'function') return true;
            return false;
        };
        
        /**
         * guid 객체에 대한 메타 객체를 생성합니다.
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체
         * @returns {MetaObject}
         */
        MetaRegistry.createMetaObject = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var args = [null];
            var type;
            var ns;
            var fullName;
            var coClass;
            var params;
            
            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03221/, null, [typeof p_oGuid]);
            if (!_isString(p_oGuid['_type'])) throw new ExtendError(/EL03222/, null, [typeof p_oGuid['_type']]);
            if (!_isObject(origin)) throw new ExtendError(/EL03223/, null, [typeof origin]);
            
            type        = p_oGuid['_type'];
            ns          = p_oGuid['_ns'] || '';
            fullName    =  ns !== '' ? [ns, type].join('.') : type;
            coClass     = this.getClass(fullName);
            
            if (typeof coClass !== 'function') throw new ExtendError(/EL03224/, null, [fullName, typeof coClass]);
            
            // params = coClass.hasOwnProperty('_PARAMS') ? coClass['_PARAMS'] : []; // arr
            params = Object.prototype.hasOwnProperty.call(coClass, '_PARAMS') ? coClass['_PARAMS'] : []; // arr
            for (var i = 0; i < params.length; i++) {
                var argName = params[i];
                var prop = p_oGuid[argName];
                var obj;
                obj = _isObject(prop) && prop['$ref'] ? this.findSetObject(prop['$ref'], origin) : prop;
                if (p_oGuid[argName]) args.push(obj);
            }
            return new (Function.prototype.bind.apply(coClass, args));
        };
        
        /**
         * guid 객체에 대한 guid 참조를 생성합니다.  
         * @param {MetaObject} p_meta 메타 객체
         * @returns {object} { $ref: 'guid값' }
         * @example
         * var meta = new MetaElement('m1');
         * obj.onwer = MetaRegistry.createReferObject(meta);
         * console.log(obj.onwer);          // { $ref : '5337877c-49d6-9add-f35a-7bd31d510d4f' }
         */
        MetaRegistry.createReferObject = function(p_meta) {
            if (!_isObject(p_meta)) throw new ExtendError(/EL03225/, null, [typeof p_meta]);
            if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03226/, null, [typeof p_meta['_guid']]);
            return { $ref: p_meta['_guid'] };
        };

        /**
         * target을 네임스페이스에 등록하고, 참조를 생성합니다.
         * 
         * @param {function} p_target 함수 또는 생성자
         * @returns {object} { $ns: string }
         * @example
         * var meta = new MetaElement('m1');
         * obj.onwer = MetaRegistry.createReferObject(meta);
         * console.log(obj);                // {onwer: {$ns: 'Meta.MetaElement'}}
         */
        MetaRegistry.createNsReferObject = function(p_target) {
            var fullName;
            var ns, key;

            if (typeof p_target !== 'function') throw new ExtendError(/EL03227/, null, [typeof p_target]);
            
            if (!this.findClass(p_target)) {
                ns  = p_target['_NS'] || '';
                key = p_target.name;
                this.registerClass(p_target, ns, key);
            }
            fullName = this.findClass(p_target);
            return { $ns: fullName };
        };

        /**
         * guid 객체에 메타 객체의 guid 를 설정합니다.  
         * - oGuid.$set = meta._guid
         * @param {object} p_oGuid guid 타입의 객체
         * @param {MetaObject} p_meta 
         * @returns {object} oGuid.$set에 설정한 guid값
         * @example
         * var meta = new MetaElement('m1');    // meta.guid = '5337877c-49d6-9add-f35a-7bd31d510d4f'
         * var obj = { name: 'm2' };
         * MetaRegistry.setMetaObject(obj, meta);
         * console.log(obj);                    // {name: 'm2, $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
         */
        MetaRegistry.setMetaObject = function(p_oGuid, p_meta) {
            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03241/, null, [typeof p_oGuid]);
            if (!_isObject(p_meta)) throw new ExtendError(/EL03242/, null, [typeof p_meta]);
            if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03243/, null,[typeof p_meta['_guid']]);
            
            p_oGuid['$set'] = p_meta['_guid'];
            return p_oGuid;
        };
         
        /**
         * guid 객체의 유효성 검사를 합니다.  
         * 1. 객체의 guid 값의 중복 여부 확인합니다.  
         * 2. 객체의 '$ref'을 값으로 가지는 guid 객체의 존재 여부를 확인합니다.  
         * 3. 객체의 '$ns'을 값으로 하는 네임스페이스의 존재 여부를 확인합니다.  
         * 4. 객체의 '_key'와 '_elem' 의 갯수가 같은지 검사합니다.  
         * @param {object} p_oGuid 검사할 guid 객체
         * @returns {boolean} 성공 여부
         */
        MetaRegistry.validObject = function(p_oGuid) {
            var _this = this;
            var arrObj;

            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03251/, null, [typeof p_oGuid]);
            
            arrObj = _getGuidList(p_oGuid);
            if (!$validUniqueGuid() || !$validReference(p_oGuid) || !$validCollection(p_oGuid)) return false;
            return true;

            // inner function
            function $findGuid(guid, arr) { // guid 조회
                for(var i = 0; i < arr.length; i++) {
                    if (arr[i]['_guid'] === guid) return arr[i];
                }
            }
            function $validReference(oGuid) { // 참조 검사
                if (oGuid['$ref'] && !$findGuid(oGuid['$ref'], arrObj)) return false;
                if (oGuid['$set'] && !$findGuid(oGuid['$set'], arrObj)) return false;
                if (oGuid['$ns'] && !_this.getClass(oGuid['$ns'])) return false;
        
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (_isObject(oGuid[i]) && !$validReference(oGuid[i])) return false
                    }
                } else {
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop]) && !$validReference(oGuid[prop])) return false;
                    }
                }
                return true;
            }
            function $validCollection(oGuid) { // 컬렉션 검사
                if (Array.isArray(oGuid['_elem']) && Array.isArray(oGuid['_key'])) {
                    if (oGuid['_elem'].length !== oGuid['_key'].length) return false;
                }
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (_isObject(oGuid[i]) && !$validCollection(oGuid[i])) return false;
                    }
                } else {
                    for(var prop in p_oGuid) {
                        if (_isObject(oGuid[prop]) && !$validCollection(oGuid[prop])) return false;
                    }
                }
                return true;
            }
            function $validUniqueGuid() {    // guid 유일한 값인지 검사
                for (var i = 0; i < arrObj.length; i++) {
                    for (var ii = 0; ii < arrObj.length; ii++) {
                        if (arrObj[i]['_guid'] === arrObj[ii]['_guid'] && i !== ii) return false; // 중복
                    }
                }
                return true;
            }
        };

        /**
         * guid 객체 여부를 확인합니다.
         * @param {object} p_target 확인 대상
         * @returns {boolean} 
         */
        MetaRegistry.isGuidObject = function(p_target) {
            if (!_isObject(p_target)) return false;
            if (_isString(p_target['_guid']) && _isString(p_target['_type'])) return true;
            return false;
        };

        /**
         * origin 객체에 guid 객체의 포함 여부를 확인합니다.
         * @param {string| object} p_oGuid 확인 대상
         * @param {object | array<object>} p_origin  원본 객체
         * @returns {boolean}
         */
        MetaRegistry.hasGuidObject = function(p_oGuid, p_origin) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
            var arrOrigin = [];

            if (!_isString(guid)) throw new ExtendError(/EL03252/, null, [typeof guid]);

            if (Array.isArray(p_origin)) arrOrigin = p_origin;
            else arrOrigin.push(p_origin);

            for (var i = 0; i < arrOrigin.length; i++) {
                var origin = arrOrigin[i];
                var arrObj = _getGuidList(origin);
                if (!_isObject(origin)) throw new ExtendError(/EL03253/, null, [i, typeof guid]);
                for (var ii = 0; ii < arrObj.length; ii++) {
                    if (arrObj[ii]._guid === guid) return true;
                }
            }
            return false;
        };

        /**
         * guid 객체에 참조타입 요소가 포함되어 있는지 확인힙니다.  
         * - 참조타입 : $ref: '', $ns:''
         * @param {object} p_oGuid 확인 대상
         * @returns {boolean}
         */
        MetaRegistry.hasRefer = function(p_oGuid) {
            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03254/, null, [typeof p_oGuid]);
            if (!this.isGuidObject(p_oGuid)) throw new ExtendError(/EL03255/, null, [p_oGuid['_type'], p_oGuid['_guid']]);

            return $hasRefer(p_oGuid);

            // inner function
            function $hasRefer(oGuid) {  // 참조 포함 여부
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object' && $hasRefer(oGuid[i])) return true;
                    }
                } else {
                    if (oGuid['$ref'] && _isString(oGuid['$ref'])) return true;
                    if (oGuid['$ns'] && _isString(oGuid['$ns'])) return true;
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop]) && $hasRefer(oGuid[prop])) return true
                    }
                }
                return false;
            }
        };     

        /**
         * origin 객체에 설정된 guid 객체를 찾습니다.  
         * 1. guid 객체 내부에서 guid 값의 요소 조회 ?  
         * 2. 조회한 요소의 $set 값을 사용하여  메타객체 저장소헤 대상 객체 조회 ?   
         * @param {string | object} p_oGuid 조회 대상 guid 값 또는  guid 객체
         * @param {object} p_origin 원본 객체
         * @returns {MetaObject}
         */
        MetaRegistry.findSetObject = function(p_oGuid, p_origin) {
            var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
            var origin = p_origin;

            if (!_isString(guid)) throw new ExtendError(/EL03256/, null, [guid]);
            if (!_isObject(origin)) throw new ExtendError(/EL03257/, null, [typeof origin]);

            return $findObject(origin);
            
            // inner finction
            function $findObject(oGuid) { // 객체 조회
                var result;
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object') {
                            result = $findObject(oGuid[i]);
                            if(result) return result;
                        }
                    }
                } else {
                    if (oGuid['_guid'] && oGuid['_guid'] === guid) {
                        result = oGuid['$set'] ? MetaRegistry.find(oGuid['$set']) : undefined;
                        return result;
                    }
                    for(var prop in oGuid) {
                        if (typeof oGuid[prop] === 'object') {
                            result = $findObject(oGuid[prop]);
                            if(result) return result;
                        } 
                    }
                }
                return result;
            }
        };

          

        /**
         * guid 객체의 참조요소값을 객체 참조로 변환합니다.  
         * 변환대상 : $ns => [object object]
         * @param {object} p_oGuid 변환할 guid 객체
         * @returns {object} 참조 변환한 oGuid 객체
         */
        MetaRegistry.transformRefer = function(p_oGuid) {
            var _this = this;
            var arrObj;
            var clone;

            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03244/, null, [typeof p_oGuid]);
            
            arrObj = _getGuidList(p_oGuid);
            clone = Util.deepCopy(p_oGuid);
            $linkReference(clone, arrObj);
            return clone;

            // inner function
            function $linkReference(oGuid, arr, parentName) {    // 참조 연결
                parentName = parentName || '';
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object') $linkReference(oGuid[i], arr);
                    }
                } else {
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop])) {
                            if (oGuid[prop]['$ns']) {
                                var ns = _this.getClass(oGuid[prop]['$ns']);
                                if (typeof ns !== 'function') throw new ExtendError(/EL03245/, null, [parentName, prop]);
                                oGuid[prop] = ns; // function 타입 연결
                            } else $linkReference(oGuid[prop], arr, parentName ? parentName +'.'+ prop : prop);
                        }
                    }
                }
            }
        };
        
        /**
         * 네임스페이스(ns)에 생성자 또는 객체를 등록합니다.  
         * - 중복 검사 후 등록  
         * - 기본제공 함수는 내부 저장하지 않음  
         * @param {function | object} p_target 대상
         * @param {string} p_ns fullname 또는 네임스페이스 
         * @param {string} p_key 대상 이름
         */
        MetaRegistry.registerClass = function(p_target, p_ns, p_key) {
            var fullName;
            
            if (!(_isObject(p_target) || typeof p_target === 'function')) throw new ExtendError(/EL03231/, null, [typeof p_target]);
            if (p_ns && typeof p_ns !== 'string') throw new ExtendError(/EL03232/, null, [typeof p_ns]);
            if (p_key && !_isString(p_key)) throw new ExtendError(/EL03233/, null, [typeof p_key]);

            if (p_key) fullName = p_ns.length > 0 ? p_ns +'.'+ p_key : p_key;
            else fullName = p_ns;
            
            if (_isBuiltFunction(p_target)) return;    // 내장함수 제외
            if (typeof _global[fullName] === 'function') return;
            
            if (!this.ns.find(fullName)) this.ns.add(fullName, p_target);  // 중복 검사 후 등록
        };
        
        /**
         * 네임스페이스(ns)에 생성자 또는 객체를 해제합니다.
         * @param {string} p_fullName 네임스페이스 전체 이름
         * @returns {boolean} 삭제 성공 여부
         */
        MetaRegistry.releaseClass = function(p_fullName) {
            if (!_isString(p_fullName)) throw new ExtendError(/EL03234/, null, [typeof p_fullName]);
            
            if (typeof _global[p_fullName] === 'function') return true; // 내장함수 & 전역 함수
            return this.ns.del(p_fullName);
        };
        
        /**
         * 네임스페이스(ns)에서 생성자 또는 객체를 찾아서 전체 경로를 돌려줍니다.
         * @param {function} p_target 생성자 또는 객체 
         * @returns {string?} 네임스페이스 전체 이름
         */
        MetaRegistry.findClass = function(p_target) {
            var fullName;

            if (typeof p_target !== 'function') throw new ExtendError(/EL03235/, null, [typeof p_target]);
            
            fullName = p_target.name;
            if (typeof _global[fullName] === 'function') return fullName;   // 내장함수 & 전역 함수
            return this.ns.getPath(p_target);
        };
        
        /**
         * 네임스페이스(ns)에서 전체이름에 대한 생성자 또는 객체를 얻습니다.
         * @param {string} p_fullName 전체경로
         * @returns {(object | function)?} 객체 또는 생성자
         */
        MetaRegistry.getClass = function(p_fullName) {
            if (!_isString(p_fullName)) throw new ExtendError(/EL03236/, null, [typeof p_fullName]);
            
            if (typeof _global[p_fullName] === 'function') return _global[p_fullName];  // 내장함수 & 전역 함수
            return this.ns.find(p_fullName);
        };

        /**
         * 직렬화한 guid 문자열을 파싱하여 MetaObject 로 불러옵니다.  
         * REVIEW: 필요성 재검토 필요  
         * @param {string} p_str guid 객체를 직렬화한 문자열
         * @param {function?} p_parse JSON 파서
         * @returns {MetaObject} 불러온 MetaObject
         */
        MetaRegistry.loadMetaObject = function(p_str, p_parse) {
            var obj = p_str;
            var oGuid;
            var meta;

            if (typeof p_str !== 'string') throw new ExtendError(/EL03246/, null, [typeof str]);

            obj = (typeof p_parse === 'function') ? p_parse(obj) : JSON.parse(obj, null);
            if (this.has(obj)) return this.find(obj['_guid']);  // 객체가 존재할 경우
            if (!this.isGuidObject(obj)) throw new ExtendError(/EL03247/, null, [obj['_type'], obj['_guid']]);

            oGuid = this.transformRefer(obj);
            meta = this.createMetaObject(oGuid);
            meta.setObject(oGuid);
            return meta;
        };
        return MetaRegistry;
    }());

    //==============================================================
    // 5. module export
    if (isNode) exports.MetaRegistry = MetaRegistry;
        
    _global._L.MetaRegistry = MetaRegistry;
    _global._L.Meta.MetaRegistry = MetaRegistry;    // namespace

}(typeof window !== 'undefined' ? window : global));
/**** meta-object.js | _L.Meta.MetaObject ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
    // _global._L.MetaObject           = _global._L.MetaObject || {}; // 대상의 로딩중

    //==============================================================
    // 2. import module
    var $Message                    = _global._L.Message;
    var $ExtendError                = _global._L.ExtendError;
    var $Type                       = _global._L.Type;
    var $Util                       = _global._L.Util
    var $IObject                    = _global._L.IObject;
    var $IMarshal                   = _global._L.IMarshal;
    var $MetaRegistry               = _global._L.MetaRegistry;

    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Type                       = require('./type');
        var _Util                       = require('./util');
        var _IObject                    = require('./i-object').IObject;
        var _IMarshal                   = require('./i-marshal').IMarshal;
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;
    }

    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Type                    = _Type                 || $Type;
    var Util                    = _Util                 || $Util;
    var IObject                 = _IObject              || $IObject;
    var IMarshal                = _IMarshal             || $IMarshal;
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IObject === 'undefined') throw new Error(Message.get('ES011', ['IObject', 'i-object']));
    if (typeof IMarshal === 'undefined') throw new Error(Message.get('ES011', ['IMarshal', 'i-marshal']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));

    //==============================================================
    // 4. module implementation   
    var MetaObject  = (function () {
        /**
         * 메타 최상위 객체를 생성합니다.
         * @constructs _L.Meta.MetaObject
         * @implements {_L.Interface.IObject}
         * @implements {_L.Interface.IMarshal}
         */
        function MetaObject() {

            var _guid;
            
            /**
             * 내부 변수 접근
             * @member {string} _L.Meta.MetaObject#$guid
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$guid',
            {
                get: function() { return _guid; },
                set: function(nVal) { _guid = nVal; },
                configurable: false,
                enumerable: false,
            });

            /**
             * 현재 객체의 고유식별자(guid)
             * @readonly
             * @member {string} _L.Meta.MetaObject#_guid 
             * @example
             * var obj = MetaObject();
             * console.log(obj._guid);      // '5337877c-49d6-9add-f35a-7bd31d510d4f' unique key code
             */
            Object.defineProperty(this, '_guid', 
            {
                get: function() { 
                    if (!_guid) _guid = Util.createGuid();
                    return _guid;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 현재 객체의 생성자
             * @readonly
             * @member {function} _L.Meta.MetaObject#_type 
             * @example
             * var obj = new MetaObject();
             * obj._type === MetaObject;        // true
             * console.log(typeof obj._type);   // 'function'
             */
            Object.defineProperty(this, '_type', 
            {
                get: function() { 
                    var proto = this.__proto__ || Object.getPrototypeOf(this);
                    return proto.constructor;
                },
                configurable: false,
                enumerable: true
            });
            
            // inner variable access
            // this.__SET$guid = function(val, call) {
            //     if (call instanceof MetaObject) _guid = val;    // 상속접근 허용
            // }

            // 추상클래스 검사
            if (Object.prototype.hasOwnProperty.call(this._type, '_KIND')) {
            // if (this._type.hasOwnProperty('_KIND')) {
                var kind = this._type['_KIND'].toLowerCase();
                if (['abstract', 'interface', 'enum', 'function'].indexOf(kind) > -1) {
                    throw new ExtendError(/EL03111/, null, [this._type.name, kind]);
                }
            }

            // _NS 선언이 없으면 부모의 것을 기본으로 사용!
            if (this._type && this._type._NS) this._ns = this._type._NS;
            MetaRegistry.register(this);

            Util.implements(MetaObject, this);
        }
        MetaObject._UNION = [IObject, IMarshal];
        MetaObject._NS = 'Meta';
        MetaObject._PARAMS = [];

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        function _compare(p_obj1, p_obj2) { // 객체 비교
            if (p_obj1 === p_obj2) return true;
            else if (p_obj1 instanceof MetaObject && p_obj2 instanceof MetaObject) {
                var obj1 = p_obj1.getObject(2);    // _guid, $ref 제외 객체
                var obj2 = p_obj2.getObject(2);
                return Type.deepEqual(obj1, obj2);
            } else if (_isObject(p_obj1) && _isObject(p_obj2)) {
                return Type.deepEqual(p_obj1, p_obj2);
            } else return false;
        }

        /**
         * 현재 객체와 target 객체를 비교합니다.  
         * (참조 주소의 비교(===)가 아니고, 속성과 값을 비교,  _guid 값은 비교 제외)  
         * @param {object} p_target 대상 객체
         * @returns {boolean}
         * @example
         * var meta1 = new MetaObject();
         * var meta2 = new MetaObject();
         * meta1.equal(meta2);      // true
         * meta2.equal(meat1);      // true
         * meta1 === meta2;         // false
         * 
         * var obj1 = {a: 1};
         * var obj2 = {a: 1};
         * this.equal(obj1, obj2);  // true
         */
        MetaObject.prototype.equal = function(p_target) {
            return _compare(this, p_target);
        };

        /**
         * 현재 객체의 생성자와 상위(proto) 생성자를 목록으로 가져옵니다.  
         * @returns {array<function>}
         * @example
         * var obj = new MetaObject();
         * var arr = obj.getTypes();
         * arr[0] === MetaObject;   // true
         * arr[1] === Object;       // true
         * console.log(arr.length); // 2
         * 
         * var elem = new MetaElement('e1');   // Inherited MetaObject 
         * var arr = elem.getTypes();
         * arr[0] === MetaElement;  // true
         * arr[1] === MetaObject;   // true
         * arr[2] === Object;       // true
         * console.log(arr.length); // 3
         */
        MetaObject.prototype.getTypes = function() {
            return parentFunction(this);

            // inner function
            function parentFunction(obj) {
                var list = [];
                var proto = obj.__proto__ || Object.getPrototypeOf(obj);
                if (proto) {
                    list.push(proto.constructor);
                    list = list.concat(parentFunction(proto));
                }
                return list;
            }
        };

        /**
         * 현재 객체의 target 인스턴스 여부를 검사합니다 .(_UNION 포함)
         * @param {function | string} p_target 함수명 또는 생성자
         * @returns {boolean}
         * @example
         * var obj = new MetaObject();
         * obj.instanceOf('MetaObject');    // true
         * obj.instanceOf('Object');        // true
         * obj.instanceOf(MetaObject);      // true
         * obj.instanceOf(Object);          // true
         * obj.instanceOf(String);          // false
         * 
         * var elem = new MetaElement('e1');// Inherited MetaObject 
         * obj.instanceOf('MetaElement');   // true
         * obj.instanceOf('MetaObject');    // true
         * obj.instanceOf('Object');        // true
         * obj.instanceOf(MetaElement);     // true
         * obj.instanceOf(MetaObject);      // true
         * obj.instanceOf(Object);          // true
         * obj.instanceOf(String);          // false
         */
        MetaObject.prototype.instanceOf = function(p_target) {
            var _this = this;
            var unionTypes = this._interface;
            // var unionTypes = this._type['_UNION'] || [];
            // var unionTypes = this._interface || [];
            // var thisTypes = this.getTypes();

            if (typeof p_target === 'string') return $$findFunctionName(p_target);
            if (typeof p_target === 'function') return $findFunction(p_target);
            return false;

            // inner function
            function $findFunction(fun) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (fun === types[i]) return true;
                }
                
                for (var i = 0; i < unionTypes.length; i++) {
                    if (fun ===  unionTypes[i]) return true;
                }
                return false;
            }
            function $$findFunctionName(funName) {
                var types = _this.getTypes();
                for (var i = 0; i < types.length; i++) {
                    if (funName === types[i].name) return true;
                }
                for (var i = 0; i < unionTypes.length; i++) {
                    if (funName === unionTypes[i].name) return true;
                }
                return false;
            }
        };

        /**
         * 현재 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        MetaObject.prototype.getObject = function(p_vOpt, p_owned) {
            var vOpt = p_vOpt || 0;
            var obj = {};
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (vOpt < 2 && vOpt > -1) obj['_guid'] = this._guid;
            obj['_type'] = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        MetaObject.prototype.setObject  = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var fullName = this._type._NS ? this._type._NS +'.'+ this._type.name : this._type.name;

            if (!_isObject(p_oGuid)) throw new ExtendError(/EL03112/, null, [typeof p_oGuid]);
            if (p_oGuid['_type'] !== fullName) throw new ExtendError(/EL03113/, null, [p_oGuid['_type'], fullName]);
            
            if (MetaRegistry.isGuidObject(origin)) {
                if (!origin['__TRANSFORM_REFER']) {
                    origin = MetaRegistry.transformRefer(origin);
                    origin['__TRANSFORM_REFER'] = true;
                }
            } else throw new ExtendError(/EL03114/, null, [p_origin._type, p_origin._guid]);
            
            MetaRegistry.setMetaObject(p_oGuid, this); // $set attach
        };

        return MetaObject;

    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaObject = MetaObject;
    } else {
        _global._L.MetaObject = MetaObject;
        _global._L.Meta.MetaObject = MetaObject;    // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));
/**** meta-element.js | _L.Meta.MetaElement ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
   
    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Util                       = require('./util');
        var _MetaObject                 = require('./meta-object').MetaObject;
        var _IElement                   = require('./i-element').IElement;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Util                       = _global._L.Util;
        var $MetaObject                 = _global._L.MetaObject;
        var $IElement                   = _global._L.IElement;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Util                    = _Util                 || $Util;
    var IElement                = _IElement             || $IElement;
    var MetaObject              = _MetaObject           || $MetaObject;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IElement === 'undefined') throw new Error(Message.get('ES011', ['IElement', 'i-element']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 4. module implementation   
    
    // private variable
    
    var MetaElement  = (function (_super) {

        /**
         * 메타 요소 객체를 생성합니다.  
         * (독립체 사용 단위)
         * @constructs _L.Meta.MetaElement
         * @extends _L.Meta.MetaObject
         * @implements {_L.Interface.IElement}
         * @param {string} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            var _name;

            /**
             * 내부 변수 접근
             * @member {string} _L.Meta.MetaElement#$name
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$name',
            {
                get: function() { return _name; },
                set: function(nVal) { 
                    if (typeof nVal !== 'string') throw new ExtendError(/EL03121/, null, [typeof val]);
                    if (nVal.length === 0) throw new ExtendError(/EL03122/, null, []);
                    _name = nVal;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 현재 객체의 이름
             * @readonly
             * @member {string} _L.Meta.MetaElement#_name
             */
            Object.defineProperty(this, '_name',
            {
                get: function() { return _name; },
                configurable: false,
                enumerable: true
            });

            this.$name = p_name;

            Util.implements(MetaElement, this);
        }
        Util.inherits(MetaElement, _super);
        
        MetaElement._UNION = [IElement];
        MetaElement._NS = 'Meta';           // namespace
        MetaElement._PARAMS = ['name'];     // creator parameter
        
        /**
         * 현재 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        MetaElement.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            obj['name'] = this._name;
            return obj;
        };

        /**
         * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        MetaElement.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;
            this.$name = p_oGuid['name'];
            // this.__SET$_name(p_oGuid['name'], this);
        };
        
        /**
         * 현제 객체를 복제합니다.
         * @returns {MetaElement}
         */
        MetaElement.prototype.clone  = function() {
            var clone = new MetaElement(this._name);
            return clone;
        };

        return MetaElement;

    }(MetaObject));


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaElement = MetaElement;
    } else {
        _global._L.MetaElement = MetaElement;
        _global._L.Meta.MetaElement = MetaElement;  // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** base-collection.js | _L.Collection.BaseCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    
    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Type                       = require('./type');
        var _Util                       = require('./util');
        var _Observer                   = require('./observer').Observer;
        var _ICollection                = require('./i-collection').ICollection;
        var _IList                      = require('./i-list').IList;
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;
        var _MetaObject                 = require('./meta-object').MetaObject;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Type                       = _global._L.Type;
        var $Util                       = _global._L.Util;
        var $Observer                   = _global._L.Observer;
        var $ICollection                = _global._L.ICollection;
        var $IList                      = _global._L.IList;
        var $MetaRegistry               = _global._L.MetaRegistry;
        var $MetaObject                 = _global._L.MetaObject;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Observer                = _Observer             || $Observer;
    var Type                    = _Type                 || $Type;
    var Util                    = _Util                 || $Util;
    var ICollection             = _ICollection          || $ICollection;
    var IList                   = _IList                || $IList;
    var MetaObject              = _MetaObject           || $MetaObject;
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof Observer === 'undefined') throw new Error(Message.get('ES011', ['Observer', 'observer']));
    if (typeof ICollection === 'undefined') throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));
    if (typeof IList === 'undefined') throw new Error(Message.get('ES011', ['IList', 'i-list']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 4. module implementation
    var BaseCollection  = (function (_super) {

        /**
        * 기본 컬렉션을 생성합니다.(최상위)
        * @abstract
        * @extends _L.Meta.MetaObject
        * @constructs _L.Collection.BaseCollection
        * @implements {_L.Interface.ICollection}
        * @implements {_L.Interface.IList}
        * @param {object} [p_owner] 소유객체
        */
        function BaseCollection(p_owner) { 
            _super.call(this);
            
            // private variable
            var $event = new Observer(this, this);
            var _owner = p_owner || null;
            var _elements = [];
            var _descriptors = [];
            var _elemTypes  = []; 
            var $KEYWORD = [];

            /**
             * 내부 변수 접근
             * @member {string} _L.Meta.Entity.BaseColumn#$elements
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$elements',
            {
                get: function() { return _elements; },
                set: function(nVal) { _elements = nVal; },
                configurable: false,
                enumerable: false,
            });

            /**
             * 내부 변수 접근
             * @member {string} _L.Meta.Entity.BaseColumn#$descriptors
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$descriptors',
            {
                get: function() { return _descriptors; },
                set: function(nVal) { _descriptors = nVal; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 이벤트 객체
             * @private 
             * @member {Observer} _L.Collection.BaseCollection#$event  
             */
            Object.defineProperty(this, '$event', 
            {
                get: function() { return $event; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 소유자
             * @protected 
             * @member {object} _L.Collection.BaseCollection#_owner  
             */
            Object.defineProperty(this, '_owner', 
            {   
                get: function() { return _owner; },
                set: function(val) { _owner = val; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소들
             * @readonly
             * @member {array<any>} _L.Collection.BaseCollection#_elements  
             */
            Object.defineProperty(this, '_elements', 
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _elements.length; i++) arr.push(_elements[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소의 기술들 (getter, setter)
             * @readonly
             * @member {array<any>} _L.Collection.BaseCollection#_descriptors  
             */
            Object.defineProperty(this, '_descriptors', 
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _descriptors.length; i++) arr.push(_descriptors[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소의 타입 (제약조건)
             * @protected 
             * @member {array<any>}  _L.Collection.BaseCollection#_elemTypes  
             */
            Object.defineProperty(this, '_elemTypes', 
            {
                get: function() { return _elemTypes; },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    var reg = /^_[a-zA-Z]+_/;
                    var arr1 = arrType.length > 0 && typeof arrType[0] === 'string' ? arrType[0] : '';
                    
                    // var result;
                    if (arrType.length > 0  && reg.exec(arr1) === null) arrType = ['_req_'].concat(arrType);
                        
                    // result = reg.exec(val);
                    // if (result !== null) return result[0].toUpperCase();
                    _elemTypes = arrType;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 요소의 목록
             * @readonly
             * @member {array}  _L.Collection.BaseCollection#_list  
             */
            Object.defineProperty(this, '_list', 
            {
                get: function() {
                    return this._elements;
                    // var arr = [];
                    // for (var i = 0; i < _elements.length; i++) arr.push(_elements[i]);
                    // return arr;
                },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 요소의 갯수
             * @readonly
             * @member {number} _L.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', 
            {
                get: function() { return this._elements.length; },
                enumerable: false,
                configurable: false
            });
            
            /** 
             * 컬렉션 예약어
             * @private
             * @member {array<string>}  _L.Collection.BaseCollection#$KEYWORD  
             */
            Object.defineProperty(this, '$KEYWORD', 
            {
                get: function() { return $KEYWORD; },
                set: function(newVal) { $KEYWORD = $KEYWORD.concat(newVal); },
                configurable: false,
                enumerable: false,
            });

            /**
             * 컬렉션 요소를 추가 전에 발생하는 이벤트 입니다. 
             * @event _L.Collection.BaseCollection#onAdd
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdd', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'add'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 추가 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onAdded
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onAdded', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'added'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 삭제 전에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onRemove
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemove', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'remove'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 삭제 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onRemoved
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onRemoved', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'removed'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션을 초기화 전에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onClear
             * @param {function}    p_callback
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onClear', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'clear'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션을 초기화 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onCleared
             * @param {function}    p_callback
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onCleared', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'cleared'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 변경 전에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onChanging 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onChanging', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'changing'); },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소를 변경 후에 발생하는 이벤트 입니다.
             * @event _L.Collection.BaseCollection#onChanged 
             * @param {function}    p_callback
             * @param {number}      p_callback.p_idx 삭제하는 index
             * @param {any}         p_callback.p_elem 삭제하는 value
             * @param {this}        p_callback.p_this 현재 컬렉션
             */
            Object.defineProperty(this, 'onChanged', 
            {
                set: function(fun) { this.$event.subscribe(fun, 'changed'); },
                configurable: false,
                enumerable: false,
            });

            // inner variable access
            // this.__GET$elements = function(call) {
            //     if (call instanceof BaseCollection) return _elements;
            // }
            // this.__GET$descriptors = function(call) {
            //     if (call instanceof BaseCollection) return _descriptors;
            // }
            // this.__SET$elements = function(val, call) {
            //     if (call instanceof BaseCollection) _elements = val;
            // }
            // this.__SET$descriptors = function(val, call) {
            //     if (call instanceof BaseCollection) _descriptors = val;
            // }

            // 예약어 등록
            this.$KEYWORD = ['$event', '_owner', '_elements', '_descriptors', '_elemTypes', '_list', 'count', '$KEYWORD'];
            this.$KEYWORD = ['onAdd', 'onAdded', 'onRemove', 'onRemoved', 'onClear', 'onCleared', 'onChanging', 'onChanged'];
            this.$KEYWORD = ['_onAdd', '_onAdded', '_onRemove', '_onRemoved', '_onClear', '_onCleared', '_onChanging', '_onChanged'];
            this.$KEYWORD = ['_getPropDescriptor', 'getObject', 'setObject', '_guid', '_type'];
            this.$KEYWORD = ['_remove', 'remove', 'removeAt', 'contains', 'indexOf', 'add', 'clear'];

            Util.implements(BaseCollection, this);
        }
        Util.inherits(BaseCollection, _super);
        
        BaseCollection._UNION = [ICollection, IList];
        BaseCollection._NS = 'Collection';
        BaseCollection._PARAMS = ['_owner'];
        BaseCollection._KIND = 'abstract';
        
        /**
         * onAdd 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onAdd
         */
        BaseCollection.prototype._onAdd = function(p_idx, p_elem) {
            this.$event.publish('add', p_idx, p_elem, this); 
        };

        /**
         * onAdded 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onAdded
         */
        BaseCollection.prototype._onAdded = function(p_idx, p_elem) {
            this.$event.publish('added', p_idx, p_elem, this); 
        };

        /**
         * onRemove 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onRemove
         */
        BaseCollection.prototype._onRemove = function(p_idx, p_elem) {
            this.$event.publish('remove', p_idx, p_elem, this);
        };

        /**
         * onRemoved 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onRemoved
         */
        BaseCollection.prototype._onRemoved = function(p_idx, p_elem) {
            this.$event.publish('removed', p_idx, p_elem, this);
        };

        /** 
         * onClear 이벤트를 발생합니다.
         * @listens _L.Collection.BaseCollection#onClear
         */
        BaseCollection.prototype._onClear = function() {
            this.$event.publish('clear', this); 
        };

        /** 
         * onCheared 이벤트를 발생합니다.
         * @listens _L.Collection.BaseCollection#onCleared
         */
        BaseCollection.prototype._onCleared = function() {
            this.$event.publish('cleared', this); 
        };


        /** 
         * onChanging 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onChanging
         */
        BaseCollection.prototype._onChanging = function(p_idx, p_elem) {
            this.$event.publish('changing', p_idx, p_elem, this); 
        };

        /** 
         * onChanged 이벤트를 발생합니다.
         * @param {number} p_idx 인덱스 번호
         * @param {any} p_elem 요소
         * @listens _L.Collection.BaseCollection#onChanged
         */        
        BaseCollection.prototype._onChanged = function(p_idx, p_elem) {
            this.$event.publish('changed', p_idx, p_elem, this); 
        };

        /**
         * 컬렉션에 요소를 추가 할 때 설정되는 기본 기술자입니다.
         * @protected
         * @param {number} p_idx 인덱스 번호
         */
        BaseCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this.$elements[p_idx]; },
                set: function(nVal) {
                    // var types = ['_req_'];
                    // types = [types.concat(this._elemTypes)];
                    // if (this._elemTypes.length > 0) Util.matchType(types, nVal);
                    if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], nVal);
                    this._onChanging(p_idx, nVal);  // before event
                    this.$elements[p_idx] = nVal;
                    this._onChanged(p_idx, nVal);   // after event
                },
                configurable: true,
                enumerable: true,
            };
        };

        /** 
         * 컬렉션의 요소를 삭제합니다. (내부)
         * @abstract 
         */
        BaseCollection.prototype._remove  = function() {
            throw new ExtendError(/EL04111/, null, []);
        };

        /**
         * 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        BaseCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
            var _elems = [];
            
            if (!Type.deepEqual(this.$event['$subscribers'], this.$event._getInitObject())) {
                obj['$subscribers'] = this.$event.$subscribers;
            }
            if (vOpt < 2 && vOpt > -1 && this._owner) {
                obj['_owner'] = MetaRegistry.createReferObject(this._owner);
            }
            
            for (var i = 0; i < this._elemTypes.length; i++) {
                var elem = this._elemTypes[i];
                if (typeof elem === 'function') _elems.push(MetaRegistry.createNsReferObject(elem));
                else _elems.push(elem);
            }
            obj['_elemTypes'] = _elems;
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 컬렉션 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        BaseCollection.prototype.setObject = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            
            var owner;
            var origin = p_origin ? p_origin : p_oGuid;
            
            this.clear();
            if (p_oGuid['$subscribers']) {
                this.$event.$subscribers = p_oGuid['$subscribers'];
            }
            if (p_oGuid['_owner']) {
                owner = MetaRegistry.findSetObject(p_oGuid['_owner']['$ref'], origin);
                if (!owner) throw new ExtendError(/EL04112/, null, [p_oGuid['_owner']['$ref']]);    // Branch:
                this._owner = owner;            
            }
            if (Array.isArray(p_oGuid['_elemTypes']) && p_oGuid['_elemTypes'].length > 0){
                this._elemTypes = p_oGuid['_elemTypes'];
            }
        };

        /**
         * 컬렉션에 요소를 삭제합니다.
         * @param {any} p_elem 요소
         * @returns {number} 삭제한 인덱스 번호
         */
        BaseCollection.prototype.remove = function(p_elem) {
            var idx = this._elements.indexOf(p_elem);
            if (idx >= 0 && this.removeAt(idx)) return idx;
            return -1;
        };
        
        /**
         * 컬렉션의 지정위치에 요소를 삭제합니다. 
         * @param {number} p_pos 인덱스 번호
         * @returns {boolean} 처리 결과  
         */
        BaseCollection.prototype.removeAt = function(p_pos) {
            var elem;
            
            if (typeof p_pos !== 'number') throw new ExtendError(/EL04113/, null, [typeof p_pos]);
            elem = this._elements[p_pos];
            if (elem) {
                this._onRemove(p_pos, elem);
                if (!this._remove(p_pos)) return false;
                this._onRemoved(p_pos, elem);
                return true;
            }
            return false;
        };

        /**
         * 요소가 컬렉션에 존재하는지 확인합니다.
         * @param {any} p_elem 요소
         * @returns {boolean}
         */
        BaseCollection.prototype.contains = function(p_elem) {
            return this._elements.indexOf(p_elem) > -1;
        };

        /**
         * 컬렉션에 요소를 조회합니다.
         * @param {any} p_elem 요소
         * @returns {number} 0 보다 작으면 존재하지 않음
         */
        BaseCollection.prototype.indexOf = function(p_elem) {
            return this._elements.indexOf(p_elem);
        };

        /** 
         * 컬렉션에 요소를 추가합니다.
         * @abstract 
         */
        BaseCollection.prototype.add  = function() {
            throw new ExtendError(/EL04114/, null, ['add(any): number']);
        };
        
        /**
         * 컬렉션을 초기화 합니다.
         * @abstract 
         * @fires _L.Collection.BaseCollection#onClear 
         */
        BaseCollection.prototype.clear  = function() {
            throw new ExtendError(/EL04115/, null, ['clear()']);
        };

        return BaseCollection;
        
    }(MetaObject));
    
    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.BaseCollection = BaseCollection;
    } else {    
        _global._L.BaseCollection = BaseCollection;
        _global._L.Collection.BaseCollection = BaseCollection;      // namespace
    }

}(typeof window !== 'undefined' ? window : global));

/**** collection-array.js | _L.Collection.ArrayCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Type                       = require('./type');
        var _Util                       = require('./util');
        var _IArrayCollection           = require('./i-collection-array').IArrayCollection;
        var _BaseCollection             = require('./base-collection').BaseCollection;
        var _MetaObject                 = require('./meta-object').MetaObject;
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;
    } else {    
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Type                       = _global._L.Type;
        var $Util                       = _global._L.Util;
        var $IArrayCollection           = _global._L.IArrayCollection;
        var $BaseCollection             = _global._L.BaseCollection;
        var $MetaObject                 = _global._L.MetaObject;
        var $MetaRegistry               = _global._L.MetaRegistry;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Type                    = _Type                 || $Type;
    var Util                    = _Util                 || $Util;
    var BaseCollection          = _BaseCollection       || $BaseCollection;
    var IArrayCollection        = _IArrayCollection     || $IArrayCollection;
    var MetaObject              = _MetaObject           || $MetaObject;
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;
    
    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IArrayCollection === 'undefined') throw new Error(Message.get('ES011', ['IArrayCollection', 'i-collection-array']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
    if (typeof BaseCollection === 'undefined') throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));
    
    //==============================================================
    // 4. module implementation
    var ArrayCollection  = (function (_super) {
        /**
         * 배열 컬렉션을 생성합니다.
         * @constructs _L.Collection.ArrayCollection
         * @implements {_L.Interface.IArrayCollection}
         * @extends _L.Collection.BaseCollection
         * @param {object} [p_owner] 소유 객체
         */
        function ArrayCollection(p_owner) {
            _super.call(this, p_owner);

            this.$KEYWORD = ['insertAt'];

            Util.implements(ArrayCollection, this);
        }
        Util.inherits(ArrayCollection, _super);
        
        ArrayCollection._UNION = [IArrayCollection];
        ArrayCollection._NS = 'Collection';     // namespace
        ArrayCollection._PARAMS = ['_owner'];   // creator parameter

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }
        
        /**
         * 배열 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
         * @protected
         * @param {number} p_pos 인덱스 위치
         * @returns {boolean}
         */
        ArrayCollection.prototype._remove = function(p_pos) {
            var count = this.count - 1;   // [idx] 포인트 이동
            
            this.$elements.splice(p_pos, 1);
            this.$descriptors.splice(p_pos, 1);
            
            if (p_pos < count) {
                for (var i = p_pos; i < count; i++) {   // 참조 변경(이동)
                    var desc = this._descriptors[i] ? this._descriptors[i] : this._getPropDescriptor(i);
                    Object.defineProperty(this, [i], desc);
                }
                delete this[count];     // 마지막 idx 삭제
            } else {
                delete this[p_pos];     // idx 삭제 (끝일 경우)
            }
            return true;
        };

        /**
         * 배열 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        ArrayCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (this._descriptors.length > 0) {
                obj['_desc'] = [];
                for (var i = 0; i < this._descriptors.length; i++) {
                    obj['_desc'].push(this._descriptors[i]);
                }
            }
            obj['_elem'] = [];
            for (var i = 0; i < this._elements.length; i++) {
                var elem = this._elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj['_elem'].push(MetaRegistry.createReferObject(elem));
                    } else obj['_elem'].push(elem.getObject(vOpt, owned));
                } else obj['_elem'].push(elem);
            }
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 배열 컬렉션 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        ArrayCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
                for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                    this.$descriptors.push(p_oGuid['_desc'][i]);
                }
            }
            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                var elem = p_oGuid['_elem'][i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.$elements.push(obj);
                    
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) throw new ExtendError(/EL04211/, null, [i, elem['$ref']]);
                    this.$elements.push(meta);  
                
                } else this.$elements.push(elem);
            }

        };        

        /**
         * 배열 컬렉션에 요소를 추가합니다.
         * @param {any} p_elem 요소
         * @param {object} [p_desc] 프로퍼티 기술자 객체
         * @returns {number} 추가한 인덱스
         */
        ArrayCollection.prototype.add = function(p_elem, p_desc) {
            var pos = this.count;
            this.insertAt(pos, p_elem, p_desc);
            return pos;
        };

        /**
         * 배열 컬렉션을 초기화 합니다.
         * 대상 : _element =[], _descriptors = []  
         */
        ArrayCollection.prototype.clear = function() {
            this._onClear();    // event

            for (var i = 0; i < this.count; i++) delete this[i];
            this.$elements = [];
            this.$descriptors = [];
            
            this._onCleared();    // event
        };

        /**
         * 배열 컬렉션의 지정위치에 요소를 추가합니다.
         * @param {number} p_pos 인덱스 위치
         * @param {any} p_elem 요소
         * @param {object} [p_desc] 프로퍼티 기술자 객체
         * @returns {boolean} 
         */
        ArrayCollection.prototype.insertAt = function(p_pos, p_elem, p_desc) {
            try {
                var index   = this.count;

                if (typeof p_pos !== 'number') throw new ExtendError(/EL04212/, null, [typeof p_pos]);
                if (index < p_pos) throw new ExtendError(/EL04213/, null, [p_pos, index]);
                if (p_pos < 0) throw new ExtendError(/EL04214/, null, [p_pos]);
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                    Message.warn('WS011', ['configurable = false', 'element']); 
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = false', 'element']);
                }

                this._onAdd(p_pos, p_elem);
                // data process
                this.$elements.splice(p_pos, 0, p_elem);            
                this.$descriptors.splice(p_pos, 0, p_desc);
                // property define
                if (_isObject(p_desc)) {
                    Object.defineProperty(this, [p_pos], p_desc);
                } else {
                    Object.defineProperty(this, [p_pos], this._getPropDescriptor(p_pos));
                }
                // reindexing
                for (var i = p_pos + 1; i < this.count; i++) {
                    var desc = this._descriptors[i] ? this._descriptors[i] : this._getPropDescriptor(i);
                    Object.defineProperty(this, [i], desc);
                }
                this._onAdded(p_pos, p_elem);
                
                return true;

            } catch (error) {
                throw new ExtendError(/EL04215/, error, [p_pos, p_elem]);
            }
        };

        return ArrayCollection;

    }(BaseCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.ArrayCollection = ArrayCollection;
    } else {    
        _global._L.ArrayCollection = ArrayCollection;
        _global._L.Collection.ArrayCollection = ArrayCollection;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));
/**** collection-property.js | _L.Collection.PropertyCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};
    
    //==============================================================
    // 2. import module
    if (isNode) {     
        var _Message                    = require('./message').Message;
        var _ExtendError                = require('./extend-error').ExtendError;
        var _Type                       = require('./type');
        var _Util                       = require('./util');
        var _IPropertyCollection        = require('./i-collection-property').IPropertyCollection;
        var _BaseCollection             = require('./base-collection').BaseCollection;
        var _MetaObject                 = require('./meta-object').MetaObject;
        var _MetaRegistry               = require('./meta-registry').MetaRegistry;
    } else {
        var $Message                    = _global._L.Message;
        var $ExtendError                = _global._L.ExtendError;
        var $Type                       = _global._L.Type;
        var $Util                       = _global._L.Util;
        var $IPropertyCollection        = _global._L.IPropertyCollection;
        var $BaseCollection             = _global._L.BaseCollection;
        var $MetaObject                 = _global._L.MetaObject;
        var $MetaRegistry               = _global._L.MetaRegistry;
    }
    var Message                 = _Message              || $Message;
    var ExtendError             = _ExtendError          || $ExtendError;
    var Type                    = _Type                 || $Type;
    var Util                    = _Util                 || $Util;
    var IPropertyCollection     = _IPropertyCollection  || $IPropertyCollection;
    var BaseCollection          = _BaseCollection       || $BaseCollection;
    var MetaObject              = _MetaObject           || $MetaObject;
    var MetaRegistry            = _MetaRegistry         || $MetaRegistry;

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Type === 'undefined') throw new Error(Message.get('ES011', ['Type', 'type']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IPropertyCollection === 'undefined') throw new Error(Message.get('ES011', ['IPropertyCollection', 'i-collection-property']));
    if (typeof MetaRegistry === 'undefined') throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));
    if (typeof BaseCollection === 'undefined') throw new Error(Message.get('ES011', ['BaseCollection', 'base-collection']));
    
    //==============================================================
    // 4. module implementation   
    var PropertyCollection  = (function (_super) {
        /**
         * 프로퍼티 컬렉션을 생성합니다.
         * @constructs _L.Collection.PropertyCollection
         * @implements {_L.Interface.IPropertyCollection}
         * @extends _L.Collection.BaseCollection
         * @param {object} p_owner 소유 객체
         */
        function PropertyCollection(p_owner) {
            _super.call(this, p_owner); 

            var _keys = [];

            /**
             * 내부 변수 접근
             * @member {string} _L.Collection.PropertyCollection#$keys
             * @readonly
             * @private
             */
            Object.defineProperty(this, '$keys',
            {
                get: function() { return _keys; },
                set: function(nVal) { _keys = nVal; },
                configurable: false,
                enumerable: false,
            });

            /** 
             * 컬렉션 요소의 키값들
             * @readonly
             * @member {array<string>} _L.Collection.PropertyCollection#_keys 
             */
            Object.defineProperty(this, '_keys',
            {
                get: function() {
                    var arr = [];
                    for (var i = 0; i < _keys.length; i++) arr.push(_keys[i]);
                    return arr;
                },
                configurable: false,
                enumerable: false
            });

            // inner variable access
            // this.__GET$keys = function(call) {
            //     if (call instanceof PropertyCollection) return _keys;
            // }
            // this.__SET$keys = function(val, call) {
            //     if (call instanceof PropertyCollection) _keys = val;
            // }


            // 예약어 등록 
            this.$KEYWORD = ['_keys', 'indexOf', 'exist', 'keyOf'];

            Util.implements(PropertyCollection, this);
        }
        Util.inherits(PropertyCollection, _super);
        
        PropertyCollection._UNION = [IPropertyCollection];
        PropertyCollection._NS = 'Collection';      // namespace
        PropertyCollection._PARAMS = ['_owner'];    // creator parameter

        // local function
        function _isObject(obj) {    // 객체 여부
            if (typeof obj === 'object' && obj !== null) return true;
            return false;
        }

        function _isString(obj) {    // 공백아닌 문자 여부
            if (typeof obj === 'string' && obj.length > 0) return true;
            return false;
        }

        /**
         * 컬렉션의 요소를 삭제합니다.(템플릿메소드패턴)
         * @protected
         * @param {number} p_pos 인덱스 위치
         * @returns {boolean} 
         */
        PropertyCollection.prototype._remove = function(p_pos) {
            var count = this.count - 1;
            var propName = this.keyOf(p_pos);   // number 검사함
            
            delete this[propName];      // 프로퍼티 삭제

            this.$elements.splice(p_pos, 1);
            this.$keys.splice(p_pos, 1);
            this.$descriptors.splice(p_pos, 1);
            
            if (p_pos < count) {        // 참조 자료 변경
                for (var i = p_pos; i < count; i++) {
                    var desc = this._descriptors[i] ? this._descriptors[i] : this._getPropDescriptor(i);
                    propName = this.keyOf(i);
                    Object.defineProperty(this, [i], desc);
                    Object.defineProperty(this, propName, desc);
                }
                delete this[count];     // 마지막 idx 삭제
            } else {
                delete this[p_pos];     // idx 삭제 (끝일 경우)
            }
            return true;
        };

        /**
         * 프로퍼티 컬렉션 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        PropertyCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (this._descriptors.length > 0) {
                obj['_desc'] = [];
                for (var i = 0; i < this._descriptors.length; i++) {
                    obj['_desc'].push(this._descriptors[i]);
                }
            }
            obj['_elem'] = [];
            for (var i = 0; i < this.count; i++) {
                var elem = this._elements[i];
                if (elem instanceof MetaObject) {
                    if (MetaRegistry.hasGuidObject(elem, owned)) {
                        obj['_elem'].push(MetaRegistry.createReferObject(elem));
                    } else obj['_elem'].push(elem.getObject(vOpt, owned));
                } else obj['_elem'].push(elem);
            }
            obj['_key'] = [];
            for (var i = 0; i < this._keys.length; i++) {
                var key = this._keys[i];
                obj['_key'].push(key);
            }
            return obj;                        
        };

        /**
         * 직렬화(guid 타입) 객체를 프로퍼티 컬렉션 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;

            if (p_oGuid['_elem'].length !== p_oGuid['_key'].length) throw new ExtendError(/EL04221/, null, [p_oGuid['_elem'].length, p_oGuid['_key'].length]);
            
            if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
                if (p_oGuid['_elem'].length !== p_oGuid['_desc'].length) throw new ExtendError(/EL04222/, null, [p_oGuid['_elem'].length, p_oGuid['_desc'].length]);
                for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                    this.$descriptors.push(p_oGuid['_desc'][i]);
                }
            }

            this.$keys = [];
            for(var i = 0; i < p_oGuid['_key'].length; i++) {
                var key = p_oGuid['_key'][i];
                this.$keys.push(key);
                Object.defineProperty(this, [i], this._getPropDescriptor(i));
                Object.defineProperty(this, key, this._getPropDescriptor(i));
            }

            for(var i = 0; i < p_oGuid['_elem'].length; i++) {
                var elem = p_oGuid['_elem'][i];
                if (MetaRegistry.isGuidObject(elem)) {
                    var obj = MetaRegistry.createMetaObject(elem, origin);
                    obj.setObject(elem, origin);
                    this.$elements.push(obj);
                
                } else if (elem['$ref']) {
                    var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                    if (!meta) throw new ExtendError(/EL04223/, null, [i, elem['$ref']]);
                    this.$elements.push(meta);
                    
                } else this.$elements.push(elem);
            }
        };

        /**
         * 프로퍼티 컬렉션의 인덱스 값을 조회합니다.
         * @param {string | any} p_target 키 또는 요소
         * @param {boolean} [p_isKey=false] 키로 조회 여부
         * @returns {number} 없을시 -1
         */
        PropertyCollection.prototype.indexOf = function(p_target, p_isKey) {
            var isKey = p_isKey || false;
            
            if (!isKey) return this._elements.indexOf(p_target);
            else {
                if (!_isString(p_target))  throw new ExtendError(/EL04224/, null, [typeof p_target]);
                return this._keys.indexOf(p_target);
            }
        };

        /**
         * 프로퍼티 컬렉션에 요소를 추가합니다.
         * @param {string} p_key 키
         * @param {any} [p_elem] 요소
         * @param {object} [p_desc] 기술자
         * @returns {number} index 번호
         */
        PropertyCollection.prototype.add = function(p_key, p_elem, p_desc) {
            try {
                var index   = this.count;
                var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;
                // var types = ['_req_'];

                // types = [types.concat(this._elemTypes)];
                
                if (!_isString(p_key)) throw new ExtendError(/EL04225/, null, [p_key]);
                if(!regex.test(p_key)) throw new ExtendError(/EL04226/, null, [p_key, regex.source]);
                if (this.$KEYWORD.indexOf(p_key) > -1) throw new ExtendError(/EL04227/, null, [p_key]);
                if (this.exist(p_key)) throw new ExtendError(/EL04228/, null, [p_key]);
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
                // if (this._elemTypes.length > 0) Util.matchType(types, p_elem);
                if (_isObject(p_desc) && p_desc.configurable === false) {
                        Message.warn('WS011', ['configurable = true', 'element']);
                }
                if (_isObject(p_desc) && p_desc.writable === false ) {
                    Message.warn('WS011', ['writable = true', 'element']);
                }

                this._onAdd(index, p_elem);
                // data process
                this.$elements.push(p_elem);
                this.$keys.push(p_key);
                this.$descriptors.push(p_desc);
                // property define
                if (_isObject(p_desc)) {
                    Object.defineProperty(this, [index], p_desc);
                    Object.defineProperty(this, p_key, p_desc);
                } else {
                    Object.defineProperty(this, [index], this._getPropDescriptor(index));
                    Object.defineProperty(this, p_key, this._getPropDescriptor(index));
                }
                this._onAdded(index, p_elem);

                return index;

            } catch (error) {
                throw new ExtendError(/EL04229/, error, [p_key, p_elem]);
            }
        };

        /**
         * 프로러티 컬렉션을 초기화 합니다.
         * - 대상 : _element = [], _descriptors = [], _keys = []  
         * - 이벤트는 초기화 되지 않습니다.
         */
        PropertyCollection.prototype.clear = function() {
            this._onClear();
            
            for (var i = 0; i < this.count; i++) {
                var propName = this.keyOf(i);
                delete this[i];
                delete this[propName];
            }
            this.$elements = [];
            this.$descriptors = [];
            this.$keys = [];
            
            this._onCleared();
        };
    
        /**
         * 프로퍼티 컬렉션의 인덱스에 대한 키값을 조회합니다.
         * @param {number} p_idx 인덱스 값
         * @returns {string}
         */
        PropertyCollection.prototype.keyOf = function(p_idx) {
            if (typeof p_idx !== 'number') throw new ExtendError(/EL0422A/, null, [typeof p_idx]);
            return this._keys[p_idx];
        };

        /**
         * 프로퍼티 컬렉션의 키 존재하는지 확인합니다.
         * @param {string} p_key 키
         * @returns {boolean}
         */
        PropertyCollection.prototype.exist = function(p_key) {
            if (!_isString(p_key)) throw new ExtendError(/EL0422B/, null, [typeof p_key]);
            return Object.prototype.hasOwnProperty.call(this, p_key);
        };

        return PropertyCollection;

    }(BaseCollection));
    

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.PropertyCollection = PropertyCollection;
    } else {
        _global._L.PropertyCollection = PropertyCollection;
        _global._L.Collection.PropertyCollection = PropertyCollection;      // namespace
    }

}(typeof window !== 'undefined' ? window : global));