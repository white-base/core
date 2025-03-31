/**** i-collection.js | ICollection ****/
//==============================================================
import Message from './message.js';
import ExtendError from './extend-error.js';

var ICollection  = (function () {
    /**
     * This is the collection interface.
     * @constructs ICollection
     * @interface
     */
    function ICollection() {
    }

    ICollection._KIND = 'interface';
    ICollection._NS = 'Interface';    // namespace

    /**
     * Add an element to the collection.  
     * 
     * @abstract
     */
    ICollection.prototype.add  = function() {
        throw new ExtendError(/EL02161/, null, ['ICollection']);
    };

    /**
     * Remove an element from the collection.  
     * 
     * @abstract
     */
    ICollection.prototype.remove  = function() {
        throw new ExtendError(/EL02162/, null, ['ICollection']);
    };

    /**
     * Verify that an element exists in the collection.  
     * 
     * @returns {boolean} If the element exists, it is 'true', otherwise it is 'false'
     * @abstract
     */
    ICollection.prototype.contains  = function() {
        throw new ExtendError(/EL02163/, null, ['ICollection']);
    };

    /**
     * Returns the index of an element in the collection.  
     * 
     * @returns {number}  index of element, '-1' without element
     * @abstract
     */
    ICollection.prototype.indexOf  = function() {
        throw new ExtendError(/EL02164/, null, ['ICollection']);
    };

    return ICollection;
    
}());

export default ICollection;
export { ICollection };