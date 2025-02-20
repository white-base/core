/**** i-marshal.js | _L.Interface.IMarshal ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';    

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));

//==============================================================
// 3. module implementation   
var IMarshal  = (function () {
    /**
     * 객체 통제 인터페이스 입니다.
     * @constructs _L.Interface.IMarshal
     * @interface
     */
    function IMarshal() {

        /**
         * 객체의 고유 식별자
         * @member {string} _L.Interface.IMarshal#_guid
         */
        this._guid = String;

        /**
         * 객체의 타입
         * @member {string} _L.Interface.IMarshal#_type REVIEW:
         */
        this._type = [['_req_', Function, {$type: 'class'} ]];
    }

    IMarshal._NS = 'Interface';    // namespace
    IMarshal._KIND = 'interface';
    
    /**
     * 대상의 직렬화 객체를 얻습니다.
     * @abstract
     */
    IMarshal.prototype.getObject = function() {
        throw new ExtendError(/EL02121/, null, ['IMarshal']);
    };

    /**
     * 직렬화 객체를 설정합니다.
     * @abstract
     */
    IMarshal.prototype.setObject  = function() {
        throw new ExtendError(/EL02122/, null, ['IMarshal']);
    };

    return IMarshal;
    
}());

//==============================================================
// 4. module export
export default IMarshal;