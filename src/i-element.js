/**** i-element.js | IElement ****/
//==============================================================
import ExtendError      from './extend-error.js';  

/**
 * Element (independent) interface.
 * 
 * @interface
 */
class IElement {

    static _NS = 'Interface';    // namespace
    static _KIND = 'interface';

    /**
     * @constructs IElement
     */
    constructor() {
    }

    /**
     * Internal property that stores the name of the element.
     * 
     * @member {string}
     */
    _name = String;

    /**
     * Creates a copy of the current element.
     * 
     * @returns {object} Replicated Elements
     * @abstract
     */
    clone() {
        throw new ExtendError(/EL02131/, null, ['IElement']);
    }
}

export default IElement;
export { IElement };