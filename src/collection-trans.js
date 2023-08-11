/**
 * namespace _L.Collection.TransactionCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var ArrayCollection;
    var TransactionQueue;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Collection    = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                = require('./util');
        ArrayCollection      = require('./collection-array').ArrayCollection;
        TransactionQueue      = require('./trans-queue').TransactionQueue;
    } else {    
        Util                = _global._L.Common.Util;
        ArrayCollection      = _global._L.Collection.ArrayCollection;
        TransactionQueue      = _global._L.Collection.TransactionQueue;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof ArrayCollection === 'undefined') throw new Error('[ArrayCollection] module load fail...');
    if (typeof TransactionQueue === 'undefined') throw new Error('[TransactionQueue] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var TransactionCollection  = (function (_super) {
        /**
         * 배열타입 컬렉션 클래스
         * @constructs _L.Collection.TransactionCollection
         * @extends _L.Collection.ArrayCollection
         * @param {Object} p_owner 소유객체
         */
        function TransactionCollection(p_owner) {
            _super.call(this, p_owner);

            var _transQueue = new TransactionQueue(this);
            var autoChanges = false;

            /**
             * 트렌젝션 큐
             * @member {TransactionCollection} _L.Collection.TransactionQueue#transQueue
             */
            Object.defineProperty(this, '_transQueue',
            {
                get: function() { return _transQueue; },
                configurable: false,
                enumerable: true
            });

            /**
             * 트랜젝션 사용 유무 (기본값: 사용 false)
             * @member {boolean} _L.Collection.TransactionQueue#autoChanges
             */
            Object.defineProperty(this, 'autoChanges', {
                get: function() { return autoChanges; },
                set: function(newValue) { 
                    if (typeof newValue !== 'boolean') {
                        throw new Error('Only [p_collection] type "ArrayCollection" can be added');
                    }
                    autoChanges = newValue;
                },
                configurable: false,
                enumerable: true
            });

            /**
             * 변경 유무
             * @member {TransactionCollection} _L.Collection.TransactionQueue#isChange
             */
            Object.defineProperty(this, 'isChanges',
            {
                get: function() { return _transQueue.queue.length > 0; },
                configurable: false,
                enumerable: true
            });

        }
        Util.inherits(TransactionCollection, _super);

        
        // TransactionCollection.prototype.add = function(p_value, p_desc) {
        //     // if (!this.autoChanges) this._transQueue.insert(p_value, this._element.length);

        //     return _super.prototype.add.call(this, p_value, p_desc);
        // };

        TransactionCollection.prototype.clear = function() {
            this._transQueue.init();
            return _super.prototype.clear.call(this);
        };

        TransactionCollection.prototype.insertAt = function(p_pos, p_value, p_desc) {
            if (!this.autoChanges) this._transQueue.insert(p_pos, p_value);
            return _super.prototype.insertAt.call(this, p_pos, p_value, p_desc);
        };

        // TransactionCollection.prototype.remove = function(p_elem) {
        //     // if (!this.autoChanges) this._transQueue.delete(this.indexOf(p_elem));
        //     return _super.prototype.remove.call(this, p_elem);
        // };

        TransactionCollection.prototype.removeAt = function(p_pos) {
            if (!this.autoChanges) this._transQueue.delete(p_pos, this[p_pos]);
            return _super.prototype.removeAt.call(this, p_pos);
        };

        TransactionCollection.prototype.commit = function() {
            this._transQueue.commit();
        };

        TransactionCollection.prototype.rollback = function() {
            this._transQueue.rollback();
        };

        return TransactionCollection;

    }(ArrayCollection));

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.TransactionCollection = TransactionCollection;
    } else {    
        _global._L.TransactionCollection = TransactionCollection;
        _global._L.Collection.TransactionCollection = TransactionCollection;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));