/**
 * List interface.  
 */
declare interface IList<T> {
    
    /**
     * An internal array that stores the data in the list.  
     */
    _list: T[];

    /**
     * Returns the number of lists.
     */
    count: number;
}

export default IList;
export { IList };
