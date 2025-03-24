/**
 * This is a utility module.  
 */
declare namespace Util {

    /**
     * Returns the nested depth of the array.  
     * 
     * @param array Array elements
     * @param depth Current depth (default: 0)
     * @returns Maximum nested depth of array
     */
    function getArrayDepth(array: any[], depth?: number): number;

    /**
     * Creates a 36-digit GUID.  
     * 
     * @returns GUID string generated
     */
    function createGuid(): string;

    /**
     * Deep copy of the object (except prototype)  
     * 
     * @param source Destination object to copy
     * @returns copied object
     */
    function deepCopy(source: object): object;

    /**
     * Sets the specified creator to inherit the parent creator.  
     * 
     * @param ctor generator function or object
     * @param superCtor Parent generator function or object
     */
    function inherits(ctor: Function, superCtor: Function): void;

    /**
     * Verify that the object implements the specified interface.  
     * Verify that the 'obj' object created with 'ctor' implements the interface provided by 'interfaces'.  
     * If 'ctor._KIND' is 'Interface', use 'allowType()' to confirm.  
     * Otherwise, use 'matchType()' to confirm.  
     * 
     * @param ctor Generator to be examined
     * @param obj object to be examined
     * @param interfaces List of interfaces to check
     */
    function implements(ctor: Function, obj: object, ...interfaces: Function[]): void;
}

export default Util;
export { Util };