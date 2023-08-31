/**
 * namespace _L.Interface.ICollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var IPartControl;
    var ILookupControl;
    var IBaseCollection;
    var Util;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Interface     = _global._L.Interface || {};    
    
    //==============================================================
    // 2. import module
    
    if (isNode) {     
        Util                = require('./util');
        IPartControl        = require('./i-control-part').IPartControl;
        ILookupControl      = require('./i-control-lookup').ILookupControl;
        IBaseCollection     = require('./i-collection-base').IBaseCollection;
    } else {
        Util                = _global._L.Util
        IPartControl        = _global._L.IPartControl;
        ILookupControl      = _global._L.ILookupControl;
        IBaseCollection     = _global._L.IBaseCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof IPartControl === 'undefined') throw new Error('[IPartControl] module load fail...');
    if (typeof ILookupControl === 'undefined') throw new Error('[ILookupControl] module load fail...');
    if (typeof IBaseCollection === 'undefined') throw new Error('[IBaseCollection] module load fail...');

    //==============================================================
    // 4. module implementation
    var ICollection  = (function (_super) {
        /**
         * 컬렉션 최상위
         * @classdesc 컬렉션 최상위 컬렉션 인터페이스
         * @constructs _L.Interface.ICollection
         * @extends  _L.Interface.IBaseCollection
         * @interface
         * @implements {_L.Interface.IPartControl}
         * @implements {_L.Interface.ILookupControl}
         */
        function ICollection() {
            /**
             * 컬렉션 갯수
             * @member
             */
            // this.count = 0;

            /**
             * 컬렉션 배열 반환
             * @member
             */
            // this.list = [];

            Util.implements(this, IPartControl, ILookupControl);
        }
        Util.inherits(IBaseCollection, _super);
    
        ICollection._NS = 'Interface';    // namespace

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
    // 5. module export
    if (isNode) {     
        exports.ICollection = ICollection;
    } else {
        _global._L.ICollection = ICollection;
        _global._L.Interface.ICollection = ICollection;     // namespace
    }

}(typeof window !== 'undefined' ? window : global));