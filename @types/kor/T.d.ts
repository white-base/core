
// declare namespace innerType {

// }



// export declare namespace inner {
//     interface PropertyDescriptor {
//         configurable?: boolean;
//         enumerable?: boolean;
//         value?: any;
//         writable?: boolean;
//         get?(): any;
//         set?(v: any): void;
//     }
//     type OnFunc = (idx: number, elem: any, _this: object)=> void;
//     var OnFunc : OnFunc;
// }

export interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
export type OnFunc = (idx: number, elem: any, _this: object)=> void;
// export declare var OnFunc : OnFunc;

export type Iprop = {[key: string]: string}


