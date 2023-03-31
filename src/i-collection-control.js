/**
 * namespace _L.Interface.IControlCollection
 */
(function(global) {

    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Interface     = global._L.Interface || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var ICollection;
    var IGroupControl;
    var IAllControl;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        ICollection         = require('./i-collection');
        IGroupControl       = require('./i-control-group');
        IAllControl         = require('./i-control-all');
    } else {
        Util                = global._L.Common.Util;
        ICollection         = global._L.Interface.ICollection;
        IGroupControl       = global._L.Interface.IGroupControl;
        IAllControl         = global._L.Interface.IAllControl;        
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof ICollection === 'undefined') throw new Error('[ICollection] module load fail...');
    if (typeof IGroupControl === 'undefined') throw new Error('[IGroupControl] module load fail...');
    if (typeof IAllControl === 'undefined') throw new Error('[IAllControl] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
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
            throw new Error('[ concat() ] Abstract method definition, fail...');
        };

        /**
         * 범위 복사
         * @abstract
         */
        IControlCollection.prototype.copy  = function() {
            throw new Error('[ copy() ] Abstract method definition, fail...');
        };

        /**
         * 전체 복제(복사)
         * @abstract
         */
        IControlCollection.prototype.clone  = function() {
            throw new Error('[ clone() ] Abstract method definition, fail...');
        };

        /**
         * 로드 : 전체
         * @abstract
         */
        IControlCollection.prototype.load  = function() {
            throw new Error('[ load() ] Abstract method definition, fail...');
        };

        /**
         * 삭제 : 전체
         * @abstract
         */
        IControlCollection.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };
    
        return IControlCollection;
        
    }(ICollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = IControlCollection;
    } else {
        global._L.IControlCollection = IControlCollection;
        // namespace
        global._L.Interface.IControlCollection = IControlCollection;
    }
    
}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));