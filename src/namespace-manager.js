/**
 * namespace _L.Meta
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
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
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
        IList                       = require('./i-list').IList;
        IListControl                = require('./i-control-list').IListControl;
        ISerialize                  = require('./i-serialize').ISerialize;
    } else {
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util;
        IList                       = _global._L.IList;
        IListControl                = _global._L.IListControl;
        ISerialize                  = _global._L.ISerialize;
    }
    
    
    //==============================================================Á
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IList === 'undefined') throw new Error(Message.get('ES011', ['IList', 'i-list']));
    if (typeof IListControl === 'undefined') throw new Error(Message.get('ES011', ['IListControl', 'i-control-list']));
    if (typeof ISerialize === 'undefined') throw new Error(Message.get('ES011', ['ISerialize', 'i-serialize']));

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
                    if (typeof val !== 'boolean') throw new ExtendError(/EL03311/, null, [typeof val]);
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
                if (!_validNamespace(ns)) throw new ExtendError(/EL03312/, null, [ns]);
                sections = ns.split('.');
            } else if (Array.isArray(ns)) {
                sections = ns;
            } else throw new ExtendError(/EL03313/, null, [typeof ns]);

            for (var i = 0; i < sections.length; i++) {
                var sName =sections[i];
                if (!_isString(sName)) throw new ExtendError(/EL03314/, null, [i, typeof sName]);
                if (!_validName(sName)) throw new ExtendError(/EL03315/, null, [i, sName]);
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
            var sections;
        
            try {
                sections = _getArray(p_ns);

                if (this.___KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1); // 최상위 에약어 제거
            
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (typeof parent[sections[i]] === 'undefined') {
                        parent[sections[i]] = this.__createNsRefer();
                    }
                    parent = parent[sections[i]];
                }

            } catch (error) {
                throw new ExtendError(/EL03321/, error, []);
            }
        };

        /**
         * 네임스페이스 해제
         * @param {string | array<string>} p_ns 
         */
        NamespaceManager.prototype.delNamespace = function(p_ns) {
            var parent = this.__storage;
            var sections;
        
            try {
                sections = _getArray(p_ns);

                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName] && parent[sName]['_type'] === 'ns') {
                        if (i === sections.length - 1) delete parent[sName];
                        else parent = parent[sName];
                    } else return;
                }
            } catch (error) {
                throw new ExtendError(/EL03322/, error, []);
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
            
            try {
                sections = _getArray(p_ns);

                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName] && parent[sName]['_type'] === 'ns') {
                        if (i === sections.length - 1) return parent[sName];    
                        parent = parent[sName];
                    } else return;
                }
                
            } catch (error) {
                throw new ExtendError(/EL03323/, error, []);
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
            var oPath;
            var key;
            var ns;

            try {
                oPath = this._getPathObject(p_fullName);
                key = oPath['key'];
                ns = oPath['ns'];
                sections = _getArray(ns);
    
                if (this._elemTypes.length > 0) Util.matchType([this._elemTypes], p_elem);
                if (!_validName(key)) throw new ExtendError(/EL03331/, null, [key]);
                if (!this.isOverlap && this.getPath(p_elem)) {
                    throw new ExtendError(/EL03332/, null, []);
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
                
            } catch (error) {
                throw new ExtendError(/EL03333/, error, []);
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

            try {
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
                
            } catch (error) {
                throw new ExtendError(/EL03334/, error, []);
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

            try {
                sections = _getArray(p_fullName);   // try undefined
                for (var i = 0; i < sections.length; i+=1) {
                    var sName = sections[i];
                    if (parent[sName]) {
                        if (i === sections.length - 1) return parent[sName];
                        else parent = parent[sName];
                    } else return;
                }
                
            } catch (error) {
                return;                
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

            if (!p_elem) throw new ExtendError(/EL03341/, null, [typeof p_elem]);

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

            try {
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
                
            } catch (error) {
                throw new ExtendError(/EL03342/, error, [error]);
            }
            
        };

        /**
         * 문자열 파싱해서 불러오기
         * @param {string} p_str output문자열
         * @param {function?} p_parse 
         */
        NamespaceManager.prototype.load = function(p_str, p_parse) {
            var arr = [];
            
            if (!_isString(p_str)) throw new ExtendError(/EL03343/, null, [typeof p_str]);
            
            try {
                if (typeof p_parse === 'function') arr = p_parse(p_str);
                else arr = JSON.parse(p_str, null);
                
                this.init();
                for (var i = 0; i < arr['list'].length; i++) {
                    var o = arr['list'][i];
                    var fun = o['elem'];
                    this.add(o['full'], fun);
                }

            } catch (error) {
                throw new ExtendError(/EL03344/, error, [error.message]);
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