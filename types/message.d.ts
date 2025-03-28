/**
 * 'Message' is a class that manages messages and codes.  
 */
declare class Message {

    /**
     * Namespace path. ('Common')
     */
    static _NS: string;

    /**
     * Internal repository that stores message code.  
     */
    static $storage: Record<string, any>;

    /**
     * Sets whether automatic language detection is enabled. Default is true.  
     */
    // static autoDetect: boolean;

    /**
     * Set the default language. Default is 'default'.  
     */
    static defaultLang: string;

    /**
     * Sets the current language. Default is 'default'.  
     */
    static currentLang: string;

    /**
     * Returns a message that corresponds to the message code.  
     * 
     * @param code Message code
     * @returns Message String
     */
    static getMessageByCode(code: string): string;

    /**
     * Add the message code to the storage.  
     * 
     * @param messages Message Object
     * @param locales Message file path
     */
    static importMessage(messages: Record<string, any>, locales: string): void;

    /**
     * Change the language.  
     * 
     * @param lang language code
     */
    static changeLanguage(lang: string): Promise<void>;

    /**
     * Returns a string corresponding to the given message code.  
     * 
     * @param code Message code
     * @param placeholders Value to replace in message
     * @returns Message String
     */
    static get(code: string, placeholders?: string[]): string;

    /**
     * Initialize the language.  
     */
    static resetLang(): void;    

    /**
     * Set the current language by automatically detecting the language.  
     */
    static autoDetect(): Promise<void>;
}

export default Message;
export { Message };
