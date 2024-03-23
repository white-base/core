

import ExtendError          = require("./extend-error");
import Observer             = require("./observer");
import Util                 = require("./util");
import Type                 = require("./type");
import Message              = require("./message");

import IObject              = require("./i-object");
import IMarshal             = require("./i-marshal");
import ICollection          = require("./i-collection");
import IPropertyCollection  = require("./i-collection-property");
import IElement             = require("./i-element");
import IList                = require("./i-list");
import IListControl         = require("./i-control-list");
import ISerialize           = require("./i-serialize");
import IArrayCollection     = require("./i-collction-array");

import NamespaceManager     = require("./namespace-manager");
import MetaRegistry         = require("./meta-registry");
import MetaObject           = require("./meta-object");
import MetaElement          = require("./meta-element");

import BaseCollection       = require("./base-collection");
// import {Collection}           = require("./collection-array");
// import * as C           = require("./collection-array");

// import Collection           = require("./collection-array");
import ArrayCollection     = require("./collection-array");

// declare type ArrayCollection =  ArrayCollection.Collection
// import ArrayCollection      Collection.ArrayCollection;
// import ArrayCollection      = require("./collection-array");
import PropertyCollection   = require("./collection-property");
import T                = require("./T");

export {T}
// declare var ArrayCollection = Collection.ArrayCollection;

// declare namespace ArrayCollection;
// export declare var Coll : {ArrayCollection: Collection.ArrayCollection}
// export {Collection}
export {ArrayCollection, BaseCollection}
// declare class Message {
//     static init(): void;
//     /**
//      * 오류 메세지
//      * @param p_code dd
//      * @param p_aValue aa
//      */
//     static get(p_code: string, p_aValue: Array<string>): string;
    
// }
//  type ArrayCollection = Collection.ArrayCollection;
// declare const {ArrayCollection} = Collection.;
// declare class Collection.ArrayCollection;

// var Array
// declare const View : {Com: IArrayCollection};

// declare namespace View {
//     const IArrayCollection:  IArrayCollection;
// }

// declare type aa = string;

// export declare var _L : {Common: {}, };

// export namespace _L {
    export namespace Common {
        /** Util 네임스페이스 TODO: */
        let Util;
        /** Type 네임스페이스 TODO: */
        let Type;
    }
    export namespace Interface {
        var IObject : IObject;
        var IMarshal : IMarshal;
        var ICollection : ICollection;
        var IPropertyCollection : IPropertyCollection;
        var IElement : IElement;
        var IList : IList;
        var IListControl : IListControl;
        var ISerialize : ISerialize;
        var IArrayCollection : IArrayCollection;
        // type IObject = IObject;
    }
    export namespace Meta {
        var NamespaceManager : NamespaceManager;
        var MetaRegistry : MetaRegistry;
        var MetaObject : MetaObject;
        var MetaElement : MetaElement;
        
    }
    export namespace Collection {
        var BaseCollection : BaseCollection;
        var ArrayCollection : ArrayCollection;
        var PropertyCollection : PropertyCollection;
        
    }
// }

// _L.Common.Util

// export declare namespace Common {
//         const Observer : Observer;

//         // const Util : Util 
//         // const Util : Util
//         // namespace Ss : Util;
// }
// export declare namespace Common.Util {
//     // Util
//     var inherits : string;
//     // export Util
//     // const Observer : Observer; 
//     // const Util : Util
//     // namespace Ss : Util;
// }

// export declare 

    // interface _Common {
    //     aa: string
    // }
    // const Common: {
    //     // a: _Common
    //     IArrayCollection
    // }
    // namespace Common {
        // const Util : Util
    // }
    // const Common: { 'Util': Util };

    // namespace Util { }
// }  



export {
    ExtendError,
    Observer,
    Util,
    Type,
    Message,
    IObject,
    IMarshal,
    ICollection,
    IPropertyCollection,
    IElement,
    IList,
    IListControl,
    ISerialize,
    IArrayCollection,
    NamespaceManager,
    MetaRegistry,
    MetaObject,
    MetaElement,
    // BaseCollection as Collection,
    // ArrayCollection,
    // Collection,
    // View,
    // Common,
    // Collection.ArrayCollection as aa,
    // as = Collection.ArrayCollection,
    // Collection as ssss,
    // Collection.ArrayCollection as ssss,
    // ArrayCollection,
    // Collection as ArrayCollection,
    // Collection.ArrayCollection,
    // Collection.ArrayCollection as ArrayCollection,
    PropertyCollection
    // ArrayCollection.
};

// export declare namespace _L {
// }

// export type ss = string;
// export = Observer;