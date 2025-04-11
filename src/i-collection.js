/**** i-collection.js | ICollection ****/
//==============================================================
import ExtendError      from './extend-error.js';

/**
 * This is the collection interface.
 * 
 * @interface
 */
class ICollection {

    static _KIND = 'interface';
    static _NS = 'Interface';  // namespace

    constructor() {
    }

    /**
     * Add an element to the collection.
     * 
     * @abstract
     */
    add() {
        throw new ExtendError(/EL02161/, null, ['ICollection']);
    }

    /**
     * Remove an element from the collection.
     * 
     * @abstract
     */
    remove() {
        throw new ExtendError(/EL02162/, null, ['ICollection']);
    }

    /**
     * Verify that an element exists in the collection.
     * 
     * @returns {boolean} If the element exists, it is 'true', otherwise it is 'false'
     * @abstract
     */
    contains() {
        throw new ExtendError(/EL02163/, null, ['ICollection']);
    }

    /**
     * Returns the index of an element in the collection.
     * 
     * @returns {number} index of element, '-1' without element
     * @abstract
     */
    indexOf() {
        throw new ExtendError(/EL02164/, null, ['ICollection']);
    }
}

export default ICollection;
export { ICollection };