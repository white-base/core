/**** message.js | _L.Common.Message ****/
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;
    //==============================================================
    // 1. import module

    //==============================================================Á
    // 2. module dependency check

    //==============================================================
    // 3. module implementation       
    var Message = (function () {
       /**
        * 메세지와 코드를 관리합니다. (static)
        * @constructs _L.Common.Message
        * @static
        */
       function Message() { 
        }

        Message._NS = 'Common';     // namespace
        
        // var define
        var lang = 'kor';
        var isLong = false;

        /**
         * 객체 레벨
         * 1. 종류
         * 2. 구분코드
         * 3. 순번
         */
        var $STORAGE = {
            eng: {
                E: { // Error
                    S01: { // failure
                        0: {
                            msg: '{$1}',
                            long: 'Etc Error',
                            memo: ''
                        },
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
                        7: {
                            msg: 'Class [$1] must implement [$2]. ',
                            long: '$3'
                        },
                        8: {
                            msg: '[$1] cannot create an abstract class.',
                            long: ''
                        },
                        9: {
                            msg: 'Failed to register collection [$1].',
                            long: '[$2]'
                        },
                        10: {
                            msg: 'Failed to retrieve [$1] from [$2].',
                            long: '$3'
                        },
                        11: {
                            msg: 'You need to redefine [$1].',
                            long: 'Inherit and redefine [$2].'
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
                        7: {
                            msg: 'There is no [$2] of type [$1]. ',
                            long: 'Define [$2].'
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
                        5: {
                            msg: 'You cannot enter a space in [$1]. ',
                            long: ''
                        },
                        6: {
                            msg: 'Constraint failed on [$1]. ',
                            long: '$2'
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
                        5: {
                            msg: 'and(&&) condition check failed. ',
                            long: '$1'
                        },
                        6: {
                            msg: 'or(||) condition check failed. ',
                            long: '$1'
                        },
                        7: {
                            msg: '[$1] ranges from [$2] to [$3].',
                            long: ''
                        },
                        8: {
                            msg: '[$1] does not match rule [$2].',
                            long: ''
                        },
                        9: {
                            msg: '[$1] Condition check failed. ',
                            long: '$2'
                        },
                    },
                },
                W: { // warning
                    S01: { // range
                        1: {
                            msg: '[$1] target [$2] cannot be deleted.',
                            long: 'If you set "configurable = true, writable = true" you can delete it later. '
                        },
                    }
                },
                W: {    // warning
                    S01: { // range
                        1: {
                            msg: '',
                            long: ''
                        },
                    }
                },
                I: {    // Information
                    S01: {  // 범위
                            1: {
                            msg: '[$2] [$1]',
                            long: ''
                        },
                    },
                }
            },
            kor: { // 구분 코드 : 중복, 필수, 타입, 범위, 객체
                ES010: {},

                E: {        // Error
                    S01: {  // 실패
                        0: {    // ES010
                            msg: '{$1}',
                            long: '기타 오류',
                            memo: '1: 오류내용'
                        },
                        1: {    // ES011
                            msg: '["$1"] 모듈을 가져오는데 실패하였습니다.',
                            long: '',
                            memo: '1:클래스명, 2:파일명'
                        },
                        2: {    // ES012
                            msg: '["$1"()] 함수를 가져오는데 실패하였습니다.',
                            long: '',
                            memo: '1:함수명, 2:파일명'
                        },
                        3: {    // ES013
                            msg: '[$1]는 [$2] 처리가 실패하였습니다.',
                            long: '',
                            memo: '1:처리 대상, 2:처리 내용'
                        },
                    },  
                    S02: {  // 타입
                        1: {    // ES021
                            msg: '[$1]는 [$2] 타입만 가능합니다.',
                            long: '',
                            memo: '1:검사 대상, 2: 대상의 타입'
                        },
                        2: {    // ES022
                            msg: '[$1]는 처리할 수 없는 타입니다.', 
                            long: '',
                            memo: '1:실패 대상 타입'
                        },
                        3: {    // ES023
                            msg: '[$1]는 [$2]타입이 아닙니다.',
                            long: '',
                            memo: '1:검사 대상, 2: 목표 타입'
                        },
                    },
                    S03: {  // 객체
                        1: {    // ES031
                            msg: '[$1]는 객체가 아닙니다.',
                            long: '',
                            memo: '1:검사 대상'
                        },
                        2: {    // ES032
                            msg: '[$1]는 [$2]의 인스턴스가 아닙니다.',
                            long: '',
                            memo: '1:대상이름, 2:생성자'
                        },
                        3: {    // ES033
                            msg: '[$1]의 객체가 [$2]와 다릅니다.',
                            long: '',
                            memo: '1:비교 대상, 2:목표 대상'
                        },
                    },
                    
                    S04: {  // 중복
                        1: {    // ES041
                            msg: '[$1]는 [$2]와 중복이 발생했습니다.',
                            long: '',
                            memo: '1:대상, 2:목표'
                        },
                        2: {    // ES042
                            msg: '[$1]에 [$2]가 존재하여 [$3]를 재거 할 수 없습니다.',
                            long: '',
                            memo: '1:목표, 2:중복대상, 3:제거대상'
                        },
                        3: {    // ES043
                            msg: '[$1]에 [$1]가 존재하여 [$3]를 추가 할 수 없습니다.',
                            long: '',
                            memo: '1:목표, 2:중복대상, 3:추가대상'
                        },
                        4: {    // ES044
                            msg: '[$1]는 예약어 입니다.',
                            long: '',
                            memo: '1:중복예약어'
                        },
                    },
                    S05: {  // 필수
                        1: {    // ES051
                            msg: '필수값 [$1]이 없습니다.',
                            long: '',
                            memo: '1:필수값'
                        },
                        2: {    // ES052
                            msg: '[$1]에는 [$2]이 필요합니다.',
                            long: '',
                            memo: '1:대상, 2:필수조건'
                        },
                        3: {    // ES053
                            msg: '[$1]에 [$2]이 존재하지 않습니다.',
                            long: '',
                            memo: '1:대상, 2:필수조건'
                        },
                        4: {    // ES054
                            msg: '[$1]에 공백을 입력할 수 없습니다.',
                            long: '',
                            memo: '1:대상'
                        },
                    },
                    S06: {  // 범위
                        1: {    // ES061
                            msg: '[$1]의 [$2] 범위를 초과하였습니다.',
                            long: '',
                            memo: '1:대상, 2: 범위'
                        },
                        2: {    // ES062
                            msg: '[$1]는 [$2]보다 작을 수가 없습니다.',
                            long: '',
                            memo: '1:대상, 2: 기준'
                        },
                        3: {    // ES063
                            msg: '[$1]와 [$2]의 길이가 다릅니다.',
                            long: '',
                            memo: '1:대상, 2: 목표'
                        },
                        4: {    // ES064
                            msg: 'and(&&) 조건 검사에 실패하였습니다. $1',
                            long: '',
                            memo: '1:조건'
                        },
                        5: {    // ES065
                            msg: 'or(||) 조건 검사에 실패하였습니다. $1',
                            long: '',
                            memo: '1:조건'
                        },
                        6: {    // ES066
                            msg: '[$1]의 범위는 [$2]에서 [$3]까지 입니다. ',
                            long: '',
                            memo: '1:대상, 2:시작, 3: 종료'
                        },
                    },
                    
                    // 위치 기준 메세지
                    L01: {  // Common.*
                        100: {  // util-type : match
                            msg: 'util-type.js match',
                        },
                        101: {  // EL01101  
                            msg: '타입 매치 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
                        },
                        102: {  // EL01102  
                            msg: '타입 매치 : target 은 \'$1\' 타입이 아닙니다. tarType: $2',
                        },
                        103: {  // EL01103  
                            msg: '타입 매치 : 처리할 수 없는 타입니다. ',
                        },
                        
                        // match array
                        111: {  // EL01111  
                            msg: '배열 매치 : target 은 array 타입이 아닙니다. tarType: $1',
                        },
                        112: {  // EL01112  
                            msg: '배열 매치 : array(_ANY_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
                        },
                        113: {  // EL01113  
                            msg: '배열 매치 : array(_SEQ_) 타입의 길이보다 target array 의 길이가 작습니다. extType.length = $1, target.length = $2',
                        },
                        114: {  // EL01114  
                            msg: '배열 매치 : array(_SEQ_) [$1]번째 리터럴 타입이 target 값과 다릅니다. extType[$1] = $2, target[$1] = $3',
                        },
                        115: {  // EL01115  
                            msg: '배열 매치 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다. extType[$1] = $2',
                        },
                        116: {  // EL01116  
                            msg: '배열 매치 : array(_REQ_) 타입은 target array 의 요소가 하나 이상 가지고 있어야 합니다. target.length = $1',
                        },
                        117: {  // EL01117   
                            msg: '배열 매치 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
                        },
                        118: {  // EL01118   
                            msg: '배열 매치 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },
                        
                        // match choice
                        121: {  // EL01121  
                            msg: '초이스 매치 : choice(_ANY_) 타입에 \'undefined\' 은 사용할 수 없습니다.',
                        },
                        122: {  // EL01122  
                            msg: '초이스 매치 : choice(_NON_) 타입에 \'undefined\' 만 가능합니다.',
                        },
                        123: {  // EL01123  
                            msg: '초이스 매치 : choice(_ERR_) 타입에 Errror 인스턴스 만 가능합니다.',
                        },
                        124: {  // EL01124  
                            msg: '초이스 매치 : choice(_EUM_) 타입의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
                        },
                        125: {  // EL01125  
                            msg: '초이스 매치 : choice(_DEF_) 타입의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
                        },
                        126: {  // EL01126  
                            msg: '초이스 매치 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
                        },
                        127: {  // EL01127  
                            msg: '초이스 매치 : choice 세부 타입 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },
                        
                        // match class
                        131: {  // EL01131
                            msg: '클래스 매치 : class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
                        },
                        132: {  // EL01132  
                            msg: '클래스 매치 : target은 [$1]의 인스턴스가 아닙니다.',
                        },
                        133: {  // EL01133
                            msg: '클래스 매치 : target 이 class, object, union 타입이 아닙니다. tarType: $1',
                        },
                        
                        // match union
                        141: {  // EL01141 
                            msg: '유니언 매치 : target 은 union 타입이 아닙니다. tarType: $1',
                        },
                        142: {  // EL01142 
                            msg: '유니언 매치 : target[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
                        },
                        143: {  // EL01143 
                            msg: '유니언 매치 : \'$1\' 타입 검사가 실패하였습니다.',
                        },
                        
                        // match function
                        151: {  // EL01151 
                            msg: '함수 매치 : target 은 function 타입이 아닙니다. tarType: $1',
                        },
                        152: {  // EL01152 
                            msg: '함수 매치 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
                        },
                        153: {  // EL01153 
                            msg: '함수 매치 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
                        },
                        154: {  // EL01154 
                            msg: '함수 매치 : extType.func 과 target.func 서로 다릅니다.(proto check)',
                        },
                        155: {  // EL01155 
                            msg: '함수 매치 : target의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
                        },
                        156: {  // EL01156 
                            msg: '함수 매치 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
                        },
                        157: {  // EL01157 
                            msg: '함수 매치 : return 허용검사가 거부되었습니다.',
                        },
                        
                        // allow
                        200: {
                            msg: 'util-type.js allow',
                        },
                        201: {  // EL01201   
                            msg: '타입 허용 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
                        },
                        202: {  // EL01202  
                            msg: '타입 허용 : $1 타입의 리터럴 값과 다릅니다. extType = $2, tarType = $3',
                        },
                        203: {  // EL01203  
                            msg: '타입 허용 : $1 타입이 아닙니다. tarType = $2',
                        },
                        204: {  // EL01204  
                            msg: '타입 허용 : 처리할 수 없는 타입입니다.',
                        },
                        
                        // allow array
                        211: {  // EL01211  
                            msg: '배열 허용 : array 타입이 아닙니다. tarType: $1',
                        },
                        212: {  // EL01212  
                            msg: '타입 허용 : array(_ANY_) 타입에 array(_ALL_, _OPT_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        213: {  // EL01213  
                            msg: '배열 허용 : array(_SEQ_) 타입에 array(_SEQ_) 타입만 허용합니다. tarType: $1',
                        },
                        214: {  // EL01214  
                            msg: '배열 허용 :extType 의 array(_SEQ_) 타입의 길이보다 tarType 은 같거나 커야합니다. extType.length = $1, target.length = $2',
                        },
                        215: {  // EL01215  
                            msg: '배열 허용 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다.',
                        },
                        216: {  // EL01216  
                            msg: '배열 허용 : array(_REQ_) 타입에 array(_ALL_, _ANY_, _OPT_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        217: {  // EL01217  
                            msg: '배열 허용 : array(_OPT_) 타입에 array(_ALL_, _ANY_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        218: {  // EL01218  
                            msg: '배열 허용 : array($1) 는 처리할 수 없는 array 타입 종류입니다.',
                        },
                        219: {  // EL01219
                            msg: '배열 허용 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },

                        // allow choice 
                        221: {  // EL01221 
                            msg: '초이스 허용 : choice(_ALL_) 타입에 choice(_ERR_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        222: {  // EL01222 
                            msg: '초이스 허용 : choice(_ANY_) 타입에 \'undefined\' 타입은 사용할 수 없습니다.',
                        },
                        223: {  // EL01223 
                            msg: '초이스 허용 : choice(_ANY_) 타입에 choice(_NON_, _ERR_), \'undefined\' 타입을 허용하지 않습니다. tarType: $1',
                        },
                        224: {  // EL01224 
                            msg: '초이스 허용 : choice(_NON_) 타입에 choice(_NON_) 타입만 허용합니다. tarType: $1',
                        },
                        225: {  // EL01225 
                            msg: '초이스 허용 : choice(_ERR_) 타입에 choice(_ERR_) 타입만 가능합니다. tarType: $1',
                        },
                        226: {  // EL01226 
                            msg: '초이스 허용 : choice(_REQ_) 타입에 choice(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        227: {  // EL01227 
                            msg: '초이스 허용 : choice(_OPT_) 타입에 choice(_ALL_, _ANY_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $1',
                        },
                        228: {  // EL01228 
                            msg: '초이스 허용 : choice(_EUM_) 타입에 choice(_EUM_) 타입만 가능합니다.',
                        },
                        229: {  // EL01229 
                            msg: '초이스 허용 : choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
                        },
                        '22A': {  // EL0122A 
                            msg: '초이스 허용 : tarType choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. tarType[$1]: $2',
                        },
                        '22B': {  // EL0122B 
                            msg: '초이스 허용 : choice(_DEF_) 타입에 choice(_DEF_) 타입만 가능합니다.',
                        },
                        '22C': {  // EL0122C 
                            msg: '초이스 허용 : extType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
                        },
                        '22D': {  // EL0122D 
                            msg: '초이스 허용 : tarType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. tarType[0]: $1',
                        },
                        '22E': {  // EL0122E 
                            msg: '초이스 허용 : choice($1) 는 처리할 수 없는 choice 타입 종류입니다.',
                        },
                        '22F': {  // EL0122F 
                            msg: '초이스 허용 : tarType[$1] = $3 타입에 허용하는 extType 이 없습니다. extType = $2',
                        },


                        // allow class
                        231: {  // EL01231  
                            msg: '클래스 허용 : extType, tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
                        },
                        232: {  // EL01232  
                            msg: '클래스 허용 : class to class 허용이 거부 되었습니다. (opt = $1)',
                        },
                        233: {  // EL01233  
                            msg: '클래스 허용 : tarType class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
                        },
                        234: {  // EL01234  
                            msg: '클래스 허용 : class to union 허용이 거부 되었습니다. (opt = $1)',
                        },
                        235: {  // EL01235  
                            msg: '클래스 허용 : tarType 이 class, union 타입이 아닙니다. tarType: $1',
                        },
                        
                        // allow union
                        241: {  // EL01241  
                            msg: '유니언 허용 : tarType 은 union 타입이 아닙니다. tarType: $1',
                        },
                        242: {  // EL01242  
                            msg: '유니언 허용 : tarType[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
                        },
                        243: {  // EL01243  
                            msg: '유니언 허용 : \'$1\' 타입 검사가 실패하였습니다.',
                        },
                        
                        // allow function
                        251: {  // EL01251 
                            msg: '함수 허용 : tarType 은 function 타입이 아닙니다. tarType: $1',
                        },
                        252: {  // EL01252 
                            msg: '함수 허용 : 선언한 extType.name = \'$1\' 과 target name 이 일치하지 않습니다. function.name = \'$2\'',
                        },
                        253: {  // EL01253 
                            msg: '함수 허용 : extType.func 을 선언하였는데 target.func 이 functon 타입이 아닙니다.',
                        },
                        254: {  // EL01254 
                            msg: '함수 허용 : extType.func 과 target.func 서로 다릅니다.(proto check)',
                        },
                        255: {  // EL01255 
                            msg: '함수 허용 : tarType의 params 또는 return 객체를 설정해야 합니다. extType.param = $1, extType.return = $2',
                        },
                        256: {  // EL01256 
                            msg: '함수 허용 : params 허용검사가 거부되었습니다. <array(_SEQ_) 변환>',
                        },
                        257: {  // EL01257 
                            msg: '함수 허용 : return 허용검사가 거부되었습니다.',
                        },

                        // util-type.js etc
                        300: {
                            msg: 'util-type.js etc'
                        },
                        301: {  // EL01301  
                            msg: '파싱 검사 : function 규칙이 아닙니다. "$1"',
                        },
                        302: {  // EL01302  
                            msg: '파싱 검사 : function 에 argument, body 내용이 없습니다. "$1"',
                        },
                        303: {  // EL01303  
                            msg: '파싱 검사 : function 파싱 실패 $1',
                        },
                        304: {  // EL01304  
                            msg: '타입 검사 : [$1]는 처리할 수 스페셜타입 입니다.',
                        },
                        305: {  // EL01305  
                            msg: '타입 검사 : array($1) 타입은 처리할 수 없는 스페설타입 입니다.',
                        },
                        306: {  // EL01306  
                            msg: '타입 검사 : choice($1) 타입은 처리할 수 없는 스페셜타입 입니다.',
                        },
                        307: {  // EL01307  
                            msg: '타입 검사 : array($1) 타입은 처리할 수 없는 타입 입니다.',
                        },
                        308: {  // EL01308  
                            msg: '타입 검사 : choice($1) 타입은 처리할 수 없는 타입 입니다.',
                        },
                        // 309: {  // EL01309  
                        //     msg: '[$1]는 처리할 수 없는 타입니다. ',
                        // },
                        '30A': {  // EL0130A  
                            msg: '타입 허용 : allowType(extType, tarType) 검사가 실패하였습니다.'
                        },
                        '30B': {  // EL0130B  
                            msg: '타입 매치 : matchType(extType, target) 검사가 실패하였습니다.'
                        },
                        '30C': {  // EL0130C
                            msg: 'ctor 이 function 타입이 아닙니다. typeof ctor = $1'
                        },
                        
                        // util.js
                        401: {  // EL01401
                            msg: 'implements(ctor, obj, args..); ctor 이 <function> 타입이 아닙니다. typeof ctor == \'$1\''
                        },
                        402: {  // EL01402
                            msg: 'implements(ctor, obj, args..); obj 이 <object> 타입이 아닙니다. typeof obj == \'$1\''
                        },
                        403: {  // EL01403
                            msg: 'implements(ctor, obj, args..); args[$1] 이 <function> 타입이 아닙니다. typeof args[$1] == \'$2\''
                        },
                        404: {  // EL01404
                            msg: '[$1] 는 [$2] 타입을 구현해야 합니다. $1._KIND = \'$3\''
                        },
                        405: {  // EL01405
                            msg: 'isImplementOf(target); target 은 <function, string> 타입만 가능합니다. typeof target = \'$1\''
                        },

                        // etc
                        500: {
                            msg: ''
                        },
                        510: {  // observer.js
                            msg: ''
                        },
                        511: {  // EL01511
                            msg: 'new Observer(caller); caller 는 \'object\' 타입이 아닙니다. typeof caller = $1'
                        },
                        512: {  // EL01512
                            msg: 'Observer.isLog 는 \'boolean\' 타입이 아닙니다. typeof isLog = $1'
                        },
                        513: {  // EL01513
                            msg: 'Observer.isSingleMode 는 \'boolean\' 타입이 아닙니다. typeof isSingleMode = $1'
                        },
                        514: {  // EL01514
                            msg: 'Observer.__$subscribers 값은  \'object\' 타입이 아닙니다. typeof __$subscribers = $1'
                        },
                        515: {  // EL01515
                            msg: 'Observer.__$subscribers[\'any\'] 객체가 없습니다. { any: undefined }'
                        },
                        516: {  // EL01516
                            msg: 'subscribe(fn, code); fn 는 \'function\' 타입이 아닙니다. typeof fn = $1'
                        },

                    },
                    L02: {  // Interface.*
                        
                        // use Meta.* 
                        100: {
                            msg: 'Meta.*'
                        },
                        110: {  // i-object.js
                            msg: ''
                        },
                        111: {  // EL02111
                            msg: 'getTypes(): array<function> 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        112: {  // EL02112
                            msg: 'instanceOf(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        113: {  // EL02113
                            msg: 'equal(any): boolena 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        120: {  // i-marshal.js
                            msg: ''
                        },
                        121: {  // EL02121
                            msg: 'getObject(opt?, origin?): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        122: {  // EL02122
                            msg: 'setObject(mObj) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        130: {  // i-element.js
                            msg: ''
                        },
                        131: {  // EL02131
                            msg: 'clone(): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        140: {  // i-list.js
                            msg: ''
                        },
                        150: {  // i-control-list.js
                            msg: ''
                        },
                        151: {  // EL02151
                            msg: 'add(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        152: {  // EL02152
                            msg: 'del(key) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        153: {  // EL02153
                            msg: 'has(key): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        154: {  // EL02154
                            msg: 'find(any): any 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },

                        // use Collection.*
                        200: {
                            msg: 'Collectoin.*'
                        },
                        210: {  // i-collection.js
                            msg: ''
                        },
                        211: {  // EL02211
                            msg: 'add(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        212: {  // EL02212
                            msg: 'remove(elem): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        213: {  // EL02213
                            msg: 'cantains(any): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        214: {  // EL02214
                            msg: 'indexOf(any): number 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        220: {  // i-collection-array.js
                            msg: ''
                        },
                        221: {  // EL02221
                            msg: 'insertAt(pos, val, ..): boolean 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        230: {  // i-collection-property.js
                            msg: ''
                        },
                        231: {  // EL02231
                            msg: 'keyOf(idx): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },

                        // use Meta.Entity.*
                        300: {
                            msg: 'Meta.Entity.*'
                        },
                        310: {  // i-control-export.js
                            msg: ''
                        },
                        311: {  // EL02311
                            msg: 'write(opt): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        320: {  // i-control-import.js
                            msg: ''
                        },
                        321: {  // EL02321
                            msg: 'read(object) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        330: {  // i-control-group.js
                            msg: ''
                        },
                        331: {  // EL02331
                            msg: 'merge(any, opt) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        332: {  // EL02332
                            msg: 'copy(filter) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        340: {  // i-control-schema.js
                            msg: ''
                        },
                        341: {  // EL02341
                            msg: 'readSchema(json) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        342: {  // EL02342
                            msg: 'writeSchema(opt): object 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        350: {  // i-serialize.js
                            msg: ''
                        },
                        351: {  // EL02351
                            msg: 'output(opt, ...): string 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        352: {  // EL02352
                            msg: 'load(any, ...) 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        360: {  // i-transaction.js
                            msg: ''
                        },
                        361: {  // EL02361
                            msg: 'acceptChanges() 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                        362: {  // EL02362
                            msg: 'rejectChanges() 은 추상메소드 입니다. [$1] 을 구현해야 합니다.'
                        },
                    },
                    L03: {  // Meta.*
                        100: {
                            msg: ''
                        },
                        110: {  // meta-object.js
                            msg: ''
                        },
                        111: {  // EL03111
                            msg: 'abstract, interface, enum 타입은 생성할 수 없습니다. $1[\'_KIND\'] = \'$2\''
                        },
                        112: {  // EL03112
                            msg: 'setObject(oGuid, origin); oGuid 는 \'object\' 타입입니다. typeof oGuid = \'$1\''
                        },
                        113: {  // EL03113
                            msg: 'setObject(oGuid, origin); 네임스페이스가 서로 다릅니다. this._type = $1, oGuid._type = $2'
                        },
                        114: {  // EL03114
                            msg: 'setObject(oGuid, origin); origin 은 Guid 객체가 아닙니다. origin._type = \'$1\', origin._guid = \'$2\''
                        },
                        120: {  // meta-element.js
                            msg: ''
                        },
                        121: {  // EL03121
                            msg: '$name; val 은 \'string\' 타입입니다. typeof val = \'$1\''
                        },
                        122: {  // EL03122
                            msg: '$name; val.length 은 0 보다 커야 합니다.'
                        },
                        
                        200: {  // meta-registry.js
                            msg: ''
                        },
                        210: {  // 객체
                            msg: ''
                        },
                        211: {  // EL03211
                            msg: 'register(meta); 등록할 meta 가 Guid 객체가 아닙니다. meta._type = \'$1\', meta._guid = \'$2\''
                        },
                        212: {  // EL03212
                            msg: 'register(meta); 등록할 meta._guid 가 이미 등록되어 있습니다. meta._guid = \'$1\''
                        },
                        213: {  // EL03213
                            msg: 'release(meta); 해제할 meta 는 string(guid) | object(Guid) 타입만 가능합니다. typeof meta = \'$1\''
                        },
                        
                        220: {  // create
                            msg: ''
                        },
                        221: {  // EL03221
                            msg: 'createMetaObject(oGuid, origin); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        222: {  // EL03222
                            msg: 'createMetaObject(oGuid, origin); oGuid._type 은 \'string\' 타입만 가능합니다.(length > 0) typeof oGuid._type = \'$1\''
                        },
                        223: {  // EL03223
                            msg: 'createMetaObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\''
                        },
                        224: {  // EL03224
                            msg: 'createMetaObject(oGuid, origin); [$1] 네임스페이스가 \'function\' 타입이 아닙니다. typeof coClass = \'$2\''
                        },
                        225: {  // EL03225
                            msg: 'createReferObject(meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\''
                        },
                        226: {  // EL03226
                            msg: 'createReferObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\''
                        },
                        227: {  // EL03227
                            msg: 'createNsReferObject(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\''
                        },

                        230: {  // ns Class
                            msg: ''
                        },
                        231: {  // EL03231
                            msg: 'registerClass(fun, ns, key); fun 이 \'function\' 타입이 아닙니다. typeof fun = \'$1\''
                        },
                        232: {  // EL03232
                            msg: 'registerClass(fun, ns, key); ns 가 \'string\' 타입이 아닙니다. typeof ns = \'$1\''
                        },
                        233: {  // EL03233
                            msg: 'registerClass(fun, ns, key); key 가 \'string\' 타입이 아닙니다. typeof key = \'$1\''
                        },
                        234: {  // EL03234
                            msg: 'releaseClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\''
                        },
                        235: {  // EL03235
                            msg: 'findClass(fun); fun 는 \'function\' 타입이 아닙니다. typeof fun = \'$1\''
                        },
                        236: {  // EL03236
                            msg: 'getClass(fullName); fullName 은 \'string\' 타입만 가능합니다.(length > 0) typeof fullName = \'$1\''
                        },

                        240: {  // set, transform, load
                            msg: ''
                        },
                        241: {  // EL03241
                            msg: 'setMetaObject(oGuid, meta); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        242: {  // EL03242
                            msg: 'setMetaObject(oGuid, meta); meta 는 \'object\' 타입만 가능합니다. typeof meta = \'$1\''
                        },
                        243: {  // EL03243
                            msg: 'setMetaObject(meta); meta._guid 은 \'string\' 타입만 가능합니다.(length > 0) typeof meta._guid = \'$1\''
                        },
                        244: {  // EL03244
                            msg: 'transformRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        245: {  // EL03245
                            msg: 'transformRefer(oGuid); $1[\'$2\'][\'$ns\'] 는 \'function\' 타입이 아닙니다.'
                        },
                        246: {  // EL03246
                            msg: 'loadMetaObject(str, parse?); str 은 \'string\' 타입만 가능합니다. typeof str = \'$1\''
                        },
                        247: {  // EL03247
                            msg: 'loadMetaObject(str, parse?); str 을 파싱한 객체가 Guid 객체가 아닙니다. obj._type = \'$1\', obj._guid = \'$2\''
                        },
                        
                        250: {  // has, valid, find
                            msg: ''
                        },
                        251: {  // EL03251
                            msg: 'validObject(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        252: {  // EL03252
                            msg: 'hasGuidObject(oGuid, origin); guid 는 \'string\' 타입만 가능합니다.(length > 0) typeof guid = \'$1\''
                        },
                        253: {  // EL03253
                            msg: 'hasGuidObject(oGuid, origin); origin[$1]는 \'object\' 타입이 아닙니다. typeof origin[$1] = \'$2\''
                        },
                        254: {  // EL03254
                            msg: 'hasRefer(oGuid); oGuid 는 \'object\' 타입만 가능합니다. typeof oGuid = \'$1\''
                        },
                        255: {  // EL03255
                            msg: 'hasRefer(oGuid); oGuid 가 Guid 객체가 아닙니다. oGuid._type = \'$1\', oGuid._guid = \'$2\''
                        },
                        256: {  // EL03256
                            msg: 'findSetObject(oGuid, origin); [ oGuid._guid | oGuid ]는 \'string\' 타입만 가능합니다.(length > 0) guid = \'$1\''
                        },
                        257: {  // EL03257
                            msg: 'findSetObject(oGuid, origin); origin 는 \'object\' 타입만 가능합니다. typeof origin = \'$1\''
                        },

                        300: {  // namespace-manager.js
                            msg: ''
                        },
                        310: {  // private function, proterty
                            msg: ''
                        },
                        311: {  // EL03311
                            msg: 'NamespaceManager.isOverlap 은  \'boolean\' 타입만 가능합니다. typeof isOverlap = $1'
                        },
                        312: {  // EL03312
                            msg: '_getArray(ns); ns 는 유효한 네임스페이스 이름 규칙이 아닙니다. ns = $1'
                        },
                        313: {  // EL03313
                            msg: '_getArray(ns); ns 타입은 \'string\', \'array<string>\' 타입만 가능합니다. typeof ns = $1'
                        },
                        314: {  // EL03314
                            msg: '_getArray(ns); ns[$1] 는 \'string\' 타입이 아닙니다. typeof ns[$1] = $2'
                        },
                        315: {  // EL03315
                            msg: '_getArray(ns); ns[$1] 는 유효한 이름 규칙이 아닙니다. ns[$1] = $1'
                        },
                        320: {  // addNamespace, delNamespace, path
                            msg: ''
                        },
                        321: {  // EL03321
                            msg: 'addNamespace(ns); 네임스페이스 추가가 실패하였습니다.'
                        },
                        322: {  // EL03322
                            msg: 'delNamespace(ns); 네임스페이스 삭제가 실패하였습니다.'
                        },
                        323: {  // EL03323
                            msg: 'path(ns); 네임스페이스 경로 얻기에 실패하였습니다.'
                        },
                        330: {  // add, del 
                            msg: ''
                        },
                        331: {  // EL03331
                            msg: 'add(fullName, elem); [$1] 는 유효한 이름 규칙이 아닙니다.'
                        },
                        332: {  // EL03332
                            msg: 'add(fullName, elem); elem 이 이미 등록되었습니다. 중복허용 [this.isOverlap = \'true\']'
                        },
                        333: {  // EL03333
                            msg: 'add(fullName, elem); 네임스페이스에 요소 등록이 실패하였습니다.'
                        },
                        334: {  // EL03334
                            msg: 'del(fullName); 네임스페이스에 요소 삭제가 실패하였습니다.'
                        },
                        340: {  // getPath, output, load
                            msg: ''
                        },
                        341: {  // EL03341
                            msg: 'getPath(elem); elem 값이 없습니다. typeof elem = $1'
                        },
                        342: {  // EL03342
                            msg: 'output(stringify, space); 네임스페이스 내보내기가 실패하였습니다. $1'
                        },
                        343: {  // EL03343
                            msg: 'load(str, parse); str 는 \'string\' 타입이 아닙니다. typeof str = $1'
                        },
                        344: {  // EL03344
                            msg: 'load(str, parse); 네임스페이스 로딩이 실패하였습니다. $1'
                        },
                    },
                    L04: {  // Collection.*
                        100: {
                            msg: ''
                        },
                        110: {  // base-collection.js
                            msg: ''
                        },
                        111: {  // EL04111
                            msg: '_remove(idx): boolean 는 추상메소드 입니다. 구현해야 합니다.'
                        },
                        112: {  // EL04112
                            msg: 'setObject(oGuid, origin); oGuid 의 _owner 연결이 실패하였습니다. guid = $1'
                        },
                        113: {  // EL04113
                            msg: 'removeAt(idx); idx 는 \'number\' 타입이 아닙니다. typeof idx = $1'
                        },
                        114: {  // EL04114
                            msg: 'add(any): number 는 추상메소드 입니다. 구현해야 합니다.'
                        },
                        115: {  // EL04115
                            msg: 'clear() 는 추상메소드 입니다. 구현해야 합니다.'
                        },
                        200: {
                            msg: ''
                        },
                        
                        210: {  // collection-array.js
                            msg: ''
                        },
                        211: {  // EL04211
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'][$1] 의 _elements 연결이 실패하였습니다. guid = $2'
                        },
                        212: {  // EL04212
                            msg: 'insertAt(pos, value, desc); pos 는 \'number\' 타입이 아닙니다. typeof pos = $1'
                        },
                        213: {  // EL04213
                            msg: 'insertAt(pos, value, desc); pos 는 this.count 보다 클 수 없습니다. pos = $1, count = $2'
                        },
                        214: {  // EL04214
                            msg: 'insertAt(pos, value, desc);  pos 는 0 보다 작을 수 없습니다. pos = $1'
                        },
                        215: {  // EL04215
                            msg: 'insertAt(pos, value, desc); 등록이 실패하였습니다. pos = $1, value = $2'
                        },

                        220: {  // collection-property.js
                            msg: ''
                        },
                        221: {  // EL04221
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_key\'].length = $2 길이가 서로 다릅니다.'
                        },
                        222: {  // EL04222
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_desc\'].length = $2 길이가 서로 다릅니다.'
                        },
                        223: {  // EL04223
                            msg: 'setObject(oGuid, origin); oGuid._elem[$1] guid 를 찾을 수 없습니다. guid = $2' 
                        },
                        224: {  // EL04224
                            msg: 'indexOf(obj, isKey); key로 인덱스값을 찾을 경우 obj 는 \'string\' 타입이어야 합니다. typeof obj = $1'
                        },
                        225: {  // EL04225
                            msg: 'add(name, value, desc); name 이 \'string\' 타입이 아닙니다. typeof name = $1'
                        },
                        226: {  // EL04226
                            msg: 'add(name, value, desc); name = \'$1\' 이 이름규칙에 맞지 않습니다. 규칙 = \'$2\''
                        },
                        227: {  // EL04227
                            msg: 'add(name, value, desc); name = \'$1\' 이 예약어 입니다.'
                        },
                        228: {  // EL04228
                            msg: 'add(name, value, desc); name = \'$1\' 이 기존 이름과 중복이 발생했습니다.'
                        },
                        229: {  // EL04229
                            msg: 'add(name, value, desc); 추가가 실패하였습니다. name = \'$1\', value = \'$2\''
                        },
                        '22A': {  // EL0422A
                            msg: 'keyOf(idx); idx 이 \'number\' 타입이 아닙니다. typeof idx = $1'
                        },
                        '22B': {  // EL0422B
                            msg: 'exist(key); key 이 \'string\' 타입이 아닙니다.(length > 0) typeof key = $1'
                        },
                        
                        300: {
                            msg: ''
                        },
                        310: {  // collection-transaction.js
                            msg: ''
                        },
                        311: {  // EL04311
                            msg: '$1.autoChanges 는 \'boolean\' 타입입니다. typeof aucoChanges = \'$2\''
                        },
                        320: {  // trans-queue.js
                            msg: ''
                        },
                        321: {  // EL04321
                            msg: 'collection 값이 [MetaObject] 을 상속한 인스턴스가 아닙니다.'
                        },
                        322: {  // EL04322
                            msg: 'collection 이 [ArrayCollection] 의 인스턴스가 아닙니다.'
                        },
                        323: {  // EL04323
                            msg: 'rollback(); \'$1\' 는 처리할 수 없는 cmd 입니다.'
                        },
                    },
                    L05: {  // Meta.Entity.*
                        100: {
                            msg: ''
                        },
                        110: {  // BaseColumn
                            msg: ''
                        },
                        111: {  // EL05111
                            msg: '$1._entity 값이 [MetaElement] 인스턴스가 아닙니다.'
                        },
                        112: {  // EL05112
                            msg: '$1.columnName 는 \'string\' 타입입니다. typeof columnName = \'$2\''
                        },
                        113: {  // EL05113
                            msg: '기존에 $1.columnName \'$2\'이 존재합니다.'
                        },
                        114: {  // EL05114
                            msg: '기존에 $1.alias \'$2\'이 존재하여 columnName 을 설정할 수 없습니다.'
                        },
                        115: {  // EL05115
                            msg: '$1.alias 는 \'string\' 타입입니다. typeof alias = \'$2\''
                        },
                        116: {  // EL05116
                            msg: '기존에 $1.alias \'$2\'이 존재합니다.'
                        },
                        117: {  // EL05117
                            msg: '$1.caption 는 \'string\' 타입입니다. typeof caption = \'$2\''
                        },
                        118: {  // EL05118
                            msg: 'setObject(oGuid, origin); oGuid.[\'_entity\'] guid 를 찾을 수 없습니다. name = $1, guid = $2' 
                        },
                        119: {  // EL05119
                            msg: 'clone() 은 추상메소드 입니다. 상속해서 구현해야 합니다.'
                        },

                        120: {  // ObjectColumn
                            msg: ''
                        },
                        121: {  // EL05121
                            msg: '_load(prop); prop 는 \'object\' 타입입니다. typeof prop = \'$2\''
                        },
                        122: {  // EL05122
                            msg: 'setObject(oGuid, origin); oGuid.[\'default\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },
                        123: {  // EL05123
                            msg: 'setObject(oGuid, origin); oGuid.[\'value\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },

                        130: {  // MetaColumn
                            msg: ''
                        },
                        131: {  // EL05131
                            msg: '$1.required 는 \'boolean\' 타입입니다. typeof required = \'$2\''
                        },
                        132: {  // EL05132  TODO: 제거됨
                            msg: '$1.isNullPass 는 \'boolean\' 타입입니다. typeof isNullPass = \'$2\''
                        },
                        133: {  // EL05133
                            msg: '$1.constraints 의 배열 요소는 \'function\' | {regex: RegExp, msg: string} 타입입니다. typeof [$2].regex = \'$3\', [$2].msg = \'$4\''
                        },
                        134: {  // EL05134
                            msg: '$1.getter 는 \'function\' 타입입니다. typeof getter = \'$2\''
                        },
                        135: {  // EL05135
                            msg: '$1.setter 는 \'function\' 타입입니다. typeof setter = \'$2\''
                        },
                        136: {  // EL05136
                            msg: 'addConstraint(regex, msg, code, condition); regex 는 RegExp 인스턴스가 아닙니다.'
                        },
                        137: {  // EL05137
                            msg: 'addConstraint(regex, msg, code, condition); msg 는 \'string\' 타입입니다. typeof msg = \'$1\''
                        },

                        140: {  // BaseColumnCollection
                            msg: ''
                        },
                        141: {  // EL05141
                            msg: '$1._baseType 는 \'function\' 타입입니다. typeof getter = \'$2\''
                        },
                        142: {  // EL05142
                            msg: '$1._baseType [BaseColumn]의 prototype 이 연결되어 있어야 합니다.(상속)'
                        },
                        143: {  // EL05143
                            msg: 'add(name, vlaue); _onwer 의 rows 가 존재하여 columnColleciton 을 추가할 수 없습니다. _onwer.rows.count = $1'
                        },
                        144: {  // EL05144
                            msg: 'add(name, vlaue); $1 에 \'$2\' 존재하여 추가할 수 없습니다.'
                        },
                        145: {  // EL05145
                            msg: 'add(name, vlaue); $1 에 alias \'$2\'이 존재하여 추가할 수 없습니다.'
                        },
                        146: {  // EL05146
                            msg: 'removeAt(idx); _onwer 의 rows 가 존재하여 columnColleciton 을 제거할 수 없습니다. _onwer.rows.count  = $1'
                        },
                        147: {  // EL05147
                            msg: 'addValue(name, value) 은 추상메소드 입니다. 구현해야 합니다.'
                        },

                        150: {  // MetaTableColumnCollection
                            msg: ''
                        },
                        151: {  // EL05151
                            msg: 'add(any); any 는 \'string\' | [BaseColumn] 타입입니다. typeof any = $1'
                        },
                        152: {  // EL05152
                            msg: 'addValue(name, value); name 은 \'string\' 타입입니다. typeof name = $1'
                        },
                        160: {  // MetaViewColumnCollection
                            msg: ''
                        },
                        161: {  // EL05161
                            msg: 'add(any, refCol); refCol 값이 [BaseColumnCollection] 타입이 아닙니다.'
                        },
                        162: {  // EL05162
                            msg: 'add(any, refCol); any 는 \'string\' | [BaseColumn] 타입입니다. typeof any = $1'
                        },
                        163: {  // EL05163
                            msg: 'addValue(name, value, refCol); name 은 \'string\' 타입입니다. typeof name = $1'
                        },
                        164: {  // EL05164
                            msg: 'addEntity(entity); entity 값이 [BaseEntity] 타입이 아닙니다.'
                        },

                        200: {  //
                            msg: ''
                        },
                        210: {  // MetaRow
                            msg: ''
                        },
                        211: {  // EL05211
                            msg: '$1.constructor(entity) 값이 [BaseEntity] 타입이 아닙니다.'
                        },
                        212: {  // EL05212
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'].length = $1 길이와 oGuid[\'_key\'].length = $2 길이가 서로 다릅니다.'
                        },
                        213: {  // EL05213
                            msg: 'setObject(oGuid, origin); oGuid[\'_elem\'][$1] guid 를 찾을 수 없습니다. guid = $2'
                        },

                        220: {  // MetaRowCollection
                            msg: ''
                        },
                        221: {  // EL05221
                            msg: 'target의 _entity 객체와 $1._onwer 객체가 같이야 합니다.'
                        },
                        222: {  // EL05222
                            msg: 'insertAt(pos, row, isCheck); row 는 [MetaRow] 타입이 아닙니다.'
                        },
                        223: {  // EL05223
                            msg: 'insertAt(pos, row, isCheck); row 의 _entity 객체와 $1._onwer 객체가 같이야 합니다.'
                        },
                        224: {  // EL05224
                            msg: 'insertAt(pos, row, isCheck); row[$1] 의 유효성 검사(valid)가 실패하였습니다. fail msg = \'$2\''
                        },

                        300: {  // base-entity.js
                            msg: ''
                        },
                        310: {  // property
                            msg: ''
                        },
                        311: {  // EL05311
                            msg: '$1._mestaset 값은 [MetaSet] 타입이 아닙니다.'
                        },
                        312: {  // EL05312
                            msg: '$1.columns 속성을 재정의해야 합니다.'
                        },

                        320: {  // private method :: _buildEntity, _readEntity, _readSchema - 14
                            msg: ''
                        },
                        321: {  // EL05321
                            msg: '_buildEntity(entity, cb, items); items[$1] 가 \'string\' 타입이 아닙니다. typeof items[$1] = $2'
                        },
                        322: {  // EL05322
                            msg: '_buildEntity(entity, cb, items); this.columns 에 \'$1\' 컬럼명이 존재하여 추가할 수 없습니다.'
                        },
                        323: {  // EL05323
                            msg: '_buildEntity(entity, cb, items); entity 에 대한 row 생성이 실패하였습니다.'
                        },
                        324: {  // EL05324
                            msg: '_readEntity(entity, opt); entity 가 [BaseEntity] 타입이 아닙니다.'
                        },
                        325: {  // EL05325
                            msg: '_readEntity(entity, opt); opt 가 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        326: {  // EL05326
                            msg: '_readEntity(entity, opt); entity 읽기가 실패하였습니다. opt = $1'
                        },
                        327: {  // EL05327
                            msg: '_readEntity(entity, opt); this.rows 가 존재하여 컬럼을 load 할 수 없습니다. opt = $1'
                        },
                        328: {  // EL05328
                            msg: '_readEntity(entity, opt); this.columns 에 \'$1\' 컬럼명이 존재하여 추가할 수 없습니다.'
                        },
                        329: {  // EL05329
                            msg: '_readSchema(obj, isRow, origin); obj._baseEntity guid를 찾을 수 없습니다. guid = $1'
                        },
                        '32A': {  // EL0532A
                            msg: '_readSchema(obj, isRow, origin); 스키마 읽기가 실패하였습니다.'
                        },
                        '32B': {  // EL0532B
                            msg: '_readSchema(obj, isRow, origin); this.rows 가 존재하여 컬럼을 추가 할 수 없습니다.'
                        },
                        '32C': {  // EL0532C
                            msg: '_readSchema(obj, isRow, origin); this.columns[$1] guid를 찾을 수 없습니다. guid = $2'
                        },
                        '32D': {  // EL0532D
                            msg: '_readSchema(obj, isRow, origin); this.columns[$1]._entity guid를 찾을 수 없습니다. guid = $2'
                        },
                        '32E': {  // EL0532E
                            msg: '_readSchema(obj, isRow, origin); this.columns 에 \'$1\' 컬럼명이 존재하여 추가할 수 없습니다.'
                        },

                        330: {  // method :: transformSchema(static), setValue, clone, select - 7, 예외 없음 : getValue, clear, reset, newRow, getObject, setObject
                            msg: ''
                        },
                        331: {  // EL05331
                            msg: 'BaseEntity.transformSchema(oGuid); oGuid 는 스키마 객체가 아닙니다. oGuid = {columns: $1, rows: $2}'
                        },
                        332: {  // EL05332
                            msg: 'BaseEntity.transformSchema(oGuid); 스키마 변환이 실패하였습니다.'
                        },
                        333: {  // EL05333
                            msg: 'setValue(row); row 가 [MetaRow] 타입이 아닙니다.'
                        },
                        334: {  // EL05334
                            msg: 'setValue(row); columns 에 row 설정이 실패하였습니다.'
                        },
                        335: {  // EL05335
                            msg: 'select(filter, ...); MetaRegistry.ns 에서 \'$1\' 가져오는데 싪패하였습니다.'
                        },
                        336: {  // EL05336
                            msg: 'select(filter, ...); 조회가 실패하였습니다.'
                        },
                        337: {  // EL05337
                            msg: 'clone() 은 추상메소드 입니다. 구현해야 합니다.'
                        },

                        340: {  // merge, copy - 8
                            msg: ''
                        },
                        341: {  // EL05341
                            msg: 'merge(target, opt, isMath); target 이 [BaseEntity] 타입이 아닙니다.'
                        },
                        342: {  // EL05342
                            msg: 'merge(target, opt, isMath); opt 이 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        343: {  // EL05343
                            msg: 'merge(target, opt, isMath); opt = 1, target.columns[$1].name = \'$2\' 이 column name 에 존재합니다.'
                        },
                        344: {  // EL05344
                            msg: 'merge(target, opt, isMath); opt = 1, target.columns[$1].name = \'$2\' 이 column alias 에 존재합니다.'
                        },
                        345: {  // EL05345
                            msg: 'merge(target, opt, isMath); opt = 3, target.columns[$1].name = \'$2\' 이 columns name 에 존재합니다.'
                        },
                        346: {  // EL05346
                            msg: 'merge(target, opt, isMath); opt = 3, target.columns[$1].name = \'$2\' 이 columns alias 에 존재합니다.'
                        },
                        347: {  // EL05347
                            msg: 'merge(target, opt, isMath); 병합이 실패하였습니다. opt = $1'
                        },
                        348: {  // EL05348
                            msg: 'copy() 은 추상메소드 입니다. 구현해야 합니다.'
                        },

                        350: {  // load, read, readSchema, readDate - 12
                            msg: ''
                        },
                        351: {  // EL05351
                            msg: 'load(obj, parse); [BaseEntity] 타입의 obj 는 로드할 수 없습니다.'
                        },
                        352: {  // EL05352
                            msg: 'load(obj, parse); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        353: {  // EL05353
                            msg: 'load(obj, parse); 로드가 실패하였습니다.'
                        },
                        354: {  // EL05354
                            msg: 'read(obj, opt); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        355: {  // EL05355
                            msg: 'read(obj, opt); opt 이 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        356: {  // EL05356
                            msg: 'read(obj, opt); opt 값은 범위(1 ~ 3)가 아닙니다. obj = $1'
                        },
                        357: {  // EL05357
                            msg: 'read(obj, opt); 읽기가 실패하였습니다.'
                        },
                        358: {  // EL05358
                            msg: 'readSchema(obj, isCreate, origin); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        359: {  // EL05359
                            msg: 'readSchema(obj, isCreate, origin); obj 는 스키마 객체가 아닙니다. obj = {columns: $1, rows: $2}'
                        },
                        '35A': {  // EL0535A
                            msg: 'readSchema(obj, isCreate, origin); 스카미 읽기가 실패하였습니다.'
                        },
                        '35B': {  // EL0535B
                            msg: 'readData(obj); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        '35C': {  // EL0535C
                            msg: 'readData(obj); obj 는 스키마 객체가 아닙니다. obj = {columns: $1, rows: $2}'
                        },
                        '35D': {  // EL0535D
                            msg: 'readData(obj); 데이터 읽기가 실패하였습니다.'
                        },

                        360: {  // output, write, writeSchema, writeData
                            msg: ''
                        },
                        361: {  // EL05361
                            msg: ''
                        },

                        400: {
                            msg: ''
                        },
                        410: {  // MetaTable
                            msg: ''
                        },
                        411: {  // EL05411
                            msg: '$1.tableName 값은 \'string\' 타입이 아닙니다. typeof tableName = $2'
                        },
                        412: {  // EL05412
                            msg: '$1.columns 값은 [MetaTableColumnCollection] 타입이 아닙니다.'
                        },
                        413: {  // EL05413
                            msg: '$1.rows 존재하여 columns 을 설정할 수 없습니다. rows.count = $2'
                        },
                        414: {  // EL05414
                            msg: 'setObject(oGuid, origin); oGuid.[\'_metaSet\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },

                        420: {  // MetaTableColleciton
                            msg: ''
                        },
                        421: {  // EL05421
                            msg: '$1._baseType 값은 function 타입이 아닙니다. typeof _baseType = $2'
                        },
                        422: {  // EL05422
                            msg: '$1._baseType [MetaTable]의 prototype 이 연결되어 있어야 합니다.(상속)'
                        },
                        423: {  // EL05423
                            msg: 'add(any); any 는 \'string\' | [MetaTable] 타입만 가능합니다. typeof any = $1'
                        },
                        424: {  // EL05424
                            msg: 'add(any); tableName = \'$1\'이 기존에 존재합니다.'
                        },

                        430: {  // MetaView
                            msg: ''
                        },
                        431: {  // EL05431
                            msg: '$1.viewName 값은 \'string\' 타입이 아닙니다. typeof viewName = $2'
                        },
                        432: {  // EL05432
                            msg: '$1.columns 값은 [MetaViewColumnCollection] 타입이 아닙니다.'
                        },
                        433: {  // EL05433
                            msg: '$1.rows 존재하여 columns 을 설정할 수 없습니다. rows.count = $2'
                        },
                        434: {  // EL05434
                            msg: '$1._baseEntity 값은 [BaseEntity] 타입이 아닙니다.'
                        },
                        435: {  // EL05435
                            msg: 'setObject(oGuid, origin); oGuid.[\'_metaSet\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },
                        436: {  // EL05436
                            msg: 'setObject(oGuid, origin); oGuid.[\'_baseEntity\'] guid 를 찾을 수 없습니다. guid = $1' 
                        },

                        440: {  // MetaViewColleciton
                            msg: ''
                        },
                        441: {  // EL05441
                            msg: '$1._baseType 값은 \'function\' 타입이 아닙니다. typeof _baseType = $2'
                        },
                        442: {  // EL05442
                            msg: '$1._baseType [MetaView]의 prototype 이 연결되어 있어야 합니다.(상속)'
                        },
                        443: {  // EL05443
                            msg: 'add(obj, baseEntity); [MetaView] 타입의 obj와  baseEntity 를 동시에 입력할 수 없습니다.'
                        },
                        444: {  // EL05444
                            msg: 'add(obj, baseEntity); baseEntity 는 [BaseEntity] 타입이 아닙니다.'
                        },
                        445: {  // EL05445
                            msg: 'add(obj, baseEntity); obj 는 \'string\' | [MetaView] 타입만 가능합니다. typeof obj = $1'
                        },
                        446: {  // EL05446
                            msg: 'add(obj, baseEntity); viewName = \'$1\'이 기존에 존재합니다.'
                        },

                        450: {  // MetaSet
                            msg: ''
                        },
                        451: {  // EL05451
                            msg: '$1.setName 값은 \'string\' 타입이 아닙니다. typeof setName = $2'
                        },
                        452: {  // EL05452
                            msg: '$1.autoChanges 값은 \'boolean\' 타입이 아닙니다. typeof setName = $2'
                        },
                        453: {  // EL05453
                            msg: 'MetaSet.transformSchema(oGuid); oGuid 는 스키마 객체가 아닙니다. oGuid = {tables: .., views: ..}'
                        },
                        454: {  // EL05454
                            msg: 'load(obj, parse); [MetaSet] 타입의 obj 는 로드할 수 없습니다.'
                        },
                        455: {  // EL05455
                            msg: 'load(obj, parse); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        456: {  // EL05456
                            msg: 'read(obj, opt); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        457: {  // EL05457
                            msg: 'read(obj, opt); opt 이 \'number\' 타입이 아닙니다. typeof opt = $1'
                        },
                        458: {  // EL05458
                            msg: 'readSchema(obj, isCreate); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        459: {  // EL05459
                            msg: 'readSchema(obj, isCreate); obj 는 스키마 객체가 아닙니다. obj = {tables: $1, views: $2}'
                        },
                        '45A': {  // EL0545A
                            msg: 'readData(obj); obj 가 \'object\' 타입이 아닙니다.(null제외) typeof obj = $1'
                        },
                        '45B': {  // EL0545B
                            msg: 'readData(obj); obj 는 스키마 객체가 아닙니다. obj = {tables: $1, views: $2}'
                        },

                    },

                    /**
                     * 네임스페이스 기준으로 분리하면 적합할 듯
                     * L01 : Common.*       message.js<제외>, extend-error.js<자체>, util.js:4, util-type.js:100~, observer.js:6, load-namespace.js <없음>
                     *  - 100 : util-type match
                     *  - 200 : util-type allow
                     *  - 300 : util-type etc
                     *  - 400 : util
                     * 
                     * L02 : Interface.*    i-*.js:26  <14개>
                     *  - 100 : Meta.*,            i-object.js, i-marshal.js, i-element.js, i-list.js, i-control-list.js
                     *  - 200 : Collectoin.*       i-collectin.js, i-collectin-array.js, i-collection-property.js
                     *  - 300 : Meta.Entity.*      i-control-export.js, i-control-group.js, i-control-import.js, i-control-schema.js, i-serialize.js, i-transaction.js
                     * 
                     * L03 : Meta
                     *  - 100 : meta-object.js:4, meta-element.js:2
                     *  - 200 : meta-register.js:28
                     *      + 10 : 객체 등록 관련-5
                     *      + 20 : create 관련-11
                     *      + 30 : 네임스페이스 동록 관련-4 
                     *      + 40 : 변경 관련  11
                     *      + 50 : 조회 관련
                     *  - 300~ : namespace-manager.js:10
                     *      + 10 : private, prop
                     *      + 20 : ns 제어
                     *      + 30 : ns 요소 제어
                     *      + 40 : 기타
                     * L04 : Collection
                     *  - 100 : base-collection.js:5
                     *  - 200 : collection-array.js:5, collection-property.js:11
                     *  - 300 : collection-transaction.js:1, trans-queue.js, 
                     * 
                     * L05 : Meta.Entity
                     *  - 100 : 
                     *      + 10 : base-column-9
                     *      + 20 : object-column-3
                     *      + 30 : meta-column-7
                     *      + 40 : base-column-collection-7
                     *      + 50 : table-column-collection-2
                     *      + 60 : view -column-collection-4
                     *  - 200 : row
                     *      + 10 : meta-row.js:7 
                     *  - 300 : base-entity.js:34
                     *      + 10 : 속성-2
                     *      + 20 : private method-11
                     *      + 30 : 자체 메소드 :: seValue-1,  select-1,, clone-1
                     *      + 40 : merge-6, copy-1
                     *      + 50 : load-2, output
                     *      + 60 : read-3, readSchema-2, readDate-2
                     * 
                     *  - 400 : 
                     *      + 10 : meta-table.js:9
                     *      + 20 : colleciton-4
                     *      + 30 : meta-view.js:13
                     *      + 40 : collection-6
                     *      + 50 :  meta-set.js:11
                     * 
                     * POINT:
                     * G01 : 전역 코드? L01 에 적용가능?
                     */
                },
                W: {    // warning
                    S01: {  // 범위
                        1: {
                            msg: '[$1] 대상 [$2]는 삭제 할 수 없습니다.',
                            long: '"configurable = true, writable = true" 로 설정하시면 이후 삭제 가능합니다. '
                        },
                    }
                },
                I: {    // Information
                    S01: {  // 범위
                            1: {
                            msg: '[$2] [$1]',
                            long: ''
                        },
                    },
                }
            }
        };
        
        /**
         * 메세지 언어 
         * @member {string} _L.Common.Message#lang
         */
        Object.defineProperty(Message, "lang", {
            get: function() { return lang; },
            set: function(val) { 
                if (!$STORAGE[val]) throw new Error('The ['+ val +'] language does not exist.');
                lang = val; 
            },
            configurable: false,
            enumerable: false,
        });

        /**
         * 긴 메세지 여부
         * @member {string} _L.Common.Message#isLong
         */
        Object.defineProperty(Message, "isLong", {
            get: function() { return isLong; },
            set: function(val) { 
                isLong = val; 
            },
            configurable: false,
            enumerable: false,
        });

        // local function
        function _getCodeObject(code){
            var MSG = $STORAGE[lang];
            var div, part, num;

            if (typeof code !== 'string') return;
            
            div = code.substring(0, 1);
            part = code.substring(1, 4);
            num = code.substring(4, code.length);
            if (!MSG[div] || !MSG[div] || !MSG[div][part]) return;

            return MSG[div][part][num];
        }
        

        function _buildMessage(code, arr) {
            var obj = _getCodeObject(code);
            var msg, long;

            if (typeof obj !== 'object') return $intro(code) + 'There are no messages about the code.' 
            
            msg = $build(obj.msg);
            if (isLong) {
                long = $build(obj.long);
                if (long.length > 0) msg += '\n' + long;
            }
            return $intro(code) + msg;

            // inner function
            function $build(p_msg) {
                var msg = p_msg || '';
                var result;
                var max = 0;
                
                if (msg === '') return msg;
                result = msg.match(/\$\d+/g);
                if (!Array.isArray(result)) return msg;

                max = result.reduce((acc, cur, idx) => { 
                    var num = Number(cur.replace('$',''));
                    return acc < num ? num : acc; 
                }, 0);
                    
                for (var i = 1; i <= max; i++) {
                    var val = arr[i -1];
                    msg = msg.replace(new RegExp('\\$'+ i, 'g'), val);
                }
                return msg;
            }
            function $intro(code) {
                var div;
                var intro = '';

                if (typeof code === 'string' && code.length > 0) {
                    div = code.substring(0, 1);
                    if (div === 'E') intro = '['+code+'] ';
                    else if (div === 'W') intro = '['+code+'] ';
                    else if (div === 'I') intro = '['+code+'] ';
                    else intro = '['+code+'] ';
                }
                return intro;
            }
        }

        /**
         * 메세지를 초기화 합니다. TODO: 꼭 필요할까? 필요없을듯
         */
        Message.init = function() {
            this.lang = 'eng';
            this.isLong = false;
        };

        /**
         * 메세지 코드에 대한 문자열를 얻습니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         * @returns {string}
         */
        Message.get = function(p_code, p_aValue) {
            return _buildMessage(p_code, p_aValue);
        };

        /**
         * 메세지 코드에 대한 객체를 얻습니다.
         * @param {string} p_code 메시지 코드
         * @returns {object} {msg: '메세지', long: '긴메세지'}
         */
        Message.getObject = function(p_code) {
            return _getCodeObject(p_code);
        };

        /**
         * 메세지 코드에 대한 Error 객체를 생성해서 예외룰 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.error = function(p_code, p_aValue) {
            throw new Error(Message.get(p_code, p_aValue));
        };

        /**
         * 메세지 코드에 대한 console.warn 을 발생합니다.
         * @param {string} p_code 메세지 코드
         * @param {array<string>} p_aValue msg $1, $2... 매창값
         */
        Message.warn = function(p_code, p_aValue) {
            console.warn(Message.get(p_code, p_aValue));
        };



        return Message;
    }());

    //==============================================================
    // 4. module export
    if (isNode) exports.Message = Message;      // strip:
    
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    _global._L.Message = Message;
    _global._L.Common.Message = Message;

}(typeof window !== 'undefined' ? window : global));