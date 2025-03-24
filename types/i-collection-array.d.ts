import ICollection from "./i-collection";

/**
 * Array collection interface.
 */
declare interface IArrayCollection<T> extends ICollection<T> {

    /**
     * Adds an element to the specified location.  
     * 
     * @param index Where to add
     * @param elem Elements to add
     * @returns Has the element been added successfully
     */
    insertAt(index: number, elem: T): boolean;
}

export default IArrayCollection;
export { IArrayCollection };