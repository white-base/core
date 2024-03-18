
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
import IArrayCollection     = require("./collection-array");

import NamespaceManager     = require("./namespace-manager");
import MetaRegistry         = require("./meta-registry");
import MetaObject           = require("./meta-object");
import MetaElement          = require("./meta-element");

import BaseCollection       = require("./base-collection");
import ArrayCollection      = require("./collection-array");
import PropertyCollection   = require("./collection-property");


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
    BaseCollection,
    ArrayCollection,
    PropertyCollection
};

// export declare namespace _L {
// }

// export type ss = string;
// export = Observer;