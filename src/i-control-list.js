/**** i-control-list.js | _L.Interface.IListControl ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';  

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IListControl  = (function () {
    /**
     * 목록 제어 인터페이스 입니다.
     * @constructs _L.Interface.IListControl
     * @interface
     */
    function IListControl() {
    }

    IListControl._NS = 'Interface';    // namespace
    IListControl._KIND = 'interface';
    
    /**
     * 목록에 대상을 추가합니다.
     * @abstract
     */
    IListControl.prototype.add = function() {
        throw new ExtendError(/EL02151/, null, ['IListControl']);
    };

    /**
     * 목록에서 대상을 삭제합니다.
     * @abstract
     */
    IListControl.prototype.del  = function() {
        throw new ExtendError(/EL02152/, null, ['IListControl']);
    };

    /**
     * 목록에 대상의 존재 여부를 확인합니다.
     * @returns {boolean}
     * @abstract
     */
    IListControl.prototype.has  = function() {
        throw new ExtendError(/EL02153/, null, ['IListControl']);
    };

    /**
     * 목록에서 대상을 찾습니다.
     * @returns {any}
     * @abstract
     */
    IListControl.prototype.find  = function() {
        throw new ExtendError(/EL02154/, null, ['IListControl']);
    };

    return IListControl;
    
}());

//==============================================================
// 4. module export
export default IListControl;
export { IListControl };