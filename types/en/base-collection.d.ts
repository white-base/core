import ICollection          from './i-collection';
import IList                from './i-list';
import MetaObject           from './meta-object';
import EventEmitter         from './event-emitter';

/**
 * Basic collection abstract class; serves as the top class for all collections.
 * 
 * @example
 * class MyCollection extends BaseCollection {
 *     constructor(owner: object) {
 *         super(owner);
 *     }
 * 
 *     add(element: any) {
 *         // Add element logic
 *     }
 * 
 *     clear() {
 *         // collection initialization logic
 *     }
 * 
 *     _remove(pos: number): boolean {
 *         // Element deletion logic
 *         return true;
 *     }
 * }
 * 
 * const myCollection = new MyCollection(someOwner);
 * myCollection.add(someElement);
 * console.log(myCollection.count);
 */
declare abstract class BaseCollection extends MetaObject implements ICollection, IList {
    
    /**
     * Creates a default collection.
     * 
     * @param owner - Owners of the collection. This object can provide information related to the collection's management.
     * @private
     */
    constructor(owner: object);

    /**
     * Object that handles events. Used to register and generate various events in the collection.
     * 
     * @private
     */
    $event: EventEmitter;
    
    /**
     * An arrangement that stores elements of a collection.
     * 
     * @private
     */
    $elements: any[];

    /**
     * An array of descriptors that define getter and setter methods for each collection element.
     * 
     * @private
     */
    $descriptors: object[];

    /**
     * List of reserved words for the collection.
     * 
     * @private
     */
    $KEYWORD: string[];

    /**
     * Owned object of the collection.
     * 
     * @protected
     */
    _owner: object;
    
    /**
     * Defines the type constraints for the collection element.
     * 
     * @protected
     */
    _elemTypes: any[];

    /**
     * An array that stores a list of elements in a collection. This array contains actual data from the collection.
     * 
     * @readonly
     */
    _list: any[];

    /**
     * Returns the number of elements in the current collection.
     * 
     * @readonly
     */
    count: number;

    /**
     * Returns the number of elements in the current collection.
     * 
     * @readonly
     */
    length: number;

    /**
     * Events that occur before adding an element to a collection.
     * 
     * @event BaseCollection#onAdd
     * @param idx - Index of the element to be added.
     * @param elem - The element to add.
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onAdd = function(idx, elem, _this) {
     *     console.log(`Before adding elements: index ${idx}, element ${elem}`);
     * };
     */
    onAdd: (idx: number, elem: any, _this: object) => void;

    /**
     * Events that occur after you add an element to a collection.
     * 
     * @event BaseCollection#onAdded
     * @param idx - Index of added elements.
     * @param elem - Added element.
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onAdded = function(idx, elem, _this) {
     *     console.log ('After adding elements: index ${idx}, element ${elem}');
     * };
     */
    onAdded: (idx: number, elem: any, _this: object) => void;

    /**
     * An event that occurs before an element is deleted from the collection.
     * 
     * @event BaseCollection#onRemove
     * @param idx - Index of the element to be deleted.
     * @param elem - The element to delete.
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onRemove = function(idx, elem, _this) {
     *     console.log(`Before element deletion: index ${idx}, element ${elem}`);
     * };
     */
    onRemove: (idx: number, elem: any, _this: object) => void;
    
    /**
     * Events that occur after you delete an element from a collection.
     * 
     * @event BaseCollection#onRemoved
     * @param idx - Index of deleted elements.
     * @param elem - Deleted element.
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onRemoved = function(idx, elem, _this) {
     *     console.log(`After element deletion: index ${idx}, element ${elem}`);
     * };
     */
    onRemoved: (idx: number, elem: any, _this: object) => void;

    /**
     * Events that occur before the collection is initialized.
     * 
     * @event BaseCollection#onClear
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onClear = function(_this) {
     *     console.log ('Before collection initialization);
     * };
     */
    onClear: (_this: object) => {};

    /**
     * Events that occur after the collection is initialized.
     * 
     * @event BaseCollection#onCleared
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onCleared = function(_this) {
     *     console.log ('After collection initialization');
     * };
     */
    onCleared: (_this: object)=> {};

