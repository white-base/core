/**** collection-array.js | ArrayCollection ****/
//==============================================================
import Message              from './message-wrap.js';    
import ExtendError          from './extend-error.js';    
import Util                 from './util.js';
import Type                 from './type.js';
import IArrayCollection     from './i-collection-array.js';
import MetaRegistry         from './meta-registry.js';
import MetaObject           from './meta-object.js';
import { BaseCollection }   from './base-collection.js';

var ArrayCollection  = (function (_super) {
    /**
     * Creates an instance of an ArrayCollection class.  
     * 
     * @constructs ArrayCollection
     * @implements {IArrayCollection}
     * @extends BaseCollection
     * @param {object} [p_owner] Objects that own this collection
     */
    function ArrayCollection(p_owner) {
        _super.call(this, p_owner);

        this.$KEYWORD = ['insertAt'];

        Util.implements(ArrayCollection, this);     // strip:
    }
    Util.inherits(ArrayCollection, _super);
    
    ArrayCollection._UNION = [IArrayCollection];
    ArrayCollection._NS = 'Collection';     // namespace
    ArrayCollection._PARAMS = ['_owner'];   // creator parameter

    // local function
    function _isObject(obj) {    // 객체 여부
        if (typeof obj === 'object' && obj !== null) return true;
        return false;
    }
    
    /**
     * Internal method to remove the specified element from the collection.  
     * 
     * @protected
     * @param {number} p_pos Index of the element to be removed
     * @returns {boolean} Success or failure
     */
    ArrayCollection.prototype._remove = function(p_pos) {
        var count = this.count - 1;   // [idx] 포인트 이동
        
        this.$elements.splice(p_pos, 1);
        this.$descriptors.splice(p_pos, 1);
        
        if (p_pos < count) {
            for (var i = p_pos; i < count; i++) {   // 참조 변경(이동)
                var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                Object.defineProperty(this, [i], desc);
            }
            delete this[count];     // 마지막 idx 삭제
        } else {
            delete this[p_pos];     // idx 삭제 (끝일 경우)
        }
        return true;
    };
    Object.defineProperty(ArrayCollection.prototype, '_remove', {
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
    ArrayCollection.prototype.getObject = function(p_vOpt, p_owned) {
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
        for (var j = 0; j < this.$elements.length; j++) {
            var elem = this.$elements[j];
            if (elem instanceof MetaObject) {
                if (MetaRegistry.hasGuidObject(elem, owned)) {
                    obj['_elem'].push(MetaRegistry.createReferObject(elem));
                } else obj['_elem'].push(elem.getObject(vOpt, owned));
            } else obj['_elem'].push(elem);
        }
        return obj;                        
    };
    Object.defineProperty(ArrayCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.   
     * 
     * @param {object} p_oGuid object literal of the type of GUID to be set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    ArrayCollection.prototype.setObject  = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        var origin = p_origin ? p_origin : p_oGuid;

        if (Array.isArray(p_oGuid['_desc']) && p_oGuid['_desc'].length > 0) {
            for (var i = 0; i < p_oGuid['_desc'].length; i++) {
                this.$descriptors.push(p_oGuid['_desc'][i]);
            }
        }
        for(var j = 0; j < p_oGuid['_elem'].length; j++) {
            Object.defineProperty(this, [j], this._getPropDescriptor(j));
        }

        for(var k = 0; k < p_oGuid['_elem'].length; k++) {
            var elem = p_oGuid['_elem'][k];
            if (MetaRegistry.isGuidObject(elem)) {
                var obj = MetaRegistry.createMetaObject(elem, origin);
                obj.setObject(elem, origin);
                this.$elements.push(obj);
                
            } else if (elem['$ref']) {
                var meta = MetaRegistry.findSetObject(elem['$ref'], origin);
                if (!meta) throw new ExtendError(/EL04211/, null, [k, elem['$ref']]);
                this.$elements.push(meta);  
            
            } else this.$elements.push(elem);
        }
    };        
    Object.defineProperty(ArrayCollection.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * Adds an element to the collection.  
     * 
     * @param {any} p_elem Elements to add
     * @param {object} [p_desc] Property descriptor object for element
     * @returns {number} Location of the added element
     */
    ArrayCollection.prototype.add = function(p_elem, p_desc) {
        var pos = this.count;
        this.insertAt(pos, p_elem, p_desc);
        return pos;
    };
    Object.defineProperty(ArrayCollection.prototype, 'add', {
        enumerable: false
    });

    /**
     * Initialize the collection.  
     * Empty the $elements and $descriptors arrays upon initialization.  
     * 
     * @returns {boolean} Additional success
     */
    ArrayCollection.prototype.clear = function() {
        try {
            if (this._onClear() === false) return false;

            for (var i = 0; i < this.count; i++) delete this[i];
            this.$elements = [];
            this.$descriptors = [];
            
            this._onCleared();    // event
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'clear', {
        enumerable: false
    });

    /**
     * Adds an element to the specified location.  
     * 
     * @param {number} p_pos Where to add
     * @param {any} p_elem Elements to add
     * @param {object} [p_desc] Property descriptor object for element
     * @returns {boolean} Additional success
     */
    ArrayCollection.prototype.insertAt = function(p_pos, p_elem, p_desc) {
        try {
            var index   = this.count;

            if (typeof p_pos !== 'number') throw new ExtendError(/EL04212/, null, [typeof p_pos]);
            if (index < p_pos) throw new ExtendError(/EL04213/, null, [p_pos, index]);
            if (p_pos < 0) throw new ExtendError(/EL04214/, null, [p_pos]);
            if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], p_elem);
            if (_isObject(p_desc) && p_desc.configurable === false) {
                console.warn(Message.get('WS011', ['configurable = false', 'element']));
                // Message.warn('WS011', ['configurable = false', 'element']); 
            }
            if (_isObject(p_desc) && p_desc.writable === false ) {
                console.warn(Message.get('WS011', ['writable = false', 'element']));
                // Message.warn('WS011', ['writable = false', 'element']);
            }

            if (this._onAdd(p_elem, p_pos) === false) return false;

            // data process
            this.$elements.splice(p_pos, 0, p_elem);            
            this.$descriptors.splice(p_pos, 0, p_desc);
            // property define
            if (_isObject(p_desc)) {
                Object.defineProperty(this, [p_pos], p_desc);
            } else {
                Object.defineProperty(this, [p_pos], this._getPropDescriptor(p_pos));
            }
            // reindexing
            for (var i = p_pos + 1; i < this.count; i++) {
                var desc = this.$descriptors[i] ? this.$descriptors[i] : this._getPropDescriptor(i);
                Object.defineProperty(this, [i], desc);
            }
            this._onAdded(p_elem, p_pos);
            
            return true;

        } catch (error) {
            throw new ExtendError(/EL04215/, error, [p_pos, p_elem]);
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'insertAt', {
        enumerable: false
    });

    /**
     * Returns the result of executing the function provided to all elements to the new array.  
     * 
     * @param {Function} callback callback function to convert, (elem: T, index: number, list: T[]) => U
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {Array} Array of converted elements
     */
    ArrayCollection.prototype.map  = function(callback, thisArg) {
        var newArr = [];

        if (typeof callback !== 'function') throw new ExtendError(/EL04116/, null, [typeof callback]);
    
        for (var i = 0; i < this.length; i++) {
            newArr[i] = callback.call(thisArg || this, this[i], i, this._list);
        }
        return newArr;
    };
    Object.defineProperty(ArrayCollection.prototype, 'map', {
        enumerable: false
    });

    /**
     * Returns a new array containing only elements that satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback callback function to filter, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {Array} Array of filtered elements
     */
    ArrayCollection.prototype.filter = function (callback, thisArg) {
        let newArr = [];

        if (typeof callback !== 'function') throw new ExtendError(/EL04117/, null, [typeof callback]);

        for (let i = 0; i < this.length; i++) {
            if (callback.call(thisArg || this, this[i], i, this._list)) {
                newArr.push(this[i]);
            }
        }
        return newArr;
    };
    Object.defineProperty(ArrayCollection.prototype, 'filter', {
        enumerable: false
    });

    /**
     * Returns the accumulated results by executing the reducer function provided to all elements.  
     * 
     * @param {Function} callback callback function to be reduced, (acc: U, element: T, index: number, list: T[]) => U
     * @param {any} initialValue Initial value
     * @returns  {any} Accumulated final result value
     */
    ArrayCollection.prototype.reduce = function(callback, initialValue) {
        var acc = initialValue;

        if (typeof callback !== 'function') throw new ExtendError(/EL04118/, null, [typeof callback]);

        for(let i=0; i < this.length; i++) {
            acc = acc ? callback(acc, this[i], i, this._list) : this[i];
        }
        return acc;
    };
    Object.defineProperty(ArrayCollection.prototype, 'reduce', {
        enumerable: false
    });

    /**
     * Returns the first element that matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be searched, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} The first element that satisfies the condition, 'undefined' if not found
     */
    ArrayCollection.prototype.find = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL04119/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            if ( callback.call(thisArg || this, this[i], i, this._list) ) {
                return this[i];
            }
        }
        return undefined;
    };
    Object.defineProperty(ArrayCollection.prototype, 'find', {
        enumerable: false
    });

    /**
     * Run the function provided for all elements.  
     * 
     * @param {Function} callback Callback function to run, (elem: T, index: number, list: T[]) => void
     * @param {any} thisArg Object to use as this inside the callback function
     */
    ArrayCollection.prototype.forEach = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041110/, null, [typeof callback]);
        
        for (var i = 0; i <this.length; i++) {
            callback.call(thisArg || this, this[i], i, this._list);
        }
    };
    Object.defineProperty(ArrayCollection.prototype, 'forEach', {
        enumerable: false
    });

    /**
     * Verify that at least one element matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean} 'true' if more than one element satisfies the condition, or 'false' if not
     */
    ArrayCollection.prototype.some = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041111/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++){
            if (callback.call(thisArg || this, this[i], i, this._list)) return true;
        }
        return false;
    };
    Object.defineProperty(ArrayCollection.prototype, 'some', {
        enumerable: false
    });

    /**
     * Verify that all elements satisfy the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {boolean}  'true' if all elements meet the conditions, 'false' otherwise
     */
    ArrayCollection.prototype.every = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041112/, null, [typeof callback]);
        
        for(var i=0; i < this.length; i++) {
            if (!callback.call(thisArg || this, this[i], i, this._list)) return false;
        }
        return true;
    };
    Object.defineProperty(ArrayCollection.prototype, 'every', {
        enumerable: false
    });

    /**
     * Returns the index of the first element that matches the conditions of the provided function.  
     * 
     * @param {Function} callback Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param {any} thisArg Object to use as this inside the callback function
     * @returns  {any} Index of the first element that satisfies the condition, if not found '-1'
     */
    ArrayCollection.prototype.findIndex = function(callback, thisArg) {
        if (typeof callback !== 'function') throw new ExtendError(/EL041113/, null, [typeof callback]);
        
        for (var i = 0; i < this.length; i++) {
            if ( callback.call(thisArg || this, this[i], i, this._list) ) {
                return i;
            }
        }
        return -1;
    };
    Object.defineProperty(ArrayCollection.prototype, 'findIndex', {
        enumerable: false
    });

    /**
     * Returns an array of key/value pairs for all elements.
     * @returns 
     */
    ArrayCollection.prototype.entries = function () {
        var out = [];
        for (var i = 0; i < this._list.length; i++) out.push([i, this._list[i]]);
        return out;
    };
    Object.defineProperty(ArrayCollection.prototype, 'entries', {
        enumerable: false
    });

    return ArrayCollection;

}(BaseCollection));

export default ArrayCollection;
export { ArrayCollection };