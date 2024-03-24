export interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
export type OnFunc = (idx: number, elem: any, _this: object)=> void;

export type Iprop = {[key: string]: string}

export type RefObject = { $ref: string /** 2333-234234-... */ };

export type NsObject = { $ns: string /** Meta.MetaObject */ };

export type SetObject = { $set: string/** guid */};

export type NsTypeObject = { _type: 'ns' };

export type PathObject = { ns: string, key: string };

