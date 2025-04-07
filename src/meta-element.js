/**** meta-element.js | MetaElement ****/
//==============================================================
import ExtendError      from './extend-error.js';    
import Util             from './util.js';
import IElement         from './i-element.js';
import MetaObject       from './meta-object.js';
   
var MetaElement  = (function (_super) {

    /**
     * Creates an instance of the MetaElement class.  
     * 
     * @constructs MetaElement
     * @extends MetaObject
     * @implements {IElement}
     * @param {string} p_name Name of the element
     */
    function MetaElement(p_name) {
        _super.call(this);
        
        var _name;

        /**
         * Internal property that stores the name of the element.  
         * 
         * @readonly
         * @member {string} MetaElement#_name
         */
        Object.defineProperty(this, '_name', {
            get: function() { return _name; },
            set: function(nVal) {
                if (typeof nVal !== 'string') throw new ExtendError(/EL03121/, null, [typeof val]);
                if (nVal.length === 0) throw new ExtendError(/EL03122/, null, []);
                _name = nVal;
            },
            configurable: false,
            enumerable: false
        });

        this._name = p_name;

        Util.implements(MetaElement, this);     // strip:
    }
    Util.inherits(MetaElement, _super);
    
    MetaElement._UNION = [IElement];
    MetaElement._NS = 'Meta';           // namespace
    MetaElement._PARAMS = ['name'];     // creator parameter
    
    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param {number} [p_vOpt=0] Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param {object | array<object>} [p_owned={}] Parent object that contains (owns) the current object  
     * @returns {object}  Guid type object literal
     * @example
     * a.getObject(2) == b.getObject(2)   
     */
    MetaElement.prototype.getObject = function(p_vOpt, p_owned) {
        var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
        // var vOpt = p_vOpt || 0;
        // var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

        obj['name'] = this._name;
        return obj;
    };
    Object.defineProperty(MetaElement.prototype, 'getObject', {
        enumerable: false
    });

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param {object} p_oGuid object literal of the type of GUID to be set
     * @param {object} [p_origin=p_oGuid] Initial GUID literal object referenced during conversion
     */
    MetaElement.prototype.setObject  = function(p_oGuid, p_origin) {
        _super.prototype.setObject.call(this, p_oGuid, p_origin);
        // var origin = p_origin ? p_origin : p_oGuid;
        this._name = p_oGuid['name'];
        // this.__SET$_name(p_oGuid['name'], this);
    };
    Object.defineProperty(MetaElement.prototype, 'setObject', {
        enumerable: false
    });

    /**
     * Creates a replica of the current object.  
     * 
     * @returns {MetaElement} Replicated Objects
     */
    MetaElement.prototype.clone  = function() {
        var clone = new MetaElement(this._name);
        return clone;
    };
    Object.defineProperty(MetaElement.prototype, 'clone', {
        enumerable: false
    });

    return MetaElement;

}(MetaObject));


export default MetaElement;
export { MetaElement };