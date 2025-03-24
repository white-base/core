/**** meta-registry.js | MetaRegistry ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';    
import Util from './util.js';
import NamespaceManager from './namespace-manager.js';

//==============================================================Á
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!NamespaceManager) throw new Error(Message.get('ES011', ['NamespaceManager', 'namespace-manager']));

//==============================================================
// 3. module implementation       
var MetaRegistry = (function () {
    /**
     * 'MetaRegistry' is a class responsible for registering and managing meta objects.  
     * 
     * @constructs MetaRegistry
     * @static
     */
    function MetaRegistry() { 
    }

    MetaRegistry._NS = 'Meta';    // namespace

    // var define
    var _list = [];
    var namespace = new NamespaceManager();

    /**
     * List of meta objects.  
     * 
     * @member {any[]} MetaRegistry#_list
     * @readonly
     */
    Object.defineProperty(MetaRegistry, '_list', 
    {
        get: function() { 
            var arr = [];
            for (var i = 0; i < _list.length; i++) arr.push(_list[i]);
            return arr;
        },
        configurable: false,
        enumerable: true,
    });

    /**
     * Total number of currently registered meta objects.  
     * 
     * @member {number} MetaRegistry#count
     * @readonly
     */
    Object.defineProperty(MetaRegistry, 'count', 
    {
        get: function() { return _list.length; },
        configurable: false,
        enumerable: true,
    });        

    /**
     * Namespace manager for meta objects.  
     * 
     * @member {NamespaceManager} MetaRegistry#namespace
     * @readonly
     */
    Object.defineProperty(MetaRegistry, 'namespace', 
    {
        get: function() { return namespace; },
        configurable: false,
        enumerable: true,
    });

    // local function
    function _isBuiltFunction(obj) {    // 내장함수 여부
        if (typeof obj === 'function' && (false 
            || obj === Number || obj === String 
            || obj === Boolean || obj === Function
            || obj === Object || obj === Array
            || obj === RegExp || obj === Date 
            || obj === Symbol || obj === BigInt
        )) return true;
        return false;
    }

    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }

    function _isString(obj) {    // 공백아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }
    
    function _getGuidList(oGuid, arr) {  //객체 배열 리턴
        arr = arr || [];
        if (MetaRegistry.isGuidObject(oGuid)) arr.push(oGuid);
        if (Array.isArray(oGuid)){
            for(var i = 0; i < oGuid.length; i++) {
                if (_isObject(oGuid[i])) _getGuidList(oGuid[i], arr);
            }
        } else if (_isObject(oGuid)) {
            for(var prop in oGuid) {
                if (_isObject(oGuid[prop])) _getGuidList(oGuid[prop], arr);
            }
        }
        return arr;
    };

    /**
     * Initializes registered meta objects and namespaces.  
     */
    MetaRegistry.init = function() {
        _list.length = 0;
        this.namespace.init();
    };

    /**
     * Register the meta object and register the creator in the namespace.  
     * An exception occurs if an object is already registered.   
     * Register if there is no creator in the Namespace.  
     * 
     * @param {MetaObject} p_meta Meta object to register
     */
    MetaRegistry.register = function(p_meta) {
        var _ns;
        var key;
        var type;
        // var fullName;

        if (!this.isMetaObject(p_meta)) throw new ExtendError(/EL03211/, null, [p_meta._type, p_meta._guid]);
        if (this.has(p_meta)) throw new ExtendError(/EL03212/, null, [p_meta._guid]);

        _ns         = p_meta['_ns'] || '';
        type        = p_meta['_type'];
        key         = type.name;
        // fullName    = p_meta['_ns'] && p_meta['_ns'].length > 0 ?  _ns +'.'+key : key;

        _list.push(p_meta);  // 객체 등록
        this.registerClass(type, _ns, key); // 클래스 등록
    };

    /**
     * Undoes the meta object in the registry.  
     * 
     * @param {MetaObject | string} p_meta Meta object or GUID string
     * @returns {boolean} successful removal ('true' or 'false')
     */
    MetaRegistry.release = function(p_meta) {
        var guid;

        if (typeof p_meta !== 'object' && typeof p_meta !== 'string') {
            throw new ExtendError(/EL03213/, null, [typeof p_meta]);
        }

        guid = typeof p_meta === 'string' ? p_meta : p_meta['_guid'];
        if (!_isString(guid)) return false;

        for(var i = 0; i < _list.length; i++) {
            if (_list[i]['_guid'] === guid) {
                _list.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    /**
     * Check if the registry has a meta object.  
     * 
     * @param {object | string} p_oGuid  Object of type GUID or GUID string
     * @returns {boolean} Existence ('true' or 'false')
     */
    MetaRegistry.has = function(p_oGuid) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;

        if (!_isString(guid)) return false;

        for(var i = 0; i < _list.length; i++) {
            if (_list[i]['_guid'] === guid) return true;
        }
        return false;
    };
    
    /**
     * Locate the meta object in the registry.  
     * 
     * @param {object | string} p_oGuid Object of type GUID or GUID string
     * @returns {MetaObject?} meta object found, 'undefined' if not found
     */
    MetaRegistry.find = function(p_oGuid) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
        
        if (!_isString(guid)) return;
        
        for(var i = 0; i < _list.length; i++) {
            if (_list[i]['_guid'] === guid) return _list[i];
        }
    };

    /**
     * Checks for meta objects.  
     * 
     * @param {object} p_target Target object
     * @returns {boolean} Whether it is a meta object ('true' or 'false')
     */
    MetaRegistry.isMetaObject = function(p_target) {
        if (!_isObject(p_target)) return false;
        if (_isString(p_target['_guid']) && typeof p_target['_type'] === 'function') return true;
        return false;
    };
    
    /**
     * Creates a meta object of a GUID object.  
     * 
     * @param {object} p_oGuid GUID type object
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object
     * @returns {MetaObject} created meta object
     */
    MetaRegistry.createMetaObject = function(p_oGuid, p_origin) {
        var origin = p_origin ? p_origin : p_oGuid;
        var args = [null];
        var type;
        var ns;
        var fullName;
        var coClass;
        var params;
        
        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03221/, null, [typeof p_oGuid]);
        if (!_isString(p_oGuid['_type'])) throw new ExtendError(/EL03222/, null, [typeof p_oGuid['_type']]);
        if (!_isObject(origin)) throw new ExtendError(/EL03223/, null, [typeof origin]);
        
        type        = p_oGuid['_type'];
        ns          = p_oGuid['_ns'] || '';
        fullName    =  ns !== '' ? [ns, type].join('.') : type;
        coClass     = this.getClass(fullName);
        
        if (typeof coClass !== 'function') throw new ExtendError(/EL03224/, null, [fullName, typeof coClass]);
        
        // params = coClass.hasOwnProperty('_PARAMS') ? coClass['_PARAMS'] : []; // arr
        params = Object.prototype.hasOwnProperty.call(coClass, '_PARAMS') ? coClass['_PARAMS'] : []; // arr
        for (var i = 0; i < params.length; i++) {
            var argName = params[i];
            var prop = p_oGuid[argName];
            var obj;
            obj = _isObject(prop) && prop['$ref'] ? this.findSetObject(prop['$ref'], origin) : prop;
            if (p_oGuid[argName]) args.push(obj);
        }
        return new (Function.prototype.bind.apply(coClass, args));
    };
    
    /**
     * Creates a reference object for a GUID object.  
     * 
     * @param {MetaObject} p_meta Meta object
     * @returns {object} created reference object ('{$ref: 'guid value'}')
     * @example
     * var meta = new MetaElement('m1');
     * obj.onwer = MetaRegistry.createReferObject(meta);
     * console.log(obj.onwer);          // { $ref : '5337877c-49d6-9add-f35a-7bd31d510d4f' }
     */
    MetaRegistry.createReferObject = function(p_meta) {
        if (!_isObject(p_meta)) throw new ExtendError(/EL03225/, null, [typeof p_meta]);
        if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03226/, null, [typeof p_meta['_guid']]);
        return { $ref: p_meta['_guid'] };
    };

    /**
     * Register the function in the Namespace and create a reference object.  
     * 
     * @param {function} p_target Function or constructor
     * @returns {object} created namespace reference object ('{$ns: 'Meta.MetaElement'}')
     * @example
     * var meta = new MetaElement('m1');
     * obj.onwer = MetaRegistry.createReferObject(meta);
     * console.log(obj);                // {onwer: {$ns: 'Meta.MetaElement'}}
     */
    MetaRegistry.createNsReferObject = function(p_target) {
        var fullName;
        var ns, key;

        if (typeof p_target !== 'function') throw new ExtendError(/EL03227/, null, [typeof p_target]);
        
        if (!this.findClass(p_target)) {
            ns  = p_target['_NS'] || '';
            key = p_target.name;
            this.registerClass(p_target, ns, key);
        }
        fullName = this.findClass(p_target);
        return { $ns: fullName };
    };

    /**
     * Set the GUID of the meta object in the GUID object.  
     * - oGuid.$set = meta._guid  
     * 
     * @param {object} p_oGuid GUID type object
     * @param {MetaObject} p_meta Meta object
     * @returns {object} set object
     * @example
     * var meta = new MetaElement('m1');    // meta.guid = '5337877c-49d6-9add-f35a-7bd31d510d4f'
     * var obj = { name: 'm2' };
     * MetaRegistry.setMetaObject(obj, meta);
     * console.log(obj);                    // {name: 'm2, $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     */
    MetaRegistry.setMetaObject = function(p_oGuid, p_meta) {
        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03241/, null, [typeof p_oGuid]);
        if (!_isObject(p_meta)) throw new ExtendError(/EL03242/, null, [typeof p_meta]);
        if (!_isString(p_meta['_guid'])) throw new ExtendError(/EL03243/, null,[typeof p_meta['_guid']]);
        
        p_oGuid['$set'] = p_meta['_guid'];
        return p_oGuid;
    };
        
    /**
     * Validates the GUID object.  
     * 1. Check if the object has duplicate GUID values  
     * 2. Determine if an object has a '$ref' value  
     * 3. Determine if an object has a '$ns' value  
     * 4. Check the number of '_key' and '_elem' of objects   
     * 
     * @param {object} p_oGuid GUID object to be inspected
     * @returns {boolean} Inspection result ('true' or 'false')
     */
    MetaRegistry.validObject = function(p_oGuid) {
        var _this = this;
        var arrObj;

        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03251/, null, [typeof p_oGuid]);
        
        arrObj = _getGuidList(p_oGuid);
        if (!$validUniqueGuid() || !$validReference(p_oGuid) || !$validCollection(p_oGuid)) return false;
        return true;

        // inner function
        function $findGuid(guid, arr) { // guid 조회
            for(var i = 0; i < arr.length; i++) {
                if (arr[i]['_guid'] === guid) return arr[i];
            }
        }
        function $validReference(oGuid) { // 참조 검사
            if (oGuid['$ref'] && !$findGuid(oGuid['$ref'], arrObj)) return false;
            if (oGuid['$set'] && !$findGuid(oGuid['$set'], arrObj)) return false;
            if (oGuid['$ns'] && !_this.getClass(oGuid['$ns'])) return false;
    
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (_isObject(oGuid[i]) && !$validReference(oGuid[i])) return false
                }
            } else {
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop]) && !$validReference(oGuid[prop])) return false;
                }
            }
            return true;
        }
        function $validCollection(oGuid) { // 컬렉션 검사
            if (Array.isArray(oGuid['_elem']) && Array.isArray(oGuid['_key'])) {
                if (oGuid['_elem'].length !== oGuid['_key'].length) return false;
            }
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (_isObject(oGuid[i]) && !$validCollection(oGuid[i])) return false;
                }
            } else {
                for(var prop in p_oGuid) {
                    if (_isObject(oGuid[prop]) && !$validCollection(oGuid[prop])) return false;
                }
            }
            return true;
        }
        function $validUniqueGuid() {    // guid 유일한 값인지 검사
            for (var i = 0; i < arrObj.length; i++) {
                for (var j = 0; j < arrObj.length; j++) {
                    if (arrObj[i]['_guid'] === arrObj[j]['_guid'] && i !== j) return false; // 중복
                }
            }
            return true;
        }
    };

    /**
     * Verify that the target object is a GUID object.  
     * @param {object} p_target Object to be checked
     * @returns {boolean} Guid object(`true` or `false`)
     */
    MetaRegistry.isGuidObject = function(p_target) {
        if (!_isObject(p_target)) return false;
        if (_isString(p_target['_guid']) && _isString(p_target['_type'])) return true;
        return false;
    };

    /**
     * Verify that the source object contains a GUID object.  
     * 
     * @param {string| object} p_oGuid GUID object or GUID string to check
     * @param {object | array<object>} p_origin  GUID literal object of query
     * @returns {boolean} whether to include ('true' or 'false')
     */
    MetaRegistry.hasGuidObject = function(p_oGuid, p_origin) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
        var arrOrigin = [];

        if (!_isString(guid)) throw new ExtendError(/EL03252/, null, [typeof guid]);

        if (Array.isArray(p_origin)) arrOrigin = p_origin;
        else arrOrigin.push(p_origin);

        for (var i = 0; i < arrOrigin.length; i++) {
            var origin = arrOrigin[i];
            var arrObj = _getGuidList(origin);
            if (!_isObject(origin)) throw new ExtendError(/EL03253/, null, [i, typeof guid]);
            for (var j = 0; j < arrObj.length; j++) {
                if (arrObj[j]._guid === guid) return true;
            }
        }
        return false;
    };

    /**
     * Verify that the GUID object contains a reference type element.  
     * Reference types are '$ref' and '$ns'.  
     * 
     * @param {object} p_oGuid GUID object to check
     * @returns {boolean} whether to include ('true' or 'false')
     */
    MetaRegistry.hasRefer = function(p_oGuid) {
        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03254/, null, [typeof p_oGuid]);
        if (!this.isGuidObject(p_oGuid)) throw new ExtendError(/EL03255/, null, [p_oGuid['_type'], p_oGuid['_guid']]);

        return $hasRefer(p_oGuid);

        // inner function
        function $hasRefer(oGuid) {  // 참조 포함 여부
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (typeof oGuid[i] === 'object' && $hasRefer(oGuid[i])) return true;
                }
            } else {
                if (oGuid['$ref'] && _isString(oGuid['$ref'])) return true;
                if (oGuid['$ns'] && _isString(oGuid['$ns'])) return true;
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop]) && $hasRefer(oGuid[prop])) return true
                }
            }
            return false;
        }
    };     

    /**
     * Retrieves the set GUID object from the repository.  
     * 
     * @param {string | object} p_oGuid GUID object or GUID string to look up
     * @param {object} p_origin GUID literal object with query target
     * @returns {MetaObject} meta-objects viewed
     */
    MetaRegistry.findSetObject = function(p_oGuid, p_origin) {
        var guid = _isObject(p_oGuid) ? p_oGuid['_guid'] : p_oGuid;
        var origin = p_origin;

        if (!_isString(guid)) throw new ExtendError(/EL03256/, null, [guid]);
        if (!_isObject(origin)) throw new ExtendError(/EL03257/, null, [typeof origin]);

        return $findObject(origin);
        
        // inner finction
        function $findObject(oGuid) { // 객체 조회
            var result;
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (typeof oGuid[i] === 'object') {
                        result = $findObject(oGuid[i]);
                        if(result) return result;
                    }
                }
            } else {
                if (oGuid['_guid'] && oGuid['_guid'] === guid) {
                    result = oGuid['$set'] ? MetaRegistry.find(oGuid['$set']) : undefined;
                    return result;
                }
                for(var prop in oGuid) {
                    if (typeof oGuid[prop] === 'object') {
                        result = $findObject(oGuid[prop]);
                        if(result) return result;
                    } 
                }
            }
            return result;
        }
    };

        

    /**
     * Converts the reference element value of a GUID object to a real object reference.  
     * To be converted: '$ns' is converted to '[Object Object]'.  
     * @param {object} p_oGuid GUID object to convert
     * @returns {object} converted meta object
     */
    MetaRegistry.transformRefer = function(p_oGuid) {
        var _this = this;
        var arrObj;
        var clone;

        if (!_isObject(p_oGuid)) throw new ExtendError(/EL03244/, null, [typeof p_oGuid]);
        
        arrObj = _getGuidList(p_oGuid);
        clone = Util.deepCopy(p_oGuid);
        $linkReference(clone, arrObj);
        return clone;

        // inner function
        function $linkReference(oGuid, arr, parentName) {    // 참조 연결
            parentName = parentName || '';
            if (Array.isArray(oGuid)){
                for(var i = 0; i < oGuid.length; i++) {
                    if (typeof oGuid[i] === 'object') $linkReference(oGuid[i], arr);
                }
            } else {
                for(var prop in oGuid) {
                    if (_isObject(oGuid[prop])) {
                        if (oGuid[prop]['$ns']) {
                            var ns = _this.getClass(oGuid[prop]['$ns']);
                            if (typeof ns !== 'function') throw new ExtendError(/EL03245/, null, [parentName, prop]);
                            oGuid[prop] = ns; // function 타입 연결
                        } else $linkReference(oGuid[prop], arr, parentName ? parentName +'.'+ prop : prop);
                    }
                }
            }
        }
    };
    
    /**
     * Register the creator or object in the specified namespace.  
     * It registers after performing duplicate checks, and does not store built-in functions (Array, String, Number, etc.).  
     * 
     * @param {function | object} p_target To be registered (class creator or object)
     * @param {string} p_ns Namespace name (separated by a dot '.')
     * @param {string} p_key Destination name (class name or function name), otherwise the last name of the namespace applies.
     */
    MetaRegistry.registerClass = function(p_target, p_ns, p_key) {
        var fullName;
        
        if (!(_isObject(p_target) || typeof p_target === 'function')) throw new ExtendError(/EL03231/, null, [typeof p_target]);
        if (p_ns && typeof p_ns !== 'string') throw new ExtendError(/EL03232/, null, [typeof p_ns]);
        if (p_key && !_isString(p_key)) throw new ExtendError(/EL03233/, null, [typeof p_key]);

        if (p_key) fullName = p_ns.length > 0 ? p_ns +'.'+ p_key : p_key;
        else fullName = p_ns;
        
        if (_isBuiltFunction(p_target)) return;    // 내장함수 제외
        if (typeof globalThis[fullName] === 'function') return;
        
        if (!this.namespace.find(fullName)) this.namespace.add(fullName, p_target);  // 중복 검사 후 등록
    };
    
    /**
     * Undoes the registered item in the Namespace.  
     * 
     * @param {string} p_fullName full path to the namespace ('string')
     * @returns {boolean} Successful deletion ('true' or 'false')
     */
    MetaRegistry.releaseClass = function(p_fullName) {
        if (!_isString(p_fullName)) throw new ExtendError(/EL03234/, null, [typeof p_fullName]);
        
        if (typeof globalThis[p_fullName] === 'function') return true; // 내장함수 & 전역 함수
        return this.namespace.del(p_fullName);
    };
    
    /**
     * Finds the specified constructor or object in the Namespace and returns the entire path.  
     * 
     * @param {function} p_target Creator or object
     * @returns {string?} Namespace Full path, 'undefined' if not found
     */
    MetaRegistry.findClass = function(p_target) {
        var fullName;

        if (typeof p_target !== 'function') throw new ExtendError(/EL03235/, null, [typeof p_target]);
        
        fullName = p_target.name;
        if (typeof globalThis[fullName] === 'function') return fullName;   // 내장함수 & 전역 함수
        return this.namespace.getPath(p_target);
    };
    
    /**
     * Returns a generator or object corresponding to the entire path specified in the Namespace.  
     * 
     * @param {string} p_fullName Full path to the Namespace
     * @returns {(object | function)?} corresponding object or creator, 'undefined' if not found
     */
    MetaRegistry.getClass = function(p_fullName) {
        if (!_isString(p_fullName)) throw new ExtendError(/EL03236/, null, [typeof p_fullName]);
        
        if (typeof globalThis[p_fullName] === 'function') return globalThis[p_fullName];  // 내장함수 & 전역 함수
        return this.namespace.find(p_fullName);
    };

    /**
     * Pars the serialized JSON string to convert it to 'MetaObject'.  
     * REVIEW: 필요성 재검토 필요  
     * @param {string} p_str serialized JSON string
     * @param {function?} p_parse JSON parser function (default is 'JSON.parse')
     * @returns {MetaObject} converted meta object
     */
    MetaRegistry.loadMetaObject = function(p_str, p_parse) {
        var obj = p_str;
        var oGuid;
        var meta;

        if (typeof p_str !== 'string') throw new ExtendError(/EL03246/, null, [typeof str]);

        obj = (typeof p_parse === 'function') ? p_parse(obj) : JSON.parse(obj, null);
        if (this.has(obj)) return this.find(obj['_guid']);  // 객체가 존재할 경우
        if (!this.isGuidObject(obj)) throw new ExtendError(/EL03247/, null, [obj['_type'], obj['_guid']]);

        oGuid = this.transformRefer(obj);
        meta = this.createMetaObject(oGuid);
        meta.setObject(oGuid);
        return meta;
    };
    return MetaRegistry;
}());

//==============================================================
// 4. module export
export default MetaRegistry;
export { MetaRegistry };