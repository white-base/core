/**** i-list.js | IList ****/
//==============================================================

/**
 * List interface.
 * 
 * @interface
 */
class IList {
    
    static _NS = 'Interface';    // namespace
    static _KIND = 'interface';

    /**
     * @constructs IList
     */
    constructor() {
    }
    
    /**
     * An internal array that stores the data in the list.
     * 
     * @member {array}
     */
    _list = Array;
    
    /**
     * Returns the number of lists.
     * 
     * @member {number}
     */
    count = Number;
}

export default IList;
export { IList };