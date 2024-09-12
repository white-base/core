/**
 * This is a serialization interface.
 * @interface 
 */
declare interface ISerialize {

    /**
     * Serialize and export objects.
     * @param {...any} args - Arguments needed to serialize
     * @returns {string} serialized string
     */
    output(...args): string;

    /**
     * Gets serialized data and loads the object.
     * @param {...any} args - Arguments needed to load
     */
    load(...args): void;
}

export = ISerialize;