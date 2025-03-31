/**** i-element.js | IElement ****/
//==============================================================
import Message from './message.js';    
import ExtendError from './extend-error.js';  
   
var IElement  = (function () {
    /**
     * Element (independent) interface.  
     * @constructs IElement
     * @interface
     */
    function IElement() {
        /**
         * Internal property that stores the name of the element.  
         * 
         * @member {string} IElement#_name
         */
        this._name = String;
    }

    IElement._NS = 'Interface';    // namespace
    IElement._KIND = 'interface';

    /**
     * Creates a copy of the current element.  
     * 
     * @returns {object} Replicated Elements
     * @abstract
     */
    IElement.prototype.clone  = function() {
        throw new ExtendError(/EL02131/, null, ['IElement']);
    };

    return IElement;
    
}());

export default IElement;
export { IElement };