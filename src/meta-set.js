/**
 * namespace _L.Meta.Entity.MetaSet
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var IGroupControl;
    var IAllControl;
    var MetaElement;
    var MetaTableCollection;
    var MetaViewCollection;

    //==============================================================
    // 1. 의존 모듈 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};    
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                    = require('./util');
        IGroupControl           = require('./i-control-group');
        IAllControl             = require('./i-control-all');
        MetaElement             = require('./meta-element');
        MetaTableCollection     = require('./meta-table').MetaTableCollection;
        MetaViewCollection      = require('./meta-view').MetaViewCollection;
    } else {
        Util                    = _global._L.Common.Util;
        IGroupControl           = _global._L.Interface.IGroupControl;
        IAllControl             = _global._L.Interface.IAllControl;
        MetaElement             = _global._L.Meta.MetaElement;
        MetaTableCollection     = _global._L.Meta.Entity.MetaTableCollection;
        MetaViewCollection      = _global._L.Meta.Entity.MetaViewCollection;
    }

    //==============================================================
    // 3. 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IGroupControl === 'undefined') throw new Error('[IGroupControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');
    if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof MetaTableCollection === 'undefined') throw new Error('[MetaTableCollection] module load fail...');
    if (typeof MetaViewCollection === 'undefined') throw new Error('[MetaViewCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaSet  = (function (_super) {
        /**
         * 엔티티
         * @constructs _L.Meta.Entity.MetaSet
         * @extends _L.Meta.MetaElement
         * @implements {_L.Interface.IGroupControl}
         * @implements {_L.Interface.IAllControl}
         * @param {*} p_name 
         */
        function MetaSet(p_name) {
            _super.call(this, p_name);

            var __tables = new MetaTableCollection(this);
            var __views  = new MetaViewCollection(this);

            /**
             * 메타 테이블 컬렉션
             * @member {MetaTableCollection} _L.Meta.Entity.MetaSet#tables
             */
            Object.defineProperty(this, 'tables', 
            {
                get: function() { return __tables; },
                set: function(newValue) { 
                    if (!(newValue instanceof MetaTableCollection)) throw new Error('Only [tables] type "MetaTableCollection" can be added');
                    __tables = newValue;
                },
                configurable: true,
                enumerable: true
            });
            
            /**
             * 메타 뷰 컬렉션
             * @member {MetaViewCollection} _L.Meta.Entity.MetaSet#views
             */
            Object.defineProperty(this, 'views', 
            {
                get: function() { return __views; },
                set: function(newValue) {
                    if (!(newValue instanceof MetaViewCollection)) throw new Error('Only [views] type "MetaViewCollection" can be added'); 
                    __views = newValue;
                },
                configurable: true,
                enumerable: true
            });

            // this._implements(IGroupControl, IAllControl);
            Util.implements(this, IGroupControl, IAllControl);
        }
        Util.inherits(MetaSet, _super);

        MetaSet.prototype.copy  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.merge  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.load  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.clone  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.acceptChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.rejectChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.getChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.hasChanges  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.clear  = function() {
            console.log('구현해야함');  // COVER:
        };
        MetaSet.prototype.reset  = function() {
            console.log('구현해야함');  // COVER:
        };

        return MetaSet;
    
    }(MetaElement));
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = MetaSet;
    } else {
        _global._L.MetaSet = MetaSet;
        _global._L.Meta.Entity.MetaSet = MetaSet;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));