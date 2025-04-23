/**** collection-property.js | PropertyCollection ****/
//==============================================================
import Message              from './message-wrap.js';
import ExtendError          from './extend-error.js';
import Type                 from './type.js';
import Util                 from './util.js';
import IPropertyCollection  from './i-collection-property.js';
import MetaRegistry         from './meta-registry.js';
import MetaObject           from './meta-object.js';
import BaseCollection       from './base-collection.js';

var PropertyCollection  = (function (_super) {
    /**
     * Creates an instance of the class 'PropertyCollection'.  
     * 
     * @constructs PropertyCollection
     * @implements {IPropertyCollection}
     * @extends BaseCollection
     * @param {object} [p_owner] Objects that own this collection
     */
    function PropertyCollection(p_owner) {
        _super.call(this, p_owner); 

        var $keys = [];

        /**
         * Returns all key values in the collection to an array.
         * 
         * @member {string} PropertyCollection#$keys
         * @readonly
         * @private
         */
        Object.defineProperty(this, '$keys', {
            get: function() { return $keys; },
            set: function(nVal) { $keys = nVal; },
            configurable: false,
            enumerable: false,
        });

        // 예약어 등록 
        this.$KEYWORD = ['$keys', 'indexOf', 'exists', 'indexToKey'];

        Util.implements(PropertyCollection, this);      // strip:
    }
    Util.inherits(PropertyCollection, _super);
    
    PropertyCollection._UNION = [IPropertyCollection];
    PropertyCollection._NS = 'Collection';      // namespace
    PropertyCollection._PARAMS = ['_owner'];    // creator parameter

    // local function
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }

    function _isString(obj) {    // 공백아닌 문자 여부
        if (typeof obj === 'string' && obj.length > 0) return true;
        return false;
    }

    /**
     * Internal method to remove the specified element from the collection.  
     * 
     * @protected
     * @param {number} p_pos Location of the element to be removed
     * @returns {boolean} Removal successful
     */
    PropertyCollection.prototype._remove = function(p_pos) {
        var count = this.count - 1;
        var propName = this.indexToKey(p_pos);   // number 검사함
        
        delete this[propName];      // 프로퍼티 삭제

        this.$elements.splice(p_pos, 1);
        this.$keys.splice(p_pos, 1);
        this.$descriptors.splice(p_pos, 1);
        
        if (p_pos < count) {        // 참조 자료 변경
            for (var i = p_pos; i < count; i++) {
                // var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                propName = this.indexToKey(i);
                Object.defineProperty(this, [i], this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i, false));
                Object.defineProperty(this, propName, this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i));
            }
            delete this[count];     // 마지막 idx 삭제
        } else {
            delete this[p_pos];     // idx 삭제 (끝일 경우)
        }
        return true;
    };
    Object.defineProperty(PropertyCollection.prototype, '_remove', {
        enumerable: false
    });

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object
     * @returns {object}  Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    PropertyCollection.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        var vOpt = p_vOpt || 0;
        var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        if (this.$descriptors.length > 0) {
            obj['_desc'] = [];
            for (var i = 0; i < this.$descriptors.length; i++) {
                obj['_desc'].push(this.$descriptors[i]);
            }
        }
        obj['_elem'] = [];
        for (var j = 0; j < this.count; j++) {
            var elem = this.$elements[j];
            if (elem instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(elem, owned)) {
                    obj['_elem'].push(MetaRegistry.createReferObject(elem));
                } else obj['_elem'].push(elem.getObject(vOpt, owned));
            } else obj['_elem'].push(elem);
        }
        obj['_key'] = [];
        for (var k = 0; k < this.$keys.length; k++) {
            var key = this.$keys[k];
            obj['_key'].push(key);
        }
        return obj;                        
    };
    Object.defineProperty(PropertyCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param {object} p_oGuid Object literal of the type of GUID to be set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    PropertyCollection.prototype.setObject  = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        var origin = p_origin ? p_origin : p_oGuid;

        if (p_oGuid['_elem'].length !== p_oGuid['_key'].length) throw new ExtendError(/EL04221/, null, [p_oGuid['_elem'].length, p_oGuid['_key'].length]);
        
        if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
            if (p_oGuid['_elem'].length !== p_oGuid['_desc'].length) throw new ExtendError(/EL04222/, null, [p_oGuid['_elem'].length, p_oGuid['_desc'].length]);
            for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                this.$descriptors.push(p_oGuid['_desc'][i]);
            }
        }

        this.$keys = [];
        for(var j = 0; j < p_oGuid['_key'].length; j++) {
            var key = p_oGuid['_key'][j];
            this.$keys.push(key);
            Object.defineProperty(this, [j], this._getPropDescriptor(j, false));
            Object.defineProperty(this, key, this._getPropDescriptor(j));
        }

        for(var k = 0; k < p_oGuid['_elem'].length; k++) {
            var elem = p_oGuid['_elem'][k];
            if (MetaRegistry.isGuidObject(elem)) {
                var obj = MetaRegistry.createMetaObject(elem, origin);
                obj.setObject(elem, origin);
                this.$elements.push(obj);
            
            } else if (elem['$ref']) {
                var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                if (!meta) throw new ExtendError(/EL04223/, null, [k, elem['$ref']]);
                this.$elements.push(meta);
                
            } else this.$elements.push(elem);
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * Adds an element to the collection.  
     * 
     * @param {string} p_key Key of the element
     * @param {any} [p_elem] Elements to add
     * @param {object} [p_desc] Property descriptor object for element
     * @returns {number} Location of the added element
     */
    PropertyCollection.prototype.add = function(p_key, p_elem, p_desc) {
        try {
            var index   = this.count;
            var regex = /^[a-zA-Z_][a-zA-Z0-9_]*/;
            // var types = ['_req_'];

            // types = [types.concat(this._elemTypes)];
            
            if (!_isString(p_key)) throw new ExtendError(/EL04225/, null, [p_key]);
            if(!regex.test(p_key)) throw new ExtendError(/EL04226/, null, [p_key, regex.source]);
            if (this.$KEYWORD.indexOf(p_key) > -1) throw new ExtendError(/EL04227/, null, [p_key]);
            if (this.exists(p_key)) throw new ExtendError(/EL04228/, null, [p_key]);
            if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
            // if (this._elemTypes.length > 0) Util.matchType(types, p_elem);
            if (_isObject(p_desc) && p_desc.configurable === false) {
                console.warn(Message.get('WS011', ['configurable = true', 'element']));
                // Message.warn('WS011', ['configurable = true', 'element']);
            }
            if (_isObject(p_desc) && p_desc.writable === false ) {
                console.warn(Message.get('WS011', ['writable = true', 'element']));
                // Message.warn('WS011', ['writable = true', 'element']);
            }

            // this._onAdd(index, p_elem);
            if (this._onAdd(p_elem, index) === false) return -1;

            // data process
            this.$elements.push(p_elem);
            this.$keys.push(p_key);
            this.$descriptors.push(p_desc);
            // property define
            if (_isObject(p_desc)) {
                Object.defineProperty(this, [index], p_desc);
                Object.defineProperty(this, p_key, p_desc);
            } else {
                Object.defineProperty(this, [index], this._getPropDescriptor(index, false));
                Object.defineProperty(this, p_key, this._getPropDescriptor(index));
            }
            this._onAdded(p_elem, index);

            return index;

        } catch (error) {
            throw new ExtendError(/EL04229/, error, [p_key, p_elem]);
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'add', {
        enumerable: false
    });

    /**
     * Initialize the collection.  
     * Empty $elements, $descripts, and $keys at initialization.  
     * 
     * @returns {boolean} Additional success
     */
    PropertyCollection.prototype.clear = function() {
        try {
            
            if (this._onClear() === false) return false;
            
            for (var i = 0; i < this.count; i++) {
                var propName = this.indexToKey(i);
                delete this[i];
                delete this[propName];
            }
            this.$elements = [];
            this.$descriptors = [];
            this.$keys = [];
            
            this._onCleared();
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'clear', {
        enumerable: false
    });

    /**
     * Query the index based on the key.  
     * 
     * @param {string} p_key Key to view
     * @returns {number} Index corresponding to key, return '-1' if not present
     */
    PropertyCollection.prototype.keyToIndex = function(p_key) {
        if (!_isString(p_key))  throw new ExtendError(/EL04224/, null, [typeof p_key]);
        return this.$keys.indexOf(p_key);
    };
    Object.defineProperty(PropertyCollection.prototype, 'keyToIndex', {
        enumerable: false
    });

    /**
     * Query the key based on the index value.  
     * 
     * @param {number} p_idx Index to view
     * @returns {string} Key values for that index
     */
    PropertyCollection.prototype.indexToKey = function(p_idx) {
        if (typeof p_idx !== 'number') throw new ExtendError(/EL0422A/, null, [typeof p_idx]);
        return this.$keys[p_idx];
    };
    Object.defineProperty(PropertyCollection.prototype, 'indexToKey', {
        enumerable: false
    });

    /**
     * Verify that the specified key exists in the collection.  
     * 
     * @param {string} p_key Key value to check
     * @returns {boolean} If the key exists, it is 'true', otherwise it is 'false'
     */
    PropertyCollection.prototype.exists = function(p_key) {
        if (!_isString(p_key)) throw new ExtendError(/EL0422B/, null, [typeof p_key]);
        return Object.prototype.hasOwnProperty.call(this, p_key);
    };
    Object.defineProperty(PropertyCollection.prototype, 'exists', {
        enumerable: false
    });

    /**
     * Returns the result of executing the function provided to all elements to the new array.  
     * 
     * @param {Function} callback Callback function to convert, (elem: T, index: number, key: string, list: T[]) => U
     * @param {any} thisArg Objects to use as this inside the callback function
     * @returns  {Array} New arrangement of transformed elements
     */
    PropertyCollection.prototype.map  = function(callback, thisArg) {
        var newArr = [];

        if (typeof callback !== 'function') throw new ExtendError(/EL04116/, null, [typeof callback]);
    
        for (var i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            newArr[i] = callback.call(thisArg || this, this[i], i, key, this._list);
        }
        return newArr;
    };
    Object.defineProperty(PropertyCollection.prototype, 'map', {
        enumerable: false
    });

    /**
     * Returns a new array containing only elements that satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to filter, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Objects to use as this inside the callback function
     * @returns  {Array} Array of filtered elements
     */
    PropertyCollection.prototype.filter = function (callback, thisArg) {
        let newArr = [];

        if (typeof callback !== 'function') throw new ExtendError(/EL04117/, null, [typeof callback]);

        for (let i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            if (callback.call(thisArg || this, this[i], i, key, this._list)) {
                newArr.push(this[i]);
            }
        }
        return newArr;
    };
    Object.defineProperty(PropertyCollection.prototype, 'filter', {
        enumerable: false
    });

    /**
     * Returns the accumulated results by executing the reducer function provided to all elements.  
     * 
     * @param {Function} callback callback function to be reduced, (acc: U, element: T, index: number, key: string, list: T[]) => U
     * @param {any} initialValue Initial value
     * @returns  {any} Array of filtered elements
     */
    PropertyCollection.prototype.reduce = function(callback, initialValue) {
        var acc = initialValue;

        if (typeof callback !== 'function') throw new ExtendError(/EL04118/, null, [typeof callback]);

        for(let i=0; i < this.length; i++) {
            var key = this.indexToKey(i);
            acc = acc ? callback(acc, this[i], i, key, this._list) : this[i];
        }
        return acc;
    };
    Object.defineProperty(PropertyCollection.prototype, 'reduce', {
        enumerable: false
    });

    /**
     * Returns the first element that matches the conditions of the provided function.
     * 
     * @param {Function} callback Callback function to be searched, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} The first element that satisfies the condition, 'undefined' if not found
     */
    PropertyCollection.prototype.find = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL04119/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            if ( callback.call(thisArg || this, this[i], i, key, this._list) ) {
                return this[i];
            }
        }
        return undefined;
    };
    Object.defineProperty(PropertyCollection.prototype, 'find', {
        enumerable: false
    });

    /**
     * Run the function provided for all elements.  
     * 
     * @param {Function} callback callback function to be executed, (elem: T, index: number, key: string, list: T[]) => void
     * @param {any} thisArg Object to use as this inside the callback function
     */
    PropertyCollection.prototype.forEach = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041110/, null, [typeof callback]);
        
        for (var i = 0; i <this.length; i++) {
            var key = this.indexToKey(i);
            callback.call(thisArg || this, this[i], i, key, this._list);
        }
    };
    Object.defineProperty(PropertyCollection.prototype, 'forEach', {
        enumerable: false
    });

    /**
     * Verify that at least one element matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean}  'true' if more than one element satisfies the condition, or 'false' if not
     */
    PropertyCollection.prototype.some = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041111/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            var key = this.indexToKey(i);
            if (callback.call(thisArg || this, this[i], i, key, this._list)) return true;
        }
        return false;
    };
    Object.defineProperty(PropertyCollection.prototype, 'some', {
        enumerable: false
    });

    /**
     * Verify that all elements satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean} 'true' if all elements meet the conditions, 'false' otherwise
     */
    PropertyCollection.prototype.every = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041112/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            var key = this.indexToKey(i);
            if (!callback.call(thisArg || this, this[i], i, key, this._list)) return false;
        }
        return true;
    };
    Object.defineProperty(PropertyCollection.prototype, 'every', {
        enumerable: false
    });

    /**
     * Returns the index of the first element that matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} Index of the first element that satisfies the condition, if not found '-1'
     */
    PropertyCollection.prototype.findIndex = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041113/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            var key = this.indexToKey(i);
            if ( callback.call(thisArg || this, this[i], i, key, this._list) ) {
                return i;
            }
        }
        return -1;
    };
    Object.defineProperty(PropertyCollection.prototype, 'findIndex', {
        enumerable: false
    });        

    return PropertyCollection;

}(BaseCollection));

export default PropertyCollection;
export { PropertyCollection };