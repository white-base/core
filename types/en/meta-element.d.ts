import IElement             from './i-element';
import MetaObject           from './meta-object';

/**
 * The MetaElement class inherits the MetaObject and implements the IElement interface.  
 * Represents the elements that represent the metadata.
 */
declare class MetaElement extends MetaObject implements IElement {

    /**
     * Creates an instance of the MetaElement class.
     * 
     * @param name The name of the element
     */
    constructor(name: string);
    
    /**
     * The name of the element, which acts as a unique identifier for the MetaElement.
     */
    _name: string;

    /**
     * Returns the current object as a serialized object.
     * Serialization replaces cyclic references with values of '$ref', and depending on the serialization options, you can select reference structures, redundant structures, and non-contrast structures.
     * 
     * @param {number} [vOpt=0] - Serialization option. Default is '0'.
     * - 0: Reference structure (_guid: Yes, $ref: Yes)
     * - 1: Redundant structure (_guid: Yes, $ref: Yes)
     * - 2: Non-tidal rescue (_guid: no, $ref: no)
     * @param {object | Array<object>} [own={}] - Parent objects that you own. Default is an empty object.
     * @returns {object} serialized object.
     * 
     * @example
     * const serializedObj = element.getObject(2);
     * console.log(serializedObj); // serialized object output
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * Initialize the current object using the serialized object.
     * In this process, the object is initialized, and the state of the object is restored based on the serialized object (`oGuid`).
     * 
     * @param oGuid - serialized object.
     * @param {object} [origin=oGuid] - Original object. Default is 'oGuid'.
     */
    setObject(oGuid: object, origin?: object);

    /**
     * Replicate the current object.
     * 
     * @param {...any} args - Additional argument to be used for replication.
     * @returns {this} Returns a replicated object.
     */
    clone(...args: any[]): this;

    /**
     * List of implemented interfaces.
     * 
     * @default [IElement]
     */
    static readonly _UNION: []

    /**
     * Indicates the namespace.
     * 
     * @default 'Meta'
     */
    static readonly _NS: string;

    /**
     * List of parameters used for the constructor.
     * 
     * @default ['name']
     */
    static readonly _PARAM: [];

}

export = MetaElement;