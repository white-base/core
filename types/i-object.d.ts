/**
 * Object interface.  
 */
declare interface IObject {
    
    /**
     * Returns a list of types of objects.  
     * 
     * @returns Arrangement of types of objects
     */
    getTypes(): Function[];

    /**
     * Verify that the object is an instance of a particular class or interface.  
     * 
     * @param target Generator name string or constructor
     * @returns Instance or 'true' if it's an instance or 'false' if it's not
     */
    instanceOf(target: Function | string): boolean;

    /**
     * Compare that the object is the same as the given object.  
     * 
     * @param target To compare
     * @returns If two objects are the same, 'true', or 'false'
     */
    equal(target: any): boolean;
}

export default IObject;
export { IObject };