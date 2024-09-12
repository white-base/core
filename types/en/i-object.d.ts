/**
 * Object interface. (Top)
 * @interface
 */
declare interface IObject {

    /**
     * Gets the constructors and proto constructors of the current object to the list.
     * @returns {Array<Function>} List of constructors and parent constructors
     */
    getTypes(): Array<Function>;

    /**
     * Check if the object is an instance.
     * @param {any} target - to be checked
     * @returns {boolean} instance or not
     */
    instanceOf(target: any): boolean;

    /**
     * Compare to objects.
     * @param {any} target - to compare
     * @returns {boolean} Object is the same
     */
    equal(target: any): boolean;
}

export = IObject;