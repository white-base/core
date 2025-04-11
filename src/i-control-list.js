/**** i-control-list.js | IListControl ****/
//==============================================================
import ExtendError      from './extend-error.js';  
   
/**
 * List control interface.
 * 
 * @interface
 */
class IListControl {

    static _NS = 'Interface';    // namespace
    static _KIND = 'interface';

    constructor() {
    }

    /**
     * Add an element to the list.
     * 
     * @abstract
     */
    add() {
        throw new ExtendError(/EL02151/, null, ['IListControl']);
    }

    /**
     * Remove an element from the list.
     * 
     * @abstract
     */
    del() {
        throw new ExtendError(/EL02152/, null, ['IListControl']);
    }

    /**
     * Verify that an element exists in the list.
     * 
     * @returns {boolean} If the element exists, it is 'true', otherwise it is 'false'
     * @abstract
     */
    has() {
        throw new ExtendError(/EL02153/, null, ['IListControl']);
    }

    /**
     * Search for elements in the list.
     * 
     * @abstract
     */
    find() {
        throw new ExtendError(/EL02154/, null, ['IListControl']);
    }
}

export default IListControl;
export { IListControl };