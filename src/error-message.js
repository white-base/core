/**** base-collection.js | _L.Collection.BaseCollection ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module
    //==============================================================
    // 2. module dependency check
    //==============================================================
    // 3. module implementation
    function mergeObjects() {
        var resObj = {};
        for(var i=0; i < arguments.length; i += 1) {
             var obj = arguments[i],
                 keys = Object.keys(obj);
             for(var j=0; j < keys.length; j += 1) {
                 resObj[keys[j]] = obj[keys[j]];
             }
        }
        return resObj;
    }

    function deepCopy(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
    
        var copy = Array.isArray(obj) ? [] : {};
    
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                copy[key] = deepCopy(obj[key]);
            }
        }
    
        return copy;
    }
    

    var errorMessage = {
        en: {},
        ko: {
            ES010: '기타 오류',
            ES011: '["$1"] 모듈을 가져오는데 실패하였습니다.',
            ES012: '["$1"()] 함수를 가져오는데 실패하였습니다.',
            ES013: '[$1]는 [$2] 처리가 실패하였습니다.',
            //
            ES021: '[$1]는 [$2] 타입만 가능합니다.',
            ES022: '[$1]는 처리할 수 없는 타입니다.', 
            ES023: '[$1]는 [$2]타입이 아닙니다.',
            //
            ES031: '[$1]는 객체가 아닙니다.',
            ES032: '[$1]는 [$2]의 인스턴스가 아닙니다.',
            ES033: '[$1]의 객체가 [$2]와 다릅니다.',
            //
            ES041: '[$1]는 [$2]와 중복이 발생했습니다.',
            ES042: '[$1]에 [$2]가 존재하여 [$3]를 재거 할 수 없습니다.',
            ES043: '[$1]에 [$1]가 존재하여 [$3]를 추가 할 수 없습니다.',
            ES044: '[$1]는 예약어 입니다.',
            //
            ES051: '필수값 [$1]이 없습니다.',
            ES052: '[$1]에는 [$2]이 필요합니다.',
            ES053: '[$1]에 [$2]이 존재하지 않습니다.',
            ES054: '[$1]에 공백을 입력할 수 없습니다.',
            //
            ES061: '[$1]의 [$2] 범위를 초과하였습니다.',
            ES061: '[$1]는 [$2]보다 작을 수가 없습니다.',
            ES061: '[$1]와 [$2]의 길이가 다릅니다.',
            ES061: 'and(&&) 조건 검사에 실패하였습니다. $1',
            ES061: 'or(||) 조건 검사에 실패하였습니다. $1',
            ES061: '[$1]의 범위는 [$2]에서 [$3]까지 입니다. ',
            //
            L01100: '',
            //
            L02100: '',
            //
            L03100: '',
            //
            L04100: '',
            //
            L05100: '',

        },
        load: { core: true }
        //Core: true // Core 로딩 여부
    };

    // 샘플
    var errorMessage2 = {
        en: {},
        ko: {
            //
            L05100: '',
            L05110: '',
            L05111: '$1._entity 값이 [MetaElement] 인스턴스가 아닙니다.'
        },
        load: { core: true }
        //Core: true // Core 로딩 여부
    };
    //==============================================================
    // 4. module export
    if (isNode) exports.errorMessage = errorMessage;    // strip:

    _global._L               = _global._L || {};

    // 병합의 위치
    // var temp = mergeObjects(errorMessage, errorMessage2);

    var temp = Object.assign(errorMessage, errorMessage2);

    _global._L.ErrorMessage = errorMessage;

}(typeof window !== 'undefined' ? window : global));