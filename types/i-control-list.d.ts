/**
 * List control interface.  
 */
declare interface IListControl {
    
    /**
     * Add an element to the list.  
     */
    add(...args: any[]): void;

    /**
     * Remove an element from the list.  
     */
    del(...args: any[]): void;

    /**
     * Verify that an element exists in the list.  
     * 
     * @returns If the element exists, it is 'true', otherwise it is 'false'
     */
    has(...args: any[]): boolean;

    /**
     * Search for elements in the list.
     * 
     * @returns The first element that satisfies the condition, 'undefined' if not found
     */
    find(...args: any[]): any | undefined;
}

export default IListControl;
export { IListControl };