/**** i-collection-array.js | IArrayCollection ****/
//==============================================================
// 1. import module
import Message from './message.js';    
import ExtendError from './extend-error.js';   
import Util from './util.js'; 
import ICollection from './i-collection.js';

//==============================================================
// 2. module dependency check
if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
if (!ICollection) throw new Error(Message.get('ES011', ['ICollection', 'i-collection']));

//==============================================================
// 3. module implementation   
var IArrayCollection  = (function (_super) {
    /**
     * 배열 컬렉션 인터페이스 입니다.
     * @extends ICollection
     */
    function IArrayCollection() {
        _super.call(this);
    }
    Util.inherits(IArrayCollection, _super);
    
    IArrayCollection._KIND = 'interface';
    IArrayCollection._NS = 'Interface';    // namespace

    /**
     * 요소를 지정위치에 추가합니다.
     * @abstract
     */
    IArrayCollection.prototype.insertAt  = function() {
        throw new ExtendError(/EL02171/, null, ['IArrayCollection']);
    };

    return IArrayCollection;
    
}(ICollection));

//==============================================================
// 4. module export
export default IArrayCollection;
export { IArrayCollection };