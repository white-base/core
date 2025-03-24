/**** i-object.js | IObject ****/
//==============================================================
// 1. import module    
import Message from './message.js';    
import ExtendError from './extend-error.js';    

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IObject  = (function () {
    /**
     * Object interface.  
     * 
     * @constructs IObject 
     * @interface
     */
    function IObject() {
    }
    
    IObject._NS = 'Interface';    // namespace
    IObject._KIND = 'interface';

    /**
     * Returns a list of types of objects.  
     * 
     * @returns {Function[]} Arrangement of types of objects
     * @abstract
     */
    IObject.prototype.getTypes  = function() {
        throw new ExtendError(/EL02111/, null, ['IObject']);
    };
    
    /**
     * Verify that the object is an instance of a particular class or interface.  
     * 
     * @returns {boolean} Instance or 'true' if it's an instance or 'false' if it's not
     * @abstract
     */
    IObject.prototype.instanceOf  = function() {
        throw new ExtendError(/EL02112/, null, ['IObject']);
    };

    /**
     * Compare that the object is the same as the given object.  
     * 
     * @returns {boolean} If two objects are the same, 'true', or 'false'
     * @abstract
     */
    IObject.prototype.equal  = function() {
        throw new ExtendError(/EL02113/, null, ['IObject']);
    };
    
    return IObject;
    
}());

//==============================================================
// 4. module export
export default IObject;
export { IObject };