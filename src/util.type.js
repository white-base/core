/**
 * namespace _L.Common.Util
 */
(function(global) {
    'use strict';

    //==============================================================
    // 1. 의존 모듈 선언
    global._L               = global._L || {};
    global._L.Common        = global._L.Common || {};
    global._L.Common.Util   = global._L.Common.Util || {};

    //==============================================================
    // 2. 모듈 가져오기 (node | web)

    //==============================================================
    // 3. 의존성 검사

    //==============================================================
    // 4. 모듈 구현  
    
    /**
     * 전체 프로퍼티 조회
     * @param {object} obj Object를 제외한 프로터피 리턴
     * @param {boolean?} isObject Object를 포함 여부
     * @returns {array}  
     */
        var getAllProperties = function(obj, isObject) {
            var allProps = [], curr = obj;
            var is = isObject || false;
    
            do{
                var props = Object.getOwnPropertyNames(curr);
                props.forEach(function(prop) {
                    if (allProps.indexOf(prop) === -1 && (is || !Object.prototype.hasOwnProperty(prop)))
                        allProps.push(prop);
                });
            }while(curr = Object.getPrototypeOf(curr))
            return allProps;
        }

    var validType = function(type, target, parentName) {
        var parentName = parentName ? parentName : 'this';
        var obj, typeName;
        var typeObj = { type:'', default: null };
        
        var innerType
        
        // [] 여부시 OR 조건 재귀검사
        if (Array.isArray(type)) {
            for(var i = 0; i < type.length; i++) {
                if (validType(type[i]) === true) return true;
            }
            return false;
        }
        /**
         * 타입을 걸러내고
         */
        if (type === null) 
            typeObj.type = 'null';
        else if (typeof type !== 'function' && typeof type !== 'object') 
            typeObj = {type: typeof type, default: type };
        else if (typeof type === 'function' && (type === Number || type === String || type === Boolean || type === Object)) 
            typeObj = {type: typeof type() };
        else if (type === Array) typeObj = {type: 'array'};
        else if (typeof type === 'function') typeObj = {type: 'function'};
        else throw new Error('조건에 맞는 type 이 없습니다.');
        // else if (typeof type === 'object')
        // else if (typeof type === 'function' && ())

        // else if (typeof type !== 'object' ) typeName = typeof type;

        // String 과 '' 의 구분

        if (typeof type === 'function') obj = new type();
        
        var list = getAllProperties(type)

        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            
        }
        
    
    };



    // OR 조건
    var checkType = function(target, types) {
        try {
            var arr = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
            for(var i = 0; i < arr.length; i++) {
                if(validType(target, arr[i]) === true) return true;
            }
        } catch (e) {
            console.error('CheckTypeAll() 에서 오류가 발생했습니다.');
            console.error(e);
            return false;
        }
        return false;
    };

    // AND 조건
    var checkTypeAll = function(target, types) {
        try {
            var arr = Array.isArray(types) ? types : Array.prototype.slice.call(arguments, 1);
            for(var i = 0; i < arr.length; i++) {
                if (validType(target, arr[i]) === false) return false;
            }
        } catch (e) {
            console.error('CheckTypeAll() 에서 오류가 발생했습니다.');
            console.error(e);
            return false;
        }
        return true;
    };

    //==============================================================
    // 5. 모듈 내보내기 (node | web)
    if (typeof module === 'object' && typeof module.exports === 'object') {     
        module.exports.inherits = inherits;
        module.exports.getArrayDepth = getArrayDepth;
        module.exports.createGUID = createGUID;
        // module.exports.validSelector = validSelector;   // node 에서는 테스트 불가능!
        module.exports.getAllProperties = getAllProperties;
        module.exports.equalType = equalType;
        module.exports.implements = implement;
    } else {    // COVER:
        global._L.Common.Util.inherits = inherits;
        global._L.Common.Util.getArrayDepth = getArrayDepth;
        global._L.Common.Util.createGUID = createGUID;
        // global._L.Common.Util.validSelector = validSelector;
        global._L.Common.Util.getAllProperties = getAllProperties;
        global._L.Common.Util.equalType = equalType;
        global._L.Common.Util.implements = implement;
    }

}(typeof module === 'object' && typeof module.exports === 'object' ? global : window));