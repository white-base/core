import type IObject         from "./i-object.d.ts";
import type IMarshal        from "./i-marshal.d.ts";

/**
 * The MetaObject class is a top-level object that processes metadata by implementing IOobject and IMarshal interfaces.  
 */
type MetaObject = IObject & IMarshal & {

    /**
     * Internal property that stores the unique identifier of the object.  
     * 
     * @example
     * var obj = MetaObject();
     * console.log(obj._guid);      // Out: '5337877c-49d6-9add-f35a-7bd31d510d4f'
     */
    readonly _guid: string;

    /**
     * Internal property that refers to the generator function of the object.  
     * 
     * @example
     * var obj = new MetaObject();
     * obj._type === MetaObject;        // true
     * console.log(typeof obj._type);   // [Class MetaObject]
     */
    readonly _type: Function;

    /**
     * Indicates the object name space.  
     * If '_type.NS' is not statically defined, use the parent's namespace as the default.  
     */
    readonly _ns: string;

    /**
     * Compare the current object with the specified object.  
     * However, the '_guid' property is excluded from the comparison.  
     * 
     * @param target To compare
     * @returns If two objects are the same, 'true', or 'false'
     */
    equal(target: object): boolean;

    /**
     * Returns the creators of the current object and all the creators of the prototype chain to the array.  
     * 
     * @returns Array of generator functions (includes first defined constructors sequentially)
     * 
     * @example
     * const obj = new MetaObject();
     * const types = obj.getTypes();
     * console.log(types); // Out: [MetaObject, Object]
     */
    getTypes(): Function[];

    /**
     * Verify that the object is an instance of a particular class.  
     * You can also examine the defined interface type (including '_UNION').  
     * 
     * @param target Class constructor function or class name (string)
     * @returns Whether there is an instance of the specified class ('true' or 'false')
     * 
     * @example
     * var obj = new MetaObject();
     * obj.instanceOf('MetaObject');    // true
     * obj.instanceOf('Object');        // true
     * obj.instanceOf(MetaObject);      // true
     * obj.instanceOf(Object);          // true
     * obj.instanceOf(String);          // false
     * 
     * // Interface Definition
     * class IClassA {}
     * class IClassB {}
     * 
     * // class definition
     * class MyClass extends MetaObject {} 
     * 
     * // Specifying Interface Implementation
     * MyClass._UNION = [IClassA, IClassB]; 
     * 
     * var obj = new MyClass();
     * 
     * console.log(obj.instanceOf(MyClass)); // Out: true
     * console.log(obj.instanceOf(IClassA)); // Out: true
     * console.log(obj.instanceOf(IClassB)); // Out: true
     */
    instanceOf(target: Function | string): boolean;

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param mode Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param context Parent object that contains (owns) the current object
     * @returns Guid type object literal
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param guidObj object literal of type of GUID to set
     * @param guidRootObj Initial GUID literal object referenced during conversion
     */
    setObject(guidObj: object, guidRootObj?: object): void;
}

export interface MetaObjectConstructor {
    /**
     * Creates an instance of the MetaObject class.  
     */
    new (): MetaObject;
}

export default MetaObject;
export { MetaObject };