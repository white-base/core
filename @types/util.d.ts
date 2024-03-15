declare namespace Util {
    
    /** Generates a guid value. */
    function createGuid(): string;
    
    /** Make a deep copy of an object. (excluding proto) */
    function deepCopy(target: any): object;

    /** Inherits from superCtor . */
    function inherits(ctor: Function | object, superCtor: Function | object): void;

    /** Checks whether args<funtion> of the obj object created with ctor is implemented. */
    function implements(ctor: Function, obj: object, args?: Function): void;
}

export = Util;