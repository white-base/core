/**
 * namespace _L.Common
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;

    //==============================================================
    // 1. namespace declaration
    _global._L                  = _global._L || {};
    _global._L.Common           = _global._L.Common || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                 = require('./message').Message;
    } else {    
        Message                 = _global._L.Message;
    }

    //==============================================================Á
    // 3. module dependency check

    //==============================================================
    // 4. module implementation   
    
    var NamespaceManager = (function () {
        /**
         * 네임스페이스 관리자
         * @constructs _L.Common.NamespaceManager
         */
        function NamespaceManager() {

            var __storage = this.__createNsRefer();
            var _elemTypes  = []; 
            var isOverlap = false;
            // var __element = [];
            /**
             * __storage
             * @member {Array} _L.Common.NamespaceManager#namespace 
             */
            Object.defineProperty(this, '__storage',
            {
                get: function() { return __storage; },
                set: function(val) { __storage = val; },
                configurable: false,
                enumerable: false
            });
            // /**
            //  * __element
            //  * @member {Array} _L.Common.NamespaceManager#__element 
            //  */
            // Object.defineProperty(this, '__element',
            // {
            //     get: function() { return __element; },
            //     configurable: false,
            //     enumerable: true
            // });

            // /**
            //  * __path
            //  * @member {Array} _L.Common.NamespaceManager#__path 
            //  */
            // Object.defineProperty(this, '__path',
            // {
            //     get: function() { 
            //         return listPath(this.__storage); 
            //         // inner function
            //         function listPath(target) {
            //             var arr = [];
            //             if (target['_type'] === 'ns') arr.push(target);
            //             for(var prop in target){
            //                 var path = target[prop];
            //                 if (prop === '_type' || prop === '_elem') continue;
            //                 if (typeof path === 'object') arr = arr.concat(listPath(path));
            //             }
            //             return arr;
            //         }
            //     },
            //     configurable: false,
            //     enumerable: false
            // });

            /** 
             * 요소타입
             * @member {Observer}  _L.Collection.NamespaceManager#_elemTypes  
             */
            Object.defineProperty(this, '_elemTypes', {
                get: function() {
                    return _elemTypes;
                },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    _elemTypes = arrType;
                },
                enumerable: true,
                configurable: false
            });


            /**
             * 목록 
             * @member {Array}  _L.Common.NamespaceManager#list  
             */
            Object.defineProperty(this, 'list', {
                get: function() {
                    var storage = this.__storage;
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
                                // for (var key in ns) {
                                //     arr.push([stack.join('.'), key].join('.'));
                                // }
                                // arr.push([stack.join('.'), prop].join('.'));
                                arr.push(stack.join('.'));
                            } else if (typeof ns === 'object') findElement(ns);

                            stack.pop();
                        }
                    }
                },
                enumerable: true,
                configurable: false
            });

            /**
             * 갯수 
             * @member {Number} _L.Common.NamespaceManager#count 
             */
            Object.defineProperty(this, 'count', {
                get: function() {
                    return this.list.length;
                },
                enumerable: true,
                configurable: false
            });

            

            /**
             * 중복 요소 등록 여부
             * @member {boolean} _L.Common.NamespaceManager#isOverlap
             */
            Object.defineProperty(this, 'isOverlap',
            {
                get: function() { return isOverlap; },
                set: function(val) { 
                    if (typeof val !== 'boolean') Message.error('ES021', ['isOverlap', 'boolean']);
                    isOverlap = val;
                },
                configurable: false,
                enumerable: true
            });

            this.__KEYWORD = ['namespace', 'ns', 'NS', '_type'];
        }

        NamespaceManager._NS = 'Common';    // namespace
        
        // private 메소드
        function __validNamespace(p_name) {
            var regex = /^[_a-zA-Z]([.]?[_0-9a-zA-Z])*$/;
            return regex.test(p_name)
        }
        function __validName(p_name) {
            var regex = /^[_a-zA-Z]([_0-9a-zA-Z])*$/;
            return regex.test(p_name)
        }
        function __getArray(p_ns) {
            var sections = [];
            if (p_ns === '') return sections;
            if (typeof p_ns === 'string') {
                if (!__validNamespace(p_ns)) Message.error('ES042', [p_ns, '__validNamespace()']);
                sections = p_ns.split('.');
            } else if (Array.isArray(p_ns)) sections = p_ns;
            else Message.error('ES021', ['ns', 'string, array']);
            return sections;
        }
        
        /**
         * 네임스페이스 기본객체
         */
        NamespaceManager.prototype.__createNsRefer = function() {
            return { _type: 'ns' };
        };

        /**
         * 초기화
         */
        NamespaceManager.prototype.init = function() {
            this.__storage = this.__createNsRefer();
        };

        /**
         * 네임스페이스 등록
         * TODO: 등록시 참조 목록에 등록해 둔다. (조회시 단순해짐)
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.register = function(p_ns) {
            var parent = this.__storage;
            var sections = __getArray(p_ns);
        
            // 에약어 제거
            if (this.__KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1);
        
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (!__validName(sName)) Message.error('ES054', [sName, '__validName()']);
                if (typeof parent[sections[i]] === "undefined") {
                    parent[sections[i]] = this.__createNsRefer();
                }
                parent = parent[sections[i]];
            }
        };

        /**
         * 네임스페이스 해제
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.release = function(p_ns) {
            var parent = this.__storage;
            var sections = __getArray(p_ns);
        
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName] && parent[sName]['_type'] === 'ns') {
                    if (i === sections.length - 1) delete parent[sName];
                    else parent = parent[sName];
                } else return;
            }
        };

        /**
         * 네임스페이스 경로 얻기
         * @param {*} p_ns 
         * @returns 
         */
        NamespaceManager.prototype.path = function(p_ns) {
            var parent = this.__storage;
            var sections;

            if (!p_ns) return parent;

            sections = __getArray(p_ns);
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName] && parent[sName]['_type'] === 'ns') {
                    if (i === sections.length - 1) return parent[sName];    
                    parent = parent[sName];
                } else return;
            }
        };

        /**
         * 네임스페이스에 요소 설정
         * 네임스피이스 
         */
        // NamespaceManager.prototype.set = function(p_ns, p_key, p_elem) {
        NamespaceManager.prototype.set = function(p_fullName, p_elem) {
            var parent = this.__storage;
            var sections;
            var key = this._getPath(p_fullName).key;
            var ns = this._getPath(p_fullName).ns;

            sections = __getArray(ns);
            
            if (sections.length > 0) this.register(ns);
            if (!__validName(key)) Message.error('ES054', [key, '__validName()']);
            if (!this.isOverlap && this.find(p_elem)) {
                Message.error('ES041', ['elem', '[isOverlap=false]']);
            }

            if (sections.length === 0) {    // 최상위 등록
                parent[key] = p_elem;
                return;
            }

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (typeof parent[sName] === "undefined") parent[sName] = this.__createNsRefer();
                if (i === sections.length - 1) { 
                    parent[sName][key] = p_elem;
                } else parent = parent[sName];
            }
        };

        // NamespaceManager.prototype.get2 = function(p_fullName) {
        //     // var parent = this.__storage;
        //     var sections;

        //     sections = __getArray(p_fullName);
        //     var o = getElem(this.__storage, sections);
        //     return o;

        //     // inner function
        //     function getElem(elem, sec) {
        //         // var section = sec.length === 0 ? sec.slice(0) : sec.slice(1);
        //         var section = sec.slice(0, 1);
        //         var n_section = sec.slice(1);
        //         var obj;

        //         if (elem[section[0]]) {
        //             if (elem[section[0]]['_type'] === 'ns') obj = getElem(elem[section[0]], sec.slice(1));
        //             else obj = elem[section[0]];
        //         }
        //         return obj;
        //     }
        // };
        /**
         * 네임스페이스 요소 얻기
         * @returns {*}
         */
        NamespaceManager.prototype.get = function(p_fullName) {
            var parent = this.__storage;
            var sections;

            sections = __getArray(p_fullName);
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName]) {
                    if (i === sections.length - 1) return parent[sName];
                    else parent = parent[sName];
                } else return;
            }
        };



        NamespaceManager.prototype.del = function(p_fullName) {
            var parent = this.__storage;
            var sections;

            sections = __getArray(p_fullName);
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName]) {
                    if (i === sections.length - 1) {
                        delete parent[sName];
                        return true;
                    } else parent = parent[sName];
                } else return false;
            }
        };

        /**
         * 요소로 네임스페이스 조회
         * @param {string} p_ns
         * @param {boolean?} p_isFullName^
         * @returns {array} 네임스페이스 
         */
        NamespaceManager.prototype.find = function(p_elem) {
            var namespace = this.__storage;
            var stack = [];

            if (findElement(namespace)) {
                return stack.join('.');
            } else return;

            // inner function
            function findElement(target) { 
                for(var prop in target) {
                    var obj = target[prop];
                    if (obj === 'ns') continue;
                    if (obj && obj['_type'] === 'ns') {
                        stack.push(prop);
                        if(findElement(obj)) return true;
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
         * 요소로 네임스페이스 여부
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.has = function(p_obj) {
            if (typeof p_obj === 'string' && this.get(p_obj)) return true;
            else if (typeof this.find(p_obj) === 'string') return true;
        
            return false;
        };

        NamespaceManager.prototype._getPath = function(p_obj) {
            var fullName;
            var arr;
            var key;
            var nsPath;
            var obj = {};

            if (typeof p_obj === 'string') fullName = p_obj;
            else fullName = this.find(p_obj); 

            if (typeof fullName !== 'string') return;
            arr = fullName.split('.');
            key = arr.pop();
            nsPath = arr.join('.');
            obj['ns'] = nsPath;
            obj['key'] = key;

            return obj;
        };

        NamespaceManager.prototype.output = function(p_stringify, p_space) {
            var arr = [];
            var obj;
            var str;

            for (var i = 0; i < this.list.length; i++) {
                var fullName = this.list[i];
                var fun = this.get(fullName);
                var nObj = this._getPath(fullName);
                obj = { ns: nObj.ns, key: nObj.key, full: fullName, f: fun};
                arr.push(obj);
            }

            var temp ={ arr: arr};

            if (typeof p_stringify === 'function') str = p_stringify(temp, {space: p_space} );
            else str = JSON.stringify(temp, null, p_space);
            return str;
        };

        NamespaceManager.prototype.load = function(p_obj, p_parse) {
            var arr = p_obj;
            
            this.init();
            if (typeof arr === 'string') {
                // if (typeof p_parse === 'function') arr = p_parse(p_obj, {lazyEval: false});
                if (typeof p_parse === 'function') arr = p_parse(p_obj);
                else arr = JSON.parse(p_obj, null);
            }
            if(Array.isArray(arr.arr)) {
                for (var i = 0; i < arr.arr.length; i++) {
                    var o = arr.arr[i];
                    var fun = o.f;
                    // this.set(o.ns, o.key, fun);
                    this.set(o.full, fun);
                }
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
        _global._L.Common.NamespaceManager = NamespaceManager;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));