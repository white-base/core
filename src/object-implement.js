/**
 * ES5
 * Object : 폴리필
 * namespace Object.prototype.isImplementOf [protected] 구현 여부
 * namespace Object.prototype._implements 인터페이스(클래스 포함) 등록 *다중상속*
 */
if ((typeof Object.prototype._implements === 'undefined') ||
    (typeof Object.prototype.isImplementOf === 'undefined')) {

    (function(global) {
        'use strict';

        /**
         * 전체 프로퍼티 조회
         * @param {object} obj Object를 제외한 프로터피 리턴
         * @param {boolean?} isObject Object를 포함여부
         * @returns {array}  
         */
        function getAllProperties(obj, isObject){
            var allProps = [], curr = obj;
            var is = isObject || false;
            do{
                var props = Object.getOwnPropertyNames(curr);
                props.forEach(function(prop) {
                    if (allProps.indexOf(prop) === -1 && (isObject 
                        || !Object.prototype.hasOwnProperty(prop)))
                        allProps.push(prop);
                })
            }while(curr = Object.getPrototypeOf(curr))
            return allProps;
        }

        /***
         * 객체의 타입 비교
         * ori 의 속성 타입별 비교 기준 (Interface 역활)
         *  - function() {} : function 타입 또는 대상의 인스턴스 (파라메티 검사 안함)
         *  - []            : array 타입
         *  - ''            : string 타입
         *  - 0, 1, 2..     : number 타입
         *  - true, false   : boolean 타입
         *  - null          : any 타입
         *  - {}            : 재귀호출 검사!
         * @param ori 원본 객체 (인터페이스 : 타입선언)
         * @param tar 비교 객체
         */
        function equalType(ori, tar, oriName){
            var typeName = '';
            var oriName = oriName ? oriName : 'this';
            var list = getAllProperties(ori);

            for(var i = 0; i < list.length; i++) {
                var key = list[i];
                
                // 통과 검사
                if (false
                    || (typeof ori[key] === 'function' && typeof tar[key] === 'function')
                    || (Array.isArray(ori[key]) && Array.isArray(tar[key]))
                    || (typeof ori[key] === 'function' && typeof tar[key] === 'object' && tar[key] instanceof ori[key])) {
                    continue;
                }
                // 타입 검사
                if (ori[key] !== null && tar[key] === null) {
                    throw new Error(' 대상 null ' + oriName + '.' + key);   // COVER:
                } else if (!(key in tar)) {
                    throw new Error(' 대상 없음 ' + oriName + '.' + key + ' : ' + typeof ori[key]);
                } else  if (Array.isArray(ori[key]) && !Array.isArray(tar[key])){
                    throw new Error(' 타입 다름 ' + oriName + '.' + key + ' : array ');
                } else if (typeof ori[key] === 'function' && typeof tar[key] === 'object' && !(tar[key] instanceof ori[key])) {
                    throw new Error( ori[key].name +' 객체 아님 '+ oriName +'.'+ key +' : class ');
                } else if (ori[key] !== null && !(typeof ori[key] === typeof tar[key])) {  /** 원본 null 비교 안함 */
                    throw new Error(' 타입 다름 ' + oriName + '.' + key + ' : ' + typeof ori[key] + ' ');
                }
                // 재귀호출
                if (typeof ori[key] === 'object' && !Array.isArray(ori[key]) && ori[key] !== null) {
                    if (equalType(ori[key], tar[key], oriName +'.'+ key) === false) return false;
                }
            }
        }
        // REVIEW:
        // function equalType(ori, tar, oriName){
        //     var typeName = '';
        //     var oriName = oriName ? oriName : 'this';
        //     var list = getAllProperties(ori);

        //     for(var i = 0; i < list.length; i++) {
        //         var key = list[i];
        //         // 대상 null 검사
        //         if (ori[key] !== null && tar[key] === null) {
        //             throw new Error(' 대상 null ' + oriName + '.' + key);   // COVER:
        //         }
        //         // 대상 여부 검사                
        //         if (!(key in tar)) {
        //             throw new Error(' 대상 없음 ' + oriName + '.' + key + ' : ' + typeof ori[key]);
        //         }
        //         // arrary 타입 검사
        //         if (Array.isArray(ori[key]) && !Array.isArray(tar[key])){
        //             throw new Error(' 타입 다름 ' + oriName + '.' + key + ' : array ');
        //         }
        //         // function 타입 검사
        //         if (typeof ori[key] === 'function' && typeof tar[key] === 'function') {
        //             continue;
        //         }
        //         // class(function) 타입 검사
        //         if (typeof ori[key] === 'function' && typeof tar[key] === 'object') {
        //             if (tar[key] instanceof ori[key]) continue;   // 통과
        //             else throw new Error( ori[key].name +' 객체 아님 '+ oriName +'.'+ key +' : class ');
        //         }
        //         // object 타입 검사
        //         if (typeof ori[key] === 'object' && !Array.isArray(ori[key]) && ori[key] !== null) {
        //             if (equalType(ori[key], tar[key], oriName +'.'+ key) === false) return false;
        //         }
        //         // stiring, number, boolean, function 타입 검사 (null 아니면서)
        //         if (ori[key] !== null && !(typeof ori[key] === typeof tar[key])) {  /** 원본 null 비교 안함 */
        //             throw new Error(' 타입 다름 ' + oriName + '.' + key + ' : ' + typeof ori[key] + ' ');
        //         }
        //     }
        // }

        /**
         * 인터페이스 객체 유무 검사
         * @function  
         * @param {function} p_imp 
         */
        var isImplementOf = function(p_imp) {
            for (var i = 0; i < this._interface.length; i++) {
                if (this._interface[i] === p_imp) return true;  
            }
            return false; // COVER:
        };    

        /**
         * 등록된 인터페이스의 prototype과 프로퍼티는 구현되어야 함
         * 인터페이스(클래스) 등록
         * @protected
         * @function 
         * @param {function} args 함수형 인터페이스 목록
         */
        var _implements = function _implements(args) {
            var typeName;
            var obj;    
            var _interface = [];

            Object.defineProperty(this, '_interface', {
                enumerable: false,
                configurable: true,
                get: function() { 
                    return _interface;
                }
            });
        
            for(var i = 0; i < arguments.length; i++) {
                if (typeof arguments[i] === 'function') {
                    // 중복 제거
                    if (this._interface.indexOf(arguments[i]) < 0) {
                        this._interface.push(arguments[i]);
                        this._interface[arguments[i].name] = arguments[i];    // 프로퍼티 접근자
                    }
                } else throw new Error('함수타입만 가능합니다.');   // COVER:
                // 비교 원본 인터페이스 임시 객체 생성    
                obj = new arguments[i];
        
                // 객체 타입을 비교 (값은 비교 안함, 타입만 비교함)
                equalType(obj, this);
            }
        };

        //==============================================================
        // wrtie polyfill
		Object.defineProperty(Object.prototype, '_implements',
	    {
	        value: _implements,
	        enumerable: false
	    });
	    Object.defineProperty(Object.prototype, 'isImplementOf',
	    {
	        value: isImplementOf,
	        enumerable: false
        });
        
    }(typeof module === 'object' && typeof module.exports === 'object' ? global : window));
}