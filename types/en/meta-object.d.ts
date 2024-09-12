import IObject              from './i-object';
import IMarshal             from './i-marshal';

/**
 * The MetaObject class is an object that processes metadata by implementing IOobject and IMarshal interfaces.
 */
declare class MetaObject implements IObject, IMarshal {
    
    /**
     * Creates an instance of the MetaObject class.
     */
    constructor();

    /** 
     * Unique identifier of the object (GUID). Uniquely identifies the object.
     */
    _guid: string;

    /** 
     * The generator function of the object. The function used when the object was created.
     */
    _type: Function;

    /**
     * Compare the current object with the specified object.
     * 
     * @param target - the object to be compared to.
     * @returns {booklan} Returns whether the two objects are the same.
     */
    equal(target: object): boolean;

    /**
     * Returns the creators of the current object and all the creators of the prototype chain to the array.
     * 
     * @returns {Array<Function>} Returns the array of generator functions.
     * 
     * @example
     * const types = obj.getTypes();
     * console.log(types); // [Function: MetaObject]
     */
    getTypes(): Array<Function>;

    /**
     * Verify that the current object is an instance of the specified type (including _UNION)
     * 
     * @param target - The type of object to be checked (object or string).
     * @returns {boolean} Returns whether it is an instance of the specified type.
     */
    instanceOf(target: object | string): boolean;

    /**
     * Returns the current object as a serialized object. 
     * 
     * @param{number} [vOpt=0] - Serialization option. Default is '0'.
     * - 0: Reference structure (_guid: Yes, $ref: Yes)
     * - 1: Redundant structure (_guid: Yes, $ref: Yes)
     * - 2: Non-tidal rescue (_guid: no, $ref: no)
     * @param {object | Array<object>} [own={}] - Parent objects that you own. Default is an empty object.
     * @returns{object} Returns serialized objects.
     * 
     * @example
     * const serializedObj = a.getObject(2);
     * const isEqual = JSON.stringify(serializedObj) === JSON.stringify(b.getObject(2));
     */
    getObject(vOpt?: number, owned?: object | Array<object>): object;

    /**
     * Initialize the current object using the serialized object.  
     * In this process, the object is initialized, and the state of the object is restored based on the serialized object (`oGuid`).
     * 
     * @paramoGuid - serialized object.
     * @param{object} [origin=p_oGuid] - Original object. Default is 'oGuid'.
     */
    setObject(oGuid: object, origin?: object);

    /**
     * List of implemented interfaces.
     * 
     * @default [IObject, IMarshal]
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
     */
    static readonly _PARAM: [];
}

export = MetaObject;