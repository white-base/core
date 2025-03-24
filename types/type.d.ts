import { ExtType } from "./T";

/**
 * This is a type module.
 */
declare namespace Type {

    /**
     * Query all properties of the object.  
     * 
     * @param obj Object to look up properties (except Object)
     * @param includeObject Whether to include properties of 'Object'
     * @returns Property Name Arrangement
     */
    function getAllProperties(obj: object, includeObject: boolean): string[];

    /**
     * Compare the two objects to see if they are the same (except Prototype)  
     * 
     * @param source Source object
     * @param target Object to compare
     * @returns Whether the two objects are the same ('true' or 'false')
     */
    function deepEqual(source: any, target: object): boolean;

    /**
     * Gets the type of the given function (generator). (Can include '_UNION')  
     * The returned arrays are included in order from the specified function.  
     * 
     * @param baseType Generator function or class
     * @param includeUnion whether '_UNION' is included (default: 'true')
     * @returns Array function type
     */
    function getTypes(baseType: Function, includeUnion?: boolean): Function[];

    /**
     * Verify that the prototype (inheritance) chain of the function type contains the specified target.  
     * 
     * @param baseType Generator function or class 
     * @param target To be examined (generator function or class name)
     * @returns whether to be included in the prototype chain ('true' or 'false')
     */
    function isProtoChain(baseType: Function, target: Function | string): boolean;

    /**
     * Verify that the given function type is included in the prototype (inheritance) chain or is of type '_UNION'.  
     * 
     * @param baseType Generator function or class
     * @param target To be examined (generator function or class name) 
     * @returns Prototype chain or type '_UNION' ('true' or 'false')
     */
    function hasType(baseType: Function, target: Function | string): boolean;

    /**
     * Returns extension information of the target type in JSON format.  
     * Analyze the internal properties of the object to transform all properties into the format 'typeObject()'.  
     * 
     * @param target Target type
     * @returns converted extension type object
     * 
     * @example
     * var obj = {
     *      $ype: '',
     *      default: null,                  // string, number, boolean, regexp
     *      kind: '',                       // array, choice
     *      creator: null, _instance: {},   // class
     *      _prop: {},                      // union
     *      params: [], return: null,       // function
     *      name: name, func: null,
     * }
     */
    function typeObject(target: any): ExtType;   // TODO: 검토 및 작성 필요

    /**
     * Returns the extension type name of the target object.  
     * 
     * @param target Target object
     * @returns extended type name
     */
    function typeOf(target: any): string;

    /**
     * Returns the extension type of the target object.  
     * 
     * @param target Target object
     * @returns extended type object
     * 
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    function extendType(target: any): object;

    /**
     * Verify that the extension type allows the target type.  
     * 
     * @param sourceType Extension Type
     * @param targetType What type to check
     * @param option Allow option (0 = Keep existing, 1 = Create class type)
     * @throws Exception occurs if extension type does not allow target type
     */
    function allowType(sourceType: any, targetType: any, option?: number): void;

    /**
     * Verify that the extension type matches the target.  
     * 
     * @param sourceType Extension Type
     * @param target For inspection
     * @param option Allow option (0 = Keep existing, 1 = Create class type)
     * @throws Exception occurs when failing
     */
    function matchType(sourceType: any, target: any, option?: number): void;

    /**
     * Determine whether the extension type allows the target type.  
     * 
     * @param sourceType Extension Type
     * @param tarType Type to be examined
     * @param option Allow option (0 = Keep existing, 1 = Create class type)
     * @returns whether to allow ('true' or 'false')
     */
    function isAllowType(sourceType: any, tarType: any, option?: number): boolean;

    /**
     * Verify that the extension type matches the target.  
     * 
     * @param sourceType Extension Type
     * @param target Type to be examined
     * @param option Allow option (0 = Keep existing, 1 = Create class type)
     * @returns Match or not ('true' or 'false')
     */
    function isMatchType(sourceType: any, target: any, option?: number): boolean;
}

export default Type;
export { Type };
