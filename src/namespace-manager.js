/**** namespace-manager.js | NamespaceManager ****/
//==============================================================
// import module
import Message from './message.js';    
import ExtendError from './extend-error.js';    
import Type from './type.js';
import Util from './util.js';
import IList from './i-list.js';
import IListControl from './i-control-list.js';
import ISerialize from './i-serialize.js';

//==============================================================
// module implementation   
var NamespaceManager = (function () {
    /**
     * Create a Namespace Manager.  
     * 
     * @constructs NamespaceManager
     */
    function NamespaceManager() {

        var $storage = this.$createNsRefer();
        var _elemTypes  = []; 
        var allowOverlap = false;
        
        
        /**
         * Namespace repository  
         * 
         * @member {string} NamespaceManager#$storage
         * @readonly
         * @private
         */
        Object.defineProperty(this, '$storage',
        {
            get: function() { return $storage; },
            set: function(nVal) { $storage = nVal; },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Namespace element type list.  
         * Allow all types if empty.  
         * 
         * @member {array<any>}  NamespaceManager#_elemTypes  
         * @protected
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
         * Namespace element list.  
         * 
         * @member {array<string>}  NamespaceManager#_list
         * @readonly
         */
        Object.defineProperty(this, '_list', 
        {
            get: function() {
                var storage = this.$storage;
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
         * Total number of Namespace elements.  
         * 
         * @member {number} NamespaceManager#count 
         * @readonly
         */
        Object.defineProperty(this, 'count', 
        {
            get: function() {
                return this._list.length;
            },
            configurable: false,
            enumerable: true,
        });

        /**
         * Set whether to allow duplicate element registration.  
         * Default is 'false' and does not allow duplication.  
         * 
         * @member {boolean} NamespaceManager#allowOverlap
         */
        Object.defineProperty(this, 'allowOverlap',
        {
            get: function() { return allowOverlap; },
            set: function(val) { 
                if (typeof val !== 'boolean') throw new ExtendError(/EL03311/, null, [typeof val]);
                allowOverlap = val;
            },
            configurable: false,
            enumerable: true
        });

        // inner variable access
        // this.__SET$storage = function(val, call) {
        //     if (call instanceof NamespaceManager) $storage = val;
        // }

        this._$KEYWORD = ['namespace', 'ns', 'NS', '_type'];    // 금지단어

        Util.implements(NamespaceManager, this);        // strip:
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
     * Creates a storage initialization object.  
     * 
     * @returns {object} initialized namespace type object { _type: 'ns'}
     * @private
     */
    NamespaceManager.prototype.$createNsRefer = function() {
        return { _type: 'ns' };
    };

    /**
     * Returns the Namespace path object.  
     * 
     * @param {string | object} p_elem Factors to obtain the path
     * @returns {object} Namespace path object {ns: '...', key: '...'}
     * @protected
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
     * Initialize the namespace.  
     */
    NamespaceManager.prototype.init = function() {
        this.$storage = this.$createNsRefer();
    };

    /**
     * Add a path to the Namespace.  
     * 
     * @param {string | array<string>} p_ns Namespace name, path in the form of a string or array separated by a dot ('.')
     */
    NamespaceManager.prototype.addNamespace = function(p_ns) {
        var parent = this.$storage;
        var sections;
    
        try {
            sections = _getArray(p_ns);

            if (this._$KEYWORD.indexOf(sections[0]) > -1) sections = sections.slice(1); // 최상위 에약어 제거
        
            for (var i = 0; i < sections.length; i+=1) {
                // var sName = sections[i];
                if (typeof parent[sections[i]] === 'undefined') {
                    parent[sections[i]] = this.$createNsRefer();
                }
                parent = parent[sections[i]];
            }

        } catch (error) {
            throw new ExtendError(/EL03321/, error, []);
        }
    };

    /**
     * Delete the path in the Namespace.  
     * 
     * @param {string | array<string>} p_ns Namespace name, path in the form of a string or array separated by a dot ('.')
     */
    NamespaceManager.prototype.delNamespace = function(p_ns) {
        var parent = this.$storage;
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
     * Returns the path object of the namespace.  
     * 
     * @param {string | sting[]} p_ns Namespace name, path in the form of a string or array separated by a dot ('.')
     * @returns {object} path object
     */
    NamespaceManager.prototype.path = function(p_ns) {
        var parent = this.$storage;
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
     * Adds an element to the specified namespace path.  
     * 
     * @param {string} p_fullName Full path to the Namespace
     * @param {any} p_elem Functions, classes, or objects to be added
     */
    NamespaceManager.prototype.add = function(p_fullName, p_elem) {
        var parent = this.$storage;
        var sections;
        var oPath;
        var key;
        var ns;

        try {
            oPath = this._getPathObject(p_fullName);
            key = oPath['key'];
            ns = oPath['ns'];
            sections = _getArray(ns);

            if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);  // []로 감싸서 choice 타입으로 변환됨
            if (!_validName(key)) throw new ExtendError(/EL03331/, null, [key]);
            if (!this.allowOverlap && this.getPath(p_elem)) {
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
     * Deletes an element from the specified namespace path.  
     * 
     * @param {string} p_fullname Full path to the Namespace
     * @returns {boolean} Successful deletion ('true' or 'false')
     */
    NamespaceManager.prototype.del = function(p_fullName) {
        var parent = this.$storage;
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
     * Verify that the specified element exists in the Namespace.  
     * 
     * @param {string | any} p_elem Function, class, or object to check
     * @returns {boolean} Existence ('true' or 'false')
     */
    NamespaceManager.prototype.has = function(p_elem) {
        if (_isString(p_elem) && this.find(p_elem)) return true;
        else if (typeof this.getPath(p_elem) === 'string') return true;
        return false;
    };

    /**
     * Retrieves elements from the specified namespace path.  
     * 
     * @param {string | array<string>} p_fullName Full path to the Namespace
     * @returns {(object | function)?} Found elements
     */
    NamespaceManager.prototype.find = function(p_fullName) {
        var parent = this.$storage;
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
     * Returns the path of the specified element in the Namespace.  
     * (Route of the first element in case of redundancy)  
     * @param {any} p_elem Elements to find (function or object)
     * @returns {string?} The path of the element, 'undefined' if not found
     */
    NamespaceManager.prototype.getPath = function(p_elem) {
        var namespace = this.$storage;
        var stack = [];

        if (!p_elem) throw new ExtendError(/EL03341/, null, [typeof p_elem]);

        if ($findElement(namespace)) {
            return stack.join('.');
        } else return;

        // inner function
        function $findElement(target) { 
            for(var prop in target) {
                var obj = target[prop];
                if (obj === 'ns') continue;
                if (obj && obj['_type'] === 'ns') {
                    stack.push(prop);
                    if($findElement(obj)) return true;
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
     * Serialize the namespace repository and convert it into a string.  
     * To convert the function to JSON, you must specify a separate 'stringify' function.  
     * 
     * @param {function?} p_stringify JSON Stringify function (optional)
     * @param {string?} p_space Setting the blank to apply at the output
     * @returns {string} serialized string
     */
    NamespaceManager.prototype.output = function(p_stringify, p_space) {
        var arr = [];
        var obj;
        var str;
        var temp = {list: arr};

        try {
            for (var i = 0; i < this._list.length; i++) {
                var fullName    = this._list[i];
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
     * Parsing serialized strings and fetching them to the Namespace repository.  
     * @param {string} p_str serialized string
     * @param {function?} p_parse  JSON parser function
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
// module export
export default NamespaceManager;
export { NamespaceManager };