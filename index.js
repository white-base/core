/**
 * ES5
 */

var Observer                    = require("./src/observer");
var BaseCollection              = require("./src/collection-base");
var ArrayCollection             = require("./src/collection-array");
var PropertyCollection          = require("./src/collection-property");
var PropertyFunctionCollection  = require('./src/collection-property-function');
var MetaObject                  = require("./src/meta-object");
var MetaElement                 = require("./src/meta-element");
var Entity                      = require('./src/entity-base');
var EntityView                  = require('./src/entity-view').EntityView;
var EntityViewCollection        = require('./src/entity-view').EntityViewCollection;
var EntityTable                 = require('./src/entity-table').EntityTable;
var Item                        = require('./src/entity-item').Item;
var CustomError                 = require('./src/error-custom');
var utils                       = require('./src/utils');

module.exports = {
    BaseCollection: BaseCollection,
    ArrayCollection: ArrayCollection,
    PropertyCollection: PropertyCollection,
    MetaObject: MetaObject,
    MetaElement: MetaElement,
    Observer: Observer,
    Entity: Entity,
    EntityView: EntityView,
    EntityViewCollection: EntityViewCollection,
    EntityTable: EntityTable,
    Item: Item,
    CustomError: CustomError,
    Util: utils,
    Common: {
        Interface: null,
        Collection: null,
        Meta: {
            Entity: null,
            Bind: null,
            Data: null,
        }
    }
}