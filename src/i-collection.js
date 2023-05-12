/**
 * namespace _L.Interface.ICollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var IPartControl;
    var ILookupControl;
    var Util;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};    
    _global._L.Interface     = _global._L.Interface || {};    
    
    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    
    if (isNode) {     
        IPartControl        = require('./i-control-part');
        ILookupControl      = require('./i-control-lookup');
        Util                = require('./util');
    } else {
        IPartControl        = _global._L.Interface.IPartControl;
        ILookupControl      = _global._L.Interface.ILookupControl;
        Util                = _global._L.Common.Util
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof IPartControl === 'undefined') throw new Error('[IPartControl] module load fail...');
    if (typeof ILookupControl === 'undefined') throw new Error('[ILookupControl] module load fail...');
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ICollection  = (function () {
        /**
         * 컬렉션 최상위
         * @classdesc 컬렉션 최상위 컬렉션 인터페이스
         * @constructs _L.Interface.ICollection
         * @interface
         * @implements {_L.Interface.IPartControl}
         * @implements {_L.Interface.ILookupControl}
         */
        function ICollection() {
            /**
             * 컬렉션 갯수
             * @member
             */
            this.count = 0;

            /**
             * 컬렉션 배열 반환
             * @member
             */
            this.list = [];

            /** implements IPartControl 인터페이스 구현 */
            /** implements ILookupControl 인터페이스 구현 */
            // this._implements(IPartControl, ILookupControl);            
            Util.implements(this, IPartControl, ILookupControl);
        }
    
        /**
         * 등록 : insert
         * @abstract
         */
        ICollection.prototype.add  = function() {
            throw new Error('[ add(any) : boolean ] Abstract method definition, fail...');
        };

        /**
         * 삭제 (객체, 이름) : delete
         * @abstract
         */
        ICollection.prototype.remove  = function() {
            throw new Error('[ remove(elem) : boolean ] Abstract method definition, fail...');
        };

        /**
         * 삭제 (번호) : delete
         * @abstract
         */
        ICollection.prototype.removeAt  = function() {
            throw new Error('[ removeAt(idx) : boolean ] Abstract method definition, fail...');
        };

        /**
         * 초기화 : update (delete 후 insert 의 의미)
         * @abstract
         */
        ICollection.prototype.clear  = function() {
            throw new Error('[ clear() ] Abstract method definition, fail...');
        };

        /**
         * 유무 검사 (소유) : read (select)
         * @abstract
         */
        ICollection.prototype.contains  = function() {
            throw new Error('[ contains() ] Abstract method definition, fail...');
        };

        /**
         * 찾기 (번호) : read(select)
         * @abstract
         */
        ICollection.prototype.indexOf  = function() {
            throw new Error('[ indexOf() ] Abstract method definition, fail...');
        };

        /**
         * 키 유무
         * @abstract
         */
        ICollection.prototype.exist  = function() {
            throw new Error('[ exist() ] Abstract method definition, fail...');
        };

        
    
        return ICollection;
        
    }());

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = ICollection;
    } else {
        _global._L.ICollection = ICollection;
        _global._L.Interface.ICollection = ICollection;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));