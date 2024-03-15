declare namespace Type {
    
    /** Search all properties. */
    function getAllProperties(obj: object, hasObj: boolean): Array<string>;
    
    /** Compares objects. (except proto) */
    function deepEqual(obj1: any, obj2: object): boolean;
    
    /** Get the function type. (including _UNION) */
    function getTypes(ctor: Function, hasUnion: boolean | true): Array<Function>;
    
    /** Checks whether the function type is a prototype (inherited) type. */
    function isProtoChain(ctor: Function, target: Function | string): boolean;
    
    /** Checks whether the function type is a prototype (inherited) or _UNION type. */
    function hasType(ctor: Function, target: Function | string): boolean;
    
    /** Get an extended type object. (including subtypes) */
    function typeObject(target: any): object;
    
    /** Get the extended type name. */
    function typeOf(target: any): string;
    
    /** Get the extended type. */
    function extendType(target: any): object;
    
    /** Checks whether the extension type allows the target type. */
    function allowType(extType: any, tarType: any, opt?: number): Error | undefined;
    
    /** Checks whether the extension type matches the target. */
    function matchType(extType: any, target: any, opt?: number): Error | undefined;
    
    /** Checks whether the extension type allows the target type. */
    function isAllowType(extType: any, tarType: any, opt?: number): boolean;
    
    /** Checks whether the extension type matches the target. */
    function isMatchType(extType: any, target: any, opt?: number): boolean;

}

export = Type;