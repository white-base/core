/**** i-object.js | IObject ****/
//==============================================================    
import ExtendError      from './extend-error.js';    

/**
 * Object interface.
 * 
 * @interface
 */
class IObject {

    static _NS = 'Interface';    // namespace
    static _KIND = 'interface';

    /**
     * @constructs IObject
     */
    constructor() {
    }

    /**
     * Returns a list of types of objects.
     * 
     * @returns {Function[]} Arrangement of types of objects
     * @abstract
     */
    getTypes() {
        throw new ExtendError(/EL02111/, null, ['IObject']);
    }

    /**
     * Verify that the object is an instance of a particular class or interface.
     * 
     * @returns {boolean} Instance or 'true' if it's an instance or 'false' if it's not
     * @abstract
     */
    instanceOf() {
        throw new ExtendError(/EL02112/, null, ['IObject']);
    }

    /**
     * Compare that the object is the same as the given object.
     * 
     * @returns {boolean} If two objects are the same, 'true', or 'false'
     * @abstract
     */
    equal() {
        throw new ExtendError(/EL02113/, null, ['IObject']);
    }
}

export default IObject;
export { IObject };