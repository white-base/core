/**
 * The class 'ExtendError' inherited 'Error'.  
 * The 'ExtendError' class is a custom error class that provides extended error information.  
 */
declare class ExtendError extends Error {
    
    /**
     * Save previously generated messages.  
     */
    queue: string[];

    /**
     * Error message related to property type.  
     */
    prop: Record<string, string>;

    /**
     * Use user messages to create an ExtendError instance.  
     *
     * @param msg Error message string
     * @param causeOrProp Error message by existing ExtendError, Error object or property
     *
     * @example
     * throw new ExtendError("Custom error message");
     * throw new ExtendError("Custom error message", error);
     * throw new ExtendError("Custom error message", { style: "required" });
     */
    constructor(msg: string, causeOrProp?: Error | ExtendError | Record<string, string>);

    /**
     * Create an instance of 'ExtendError' using the message code and substitution value.  
     *
     * @param msgPattern Code value of regular expression type
     * @param causeOrProp Error message by existing ExtendError, Error object or property
     * @param placeholders Array of strings containing substitution values such as '$1' and '$2' in the
     *
     * @example
     * // For messages that do not have a substitution value
     * throw new ExtendError(/EL01504/);
     * throw new ExtendError(/EL01504/, error);
     * throw new ExtendError(/EL01504/, { style: "required" });
     * // For messages with substitution values
     * throw new ExtendError(/EL01504/, undefined, ['value1', 'value2']);
     * throw new ExtendError(/EL01504/, error, ['value1', 'value2']););
     * throw new ExtendError(/EL01504/, { style: "required" }, ['value1', 'value2']);
     */
    constructor(msgPattern: RegExp, causeOrProp?: Error | ExtendError | Record<string, string>, placeholders?: string[]);
    
    
    /**
     * Converts error messages into strings.  
     * 
     * @return error message string
     */
    toString(): string;
}

export default ExtendError;
export { ExtendError };
