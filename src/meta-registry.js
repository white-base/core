/**
 * namespace _L.Meta.MetaRegistry
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    // var IList;
    // var IListControl;
    var NamespaceManager;
    // var MetaObject;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        // IList                   = require('./i-list').IList;
        // IListControl            = require('./i-control-list').IListControl;
        NamespaceManager            = require('./namespace-manager').NamespaceManager;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        // IList                   = _global._L.IList;
        // IListControl            = _global._L.IListControl;
        NamespaceManager            = _global._L.NamespaceManager;
    }

    //==============================================================Á
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    // if (typeof IList === 'undefined') Message.error('ES011', ['IList', 'i-list']);
    // if (typeof IListControl === 'undefined') Message.error('ES011', ['IListControl', 'i-control-list']);
    if (typeof NamespaceManager === 'undefined') Message.error('ES011', ['NamespaceManager', 'namespace-manager']);

    //==============================================================
    // 4. module implementation       
    var MetaRegistry = (function () {
        /**
         * 메타 등록소
        */
       function MetaRegistry() { 
        }

        MetaRegistry._NS = 'Meta';    // namespace

        // var define
        var list = [];
        var namespace = new NamespaceManager();
    
        /**
         * 메타 이름
         * @member {string} _L.Meta.MetaRegistry#_name
         */
        Object.defineProperty(MetaRegistry, "list", {
            get: function() { 
                var arr = [];
                for (var i = 0; i < list.length; i++) arr.push(list[i]);
                return arr;
            },
            enumerable: false,
            configurable: false
        });

        /**
         * 메타 이름
         * @member {string} _L.Meta.MetaRegistry#metaName
         */
        Object.defineProperty(MetaRegistry, "count", {
            get: function() { return list.length; },
            enumerable: false,
            configurable: false
        });        

        /**
         * 메타 이름
         * @member {string} _L.Meta.MetaRegistry#ns
         */
        Object.defineProperty(MetaRegistry, "ns", {
            get: function() { return namespace; },
            enumerable: false,
            configurable: false
        });

        // local function
        function findGuid(guid, arr) {
            for(var i = 0; i < arr.length; i++) {
                if (arr[i]['_guid'] === guid) return arr[i];
            }
        }
        function _isBuiltFunction(obj) {
            if (typeof obj === 'function' && (false 
                || obj === Number || obj === String 
                || obj === Boolean || obj === Function
                || obj === Object || obj === Array
                || obj === RegExp || obj === Date 
                || obj === Symbol || obj === BigInt
            )) return true;
            return false;
        }

        /**
         * 객체배열 리턴
         * string에서 사용
         * @param {*} p_oGuid 
         * @param {*} p_arr 
         * @returns 
         */
        MetaRegistry.__getObjectList = function(p_oGuid, p_arr) {
            p_arr = p_arr || [];
            if (this.isGuidObject(p_oGuid)) p_arr.push(p_oGuid);
            for(var prop in p_oGuid) {
                if (typeof p_oGuid[prop] === 'object') this.__getObjectList(p_oGuid[prop], p_arr);
                else if (Array.isArray(p_oGuid[prop])){
                for(var i = 0; i < p_oGuid[prop].length; i++) {
                    if (typeof p_oGuid[prop][i] === 'object') this.__getObjectList(p_oGuid[prop][i], p_arr);
                }  
                }
            }
            return p_arr;
        };



        /**
         * 메타객체 등록
         * @param {*} p_meta 
         */
        MetaRegistry.register = function(p_meta) {
            var _ns;
            var key;
            var type;
            var fullName;

            if (p_meta['_type'] && p_meta['_guid']) {
                if (this.has(p_meta)) Message.error('ES042', ['meta', '_guid']);
                // 객체 등록
                list.push(p_meta);
                // 클래스 등록
                _ns = p_meta['_ns'] || '';
                type = p_meta['_type'];
                key = type.name;
                fullName = p_meta['_ns'] && p_meta['_ns'].length > 0 ?  _ns +'.'+key : key;
                this.registerClass(type, _ns, key);
            } else Message.error('ES052', ['meta', '_type:function, _guid: string']);
        };

        /**
         * 메타객체 해제
         * @param {*} p_target 
         * @returns {boolean}
         */
        MetaRegistry.release = function(p_target) {
            var guid = typeof p_target === 'string' ? p_target : p_target['_guid'];

            if (typeof guid !== 'string') return false;
            for(var i = 0; i < list.length; i++) {
                if (list[i]._guid === guid) {
                    list.splice(i, 1);
                    return true;
                }
            }
        };

        /**
         * 초기화
         */
        MetaRegistry.init = function() {
            list.length = 0;
            this.ns.init();
        };

        /**
         * 메타객체 여부 검사
         * @param {object | string} obj  
         * @returns 
         */
        MetaRegistry.has = function(p_target) {
            var guid = typeof p_target === 'string' ? p_target : p_target['_guid'];
            
            if (!MetaRegistry.isMetaObject(p_target)) return false;

            if (typeof guid !== 'string') return;
            for(var i = 0; i < list.length; i++) {
                if (list[i]._guid === guid) return true;
            }
            return false;
        };
        
        /**
         * 메타 객체 조회
         * @param {*} guid 
         * @returns 
         */
        MetaRegistry.find = function(p_target) {
            var guid = typeof p_target === 'string' ? p_target : p_target['_guid'];

            if (typeof guid !== 'string') return;
            for(var i = 0; i < list.length; i++) {
                if (list[i]._guid === guid) return list[i];
            }
        };

        MetaRegistry.isMetaObject = function(p_obj) {
            if (p_obj === null || typeof p_obj !== 'object') return false;
            if (p_obj['_guid'] && typeof p_obj['_guid'] === 'string'
                && p_obj['_type'] && typeof p_obj['_type'] === 'function') return true;
            return false;
        };
        
        /**
         * 메타 객체 생성
         * @param {*} p_oGuid 
         * @returns 
         */
        MetaRegistry.createMetaObject = function(p_oGuid, p_origin) {
            var origin = p_origin ? p_origin : p_oGuid;
            var args = [null];
            var type = p_oGuid._type;
            var _ns = p_oGuid._ns || '';
            var fullName =  _ns !== '' ? [_ns, type].join('.') : type;
            var coClass = this.getClass(fullName);
            var params;
            
            if (typeof coClass !== 'function') Message.error('ES053', [fullName, 'function(class)']);
            // params = coClass._PARAMS || []; // arr
            params = coClass.hasOwnProperty('_PARAMS') ? coClass['_PARAMS'] : []; // arr
            
            for (var i = 0; i < params.length; i++) {
                var argName = params[i];
                var prop = p_oGuid[argName];
                var obj;
                if (typeof prop === 'object' && prop['$ref']) obj = this.findSetObject(origin, prop['$ref']);
                else obj = prop;
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
            if (p_meta && p_meta._guid && p_meta._guid.length > 0 ) return { $ref: p_meta._guid };
        };

        /**
         * 네임스페이스 속성 생성 : $ns
         * @param {*} p_fun 
         * @returns 
         */
        MetaRegistry.createNsReferObject = function(p_fun) {
            var fullName;
            var ns, key;

            if (!this.findClass(p_fun)) {
                ns = p_fun._NS || '';
                key = p_fun.name;
                this.registerClass(p_fun, ns, key);
            }

            fullName = this.findClass(p_fun);
            if (typeof fullName === 'string' && fullName.length > 0) return { $ns: fullName };
            else Message.error('ES053', ['ns', p_fun.name]);
        };

        MetaRegistry.createSetObject = function(p_target, p_meta) {
            if (p_meta && p_meta._guid && p_meta._guid.length > 0 ) {
                p_target['$set'] = p_meta._guid;
                return p_target;
            } else Message.error('ES031', ['meta']);
        };
         
        /**
         * 메타 객체 유효성 검사
         * TODO: guid 가 유일한지 검사 필요, 고정키를 가져올 경우
         * @param {*} p_oGuid 
         * @returns 
         */
        MetaRegistry.validObject = function(p_oGuid) {
            var _this = this;
            var arrObj = this.__getObjectList(p_oGuid);

            if (validReference(p_oGuid) === false) return false;
            if (validCollection(p_oGuid) === false) return false;
            return true;

            // inner function
            function validReference(oGuid) {
                if (typeof oGuid === 'object') {
                    if (oGuid['$ref']) if (!findGuid(oGuid['$ref'], arrObj)) return false;
                    if (oGuid['$set']) if (!findGuid(oGuid['$set'], arrObj)) return false;
                    if (oGuid['$ns']) if (!_this.getClass(oGuid['$ns'])) return false;
            
                    for(var prop in oGuid) {
                        if (typeof oGuid[prop] === 'object') {
                            if (validReference(oGuid[prop]) === false) return false
                        } else if (Array.isArray(oGuid[prop])){
                          for(var i = 0; i < oGuid[prop].length; i++) {
                            if (typeof oGuid[prop][i] === 'object') {
                                if (validReference(oGuid[prop][i]) === false) return false;
                            }
                          }  
                        }
                    }
                }
                return true;
            }
            function validCollection(oGuid) {
                if (Array.isArray(oGuid['_elem']) && Array.isArray(oGuid['_key'])) {
                    if (oGuid['_elem'].length !== oGuid['_key'].length) return false;
                }
                for(var prop in oGuid) {
                    if (typeof oGuid[prop] === 'object') {
                        if (validCollection(oGuid[prop]) === false) return false;
                    } else if (Array.isArray(oGuid[prop])){
                      for(var i = 0; i < oGuid[prop].length; i++) {
                        if (typeof oGuid[prop][i] === 'object') {
                            if (validCollection(oGuid[prop][i]) === false) return false;
                        }
                      }  
                    }
                }
                return true;
            }
        };

        /**
         * guid 객체 여부 검사
         * @param {*} p_obj 
         * @returns 
         */
        MetaRegistry.isGuidObject = function(p_obj) {
            if (p_obj === null || typeof p_obj !== 'object') return false;
            if (p_obj['_guid'] && typeof p_obj['_guid'] === 'string'
                && p_obj['_type'] && typeof p_obj['_type'] === 'string') return true;
            // if (p_obj['_guid'] && typeof p_obj['_guid'] === 'string') return true;

            return false;
        };



        /**
         * setObject() 로 설정한 객체
         * $set 여부 조회
         * @param {object<Guid>} p_origin 검색 원본 객체
         * @param {string | object<Guid>} p_target 검색 대상
         * @returns {MetaObject}
         */
        MetaRegistry.findSetObject = function(p_origin, p_target) {
            var guid = typeof p_target === 'string' ? p_target : p_target['_guid'];
            var origin = p_origin;

            // if (!this.isGuidObject(origin)) Message.error('ES024', ['object', 'guid']);
            if (typeof origin !== 'object') Message.error('ES024', ['object', 'object']);
            return findObject(origin);
            
            // inner finction
            function findObject(oGuid) {
                var result;
                if (typeof oGuid === 'object') {
                    if (oGuid['_guid'] && oGuid['_guid'] === guid) {
                        result = oGuid['$set'] ? MetaRegistry.find(oGuid['$set']) : undefined;
                        return result;
                    }
                    for (var prop in oGuid) {
                        var obj = oGuid[prop];
                        if (typeof obj === 'object' || Array.isArray(obj) ) {
                            result = findObject(obj);
                            if(result) return result;
                        }
                    }
                }
                return result;
            }
        };

        /**
         * 참조 객체 여부 검사
         * @param {*} obj 
         * @returns 
         */
        MetaRegistry.hasRefer = function(p_target) {
            if (typeof p_target !== 'object') Message.error('ES024', ['target', 'object']);
            if (!this.isGuidObject(p_target)) Message.error('ES024', ['target', 'guid']);

            return hasRefer(p_target);

            // inner function
            function hasRefer(obj) {
                if (typeof obj === 'object') {
                    if (obj['$ref'] && typeof obj['$ref'] === 'string') return true;
                    if (obj['$ns'] && typeof obj['$ns'] === 'string') return true;
                    for(var prop in obj) {
                        if (typeof obj[prop] === 'object') {
                            if (hasRefer(obj[prop]) === true) return true;
                        } else if (Array.isArray(obj[prop])){
                          for(var i = 0; i < obj[prop].length; i++) {
                            if (typeof obj[prop][i] === 'object') {
                                if (hasRefer(obj[prop]) === true) return true;
                            }
                          }  
                        }
                    }
                }
                return false;
            }
        };       

        /**
         * 메타 객체 참조 변환 : $ref, $ns
         * @param {*} rObj 
         * @returns 
         */
        // MetaRegistry.transformRefer = function(rObj) {
        //     var _this = this;
        //     var arrObj = this.__getObjectList(rObj);
        //     var clone = deepCopy(rObj);
        //     linkReference(clone, arrObj);

        //     return clone;
        //     // inner function
        //     function linkReference(obj, arr) {
        //         // inner function
        //         for(var prop in obj) {
        //             if (obj[prop] === null) continue;
        //             if (typeof obj[prop] === 'object') {
        //                 if (obj[prop]['$ref']) {
        //                     var ref = findGuid(obj[prop]['$ref'], arr);
        //                     if (typeof ref !== 'object') throw new Error('참조 연결 실패 $ref:' + obj[prop]['$ref']);
        //                     obj[prop] = ref;
        //                 } else if (obj[prop]['$ns']) {
        //                     // obj[prop] = _this.ns.get(obj[prop]['$ns']);
        //                     var ns = _this.getClass(obj[prop]['$ns']);
        //                     if (typeof ns !== 'function') throw new Error('참조 연결 실패 $ns:' + obj[prop]['$ns']);
        //                     obj[prop] = ns;
        //                 } else linkReference(obj[prop], arr);
        //             } else if (Array.isArray(obj[prop])){
        //                 for(var i = 0; i < obj[prop].length; i++) {
        //                     if (typeof obj[prop][i] === 'object') linkReference(obj[prop][i], arr);
        //                 }  
        //             } 
        //         }
        //     }
        //     function deepCopy(object) {
        //         if (object === null || typeof object !== "object") {
        //           return object;
        //         }
        //         // 객체인지 배열인지 판단
        //         const copy = Array.isArray(object) ? [] : {};
               
        //         for (var key of Object.keys(object)) {
        //           copy[key] = deepCopy(object[key]);
        //         }
               
        //         return copy;
        //       }
    
        // };
        MetaRegistry.transformRefer = function(p_oGuid) {
            var _this = this;
            var arrObj = this.__getObjectList(p_oGuid);
            var clone = Util.deepCopy(p_oGuid);

            linkReference(clone, arrObj);
            return clone;

            // inner function
            function linkReference(obj, arr) {
                for(var prop in obj) {
                    if (obj[prop] === null) continue;
                    if (typeof obj[prop] === 'object') {
                        if (obj[prop]['$ns']) {
                            var ns = _this.getClass(obj[prop]['$ns']);
                            if (typeof ns !== 'function') Message.error('ES015', ['$ns', obj[prop]['$ns']]);
                            obj[prop] = ns; // function 타입 연결
                        } else linkReference(obj[prop], arr);
                    } else if (Array.isArray(obj[prop])){
                        for(var i = 0; i < obj[prop].length; i++) {
                            if (typeof obj[prop][i] === 'object') linkReference(obj[prop][i], arr);
                        }  
                    } 
                }
            }
        };

        /**
         * 클래스(함수) 등록
         * key 를 별도 등록안하면 ns 를 fullName 으로 처리
         * @param {*} p_fun 
         * @param {*} p_ns fullname 또는 메임스페이스 
         * @param {*} p_key 
         * @returns 
         */
        MetaRegistry.registerClass = function(p_fun, p_ns, p_key) {
            var fullName;
            
            if (p_key) fullName = p_ns.length > 0 ? p_ns +'.'+ p_key : p_key;
            else fullName = p_ns;

            // 내장함수 제외
            if (_isBuiltFunction(p_fun)) return;
            if (typeof _global[fullName] === 'function') return;
            // 중복 검사 
            // if (!this.ns.get(fullName)) this.ns.set(p_ns, p_key, p_fun);
            if (!this.ns.find(fullName)) this.ns.register(fullName, p_fun);
        };
        
        /**
         * 클래스(함수) 해제
         * @param {*} p_fullName 
         * @returns 
         */
        MetaRegistry.releaseClass = function(p_fullName) {
            // 내장함수 & 전역 함수
            if (typeof _global[p_fullName] === 'function') return true;

            return this.ns.release(p_fullName);
        };
        
        /**
         * 클래스(함수) 조회
         * @param {*} p_fun 
         * @returns 
         */
        MetaRegistry.findClass = function(p_fun) {
            var fullName = p_fun.name;
            // 내장함수 & 전역 함수
            if (typeof _global[fullName] === 'function') return fullName;

            return this.ns.getPath(p_fun);
        };
        
        /**
         * 클래스(함수) 얻기
         * @param {*} p_fullName 
         * @returns 
         */
        MetaRegistry.getClass = function(p_fullName) {
            // 내장함수 & 전역 함수
            if (typeof _global[p_fullName] === 'function') return _global[p_fullName];

            return this.ns.find(p_fullName);
        };

        /**
         * 로드
         * @param {*} p_str 
         * @param {*} p_parse 
         */
        MetaRegistry.loadMetaObject = function(p_str, p_parse) {
            var obj = p_str;
            var oGuid;
            var meta;

            if (typeof p_str !== 'string') Message.error('ES021', ['str', 'string']);

            if (typeof p_parse === 'function') obj = p_parse(obj);
            else obj = JSON.parse(obj, null);

            if (this.has(obj)) return this.find(obj['_guid']);

            if (this.isGuidObject(obj)) {
                oGuid = this.hasRefer(obj) ? this.transformRefer(obj) : p_str;
                
                meta = this.createMetaObject(oGuid);
                meta.setObject(oGuid);
                return meta;
            } else Message.error('ES022', ['obj']);
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