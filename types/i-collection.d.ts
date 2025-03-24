/**
 * This is the collection interface.
 */
declare interface ICollection<T> {
    
    /**
     * Add an element to the collection.  
     * 
     * @returns Index of added elements
     */
    add(...args: any[]): number;

    /**
     * Remove an element from the collection.  
     * 
     * @param elem Elements to be removed
     * @returns Index of removed element, '-1' if element does not exist
     */
    remove(elem: T): number;

    /**
     * Verify that an element exists in the collection.  
     * 
     * @param elem Factors to check
     * @returns If the element exists, it is 'true', otherwise it is 'false'
     */
    contains(elem: T): boolean;

    /**
     * Returns the index of an element in the collection.  
     * 
     * @param elem Elements to view
     * @returns index of element, '-1' without element
     */
    indexOf(elem: T): number;
}

export default ICollection;
export { ICollection };