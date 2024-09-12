import {ExtType}           from './T';

/**
 * This is a type module.
 */
declare namespace Type {

    /**
     * Query the object's full properties.
     * 
     * @param obj - Object to look up properties (except Object)
     * @param hasObj - Whether to include 'Object'.
     * @returns Property name array.
     */
    function getAllProperties(obj: object, hasObj: boolean): Array<string>;

    /**
     * Compare objects (except prototypes)
     * 
     * @param obj1 - Original object.
     * @param obj2 - object to be compared.
     * @returns Indicates whether the two objects are the same.
     */
    function deepEqual(obj1: any, obj2: object): boolean;

    /**
     * Gets the function type (includes _UNION)
     * Returns to the array in order from the target.
     * 
     * @param ctor - Generator function.
     * @param hasUnion - whether to include '_UNION', default is 'true'.
     * @returns Function type array.
     */
    function getTypes(ctor: Function, hasUnion: boolean | true): Array<Function>;

    /**
     * Examines whether the function type is a prototype (inheritance) type.
     * 
     * @param ctor - Generator function.
     * @param target - subject to inspection.
     * @returns Indicates whether the prototype is.
     */
    function isProtoChain(ctor: Function, target: Function | string): boolean;

    /**
     * Examine whether the function type is a prototype (inheritance) or '_UNION' type.
     * 
     * @param ctor - Generator function.
     * @param target - subject to inspection.
     * Indicates whether the @returns prototype or type '_UNION'.
     */
    function hasType(ctor: Function, target: Function | string): boolean;

    /**
     * Obtain extended type objects (including subtypes)
     * 
     * @param target - Destination type.
     * @returns Extension type object.
     * 
     * @example
     * var returnObject = {
     *     $ype: '',       // common
     *     default: null,  // string, number, boolean, regexp
     *     kind: '',       // array, choice
     *     creator: null,  // class
     *     _instance: {},  // class
     *     _prop: {},      // union
     *     params: [],     // function
     *     return: null,   // function
     *     name: name,     // function
     *     func: null,     // function
     * }
     */
    function typeObject(target: any): ExtType;

    /**
     * Gets the extension type name.
     * 
     * @param target - Destination object.
     * @returns Extension type name.
     */
    function typeOf(target: any): string;

    /**
     * Gets the extension type.
     * 
     * @param target - Destination object.
     * @returns Extension type object.
     * 
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    function extendType(target: any): object;

    /**
     * Examine whether the extension type allows the target type.
     * 
     * @param extType - This is the extension type.
     * @param tarType - The type to be examined.
     * @param opt - Acceptable option: 0 = Keep existing, 1 = Create class type.
     * @returns Error object or 'undefined' on success.
     */
    function allowType(extType: any, tarType: any, opt?: number): Error | undefined;

    /**
     * Examines if the extension type matches the target.
     * 
     * @param extType - This is the extension type.
     * @param target - The type to be inspected.
     * @param opt - Acceptable option: 0 = Keep existing, 1 = Create class type.
     * @returns Error object or 'undefined' on success.
     */
    function matchType(extType: any, target: any, opt?: number): Error | undefined;

    /**
     *  Determine whether the extension type allows the target type.
     * 
     * @param extType - This is the extension type.
     * @param tarType - The type to be examined.
     * @param opt - Acceptable option: 0 = Keep existing, 1 = Create class type.
     * Indicates whether @returns match exists.
     */
    function isAllowType(extType: any, tarType: any, opt?: number): boolean;

    /**
     * Determine if the extension type matches the target.
     * 
     * @param extType - This is the extension type.
     * @param target - The type to be inspected.
     * @paramopt - Acceptable option: 0 = Keep existing, 1 = Create class type.
     * Indicates whether @returns match exists.
     */
    function isMatchType(extType: any, target: any, opt?: number): boolean;

}

export = Type;