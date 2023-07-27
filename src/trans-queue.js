/**
 * namespace _L.Meta.Entity.TransactionQueue
 * namespace _L.Meta.Entity.TransactionQueueCollection
 */
// var $local = {};

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaObject;
    // var MetaElement;
    var ArrayCollection;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};    
    _global._L.Collection    = _global._L.Collection || {};
    // _global._L.Meta          = _global._L.Meta || {};
    // _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                        = require('./util');
        // MetaObject                  = require('./meta-object').MetaObject;
        // MetaElement                 = require('./meta-element');
        ArrayCollection             = require('./collection-array').ArrayCollection;
    } else {    // COVER:
        Util                        = _global._L.Common.Util;
        // MetaObject                  = _global._L.Meta.MetaObject;
        // MetaElement                 = _global._L.Collection.MetaElement;
        ArrayCollection             = _global._L.Collection.ArrayCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    // if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    // if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof ArrayCollection === 'undefined') throw new Error('[ArrayCollection] module load fail...');

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
                    if (!(newValue instanceof ArrayCollection)) {
                        throw new Error('Only [p_collection] type "ArrayCollection" can be added');
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
                    // pos = this.collection.indexOf(obj.ori);
                    pos = obj.pos;
                    this.collection.removeAt(pos);
                } else if(obj.cmd === 'D') {
                    pos = obj.pos;
                    this.collection.insertAt(pos, obj.clone);
                } else if(obj.cmd === 'U') {
                    // pos = this.collection.indexOf(obj.ori);
                    pos = obj.pos;
                    this.collection.removeAt(pos);
                    this.collection.insertAt(pos, obj.clone);
                }
            }
        };
        
        TransactionQueue.prototype.insert  = function(p_target, p_pos) {
            this.queue.push({
                cmd: 'I',
                pos: p_pos,
                ori: p_target,
                clone: null
            });
        };

        TransactionQueue.prototype.delete  = function(p_pos) {
            this.queue.push({
                cmd: 'D',
                pos: p_pos,
                ori: null,
                clone: this.collection[p_pos]
            });
        };

        TransactionQueue.prototype.update  = function(p_target, p_pos) {
            this.queue.push({
                cmd: 'D',
                pos: p_pos,
                ori: p_target,
                clone: this.collection[p_pos]
            });
        };
        
        TransactionQueue.prototype.select  = function() {
            console.log('구현해야함');  // COVER:
        };

        return TransactionQueue;
    
    }());
    
    

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        exports.TransactionQueue = TransactionQueue;
    } else {
        _global._L.TransactionQueue = TransactionQueue;
        // namespace
        _global._L.Collection.TransactionQueue = TransactionQueue;
    }

}(typeof window !== 'undefined' ? window : global));
