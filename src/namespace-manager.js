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

            this.___KEYWORD = ['namespace', 'ns', 'NS', '_type'];    // 금지단어

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
                if (!_validNamespace(ns)) Message.error('ES042', [ns, '_validNamespace()']);
                sections = ns.split('.');
            } else if (Array.isArray(ns)) {
                sections = ns;
            } else Message.error('ES021', ['ns', 'string, array']);
            for (var i = 0; i < sections.length; i++) {
                var sName =sections[i];
                if (!_isString(sName)) Message.error('ES021', ['ns<array>', 'string']);
                if (!_validName(sName)) Message.error('ES054', [sName, '_validName()']);
            }
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
         * @param {string | object} p_elem 
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
            var sections = _getArray(p_ns);
        
            if (this.___KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1); // 최상위 에약어 제거
        
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
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
            var sections = _getArray(p_ns);
        
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
         * @param {string | array<sting>} p_ns 
         * @returns {object} 경로에 대한 객체
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
         * 네임스페이스에 요소(함수/클래스) 추가
         * @param {string} p_fullName 
         * @param {any} p_elem 
         */
        NamespaceManager.prototype.add = function(p_fullName, p_elem) {
            var parent = this.__storage;
            var sections;
            var oPath = this._getPathObject(p_fullName);
            var key = oPath['key'];
            var ns = oPath['ns'];

            sections = _getArray(ns);
            if (this._elemTypes.length > 0) Util.matchType([this._elemTypes], p_elem);
            if (!_validName(key)) Message.error('ES054', [key, '_validName()']);
            if (!this.isOverlap && this.getPath(p_elem)) {
                Message.error('ES041', ['elem', '[isOverlap=false]']);
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
        };

        /**
         * 네임스페이스에 등록된 요소(함수/클래스) 삭제
         * @param {string} p_fullname 
         * @returns {boolean}
         */
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
         * @param {string | any} p_elem 경로 | 객체
         * @returns {boolean}
         */
        NamespaceManager.prototype.has = function(p_elem) {
            if (_isString(p_elem) && this.find(p_elem)) return true;
            else if (typeof this.getPath(p_elem) === 'string') return true;
            return false;
        };

        /**
         * 네임스페이스 요소 얻기
         * @param {string | array<string>} p_fullName 
         * @returns {any?}
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
         * 요소로 네임스페이스 경로 조회 (중복시 첫요소 리턴)
         * @param {any} p_elem 
         * @returns {string?}
         */
        NamespaceManager.prototype.getPath = function(p_elem) {
            var namespace = this.__storage;
            var stack = [];

            if (!p_elem) Message.error('ES051', ['p_elem']);

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
         * 네임스페이스 문자열로 내보내기
         * @param {function?} p_stringify 
         * @param {string?} p_space 
         * @returns {string}
         */
        NamespaceManager.prototype.output = function(p_stringify, p_space) {
            var arr = [];
            var obj;
            var str;
            var temp = {list: arr};

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

        /**
         * 문자열 파싱해서 불러오기
         * @param {string} p_str output문자열
         * @param {function?} p_parse 
         */
        NamespaceManager.prototype.load = function(p_str, p_parse) {
            var arr = [];
            
            if (!_isString(p_str)) Message.error('ES021', ['p_str', 'string']);
            
            try {
                if (typeof p_parse === 'function') arr = p_parse(p_str);
                else arr = JSON.parse(p_str, null);
            } catch (error) {
                Message.error('ES0110', [typeof p_str, 'parse(...)', error]);
            }

            this.init();
            for (var i = 0; i < arr['list'].length; i++) {
                var o = arr['list'][i];
                var fun = o['elem'];
                this.add(o['full'], fun);
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