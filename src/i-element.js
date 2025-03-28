/**** i-element.js | IElement ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';  

//==============================================================
// 2. module dependency check
// if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
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

//==============================================================
// 4. module export
export default IElement;
export { IElement };