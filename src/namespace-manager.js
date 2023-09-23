/**
 * namespace _L.Meta
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var IList;
    var IListControl;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
    } else {    
        Message                     = _global._L.Message;
    }

    //==============================================================Á
    // 3. module dependency check
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        IList                       = require('./i-list').IList;
        IListControl                = require('./i-control-list').IListControl;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        IList                       = _global._L.IList;
        IListControl                = _global._L.IListControl;
    }

    //==============================================================
    // 4. module implementation   
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IList === 'undefined') Message.error('ES011', ['IList', 'i-list']);
    if (typeof IListControl === 'undefined') Message.error('ES011', ['IListControl', 'i-control-list']);
    
    var NamespaceManager = (function () {
        /**
         * 네임스페이스 관리자
         * @constructs _L.Meta.NamespaceManager
         */
        function NamespaceManager() {

            var __storage = this.__createNsRefer();
            var _elemTypes  = []; 
            var isOverlap = false;
            // var __element = [];
            /**
             * __storage
             * @member {Array} _L.Meta.NamespaceManager#namespace 
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
            //  * @member {Array} _L.Meta.NamespaceManager#__element 
            //  */
            // Object.defineProperty(this, '__element',
            // {
            //     get: function() { return __element; },
            //     configurable: false,
            //     enumerable: true
            // });

            // /**
            //  * __path
            //  * @member {Array} _L.Meta.NamespaceManager#__path 
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
                configurable: false,
                enumerable: true,
            });


            /**
             * 목록 
             * @member {Array}  _L.Meta.NamespaceManager#list  
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
                        // if (target !== null && typeof target !== 'object') return;
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
                            // } else if (typeof ns === 'object') findElement(ns);
                            } else findElement(ns);

                            stack.pop();
                        }
                    }
                },
                configurable: false,
                enumerable: true,
            });

            /**
             * 갯수 
             * @member {Number} _L.Meta.NamespaceManager#count 
             */
            Object.defineProperty(this, 'count', {
                get: function() {
                    return this.list.length;
                },
                configurable: false,
                enumerable: true,
            });

            

            /**
             * 중복 요소 등록 여부
             * @member {boolean} _L.Meta.NamespaceManager#isOverlap
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

            Util.implements(this, IList, IListControl);
        }

        NamespaceManager._NS = 'Meta';    // namespace
        
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

        NamespaceManager.prototype._getPathObject = function(p_obj) {
            var fullName;
            var arr;
            var key;
            var nsPath;
            var obj = {};

            if (typeof p_obj === 'string') fullName = p_obj;
            else fullName = this.getPath(p_obj); 

            if (typeof fullName !== 'string') return;
            arr = fullName.split('.');
            key = arr.pop();
            nsPath = arr.join('.');
            obj['ns'] = nsPath;
            obj['key'] = key;

            return obj;
        };
        
        /**
         * 초기화
         */
        NamespaceManager.prototype.init = function() {
            this.__storage = this.__createNsRefer();
        };

        /**
         * 네임스페이스 등록
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.addNamespace = function(p_ns) {
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
        NamespaceManager.prototype.delNamespace = function(p_ns) {
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
        NamespaceManager.prototype.add = function(p_fullName, p_elem) {
            var parent = this.__storage;
            var sections;
            var key = this._getPathObject(p_fullName).key;
            var ns = this._getPathObject(p_fullName).ns;

            sections = __getArray(ns);
            if (this._elemTypes.length > 0) Util.validType(p_elem, this._elemTypes);
            if (sections.length > 0) this.addNamespace(ns);
            if (!__validName(key)) Message.error('ES054', [key, '__validName()']);
            if (!this.isOverlap && this.getPath(p_elem)) {
                Message.error('ES041', ['elem', '[isOverlap=false]']);
            }

            if (sections.length === 0) {    // 최상위 등록
                parent[key] = p_elem;
                return;
            }

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                // if (typeof parent[sName] === "undefined") parent[sName] = this.__createNsRefer();
                if (i === sections.length - 1) { 
                    parent[sName][key] = p_elem;
                } else parent = parent[sName];
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
         * 요소로 네임스페이스 여부
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.has = function(p_obj) {
            if (typeof p_obj === 'string' && this.find(p_obj)) return true;
            else if (typeof this.getPath(p_obj) === 'string') return true;
        
            return false;
        };

        /**
         * 네임스페이스 요소 얻기
         * @returns {*}
         */
        NamespaceManager.prototype.find = function(p_fullName) {
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



        
        
        /**
         * 요소로 네임스페이스 조회 (중복시 첫요소 리턴)
         * @param {string} p_ns
         * @param {boolean?} p_isFullName^
         * @returns {array} 네임스페이스 
         */
        NamespaceManager.prototype.getPath = function(p_elem) {
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

        



        NamespaceManager.prototype.output = function(p_stringify, p_space) {
            var arr = [];
            var obj;
            var str;

            for (var i = 0; i < this.list.length; i++) {
                var fullName = this.list[i];
                var fun = this.find(fullName);
                var nObj = this._getPathObject(fullName);
                obj = { ns: nObj.ns, key: nObj.key, full: fullName, elem: fun};
                arr.push(obj);
            }

            var temp ={ list: arr};
            // var temp = arr;

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
                else {
                    try {
                        arr = JSON.parse(p_obj, null);
                    } catch (error) {
                        Message.error('ES0110', [typeof p_obj, 'parse(...)', error]);
                    }
                }
            }
            if(Array.isArray(arr.list)) {
                for (var i = 0; i < arr.list.length; i++) {
                    var o = arr.list[i];
                    var fun = o.elem;
                    // this.set(o.ns, o.key, fun);
                    this.add(o.full, fun);
                }
            } else Message.error('ES022', [typeof p_obj]);
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