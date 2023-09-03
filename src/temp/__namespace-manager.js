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

            var __storage = this._getNsObject();
            var __element = [];

            /**
             * __storage
             * @member {Array} _L.Common.NamespaceManager#namespace 
             */
            Object.defineProperty(this, '__storage',
            {
                get: function() { return __storage; },
                set: function(val) { __storage = val; },
                configurable: false,
                enumerable: true
            });
            /**
             * __element
             * @member {Array} _L.Common.NamespaceManager#__element 
             */
            Object.defineProperty(this, '__element',
            {
                get: function() { return __element; },
                configurable: false,
                enumerable: true
            });

            this.__symbol = ['namespace', 'ns', 'NS'];
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
         * 네임스페이스 기본객체
         */
        NamespaceManager.prototype._getNsObject = function() {
            return { _type: 'NS' };
        };
        /**
         * 키 기본객체
         */
        // NamespaceManager.prototype._getKeyObject = function() {
        //     return { _type: 'KEY' };
        // };

        /**
         * 초기화
         */
        NamespaceManager.prototype.init = function() {
            this.__storage = this._getNsObject();
        };

        NamespaceManager.prototype.getPath = function(p_ns) {
            // TODO:
        };
        NamespaceManager.prototype.hasPath = function(p_ns) {
            // TODO:
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
                    parent[sections[i]] = this._getNsObject();
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
                if (i === sections.length - 1) delete parent[sName];
                else parent = parent[sName];
            }
        };

        /**
         * 네임스페이스에 요소 설정
         * 네임스피이스 
         */
        NamespaceManager.prototype.set = function(p_ns, p_key, p_elem) {
            var parent = this.__storage;
            var sections;
            var oElem;

            // 내장 함수 제외
            if (_isBuiltFunction(p_elem)) return;

            sections = __getArray(p_ns);
            oElem = this._getNsObject();
            
            if (sections.length > 0) this.register(p_ns);
            if (!__validName(p_key)) throw new Error('They have different [p_key] conventions.'); 
            oElem[p_key] = p_elem;        
        
            if (sections.length === 0) {    // 최상위 등록
                parent[p_key] = p_elem;
                return;
            }

            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (typeof parent[sName] === "undefined") parent[sName] = this._getNsObject();
                if (i === sections.length - 1) { 
                    parent[sName] = oElem;
                    this.__element.push(oElem);
                } else parent = parent[sName];
            }
        };

        NamespaceManager.prototype.del = function(p_fullName) {
            // TODO:
        };


        /**
         * 네임스페이스 요소 얻기
         * @returns {*}
         */
        NamespaceManager.prototype.get = function(p_fullName) {
            var parent = this.__storage;
            var sections;

            // 내장함수 & 전역 함수
            if (typeof _global[p_fullName] === 'function') return _global[p_fullName];

            sections = __getArray(p_fullName);
            for (var i = 0; i < sections.length; i+=1) {
                var sName = sections[i];
                if (i === sections.length - 1) return parent[sName];
                else parent = parent[sName];
            }
        };


        /**
         * 요소로 네임스페이스 조회
         * @param {string} p_ns
         * @param {boolean?} p_isFullName
         * @returns {array} 네임스페이스 
         */
        NamespaceManager.prototype.find = function(p_elem, p_isFullName) {
            var namespace = this.__storage;
            var stack = [];
            var ns;
            // 내장 함수 제외
            if (_isBuiltFunction(p_elem)) return p_elem.name;

            if (findElement(namespace)) {
                ns = p_isFullName === true ? stack.join('.') : stack.pop();
                return ns;
            } else return;

            // inner function
            function findElement(target) { 
                for(var prop in target) {
                    var obj = target[prop];
                    if (obj === 'NS') continue;
                    if (obj && obj['_type'] === 'NS') {
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
        NamespaceManager.prototype.has = function(p_elem) {
            if (typeof this.find(p_elem) === 'string') return true;
            return false;
        };

        // NamespaceManager.prototype.getNamespace = function() {
        //     this.__storage;
        // };

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