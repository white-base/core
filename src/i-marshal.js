/**** i-marshal.js | IMarshal ****/
//==============================================================
// import module
import Message from './message.js';    
import ExtendError from './extend-error.js';    

//==============================================================
// module implementation   
var IMarshal  = (function () {
    /**
     * Object control interface.  
     * 
     * @interface
     */
    function IMarshal() {

        /**
         * Internal property that stores the unique identifier of the object.  
         * 
         * @member {string} IMarshal#_guid
         */
        this._guid = String;

        /**
         * Internal property that stores the creator type of the object.  
         * 
         * @member {string} IMarshal#_type REVIEW:
         */
        this._type = [['_req_', Function, {$type: 'class'} ]];
    }

    IMarshal._NS = 'Interface';    // namespace
    IMarshal._KIND = 'interface';
    
    /**
     * Returns the object literal.  
     * 
     * @abstract
     */
    IMarshal.prototype.getObject = function() {
        throw new ExtendError(/EL02121/, null, ['IMarshal']);
    };

    /**
     * Set the object literal by converting it to an instance.  
     * 
     * @abstract
     */
    IMarshal.prototype.setObject  = function() {
        throw new ExtendError(/EL02122/, null, ['IMarshal']);
    };

    return IMarshal;
    
}());

//==============================================================
// module export
export default IMarshal;
export { IMarshal };