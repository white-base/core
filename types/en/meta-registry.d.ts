// <reference path='global.d.ts' />

import NamespaceManager     from './namespace-manager';
import MetaObject           from './meta-object';

/**
 * The 'MetaRegistry' class is responsible for registering and managing meta objects.
 * This class provides a variety of functions to register, release, search, and reference meta objects.
 * 
 * @static
 */
declare class MetaRegistry {

    /**
     * List of meta objects, stored as reference values.
     * 
     * @readonly
     */
    static _list: any[];

    /**
     * Total number of currently registered meta objects.
     * 
     * @readonly
     */
    static count: number;

    /**
     * Namespace manager for meta objects.
     * 
     * @readonly
     */
    static namespace: NamespaceManager;

    /**
     * Initializes registered meta objects and namespaces.
     */
    static init(): void;

    /**
     * Register the meta object and register the creator in the namespace.
     * An exception occurs if an object is already registered.
     * Register if there is no creator in the Namespace.
     * 
     * @param meta - Meta object to register.
     * @throws {Error | void} An exception occurs when the object  is already registered.
     */
    static register(meta: MetaObject): void;

    /**
     * Undoes the meta object in the registry.
     * 
     * @param meta - A meta object or GUID string to release.
     * @returns {booklan} Returns successful release.
     */
    static release(meta: MetaObject | string): boolean;

    /**
     * Check if the registry has a meta object.
     * 
     * @param oGuid - A GUID object or a GUID string to check.
     * @returns {boolean} Returns the existence of a meta object.
     */
    static has(oGuid: object | string): boolean;

    /**
     * Locate the meta object in the registry.
     * 
     * @param oGuid - A GUID object or a GUID string to be retrieved.
     * @returns {MetaObject | undefined} Returns the found meta object or 'undefined'.
     */
    static find(oGuid: object | string): MetaObject | undefined;

    /**
     * Determines whether the target object is a meta object.
     * 
     * @param target - The object to be checked.
     * @returns {boolean} Returns whether or not a meta object exists.
     */
    static isMetaObject(target: object): boolean;

    /**
     * Creates a meta object for a GUID object.
     * 
     * @param oGuid - Object of type GUID.
     * @param {object} [origin=oGuid] - This is the original object setting the current object. Default is 'oGuid'.
     * @returns {MetaObject} Returns the created meta object.
     */
    static createMetaObject(oGuid: object, origin?: object): MetaObject;

    /**
     * Creates a reference object for a GUID object.
     * 
     * @param meta - This is a meta object.
     * @returns {RefObject} Returns the generated reference object.
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createReferObject(meta);
     * console.log(obj.owner); // { $ref: '5337877c-49d6-9add-f35a-7bd31d510d4f' }
     */
    static createReferObject(meta: MetaObject): RefObject;

    /**
     * Register the function in the Namespace and create a reference object.
     * 
     * @param target - Function or constructor.
     * @returns {NsObject} Returns the created namespace reference object.
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = {};
     * obj.owner = MetaRegistry.createNsReferObject(meta.constructor);
     * console.log(obj.owner); // { $ns: 'Meta.MetaElement' }
     */
    static createNsReferObject(target: Function): NsObject;

    /**
     * Set the GUID of the meta object in the GUID object.
     * 
     * @param oGuid - Object of type GUID.
     * @param meta - A meta object with a GUID.
     * @returns {SetObject} Returns the set object.
     * 
     * @example
     * var meta = new MetaElement('m1');
     * var obj = { name: 'm2' };
     * MetaRegistry.setMetaObject(obj, meta);
     * console.log(obj); // {name: 'm2', $set: '5337877c-49d6-9add-f35a-7bd31d510d4f'}
     */
    static setMetaObject(oGuid: object, meta: MetaObject): SetObject;

    /**
     * Validates the GUID object.
     *  Validation includes:
     * 1. Check if the object has duplicate GUID values
     * 2. Determine if an object has a '$ref' value
     * 3. Determine if an object has a '$ns' value
     * 4. Check the number of objects '_key' and '_elem'
     * 
     * @param oGuid - The GUID object to be inspected.
     * @returns {boolean} Returns whether a GUID object exists.
     */
    static validObject(oGuid: object): boolean;

    /**
     * Verify that the target object is a GUID object.
     * 
     * @param target - to be checked.
     * @returns {boolean} Returns whether a GUID object exists.
     */
    static isGuidObject(target: object): boolean;

    /**
     * Verify that the source object contains a GUID object.
     * 
     * @param oGuid - A GUID object or string to check.
     * @param origin - Original object.
     * @returns {boolean} Returns whether is included or not.
     */
    static hasGuidObject(oGuid: object | string, origin: object | object[]): boolean;

    /**
     * Verify that the GUID object contains a reference type element.
     * Reference types are '$ref' and '$ns'.
     * 
     * @param oGuid - GUID object to check.
     * @returns {booklan} Returns whether is included or not.
     */
    static hasRefer(oGuid: object): boolean;

    /**
     * Locate the set GUID object in the source object.
     * 
     * @param oGuid - The GUID value or GUID object to be queried.
     * @param origin - Original object.
     * @returns {MetaObject} Returns the queried meta object.
     */
    static findSetObject(oGuid: object | string, origin: object): MetaObject;

    /**
     * Converts the reference element value of a GUID object to an object reference.
     * To be converted: '$ns' is converted to '[object Object]'.
     * 
     * @param oGuid - The GUID object to be converted.
     * @returns {object} Returns the transformed object.
     */
    static transformRefer(oGuid: object): object;

    /**
     * Register the creator or object in the Namespace.
     * Register after performing duplicate checks, and do not store built-in functions internally.
     * 
     * @param target - To be registered.
     * @param ns - Namespace name.
     * @param key - Destination name.
     */
    static registerClass(target: Function | object, ns: string, key: string): void;

    /**
     * Unlocks a constructor or object from the Namespace.
     * 
     * @param fullName - full name of the namespace.
     * @returns {booklan} Returns successful release.
     */
    static releaseClass(fullName: string): boolean;

    /**
     * Finds the creator or object in the Namespace and returns the entire path.
     * 
     * @param target - This is a constructor or object.
     * @returns {string | undefined} Returns the full path or 'undefined'
     */
    static findClass(target: Function): string | undefined;

    /**
     * Returns the constructor or object for the full name in the Namespace.
     * 
     * @param fullName - Full path.
     * @returns {object | Function | undefined} constructor or object, if not, return 'undefined'.
     */
    static getClass(fullName: string): object | Function | undefined;

    /**
     * Pars the serialized GUID string to convert it to 'MetaObject'.
     * 
     * @param str - Serialized GUID string.
     * @param parse - JSON parser function. Default is 'JSON.parse'.
     * @returns {MetaObject} Returns parsed meta objects.
     */
    static loadMetaObject(str: string, parse?: Function): MetaObject;

}

export = MetaRegistry;