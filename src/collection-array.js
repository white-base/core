/**
 * namespace _L.Collection.ArrayCollection
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    var Util;
    var BaseCollection;

    //==============================================================
    // 1. 모듈 네임스페이스 선언
    _global._L               = _global._L || {};
    _global._L.Common        = _global._L.Common || {};
    _global._L.Collection    = _global._L.Collection || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | window)
    if (isNode) {     
        Util                = require('./util');
        BaseCollection      = require('./collection-base');
    } else {    
        Util                = _global._L.Common.Util;
        BaseCollection      = _global._L.Collection.BaseCollection;
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
         * @param {Object} p_owner 소유객체
         */
        function ArrayCollection(p_owner) {
            _super.call(this, p_owner);

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
        ArrayCollection.prototype.add = function(p_value, p_desc) {
            // var typeName;
            var index   = this._element.length;
            
            // if (typeof p_value === 'undefined') throw new Error('p_value param request fail...');
            if (this.elementType.length > 0) Util.validType(p_value, this.elementType);
            // index = this._element.length;
            // before event
            this._onChanging();
            this._onAdd(index, p_value);
            // process
            this._element.push(p_value);
            if (typeof p_desc === 'object') {
                Object.defineProperty(this, [index], p_desc);
            } else {
                Object.defineProperty(this, [index], this._getPropDescriptor(index));
            }
            // after event
            this._onChanged();
            return true;
        };

        /**
         * 배열속성 컬렉션을 전체삭제한다. [구현]
         */
        ArrayCollection.prototype.clear = function() {
            // before evnet
            this._onChanging();
            // process
            for (var i = 0; i < this._element.length; i++) delete this[i];
            this._element = [];
            // after event
            this._onClear();
            this._onChanged();
        };

        return ArrayCollection;

    }(BaseCollection));

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (isNode) {     
        module.exports = ArrayCollection;
    } else {    
        _global._L.ArrayCollection = ArrayCollection;
        _global._L.Collection.ArrayCollection = ArrayCollection;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));