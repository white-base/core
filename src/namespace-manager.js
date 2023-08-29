/**
 * namespace _L.Common
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L              = _global._L || {};
    _global._L.Common       = _global._L.Common || {};

    //==============================================================
    // 2. import module

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

            var __storage = this.__createNsObject();
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
             * 요소타입
             * @member {Observer}  _L.Common.NamespaceManager#elementType  
             */
            Object.defineProperty(this, 'elementType', {
                get: function() {
                    return _elementType;
                },
                set: function(val) {
                    var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                    _elementType = arrType;
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
                configurable: false,
                enumerable: true
            });

            this.__symbol = ['namespace', 'ns', 'NS', '_type'];
        }
        
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
                if (!__validNamespace(p_ns)) throw new Error('They have different [p_ns] conventions.'); 
                sections = p_ns.split('.');
            } else if (Array.isArray(p_ns)) sections = p_ns;
            else throw new Error('Only [p_ns] type "string, array" can be added'); 
            return sections;
        }
        // function _isBuiltFunction(obj) {
        //     if (typeof obj === 'function' && (false 
        //         || obj === Number || obj === String || obj === Boolean
        //         || obj === Object || obj === Array
        //         || obj === RegExp || obj === Date 
        //         || obj === Symbol || obj === BigInt
        //     )) return true;
        //     return false;
        // }
        
        /**
         * 네임스페이스 기본객체
         */
        NamespaceManager.prototype.__createNsObject = function() {
            return { _type: 'ns' };
        };
        /**
         * 키 기본객체
         */
        // NamespaceManager.prototype.__createElemObject = function() {
        //     return { _type: 'elem', name: '', value: null };
        // };

        /**
         * 초기화
         */
        NamespaceManager.prototype.init = function() {
            this.__storage = this.__createNsObject();
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
            if (this.__symbol.indexOf(sections[0]) > -1) sections = sections.slice(1);
        
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (!__validName(sName)) throw new Error('They have different [section name] conventions.'); 
                if (typeof parent[sections[i]] === "undefined") {
                    parent[sections[i]] = this.__createNsObject();
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
        NamespaceManager.prototype.set = function(p_ns, p_key, p_elem) {
            var parent = this.__storage;
            var sections;
            // var oElem;

            // 내장함수 제외
            // if (_isBuiltFunction(p_elem)) return;

            sections = __getArray(p_ns);
            // oElem = this.__createNsObject();
            
            if (sections.length > 0) this.register(p_ns);
            if (!__validName(p_key)) throw new Error('They have different [p_key] conventions.'); 
            // oElem[p_key] = p_elem;        
        
            if (sections.length === 0) {    // 최상위 등록
                parent[p_key] = p_elem;
                return;
            }

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (typeof parent[sName] === "undefined") parent[sName] = this.__createNsObject();
                if (i === sections.length - 1) { 
                    parent[sName][p_key] = p_elem;
                    // parent[sName] = oElem;
                    // this.__element.push(oElem);
                } else parent = parent[sName];
            }
        };

        /**
         * 네임스페이스 요소 얻기
         * @returns {*}
         */
        NamespaceManager.prototype.get = function(p_fullName) {
            var parent = this.__storage;
            var sections;

            // 내장함수 & 전역 함수
            // if (typeof _global[p_fullName] === 'function') return _global[p_fullName];

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

            // 내장함수 & 전역 함수
            // if (typeof _global[p_fullName] === 'function') return _global[p_fullName];

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

            // 내장 함수 제외
            // if (_isBuiltFunction(p_elem)) return p_elem.name;

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


        // NamespaceManager.prototype.__getPath = function(p_obj) {
        //     var namespace = this.__storage;
        //     var stack = [];
        //     var ns;

        //     if (getPath(namespace)) {
        //         ns = p_isFullName === true ? stack.join('.') : stack.pop();
        //     }
        //     return stack;

        //     // inner function
        //     function getPath(target) {
        //         // if (target['_type'] === 'ns')
        //         for(var prop in target) {
        //             var obj = target[prop];
                    
                    
        //             if (prop === '_type' || prop === '_type') continue;
                    
                    
                    
        //             if (typeof obj === 'object' && obj['_type'] === 'ns') {
        //                 stack.push(prop);
                        
        //                 if(getPath(obj)) return true;
        //             } else {
        //                 if (obj === p_elem) {
        //                     stack.push(prop);
        //                     return true;
        //                 }
        //             }
        //         }
        //         stack.pop();
        //         return false;
        //     }
        // };

        /**
         * 요소로 네임스페이스 여부
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.has = function(p_obj) {
            if (typeof p_obj === 'string') {
                if (this.get(p_obj)) return true;
            } else {
                if (typeof this.find(p_obj) === 'string') return true;
            }
            
            return false;
        };

        NamespaceManager.prototype.output = function() {
            // TODO:
        };
        NamespaceManager.prototype.load = function() {
            // TODO:
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