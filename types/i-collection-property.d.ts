import type ICollection from "./i-collection.d.ts";

/**
 * This is the property collection interface.  
 */
declare interface IPropertyCollection<T> extends ICollection<T> {
    /**
     * Returns the property key for the specified index.  
     * 
     * @param index Index of properties to check
     * @returns Property key for that index
     */
    indexToKey(index: number): string;
}

export default IPropertyCollection;
export { IPropertyCollection };