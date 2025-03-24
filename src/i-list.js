/**** i-list.js | IList ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';  

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
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

//==============================================================
// 4. module export
export default IList;
export { IList };