import ICollection          from './i-collection';

/**
 * This is the property collection interface.
 * @interface
 * @extends ICollection
 */
declare interface IPropertyCollection extends ICollection {

    /**
     * Verify that the property key exists.
     * @param idx - Index of properties to check
     * @returns Property key is true if it exists, false if it does not exist
     */
    indexToKey(idx: number);
}

export = IPropertyCollection;