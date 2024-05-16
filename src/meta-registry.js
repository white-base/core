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