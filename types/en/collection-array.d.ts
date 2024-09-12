import IArrayCollection     from './i-collction-array';
import BaseCollection       from './base-collection';
    
/**
 * The 'Array Collection' class inherits the 'Base Collection' and implements the 'IAray Collection' interface.
 * This class manages collections in the form of arrays and provides a variety of methods for array-related tasks.
 * 
 * @extends BaseCollection
 * @implements IArrayCollection
 * 
 * @example
 * const myCollection = new ArrayCollection(someOwner);
 * myCollection.add(someElement);
 * console.log(myCollection.count); // Number of elements in the collection
 */
declare class ArrayCollection extends BaseCollection implements IArrayCollection {

    /**
     * Creates an instance of an ArrayCollection class.
     * 
     * @param owner The object that owns this collection.
     */
    constructor(owner);
    
    /**
     * Deletes an element in a specified location in the collection.
     * This method deletes the element by implementing the abstract method '_remove'.
     * (Use template method patterns)
     * 
     * @param pos - Index of the element to be deleted.
     * @returns This is a Boolean value that indicates whether deletion is successful or not.
     * 
     * @example
     * const success = myCollection._remove(0);
     * console.log(`Delete element successful: ${success}`);
     */
    _remove(pos: number): boolean;

    /**
     * Returns array collection objects in serialization. Circular references are replaced by values of '$ref'.
     * 
     * @param {number} [vOpt=0] - Serialization option. (Default: 0)
     * - 0: Reference structure (_guid: Yes, $ref: Yes)
     * - 1: Redundant structure (_guid: Yes, $ref: Yes)
     * - 2: Non-tidal rescue (_guid: no, $ref: no)
     * @param {object | Array<object>} [own={}] - Parent objects that you own. Default is an empty object.
     * @returns Serialized collection object.
     * 
     * @example
     * const serializedObj = collection.getObject(2);
     * console.log(serializedObj);
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * Initializes the array collection object using serialized objects; the collection is initialized during this process.
     * 
     * @param oGuid - serialized object.
     * @param {object} [origin=oGuid] - Original object. Default is 'oGuid'.
     */
    setObject(oGuid: object, origin?: object): void;

    /**
     * Adds an element to an array collection.
     * 
     * @param elem - The element to add.
     * @param {propertyDescriptor} [desc] - Property descriptor object for element. Optional.
     * @returns{number} Index of added elements.
     * 
     * @example
     * const index = myCollection.add(newElement, { configurable: true });
     * console.log(`Index of added element: ${index}`);
     */
    add(elem: any, desc?: PropertyDescriptor): number;

    /**
     * Initialize the array collection. The initialization targets are '$elements' and '$descriptors' arrays.
     * 
     * @example
     * myCollection.clear();
     * console.log(myCollection.count); // 0
     */
    clear(): void;

    /**
     * Adds an element to a specified location in an array collection.
     * 
     * @param pos - The location of the index to be added.
     * @param elem - The element to add.
     * @param {propertyDescriptor} [desc] - Property descriptor object for element. Optional.
     * @returns This is a Boolean value that indicates whether the element has been added successfully.
     * 
     * @example
     * const success = myCollection.insertAt(1, newElement, { configurable: true });
     * console.log(`Add element success: ${success}`);
     */
    insertAt(pos: number, elem: any, desc?: PropertyDescriptor): boolean;

}
// }

export = ArrayCollection