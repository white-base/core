/**
 * Object control interface.
 * @interface
 */
declare interface IMarshal {

    /**
     * Unique identifier of the object.
     * @type {string}
     */
    _guid: string;
    
    /**
     * Type of object.
     * @type {Function}
     */
    _type: Function;

    /**
     * Obtain a serialized object of the target.
     * @param {...any[]} args - Arguments to obtain serialized objects
     * @returns {object} serialized objects
     */
    getObject(...args: any[]): object;

    /**
     * Sets the serialization object.
     * @param {...any[]} args - Arguments for setting serialization objects
     */
    setObject(...args: any[]): void;
}

export = IMarshal;