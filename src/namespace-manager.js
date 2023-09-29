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
    var ISerialize;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        IList                       = require('./i-list').IList;
        IListControl                = require('./i-control-list').IListControl;
        ISerialize                  = require('./i-serialize').ISerialize;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        IList                       = _global._L.IList;
        IListControl                = _global._L.IListControl;
        ISerialize                  = _global._L.ISerialize;
    }
    
    
    //==============================================================Á
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IList === 'undefined') Message.error('ES011', ['IList', 'i-list']);
    if (typeof IListControl === 'undefined') Message.error('ES011', ['IListControl', 'i-control-list']);
    if (typeof ISerialize === 'undefined') Message.error('ES011', ['ISerialize', 'i-serialize']);

    //==============================================================
    // 4. module implementation   
    var NamespaceManager = (function () {
        /**
         * 네임스페이스 관리자
         * @constructs _L.Meta.NamespaceManager
         */
        function NamespaceManager() {

            var __storage = this.__createNsRefer();
            var _elemTypes  = []; 
            var isOverlap = false;
            
            /**
             * 네임스페이스 저장소
             * @member {Array} _L.Meta.NamespaceManager#namespace 
             */
            Object.defineProperty(this, '__storage',
            {
                get: function() { return __storage; },
                configurable: false,
                enumerable: false
            });

            /** 
             * 요소타입 
             * @member {Observer}  _L.Collection.NamespaceManager#_elemTypes  
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
             * 목록 
             * @member {Array}  _L.Meta.NamespaceManager#list  
             */
            Object.defineProperty(this, 'list', 
            {
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
             * 네임스페이스 갯수 
             * @member {Number} _L.Meta.NamespaceManager#count 
             */
            Object.defineProperty(this, 'count', 
            {
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

            // inner variable access
            this.__SET$__storage = function(val, call) {
                if (call instanceof NamespaceManager) __storage = val;
            }

            this.__KEYWORD = ['namespace', 'ns', 'NS', '_type'];    // 금지단어

            Util.implements(this, IList, IListControl);
        }
        NamespaceManager._NS = 'Meta';    // namespace
        
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
                if (!_validNamespace(ns)) Message.error('ES042', [ns, '_validNamespace()']);
                sections = ns.split('.');
            } else if (Array.isArray(ns)) sections = ns;
            else Message.error('ES021', ['ns', 'string, array']);
            return sections;
        }
        
        /**
         * 네임스페이스 기본객체
         * @returns {object}
         */
        NamespaceManager.prototype.__createNsRefer = function() {
            return { _type: 'ns' };
        };

        /**
         * 객체 또는 문자열을 객체타입으로 얻기
         * @param {string | object} p_any 
         * @returns 
         */
        NamespaceManager.prototype._getPathObject = function(p_any) {
            var fullName;
            var arr;
            var key;
            var nsPath;
            var obj = {};

            if (_isString(p_any)) fullName = p_any;
            else fullName = this.getPath(p_any); 

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
            this.__SET$__storage(this.__createNsRefer(), this);
        };

        /**
         * 네임스페이스 등록
         * @param {string | array<string>} p_ns 
         */
        NamespaceManager.prototype.addNamespace = function(p_ns) {
            var parent = this.__storage;
            var sections = Array.isArray(p_ns) ? p_ns : _getArray(p_ns);
        
            // 최상위 에약어 제거
            if (this.__KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1);
        
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (!_isString(sName)) Message.error('ES021', ['sName', 'string']);
                if (!_validName(sName)) Message.error('ES054', [sName, '_validName()']);
                if (typeof parent[sections[i]] === 'undefined') {
                    parent[sections[i]] = this.__createNsRefer();
                }
                parent = parent[sections[i]];
            }
        };

        /**
         * 네임스페이스 해제
         * @param {string | array<string>} p_ns 
         */
        NamespaceManager.prototype.delNamespace = function(p_ns) {
            var parent = this.__storage;
            var sections = Array.isArray(p_ns) ? p_ns : _getArray(p_ns);
        
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (!_isString(sName)) Message.error('ES021', ['sName', 'string']);
                if (parent[sName] && parent[sName]['_type'] === 'ns') {
                    if (i === sections.length - 1) delete parent[sName];
                    else parent = parent[sName];
                } else return;
            }
        };

        /**
         * 네임스페이스 경로 얻기
         * @param {string} p_ns 
         * @returns {object} 경로데 대한 객체
         */
        NamespaceManager.prototype.path = function(p_ns) {
            var parent = this.__storage;
            var sections;

            if (!p_ns) return parent;
            
            sections = _getArray(p_ns);
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (parent[sName] && parent[sName]['_type'] === 'ns') {
                    if (i === sections.length - 1) return parent[sName];    
                    parent = parent[sName];
                } else return;
            }
        };

        /**
         * 네임스페이스에 요소 추가
         * @param {string} p_fullName 
         * @param {any} p_elem 
         * @returns 
         */
        NamespaceManager.prototype.add = function(p_fullName, p_elem) {
            var parent = this.__storage;
            var sections;
            var oPath = this._getPathObject(p_fullName);
            var key = oPath['key'];
            var ns = oPath['ns'];

            sections = _getArray(ns);
            if (this._elemTypes.length > 0) Util.validType(p_elem, this._elemTypes);
            if (!_validName(key)) Message.error('ES054', [key, '_validName()']);
            if (!this.isOverlap && this.getPath(p_elem)) {
                Message.error('ES041', ['elem', '[isOverlap=false]']);
            }
            
            if (sections.length > 0) this.addNamespace(ns);
            if (sections.length === 0) {    // 최상위 등록
                parent[key] = p_elem;
                return;
            }

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (i === sections.length - 1) { 
                    parent[sName][key] = p_elem;
                } else parent = parent[sName];
            }
        };

        NamespaceManager.prototype.del = function(p_fullName) {
            var parent = this.__storage;
            var sections;

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
        };

        /**
         * 요소로 네임스페이스 여부
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.has = function(p_obj) {
            if (_isString(p_obj) && this.find(p_obj)) return true;
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

            sections = _getArray(p_fullName);
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
            var temp ={list: arr};

            for (var i = 0; i < this.list.length; i++) {
                var fullName    = this.list[i];
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
        };

        // string | arr<list>  ... 검사
        NamespaceManager.prototype.load = function(p_obj, p_parse) {
            var arr = p_obj;
            
            this.init();
            if (typeof arr === 'string') {
                try {
                    if (typeof p_parse === 'function') arr = p_parse(p_obj);
                    else arr = JSON.parse(p_obj, null);
                } catch (error) {
                    Message.error('ES0110', [typeof p_obj, 'parse(...)', error]);
                }
            }
            if(Array.isArray(arr['list'])) {
                for (var i = 0; i < arr['list'].length; i++) {
                    var o = arr['list'][i];
                    var fun = o['elem'];
                    this.add(o['full'], fun);
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