import type IArrayCollection    from "./i-collection-array.d.ts";
import type BaseCollection      from "./base-collection.d.ts";

/**
 * The 'Array Collection' class inherits the 'Base Collection' and implements the 'Array Collection' interface.  
 * This class manages collections in the form of arrays and provides a variety of methods for array-related tasks.  
 */
type ArrayCollection<T> = BaseCollection<T> & IArrayCollection<T> & {
    
    /**
     * Internal method to remove the specified element from the collection.  
     * 
     * @param index Index of the element to be removed
     * @returns Success or failure
     */
    _remove(index: number): boolean;

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param mode Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param context - Parent object that contains (owns) the current object
     * @returns Guid type object literal
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param guidObj object literal of the type of GUID to be set
     * @param guidRootObj Initial GUID literal object referenced during conversion
     */
    setObject(guidObj: object, guidRootObj?: object): void;

    /**
     * Adds an element to the collection.  
     * 
     * @param elem Elements to add
     * @param desc Property descriptor object for element
     * @returns Location of the added element
     */
    add(elem: T, desc?: PropertyDescriptor): number;

    /**
     * Initialize the collection.  
     * Empty the $elements and $descriptors arrays upon initialization.  
     * 
     * @returns Additional success
     */
    clear(): boolean;

    /**
     * Adds an element to the specified location.  
     * 
     * @param index Where to add
     * @param elem Elements to add
     * @param desc Property descriptor object for element
     * @returns Additional success
     */
    insertAt(index: number, elem: T, desc?: PropertyDescriptor): boolean;

    /**
     * Returns the result of executing the function provided to all elements to the new array.  
     * 
     * @param callbackfn callback function to convert, (elem: T, index: number, list: T[]) => U
     * @param thisArg Object to use as this inside the callback function
     * @returns Array of converted elements
     */
    map<U>(callbackfn: (elem: T, index: number, list: T[]) => U, thisArg?: any): U[];

    /**
     * Returns a new array containing only elements that satisfy the conditions of the provided function.  
     * 
     * @param callbackfn callback function to filter, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg Object to use as this inside the callback function
     * @returns Array of filtered elements
     */
    filter(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): T[];

    /**
     * Returns the accumulated results by executing the reducer function provided to all elements.  
     * 
     * @param callbackfn callback function to be reduced, (acc: U, element: T, index: number, list: T[]) => U
     * @param initialValue Initial value
     * @returns Accumulated final result value
     */
    reduce<U>(callbackfn: (acc: U, elem: T, index: number, list: T[]) => U, initialValue: U): U;

    /**
     * Returns the first element that matches the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be searched, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg Object to use as this inside the callback function
     * @returns The first element that satisfies the condition, 'undefined' if not found
     */
    find(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): T | undefined;

    /**
     * Run the function provided for all elements.  
     * 
     * @param callbackfn Callback function to run, (elem: T, index: number, list: T[]) => void
     * @param thisArg Object to use as this inside the callback function
     */
    forEach(callbackfn: (elem: T, index: number, list: T[]) => void, thisArg?: any): void;

    /**
     * Verify that at least one element matches the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg Object to use as this inside the callback function
     * @returns 'true' if more than one element satisfies the condition, or 'false' if not
     */
    some(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * Verify that all elements satisfy the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg Object to use as this inside the callback function
     * @returns  'true' if all elements meet the conditions, 'false' otherwise
     */
    every(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * Returns the index of the first element that matches the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be examined, (elem: T, index: number, list: T[]) => boolean
     * @param thisArg Object to use as this inside the callback function
     * @returns Index of the first element that satisfies the condition, if not found '-1'
     */
    findIndex(callbackfn: (elem: T, index: number, list: T[]) => boolean, thisArg?: any): number;
}

export interface ArrayCollectionConstructor {
    /**
     * Creates an instance of an ArrayCollection class.
     * 
     * @param owner Objects that own this collection
     */
    new <T=string>(owner?: object): ArrayCollection<T>;
}
  
declare const ArrayCollection: ArrayCollectionConstructor;

export default ArrayCollection;
export { ArrayCollection };
