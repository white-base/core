/**** i-collection-array.js | IArrayCollection ****/
//==============================================================
import ExtendError      from './extend-error.js';   
// import Util             from './util.js'; 
import ICollection      from './i-collection.js';

/**
 * Array collection interface.
 * 
 * @extends ICollection
 */
class IArrayCollection extends ICollection {

    static _KIND = 'interface';
    static _NS = 'Interface';  // namespace

    constructor() {
        super();
    }

    /**
     * Adds an element to the specified location.
     * 
     * @abstract
     */
    insertAt() {
        throw new ExtendError(/EL02171/, null, ['IArrayCollection']);
    }
}

export default IArrayCollection;
export { IArrayCollection };