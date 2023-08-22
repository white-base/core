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

            // var namespace = {};

            /**
             * namespace
             * @member {Array} _L.Common.NamespaceManager#namespace 
             */
            Object.defineProperty(this, 'namespace',
            {
                get: function() { 
                    var ns = {};
                    for (var prop in this) {
                        if (this.__symbol_ns.indexOf(prop) < 0 && typeof this[prop] === 'object') {
                            ns[prop] = this[prop];
                        }
                    }
                    return ns;
                },
                configurable: false,
                enumerable: true
            });

            // inner variable access
            // this.__SETnamespace = function(val, call) {
            //     if (call instanceof NamespaceManager) namespace = val;
            // }

            this.__symbol_ns = ['namespace', 'ns', 'NS', '__symbol_ns','__symbol'];
            this.__symbol = ['init', 'register', 'release', 'setElement', 'getElement'];
        }

        /**
         * 초기화
         */
        NamespaceManager.prototype.init = function() {
            // this.__SETnamespace({});
        };

        /**
         * 네임스페이스 등록
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.register = function(p_ns) {
            var parent = this;

            var sections, i;
        
            if (typeof p_ns === 'string') sections = p_ns.split('.');
            else if (Array.isArray(p_ns)) sections = p_ns;
        
            // 에약어 제거
            if (this.__symbol_ns.indexOf(sections[0]) > -1) sections = sections.slice(1);
            
        
            for (i = 0; i < sections.length; i+=1) {
                if (typeof parent[sections[i]] === "undefined") {
                    parent[sections[i]] = {};
                }
                parent = parent[sections[i]];
            }
        };

        /**
         * 네임스페이스 해제
         * @param {string | array} p_ns 
         */
        NamespaceManager.prototype.release = function(p_ns) {
            var parent = this.namespace;
            var sections;
        
            if (typeof p_ns === 'string') sections = p_ns.split('.');
            else if (Array.isArray(p_ns)) sections = p_ns;
        
            for (var i = 0; i < sections.length; i+=1) {
                if (i === sections.length - 1) parent[sections[i]] = {};
                else parent = parent[sections[i]];
            }
        };

        /**
         * 네임스페이스에 요소 설정
         */
        NamespaceManager.prototype.setElement = function(p_ns, p_elem) {
            var parent = this.namespace;
            var sections;	
        
            this.register(p_ns);
        
            if (typeof p_ns === 'string') sections = p_ns.split('.');
            else if (Array.isArray(p_ns)) sections = p_ns;
        
            for (var i = 0; i < sections.length; i+=1) {
                if (typeof parent[sections[i]] === "undefined") {
                    parent[sections[i]] = {};
                }
                if (i === sections.length - 1) parent[sections[i]] = p_value;
                else parent = parent[sections[i]];
            }
        };

        /**
         * 네임스페이스 요소 얻기
         * @returns {*}
         */
        NamespaceManager.prototype.getElement = function(p_ns) {
            var parent = this.namespace;
            var sections;
        
            if (typeof p_ns === 'string') sections = p_ns.split('.');
            else if (Array.isArray(p_ns)) sections = p_ns;
        
            for (var i = 0; i < sections.length; i+=1) {
                if (i === sections.length - 1) return parent[sections[i]];
                else parent = parent[sections[i]];
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