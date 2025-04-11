/**** i-collection-property.js | IPropertyCollection ****/
//==============================================================
import ExtendError      from './extend-error.js';    
// import Util             from './util.js';
import ICollection      from './i-collection.js';

/**
 * This is the property collection interface.
 * 
 * @interface
 * @extends ICollection
 */
class IPropertyCollection extends ICollection {

    static _KIND = 'interface';
    static _NS = 'Interface';  // namespace

    constructor() {
        super();
    }

    /**
     * Returns the property key for the specified index.
     * 
     * @returns {boolean} Property key for that index
     * @abstract
     */
    indexToKey() {
        throw new ExtendError(/EL02181/, null, ['IPropertyCollection']);
    }
}

export default IPropertyCollection;
export { IPropertyCollection };