// <reference path="observer.d.ts" />

// export declare class Observer {
//     /**
//      * 관찰자
//      * @param p_caller 
//      */
//     constructor(p_caller: object);
//     init(): void;
//     subscribe(p_fn: Function, p_code: string): void;
//     // 구독 취고
//     unsubscribe(p_fn: Function, p_code: string): void;
//     /**
//      * 출판
//      * @param p_code 
//      */
//     publish(p_code: string): void
// }

// declare class Observer {
//     /**
//      * 관찰자
//      * @param p_caller 
//      */
//     constructor(p_caller: object);
//     init(): void;
//     subscribe(p_fn: Function, p_code: string): void;
//     // 구독 취고
//     unsubscribe(p_fn: Function, p_code: string): void;
//     /**
//      * 출판
//      * @param p_code 
//      */
//     publish(p_code: string): void;
// }

// var Observer2
// export type Observer = Observer2;
// export = type aa: Observer = object;
// export type Co = string;
// export type Color = string;
// export {};
// export {};
// type ob = Observer
// export = ob;
// type aa = String;
// export = aa;

// export declare class Message {
//     static init(): void;
//     /**
//      * 오류 메세지
//      * @param p_code dd
//      * @param p_aValue aa
//      */
//     static get(p_code: string, p_aValue: Array<string>): string;
    
// }

import Observer = require("./observer");
import Util = require("./util");
import Message = require("./message");


// declare class Message {
//     static init(): void;
//     /**
//      * 오류 메세지
//      * @param p_code dd
//      * @param p_aValue aa
//      */
//     static get(p_code: string, p_aValue: Array<string>): string;
    
// }



export {
    Util,
    Observer,
    Message,
};

// export declare namespace _L {
// }

// export type ss = string;
// export = Observer;