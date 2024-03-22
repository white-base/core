declare namespace Type {
    
    /**
     * Look up the entire property.
     * @param obj Return Property Objects Except Objects
     * @param hasObj Include Object
     */
    function getAllProperties(obj: object, hasObj: boolean): Array<string>;
    
    /**
     * Compare objects (except proto)
     * @param obj1 Source object
     * @param obj2 Target object
     */
    function deepEqual(obj1: any, obj2: object): boolean;
    
    /**
     * Gets the function type (with_UNION), ctor himself push to return array
     * @param ctor Creator
     * @param hasUnion [true] _UNION included or not included
     */
    function getTypes(ctor: Function, hasUnion: boolean | true): Array<Function>;
    
    /**
     * Examines whether the function type is of the type of inheritance.
     * @param ctor Creator
     * @param target target inspection target
     */
    function isProtoChain(ctor: Function, target: Function | string): boolean;
    
    /**
     * Checks the function type for the type of prototype or _UNION type.
     * @param ctor Creator
     * @param target target inspection target
     */
    function hasType(ctor: Function, target: Function | string): boolean;
    
    /**
     * Obtain extended type objects (including subtypes)
     * @param target target type
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
    function typeObject(target: any): object;
    
    /**
     * Gets the extension type name.
     * @param target extension type
     */
    function typeOf(target: any): string;
    
    /**
     * Obtain an extension type.
     * @param target target type
     * @example
     * var singleType = ['undefined', 'null', 'number', 'string', 'boolean', 'regexp', 'object', 'symbol'];
     * var unionType = ['array', 'choice', 'function', 'class', 'union'];
     */
    function extendType(target: any): object;
    
    /**
     * Check if the extension type allows the target type.
     * @param extType extension type
     * @param tarType inspection target type
     * @param opt [opt=0] Allow option: 0 = Hold existing, create 1 = class type
     */
    function allowType(extType: any, tarType: any, opt?: number): Error | undefined;
    
    /**
     * Check that the extension type matches the target.
     * @param extType extension type
     * @param target check target
     * @param opt [opt=0] Allow option: 0 = Hold existing, create 1 = class type
     */
    function matchType(extType: any, target: any, opt?: number): Error | undefined;
    
    /**
     * Check if the extension type allows the target type.
     * @param extType extension type
     * @param tarType inspection target type
     * @param opt [opt=0] Allow option: 0 = Hold existing, create 1 = class type
     */
    function isAllowType(extType: any, tarType: any, opt?: number): boolean;
    
    /**
     * Check that the extension type matches the target.
     * @param extType extension type
     * @param target check target
     * @param opt [opt=0] Allow option: 0 = Hold existing, create 1 = class type
     */
    function isMatchType(extType: any, target: any, opt?: number): boolean;

}

export = Type;