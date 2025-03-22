/**** base-collection.js | BaseCollection ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';
import Util from './util.js';
import Type from './type.js';
import EventEmitter from './event-emitter.js';
import ICollection from './i-collection.js';
import IList from './i-list.js';
import MetaRegistry from './meta-registry.js';
import MetaObject from './meta-object.js';

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Type) throw new Error(Message.get('ES011', ['Type', 'type']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!EventEmitter) throw new Error(Message.get('ES011', ['EventEmitter', 'event-emitter']));
if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));
if (!IList) throw new Error(Message.get('ES011', ['IList', 'i-list']));
if (!MetaRegistry) throw new Error(Message.get('ES011', ['MetaRegistry', 'meta-registry']));
if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

//==============================================================
// 3. module implementation
var BaseCollection  = (function (_super) {
    /**
    * The creator that creates the collection.  
    * This is an abstract class, and you must create an instance through inheritance.  
    * 
    * @abstract
    * @extends MetaObject
    * @constructs BaseCollection
    * @implements {ICollection}
    * @implements {IList}
    * @param {object} [p_owner] Objects that own this collection
    */
    function BaseCollection(p_owner) { 
        _super.call(this);
        
        // private variable
        var $event = new EventEmitter();
        var $elements = [];
        var $descriptors = [];
        var $KEYWORD = [];
        
        // protected variable
        var _owner ;
        var _elemTypes  = [];

        /** 
         * Object that handles events. Used to register and generate various events in the collection.
         * 
         * @private
         * @member {EventEmitter} BaseCollection#$event  
         */
        Object.defineProperty(this, '$event', 
        {
            get: function() { return $event; },
            configurable: false,
            enumerable: false,
        });

        /**
         * An arrangement that stores elements of a collection.
         * 
         * @private
         * @member {string} BaseCollection#$elements
         */
        Object.defineProperty(this, '$elements',
        {
            get: function() { return $elements; },
            set: function(nVal) { $elements = nVal; },
            configurable: false,
            enumerable: false,
        });

        /**
         * A descriptor array that defines the getter and setter methods for each collection element.  
         * 
         * @private
         * @member {string} BaseCollection#$descriptors
         */
        Object.defineProperty(this, '$descriptors',
        {
            get: function() { return $descriptors; },
            set: function(nVal) { $descriptors = nVal; },
            configurable: false,
            enumerable: false,
        });

        /** 
         * List of strings used as reserved words in the collection.  
         * 
         * @private
         * @member {array<string>}  BaseCollection#$KEYWORD
         */
        Object.defineProperty(this, '$KEYWORD', 
        {
            get: function() { return $KEYWORD; },
            set: function(newVal) { $KEYWORD = $KEYWORD.concat(newVal); },  // REVIEW: 예약어 중복
            configurable: false,
            enumerable: false,
        });

        /** 
         * Owned object of the collection.  
         * 
         * @protected 
         * @member {object} BaseCollection#_owner  
         */
        Object.defineProperty(this, '_owner', 
        {   
            get: function() { return _owner; },
            set: function(val) { _owner = val; },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Defines the type constraints for the collection element.  
         * 
         * @protected 
         * @member {array<any>}  BaseCollection#_elemTypes  
         */
        Object.defineProperty(this, '_elemTypes', 
        {
            get: function() { return _elemTypes; },
            set: function(val) {
                var arrType = Array.isArray(val) ? val : Array.prototype.slice.call(arguments, 0);
                var reg = /^_[a-zA-Z]+_/;
                var arr1 = arrType.length > 0 && typeof arrType[0] === 'string' ? arrType[0] : '';
                
                // var result;
                if (arrType.length > 0  && reg.exec(arr1) === null) arrType = ['_req_'].concat(arrType);
                    
                // result = reg.exec(val);
                // if (result !== null) return result[0].toUpperCase();
                _elemTypes = arrType;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * An array that stores a list of elements in a collection.  
         * 
         * @protected 
         * @readonly
         * @member {Array}  BaseCollection#_list  
         */
        Object.defineProperty(this, '_list', 
        {
            get: function() {
                var arr = [];
                for (var i = 0; i < $elements.length; i++) arr.push(this.$elements[i]);
                return arr;
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * Returns the number of elements in the collection.  
         * 
         * @readonly
         * @member {number} BaseCollection#count 
         */
        Object.defineProperty(this, 'count', 
        {
            get: function() { return this.$elements.length; },
            enumerable: false,
            configurable: false
        });

        /**
         * Returns the number of elements in the collection.  
         * @readonly
         * @member {number} BaseCollection#length 
         */
        Object.defineProperty(this, 'length', 
        {
            get: function() { return this.$elements.length; },
            enumerable: false,
            configurable: false
        });


        /**
         * Event handler called before adding an element to a collection.  
         * 
         * @event BaseCollection#onAdd
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Elements to add
         * @param {number}      p_callback.p_idx Index of the element to be added
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onAdd', 
        {
            set: function(fun) { this.$event.on('add', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after an element is added.  
         * 
         * @event BaseCollection#onAdded
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Added elements
         * @param {number}      p_callback.p_idx Index of added element
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onAdded', 
        {
            set: function(fun) { this.$event.on('added', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler called before removing an element.  
         * 
         * @event BaseCollection#onRemove
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Elements to be removed
         * @param {number}      p_callback.p_idx Index of the element to be removed
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onRemove', 
        {
            set: function(fun) { this.$event.on('remove', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after the element is removed.  
         * 
         * @event BaseCollection#onRemoved
         * @param {function}    p_callback
         * @param {any}         p_callback.p_elem Removed elements
         * @param {number}      p_callback.p_idx Index of removed element
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onRemoved', 
        {
            set: function(fun) { this.$event.on('removed', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
        * Event handler called before deleting all elements.  
        * 
        * @event BaseCollection#onClear
        * @param {function}    p_callback
        * @param {this}        p_callback.p_this Current collection objects
        */
        Object.defineProperty(this, 'onClear', 
        {
            set: function(fun) { this.$event.on('clear', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after all elements are deleted.  
         * 
         * @event BaseCollection#onCleared
         * @param {function}    p_callback
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onCleared', 
        {
            set: function(fun) { this.$event.on('cleared', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler called before the element changes.  
         * 
         * @event BaseCollection#onChanging 
         * @param {function}    p_callback
         * @param {number}      p_callback.p_nextValue New value to be changed
         * @param {any}         p_callback.prevValue Existing value
         * @param {any}         p_callback.index Index of the element to be changed
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onChanging', 
        {
            set: function(fun) { this.$event.on('changing', fun); },
            configurable: false,
            enumerable: false,
        });

        /** 
         * Event handler that is called after an element changes.  
         * 
         * @event BaseCollection#onChanged 
         * @param {function}    p_callback
         * @param {any}         p_callback.p_nextValue New value changed
         * @param {any}         p_callback.p_prevValue Existing value
         * @param {number}      p_callback.p_index Index of changed element
         * @param {this}        p_callback.p_this Current collection objects
         */
        Object.defineProperty(this, 'onChanged', 
        {
            set: function(fun) { this.$event.on('changed', fun); },
            configurable: false,
            enumerable: false,
        });

        // object settging
        this._owner = p_owner || null;

        // 예약어 등록
        this.$KEYWORD = ['$event', '_owner', '$elements', '$descriptors', '_elemTypes', '_list', 'count', 'length', '$KEYWORD'];
        this.$KEYWORD = ['onAdd', 'onAdded', 'onRemove', 'onRemoved', 'onClear', 'onCleared', 'onChanging', 'onChanged'];
        this.$KEYWORD = ['_onAdd', '_onAdded', '_onRemove', '_onRemoved', '_onClear', '_onCleared', '_onChanging', '_onChanged'];
        this.$KEYWORD = ['_getPropDescriptor', 'getObject', 'setObject', '_guid', '_type'];
        this.$KEYWORD = ['_remove', 'remove', 'removeAt', 'contains', 'indexOf', 'add', 'clear'];

        Util.implements(BaseCollection, this);          // strip:
    }
    Util.inherits(BaseCollection, _super);
    
    BaseCollection._UNION = [ICollection, IList];
    BaseCollection._NS = 'Collection';
    BaseCollection._PARAMS = ['_owner'];
    BaseCollection._KIND = 'abstract';
    
    /**
     * Internal method that runs before adding an element.  
     * 
     * @param {any} p_elem .Elements to be added
     * @param {number} p_idx Where the element will be added
     * @listens BaseCollection#onAdd
     */
    BaseCollection.prototype._onAdd = function(p_elem, p_idx) {
        return this.$event.emit('add', p_elem, p_idx, this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onAdd', {
        enumerable: false
    });

    /**
     * Internal method that runs after an element is added.  
     * @param {any} p_elem Added elements
     * @param {number} p_idx Location where the element was added
     * @listens BaseCollection#onAdded
     */
    BaseCollection.prototype._onAdded = function(p_elem, p_idx) {
        return this.$event.emit('added', p_elem, p_idx, this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onAdded', {
        enumerable: false
    });

    /**
     * Internal method that runs before removing an element.  
     * 
     * @param {any} p_elem Elements to be removed
     * @param {number} p_idx Where the element will be removed
     * @listens BaseCollection#onRemove
     */
    BaseCollection.prototype._onRemove = function(p_elem, p_idx) {
        return this.$event.emit('remove', p_elem, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onRemove', {
        enumerable: false
    });

    /**
     * Internal method that runs after the element is removed.  
     * 
     * @param {any} p_elem Removed elements
     * @param {number} p_idx Where the element was removed
     * @listens BaseCollection#onRemoved
     */
    BaseCollection.prototype._onRemoved = function(p_elem, p_idx) {
        return this.$event.emit('removed', p_elem, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onRemoved', {
        enumerable: false
    });

    /** 
     * Internal method that runs before deleting all elements.
     * 
     * @listens BaseCollection#onClear
     */
    BaseCollection.prototype._onClear = function() {
        return this.$event.emit('clear', this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onClear', {
        enumerable: false
    });

    /** 
     * Internal method that runs after all elements are deleted.  
     * 
     * @listens BaseCollection#onCleared
     */
    BaseCollection.prototype._onCleared = function() {
        return this.$event.emit('cleared', this); 
    };
    Object.defineProperty(BaseCollection.prototype, '_onCleared', {
        enumerable: false
    });

    /** 
     * Internal method that runs before the element changes.
     * 
     * @param {any} p_nVal New value to be changed
     * @param {any} p_oVal Existing value
     * @param {number} p_idx Location of the element to be changed
     * @listens BaseCollection#onChanging
     */
    BaseCollection.prototype._onChanging = function(p_nVal, p_oVal, p_idx) {
        return this.$event.emit('changing', p_nVal, p_oVal, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onChanging', {
        enumerable: false
    });

    /** 
     * Internal method that runs after the element changes.  
     * 
     * @param {any} p_nVal New value changed
     * @param {any} p_oVal Existing value
     * @param {number} p_idx Location of changed element
     * @listens BaseCollection#onChanged
     */        
    BaseCollection.prototype._onChanged = function(p_nVal, p_oVal, p_idx) {
        return this.$event.emit('changed', p_nVal, p_oVal, p_idx, this);
    };
    Object.defineProperty(BaseCollection.prototype, '_onChanged', {
        enumerable: false
    });

    /**
     * Internal method to set the attribute descriptor for a particular index.  
     * 
     * @protected
     * @param {number} p_idx Where to specify properties
     * @param {boolean} p_enum whether the property is enumerable
     */
    BaseCollection.prototype._getPropDescriptor = function(p_idx, p_enum) {
        if (typeof p_enum !== 'boolean') p_enum = true;
        return {
            get: function() { return this.$elements[p_idx]; },
            set: function(nVal) {
                var oVal = this.$elements[p_idx];
                if (this._elemTypes.length > 0) Type.matchType([this._elemTypes], nVal);
                this._onChanging(nVal, oVal, p_idx);  // before event
                this.$elements[p_idx] = nVal;
                this._onChanged(nVal, oVal, p_idx);   // after event
            },
            configurable: true,
            enumerable: p_enum,
        };
    };
    Object.defineProperty(BaseCollection.prototype, '_getPropDescriptor', {
        enumerable: false
    });

    /** 
     * Internal method to remove elements from the collection.  
     * 
     * @abstract 
     */
    BaseCollection.prototype._remove  = function() {
        throw new ExtendError(/EL04111/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, '_remove', {
        enumerable: false
    });

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode  
     * mode=0 : reference structure(_guid:Yes, $ref:Yes)  
     * mode=1 : Redundant structure(_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure(_guid:No,  $ref:No)   
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object
     * @returns {object}  Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    BaseCollection.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        var vOpt = p_vOpt || 0;
        // var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);
        var _elems = [];
        
        if (!Type.deepEqual(this.$event['$storage'], {})) {
            obj['$storage'] = this.$event.$storage;
        }
        if (vOpt < 2 && vOpt > -1 && this._owner) {
            obj['_owner'] = MetaRegistry.createReferObject(this._owner);
        }
        for (var i = 0; i < this._elemTypes.length; i++) {
            var elem = this._elemTypes[i];
            if (typeof elem === 'function') _elems.push(MetaRegistry.createNsReferObject(elem));
            else _elems.push(elem);
        }
        obj['_elemTypes'] = _elems;
        return obj;                        
    };
    Object.defineProperty(BaseCollection.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.
     * 
     * @param {object} p_oGuid Object literal of type of GUID to set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    BaseCollection.prototype.setObject = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        
        var owner;
        var origin = p_origin ? p_origin : p_oGuid;
        
        this.clear();
        if (p_oGuid['$storage']) {
            this.$event.$storage = p_oGuid['$storage'];
        }
        if (p_oGuid['_owner']) {
            owner = MetaRegistry.findSetObject(p_oGuid['_owner']['$ref'], origin);
            if (!owner) throw new ExtendError(/EL04112/, null, [p_oGuid['_owner']['$ref']]);    // Branch:
            this._owner = owner;            
        }
        if (Array.isArray(p_oGuid['_elemTypes']) && p_oGuid['_elemTypes'].length > 0){
            this._elemTypes = p_oGuid['_elemTypes'];
        }
    };
    Object.defineProperty(BaseCollection.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * Remove the element from the collection.  
     * 
     * @param {any} p_elem Elements to be removed
     * @returns {number} Index of removed element. If element does not exist, return -1
     */
    BaseCollection.prototype.remove = function(p_elem) {
        var idx = this.$elements.indexOf(p_elem);

        if (idx >= 0 && this.removeAt(idx)) return idx;
        return -1;
    };
    Object.defineProperty(BaseCollection.prototype, 'remove', {
        enumerable: false
    });
    
    /**
     * Remove the element in the specified location.
     * 
     * @param {number} p_pos Where to remove
     * @returns {boolean} Element Removal Successful
     */
    BaseCollection.prototype.removeAt = function(p_pos) {
        var elem;
        
        if (typeof p_pos !== 'number') throw new ExtendError(/EL04113/, null, [typeof p_pos]);
        if (p_pos < 0 ) return false;
        
        elem = this.$elements[p_pos];
        if (this.$elements.length > p_pos) {
            // this._onRemove(p_pos, elem);
            if (this._onRemove(elem, p_pos) === false) return false;

            if (!this._remove(p_pos)) return false;
            this._onRemoved(elem, p_pos);
            return true;
        }
        return false;
    };
    Object.defineProperty(BaseCollection.prototype, 'removeAt', {
        enumerable: false
    });

    /**
     * Verify that a particular element exists in the collection.  
     * 
     * @param {any} p_elem Factors to check
     * @returns {boolean} Element Existence
     */
    BaseCollection.prototype.contains = function(p_elem) {
        return this.$elements.indexOf(p_elem) > -1;
    };
    Object.defineProperty(BaseCollection.prototype, 'contains', {
        enumerable: false
    });

    /**
     * Returns the index of an element.  
     * 
     * @param {any} p_elem Elements to search for
     * @returns {number} Index of element, return -1 if element is missing
     */
    BaseCollection.prototype.indexOf = function(p_elem) {
        return this.$elements.indexOf(p_elem);
    };
    Object.defineProperty(BaseCollection.prototype, 'indexOf', {
        enumerable: false
    });

    /** 
     * Adds an element to the collection.
     * 
     * @abstract 
     */
    BaseCollection.prototype.add  = function() {
        throw new ExtendError(/EL04114/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, 'add', {
        enumerable: false
    });
    
    /**
     * Initialize the collection.  
     * 
     * @abstract 
     */
    BaseCollection.prototype.clear  = function() {
        throw new ExtendError(/EL04115/, null, []);
    };
    Object.defineProperty(BaseCollection.prototype, 'clear', {
        enumerable: false
    });

    return BaseCollection;
    
}(MetaObject));

//==============================================================
// 4. module export
export default BaseCollection;
export { BaseCollection };