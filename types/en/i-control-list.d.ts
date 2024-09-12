/**
 * List control interface.
 * @interface
 */
declare interface IListControl {

    /**
     * Add a target to the list.
     * @param args - To be added
     */
    add(...args: any[]): void;

    /**
     * Delete the target from the list.
     * @param args - To be deleted
     * @returns If the target is successfully deleted true, otherwise false
     */
    del(...args: any[]): boolean;

    /**
     * Check the presence of a target in the list.
     * @param args - the objects to check for existence
     * @returns True if the object exists, false otherwise
     */
    has(...args: any[]): boolean;

    /**
     * Find the target in the list.
     * @param args - what to look for
     * @returns If a target exists, that target; if it does not exist, it is undefined
     */
    find(...args: any[]): any | undefined;
}

export = IListControl;