    /**
     * An event that occurs before you change an element in a collection.
     * 
     * @event BaseCollection#onChanging
     * @param idx - Index of the element to be changed.
     * @param elem - The element to be changed.
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onChanging = function(idx, elem, _this) {
     *     console.log(`Before element change: index ${idx}, element ${elem}`);
     * };
     */
    onChanging: (idx: number, elem: any, _this: object) => void;

    /**
     * Events that occur after you change an element in a collection.
     * 
     * @event BaseCollection#onChanged
     * @param idx - Index of the changed element.
     * @param elem - Changed element.
     * @param _this - current collection object.
     * 
     * @example
     * myCollection.onChanged = function(idx, elem, _this) {
     *     console.log ('After element change: index ${idx}, element ${elem}');
     * };
     */
    onChanged: (idx: number, elem: any, _this: object) => void;

    /**
     * Generates an 'onAdd' event.
     * 
     * @param idx - Index of the element to be added.
     * @param elem - The element to add.
     * @listens BaseCollection#onAdd
     */
    _onAdd(idx: number, elem: any): void;

    /**
     * Generates an 'onAdd' event.
     * 
     * @param idx - Index of added elements.
     * @param elem - Added element.
     * @listens BaseCollection#onAdded
     */
    _onAdded(idx: number, elem: any): void;

    /**
     *Create an 'onRemove' event. 
     * @param idx - Index of the element to be deleted.
     * @param lem - The element to delete.
     * @listens BaseCollection#onRemove
     */
    _onRemove(idx: number, elem: any): void;
    
    /**
     * Generates an 'onRemoved' event. 
     * @param idx - Index of the element to be deleted.
     * @param elem - The element to delete.
     * @listens BaseCollection#onRemoved
     */
    _onRemoved(idx: number, elem: any): void;
    
    /**
     * Generates an 'onClear' event.
     * @listens BaseCollection#onClear
     */
    _onClear();
    
    /**
     * Generates an 'onCheared' event.
     * @listens BaseCollection#onCleared
     */
    _onCleared();

    /**
     * Generates an 'onChanging' event.
     * @param idx - Index of the element to be changed.
     * @param elem - The element to be changed.
     * @listens BaseCollection#onChanging
     */
    _onChanging(idx: number, elem: any);

    /**
     * Generates an 'onChanged' event.
     * @param idx - Index of the changed element.
     * @param elem - Changed element.
     * @listens BaseCollection#onChanged
     */
    _onChanged(idx: number, elem: any);

    /**
     * Default descriptor set when adding elements to a collection.
     * 
     * @param idx - Index of the element to which the technician will be imported.
     * @protected
     */
    _getPropDescriptor(idx: number): object;

    /**
     * Deletes an element in the collection (use internally)
     * 
     * @param pos - Index of the element to be deleted.
     * @returns This is a Boolean value that indicates whether deletion is successful or not.
     * @abstract
     */
    abstract _remove(pos: number): boolean;

    /**
     * Returns the collection object as a guide type object.  
     * Circular references are replaced by $ref values.
     * 
     * @param {number} [vOpt=0] - Serialization option.
     * - opt=0: Reference structure (_guid: Yes, $ref: Yes)  
     * - opt=1: Redundant structure (_guid: Yes, $ref: Yes)  
     * - opt=2: Non-steep structure (_guid: No, $ref: No) 
     * @param {object | Array<object>} [own={}] - Parent objects that currently own the object. Default is an empty object.
     * 
     * @example
     * a.getObject(2) == b.getObject(2)
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * Sets the guide type object to the collection object.  
     * The object is initialized.
     * 
     * @param oGuid - serialized object.
     * @param {object} [origin=p_oGuid] - This is the source object that sets the current object. The default is oGuid.
     */
    setObject(oGuid: object, origin?: object);

    /**
     * Delete an element in the collection.
     * 
     * @param elem - The element to delete.
     * @returns Index of deleted elements.
     * 
     * @example
     * const removedIndex = myCollection.remove(someElement);
     * console.log(`Index of deleted element: ${removedIndex}`);
     */
    remove(elem: any): number;

