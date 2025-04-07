/**** i-collection-property.js | IPropertyCollection ****/
//==============================================================
import ExtendError      from './extend-error.js';    
import Util             from './util.js';
import ICollection      from './i-collection.js';
   
var IPropertyCollection  = (function (_super) {
    /**
     * This is the property collection interface.  
     * 
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
     * Returns the property key for the specified index.  
     * 
     * @returns {boolean} Property key for that index
     * @abstract
     */
    IPropertyCollection.prototype.indexToKey  = function() {
        throw new ExtendError(/EL02181/, null, ['IPropertyCollection']);
    };

    return IPropertyCollection;
    
}(ICollection));

export default IPropertyCollection;
export { IPropertyCollection };