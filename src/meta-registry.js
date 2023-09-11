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
    _global._L                  = _global._L || {};
    _global._L.Meta             = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                 = require('./message').Message;
        Util                    = require('./util');
        // IList                   = require('./i-list').IList;
        // IListControl            = require('./i-control-list').IListControl;
        NamespaceManager        = require('./namespace-manager').NamespaceManager;
    } else {
        Message                 = _global._L.Message;
        Util                    = _global._L.Util;
        // IList                   = _global._L.IList;
        // IListControl            = _global._L.IListControl;
        NamespaceManager        = _global._L.NamespaceManager;
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
         * @param {*} mObj 
         * @param {*} arr 
         * @returns 
         */
        MetaRegistry.__getObjectList = function(mObj, arr) {
            arr = arr || [];
            if (this.isGuidObject(mObj)) arr.push(mObj);
            for(var prop in mObj) {
                if (typeof mObj[prop] === 'object') this.__getObjectList(mObj[prop], arr);
                else if (Array.isArray(mObj[prop])){
                for(var i = 0; i < mObj[prop].length; i++) {
                    if (typeof mObj[prop][i] === 'object') this.__getObjectList(mObj[prop][i], arr);
                }  
                }
            }
            return arr;
        };



        /**
         * 메타객체 등록
         * @param {*} meta 
         */
        MetaRegistry.register = function(meta) {
            var _ns;
            var key;
            var type;
            var fullName;

            if (meta['_type'] && meta['_guid']) {
                if (this.has(meta)) Message.error('ES042', ['meta', '_guid']);
                // 객체 등록
                list.push(meta);
                // 클래스 등록
                _ns = meta['_ns'] || '';
                type = meta['_type'];
                key = type.name;
                fullName = meta['_ns'] && meta['_ns'].length > 0 ?  _ns +'.'+key : key;
                this.registerClass(type, _ns, key);
            } else Message.error('ES052', ['meta', '_type:function, _guid: string']);
        };

        /**
         * 메타객체 해제
         * @param {*} target 
         * @returns {boolean}
         */
        MetaRegistry.release = function(target) {
            var guid = typeof target === 'string' ? target : target['_guid'];

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
        MetaRegistry.has = function(target) {
            var guid = typeof target === 'string' ? target : target['_guid'];
            
            if (!MetaRegistry.isMetaObject(target)) return false;

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
        MetaRegistry.find = function(target) {
            var guid = typeof target === 'string' ? target : target['_guid'];

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
         * @param {*} mObj 
         * @returns 
         */
        MetaRegistry.createMetaObject = function(mObj, oObj) {
            var origin = oObj ? oObj : mObj;
            var args = [null];
            var type = mObj._type;
            var _ns = mObj._ns || '';
            var fullName =  _ns !== '' ? [_ns, type].join('.') : type;
            var coClass = this.getClass(fullName);
            var params;
            
            if (typeof coClass !== 'function') Message.error('ES053', [fullName, 'function(class)']);
            params = coClass._PARAMS || []; // arr

            for (var i = 0; i < params.length; i++) {
                var argName = params[i];
                var prop = mObj[argName];
                var obj;
                if (typeof prop === 'object' && prop['$ref']) obj = this.findSetObject(origin, prop['$ref']);
                else obj = prop;
                if (mObj[argName]) args.push(obj);
            }
            return new (Function.prototype.bind.apply(coClass, args));
        };
        
        /**
         * 참조 속성 생성 : $ref
         * @param {object} meta 
         * @returns {object}
         */
        MetaRegistry.createReferObject = function(meta) {
            if (meta && meta._guid && meta._guid.length > 0 ) return { $ref: meta._guid };
        };

        /**
         * 네임스페이스 속성 생성 : $ns
         * @param {*} fun 
         * @returns 
         */
        MetaRegistry.createNsReferObject = function(fun) {
            var fullName;
            var ns, key;

            if (!this.findClass(fun)) {
                ns = fun._NS;
                key = fun.name;
                this.registerClass(fun, ns, key);
            }

            fullName = this.findClass(fun);
            if (typeof fullName === 'string' && fullName.length > 0) return { $ns: fullName };
            else Message.error('ES053', ['ns', fun.name]);
        };

        MetaRegistry.createSetObject = function(target, meta) {
            if (meta && meta._guid && meta._guid.length > 0 ) {
                target['$set'] = meta._guid;
                return target;
            } else Message.error('ES031', ['meta']);
        };
         
        /**
         * 메타 객체 유효성 검사
         * @param {*} rObj 
         * @returns 
         */
        MetaRegistry.validObject = function(rObj) {
            var _this = this;
            var arrObj = this.__getObjectList(rObj);

            if (validReference(rObj) === false) return false;
            if (validCollection(rObj) === false) return false;
            return true;

            // inner function
            function validReference(mObj) {
                if (typeof mObj === 'object') {
                    if (mObj['$ref']) if (!findGuid(mObj['$ref'], arrObj)) return false;
                    if (mObj['$set']) if (!findGuid(mObj['$set'], arrObj)) return false;
                    if (mObj['$ns']) if (!_this.getClass(mObj['$ns'])) return false;
            
                    for(var prop in mObj) {
                        if (typeof mObj[prop] === 'object') {
                            if (validReference(mObj[prop]) === false) return false
                        } else if (Array.isArray(mObj[prop])){
                          for(var i = 0; i < mObj[prop].length; i++) {
                            if (typeof mObj[prop][i] === 'object') {
                                if (validReference(mObj[prop][i]) === false) return false;
                            }
                          }  
                        }
                    }
                }
                return true;
            }
            function validCollection(mObj) {
                if (Array.isArray(mObj['_elem']) && Array.isArray(mObj['_key'])) {
                    if (mObj['_elem'].length !== mObj['_key'].length) return false;
                }
                for(var prop in mObj) {
                    if (typeof mObj[prop] === 'object') {
                        if (validCollection(mObj[prop]) === false) return false;
                    } else if (Array.isArray(mObj[prop])){
                      for(var i = 0; i < mObj[prop].length; i++) {
                        if (typeof mObj[prop][i] === 'object') {
                            if (validCollection(mObj[prop][i]) === false) return false;
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
            return false;
        };



        /**
         * setObject() 로 설정한 객체
         * $set 여부 조회
         * @param {rObj | mObj} p_origin 검색 원본 객체
         * @param {string | rObj | meta} p_target 검색 대상
         * @returns {MetaObject}
         */
        MetaRegistry.findSetObject = function(p_origin, p_target) {
            var guid = typeof p_target === 'string' ? p_target : p_target['_guid'];
            var origin = p_origin ? p_origin : mObj;

            if (!this.isGuidObject(origin)) Message.error('ES024', ['object', 'guid']);
            return findObject(origin);
            
            // inner finction
            function findObject(mObj) {
                var result;
                if (typeof mObj === 'object') {
                    if (mObj['_guid'] && mObj['_guid'] === guid) {
                        result = mObj['$set'] ? MetaRegistry.find(mObj['$set']) : undefined;
                        return result;
                    }
                    for (var prop in mObj) {
                        var obj = mObj[prop];
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
        MetaRegistry.hasRefer = function(obj) {
            if (typeof obj !== 'object') Message.error('ES024', ['target', 'object']);
            if (!this.isGuidObject(obj)) Message.error('ES024', ['target', 'guid']);

            return hasRefer(obj);

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
        MetaRegistry.transformRefer = function(rObj) {
            var _this = this;
            var arrObj = this.__getObjectList(rObj);
            var clone = deepCopy(rObj);

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
                            obj[prop] = ns;
                        } else linkReference(obj[prop], arr);
                    } else if (Array.isArray(obj[prop])){
                        for(var i = 0; i < obj[prop].length; i++) {
                            if (typeof obj[prop][i] === 'object') linkReference(obj[prop][i], arr);
                        }  
                    } 
                }
            }
            // TODO: Util 공통으로 이전해야 할듯
            function deepCopy(object) {
                if (object === null || typeof object !== "object") {
                  return object;
                }
                // 객체인지 배열인지 판단
                var copy = Array.isArray(object) ? [] : {};
               
                for (var key of Object.keys(object)) {
                  copy[key] = deepCopy(object[key]);
                }
                return copy;
              }
        };

        /**
         * 클래스(함수) 등록
         * key 를 별도 등록안하면 ns 를 fullName 으로 처리
         * @param {*} fun 
         * @param {*} p_ns fullname 또는 메임스페이스 
         * @param {*} key 
         * @returns 
         */
        MetaRegistry.registerClass = function(fun, p_ns, key) {
            var fullName;
            
            if (key) fullName = p_ns.length > 0 ? p_ns +'.'+ key : key;
            else fullName = p_ns;

            // 내장함수 제외
            if (_isBuiltFunction(fun)) return;
            if (typeof _global[fullName] === 'function') return;
            // 중복 검사 
            // if (!this.ns.get(fullName)) this.ns.set(p_ns, key, fun);
            if (!this.ns.find(fullName)) this.ns.register(fullName, fun);
        };
        
        /**
         * 클래스(함수) 해제
         * @param {*} fullName 
         * @returns 
         */
        MetaRegistry.releaseClass = function(fullName) {
            // 내장함수 & 전역 함수
            if (typeof _global[fullName] === 'function') return true;

            return this.ns.release(fullName);
        };
        
        /**
         * 클래스(함수) 조회
         * @param {*} fun 
         * @returns 
         */
        MetaRegistry.findClass = function(fun) {
            var fullName = fun.name;
            // 내장함수 & 전역 함수
            if (typeof _global[fullName] === 'function') return fullName;

            return this.ns.getPath(fun);
        };
        
        /**
         * 클래스(함수) 얻기
         * @param {*} fullName 
         * @returns 
         */
        MetaRegistry.getClass = function(fullName) {
            // 내장함수 & 전역 함수
            if (typeof _global[fullName] === 'function') return _global[fullName];

            return this.ns.find(fullName);
        };

        /**
         * 로드
         * @param {*} p_obj 
         * @param {*} p_parse 
         */
        MetaRegistry.loadMetaObject = function(p_obj, p_parse) {
            var obj = p_obj;
            var mObj;
            var meta;

            // TODO: metaObject 검사후 예외

            if (typeof obj === 'string') {
                if (typeof p_parse === 'function') obj = p_parse(obj);
                else obj = JSON.parse(obj, null);
            }

            if (this.has(obj)) return this.find(obj['_guid']);

            if (this.isGuidObject(obj)) {
                mObj = this.hasRefer(obj) ? this.transformRefer(obj) : p_obj;
                
                meta = this.createMetaObject(mObj);
                meta.setObject(mObj);
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