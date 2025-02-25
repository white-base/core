/**** i-serialize.js | ISerialize ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';  

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var ISerialize  = (function () {
    /**
     * 직렬화 인터페이스 입니다.
     * @constructs ISerialize
     * @interface
     */
    function ISerialize() {
    }

    ISerialize._NS = 'Interface';    // namespace
    ISerialize._KIND = 'interface';

    /**
     * 내보내기(출력)를 합니다.
     * @returns {string}
     * @abstract
     */
    ISerialize.prototype.output  = function() {
        throw new ExtendError(/EL02191/, null, ['ISerialize']);
    };

    /**
     * 가져오기(로드) 합니다.
     * @abstract
     */
    ISerialize.prototype.load  = function() {
        throw new ExtendError(/EL02192/, null, ['ISerialize']);
    };

    return ISerialize;
    
}());

//==============================================================
// 4. module export
export default ISerialize;
export { ISerialize };