import type IElement from "./i-element.d.ts";
import type MetaObject from "./meta-object.d.ts";

/**
 * The MetaElement class inherits the MetaObject and implements the IElement interface.  
 */
declare class MetaElement extends MetaObject implements IElement {

    /**
     * Internal property that stores the name of the element.  
     */
    _name: string;

    /**
     * Creates an instance of the MetaElement class.  
     * 
     * @param name Name of the element
     */
    constructor(name: string);

    /**
     * Returns the object as an object literal of type GUID.  
     * 
     * @param mode Import mode  
     * mode=0 : reference structure (_guid:Yes, $ref:Yes)  
     * mode=1: Redundant structure (_guid:Yes, $ref:Yes)  
     * mode=2 : non-coordinated structure (_guid: No, $ref: No)  
     * @param context Parent object that contains (owns) the current object  
     * @returns Guid type object literal
     */
    getObject(mode?: number, context?: object | object[]): object;

    /**
     * Set up a GUID type object literal by converting it to an instance object.  
     * 
     * @param guidObj object literal of the type of GUID to be set
     * @param guidRootObj Initial GUID literal object referenced during conversion
     */
    setObject(guidObj: object, guidRootObj?: object): void;

    /**
     * Creates a replica of the current object.  
     * 
     * @returns Replicated Objects
     */
    clone(): this;
}

export default MetaElement;
export { MetaElement };