import EventEmitter from "./event-emitter";
import ICollection from "./i-collection";
import IList from "./i-list";
import MetaObject from "./meta-object";

/**
 * This is the default collection class.  
 * It serves as the top class for all collections.  
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
declare abstract class BaseCollection<T> extends MetaObject implements ICollection<T>, IList<T> {

    /**
     * Object that handles events. Used to register and generate various events in the collection.  
     */
    $event: EventEmitter;
    
    /**
     * An arrangement that stores elements of a collection.
     */
    $elements: any[];

    /**
     * An array of descriptors that define getter and setter methods for each collection element.
     */
    $descriptors: object[];

    /**
     * List of reserved words for the collection.
     */
    $KEYWORD: string[];

    /**
     * Owned object of the collection.
     */
    _owner: object;
    
    /**
     * Defines the type constraints for the collection element.
     */
    _elemTypes: any[];

    /**
     * An array that stores a list of elements in a collection. This array contains actual data from the collection.
     */
    _list: T[];

    /**
     * Returns the number of elements in the collection.
     */
    get count(): number;

    /**
     * Returns the number of elements in the collection.
     */
    get length(): number;

    /**
     * Event handler called before adding an element to a collection.
     * 
     * @param elem Index of the element to be added
     * @param index Elements to Add
     * @param collection Current collection objects
     * @returns If you return 'false', the change will stop, and if there is no return value or 'true', the change will continue.
     */
    onAdd: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * Event handler that is called after an element is added.
     * 
     * @param elem Added elements
     * @param index Added index
     * @param collection Current collection objects
     */
    onAdded: (elem: T, index: number, collection: object) => void;

    /**
     * Event handler called before removing an element.
     * 
     * @param elem Elements to be removed
     * @param index Index to be removed
     * @param collection Current collection objects
     * @returns  If you return 'false', the change will stop, and if there is no return value or 'true', the change will continue.
     */
    onRemove: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * Event handler that is called after the element is removed.
     * 
     * @param elem Removed Elements
     * @param index Removed index
     * @param collection Current collection objects
     */
    onRemoved: (elem: T, index: number, collection: object) => void;

    /**
     * Event handler called before deleting all elements.
     * 
     * @param collection Current collection objects
     * @returns If you return 'false', the change will stop, and if there is no return value or 'true', the change will continue.
     */
    onClear: (collection: object) => boolean | void;

    /**
     * Event handler that is called after all elements are deleted.
     * 
     * @param collection Current collection objects
     */
    onCleard: (collection: object) => void;

    /**
     * Event handler called before the element changes.
     * 
     * @param nextValue New value to be changed
     * @param prevValue Existing value
     * @param index Index of the element to be changed
     * @param collection Current collection objects
     * @returns If you return 'false', the change will stop, and if there is no return value or 'true', the change will continue.
     */
    onChanging: (nextValue: T, prevValue: T, index: number, collection: object) => boolean | void;

    /**
     * Event handler that is called after an element changes.
     * 
     * @param nextValue New value changed
     * @param prevValue Existing value
     * @param index Index of changed element
     * @param collection Current collection objects
     */
    onChanged: (nextValue: T, prevValue: T, index: number, collection: object) => void;

    /**
     * Creates a default collection.  
     * Because this class is an abstract class, you must create an instance by inheritance.  
     * 
     * @param owner - Objects that own this collection
     */
    constructor(owner?: any);

    /**
     * Internal event execution method called before adding an element.
     * 
     * @param elem Elements to be added
     * @param index Index to which the element will be added
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onAdd(elem: T, index: number): boolean | undefined;

    /**
     *  Internal event execution method called after an element is added.
     * 
     * @param elem Added elements
     * @param index Index with element added
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onAdded(elem: T, index: number): boolean | undefined;

    /**
     * Internal event execution method called before removing an element.
     * 
     * @param elem Elements to be removed
     * @param index Index on which the element will be removed
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onRemove(elem: T, index: number): boolean | undefined;

    /**
     * Internal event execution method called after the element is removed.
     * 
     * @param elem Removed elements
     * @param index Index from which the element was removed
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onRemoved(elem: T, index: number): boolean | undefined;

    /**
     * Internal event execution method called before deleting all elements.
     * 
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onClear(): boolean | undefined;

    /**
     * Internal event execution method called after all elements are deleted.
     * 
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onCleard(): boolean | undefined;

    /**
     *  Internal event execution method called before the element changes.
     * 
     * @param nextValue New value to be changed
     * @param prevValue Existing value
     * @param index Index of the element to be changed
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onChanging(nextValue: T, prevValue: T, index: number): boolean | undefined;

    /**
     * Internal event execution method called after the element changes.
     * 
     * @param nextValue New value changed
     * @param prevValue Existing value
     * @param index Index of changed element
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onChanged(nextValue: T, prevValue: T, index: number): boolean | undefined;

    /**
     * Internal method to set descriptors (descriptors) for properties corresponding to a particular index.
     * 
     * @param index Index to specify the property
     * @param isEnumerable Whether the property is enumerable
     */
    _getPropDescriptor(index: number, isEnumerable: boolean): void;

    /**
     * Remove the element from the collection.
     * 
     * @returns Delete successfully
     */
    abstract _remove(...args: any[]): boolean;

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param mode - Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1 : Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param context - Top objects that contain (own) current objects
     * @returns Guid type object literal
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * Set up a GUID type object literal by converting it to an instance object.
     * 
     * @param guidObj - Object literal of type of GUID to set  
     * @param guidRootObj - Initial GUID literal object referenced during conversion
     */
    setObject(guidObj: object, guidRootObj?: object): void;

    /**
     * Remove the element from the collection.
     * 
     * @param elem - Elements to be removed
     * @returns Index of removed element. If element does not exist -1
     */
    remove(elem: T): number;

    /**
     * Remove the element in the specified location.
     * 
     * @param index - Where to Remove
     * @returns Processing Results
     */
    removeAt(index: number): boolean;

    /**
     * Verify that the element exists in the collection.
     * 
     * @param elem - What to check
     * @returns Existence
     */
    contains(elem: T): boolean;

    /**
     * Gets the index of the element.
     * 
     * @param elem - elements to search for
     * @returns Index of element (if not present -1)
     */
    indexOf(elem: T): number;

    /**
     * Adds an element to the collection.
     * 
     * @returns Index of added elements
     */
    abstract add(...args: any[]): number;

    /**
     * Initialize the collection.
     */
    abstract clear(): void;
}

export default BaseCollection;
export { BaseCollection };