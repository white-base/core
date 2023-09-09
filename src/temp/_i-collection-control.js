/**
 * @namespace _L.Interface.IControlCollection
 * REVIEW: 필요성 여부 검토
 */
(function(_global) {

    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var ICollection;
    var IGroupControl;
    var IAllControl;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Interface     = _global._L.Interface || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                = require('./util');
        ICollection         = require('./i-collection');
        IGroupControl       = require('./i-control-group');
        IAllControl         = require('./i-control-all');
    } else {
        Util                = _global._L.Common.Util;
        ICollection         = _global._L.Interface.ICollection;
        IGroupControl       = _global._L.Interface.IGroupControl;
        IAllControl         = _global._L.Interface.IAllControl;        
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');
    if (typeof IGroupControl === 'undefined') throw new Error('[IGroupControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');

    //==============================================================
    // 4. module implementation   
    var IControlCollection  = (function (_super) {
        /** 
         * 컨트롤 컬렉션 엔터페이스
         * @constructs _L.Interface.IControlCollection
         * @interface
         * @extends _L.Interface.ICollection
         * @implements {_L.Interface.IGroupControl}
         * @implements {_L.Interface.IAllControl}
         */
        function IControlCollection() {
            _super.call(this);

            // this._implements(IGroupControl, IAllControl);            
            Util.implements(this, IGroupControl, IAllControl);

        }
        Util.inherits(IControlCollection, _super);        
    
        /**
         * 병합, 합침
         * @abstract
         */
        IControlCollection.prototype.merge  = function() {
            Message.error('ES013', ['merge()']);
        };

        /**
         * 범위 복사
         * @abstract
         */
        IControlCollection.prototype.copy  = function() {
            Message.error('ES013', ['copy()']);
        };

        /**
         * 전체 복제(복사)
         * @abstract
         */
        IControlCollection.prototype.clone  = function() {
            Message.error('ES013', ['clone()']);
        };

        /**
         * 로드 : 전체
         * @abstract
         */
        IControlCollection.prototype.load  = function() {
            Message.error('ES013', ['load()']);
        };

        /**
         * 삭제 : 전체
         * @abstract
         */
        IControlCollection.prototype.clear  = function() {
            Message.error('ES013', ['clear()']);
        };
    
        return IControlCollection;
        
    }(ICollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        module.exports = IControlCollection;
    } else {
        _global._L.IControlCollection = IControlCollection;
        _global._L.Interface.IControlCollection = IControlCollection;   // namespace
    }
    
}(typeof window !== 'undefined' ? window : global));