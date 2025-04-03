/**** i-control-list.js | IListControl ****/
//==============================================================
// import Message from './message.js';    
import ExtendError from './extend-error.js';  
   
var IListControl  = (function () {
    /**
     * List control interface.  
     * 
     * @constructs IListControl
     * @interface
     */
    function IListControl() {
    }

    IListControl._NS = 'Interface';    // namespace
    IListControl._KIND = 'interface';
    
    /**
     * Add an element to the list.  
     * 
     * @abstract
     */
    IListControl.prototype.add = function() {
        throw new ExtendError(/EL02151/, null, ['IListControl']);
    };

    /**
     * Remove an element from the list.  
     * 
     * @abstract
     */
    IListControl.prototype.del  = function() {
        throw new ExtendError(/EL02152/, null, ['IListControl']);
    };

    /**
     * Verify that an element exists in the list.  
     * 
     * @returns {boolean} If the element exists, it is 'true', otherwise it is 'false'
     * @abstract
     */
    IListControl.prototype.has  = function() {
        throw new ExtendError(/EL02153/, null, ['IListControl']);
    };

    /**
     * Search for elements in the list.  
     * 
     * @abstract
     */
    IListControl.prototype.find  = function() {
        throw new ExtendError(/EL02154/, null, ['IListControl']);
    };

    return IListControl;
    
}());

export default IListControl;
export { IListControl };