/**
 * Element (independent) interface.  
 */
declare interface IElement {
    
    _name: string;

    /**
     * Creates a copy of the current element.  
     * 
     * @param args Arguments needed to load
     * @returns Replicated Elements
     */
    clone(...args: any[]): this;
}

export default IElement;
export { IElement };