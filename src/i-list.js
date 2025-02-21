/**** i-list.js | _L.Interface.IList ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';  

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   


/** @type {Function} */
var IList  = (function () {
    /**
     * 목록 인터페이스 입니다.
     * @constructs _L.Interface.IList
     * @interface
     */
    function IList() {

        /**
         * 목록
         * @member {array} _L.Interface.IList#_list
         */
        this._list = Array;
        
        /**
         * 목록 갯수
         * @member {number} _L.Interface.IList#count
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