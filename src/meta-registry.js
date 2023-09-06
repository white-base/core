/**
 * namespace _L.Meta.MetaRegistry
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    // var MetaObject;
    var NamespaceManager;

    //==============================================================
    // 1. namespace declaration
    _global._L              = _global._L || {};
    _global._L.Meta         = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        NamespaceManager            = require('./namespace-manager').NamespaceManager;
    } else {
        NamespaceManager            = _global._L.NamespaceManager;
    }

    //==============================================================Á
    // 3. module dependency check
    if (typeof NamespaceManager === 'undefined') throw new Error('[NamespaceManager] module load fail...');

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
         * @member {string} _L.Meta.MetaRegistry#metaName
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
                || obj === Number || obj === String || obj === Boolean
                || obj === Object || obj === Array
                || obj === RegExp || obj === Date 
                || obj === Symbol || obj === BigInt
            )) return true;
            return false;
        }

        /**
         * 객체배열 리턴
         * @param {*} mObj 
         * @param {*} arr 
         * @returns 
         */
        MetaRegistry.__getObjectList = function(mObj, arr) {
            arr = arr || [];
            if (this.isGuidObject(mObj)) arr.push(mObj);
            for(let prop in mObj) {
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
                if (this.has(meta)) throw new Error('중복 메타 등록 _guid:' + meta._guid); 
                list.push(meta);
                
                _ns = meta['_ns'] || '';
                type = meta['_type'];
                key = type.name;
                fullName = meta['_ns'] && meta['_ns'].length > 0 ?  _ns +'.'+key : key;
                // this.ns.set(ns, key, type);
                // this.registerClass(_ns, key, type);
                this.registerClass(_ns, key, type);
            }
        };

        /**
         * 메타객체 해제
         * @param {*} target 
         * @returns {boolean}
         */
        MetaRegistry.release = function(target) {
            var guid = typeof target === 'string' ? target : target['_guid'];

            if (typeof guid !== 'string') return false;
            for(let i = 0; i < list.length; i++) {
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
            
            if (typeof guid !== 'string') return;
            for(let i = 0; i < list.length; i++) {
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
            for(let i = 0; i < list.length; i++) {
                if (list[i]._guid === guid) return list[i];
            }
        };
        
        /**
         * 메타 객체 생성
         * @param {*} mObj 
         * @returns 
         */
        MetaRegistry.createMetaObject = function(mObj) {
            /**
             * - ns 에서 대상 조회
             * - params 를 기준으로 파리머터 구성
             * - 생성 리턴
             */
            var args = [null];
            var type = mObj._type;
            var _ns = mObj._ns || '';
            var fullName =  _ns !== '' ? [_ns, type].join('.') : type;
            var instance;

            // var coClass = this.ns.get(fullName);
            var coClass = this.getClass(fullName);
            if (typeof coClass !== 'function') throw new Error('생성클래스가 존재하지 않습니다.  ' + fullName); 
            var params = coClass._PARAMS || []; // arr

            for (let i = 0; i < params.length; i++) {
                var argName = params[i];
                var prop = mObj[argName];
                var obj = this.isGuidObject(prop) ? this.find(prop['_guid']) : prop;
                if (mObj[argName]) args.push(obj);
            }
    
            instance = new (Function.prototype.bind.apply(coClass, args));
            // instance.setObject(mObj);

            return instance;
        };
        
        /**
         * 참조 객체 생성 : $ref
         * @param {object} meta 
         * @returns {object}
         */
        MetaRegistry.createReferObject = function(meta) {
            if (meta && meta._guid && meta._guid.length > 0 ) return { $ref: meta._guid };
        };

        /**
         * 네임스페이스 객체 생성 : $ns
         * @param {*} fun 
         * @returns 
         */
        MetaRegistry.createNsReferObject = function(fun) {
            var fullName;
            var ns, key;

            if (!this.findClass(fun)) {
                ns = fun._NS;
                key = fun.name;
                this.registerClass(ns, key, fun);
            }

            fullName = this.findClass(fun);
            if (typeof fullName === 'string' && fullName.length > 0) return { $ns: fullName };
            else throw new Error('네임스페이스에 클래스가 존재하지 않습니다.' + fun.name); 
        };

        
        
         

        

        /**
         * 메타 객체 유효성 검사
         * @param {*} rObj 
         * @returns 
         */
        MetaRegistry.validObject = function(rObj) {
            var _this = this;
            var arrObj = this.__getObjectList(rObj);

            if (validReference(rObj, arrObj) === false) return false;
            if (validCollection(rObj, arrObj) === false) return false;
            return true;

            // inner function
            function validReference(mObj, arr) {
                for(let prop in mObj) {
                    if (typeof mObj[prop] === 'object') {
                        if (mObj[prop]['$ref']) {
                            if (typeof findGuid(mObj[prop]['$ref'], arr) !== 'object') return false;
                        } else if (mObj[prop]['$ns']) {
                            // if (!_this.ns.get(mObj[prop]['$ns'])) return false;
                            if (!_this.getClass(mObj[prop]['$ns'])) return false;
                        } else {
                            if (validReference(mObj[prop], arr) === false) return false;
                        }
                    } else if (Array.isArray(mObj[prop])){
                      for(var i = 0; i < mObj[prop].length; i++) {
                        if (typeof mObj[prop][i] === 'object') {
                            if (validReference(mObj[prop][i], arr) === false) return false;
                        }
                      }  
                    }
                }
                return true;
            }
            function validCollection(mObj, arr) {
                for(let prop in mObj) {
                    if (typeof mObj[prop] === 'object') {
                        if (Array.isArray(mObj[prop]['_elem']) && Array.isArray(mObj[prop]['_key'])) {
                            if (mObj[prop]['_elem'].length !== mObj[prop]['_key'].length) return false;
                        } else {
                            if (validCollection(mObj[prop], arr) === false) return false;
                        }
                    } else if (Array.isArray(mObj[prop])){
                      for(var i = 0; i < mObj[prop].length; i++) {
                        if (typeof mObj[prop][i] === 'object') {
                            if (validCollection(mObj[prop][i], arr) === false) return false;
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
         * 참조 객체 여부 검사
         * @param {*} obj 
         * @returns 
         */
        MetaRegistry.hasRefer = function(obj) {
            if (typeof obj !== 'object') throw new Error('object 타입이 아닙니다.');
            if (!this.isGuidObject(obj)) throw new Error('guid 타입이 아닙니다.');

            return hasRefer(obj);

            // inner function
            function hasRefer(obj) {
                for(let prop in obj) {
                    if (typeof obj[prop] === 'object') {
                        if (obj[prop]['$ref'] && typeof obj[prop]['$ref'] === 'string') {
                            return true;
                        } else if (obj[prop]['$ns'] && typeof obj[prop]['$ns'] === 'string') {
                            return true;
                        } else {
                            if (hasRefer(obj[prop]) === true) return true;
                        }
                    } else if (Array.isArray(obj[prop])){
                      for(var i = 0; i < obj[prop].length; i++) {
                        if (typeof obj[prop][i] === 'object') {
                            if (hasRefer(obj[prop]) === true) return true;
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
        MetaRegistry.transformRefer = function(rObj) {
            var _this = this;
            var arrObj = this.__getObjectList(rObj);
            var clone = deepCopy(rObj);
            linkReference(clone, arrObj);

            return clone;
            // inner function
            function linkReference(obj, arr) {
                // inner function
                for(let prop in obj) {
                    if (obj[prop] === null) continue;
                    if (typeof obj[prop] === 'object') {
                        if (obj[prop]['$ref']) {
                            var ref = findGuid(obj[prop]['$ref'], arr);
                            if (typeof ref !== 'object') throw new Error('참조 연결 실패 $ref:' + obj[prop]['$ref']);
                            obj[prop] = ref;
                        } else if (obj[prop]['$ns']) {
                            // obj[prop] = _this.ns.get(obj[prop]['$ns']);
                            var ns = _this.getClass(obj[prop]['$ns']);
                            if (typeof ns !== 'function') throw new Error('참조 연결 실패 $ns:' + obj[prop]['$ns']);
                            obj[prop] = ns;
                        } else linkReference(obj[prop], arr);
                    } else if (Array.isArray(obj[prop])){
                        for(var i = 0; i < obj[prop].length; i++) {
                            if (typeof obj[prop][i] === 'object') linkReference(obj[prop][i], arr);
                        }  
                    } 
                }
            }
            function deepCopy(object) {
                if (object === null || typeof object !== "object") {
                  return object;
                }
                // 객체인지 배열인지 판단
                const copy = Array.isArray(object) ? [] : {};
               
                for (let key of Object.keys(object)) {
                  copy[key] = deepCopy(object[key]);
                }
               
                return copy;
              }
    
        };

        

        /**
         * 클래스(함수) 등록
         * @param {*} p_ns 
         * @param {*} key 
         * @param {*} fun 
         * @returns 
         */
        MetaRegistry.registerClass = function(p_ns, key, fun) {
            var fullName = p_ns.length > 0 ? p_ns+'.'+key : key;
            // 내장함수 제외
            if (_isBuiltFunction(fun)) return;
            // 중복 검사 
            // if (!this.ns.get(fullName)) this.ns.set(p_ns, key, fun);
            if (!this.ns.get(fullName)) this.ns.set(fullName, fun);
        };
        
        /**
         * 클래스(함수) 해제
         * @param {*} fullName 
         * @returns 
         */
        MetaRegistry.releaseClass = function(fullName) {
            // 내장함수 & 전역 함수
            if (typeof _global[fullName] === 'function') return true;

            return this.ns.del(fullName);
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

            return this.ns.find(fun);
        };
        
        /**
         * 클래스(함수) 얻기
         * @param {*} fullName 
         * @returns 
         */
        MetaRegistry.getClass = function(fullName) {
            // 내장함수 & 전역 함수
            if (typeof _global[fullName] === 'function') return _global[fullName];

            return this.ns.get(fullName);
        };

        /**
         * 로드
         * @param {*} p_obj 
         * @param {*} p_parse 
         */
        MetaRegistry.loading = function(p_obj, p_parse) {
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
            } else {
                throw new Error('[p_obj] 처리할 수 없는 타입입니다. ');
            }
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