/**
 * namespace _L.Collection.ArrayCollection
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    global._L               = global._L || {};
    global._L.Collection    = global._L.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)
    var Util;
    var BaseCollection;

    if (typeof module === 'object' && typeof module.exports === 'object') {     
        Util                = require('./util');
        BaseCollection      = require('./collection-base');
    } else {
        Util                = global._L.Common.Util;
        BaseCollection      = global._L.Collection.BaseCollection;
    }

    //==============================================================
    // 3. 모듈 의존성 검사
    if (typeof Util === 'undefined') throw new Error('[Util] module load fail...');
    if (typeof BaseCollection === 'undefined') throw new Error('[BaseCollection] module load fail...');

    //==============================================================
    // 4. 모듈 구현    
    var ArrayCollection  = (function (_super) {
        /**
         * 배열타입 컬렉션 클래스
         * @constructs _L.Collection.ArrayCollection
         * @extends _L.Collection.BaseCollection
         * @param {Object} p_onwer 소유객체
         */
        function ArrayCollection(p_onwer) {
            _super.call(this, p_onwer);

        }
        Util.inherits(ArrayCollection, _super);

        /**
         * 배열속성 컬렉션을 삭제한다.(내부처리) [구현]
         * @protected
         * @param {*} p_idx 인덱스 번호
         */
        ArrayCollection.prototype._remove = function(p_idx) {
            
            var count = this._element.length - 1;   // [idx] 포인트 이동
            
            this._element.splice(p_idx, 1);
            
            if (p_idx < count) {
                // 참조 변경(이동)
                for (var i = p_idx; i < count; i++) {
                    Object.defineProperty(this, [i], this._getPropDescriptor(i));
                }
                delete this[count];                      // 마지막 idx 삭제
            } else {
                delete this[p_idx];                      // idx 삭제 (끝일 경우)
            }
        };

        /**
         * 배열속성 컬렉션을 추가한다. [구현]
         * @param {*} p_value [필수] 속성값
         * @returns {boolean} 처리결과
         */
        ArrayCollection.prototype.add = function(p_value) {
            var typeName;
            var index   = -1;

            
            if (typeof p_value === 'undefined') throw new Error('p_value param request fail...');
            if (this.elementType.length > 0) Util.validType(p_value, this.elementType);
            // if (this.elementType !== null && !(p_value instanceof this.elementType)) {
            //     typeName = this.elementType.constructor.name;
            //     throw new Error('Only [' + typeName + '] type instances can be added');
            // }
            
            this._onChanging();                     // 이벤트 발생 : 변경전

            this._element.push(p_value);
            
            index = (this._element.length === 1) ? 0 : this._element.length  - 1;
            Object.defineProperty(this, [index], this._getPropDescriptor(index));

            this._onAdd(index, p_value);            // 이벤트 발생 : 등록
            this._onChanged();                      // 이벤트 발생 : 변경후

            return true;
        };

        /**
         * 배열속성 컬렉션을 전체삭제한다. [구현]
         */
        ArrayCollection.prototype.clear = function() {
            var obj;
            var isChange = false;
            
            if (this._element.length > 0) isChange = true;

            if (isChange) this._onChanging();       // 이벤트 발생 : 변경전

            for (var i = 0; i < this._element.length; i++) {
                delete this[i];
            }

            this._element = [];
        
            this._onClear();                        // 이벤트 발생 : 전체삭제
            if (isChange) this._onChanged();        // 이벤트 발생 : 변경후            
        };

        return ArrayCollection;

    }(BaseCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports = ArrayCollection;
    } else {
        global._L.ArrayCollection = ArrayCollection;
        // namespace
        global._L.Collection.ArrayCollection = ArrayCollection;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));