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
    if (typeof ArrayCollection === 'undefined') Message.error('ES011', ['ArrayCollection', 'i-collection-array']);
    if (typeof TransactionQueue === 'undefined') Message.error('ES011', ['TransactionQueue', 'trans-queue']);

    //==============================================================
    // 4. module implementation
    var TransactionCollection  = (function (_super) {
        /**
         * 트랜젝션 컬렉션 클래스
         * @constructs _L.Collection.TransactionCollection
         * @extends _L.Collection.ArrayCollection
         * @param {object} p_owner 소유객체
         */
        function TransactionCollection(p_owner) {
            _super.call(this, p_owner);

            var _transQueue = new TransactionQueue(this);
            var autoChanges = false;

            /**
             * 트렌젝션 큐
             * @member {TransactionCollection} _L.Collection.TransactionQueue#_transQueue
             */
            Object.defineProperty(this, '_transQueue',
            {
                get: function() { return _transQueue; },
                configurable: false,
                enumerable: false
            });

            /**
             * 자동 변경 유무 (기본값: 사용 false)
             * @member {boolean} _L.Collection.TransactionQueue#autoChanges
             */
            Object.defineProperty(this, 'autoChanges', 
            {
                get: function() { return autoChanges; },
                set: function(nVal) { 
                    if (typeof nVal !== 'boolean') {
                        Message.error('ES021', ['autoChanges', 'boolean']);
                    }
                    autoChanges = nVal;
                },
                configurable: false,
                enumerable: false
            });

            /**
             * 변경 유무
             * @member {TransactionCollection} _L.Collection.TransactionQueue#hasChanges
             */
            Object.defineProperty(this, 'hasChanges',
            {
                get: function() { return _transQueue.queue.length > 0; },
                configurable: false,
                enumerable: false
            });

        }
        Util.inherits(TransactionCollection, _super);

        TransactionCollection._NS = 'Collection';      // namespace
        TransactionCollection._PARAMS = ['_owner'];    // creator parameter

        /**
         * 트랜젝션 컬렉션 프로퍼티 기술자 
         * @protected
         * @param {number} p_idx 인덱스
         */
        TransactionCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._elements[p_idx]; },
                set: function(nVal) {
                    if (this._elemTypes.length > 0) Util.validType(nVal, this._elemTypes);
                    this._transQueue.update(p_idx, nVal, this._elements[p_idx]); 
                    this.__GET$_elements(this)[p_idx] = nVal;
                },
                configurable: true,
                enumerable: true,
            };
        };

        /**
         * guid 객체 얻기
         * @virtual
         * @param {number} p_vOpt 레벨 옵션
         * @param {(object | array<object>)?} p_owned 소유한 객체
         * @returns {object}
         */
        TransactionCollection.prototype.getObject = function(p_vOpt, p_owned) {
            var obj = _super.prototype.getObject.call(this, p_vOpt, p_owned);
            var vOpt = p_vOpt || 0;
            // var origin = p_origin ? p_origin : obj;
            var owned = p_owned ? [].concat(p_owned, obj) : [].concat(obj);

            if (this.autoChanges !== false) obj.autoChanges = this.autoChanges;
            return obj;                        
        };

        /**
         * guid 객체 설정
         * @virtual
         * @param {object} p_oGuid 레벨 옵션
         * @param {object} p_origin 설정 원본 객체
         */
        TransactionCollection.prototype.setObject  = function(p_oGuid, p_origin) {
            _super.prototype.setObject.call(this, p_oGuid, p_origin);
            this._transQueue.init();
            if (p_oGuid.autoChanges) this.autoChanges = p_oGuid.autoChanges;
        };

        /**
         * 지정 위치에 요소 삭제
         * @override
         * @param {number} p_pos 
         * @returns {boolean}
         */
        TransactionCollection.prototype.removeAt = function(p_pos) {
            if (!this.autoChanges) this._transQueue.delete(p_pos, this[p_pos]);
            return _super.prototype.removeAt.call(this, p_pos);
        };

        /**
         * 전체 초기화
         * @override
         */
        TransactionCollection.prototype.clear = function() {
            _super.prototype.clear.call(this);
            this._transQueue.init();
        };

        /**
         * 지정 위치에 요소 추가
         * @override
         * @param {number} p_pos 
         * @param {any} p_value 
         * @param {object} p_desc 
         * @returns {boolean}
         */
        TransactionCollection.prototype.insertAt = function(p_pos, p_value, p_desc) {
            if (!this.autoChanges) this._transQueue.insert(p_pos, p_value);
            return _super.prototype.insertAt.call(this, p_pos, p_value, p_desc);
        };

        /**
         * 변경사항 반영
         */
        TransactionCollection.prototype.commit = function() {
            this._transQueue.commit();
        };

        /**
         * 변경사항 이전으로 복귀
         */
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