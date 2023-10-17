/**
 * namespace _L.Meta.MetaElement
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var MetaObject;
    var IElement;
    // var IMarshal;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Meta                 = _global._L.Meta || {};
   
    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        IElement                    = require('./i-element').IElement;
        MetaObject                  = require('./meta-object').MetaObject;
    } else {
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        IElement                    = _global._L.IElement;
        MetaObject                  = _global._L.MetaObject;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IElement === 'undefined') Message.error('ES011', ['IElement', 'i-element']);
    if (typeof MetaObject === 'undefined') Message.error('ES011', ['MetaObject', 'meta-object']);

    //==============================================================
    // 4. 모듈 구현
    // private variable
    
    var MetaElement  = (function (_super) {

        /**
         * 메타 요소, 독립적으로 사용가능한 단위
         * @constructs _L.Meta.MetaElement
         * @extends _L.Meta.MetaObject
         * @implements {_L.Interface.IElement}
         * @param {string} p_name 
         */
        function MetaElement(p_name) {
            _super.call(this);
            
            var _name;

            /**
             * 현재 객체의 이름을 가져오거나, 설정합니다.
             * @readonly
             * @member {string} _L.Meta.MetaElement#_name
             */
            Object.defineProperty(this, '_name',
            {
                get: function() { return _name; },
                configurable: false,
                enumerable: true
            });

            // inner variable access
            this.__SET$_name = function(val, call) {
                if (typeof val !== 'string') Message.error('ES021', ['_name', 'string']);   // Branch:
                if (val.length === 0) Message.error('ES055', ['_name']);
                if (call instanceof MetaElement) _name = val;    // 상속접근 허용
            }
            
            this.__SET$_name(p_name, this);

            Util.implements(MetaElement, this);
        }
        Util.inherits(MetaElement, _super);
        MetaElement._UNION = [IElement];
        MetaElement._NS = 'Meta';           // namespace
        MetaElement._PARAMS = ['name'];     // creator parameter
        
        /**
         * 현재 객체의 guid 타입의 객체를 가져옵니다.  
         * - 순환참조는 $ref 값으로 대체된다.
         * @param {number} p_vOpt 가져오기 옵션
         * - opt = 0 : 참조 구조의 객체 (_guid: Yes, $ref: Yes)  
         * - opt = 1 : 소유 구조의 객체 (_guid: Yes, $ref: Yes)  
         * - opt = 2 : 소유 구조의 객체 (_guid: No,  $ref: No)   
         * 객체 비교 : equal(a, b)  
         * a.getObject(2) == b.getObject(2)   
         * @param {(object | array<object>)?} p_owned 현재 객체를 소유하는 상위 객체들
         * @returns {object}  
         */
        MetaElement.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            obj['name'] = this._name;
            return obj;
        };

        /**
         * 현재 객체를 초기화 후, 지정한 guid 타입의 객체를 사용하여 설정합니다.   
         * @param {object} p_oGuid guid 타입의 객체
         * @param {object?} p_origin 현재 객체를 설정하는 원본 guid 객체  
         * 기본값은 p_oGuid 객체와 동일
         */
        MetaElement.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            var origin = p_origin ? p_origin : p_oGuid;
            this.__SET$_name(p_oGuid['name'], this);
        };
        
        /**
         * 객체 복제
         * @returns {MetaElement}
         */
        MetaElement.prototype.clone  = function() {
            var clone = new MetaElement(this._name);
            return clone;
        };

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