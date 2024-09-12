/**
 * The 'ExtendError' class is a custom error class that provides extended error information.
 * This class extends the underlying JavaScript 'Error' class to provide additional properties and features.
 */
declare class ExtendError {

    /**
     * Creates an instance of the class 'ExtendError'.
     * 
     * @param {string} msg - Error message.
     * @param {Iprop | ExtendError} [prop] - (Optional) Previous 'ExtendError' object or property type error message.
     * 
     * @example
     * const error = new ExtendError('An error occurred', { key: 'value' });
     */
    constructor(msg: string, prop?: Iprop | ExtendError);

    /**
     * Use the message code to create an instance of the class 'ExtendError'.
     * 
     * @param {RegExp} msgCode - Error message code.
     * @param {Iprop | ExtendError} [prop] - (Optional) Previous 'ExtendError' object or property type error message.
     * @param {string[]} [codeValue] - (Optional) Conversion values of message code ($1, $2..).
     * 
     * @example
     * const error = new ExtendError(/ES010/, { key: 'value' }, ['404']);
     */
    constructor(msgCode: RegExp, prop?: Iprop | ExtendError, codeValue?: string[]);

    /**
     * Property type error message.
     */
    prop: Iprop;

    /**
     * Message queues that occurred previously.
     */
    queue: string[];

    /**
     * Error name.
     */
    name: string;

    /**
     * Error message.
     */
    message: string;

    /**
     * Outputs an error message.
     * 
     * @returns {string} Returns this.message.
     */
    stack?: string | undefined;

    /**
     * Outputs an error message.
     * 
     * @returns {string} Returns 'this.message'.
     * 
     * @example
     * const error = new ExtendError('An error occurred');
     * console.log(error.toString());  // 'An error occurred'
     */
    toString(): string;

}

export = ExtendError