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
        Message._NS = 'Common';     // namespace
        
        // var define
        var lang = 'kor';
        var isLong = true;

        /**
         * 객체 레벨
         * 1. 종류
         * 2. 구분코드
         * 3. 순번
         */
        var __STORAGE = {
            eng: {
                E: { // Error
                    S01: { // failure
                        1: {
                            msg: 'Failed to import module ["$1"]',
                            long: 'Load the ["$1"] module through require("...$2"). ',
                            memo: '1: class name, 2: file name'
                        },
                        2: {
                            msg: 'Failed to import function ["$1"()]',
                            long: 'Invoke the ["$1"()] function through require("...$2"). ',
                            memo: '1: function name, 2: file name'
                        },
                        3: {
                            msg: '[$1] is an abstract method.',
                            long: ''
                        },
                        4: {
                            msg: '[$1] should set [$2]. ',
                            long: ''
                        },
                        5: {
                            msg: 'Linking reference [$2] to [$1] failed. ',
                            long: ''
                        },
                        6: {
                            msg: 'You cannot enter [$1] and [$2] at the same time. ',
                            long: ''
                        },
                    },
                    S02: { // type
                        1: {
                            msg: '[$1] can only be of type [$2].',
                            long: ''
                        },
                        2: {
                            msg: '[$1] is a type that cannot be processed. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1] type cannot be [$2]. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1] is not of type [$2]. ',
                            long: ''
                        },
                        5: {
                            msg: '[$1] does not have a type. ',
                            long: ''
                        },
                        6: {
                            msg: 'Type [$1] does not exist. ',
                            long: ''
                        },
                    },
                    S03: { // object
                        1: {
                            msg: '[$1] is not an object. ',
                            long: ''
                        },
                        2: {
                            msg: '[$1] is not an instance of [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1] is not an object that implements the [$2] interface. ',
                            long: ''
                        },
                        4: {
                            msg: 'The object in [$1] is different from [$2]. ',
                            long: ''
                        },
                    },
                   
                    S04: { // duplicate
                        1: {
                            msg: 'A duplicate occurred in [$1]. ',
                            long: '$2'
                        },
                        2: {
                            msg: '[$1] overlaps with [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: 'Duplicate [$1] is prohibited. ',
                            long: ''
                        },
                        4: {
                            msg: 'Cannot remove [$2] because [$1] exists. ',
                            long: ''
                        },
                        5: {
                            msg: 'Cannot add [$2] because [$1] exists. ',
                            long: ''
                        },
                        6: {
                            msg: '[$2] exists in [$1]. ',
                            long: ''
                        },
                        7: {
                            msg: '[$3] cannot be added because [$2] exists in [$1]. ',
                            long: ''
                        },
                        8: {
                            msg: '[$1] is a reserved word. ',
                            long: ''
                        },
                    },
                    S05: { // required
                        1: {
                            msg: 'Required value [$1] is missing. ',
                            long: ''
                        },
                        2: {
                            msg: '[$1] requires [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: '[$2] does not exist in [$1]. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1] is not a valid character in the [$2] test. ',
                            long: 'test result : $3'
                        },
                    },
                    S06: { // scope
                        1: {
                            msg: 'The size of [$1] exceeds the range.',
                            long: ''
                        },
                        2: {
                            msg: '[$1] cannot be less than [$2]. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1] and [$2] have different lengths. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1] is a private type. You cannot set it directly. ',
                            long: 'If you want to force it, set it to __SET$$1(val, target object).'
                        },
                    },
                },
                W: {    // warning
    
                },
                I: {    // Information
    
                }
            },
            kor: { // 구분 코드 : 중복, 필수, 타입, 범위, 객체
                E: {        // Error
                    S01: {  // 실패
                        1: {
                            msg: '["$1"] 모듈을 가져오는데 실패하였습니다.',
                            long: '["$1"] 모듈을 require("...$2") 통해서 불어오세요. ',
                            memo: '1:클래스명, 2:파일명'
                        },
                        2: {
                            msg: '["$1"()] 함수를 가져오는데 실패하였습니다.',
                            long: '["$1"()] 함수를 require("...$2") 통해서 불어오세요. ',
                            memo: '1:함수명, 2:파일명'
                        },
                        3: {
                            msg: '[$1]는 추상메소드 입니다.',
                            long: ''
                        },
                        4: {
                            msg: '[$1]는 [$2]을 설정해야 합니다. ',
                            long: ''
                        },
                        5: {
                            msg: '[$1]에 [$2]참조 연결이 실패하였습니다. ',
                            long: ''
                        },
                        6: {
                            msg: '[$1]와 [$2]을 동시에 입력할 수 없습니다. ',
                            long: ''
                        },
                    },
                    S02: {  // 타입
                        1: {
                            msg: '[$1]는 [$2] 타입만 가능합니다.',
                            long: ''
                        },
                        2: {
                            msg: '[$1]는 처리할 수 없는 타입니다. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1]타입은 [$2] 할 수 없습니다. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1]는 [$2]타입이 아닙니다. ',
                            long: ''
                        },
                        5: {
                            msg: '[$1]는 타입이 존재하지 않습니다. ',
                            long: ''
                        },
                        6: {
                            msg: '[$1] 타입이 없습니다. ',
                            long: ''
                        },
                    },
                    S03: {  // 객체
                        1: {
                            msg: '[$1]는 객체가 아닙니다. ',
                            long: ''
                        },
                        2: {
                            msg: '[$1]는 [$2]의 인스턴스가 아닙니다. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1]는 [$2]인터페이스를 구현한 객체가 아닙니다. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1]의 객체가 [$2]와 다릅니다. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1]의 인스턴스는 처리할 수 없습니다. ',
                            long: ''
                        },
                    },
                    
                    S04: {  // 중복
                        1: {
                            msg: '[$1]에 중복이 발생했습니다. ',
                            long: '$2'
                        },
                        2: {
                            msg: '[$1]는 [$2]와 중복이 발생했습니다. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1]의 중복이 금지되어 있습니다.  ',
                            long: ''
                        },
                        4: {
                            msg: '[$1]가 존재하여 [$2]를 재거 할 수 없습니다. ',
                            long: ''
                        },
                        5: {
                            msg: '[$1]가 존재하여 [$2]를 추가 할 수 없습니다. ',
                            long: ''
                        },
                        6: {
                            msg: '[$1]에 [$2]가 존재합니다. ',
                            long: ''
                        },
                        7: {
                            msg: '[$1]에 [$2]가 존재하여, [$3]을 추가할 수 없습니다. ',
                            long: ''
                        },
                        8: {
                            msg: '[$1]는 예약어 입니다. ',
                            long: ''
                        },
                    },
                    S05: {  // 필수
                        1: {
                            msg: '필수값 [$1]이 없습니다. ',
                            long: ''
                        },
                        2: {
                            msg: '[$1]에는 [$2]이 필요합니다. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1]에 [$2]이 존재하지 않습니다. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1]는 [$2]검사에서 유효하지 않습니다. ',
                            long: '검사결과 : $3'
                        },
                    },
                    S06: {  // 범위
                        1: {
                            msg: '[$1]의 size가 범위를 초과하였습니다.',
                            long: ''
                        },
                        2: {
                            msg: '[$1]는 [$2]보다 작을 수가 없습니다. ',
                            long: ''
                        },
                        3: {
                            msg: '[$1]와 [$2]의 길이가 다릅니다. ',
                            long: ''
                        },
                        4: {
                            msg: '[$1]은 private 타입입니다. 직접 설정할 수 없습니다. ',
                            long: '강제로 설정할 경우, [$2]을 사용해 설정하세요.'
                        },
                    },
                },
                W: {    // warning
    
                },
                I: {    // Information
    
                }
            }
        };
        
        /**
         * 메세지 언어 
         * @member {string} _L.Meta.Message#lang
         */
        Object.defineProperty(Message, "lang", {
            get: function() { return lang; },
            set: function(val) { 
                if (!__STORAGE[val]) throw new Error('The ['+ val +'] language does not exist.');
                lang = val; 
            },
            enumerable: false,
            configurable: false
        });

        /**
         * 긴 메세지 여부
         * @member {string} _L.Meta.Message#isLong
         */
        Object.defineProperty(Message, "isLong", {
            get: function() { return isLong; },
            set: function(val) { 
                isLong = val; 
            },
            enumerable: false,
            configurable: false
        });

        // local function
        function getCodeObject(p_code){
            var MSG = __STORAGE[lang];
            var div, part, num;

            if (typeof p_code !== 'string') return;
            
            div = p_code.substring(0, 1);
            part = p_code.substring(1, 4);
            num = p_code.substring(5, p_code.length - 1);
            if (!MSG[div] || !MSG[div] || !MSG[div][part]) return;

            return MSG[div][part][num];
        }
        

        function buildMessage(p_code, p_arr) {
            var obj = getCodeObject(p_code);
            var msg, long;

            if (typeof obj !== 'object') return _intro(p_code) + 'There are no messages about the code.' 
            
            msg = _build(obj.msg);
            if (isLong) {
                long = _build(obj.long);
                if (long.length > 0) msg += '\n' + long;
            }
            return   _intro(p_code) + msg;

            // inner function
            function _build(p_msg) {
                var msg = p_msg || '';
                var result;
                var max;
                
                if (msg === '') return msg;
                result = msg.match(/\$\d+/g);
                max = result.reduce((acc, cur, idx) => { 
                    var num = Number(cur.replace('$',''));
                    return acc < num ? num : acc; 
                }, 0);
    
                for (var i = 1; i <= max; i++) {
                    var val = p_arr[i -1];
                    msg = msg.replace('$'+ i, val);
                }
                return msg;
            }
            function _intro(p_code) {
                var div = p_code.substring(0, 1);
                var intro;
                if (div === 'E') intro = '[Err:'+p_code+'] ';
                else if (div === 'W') intro = '[Warn:'+p_code+'] ';
                else if (div === 'I') intro = '[Info:'+p_code+'] ';
                else intro = '['+p_code+'] ';
                return intro;
            }
        }

        /**
         * 메세지 얻기
         * @param {*} meta 
         */
        Message.get = function(p_code, p_aValue) {
            return buildMessage(p_code, p_aValue);
        };

        Message.getInfo = function(p_code) {
            return getCodeObject(p_code);
        };

        Message.error = function(p_code, p_aValue) {
            throw new Error(Message.get(p_code, p_aValue));
        };

        Message.init = function() {
            this.lang = 'eng';
            this.isLong = true;
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