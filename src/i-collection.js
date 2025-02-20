/**** i-colleciton.js | _L.Interface.ICollection ****/
//==============================================================
// 1. import module
import Message from './message.js';
import ExtendError from './extend-error.js';

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
// if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));

//==============================================================
// 3. module implementation
var ICollection  = (function () {
    /**
     * 컬렉션 인터페이스 입니다.
     * @constructs _L.Interface.ICollection
     * @interface
     */
    function ICollection() {
    }

    ICollection._KIND = 'interface';
    ICollection._NS = 'Interface';    // namespace

    /**
     * 컬렉션에 요소를 추가합니다.
     * @abstract
     */
    ICollection.prototype.add  = function() {
        throw new ExtendError(/EL02161/, null, ['ICollection']);
    };

    /**
     * 컬렉션에서 요소를 제거합니다.
     * @abstract
     */
    ICollection.prototype.remove  = function() {
        throw new ExtendError(/EL02162/, null, ['ICollection']);
    };

    /**
     * 요소가 컬렉션에 존재하는지 확인합니다.
     * @returns {boolean}
     * @abstract
     */
    ICollection.prototype.contains  = function() {
        throw new ExtendError(/EL02163/, null, ['ICollection']);
    };

    /**
     * 컬렉션에서 요소을 조회합니다.
     * @returns {number}
     * @abstract
     */
    ICollection.prototype.indexOf  = function() {
        throw new ExtendError(/EL02164/, null, ['ICollection']);
    };

    return ICollection;
    
}());

//==============================================================
// 4. module export
export default ICollection;