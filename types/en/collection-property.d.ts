import IPropertyCollection  from './i-collection-property';
import BaseCollection       from './base-collection';

/**
 * The 'Property Collection' class inherits the 'Base Collection' and implements the 'IProperty Collection' interface.
 * This class manages attribute-based collections and provides the ability to access each element using keys and values.
 * 
 * @extends BaseCollection
 * @implements IPropertyCollection
 * 
 * @example
 * const myCollection = new PropertyCollection(someOwner);
 * myCollection.add("key1", someElement);
 * console.log(myCollection.indexToKey(0)); // "key1"
 */
declare class PropertyCollection extends BaseCollection implements IPropertyCollection {
    
    /**
     * Creates an instance of the class 'PropertyCollection'.
     * 
     * @param owner The object that owns this collection.
     */
    constructor(owner: object);
    
    /**
     * Stores the key values of the collection element in an array.
     */
    $keys: string[];

    /**
     * Deletes an element in a specified location in the collection.
     * Use the template method pattern to perform the deletion.
     * 
     * @param pos - Index of the element to be deleted.
     * @returns This is a Boolean value that indicates whether element deletion is successful or not.
     * 
     * @example
     * const success = myCollection._remove(1);
     * console.log(`Delete element successful: ${success}`);
     */
    _remove(pos: number): boolean;

    /**
     * Returns properties collection objects as serialized objects.
     * Circular references are replaced by $ref values.
     * 
     * @param {number} [vOpt=0] - Serialization option. 
     * - 0: Reference structure (_guid: Yes, $ref: Yes)
     * - 1: Redundant structure (_guid: Yes, $ref: Yes)
     * - 2: Non-tidal rescue (_guid: no, $ref: no)
     * @param {object | object[]} [own={}] - Parent objects that you own. Default is an empty object.
     * @returns {object} serialized object.
     * 
     * @example
     * const serializedObj = collection.getObject(2);
     * console.log(serializedObj);
     */
    getObject(vOpt?: number, owned?: object | object[]): object;

    /**
     * Initialize the property collection object using serialized objects.
     * During this process, the object is initialized.
     * 
     * @param oGuid - serialized object.
     * @param {object} [origin=oGuid] - Original object. Default is 'oGuid'.
     */
    setObject(oGuid: object, origin?: object): void;

    // /**
    //  * Returns the index of the key or element specified in the property collection.
    //  * 
    //  * @param target - A key or element to be searched for. A string can be passed to you if you query with a key.
    //  * @param{booklan} [isKey=false] - This is a Boolean value that determines whether to query with a key. Default is 'false'.
    //  * Index of element @returns{number}; return '-1' if element does not exist.
    //  * 
    //  * @example
    //  * const index = myCollection.indexOf("key1", true);
    //  * console.log ('index of key: ${index}');
    //  */
    // indexOf(target: any | string, isKey?: boolean): number;

    /**
     * Add an element to the property collection.
     * 
     * @param key - Key of the key element.
     * @param elem - The element to add.
     * @param {PropertyDescriptor} [desc] - Property descriptor object for element. Select value.
     * @returns {number} Index of added elements.
     */
    add(key: string, elem: any,  desc?: PropertyDescriptor): number;

    /**
     * Initialize the property collection.
     * This method initializes the array '$elements', '$descriptors', and '$keys'.
     * The event is not initialized.
     * 
     * @example
     * myCollection.clear();
     * console.log(myCollection.count); // 0
     */
    clear(): void;

    /**
     * Returns the index of the key or element specified in the property collection.
     * 
     * @param key - key This is the key to look up.
     * @returns {number} Index of element . Returns '-1' if element does not exist.
     * 
     * @example
     * const index = myCollection.keyToIndex("key1");
     * console.log(`Index of key: ${index}`);
     */
    keyToIndex(key: string): number;
    
    /**
     * Returns the key corresponding to the index of the property collection.
     * 
     * @param idx - Index value to query.
     * @returns {string} Key corresponding to  index. You can return 'undefined' if the index is out of range.
     * 
     * @example
     * const key = myCollection.indexToKey(0);
     * console.log(key for index 0: ${key}');
     */
    indexToKey(idx: number): string;

    /**
     * Verify that the specified key exists in the property collection.
     * 
     * @param key - Key to check.
     * Bulian value indicating the presence or absence of the @returns key.
     */
    exist(key: string): boolean;

}

export = PropertyCollection;