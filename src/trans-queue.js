/**
 * namespace _L.Collection.TransactionQueue
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Message;
    var ExtendError;
    var Util;
    var MetaObject;
    var IArrayCollection;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Collection           = _global._L.Collection || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Message                     = require('./message').Message;
        ExtendError                 = require('./extend-error').ExtendError;
        Util                        = require('./util');
        MetaObject                  = require('./meta-object').MetaObject;
        IArrayCollection            = require('./i-collection-array').IArrayCollection;
    } else {    // COVER:
        Message                     = _global._L.Message;
        ExtendError                 = _global._L.ExtendError;
        Util                        = _global._L.Util;
        MetaObject                  = _global._L.MetaObject;
        IArrayCollection            = _global._L.IArrayCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof ExtendError === 'undefined') throw new Error(Message.get('ES011', ['ExtendError', 'extend-error']));
    if (typeof Util === 'undefined') throw new Error(Message.get('ES011', ['Util', 'util']));
    if (typeof IArrayCollection === 'undefined') throw new Error(Message.get('ES011', ['IArrayCollection', 'i-collection-array']));
    if (typeof MetaObject === 'undefined') throw new Error(Message.get('ES011', ['MetaObject', 'meta-object']));

    //==============================================================
    // 4. module implementation   
    var TransactionQueue  = (function () {
        /**
         * 트랜젝션 큐
         * @constructs _L.Collection.TransactionQueue
         * @param {IArrayCollection} p_collection 배열컬렉션
         */
        function TransactionQueue(p_collection) {
            
            var queue = [];
            var collection;

            /**
             * 큐 목록
             * @readonly
             * @member {array<object>} _L.Collection.TransactionQueue#queue
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
            Object.defineProperty(this, 'collection', 
            {
                get: function() { return collection; },
                set: function(nVal) { 
                    if (!(nVal instanceof MetaObject)) {
                        throw new ExtendError(/EL04321/, null, []);
                    }
                    if (!(nVal.isImplementOf(IArrayCollection))) {
                        throw new ExtendError(/EL04322/, null, []);
                    }
                    collection = nVal;
                },
                configurable: false,
                enumerable: true
            });

            this.collection = p_collection;
        }

        TransactionQueue._NS = 'Collection';    // namespace
        TransactionQueue._PARAMS = ['_owner'];  // creator parameter

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
                } else throw new ExtendError(/EL04323/, null, [obj.cmd]);
            }
            this.init();
        };

        /**
         * 추가
         * @param {number} p_pos 
         * @param {object} p_target 
         * @param {string} p_etc 
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
        
        /**
         * 삭제
         * @param {number} p_pos 
         * @param {object} p_clone 
         * @param {string} p_etc 
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
         * @param {number} p_pos 
         * @param {object} p_target 
         * @param {object} p_clone 
         * @param {string} p_etc 
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
         * @returns {array<object>}
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
