/**
 * This is a utility module.
 */
declare namespace Util {
    
    /**
     * Generates a GUID value.
     * 
     * @returns The generated GUID string.
     */
    function createGuid(): string;
    
    /**
     * Deep copy of the object (except prototype)
     * 
     * @param target - The target object for deep copying.
     * @returns Deep copied object.
     */
    function deepCopy(target: any): object;

    /** Inherits from superCtor . */

    /**
     * Inherits superCtor.
     * 
     * @param ctor - Destination creator or object to inherit.
     * @param superCtor - Parent creator or object to inherit.
     */
    function inherits(ctor: Function | object, superCtor: Function | object): void;
    
    /**
     * Examine whether the 'args' function of the 'obj' object created with 'ctor' is implemented.
     * If the type ('ctor._KIND') is 'interface', call 'allowType()', 
     * Otherwise, call 'matchType()' to inspect.
     * 
     * @param ctor - This is the constructor to be examined.
     * @param obj - The object of the instance to be examined.
     * @param args - Interfaces. Can be set to 'ctor._UNION' static properties.
     */
    function implements(ctor: Function, obj: object, args?: Function): void;
}

export = Util;