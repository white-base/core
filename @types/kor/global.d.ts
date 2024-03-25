declare interface PropertyDescriptor {
    configurable?: boolean;
    enumerable?: boolean;
    value?: any;
    writable?: boolean;
    get?(): any;
    set?(v: any): void;
}
declare type OnFunc = (idx: number, elem: any, _this: object)=> void;

declare type Iprop = {[key: string]: string}

declare type RefObject = { $ref: string /** 2333-234234-... */ };

declare type NsObject = { $ns: string /** Meta.MetaObject */ };

declare type SetObject = { $set: string/** guid */};

declare type NsTypeObject = { _type: 'ns' };

declare type PathObject = { ns: string, key: string };

