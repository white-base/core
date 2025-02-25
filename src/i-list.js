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
     * 목록 인터페이스 입니다.
     * @constructs IList
     * @interface
     */
    function IList() {

        /**
         * 목록 데이터입니다.
         * @member {array} IList#_list
         */
        this._list = Array;
        
        /**
         * 목록 갯수입니다.
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