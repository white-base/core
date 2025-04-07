/**** i-collection-array.js | IArrayCollection ****/
//==============================================================
import ExtendError      from './extend-error.js';   
import Util             from './util.js'; 
import ICollection      from './i-collection.js';
   
var IArrayCollection  = (function (_super) {
    /**
     * Array collection interface.  
     * 
     * @extends ICollection
     */
    function IArrayCollection() {
        _super.call(this);
    }
    Util.inherits(IArrayCollection, _super);
    
    IArrayCollection._KIND = 'interface';
    IArrayCollection._NS = 'Interface';    // namespace

    /**
     * Adds an element to the specified location.  
     * 
     * @abstract
     */
    IArrayCollection.prototype.insertAt  = function() {
        throw new ExtendError(/EL02171/, null, ['IArrayCollection']);
    };

    return IArrayCollection;
    
}(ICollection));

export default IArrayCollection;
export { IArrayCollection };