/**
 * namespace _L.Meta.Entity.TransactionQueue
 * namespace _L.Meta.Entity.TransactionQueueCollection
 */
// var $local = {};

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    // var MetaObject;
    // var MetaElement;
    var IBaseCollection;

    //==============================================================
    // 1. namespace declaration
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};    
    // _global._L.Collection    = _global._L.Collection || {};
    _global._L.Interface     = _global._L.Interface || {};    
    // _global._L.Meta          = _global._L.Meta || {};
    // _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. import module
    if (isNode) {     
        Util                        = require('./util');
        // MetaObject                  = require('./meta-object').MetaObject;
        // MetaElement                 = require('./meta-element');
        IBaseCollection             = require('./i-collection-base').IBaseCollection;
    } else {    // COVER:
        Util                        = _global._L.Common.Util;
        // MetaObject                  = _global._L.Meta.MetaObject;
        // MetaElement                 = _global._L.Collection.MetaElement;
        IBaseCollection             = _global._L.Interface.IBaseCollection;
    }

    //==============================================================
    // 3. module dependency check
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    // if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    // if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof IBaseCollection === 'undefined') throw new Error('[IBaseCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var TransactionQueue  = (function () {
        /**
         * 로우
         * @constructs _L.Meta.Entity.TransactionQueue
         * @extends _L.Collection.MetaElement     // REVIEW: 상속위치를 바꿔야함
         * @param {MetaEntity} p_entity 메타엔티티
         */
        function TransactionQueue(p_collection) {
            // _super.call(this);

            var queue = [];
            var collection;

            /**
             * 로우의 소유 엔티티
             * @member {MetaEntity} _L.Meta.Entity.TransactionQueue#queue
             */
            Object.defineProperty(this, 'queue', 
            {
                get: function() { return queue; },
                configurable: false,
                enumerable: true
            });
            
            /**
             * 컬랙션 갯수 
             * @member {Number} _L.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'collection', {
                get: function() {
                    return collection;
                },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    // TODO: ArrayCollection 으로 변경 요망! -> 원래대로..
                    if (!(newValue.isImplementOf(IBaseCollection))) {
                        throw new Error('IBaseCollection 인터페이스를 구현한 컬렉션이 아닙니다.');
                    }
                    collection = newValue;
                },
                configurable: false,
                enumerable: true
            });

            // 설정
            this.collection = p_collection;
        }

        TransactionQueue.prototype.init  = function() {
            this.queue.length = 0;
        };

        TransactionQueue.prototype.commit  = function() {
            this.init();
        };

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
        TransactionQueue.prototype.delete  = function(p_pos, p_clone, p_etc) {
            this.queue.push({
                cmd: 'D',
                pos: p_pos,
                ref: null,
                clone: p_clone,
                etc: p_etc || ''
            });
        };

        TransactionQueue.prototype.update  = function(p_pos, p_target, p_clone, p_etc) {
            this.queue.push({
                cmd: 'U',
                pos: p_pos,
                ref: p_target,
                clone: p_clone,
                etc: p_etc || ''
            });
        };
        
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
        // namespace
        _global._L.Collection.TransactionQueue = TransactionQueue;
    }

}(typeof window !== 'undefined' ? window : global));
