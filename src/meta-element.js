/**** meta-element.js | _L.Meta.MetaElement ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    if (isNode) {                                                                   // strip:
        var _Message                    = require('./message').Message;             // strip:
        var _ExtendError                = require('./extend-error').ExtendError;    // strip:
        var _Util                       = require('./util').Util;                   // strip:
        var _MetaObject                 = require('./meta-object').MetaObject;      // strip:
        var _IElement                   = require('./i-element').IElement;          // strip:
    }                                                                               // strip:
    var $Message                    = _global._L.Message;           // modify:
    var $ExtendError                = _global._L.ExtendError;       // modify:
    var $Util                       = _global._L.Util;              // modify:
    var $MetaObject                 = _global._L.MetaObject;        // modify:
    var $IElement                   = _global._L.IElement;          // modify:
    
    var Message                 = _Message              || $Message;                // strip:
    var ExtendError             = _ExtendError          || $ExtendError;            // strip:
    var Util                    = _Util                 || $Util;                   // strip:
    var IElement                = _IElement             || $IElement;               // strip:
    var MetaObject              = _MetaObject           || $MetaObject;             // strip:

    //==============================================================
    // 2. module dependency check
    if (!ExtendError) throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (!Util) throw new Error(Message.get('ES011', ['Util', 'util']));
    if (!IElement) throw new Error(Message.get('ES011', ['IElement', 'i-element']));
    if (!MetaObject) throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 3. module implementation   
    var MetaElement  = (function (_super) {

        /**
         * 메타 요소 객체를 생성합니다.  
         * (독립체 사용 단위)
         * @constructs _L.Meta.MetaElement
         * @extends _L.Meta.MetaObject
         * @implements {_L.Interface.IElement}
         * @param {string} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            var _name;

            // /**
            //  * 내부 변수 접근
            //  * @member {string} _L.Meta.MetaElement#$name
            //  * @readonly
            //  * @private
            //  */
            // Object.defineProperty(this, '$name',
            // {
            //     get: function() { return _name; },
            //     set: function(nVal) { 
            //         if (typeof nVal !== 'string') throw new ExtendError(/EL03121/, null, [typeof val]);
            //         if (nVal.length === 0) throw new ExtendError(/EL03122/, null, []);
            //         _name = nVal;
            //     },
            //     configurable: false,
            //     enumerable: false,
            // });

            /**
             * 현재 객체의 이름
             * @readonly
             * @member {string} _L.Meta.MetaElement#_name
             */
            Object.defineProperty(this, '_name',
            {
                get: function() { return _name; },
                set: function(nVal) {
                    if (typeof nVal !== 'string') throw new ExtendError(/EL03121/, null, [typeof val]);
                    if (nVal.length === 0) throw new ExtendError(/EL03122/, null, []);
                    _name = nVal;
                },
                configurable: false,
                enumerable: false
            });

            this._name = p_name;

            Util.implements(MetaElement, this);     // strip:
        }
        Util.inherits(MetaElement, _super);
        
        MetaElement._UNION = [IElement];
        MetaElement._NS = 'Meta';           // namespace
        MetaElement._PARAMS = ['name'];     // creator parameter
        
        /**
         * 현재 객체를 직렬화(guid 타입) 객체로 얻습니다.  
         * (순환참조는 $ref 값으로 대체된다.)  
         * @param {number} [p_vOpt=0] 가져오기 옵션
         * - opt=0 : 참조 구조(_guid:Yes, $ref:Yes)  
         * - opt=1 : 중복 구조(_guid:Yes, $ref:Yes)  
         * - opt=2 : 비침조 구조(_guid:No,  $ref:No)   
         * @param {object | array<object>} [p_owned={}] 현재 객체를 소유하는 상위 객체들
         * @returns {object}  guid 타입 객체
         * @example
         * a.getObject(2) == b.getObject(2)   
         */
        MetaElement.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            obj['name'] = this._name;
            return obj;
        };
        Object.defineProperty(MetaElement.prototype, 'getObject', {
            enumerable: false
        });

        /**
         * 직렬화(guid 타입) 객체를 현재 객체에 설정합니다.  
         * (객체는 초기화 된다.)
         * @param {object} p_oGuid 직렬화 할 guid 타입의 객체
         * @param {object} [p_origin=p_oGuid] 현재 객체를 설정하는 원본 객체  
         */
        MetaElement.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;
            this._name = p_oGuid['name'];
            // this.__SET$_name(p_oGuid['name'], this);
        };
        Object.defineProperty(MetaElement.prototype, 'setObject', {
            enumerable: false
        });

        /**
         * 현제 객체를 복제합니다.
         * @returns {MetaElement}
         */
        MetaElement.prototype.clone  = function() {
            var clone = new MetaElement(this._name);
            return clone;
        };
        Object.defineProperty(MetaElement.prototype, 'clone', {
            enumerable: false
        });

        return MetaElement;

    }(MetaObject));

    //==============================================================
    // 4. module export
    if (isNode) exports.MetaElement = MetaElement;      // strip:
    
    // create namespace
    _global._L.Meta                 = _global._L.Meta || {};

    _global._L.MetaElement = MetaElement;
    _global._L.Meta.MetaElement = MetaElement;

}(typeof window !== 'undefined' ? window : global));