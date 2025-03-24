/**
 * Interface for serialization and deserialization.  
 */
declare interface ISerialize {
    
    /**
     * Serialize objects, convert them into strings (such as JSON), and export them.  
     * 
     * @returns Serialized String
     */
    output(...args: any[]): string;

    /**
     * Restore objects by loading serialized data.  
     */
    load(...args: any[]): void;
}

export default ISerialize;
export { ISerialize };