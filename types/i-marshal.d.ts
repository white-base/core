/**
 * Object control interface.  
 */
declare interface IMarshal {

    _guid: string;

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