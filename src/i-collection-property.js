/**** i-colleciton-property.js | IPropertyCollection ****/
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
var IPropertyCollection  = (function (_super) {
    /**
     * 프로퍼티 컬렉션 인터페이스 입니다.
     * @constructs IPropertyCollection
     * @interface
     * @extends  ICollection
     */
    function IPropertyCollection() {
        _super.call(this);
    }
    Util.inherits(IPropertyCollection, _super);

    IPropertyCollection._KIND = 'interface';
    IPropertyCollection._NS = 'Interface';    // namespace

    /**
     * 프로퍼티 키가 존재하는지 확인합니다.
     * @returns {boolean}
     * @abstract
     */
    IPropertyCollection.prototype.indexToKey  = function() {
        throw new ExtendError(/EL02181/, null, ['IPropertyCollection']);
    };

    return IPropertyCollection;
    
}(ICollection));

//==============================================================
// 4. module export
export default IPropertyCollection;
export { IPropertyCollection };