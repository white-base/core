import type EventEmitter from "./event-emitter.d.ts";
import type ICollection from "./i-collection.d.ts";
import type IList from "./i-list.d.ts";
import type MetaObject from "./meta-object.d.ts";

/**
* The 'BaseCollection' class inherits the 'MetaObject' and implements the 'ICcollection' and 'IList' interfaces.
* This class acts as the top class for all collections.
*/
declare abstract class BaseCollection<T> extends MetaObject implements ICollection<T>, IList<T> {

    /**
    * List of strings used as reserved words in the collection.
    */
    readonly $KEYWORD: string[];

    /**
    * Object that handles events. Used to register and generate various events in the collection.
    */
    $event: EventEmitter;
    
    /**
    * An arrangement that stores elements of a collection.
    */
    $elements: any[];

    /**
    * A descriptor array that defines the getter and setter methods for each collection element.
    */    
    $descriptors: object[];

    /**
    * Owned object of the collection.
    */
    _owner: object;

    /**
    * Defines the type constraints for the collection element.
    */
    _elemTypes: any[];

    /**
    * An array that stores a list of elements in a collection.
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
     * @param elem Elements to add
     * @param index Index of the element to be added
     * @param collection Current collection objects
     * @returns  If you return 'false', the change will stop, and if there is no return value or 'true', the change will continue.
     */
    onAdd: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * Event handler that is called after an element is added.
     * 
     * @param elem  Added elements
     * @param index Index of added element
     * @param collection Current collection objects
     */
    onAdded: (elem: T, index: number, collection: object) => void;

    /**
     * Event handler called before removing an element.
     * 
     * @param elem Elements to be removed
     * @param index Index of the element to be removed
     * @param collection Current collection objects
     * @returns If you return 'false', the change will stop, and if there is no return value or 'true', the change will continue.
     */
    onRemove: (elem: T, index: number, collection: object) => boolean | void;

    /**
     * Event handler that is called after the element is removed.
     * 
     * @param elem Removed elements
     * @param index Index of removed element
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
    onCleared: (collection: object) => void;

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
     * The creator that creates the collection.  
     * This is an abstract class, and you must create an instance through inheritance.  
     * 
     * @param owner Objects that own this collection
     */
    constructor(owner?: any);

    /**
     * Internal method that runs before adding an element.  
     * 
     * @param elem .Elements to be added
     * @param index Where the element will be added
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onAdd(elem: T, index: number): boolean | undefined;

    /**
     * Internal method that runs after an element is added.  
     * 
     * @param elem Added elements
     * @param index Location where the element was added
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onAdded(elem: T, index: number): boolean | undefined;

    /**
     * Internal method that runs before removing an element.
     * 
     * @param elem Elements to be removed
     * @param index Where the element will be removed
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onRemove(elem: T, index: number): boolean | undefined;

    /**
     * Internal method that runs after the element is removed.  
     * 
     * @param elem Removed elements
     * @param index Where the element was removed
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onRemoved(elem: T, index: number): boolean | undefined;

    /**
     * Internal method that runs before deleting all elements.
     * 
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onClear(): boolean | undefined;

    /**
     * Internal method that runs after all elements are deleted.  
     * 
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onCleared(): boolean | undefined;

    /**
     * Internal method that runs before the element changes.
     * 
     * @param nextValue New value to be changed
     * @param prevValue Existing value
     * @param index Location of the element to be changed
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onChanging(nextValue: T, prevValue: T, index: number): boolean | undefined;

    /**
     * Internal method that runs after the element changes.  
     * 
     * @param nextValue New value changed
     * @param prevValue Existing value
     * @param index Location of changed element
     * @returns true: listener execution completed, false: listener processing failed, undefined: no listener
     */
    _onChanged(nextValue: T, prevValue: T, index: number): boolean | undefined;

    /**
     * Internal method to set the attribute descriptor for a particular index.  
     * 
     * @param index Where to specify properties
     * @param isEnumerable whether the property is enumerable
     */
    _getPropDescriptor(index: number, isEnumerable: boolean): void;

    /**
     * Internal method to remove elements from the collection.  
     * 
     * @returns 삭제 성공 여부
     */
    abstract _remove(...args: any[]): boolean;

    /**
     * 객체를 GUID 타입의 객체 리터럴로 반환합니다.
     * 
     * @param mode Import mode  
     * mode=0 : reference structure(_guid:Yes, $ref:Yes)  
     * mode=1 : Redundant structure(_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure(_guid:No,  $ref:No)   
     * @param context Parent object that contains (owns) the current object
     * @returns Guid type object literal
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * Set up a GUID type object literal by converting it to an instance object.
     * 
     * @param guidObj Object literal of type of GUID to set
     * @param guidRootObj Initial GUID literal object referenced during conversion
     */
    setObject(guidObj: object, guidRootObj?: object): void;

    /**
     * Remove the element from the collection.  
     * 
     * @param elem Elements to be removed
     * @returns Index of removed element. If element does not exist, return -1
     */
    remove(elem: T): number;

    /**
     * Remove the element in the specified location.  
     * 
     * @param index Where to remove
     * @returns Element Removal Successful
     */
    removeAt(index: number): boolean;

    /**
     * Verify that a particular element exists in the collection.  
     * 
     * @param elem Factors to check
     * @returns Element Existence
     */
    contains(elem: T): boolean;

    /**
     * Returns the index of an element.  
     * 
     * @param elem Elements to search for
     * @returns Index of element, return -1 if element is missing
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