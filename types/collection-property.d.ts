import type IPropertyCollection     from "./i-collection-property.d.ts";
import type BaseCollection          from "./base-collection.d.ts";

/**
 * The 'Property Collection' class inherits the 'Base Collection' and implements the 'IProperty Collection' interface.  
 * This class manages attribute-based collections and provides the ability to access each element using keys and values.  
 */
type PropertyCollection<T> = IPropertyCollection<T> & BaseCollection<T> & {
    
    /**
     * Returns all key values in the collection to an array.  
     */
    get $keys(): string[];

    /**
     * Internal method to remove the specified element from the collection.  
     * 
     * @param index Location of the element to be removed
     * @returns Removal successful
     */
    _remove(index: number): boolean;

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param mode Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param context Parent object that contains (owns) the current object
     * @returns Guid type object literal
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param guidObj Object literal of the type of GUID to be set
     * @param guidRootObj Initial GUID literal object referenced during conversion
     */
    setObject(guidObj: object, guidRootObj?: object): void;
    
    /**
     * Adds an element to the collection.  
     * 
     * @param key Key of the element
     * @param elem Elements to add
     * @param desc Property descriptor object for element
     * @returns Location of the added element
     */
    add(key: string, elem: any,  desc?: PropertyDescriptor): number;

    /**
     * Initialize the collection.  
     * Empty $elements, $descripts, and $keys at initialization.  
     * 
     * @returns Additional success
     */
    clear(): boolean;

    /**
     * Query the index based on the key.  
     * 
     * @param key Key to view
     * @returns Index corresponding to key, return '-1' if not present
     */
    keyToIndex(key: string): number;

    /**
     * Query the key based on the index value.  
     * 
     * @param index Index to view
     * @returns Key values for that index
     */
    indexToKey(index: number): string;

    /**
     * Verify that the specified key exists in the collection.  
     * 
     * @param key Key value to check
     * @returns If the key exists, it is 'true', otherwise it is 'false'
     */
    exists(key: string): boolean;

    /**
     * Returns the result of executing the function provided to all elements to the new array.  
     * 
     * @param callbackfn Callback function to convert, (elem: T, index: number, key: string, list: T[]) => U
     * @param thisArg Objects to use as this inside the callback function
     * @returns New arrangement of transformed elements
     */
    map<U>(callbackfn: (elem: T, index: number, key: string, list: T[]) => U, thisArg?: any): U[];

    /**
     * Returns a new array containing only elements that satisfy the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to filter, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg Objects to use as this inside the callback function
     * @returns Array of filtered elements
     */
    filter(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): T[];

    /**
     * Returns the accumulated results by executing the reducer function provided to all elements.  
     * 
     * @param callbackfn callback function to be reduced, (acc: U, element: T, index: number, key: string, list: T[]) => U
     * @param initialValue Initial value
     * @returns Array of filtered elements
     */
    reduce<U>(callbackfn: (acc: U, elem: T, index: number, key: string, list: T[]) => U, initialValue: U): U;

    /**
     * Returns the first element that matches the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be searched, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg Objects to use as this inside the callback function
     * @returns The first element that satisfies the condition, 'undefined' if not found
     */
    find(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): T | undefined;

    /**
     * Run the function provided for all elements.  
     * 
     * @param callbackfn callback function to be executed, (elem: T, index: number, key: string, list: T[]) => void
     * @param thisArg Objects to use as this inside the callback function
     */
    forEach(callbackfn: (elem: T, index: number, key: string, list: T[]) => void, thisArg?: any): void;

    /**
     * Verify that at least one element matches the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg Objects to use as this inside the callback function
     * @returns  'true' if more than one element satisfies the condition, or 'false' if not
     */
    some(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * Verify that all elements satisfy the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg Objects to use as this inside the callback function
     * @returns 'true' if all elements meet the conditions, 'false' otherwise
     */
    every(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): boolean;

    /**
     * Returns the index of the first element that matches the conditions of the provided function.  
     * 
     * @param callbackfn Callback function to be examined, (elem: T, index: number, key: string, list: T[]) => boolean
     * @param thisArg Objects to use as this inside the callback function
     * @returns  Index of the first element that satisfies the condition, if not found '-1'
     */
    findIndex(callbackfn: (elem: T, index: number, key: string, list: T[]) => boolean, thisArg?: any): number;

} & {
    [key: string]: T;
};

export interface PropertyCollectionConstructor {
    /**
     * Creates an instance of the class 'PropertyCollection'.  
     * 
     * @param owner Objects that own this collection
     */
    new <T=string>(owner?: object): PropertyCollection<T>;
}
  
declare const PropertyCollection: PropertyCollectionConstructor;

export default PropertyCollection;
export { PropertyCollection };