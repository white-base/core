/**
 * Element (independent) interface.
 * @interface
 */
declare interface IElement {

    /**
     * Replicate the element.
     * @returns Replicated Elements
     */
    clone(): IElement;
}

export = IElement;