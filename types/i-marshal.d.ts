/**
 * Object control interface.  
 */
declare interface IMarshal {

    /**
     * Internal property that stores the unique identifier of the object.  
     */
    _guid: string;

    /**
     * Internal property that stores the creator type of the object.  
     */
    _type: Function;

    /**
     * Returns the object literal.  
     * 
     * @returns serialized objects
     */
    getObject(...args: any[]): object;

    /**
     * Set the object literal by converting it to an instance.  
     * 
     * @param args Arguments required for conversion
     */
    setObject(...args: any[]): void;
}

export default IMarshal;
export { IMarshal };