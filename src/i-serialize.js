/**** i-serialize.js | ISerialize ****/
//==============================================================
// import Message from './message.js';    
import ExtendError from './extend-error.js';  
   
var ISerialize  = (function () {
    /**
     * Interface for serialization and deserialization.  
     * @constructs ISerialize
     * @interface
     */
    function ISerialize() {
    }

    ISerialize._NS = 'Interface';    // namespace
    ISerialize._KIND = 'interface';

    /**
     * Serialize objects, convert them into strings (such as JSON), and export them.  
     * 
     * @returns {string} Serialized String
     * @abstract
     */
    ISerialize.prototype.output  = function() {
        throw new ExtendError(/EL02191/, null, ['ISerialize']);
    };

    /**
     * Restore objects by loading serialized data.  
     * 
     * @abstract
     */
    ISerialize.prototype.load  = function() {
        throw new ExtendError(/EL02192/, null, ['ISerialize']);
    };

    return ISerialize;
    
}());

export default ISerialize;
export { ISerialize };