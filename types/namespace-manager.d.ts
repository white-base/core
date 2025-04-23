import type IList               from "./i-list.d.ts";
import type IListControl        from "./i-control-list.d.ts";
import type ISerialize          from "./i-serialize.d.ts";
import type { NsTypeObject, PathObject } from './T.d.ts';

/**
 * 'NamespaceManager' is a class that manages the namespace.
 */
declare class NamespaceManager implements IList<string>, IListControl, ISerialize {

    /**
     * Create a Namespace Manager.  
     */
    constructor();

    /**
     * Namespace repository  
     */
    $storage: any[];

    /**
     * Namespace element type list.  
     *Allow all types if empty.  
     */
     protected _elemTypes: any[];

    /**
     * Namespace element list.  
     */
    _list: string[];

    /**
     * Total number of Namespace elements.  
     */
    get count(): number;

    /**
     * Set whether to allow duplicate element registration.  
     * Default is 'false' and does not allow duplication.  
     */
    allowOverlap: boolean;

    /**
     * Creates a storage initialization object.  
     * 
     * @returns initialized namespace type object { _type: 'ns'}
     * @private
     */
    private $createNsRefer(): NsTypeObject;

    /**
     * Returns the Namespace path object.  
     * 
     * @param target Factors to obtain the path
     * @returns Namespace path object {ns: '...', key: '...'}
     * @protected
     */
    protected _getPathObject(target: object | string): PathObject;

    /**
     * Initialize the namespace.  
     */
    init(): void;

    /**
     * Add a path to the Namespace.  
     * 
     * @param nsPath Namespace name, path in the form of a string or array separated by a dot ('.')
     */
    addNamespace(nsPath: string | string[]): void;

    /**
     * Delete the path in the Namespace.  
     * 
     * @param nsPath Namespace name, path in the form of a string or array separated by a dot ('.')
     */
    delNamespace(nsPath: string | string[]): void;

    /**
     * Returns the path object of the namespace.  
     * 
     * @param nsPath Namespace name, path in the form of a string or array separated by a dot ('.')
     * @returns path object
     */
    path(nsPath: string | string[]): object | undefined;

    /**
     * Adds an element to the specified namespace path.  
     * 
     * @param nsPath Full path to the Namespace
     * @param typeDef Functions, classes, or objects to be added
     */
    add(nsPath: string, typeDef: Function | object): void;

    /**
     * Deletes an element from the specified namespace path.  
     * 
     * @param nsPath Full path to the Namespace
     * @returns Successful deletion ('true' or 'false')
     */
    del(nsPath: string): boolean;

    /**
     * Verify that the specified element exists in the Namespace.  
     * 
     * @param target Function, class, or object to check
     * @returns Existence ('true' or 'false')
     */
    has(target: string | Function | object): boolean;

    /**
     * Retrieves elements from the specified namespace path.  
     * 
     * @param nsPath Full path to the Namespace
     * @returns Found elements
     */
    find(nsPath: string): Function | object;

    /**
     * Returns the path of the specified element in the Namespace.  
     * (Route of the first element in case of redundancy)  
     * 
     * @param target Elements to find (function or object)
     * @returns The path of the element, 'undefined' if not found
     */
    getPath(target: Function | object): string | undefined;

    /**
     * Serialize the namespace repository and convert it into a string.  
     * To convert the function to JSON, you must specify a separate 'stringify' function.  
     * 
     * @param jsonStringify JSON Stringify function (optional)
     * @param space Setting the blank to apply at the output
     * @returns serialized string
     */
    output(jsonStringify?: (data: any, options?: any) => string, space?: string): string;

    /**
     * Parsing serialized strings and fetching them to the Namespace repository.  
     * 
     * @param str serialized string
     * @param jsonParse  JSON parser function
     */
    load(str: string, jsonParse?: (text: string) => any): void;
}

export default NamespaceManager;
export { NamespaceManager };