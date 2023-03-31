/**
 * namespace _L.Meta.MetaElement
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Meta          = global._L.Meta || {};

   
    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var MetaObject;
    var IMarshal;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        MetaObject          = require('./meta-object');
        IMarshal            = require('./i-marshal');

    } else {
        Util                = global._L.Common.Util;
        MetaObject          = global._L.Meta.MetaObject;
        IMarshal            = global._L.Interface.IMarshal;

    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    if (typeof IMarshal === 'undefined') throw new Error('[IMarshal] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
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
            
            this.name = p_name || '';
            
            /**
             * GUID 값 
             * @type {String}
             * @private 
             */
            this.__GUID = null;
            
            /** implements IMarshal 인터페이스 구현 */
            // this._implements(IMarshal);            
            Util.implements(this, IMarshal);
        }
        Util.inherits(MetaElement, _super);
    
        /** @override **/
        MetaElement.prototype.getTypes = function() {
            var type = ['MetaElement'];
            
            return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        };

        /**
         * GUID 생성한다.
         * @private
         * @returns {String}
         */
        MetaObject.prototype.__newGUID  = function() {
            return Util.createGUID();
        };

        /**
         * 조건 : GUID는 한번만 생성해야 함
         * GUID를 얻는다.
         * @returns {String}
         */
        MetaObject.prototype.getGUID  = function() {
            if (this.__GUID === null) {
                this.__GUID = this.__newGUID();
            }
            return this.__GUID;
        };

        /**
         * 객체를 얻는다
         * REVIEW:: 공통 요소? 확인필요
         * @virtual
         * @returns {Object}
         */
        MetaElement.prototype.getObject  = function(p_context) {
            var obj     = {};

            for (var prop in this) {
                if (this[prop] instanceof MetaElement) {
                    obj[prop] = this[prop].getObject(p_context);
                } else if (typeof this[prop] !== 'function' && prop.substr(0, 1) !== '_') {
                    obj[prop] = this[prop];
                }
            }
            return obj;                        
        };

        return MetaElement;

    }(MetaObject));


    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = MetaElement;
    } else {
        global._L.MetaElement = MetaElement;
        // namespace
        global._L.Meta.MetaElement = MetaElement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));