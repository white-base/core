/**
 * namespace _L.Collection.TransactionCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var ArrayCollection;
    var TransactionQueue;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        Util                        = require('./util');
        ArrayCollection             = require('./collection-array').ArrayCollection;
        TransactionQueue            = require('./trans-queue').TransactionQueue;
    } else {    
        Message                     = _global._L.Message;
        Util                        = _global._L.Util;
        ArrayCollection             = _global._L.ArrayCollection;
        TransactionQueue            = _global._L.TransactionQueue;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof ArrayCollection === 'undefined') Message.error('ES011', ['ArrayCollection', 'collection-array']);
    if (typeof TransactionQueue === 'undefined') Message.error('ES011', ['TransactionQueue', 'trans-queue']);

    //==============================================================
    // 4. module implementation
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
                        Message.error('ES021', ['autoChanges', 'boolean']);
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

        TransactionCollection._NS = 'Collection';      // namespace
        TransactionCollection._PARAMS = ['_owner'];    // creator parameter
        
        /**
         * 객체 비교
         * @virtual
         * @param {object} p_target 대상 MetaObject
         * @returns {boolean}
         */
        // TransactionCollection.prototype.equal = function(p_target) {
        //     if (!_super.prototype.equal.call(this, p_target)) return false;
            
        //     if (!this._compare(this._transQueue.queue, p_target._transQueue.queue)) return false;
        //     if (this.autoChanges !== p_target.autoChanges) return false;
        //     return true;
        // };

        /**
         * 메타 객체를 얻는다
         * @virtual
         * @returns {object}
         */
        TransactionCollection.prototype.getObject = function(p_vOpt) {
            var obj = _super.prototype.getObject.call(this, p_vOpt);
            if (this.autoChanges !== false) obj.autoChanges = this.autoChanges;
            return obj;                        
        };

        /**
         * TODO: setObject 시점에 초기화 해야함
         * 메타 객체를 설정한다
         * @virtual
         * @returns {object}
         */
        TransactionCollection.prototype.setObject  = function(mObj, oObj) {
            _super.prototype.setObject.call(this, mObj, oObj);
            if (mObj.autoChanges) this.autoChanges = mObj.autoChanges;
        };

        TransactionCollection.prototype.removeAt = function(p_pos) {
            if (!this.autoChanges) this._transQueue.delete(p_pos, this[p_pos]);
            return _super.prototype.removeAt.call(this, p_pos);
        };

        TransactionCollection.prototype.clear = function() {
            _super.prototype.clear.call(this);
            this._transQueue.init();
        };

        TransactionCollection.prototype.insertAt = function(p_pos, p_value, p_desc) {
            if (!this.autoChanges) this._transQueue.insert(p_pos, p_value);
            return _super.prototype.insertAt.call(this, p_pos, p_value, p_desc);
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