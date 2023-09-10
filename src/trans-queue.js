/**
 * namespace _L.Collection.TransactionQueue
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var Util;
    var IBaseCollection;

    //==============================================================
    // 1. namespace declaration
    _global._L                  = _global._L || {};
    _global._L.Collection       = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                 = require('./message').Message;
        Util                    = require('./util');
        IBaseCollection         = require('./i-collection-base').IBaseCollection;
    } else {    // COVER:
        Message                 = _global._L.Message;
        Util                    = _global._L.Util;
        IBaseCollection         = _global._L.IBaseCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') Message.error('ES011', ['Util', 'util']);
    if (typeof IBaseCollection === 'undefined') Message.error('ES011', ['IBaseCollection', 'i-collection-base']);

    //==============================================================
    // 4. module implementation   
    var TransactionQueue  = (function () {
        /**
         * 로우
         * @constructs _L.Collection.TransactionQueue
         * @param {MetaEntity} p_entity 메타엔티티
         */
        function TransactionQueue(p_collection) {
            
            var queue = [];
            var collection;

            /**
             * 로우의 소유 엔티티
             * @member {MetaEntity} _L.Collection.TransactionQueue#queue
             */
            Object.defineProperty(this, 'queue', 
            {
                get: function() { return queue; },
                configurable: false,
                enumerable: true
            });
            
            /**
             * 컬랙션 갯수 
             * @member {Number} _L.Collection.TransactionQueue#count 
             */
            Object.defineProperty(this, 'collection', {
                get: function() {
                    return collection;
                },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    // TODO: ArrayCollection 으로 변경 요망! -> 원래대로..
                    if (!(newValue.isImplementOf(IBaseCollection))) {
                        Message.error('ES033', ['collection', 'IBaseCollection']);
                    }
                    collection = newValue;
                },
                configurable: false,
                enumerable: true
            });

            // 설정
            this.collection = p_collection;
        }

        TransactionQueue._NS = 'Collection';    // namespace

        /**
         * 초기화
         */
        TransactionQueue.prototype.init  = function() {
            this.queue.length = 0;
        };

        /**
         * 커밋
         */
        TransactionQueue.prototype.commit  = function() {
            this.init();
        };

        /**
         * 롤백
         */
        TransactionQueue.prototype.rollback  = function() {
            var pos, obj;
            
            for (var i = this.queue.length - 1; i >= 0; i--) {
                obj = this.queue[i];
                if(obj.cmd === 'I') {
                    // pos = this.collection.indexOf(obj.ref);
                    pos = obj.pos;
                    this.collection.removeAt(pos);
                } else if(obj.cmd === 'D') {
                    pos = obj.pos;
                    this.collection.insertAt(pos, obj.clone);
                } else if(obj.cmd === 'U') {
                    // pos = this.collection.indexOf(obj.ref);
                    pos = obj.pos;
                    this.collection.removeAt(pos);
                    this.collection.insertAt(pos, obj.clone);
                }
            }
            this.init();
        };

        /**
         * 추가
         * @param {*} p_pos 
         * @param {*} p_target 
         * @param {*} p_etc 
         */
        TransactionQueue.prototype.insert  = function(p_pos, p_target, p_etc) {
            this.queue.push({
                cmd: 'I',
                pos: p_pos,
                ref: p_target,
                clone: null,
                etc: p_etc || ''
            });
        };

        // TODO: p_target 을 파라메터로 받아야 적합할듯
        /**
         * 삭제
         * @param {*} p_pos 
         * @param {*} p_clone 
         * @param {*} p_etc 
         */
        TransactionQueue.prototype.delete  = function(p_pos, p_clone, p_etc) {
            this.queue.push({
                cmd: 'D',
                pos: p_pos,
                ref: null,
                clone: p_clone,
                etc: p_etc || ''
            });
        };

        /**
         * 수정
         * @param {*} p_pos 
         * @param {*} p_target 
         * @param {*} p_clone 
         * @param {*} p_etc 
         */
        TransactionQueue.prototype.update  = function(p_pos, p_target, p_clone, p_etc) {
            this.queue.push({
                cmd: 'U',
                pos: p_pos,
                ref: p_target,
                clone: p_clone,
                etc: p_etc || ''
            });
        };
        
        /**
         * 변경 내역 조회
         * @returns 
         */
        TransactionQueue.prototype.select  = function() {
            return this.queue;
        };

        return TransactionQueue;
    
    }());
    
    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.TransactionQueue = TransactionQueue;
    } else {
        _global._L.TransactionQueue = TransactionQueue;
        _global._L.Collection.TransactionQueue = TransactionQueue;  // namespace
    }

}(typeof window !== 'undefined' ? window : global));
