/**** i-marshal.js | IMarshal ****/
//==============================================================
import ExtendError      from './extend-error.js';    
   
/**
 * Object control interface.
 * 
 * @interface
 */
class IMarshal {
    
    static _NS = 'Interface';    // namespace
    static _KIND = 'interface';

    /**
     * @constructs IMarshal
     */
    constructor() {
    }

    /**
     * Internal property that stores the unique identifier of the object.
     * 
     * @member {string}
     */
    _guid = String;

    /**
     * Internal property that stores the creator type of the object.
     * 
     * @member {string} REVIEW:
     */
    _type = [['_req_', Function, { $type: 'class' }]];

    /**
     * Returns the object literal.
     * 
     * @abstract
     */
    getObject() {
        throw new ExtendError(/EL02121/, null, ['IMarshal']);
    }

    /**
     * Set the object literal by converting it to an instance.
     * 
     * @abstract
     */
    setObject() {
        throw new ExtendError(/EL02122/, null, ['IMarshal']);
    }
}

export default IMarshal;
export { IMarshal };