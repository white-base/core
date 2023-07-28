/**
 * namespace _L.Meta.Entity.MetaRow
 * namespace _L.Meta.Entity.MetaRowCollection
 */
// var $local = {};

(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var MetaObject;
    // var MetaElement;
    var TransactionCollection;
    var Observer;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};    
    _global._L.Collection    = _global._L.Collection || {};
    _global._L.Meta          = _global._L.Meta || {};
    _global._L.Meta.Entity   = _global._L.Meta.Entity || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                        = require('./util');
        Observer            = require('./observer').Observer;
        MetaObject                  = require('./meta-object').MetaObject;
        // MetaElement                 = require('./meta-element');
        TransactionCollection             = require('./collection-trans').TransactionCollection;
    } else {    // COVER:
        Util                        = _global._L.Common.Util;
        Observer            = _global._L.Common.Observer;
        MetaObject                  = _global._L.Meta.MetaObject;
        // MetaElement                 = _global._L.Collection.MetaElement;
        TransactionCollection             = _global._L.Collection.TransactionCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof Observer === 'undefined') throw new Error('[Observer] module load fail...');
    if (typeof MetaObject === 'undefined') throw new Error('[MetaObject] module load fail...');
    // if (typeof MetaElement === 'undefined') throw new Error('[MetaElement] module load fail...');
    if (typeof TransactionCollection === 'undefined') throw new Error('[TransactionCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var MetaRow  = (function (_super) {
        /**
         * 로우
         * @constructs _L.Meta.Entity.MetaRow
         * @extends _L.Collection.MetaElement     // REVIEW: 상속위치를 바꿔야함
         * @param {MetaEntity?} p_entity 메타엔티티
         */
        function MetaRow(p_entity) {
            _super.call(this);
            
            var __element = [];
            var _this   = this;
            var _event  = new Observer(this);
            var entity  = null;

            // MetaEntity 등록 & order(순서) 값 계산
            if (!(p_entity instanceof MetaObject && p_entity.instanceOf('MetaEntity'))) {
                throw new Error('Only [p_entity] type "MetaEntity" can be added');
            }

            /** 
             * 이벤트 객체
             * @protected 
             * @member {Object} _L.Meta.Entity.MetaRow#_event  
             */
            Object.defineProperty(this, '_event', {
                get: function() { return _event; },
                enumerable: false,
                configurable: false,
            });        

            /**
             * 로우의 소유 엔티티
             * @member {MetaEntity} _L.Meta.Entity.MetaRow#entity
             */
            Object.defineProperty(this, 'entity', 
            {
                get: function() { return entity; },
                set: function(newValue) { 
                    // TODO:: 자료종류를 검사해야함
                    if (newValue && !(newValue instanceof MetaObject && newValue.instanceOf('MetaEntity'))) {
                        throw new Error('Only [entity] type "MetaEntity" can be added');    // COVER:
                    }
                    entity = newValue;
                },
                configurable: false,
                enumerable: true
            });
            
            /**
             * 컬랙션 갯수 
             * @member {Number} _L.Collection.BaseCollection#count 
             */
            Object.defineProperty(this, 'count', {
                get: function() {
                    return __element.length;
                },
                configurable: false,
                enumerable: false
            });

            /**
             * 변경전 이벤트 
             * @event _L.Meta.Entity.MetaRow#onChanged 
             */
            Object.defineProperty(this, 'onChanging', {
                set: function(p_fn) {
                    this._event.subscribe(p_fn, 'onChanging');
                },
                enumerable: true,
                configurable: true,
            });
            
            /**
             * 변경후 이벤트 
             * @event _L.Meta.Entity.MetaRow#onChanged 
             */
            Object.defineProperty(this, 'onChanged', {
                set: function(p_fn) {
                    this._event.subscribe(p_fn, 'onChanged');
                },
                enumerable: true,
                configurable: true,
            });
            

            // 설정
            if (p_entity) {
                this.entity = p_entity;

                for (var i = 0; i < entity.columns.count; i++) {
                    var idx = __element.length;
                    __element.push(entity.columns[i].default);  // 기본값 등록
                    Object.defineProperty(this, [i], getPropDescriptor(idx));
                    Object.defineProperty(this, entity.columns[i].alias, getPropDescriptor(idx));
                }
            }

            function getPropDescriptor(p_idx) {
                return {
                    get: function() { return __element[p_idx]; },
                    set: function(newValue) { 
                        var oldValue = __element[p_idx];
                        _this._onChanging(p_idx, newValue, oldValue);
                        __element[p_idx] = newValue;
                        _this._onChanged(p_idx, newValue, oldValue);
                    },
                    enumerable: false,
                    configurable: false
                };
            }
        }
        Util.inherits(MetaRow, _super);

        /**
         * @listens _L.Meta.Entity.MetaColumn#_onChanged
         */
        MetaRow.prototype._onChanging = function(p_idx, p_nValue, p_oValue) {
            this._event.publish('onChanging', p_idx, p_nValue, p_oValue);
        };

        /**
         * @listens _L.Meta.Entity.MetaColumn#_onChanged
         */
        MetaRow.prototype._onChanged = function(p_idx, p_nValue, p_oValue) {
            this._event.publish('onChanged', p_idx, p_nValue, p_oValue);
        };

        // /** @override **/
        // MetaRow.prototype.getTypes  = function() {
        //     var type = ['MetaRow'];
            
        //     return type.concat(typeof _super !== 'undefined' && _super.prototype && _super.prototype.getTypes ? _super.prototype.getTypes() : []);
        // };

        /**
         * 로우를 복사한다. (생성 후 복제)
         * @param {Object} p_filter 필터객체
         */
        // MetaRow.prototype.copy = function(p_filter) {   // COVER:  >> 불필요 할듯
        //     var clone = new MetaRow(this.entity);
            
        //     if (this.value) clone['value'] = this.value;
        // };

       /**
         * 로우를 복제한다.
         * @param {MetaEntity?} p_entity 대상의 엔티티
         * @returns 
         */
        MetaRow.prototype.clone  = function(p_entity) {
            var entity = p_entity || this.entity;
            var clone = new MetaRow(entity);

            for (var i = 0; i < this.count; i++) {
                clone[i] = this[i];
            }
            return clone;
        };
        // MetaRow.prototype.clone  = function() {
        //     var clone = new MetaRow(this.entity);

        //     for (var i = 0; i < this.count; i++) {
        //         clone[i] = this[i];
        //     }
        //     return clone;
        // };
        
        MetaRow.prototype.acceptChanges  = function() {
            console.log('구현해야함');  // COVER:
        };

        MetaRow.prototype.rejectChanges  = function() {
            console.log('구현해야함');  // COVER:
        };

        return MetaRow;
    
    }(MetaObject));
    
    //---------------------------------------
    var MetaRowCollection  = (function (_super) {
        /**
         * 로우 컬렉션
         * @constructs _L.Meta.Entity.MetaRowCollection
         * @extends _L.Collection.TransactionCollection
         * @param {*} p_owner 소유자 
         */
        function MetaRowCollection(p_owner) {
            _super.call(this, p_owner);

            this.elementType = MetaRow;   // 컬렉션타입 설정
            this.autoChanges = true;    // 트랜젝션 기본 해제 해제입니다.
        }
        Util.inherits(MetaRowCollection, _super);

        /**
         * 프로퍼티 기술자 설정
         * @override
         * @protected
         * @param {Number} p_idx 인덱스
         */
        MetaRowCollection.prototype._getPropDescriptor = function(p_idx) {
            return {
                get: function() { return this._element[p_idx]; },
                set: function(newValue) {
                    var typeName;
                    if (this.elementType.length > 0) Util.validType(newValue, this.elementType);
                    if (newValue.entity !== this._owner) throw new Error('entity 가 서로 다릅니다.');
                    this._transQueue.update(p_idx, newValue, this._element[p_idx]); 
                    this._element[p_idx] = newValue;
                },
                enumerable: true,
                configurable: true
            };
        };

        /**
         * 로우컬렉션에 로우를 추가한다.
         * @param {String | MetaColumn} p_row 
         * @returns {MetaRow} 등록한 로우
         */
        // MetaRowCollection.prototype.add  = function(p_row) {
        //     var i_value;

        //     if (typeof p_row === 'undefined') {      // REVIEW: 필요한가?
        //         i_value = new MetaRow(this._owner);
        //     } else if (p_row instanceof MetaRow) {
        //         i_value = p_row;
        //     } else {
        //         throw new Error('MetaRow | MetaRow object [p_row].');   // COVER:
        //     }

        //     return _super.prototype.add.call(this, i_value);
        // };


        /**
         * MetaRow 추가 idx 를 기준으로 검사한다.
         * @param {MetaRow} p_row 
         * @param {object} p_checkValid true: 검사 진행, false <*>: 검사 안함
         * @returns 
         */
        MetaRowCollection.prototype.add  = function(p_row, p_checkValid) {
            // var checkValid = p_checkValid || false;
            // var r_result = {};
            // var entity = p_row.entity;

            // if (!(p_row instanceof MetaRow )) throw new Error('MetaRow | MetaRow object [p_row].');   // COVER:
            // if (entity !== this._owner) throw new Error('[p_row] MetaRow 의 entity 가 다릅니다.');   // COVER:            
            
            // // valid 검사
            // if (checkValid === true) {
            //     for (let i = 0; i < p_row.count; i++) {
            //         if(entity.columns[i].valid(p_row[i], r_result) !== true) {
            //             throw new Error('[p_row] valid check Error.' + r_result.msg);
            //         }
            //     }
            // }
            
            // return _super.prototype.add.call(this, p_row);
            return this.insertAt(this._element.length, p_row, p_checkValid);

        };

        MetaRowCollection.prototype.insertAt  = function(p_pos, p_row, p_checkValid) {
            var _this = this;
            var checkValid = p_checkValid || false;
            var r_result = {};
            var entity = p_row.entity;


            if (!(p_row instanceof MetaRow )) throw new Error('MetaRow | MetaRow object [p_row].');   // COVER:
            if (entity !== this._owner) throw new Error('[p_row] MetaRow 의 entity 가 다릅니다.');   // COVER:            
            
            // valid 검사
            if (checkValid === true) {
                for (let i = 0; i < p_row.count; i++) {
                    if(entity.columns[i].valid(p_row[i], r_result) !== true) {
                        throw new Error('[p_row] valid check Error.' + r_result.msg);
                    }
                }
            }
            // 이벤트 등록
            var clone;
            p_row.onChanging = function(p_idx, p_nValue, p_oValue) {
                if(!_this.autoChanges) { clone = _this[p_pos].clone(); }
            };
            // 이벤트 등록
            p_row.onChanged = function(p_idx, p_nValue, p_oValue) {
                var etc = 'idx:'+ p_idx +', new:' + p_nValue + ', old:'+ p_oValue;
                if(!_this.autoChanges) {
                    _this._transQueue.update(p_pos, _this[p_pos], clone, etc);
                }
            };

            return _super.prototype.insertAt.call(this, p_pos, p_row);
        };

        // MetaRowCollection.prototype.getChanges  = function() {
        //     return this._transQueue.select();
        // };

        return MetaRowCollection;
        
    }(TransactionCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        exports.MetaRow = MetaRow;
        exports.MetaRowCollection = MetaRowCollection;
    } else {
        _global._L.MetaRow = MetaRow;
        _global._L.MetaRowCollection = MetaRowCollection;
        // namespace
        _global._L.Meta.Entity.MetaRow = MetaRow;
        _global._L.Meta.Entity.MetaRowCollection = MetaRowCollection;
    }

}(typeof window !== 'undefined' ? window : global));
