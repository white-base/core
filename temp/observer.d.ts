// declare global {
//     namespace _L {
//         namespace Common {
//             /**
//              * 전역에 설정한 옵서버
//              */
//             class Observer {
//                 constructor(p_caller: object);
    
//             }
//         }
//     }
// } 

// declare global {
//     namespace _L {
//         /**
//          * 전역에 설정한 옵서버
//          */
//         class Observer {
//             constructor(p_caller: object);

//         }

//     }
// } 


// declare namespace _L {
//     export class Observer {
//         /**
//          * 
//          * @param p_caller 소유 객체 ...
//          */
//         constructor(p_caller: object);
    
//     }
    
// }

// declare module "_L" {
//     export class Observer {
//         /**
//          * 
//          * @param p_caller 소유 객체 ...ee
//          */
//         constructor(p_caller: object);
    
//     }
    
// }

// declare global {
//         /**
//          * 전역에 설정한 옵서버
//          */
//         class Observer {
//             constructor(p_caller: object);
//         }
// } 

/**
 * asdsadds
 */
// interface Observer {
//     /**
//      * Converts a date and time to a string by using the current or specified locale.
//      * @param locales A locale string, array of locale strings, Intl.Locale object, or array of Intl.Locale objects that contain one or more language or locale tags. If you include more than one locale string, list them in descending order of priority so that the first entry is the preferred locale. If you omit this parameter, the default locale of the JavaScript runtime is used.
//      * @param options An object that contains one or more properties that specify comparison options.
//      */
//     subscribe(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions): string;


// }


/**
 * d.ts 정의 옵져서 [src]
 */
export class Observer {
    /**
     * 
     * @param p_caller 소유 객체 [src]
     */
    constructor(p_caller: object);

    subscribe(p_code: string, p_fn: Function): void;
}
