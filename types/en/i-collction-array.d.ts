import ICollection          from './i-collection';

/**
 * Array collection interface.
 * @interface
 * @extends ICollection
 */
declare interface IArrayCollection extends ICollection {

    /**
     * Adds an element to the specified location.
     * @param pos - Where to add an element (index)
     * @param elem - Elements to add
     * @returns void
     */
    insertAt(pos: number, elem: any);
}

export = IArrayCollection;