import IList            from './i-list';
import IListControl     from './i-control-list';
import ISerialize       from './i-serialize';
import {NsTypeObject, PathObject}           from './T';

/**
 * Classes that manage the namespaces.
 * This class provides the ability to add or delete namespaces and manage elements.
 * It also provides serialization and deserialization of the namespace repository.
 */
declare class NamespaceManager implements IList, IListControl, ISerialize {

    /**
     * Namespace repository.
     * 
     * @private
     */
    $storage: any[];

    /**
     * Namespace element type list.
     * If the element type is empty, the entire type is allowed.
     * 
     * @protected
     */
    _elemTypes: any[];

    /**
     * Namespace element list.
     * 
     * @readonly
     */
    _list: string[];

    /**
     * Total number of Namespace elements.
     * 
     * @readonly
     */
    count: number;

    /**
     * Set whether to allow duplicate element registration.
     * Default is 'false' and does not allow duplication.
     */
    isOverlap: boolean;

    /**
     * Create a Namespace Manager.
     */
    constructor();

    /**
     * Creates a Namespace Store initialization object.
     * 
     * @returns {NsTypeObject} Initialized Namespace type object. { _type: 'ns'}
     * @private
     */
    __createNsRefer(): NsTypeObject;

    /**
     * Obtain a Namespace path object.
     * 
     * @param elem - The element to obtain the path.
     * @returns {PathObject} Namespace path object. {ns: '...', key: '...'}
     * @protected
     */
    _getPathObject(elem: object | string): PathObject;

    /**
     * Initialize the namespace.
     * This method empties the namespace repository and returns it to its initial state.
     */
    init(): void;

    /**
     * Add a path to the Namespace.
     * 
     * @param ns - Names or array of names to add.
     */
    addNamespace(ns: string | string[]): void;

    /**
     * Delete the path from the Namespace.
     * 
     * @param ns - Names or array of names to delete.
     */
    delNamespace(ns: string | string[]): void;

    /**
     * Obtain a path object from the Namespace.
     * 
     * @param ns - Namespace name or array of names.
     * @returns {object} Namespace path object.
     */
    path(ns: string | string[]): object;

    /**
     * Add an element to the Namespace path.
     * 
     * @param fullName - The full path name of the namespace.
     * @param elem - The element to add.
     */
    add(fullName: string, elem: any): void;

    /**
     * Delete an element from the Namespace path.
     * 
     * @param fullName - The full path name of the namespace.
     * @returns {booklan} Deletion successful.
     */
    del(fullName: string): boolean;

    /**
     * Verify that certain elements exist in the Namespace.
     * 
     * @param elem - Path or element to check.
     * The presence or absence of the element @returns{boolean}.
     */
    has(elem: string | any): boolean;

    /**
     * Finds and returns the element in the Namespace path.
     * 
     * @param fullName - The full path name of the namespace.
     * @returns {object | Function | undefined} Found element or 'undefined'.
     */
    find(fullName: string): object | Function | undefined;

    /**
     * Gets the path from the element in the Namespace.
     * 
     * Returns the path of the first element upon duplication.
     * @param elem - The element to obtain the path.
     * @returns {string | undefined} path or 'undefined'.
     */
    getPath(elem: any): string | undefined;

    /**
     * Serialize the Namespace repository as a string.
     * You can specify a separate stringify function for JSON serialization.
     * 
     * @param stringify - JSON stringify function. Default is 'JSON.stringify'.
     * @param space - A blank string to apply to the JSON string.
     * @returns {string} serialized string.
     */
    output(stringify?: Function, space?: string): string;

    /**
     * Pars the string and load it into the Namespace repository.
     * 
     * @param str - Serialized string.
     * @param parse - JSON parser function. Default is 'JSON.parse'.
     */
    load(str: string, parse?: Function): void;

}

export = NamespaceManager;