    /**
     * Deletes an element in the specified location from the collection.
     * 
     * @param pos - Index of the element to be deleted.
     * @returns This is a Boolean value that indicates whether element deletion is successful or not.
     * 
     * @example
     * const success = myCollection.removeAt(0);
     * console.log(`Delete element successful: ${success}`);
     */
    removeAt(pos: number): boolean;

    /**
     * Verify that the element exists in the collection.
     * 
     * @param elem - This is the element to check.
     * @returns This is a Boolean value indicating the presence or absence of an element.
     * 
     * @example
     * const exists = myCollection.contains(someElement);
     * console.log(`element exists: ${exists}`);
     */
    contains(elem): boolean;

    /**
     * Look up an element in the collection.
     * 
     * @param elem - The element to look up.
     * @returns Index of element. If element does not exist, return -1.
     * 
     * @example
     * const index = myCollection.indexOf(someElement);
     * console.log (index of element: ${index});
     */
    indexOf(elem?: any): number;

    /**
     * Collects the results of calling a given function for each element and returns a new array.
     * @param callback - This is the callback function (currentValue, index, array) => any[]
     * @param thisArg - The value to use as this when executing the callback function.
     * @returns {any[]} Returns a new array of results.
     */
    map(callback: (value: any, index: number, array: this) => any, thisArg?: any): any[];

    /**
     * Filter only to elements that have passed the test implemented by the provided function
     * @param callback - 콜백함수 입니다.(currentValue, index, array) => boolean
     * @param thisArg - The value to use as this when executing the callback function.
     * @returns {any[]} Returns a new array of results.
     */
    filter(callback: (value: any, index: number, array: this) => any, thisArg?: any): any[];

    /**
     * Run the given reducer function for each element and return one result.
     * @param callback - 콜백함수 입니다. (accumulator, currentValue, index, array) => any
     * @param initialValue - Use the first element of the array if it does not provide an initial value.
     * @returns {any} Returns a new array of results.
     */
    reduce(callback: (value: any, index: number, array: this) => any, initialValue?: any): any;

    /**
     * Returns the first element that satisfies the provided test function
     * @param callback - This is the callback function. (currentValue, index, array) => any
     * @param thisArg - The value to use as this when executing the callback function.
     * @returns {any | undefined} The first element in the array that satisfies the test function. If no element satisfies the test function, undefined is returned.
     */
    find(callback: (value: any, index: number, array: this) => any, thisArg?: any): any | undefined;

    /**
     * Run the function provided for each element once.
     * @param callback - This is the callback function. (currentValue, index, array) => void
     * @param thisArg - The value to use as this when executing the callback function.
     */
    forEach(callback: (value: any, index: number, array: this) => void, thisArg?: any): void;

    /**
     * Test that at least one element passes through a given discriminant function. 
     * @param callback - 콜백함수 입니다. (currentValue, index, array) => boolean
     * @param thisArg - The value to use as this when executing the callback function.
     * @returns {boolean} Returns true if you return a true value for one element, or false.
     */
    some(callback: (value: any, index: number, array: this) => any, thisArg?: any): boolean;

    /**
     * Test that all elements pass the test implemented with the provided function.
     * @param callback - 콜백함수 입니다. (currentValue, index, array) => boolean
     * @param thisArg - The value to use as this when executing the callback function.
     * @returns {booklan} True if you return a true value for all array elements, otherwise false.
     */
    every(callback: (value: any, index: number, array: this) => any, thisArg?: any): boolean;

    /**
     * Returns the first element that satisfies the provided test function
     * @param callback - 콜백함수 입니다. (currentValue, index, array) => boolean
     * @param thisArg - The value to use as this when executing the callback function.
     * Index of the first element that passes the @returns{number} test. If no match exists, return -1.
     */
    findIndex(callback: (value: any, index: number, array: this) => any, thisArg?: any): any | undefined;

    /**
     * Add an element to the collection.
     * 
     * @abstract
     */
    abstract add(...args: any[]): number;

    /**
     * Initialize the collection.
     * @abstract
     */
    abstract clear(): void;

}

export = BaseCollection;