declare namespace Util {
    
    /**
     * Generates a guid value.
     */
    function createGuid(): string;
    
    /** Make a deep copy of an object. (excluding proto) */
    
    /**
     * Make a deep copy of the object (except proto)
     * @param target Target object
     */
    function deepCopy(target: any): object;

    /** Inherits from superCtor . */

    /**
     * Inherit superCtor.
     * @param ctor Destination creator or object
     * @param superCtor Parent creator or object to be inherited
     */
    function inherits(ctor: Function | object, superCtor: Function | object): void;

    
    /**
     * Examines the implementation of args<funtion> of obj objects created by ctor.
     * If the type (cor._KIND) is 'interface', inspect it as allowType(), or matchType().
     * @param ctor Inspection target creator
     * @param obj Inspection target instance object
     * @param args interfaces, ctor._UNION can be set to static properties
     */
    function implements(ctor: Function, obj: object, args?: Function): void;
}

export = Util;