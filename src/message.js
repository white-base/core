/**
 * namespace _L.Common
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    // var MetaObject;
    var NamespaceManager;

    //==============================================================
    // 1. namespace declaration
    _global._L              = _global._L || {};
    _global._L.Common       = _global._L.Common || {};

    //==============================================================
    // 2. import module
    // if (isNode) {     
    //     NamespaceManager            = require('./namespace-manager').NamespaceManager;
    // } else {
    //     NamespaceManager            = _global._L.NamespaceManager;
    // }

    //==============================================================Á
    // 3. module dependency check
    // if (typeof NamespaceManager === 'undefined') throw new Error('[NamespaceManager] module load fail...');

    //==============================================================
    // 4. module implementation       
    var Message = (function () {
        /**
         * 메타 등록소
        */
       function Message() { 
        }

        Message._NS = 'Common';    // namespace

        // var define
        /**
         * 객체 레벨
         * 1. 오류 종류
         * 2. 오류 구분코드
         * 3. 순번
         */
        var msg_eng = {
            E: {    // Error
                S01: {  // 구분 코드
                    1: {    // 순번
                        
                    }
                }
            },
            W: {    // warning

            },
            I: {    // Information

            }
        };
        var msg_kor = {
            E: {    // Error
                S01: {  // 구분 코드 : 중복, 필수, 타입, 범위, 객체
                    // 실패
                    1: [
                        '[%]모듈을 가져오는데 실패하였습니다.',
                        '',
                    ],
                    1: [
                        '[%]는 추상메소드 입니다.',
                        '',
                    ],
                    1: [
                        '[]에 []참조 연결이 실패하였습니다. ',
                        '',
                    ],
                    1: [
                        '[]와 []을 동시에 입력할 수 없습니다. ',
                        '',
                    ],
                    1: [
                        '[]는 []을 설정해야 합니다. ',
                        '',
                    ],
                },
                S02: { 
                    // 타입
                    1: [
                        '[%]는 [%] 타입만 가능합니다.',
                        '',
                    ],
                    
                    1: [
                        '[]는 처리할 수 없는 타입니다. ',
                        '',
                    ],
                    1: [
                        '[]타입은 [] 할 수 없습니다. ',
                        '',
                    ],
                    
                    1: [
                        '[]는 []타입이 아닙니다. ',
                        '',
                    ],
                    1: [
                        '[]는 타입이 존재하지 않습니다. ',
                        '',
                    ],
                    1: [
                        '[] 타입이 없습니다. ',
                        '',
                    ],
                },
                S03: {
                    // 객체
                    1: [
                        '[]는 객체가 아닙니다. ',
                        '',
                    ],
                    1: [
                        '[]는 []인터페이스를 구현한 객체가 아닙니다. ',
                        '',
                    ],
                    1: [
                        '[]의 객체가 []와 다릅니다. ',
                        '',
                    ],
                    1: [
                        '[]는 []의 인스턴스가 아닙니다. ',
                        '',
                    ],
                },
                
                S04: {
                    // 중복
                    
                    1: [
                        '[]는 []와 중복이 발생했습니다. ',
                        '',
                    ],
                    1: [
                        '[]에 중복이 발생했습니다. ',
                        '',
                    ],
                    1: [
                        '[]의 중복이 금지되어 있습니다.  ',
                        '',
                    ],
                    1: [
                        '[]가 존재하여 []를 재거 할 수 없습니다. ',
                        '',
                    ],
                    1: [
                        '[]가 존재하여 []를 추가 할 수 없습니다. ',
                        '',
                    ],
                    1: [
                        '[]에 []가 존재합니다. ',
                        '',
                    ],
                    1: [
                        '[]에 []가 존재하여, []을 추가할 수 없습니다. ',
                        '',
                    ],
                    1: [
                        '[]는 예약어 입니다. ',
                        '',
                    ],
                },
                S05: {                    // 필수
                    1: [
                        '[]에 []이 존재하지 않습니다. ',
                        '',
                    ],
                    1: [
                        '필수값 []이 없습니다. ',
                        '',
                    ],
                    1: [
                        '[]에는 []이 필요합니다. ',
                        '',
                    ],
                },
                S06: {
                    // 범위
                    1: [
                        '[%]의 size가 범위를 초과하였습니다.',
                        '',
                    ],
                    1: [
                        '[%]는 0보다 작을 수가 없습니다. ',
                        '',
                    ],
                    1: [
                        '[]와 []의 길이가 다릅니다. ',
                        '',
                    ],
                },
            },
            W: {    // warning

            },
            I: {    // Information

            }
        };
        
        /*
        [Util] module load fail...
        Only [p_idx] type "number" can be added
        [p_pos] size 를 초과하였습니다.
        [p_pos] 0 보다 작을 수 없습니다.
        [ _remove(idx) ] Abstract method definition, fail...
        Only [p_idx] type "number" can be added

        */


        var lang = '';
        /**
         * 메타 이름
         * @member {string} _L.Meta.Message#metaName
         */
        Object.defineProperty(Message, "lang", {
            get: function() { return lang; },
            set: function(val) { lang = val; },
            enumerable: false,
            configurable: false
        });


        /**
         * 메세지 얻기
         * @param {*} meta 
         */
        Message.get = function(p_code, p_args) {
            return '에러코드' + '메세지';
        };

        return Message;
    }());

    //==============================================================
    // 5. module export
    if (isNode) {     
        exports.Message = Message;
    } else {
        _global._L.Message = Message;
        _global._L.Common.Message = Message;    // namespace
    }

}(typeof window !== 'undefined' ? window : global));