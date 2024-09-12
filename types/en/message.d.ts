/**
 * Classes that manage messages and codes, which process message codes through static methods,
 * Provides the ability to return messages or cause errors in a variety of ways.
 * 
 * @static
 */
declare class Message {
    
    /**
     * Message code repository.
     * This object uses the message code as a key to manage that message.
     */
    static $storage: object;
    
    /**
     * Set the message language.
     * Default is 'eng'. Setting this property changes the language used to return strings for message codes.
     */
    static lang: string | 'eng';

    /**
     * Returns the string using the message code.
     * Use the given message code to query the storage for string messages,
     * Returns the placeholder in the message ('$1', '$2', ...) replaced with the value provided.
     * 
     * @param code - Message code.
     * @param value - Values to replace the placeholder in the message.
     * @returns {string} String for this message code.
     * 
     * @example
     * const message = Message.get('error_not_found', ['File']);
     * console.log(message);  // "Error: File not found"
     */
    static get(code: string, value: string[]): string;
        
    /**
     * Use the message code to create an Error object and make an exception.
     * Use the given message code to query the storage for string messages,
     * Create an 'Error' object by replacing the placeholder in the message ('$1', '$2', ...) with the values provided.
     * 
     * @param code - Message code.
     * @param value - Values to replace the placeholder in the message.
     * @returns {Error} created 'Error' object.
     */
    static error(code: string, value: string[]): Error;

    /**
     * Use the message code to generate console.warn.
     * Use the given message code to query the storage for string messages,
     * Replace the placeholder('$1','$2',...) in the message with the value provided and output it as 'console.warn'.
     * 
     * @param code - Message code.
     * @param value - Values to replace the placeholder in the message.
     * 
     * @example
     * Message.warn('deprecated_method', ['saveData']);
     * // Logs: "Warning: The method 'saveData' is deprecated."
     */
    static warn(code: string, value: string[]);

}

export {
    Message as default,
    Message
}