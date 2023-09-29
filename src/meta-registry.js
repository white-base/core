/**
 * namespace _L.Meta.MetaRegistry
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var NamespaceManager;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        NamespaceManager            = require('./namespace-manager').NamespaceManager;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        NamespaceManager            = _global._L.NamespaceManager;
    }

    //==============================================================Á
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof NamespaceManager === 'undefined') Message.error('ES011', ['NamespaceManager', 'namespace-manager']);

    //==============================================================
    // 4. module implementation       
    var MetaRegistry = (function () {
        /**
         * 메타 객체 등록소 클래스
         * @constructs _L.Meta.Entity.MetaRegistry
         * @static
         */
        function MetaRegistry() { 
        }

        MetaRegistry._NS = 'Meta';    // namespace

        // var define
        var list = [];
        var namespace = new NamespaceManager();
    
        /**
         * 메타 객체 목록
         * @member {string} _L.Meta.MetaRegistry#_name
         */
        Object.defineProperty(MetaRegistry, "list", 
        {
            get: function() { 
                var arr = [];
                for (var i = 0; i < list.length; i++) arr.push(list[i]);
                return arr;
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * 메타 객체 갯수
         * @member {string} _L.Meta.MetaRegistry#metaName
         */
        Object.defineProperty(MetaRegistry, "count", 
        {
            get: function() { return list.length; },
            configurable: false,
            enumerable: true,
        });        

        /**
         * 네임스페이스
         * @member {string} _L.Meta.MetaRegistry#ns
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

        /**
         * 객체 배열 리턴
         * string에서 사용
         * @param {object} p_oGuid 
         * @param {array<object>} p_arr 재귀호출시 포함 목록
         * @returns {array<object>}
         */
        MetaRegistry.__getGuidList = function(p_oGuid, p_arr) {
            p_arr = p_arr || [];
            if (this.isGuidObject(p_oGuid)) p_arr.push(p_oGuid);
            if (Array.isArray(p_oGuid)){
                for(var i = 0; i < p_oGuid.length; i++) {
                    if (_isObject(p_oGuid[i])) this.__getGuidList(p_oGuid[i], p_arr);
                }
            } else if (_isObject(p_oGuid)) {
                for(var prop in p_oGuid) {
                    if (_isObject(p_oGuid[prop])) this.__getGuidList(p_oGuid[prop], p_arr);
                }
            }
            return p_arr;
        };

        /**
         * 메타 객체 및 네임스페이스 초기화
         */
        MetaRegistry.init = function() {
            list.length = 0;
            this.ns.init();
        };

        /**
         * 메타 객체 등록
         * @param {object} p_meta 
         */
        MetaRegistry.register = function(p_meta) {
            var _ns;
            var key;
            var type;
            var fullName;

            if (!this.isMetaObject(p_meta)) Message.error('ES052', ['meta', '{_type:function, _guid: string}']);
            if (this.has(p_meta)) Message.error('ES042', ['meta', '_guid']);

            _ns         = p_meta['_ns'] || '';
            type        = p_meta['_type'];
            key         = type.name;
            fullName    = p_meta['_ns'] && p_meta['_ns'].length > 0 ?  _ns +'.'+key : key;

            list.push(p_meta);  // 객체 등록
            this.registerClass(type, _ns, key); // 클래스 등록
        };

        /**
         * 메타 객체 해제
         * @param {object | string} p_meta 
         * @returns {boolean}
         */
        MetaRegistry.release = function(p_meta) {
            var guid;

            if (typeof p_meta !== 'object' && typeof p_meta !== 'string') {
                Message.error('ES021', ['target', 'object | string']);
            }

            guid = typeof p_meta === 'string' ? p_meta : p_meta['_guid'];
            if (!_isString(guid)) return false;

            for(var i = 0; i < list.length; i++) {
                if (list[i]['_guid'] === guid) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        };

        /**
         * 메타 객체 포함 여부
         * @param {object | string} p_meta  
         * @returns {boolean}
         */
        MetaRegistry.has = function(p_meta) {
            var guid;

            if (typeof p_meta !== 'object' && typeof p_meta !== 'string') return false;
            
            guid = typeof p_meta === 'string' ? p_meta : p_meta['_guid'];
            if (!_isString(guid)) return false;

            for(var i = 0; i < list.length; i++) {
                if (list[i]['_guid'] === guid) return true;
            }
            return false;
        };
        
        /**
         * 메타 객체 조회
         * @param {object | string} p_meta 
         * @returns {MetaObject?}
         */
        MetaRegistry.find = function(p_meta) {
            var guid;

            if (typeof p_meta !== 'object' && typeof p_meta !== 'string') return;
            
            guid = typeof p_meta === 'string' ? p_meta : p_meta['_guid'];
            if (!_isString(guid)) return;
            
            for(var i = 0; i < list.length; i++) {
                if (list[i]['_guid'] === guid) return list[i];
            }
        };

        /**
         * 매타 객체 여부
         * @param {object} p_obj 
         * @returns {boolean}
         */
        MetaRegistry.isMetaObject = function(p_obj) {
            if (!_isObject(p_obj)) return false;
            if (_isString(p_obj['_guid']) && typeof p_obj['_type'] === 'function') return true;
            return false;
        };
        
        /**
         * 메타 객체 생성
         * @param {object} p_oGuid 
         * @param {object?} p_origin 
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
            
            if (!_isObject(p_oGuid)) Message.error('ES021', ['p_oGuid', 'object']);
            if (!_isString(p_oGuid['_type'])) Message.error('ES052', ['p_oGuid', '{_type:string }']);
            if (!_isObject(origin)) Message.error('ES021', ['origin', 'object']);
            
            type        = p_oGuid['_type'];
            ns          = p_oGuid['_ns'] || '';
            fullName    =  ns !== '' ? [ns, type].join('.') : type;
            coClass     = this.getClass(fullName);
            
            if (typeof coClass !== 'function') Message.error('ES053', [fullName, 'function(class)']);
            
            params = coClass.hasOwnProperty('_PARAMS') ? coClass['_PARAMS'] : []; // arr
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
         * 참조 속성 생성 : $ref
         * @param {object} p_meta 
         * @returns {object}
         */
        MetaRegistry.createReferObject = function(p_meta) {
            if (!_isObject(p_meta)) Message.error('ES021', ['p_meta', 'object']);
            if (!_isString(p_meta['_guid'])) Message.error('ES052', ['p_oGuid', '{_guid:string }']);
            return { $ref: p_meta['_guid'] };
        };

        /**
         * 네임스페이스 참조 속성 생성 : $ns  
         * 함수가 없을 경우 등록
         * @param {function} p_fun 
         * @returns {object}
         */
        MetaRegistry.createNsReferObject = function(p_fun) {
            var fullName;
            var ns, key;

            if (typeof p_fun !== 'function') Message.error('ES021', ['p_fun', 'function']);
            
            if (!this.findClass(p_fun)) {
                ns  = p_fun['_NS'] || '';
                key = p_fun.name;
                this.registerClass(p_fun, ns, key);
            }
            fullName = this.findClass(p_fun);
            return { $ns: fullName };
        };

        /**
         * 메타 객체에 Guid 객체와 매칭된 곳 설정
         * @param {object} p_oGuid 
         * @param {object} p_meta 
         * @returns {object} oGuid 객체에 $set 설정한 객체
         */
        MetaRegistry.createSetObject = function(p_oGuid, p_meta) {
            if (!_isObject(p_oGuid)) Message.error('ES021', ['p_oGuid', 'object']);
            if (!_isObject(p_meta)) Message.error('ES021', ['p_meta', 'object']);
            if (!_isString(p_meta['_guid'])) Message.error('ES052', ['p_meta', '{_guid:string }'])
            
            p_oGuid['$set'] = p_meta['_guid'];
            return p_oGuid;
        };
         
        /**
         * guid 객체 유효성 검사
         * @param {object} p_oGuid 
         * @returns {boolean}
         */
        MetaRegistry.validObject = function(p_oGuid) {
            var _this = this;
            var arrObj;

            if (!_isObject(p_oGuid)) Message.error('ES021', ['oGuid', 'object']);
            
            arrObj = this.__getGuidList(p_oGuid);
            if (!validUniqueGuid() || !validReference(p_oGuid) || !validCollection(p_oGuid)) return false;
            return true;

            // inner function
            function findGuid(guid, arr) { // guid 조회
                for(var i = 0; i < arr.length; i++) {
                    if (arr[i]['_guid'] === guid) return arr[i];
                }
            }
            function validReference(oGuid) { // 참조 검사
                if (oGuid['$ref'] && !findGuid(oGuid['$ref'], arrObj)) return false;
                if (oGuid['$set'] && !findGuid(oGuid['$set'], arrObj)) return false;
                if (oGuid['$ns'] && !_this.getClass(oGuid['$ns'])) return false;
        
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (_isObject(oGuid[i]) && !validReference(oGuid[i])) return false
                    }
                } else {
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop]) && !validReference(oGuid[prop])) return false;
                    }
                }
                return true;
            }
            function validCollection(oGuid) { // 컬렉션 검사
                if (Array.isArray(oGuid['_elem']) && Array.isArray(oGuid['_key'])) {
                    if (oGuid['_elem'].length !== oGuid['_key'].length) return false;
                }
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (_isObject(oGuid[i]) && !validCollection(oGuid[i])) return false;
                    }
                } else {
                    for(var prop in p_oGuid) {
                        if (_isObject(oGuid[prop]) && !validCollection(oGuid[prop])) return false;
                    }
                }
                return true;
            }
            function validUniqueGuid() {    // guid 유일한 값인지 검사
                for (var i = 0; i < arrObj.length; i++) {
                    for (var ii = 0; ii < arrObj.length; ii++) {
                        if (arrObj[i]['_guid'] === arrObj[ii]['_guid'] && i !== ii) return false; // 중복
                    }
                }
                return true;
            }
        };

        /**
         * guid 객체 여부 검사
         * @param {any} p_obj 
         * @returns {boolean}
         */
        MetaRegistry.isGuidObject = function(p_obj) {
            if (!_isObject(p_obj)) return false;
            if (_isString(p_obj['_guid']) && _isString(p_obj['_type'])) return true;
            return false;
        };

        /**
         * guid 객체 포함 여부
         * @param {string| object} p_oGuid 
         * @param {object | array<object>} p_origin 
         * @returns {boolean}
         */
        MetaRegistry.hasGuidObject = function(p_oGuid, p_origin) {
            var guid = typeof p_oGuid === 'string' ? p_oGuid : p_oGuid['_guid'];
            var arrOrigin = [];

            if (!_isString(guid)) Message.error('ES024', ['p_oGuid', 'string | object<guid>']);

            if (Array.isArray(p_origin)) arrOrigin = p_origin;
            else arrOrigin.push(p_origin);

            for (var i = 0; i < arrOrigin.length; i++) {
                var origin = arrOrigin[i];
                var arrObj = this.__getGuidList(origin);
                if (!_isObject(origin)) Message.error('ES024', ['p_origin', 'object']);
                for (var ii = 0; ii < arrObj.length; ii++) {
                    if (arrObj[ii]._guid === guid) return true;
                }
            }
            return false;
        };

        /**
         * guid 객체로 설정한 메타 객체 조회   
         * - setObject() 시점에 설정  
         * - $set 여부 조회
         * @param {string | object} p_oGuid 검색 대상
         * @param {object} p_origin 검색 원본 객체
         * @returns {MetaObject}
         */
        MetaRegistry.findSetObject = function(p_oGuid, p_origin) {
            var guid = typeof p_oGuid === 'string' ? p_oGuid : p_oGuid['_guid'];
            var origin = p_origin;

            if (!_isString(guid)) Message.error('ES024', ['guid', 'string']);
            if (!_isObject(origin)) Message.error('ES024', ['p_origin', 'object']);

            return findObject(origin);
            
            // inner finction
            function findObject(oGuid) { // 객체 조회
                var result;
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object') {
                            result = findObject(oGuid[i]);
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
                            result = findObject(oGuid[prop]);
                            if(result) return result;
                        } 
                    }
                }
                return result;
            }
        };

        /**
         * 참조 객체 포함 여부 ($ref, $ns)
         * @param {object} p_oGuid 
         * @returns {boolean}
         */
        MetaRegistry.hasRefer = function(p_oGuid) {
            if (!_isObject(p_oGuid)) Message.error('ES024', ['target', 'object']);
            if (!this.isGuidObject(p_oGuid)) Message.error('ES024', ['target', 'guid']);

            return hasRefer(p_oGuid);

            // inner function
            function hasRefer(oGuid) {  // 참조 포함 여부
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object' && hasRefer(oGuid[i])) return true;
                    }
                } else {
                    if (oGuid['$ref'] && _isString(oGuid['$ref'])) return true;
                    if (oGuid['$ns'] && _isString(oGuid['$ns'])) return true;
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop]) && hasRefer(oGuid[prop])) return true
                    }
                }
                return false;
            }
        };       

        /**
         * 메타 객체 참조 변환 : $ns
         * @param {object} p_oGuid 
         * @returns {object} 참조 변환한 oGuid 객체
         */
        MetaRegistry.transformRefer = function(p_oGuid) {
            var _this = this;
            var arrObj;
            var clone;

            if (!_isObject(p_oGuid)) Message.error('ES024', ['p_oGuid', 'object']);
            
            arrObj = this.__getGuidList(p_oGuid);
            clone = Util.deepCopy(p_oGuid);
            linkReference(clone, arrObj);
            return clone;

            // inner function
            function linkReference(oGuid, arr) {    // 참조 연결
                if (Array.isArray(oGuid)){
                    for(var i = 0; i < oGuid.length; i++) {
                        if (typeof oGuid[i] === 'object') linkReference(oGuid[i], arr);
                    }
                } else {
                    for(var prop in oGuid) {
                        if (_isObject(oGuid[prop])) {
                            if (oGuid[prop]['$ns']) {
                                var ns = _this.getClass(oGuid[prop]['$ns']);
                                if (typeof ns !== 'function') Message.error('ES015', ['$ns', oGuid[prop]['$ns']]);
                                oGuid[prop] = ns; // function 타입 연결
                            } else linkReference(oGuid[prop], arr);
                        }
                    }
                }
            }
        };
        
        /**
         * 네임스페이스에 클래스(함수) 등록   
         * key 를 별도 등록안하면 ns 를 fullName 으로 처리
         * @param {function | object} p_fun 
         * @param {array<string> | string} p_ns fullname 또는 메임스페이스 
         * @param {string} p_key 
         */
        MetaRegistry.registerClass = function(p_fun, p_ns, p_key) {
            var fullName;
            
            if (!(_isObject(p_fun) || typeof p_fun === 'function')) Message.error('ES024', ['p_fun', 'object | function']);

            if (p_key) fullName = p_ns.length > 0 ? p_ns +'.'+ p_key : p_key;
            else fullName = p_ns;
            
            if (_isBuiltFunction(p_fun)) return;    // 내장함수 제외
            if (typeof _global[fullName] === 'function') return;
            
            if (!this.ns.find(fullName)) this.ns.add(fullName, p_fun);  // 중복 검사 후 등록
        };
        
        /**
         * 네임스페이스에서 클래스(함수) 해제
         * @param {string} p_fullName 
         * @returns {boolean}
         */
        MetaRegistry.releaseClass = function(p_fullName) {
            if (!_isString(p_fullName)) Message.error('ES024', ['p_fullName', 'string']);
            
            if (typeof _global[p_fullName] === 'function') return true; // 내장함수 & 전역 함수
            return this.ns.del(p_fullName);
        };
        
        /**
         * 네임스페이스에서 클래스(함수) 경로 조회
         * @param {function} p_fun 
         * @returns {string?}
         */
        MetaRegistry.findClass = function(p_fun) {
            var fullName;

            if (typeof p_fun !== 'function') Message.error('ES024', ['p_fun', 'function']);
            
            fullName = p_fun.name;
            if (typeof _global[fullName] === 'function') return fullName;   // 내장함수 & 전역 함수
            return this.ns.getPath(p_fun);
        };
        
        /**
         * 클래스(함수) 얻기
         * @param {string} p_fullName 
         * @returns {function}
         */
        MetaRegistry.getClass = function(p_fullName) {
            if (!_isString(p_fullName)) Message.error('ES024', ['p_fullName', 'string']);
            
            if (typeof _global[p_fullName] === 'function') return _global[p_fullName];  // 내장함수 & 전역 함수
            return this.ns.find(p_fullName);
        };

        /**
         * 직렬화문자열을 메타객체로 불러오기
         * @param {string} p_str 
         * @param {function?} p_parse 
         * @returns {MetaObject}
         */
        MetaRegistry.loadMetaObject = function(p_str, p_parse) {
            var obj = p_str;
            var oGuid;
            var meta;

            if (typeof p_str !== 'string') Message.error('ES021', ['str', 'string']);

            obj = (typeof p_parse === 'function') ? p_parse(obj) : JSON.parse(obj, null);
            if (this.has(obj)) return this.find(obj['_guid']);  // 객체가 존재할 경우
            if (!this.isGuidObject(obj)) Message.error('ES022', ['obj']);

            oGuid = this.transformRefer(obj);
            meta = this.createMetaObject(oGuid);
            meta.setObject(oGuid);
            return meta;
        };
        return MetaRegistry;
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaRegistry = MetaRegistry;
    } else {
        _global._L.MetaRegistry = MetaRegistry;
        _global._L.Meta.MetaRegistry = MetaRegistry;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));