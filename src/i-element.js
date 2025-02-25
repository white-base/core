/**** i-element.js | IElement ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';  

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IElement  = (function () {
    /**
     * 요소(독립) 인터페이스 입니다.
     * @constructs IElement
     * @interface
     */
    function IElement() {
        /**
         * 요소명
         * @member {string} IElement#_name
         */
        this._name = String;
    }

    IElement._NS = 'Interface';    // namespace
    IElement._KIND = 'interface';

    /**
     * 요소를 복제합니다.
     * @returns {object}
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