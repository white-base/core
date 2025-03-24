import NamespaceManager from "./namespace-manager";
import MetaObject from "./meta-object";
import { RefObject, NsObject, SetObject } from "./T";

/**
 * 'MetaRegistry' is a class responsible for registering and managing meta objects.  
 */
declare class MetaRegistry {
    
    /**
     * List of meta objects.  
     */
    static _list: any[];

    /**
     * Total number of currently registered meta objects.  
     */
    static get count(): number;

    /**
     * Namespace manager for meta objects.  
     */
    static get namespace(): NamespaceManager;

    /**
     * Initializes registered meta objects and namespaces.  
     */
    static init(): void;

    /**
     * Register the meta object and register the creator in the namespace.  
     * An exception occurs if an object is already registered.  
     * Register if there is no creator in the Namespace.  
     * 
     * @param metaObj Meta object to register
     * @throws An exception occurs if the object is already registered.
     */
    static register(metaObj: MetaObject): void;

    /**
     * Undoes the meta object in the registry.  
     * 
     * @param metaOrGuid Meta object or GUID string
     * @returns successful removal ('true' or 'false')
     */
    static release(metaOrGuid: MetaObject | string): boolean;

    /**
     * Check if the registry has a meta object.  
     * 
     * @param metaOrGuid Object of type GUID or GUID string
     * @returns Existence ('true' or 'false')
     */
    static has(metaOrGuid: MetaObject | object | string): boolean;

    /**
     * Locate the meta object in the registry.  
     * 
     * @param metaOrGuid Object of type GUID or GUID string
     * @returns meta object found, 'undefined' if not found
     */
    static find(metaOrGuid: MetaObject | object | string): MetaObject | undefined;

    /**
     * Checks for meta objects.  
     * 
     * @param target Target object
     * @returns Whether it is a meta object ('true' or 'false')
     */
    static isMetaObject(target: unknown): boolean;

    /**
     * Creates a meta object of a GUID object.  
     * 
     * @param guidObj GUID type object
     * @param guidRootObj Initial GUID literal object
     * @returns 생성된 메타 객체
     */
    static createMetaObject(guidObj: object, guidRootObj?: object): MetaObject;

    /**
     * Creates a reference object for a GUID object.  
     * 
     * @param metaObj Meta object
     * @returns created reference object ('{$ref: 'guid value'}')
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createReferObject(meta);
     * console.log(obj.owner);  // Out: { $ref: '5337877c-49d6-9add-f35a-7bd31d510d4f' }
     */
    static createReferObject(metaObj: MetaObject): RefObject;

    /**
     * Register the function in the Namespace and create a reference object.  
     * 
     * @param target Function or constructor
     * @returns created namespace reference object ('{$ns: 'Meta.MetaElement'}')
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createNsReferObject(meta.constructor);
     * console.log(obj.owner); // Out: { $ns: 'Meta.MetaElement' }
     */
    static createNsReferObject(target: Function): NsObject;

    /**
     * Set the GUID of the meta object in the GUID object.  
     * guidObj.$set = meta._guid  
     * 
     * @param guidObj GUID type object
     * @param metaObj Meta object
     * @returns set object
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = { name: 'm2' };
     * MetaRegistry.setMetaObject(obj, meta);
     * console.log(obj); // Out: {name: 'm2', $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     */
    static setMetaObject(guidObj: object, metaObj: MetaObject): MetaObject;

    /**
     * Validates the GUID object.  
     * 1. Check if the object has duplicate GUID values  
     * 2. Determine if an object has a '$ref' value  
     * 3. Determine if an object has a '$ns' value  
     * 4. Check the number of '_key' and '_elem' of objects  
     * 
     * @param guidObj GUID object to be inspected
     * @returns Inspection result ('true' or 'false')
     */
    static validObject(guidObj: object): boolean;

    /**
     * Verify that the target object is a GUID object.  
     * 
     * @param target Object to be checked 
     * @returns Guid object(`true` or `false`)
     */
    static isGuidObject(target: object): boolean;

    /**
     * Verify that the source object contains a GUID object.  
     * 
     * @param guidObj GUID object or GUID string to check
     * @param guidRootObj GUID literal object of query
     * @returnswhether to include ('true' or 'false')
     */
    static hasGuidObject(guidObj: object | string, guidRootObj: object | object[]): boolean;

    /**
     * Verify that the GUID object contains a reference type element.  
     * Reference types are '$ref' and '$ns'.  
     * 
     * @param guidObj GUID object to check
     * @returns whether to include ('true' or 'false')
     */
    static hasRefer(guidObj: object): boolean;

    /**
     * Retrieves the set GUID object from the repository.  
     * 
     * @param guidObj GUID object or GUID string to look up
     * @param guidRootObj GUID literal object with query target
     * @returns meta-objects viewed
     */
    static findSetObject(guidObj: object | string, guidRootObj: object): MetaObject;

    /**
     * Converts the reference element value of a GUID object to a real object reference.  
     * To be converted: '$ns' is converted to '[Object Object]'.  
     * 
     * @param guidObj GUID object to convert
     * @returns converted meta object
     */
    static transformRefer(guidObj: object): object;

    /**
     * Register the creator or object in the specified namespace.  
     * It registers after performing duplicate checks, and does not store built-in functions (Array, String, Number, etc.).  
     * 
     * @param target To be registered (class creator or object)
     * @param namespace Namespace name (separated by a dot '.')
     * @param classOrFuncName Destination name (class name or function name), otherwise the last name of the namespace applies.
     */
    static registerClass(target: Function | object, namespace: string, classOrFuncName?: string): void;

    /**
     * Undoes the registered item in the Namespace.  
     * 
     * @param nsPath full path to the namespace ('string')
     * @returns Successful deletion ('true' or 'false')
     */
    static releaseClass(nsPath: string): boolean;

    /**
     * Finds the specified constructor or object in the Namespace and returns the entire path.  
     * 
     * @param target Creator or object
     * @returns Namespace Full path, 'undefined' if not found
     */
    static findClass(target: Function): string | undefined;

    /**
     * Returns a generator or object corresponding to the entire path specified in the Namespace.  
     * 
     * @param nsPath Full path to the Namespace
     * @returns corresponding object or creator, 'undefined' if not found
     */
    static getClass(nsPath: string): object | undefined;

    /**
     * Pars the serialized JSON string to convert it to 'MetaObject'.  
     * 
     * @param str serialized JSON string
     * @param jsonParser JSON parser function (default is 'JSON.parse')
     * @returns converted meta object
     */
    static loadMetaObject(str: string, jsonParser?: Function): MetaObject;
}

export default MetaRegistry;
export { MetaRegistry };
