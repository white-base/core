/**** i-list.js | IList ****/
//==============================================================
import Message from './message.js';    
import ExtendError from './extend-error.js';  
   
var IList  = (function () {
    /**
     * List interface.  
     * 
     * @constructs IList
     * @interface
     */
    function IList() {

        /**
         * An internal array that stores the data in the list.  
         * 
         * @member {array} IList#_list
         */
        this._list = Array;
        
        /**
         * Returns the number of lists.  
         * 
         * @member {number} IList#count
         */
        this.count = Number;
    }

    IList._NS = 'Interface';    // namespace
    IList._KIND = 'interface';

    return IList;
    
}());

export default IList;
export { IList };