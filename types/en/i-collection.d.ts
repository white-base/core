/**
 * This is the collection interface.
 * @interface
 */
declare interface ICollection {

    /**
     * Add an element to the collection.
     * @param args - Factors to add
     * @returns Index of added elements
     */
    add(...args: any[]): number;

    /**
     * Remove an element from the collection.
     * @param args - Elements to be removed
     * @returns Index of the element I did. If the element does not exist -1
     */
    remove(...args: any[]): number;

    /**
     * Verify that the element exists in the collection.
     * @param args - factors to check
     * @returns True if element exists, false otherwise
     */
    contains(...args: any[]): boolean;

    /**
     * Look up an element in the collection.
     * @param args - Factors to look up
     * Index of @returns element. If element does not exist -1
     */
    indexOf(...args: any[]): number;
}

export = ICollection;