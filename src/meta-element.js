/**
 * namespace _L.Meta.MetaElement
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var MetaObject;
    // var IMarshal;

    //==============================================================
    // 1. namespace declaration
    _global._L                  = _global._L || {};
    _global._L.Meta             = _global._L.Meta || {};
   
    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                 = require('./message').Message;
        Util                    = require('./util');
        MetaObject              = require('./meta-object').MetaObject;
    } else {
        Message                 = _global._L.Message;
        Util                    = _global._L.Util;
        MetaObject              = _global._L.MetaObject;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);

    //==============================================================
    // 4. 모듈 구현
    // private variable
    
    var MetaElement  = (function (_super) {

        /**
         * IMarshal 인터페이스 구현 및 ..
         * @constructs _L.Meta.MetaElement
         * @abstract
         * @extends _L.Meta.MetaObject
         * @implements {_L.Interface.IMarshal}
         * @param {*} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            var metaName;

            /**
             * 메타 이름
             * @member {string} _L.Meta.MetaElement#metaName
             */
            Object.defineProperty(this, 'metaName',
            {
                get: function() { return metaName; },
                set: function(newValue) { 
                    if (typeof newValue !== 'string')  throw new Error('Only [metaName] type "string" can be added');   // COVER: 2
                    metaName = newValue;
                },
                configurable: false,
                enumerable: true
            });
                        
            this.metaName = p_name || '';
        }
        Util.inherits(MetaElement, _super);
    
        MetaElement._NS = 'Meta';           // namespace
        MetaElement._PARAMS = ['name'];     // creator parameter

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        MetaElement.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this);
            obj.name = this.metaName;
            return obj;                        
        };

        /**
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        MetaElement.prototype.setObject  = function(mObj, oObj) {
            _super.prototype.setObject.call(this, mObj, oObj);
            this.metaName = mObj.name;
        };
        // MetaElement.prototype.setObject  = function(mObj) {
        //     var parent = _super.prototype.setObject.call(this, mObj);
        //     if(!parent) {
        //         this.metaName = mObj.name;
        //     } else return parent;
        // };

        return MetaElement;

    }(MetaObject));


    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.MetaElement = MetaElement;
    } else {
        _global._L.MetaElement = MetaElement;
        _global._L.Meta.MetaElement = MetaElement;  // namespace
    }

}(typeof window !== 'undefined' ? window : global));