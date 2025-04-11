/**** i-serialize.js | ISerialize ****/
//==============================================================
import ExtendError      from './extend-error.js';  

/**
 * Interface for serialization and deserialization.
 * 
 * @interface
 */
class ISerialize {
    
    static _NS = 'Interface';    // namespace
    static _KIND = 'interface';

    /**
     * @constructs ISerialize
     */
    constructor() {
    }

    /**
     * Serialize objects, convert them into strings (such as JSON), and export them.
     * 
     * @returns {string} Serialized String
     * @abstract
     */
    output() {
        throw new ExtendError(/EL02191/, null, ['ISerialize']);
    }

    /**
     * Restore objects by loading serialized data.
     * 
     * @abstract
     */
    load() {
        throw new ExtendError(/EL02192/, null, ['ISerialize']);
    }
}

export default ISerialize;
export { ISerialize };