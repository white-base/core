/**
 * namespace _L.Common
 */
(function(_global) {
    'use strict';

    var isNode = typeof window !== 'undefined' ? false : true;

    //==============================================================
    // 1. namespace declaration
    _global._L                      = _global._L || {};
    _global._L.Common               = _global._L.Common || {};

    //==============================================================
    // 2. import module

    //==============================================================Á
    // 3. module dependency check

    //==============================================================
    // 4. module implementation       
    var Message = (function () {
       /**
        * 메세지 
        * @constructs _L.Common.Message
        * @static
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
                E: {        // Error
                    S01: {  // 실패
                        0: {    // ES010
                            msg: '{$1}',
                            long: '기타 오류',
                            memo: ''
                        },
                        1: {    // ES011
                            msg: '["$1"] 모듈을 가져오는데 실패하였습니다.',
                            long: '["$1"] 모듈을 require("...$2") 통해서 불어오세요. ',
                            memo: '1:클래스명, 2:파일명'
                        },
                        2: {    // ES012
                            msg: '["$1"()] 함수를 가져오는데 실패하였습니다.',
                            long: '["$1"()] 함수를 require("...$2") 통해서 불어오세요. ',
                            memo: '1:함수명, 2:파일명'
                        },
                        3: {    // ES013
                            msg: '[$1]는 추상메소드 입니다.',
                            long: ''
                        },
                        4: {    // ES014
                            msg: '[$1]는 [$2]을 설정해야 합니다. ',
                            long: ''
                        },
                        5: {    // ES015
                            msg: '[$1]에 [$2]참조 연결이 실패하였습니다. ',
                            long: ''
                        },
                        6: {    // ES016
                            msg: '[$1]와 [$2]을 동시에 입력할 수 없습니다. ',
                            long: ''
                        },
                        7: {    // ES017
                            msg: '[$1]클래스는 [$2]을 구현해야 합니다. $3 ',
                            long: ''
                        },
                        8: {    // ES018
                            msg: '[$1]는 추상클래스는 생성할 수 없습니다.',
                            long: ''
                        },
                        9: {    // ES019
                            msg: '[$1] 컬렉션 등록에 실패하였습니다. [$2] ',
                            long: ''
                        },
                        10: {   // ES0110
                            msg: '[$1]을 [$2] 에서 가져오는데 실패하였습니다. $3 ',
                            long: ''
                        },
                        11: {   // ES0111
                            msg: '[$1]을 재정의해야 합니다. [$2]을 상속해서 재정의 하세요. ',
                            long: ''
                        },
                    },  
                    S02: {  // 타입
                        1: {    // ES021
                            msg: '[$1]는 [$2] 타입만 가능합니다.',
                            long: ''
                        },
                        2: {    // ES022
                            msg: '[$1]는 처리할 수 없는 타입니다. ',
                            long: ''
                        },
                        3: {    // ES023
                            msg: '[$1]타입은 [$2] 할 수 없습니다. ',
                            long: ''
                        },
                        4: {    // ES024
                            msg: '[$1]는 [$2]타입이 아닙니다. ',
                            long: ''
                        },
                        5: {    // ES025
                            msg: '[$1]는 타입이 존재하지 않습니다. ',
                            long: ''
                        },
                        6: {    // ES026
                            msg: '[$1] 타입이 없습니다. ',
                            long: ''
                        },
                        7: {    // ES027
                            msg: '[$1]타입의 [$2]이 없습니다. ',
                            long: ''
                        },
                    },
                    S03: {  // 객체
                        1: {    // ES031
                            msg: '[$1]는 객체가 아닙니다. ',
                            long: ''
                        },
                        2: {    // ES032
                            msg: '[$1]는 [$2]의 인스턴스가 아닙니다.',
                            long: ''
                        },
                        3: {    // ES033
                            msg: '[$1]는 [$2]인터페이스를 구현한 객체가 아닙니다. ',
                            long: ''
                        },
                        4: {    // ES034
                            msg: '[$1]의 객체가 [$2]와 다릅니다. ',
                            long: ''
                        },
                        4: {    // ES034
                            msg: '[$1]의 인스턴스는 처리할 수 없습니다. ',
                            long: ''
                        },
                    },
                    
                    S04: {  // 중복
                        1: {    // ES041
                            msg: '[$1]에 중복이 발생했습니다. ',
                            long: '$2'
                        },
                        2: {    // ES042
                            msg: '[$1]는 [$2]와 중복이 발생했습니다. ',
                            long: ''
                        },
                        3: {    // ES043
                            msg: '[$1]의 중복이 금지되어 있습니다.  ',
                            long: ''
                        },
                        4: {    // ES044
                            msg: '[$1]가 존재하여 [$2]를 재거 할 수 없습니다. ',
                            long: ''
                        },
                        5: {    // ES045
                            msg: '[$1]가 존재하여 [$2]를 추가 할 수 없습니다. ',
                            long: ''
                        },
                        6: {    // ES046
                            msg: '[$1]에 [$2]가 존재합니다. ',
                            long: ''
                        },
                        7: {    // ES047
                            msg: '[$1]에 [$2]가 존재하여, [$3]을 추가할 수 없습니다. ',
                            long: ''
                        },
                        8: {    // ES048
                            msg: '[$1]는 예약어 입니다. ',
                            long: ''
                        },
                    },
                    S05: {  // 필수
                        1: {    // ES051
                            msg: '필수값 [$1]이 없습니다. ',
                            long: ''
                        },
                        2: {    // ES052
                            msg: '[$1]에는 [$2]이 필요합니다. ',
                            long: ''
                        },
                        3: {    // ES053
                            msg: '[$1]에 [$2]이 존재하지 않습니다. ',
                            long: ''
                        },
                        4: {    // ES054
                            msg: '[$1]는 [$2]검사에서 유효하지 않습니다. 검사결과 : $3 ',
                            long: ''
                        },
                        5: {    // ES055
                            msg: '[$1]에 공백을 입력할 수 없습니다. ',
                            long: ''
                        },
                        6: {    // ES056
                            msg: '[$1]에 제약조건에 실패하였습니다. ',
                            long: '$2'
                        },
                    },
                    S06: {  // 범위
                        1: {    // ES061
                            msg: '[$1]의 size가 범위를 초과하였습니다.',
                            long: ''
                        },
                        2: {    // ES062
                            msg: '[$1]는 [$2]보다 작을 수가 없습니다. ',
                            long: ''
                        },
                        3: {    // ES063
                            msg: '[$1]와 [$2]의 길이가 다릅니다. ',
                            long: ''
                        },
                        4: {    // ES064
                            msg: '[$1]은 private 타입입니다. 직접 설정할 수 없습니다. 강제로 설정할 경우, [$2]을 사용해 설정하세요. ',
                            long: ''
                        },
                        5: {    // ES065
                            msg: 'and(&&) 조건 검사에 실패하였습니다. $1 ',
                            long: ''
                        },
                        6: {    // ES066
                            msg: 'or(||) 조건 검사에 실패하였습니다. $1 ',
                            long: ''
                        },
                        7: {    // ES067
                            msg: '[$1]의 범위는 [$2]에서 [$3]까지 입니다. ',
                            long: ''
                        },
                        8: {    // ES068
                            msg: '[$1]의 [$2] 규칙에 맞지 않습니다. ',
                            long: ''
                        },
                        9: {    // ES069
                            msg: '[$1] 조건 검사에 실패하였습니다. $2 ',
                            long: ''
                        },
                    },
                    S07: {  // util type
                        1: {    // ES071
                            msg: '파싱 : function 규칙이 아닙니다. "$1" ',
                            long: ''
                        },
                        2: {    // ES072
                            msg: '파싱 : function 에 argument, body 내용이 없습니다. "$1" ',
                            long: ''
                        },
                        3: {    // ES073
                            msg: '파싱 : function 파싱 실패 $1 ',
                            long: ''
                        },
                        4: {    // ES074
                            msg: '타입검사 : [$1]는 [$2] 타입입니다. ',
                            long: '',
                        },
                        5: {    // ES075
                            msg: '타입검사 : $1($2)타입에 $3 을 입력할 수 없습니다.',
                            long: '',
                        },
                        6: {    // ES076
                            msg: '타입검사 : $1 타입 검사에 실패하였습니다. origin choice type: [$2], target type: [$3] ',
                            long: '',
                        },
                        7: {    // ES077
                            msg: '타입검사 : $1 [$2] 타입은 사용할 수 없습니다.  ',
                            long: '',
                        },
                        8: {    // ES078
                            msg: '타입검사 : $1 [$2] 타입의 [$3] 번째 값이 없습니다.  ',
                            long: '',
                        },
                        9: {    // ES079
                            msg: '타입검사 : $1  $2 의 [$3] 객체가 없습니다. ',
                            long: '',
                        },
                        10: {   // ES0710
                            msg: '타입검사 : $1 $2 객체규칙 "$3"과 맞지 않습니다. ',
                            long: '',
                        },
                        11: {   // ES0711
                            msg: '타입검사 : $1 $2 타입검사에 실패하였습니다. $3 ',
                            long: '',
                        },
                        12: {   // ES0712
                            msg: '타입허용검사 : $1 타입의 default 값이 다릅니다. [ $2 !== $3 ]',
                            long: '',
                        },
                        13: {   // ES0713
                            msg: '타입허용검사 : 원본타입은 $1, 대상타입 $2 입니다. ',
                            long: '',
                        },
                        14: {   // ES0714
                            msg: '타입허용검사 : choice $1 타입에는 [$2]을 사용할 수 없습니다. ',
                            long: '',
                        },
                        15: {   // ES0715
                            msg: '타입허용검사 : choice $1 타입에는 사용할 수 없습니다. ',
                            long: '',
                        },
                        16: {   // ES0716
                            msg: '타입허용검사 : 대상 $1 가 더 큽니다. 원본: [$2] 대상: [$3]  ',
                            long: '',
                        },
                        17: {   // ES0717
                            msg: '타입허용검사 : 대상에 선택타입이 없습니다. origin choice type: [$1], target choice type: [$2] ',
                            long: '',
                        },
                        18: {   // ES0718
                            msg: '타입허용검사 : $1 조건이 거부되었습니다. $2 ',
                            long: '',
                        },
                        19: {   // ES0719
                            msg: '타입허용검사 : 대상은 $1 타입이 아닙니다. ',
                            long: '',
                        },
                        20: {   // ES0720
                            msg: '타입허용검사 : 배열(_SEQ_) 타입은 대상이 원본보다 같거나 커야합니다. origin choice type: [$1], target choice type: [$2] ',
                            long: '',
                        },
                        21: {   // ES0721
                            msg: '타입허용: $1 타입의 $2[$3] 원본길이와 다릅니다. ',
                            long: '',
                        },
                        22: {   // ES0722
                            msg: '타입허용검사 : $1 타입의 $2 조건이 거부되었습니다. $3 ',
                            long: '',
                        },
                        23: {   // ES0723
                            msg: '타입허용검사 : RegExp 객체의 source 가 서로 다릅니다. 원본: "$1", 대상: "$2" ',
                            long: '',
                        },
                        24: {   // ES0724
                            msg: '타입허용검사 : $1 타입의 생성 비교중 오류가 발생하였습니다. $2 ',
                            long: '',
                        },
                        25: {   // ES0725
                            msg: '타입허용검사 : $1 타입의 생성 객체가 서로 다릅니다. ',
                            long: '',
                        },
                        26: {   // ES0726
                            msg: '타입허용검사 : $1 타입이 거부되었습니다. $2 ',
                            long: '',
                        },
                        27: {   // ES0727
                            msg: '타입허용검사 : $1 타입에는 $2 타입을 거부합니다. target kind = $3 ',
                            long: '',
                        },
                        28: {   // ES0728
                            msg: '타입허용검사 : $1 타입에는 $2 타입만 허용합니다. target kind = $3 ',
                            long: '',
                        },
                        29: {   // ES0729
                            msg: '타입허용검사 : $1 의 _SEQ_, _OPT_, 타입을 지정해야 합니다. kind = $3 ',
                            long: '',
                        },
                        30: {   // ES0730
                            msg: '',
                            long: '',
                        },
                        31: {   // ES0731
                            msg: '$1이 choice(seq)가 아닙니다. kind = $3 ',
                            long: '',
                        },
                        32: {   // ES0732
                            msg: '원본 choice(seq) 보다 대상의 choice(seq)가 작습니다. origin choice(seq): $1, origin choice(seq): $2 ',
                            long: '',
                        },
                        33: {   // ES0733
                            msg: '원본 choice(seq)에 대상의 choice(seq)가 거부되었습니다. origin choice(seq): $1, origin choice(seq): $2 ',
                            long: '',
                        },
                        34: {   // ES0734
                            msg: '대상 choice(val)에 내용이 없습니다. ',
                            long: '',
                        },
                        35: {   // ES0735
                            msg: '처리할 수 없는 kind 타입니다. kind = $1 ',
                            long: '',
                        },
                        36: {   // ES0736
                            msg: '함수 args 가 원본보다 작습니다. origin args=$1, target args=$2 ',
                            long: '',
                        },
                        37: {   // ES0737
                            msg: '함수 return 타입이 없습니다. ',
                            long: '',
                        },
                        38: {   // ES0738
                            msg: '$1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                            long: '',
                        },
                        39: {   // ES0739
                            msg: '[$1]에는 하나 이상의 요소가 존재해야 합니다.',
                            long: '',
                        },
                        40: {   // ES0740
                            msg: '[$1]는 [$2]과 다릅니다. ',
                            long: '',
                        },
                        41: {   // ES0741
                            msg: '[$1]는 어떤 값도 설정할 수 없습니다. ',
                            long: '',
                        },

                    },
                    L01: {  // 위치 기준 발생 에서
                        100: {  // util-type : match
                            msg: '',
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
                            msg: '배열 매치 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },
                        121: {  // EL01121  
                            msg: '초이스 매치 : choice(_ANY_) 타입에 \'undefined\' 은 사용할 수 없습니다.',
                        },
                        122: {  // EL01122  
                            msg: '초이스 매치 : choice(_NON_) 타입에 \'undefined\' 만 가능합니다.',
                        },
                        123: {  // EL01123  
                            msg: '초이스 매치 : choice(_ERR_) 타입에 Errror 인스턴스 만 가능합니다.',
                        },
                        // 124: {  // EL01124  
                        //     msg: '타입매치 : [$1]는 어떤 값도 설정할 수 없습니다. ',
                        // },
                        // 125: {  // EL01125  
                        //     msg: '타입매치 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        // },
                        126: {  // EL01126  
                            msg: '초이스 매치 : choice(_EUM_) 타입의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
                        },
                        // 127: {  // EL01127  
                        //     msg: '타입매치 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        // },
                        128: {  // EL01128  
                            msg: '초이스 매치 : choice(_DEF_) 타입의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
                        },
                        129: {  // EL01129  
                            msg: '초이스 매치 : choice 세부 타입 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },
                        131: {  // EL01131
                            msg: '클래스 매치 : class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1)',
                        },
                        132: {  // EL01132  
                            msg: '클래스 매치 : target은 [$1]의 인스턴스가 아닙니다.',
                        },
                        133: {  // EL01133
                            msg: '클래스 매치 : target 이 class, object, union 타입이 아닙니다. tarType: $1',
                        },
                        141: {  // EL01141 
                            msg: '유니언 매치 : target 은 union 타입이 아닙니다. tarType: $1',
                        },
                        142: {  // EL01142 
                            msg: '유니언 매치 : target[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
                        },
                        143: {  // EL01143 
                            msg: '유니언 매치 : \'$1\' 타입 검사가 실패하였습니다.',
                        },
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
                        
                        200: {  // util-type : allow
                            msg: ''
                        },
                        201: {  // EL01201   
                            msg: '타입 허용 : $1 의 세부 타입을 지정해야 합니다. $1: $2',
                        },
                        202: {  // EL01202  
                            // msg: '타입 허용 : $1(_ALL_)에 $1(_ERR_) 타입은 거부됩니다. extType: $2, tarType: $3',
                            msg: '타입 허용 : $1(_ALL_) 타입에 $1(_ERR_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        203: {  // EL01203  
                            msg: '타입 허용 : $1(_NON_) 타입에 $1(_NON_) 타입만 허용합니다. tarType: $2',
                        },
                        204: {  // EL01204  
                            msg: '타입 허용 : $1(_ANY_) 타입에 $1(_ALL_, _OPT_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        205: {  // EL01205  
                            msg: '타입 허용 : $1(_ERR_) 타입에 $1(_ERR_) 타입만 허용합니다. tarType: $2',
                        },
                        206: {  // EL01206  
                            msg: '타입 허용 : $1(_OPT_) 타입에 $1(_ALL_, _ANY_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        207: {  // EL01207  
                            msg: '타입 허용 : $1(_REQ_) 타입에 $1(_ALL_, _ANY_, _OPT_, _NON_, _ERR_) 타입을 허용하지 않습니다. tarType: $2',
                        },
                        // 208: {  // EL01208  
                        //     msg: '타입 허용 : $1(_SEQ_) 타입에 $1(_SEQ_) 타입만 허용합니다. tarType: $2',
                        // },
                        209: {  // EL01209  
                            msg: '타입 허용 : $1 타입의 리터럴 값과 다릅니다. extType = $2, tarType = $3',
                        },
                        '20A': {    // EL0120A  
                            msg: '타입 허용 : $1 타입이 아닙니다. tarType = $2',
                        },
                        '20B': {    // EL0120B  
                            msg: '타입 허용 : 처리할 수 없는 타입입니다.',
                        },
                        211: {  // EL01211  
                            msg: '배열 허용 : array 타입이 아닙니다. tarType: $1',
                        },
                        212: {  // EL01212  
                            msg: '배열 허용 : 대상은 $1 타입이 아닙니다. ',
                        },
                        213: {  // EL01213  
                            msg: '배열 허용 : array(_ANY_) 타입은 tarType 의 array 의 요소가 하나 이상 가지고 있어야 합니다. tarType.length = $1',
                            // msg: '배열 허용 : 배열(_SEQ_) 타입은 대상이 원본보다 같거나 커야합니다. origin choice type: [$1], target choice type: [$2] ',
                        },
                        214: {  // EL01214  
                            msg: '배열 허용 : array(_SEQ_) 타입에 array(_SEQ_) 타입만 허용합니다. tarType: $1',
                            // msg: '배열 허용 : 대상은 $1 타입이 아닙니다. ',
                        },
                        215: {  // EL01215  
                            msg: '배열 허용 :extType 의 array(_SEQ_) 타입의 길이보다 tarType 은 같거나 커야합니다. extType.length = $1, target.length = $2',
                            // msg: '배열 허용 : 배열(_SEQ_) 타입은 대상이 원본보다 같거나 커야합니다. origin choice type: [$1], target choice type: [$2] ',
                        },
                        216: {  // EL01216  
                            msg: '배열 매치 : array(_SEQ_) [$1]번째 타입 검사가 실패하였습니다.',
                            // msg: '배열 허용 : $1 $2 타입검사에 실패하였습니다. $3 ',
                        },
                        // 217: {  // EL01217  ES0717
                        //     msg: '배열 허용 : 대상에 선택타입이 없습니다. origin choice type: [$1], target choice type: [$2] ',
                        // },
                        // 218: {  // EL01218  ES0735
                        //     msg: '배열 허용 : 처리할 수 없는 kind 타입니다. ',
                        // },
                        219: {  // EL01219  
                            msg: '배열 허용 : array 요소 검사가 실패하였습니다. extType: $1, tarType: $2',
                        },
                        221: {  // EL01221  
                            // msg: '초이스 허용 : choice $1 타입에는 [$2]을 사용할 수 없습니다. ',
                            msg: '초이스 허용 : choice(_ANY_) 타입에 \'undefined\' 타입은 사용할 수 없습니다.',
                        },
                        222: {  // EL01222  
                            msg: '초이스 허용 : choice(_ERR_) 타입에 choice(_ERR_) 타입만 가능합니다.',
                            // msg: '초이스 허용 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        223: {  // EL01223 
                            msg: '초이스 허용 :  choice(_NON_) 타입에 choice(_NON_) 타입만 가능합니다.',
                        },
                        224: {  // EL01224 
                            msg: '초이스 허용 : choice(_EUM_) 타입에 choice(_EUM_) 타입만 가능합니다.',
                        },
                        // 225: {  // EL01225 
                        //     msg: '초이스 허용 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        // },
                        // 226: {  // EL01226 
                        //     msg: '초이스 허용 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        // },
                        227: {  // EL01227  
                            msg: '초이스 매치 : choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. extType[$1]: $2',
                        },
                        228: {  // EL01228  
                            msg: '초이스 매치 : tarType choice(_EUM_) 의 세부 타입은 리터럴만 가능합니다. tarType[$1]: $2',
                        },
                        229: {  // EL01229  
                            msg: '초이스 허용 : choice(_DEF_) 타입에 choice(_DEF_) 타입만 가능합니다.',
                        },
                        // '22A': {    // EL0122A 
                        //     msg: '초이스 허용 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        // },
                        // '22B': {    // EL0122B 
                        //     msg: '초이스 허용 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        // },
                        '22C': {    // EL0122C  
                            msg: '초이스 허용 : extType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. extType[0]: $1',
                        },
                        '22D': {    // EL0122D  
                            msg: '초이스 허용 : tarType choice(_DEF_) 의 첫번째 세부 타입은 리터럴만 가능합니다. tarType[0]: $1',
                        },
                        // '22E': {    // EL0122E  
                        //     msg: '초이스 허용 : 처리할 수 없는 kind 타입니다. kind = $1 ',
                        // },
                        // '22F': {    // EL0122F  
                        //     msg: '초이스 허용 : 대상에 선택타입이 없습니다. origin choice type: [$1], target choice type: [$2] ',
                        // },
                        '22G': {    // EL0122G  
                            // msg: '초이스 허용 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                            msg: '초이스 허용 : tarType[$1] = $3 타입에 허용하는 extType 이 없습니다. extType = $2',
                        },
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
                        241: {  // EL01241  
                            msg: '유니언 허용 : tarType 은 union 타입이 아닙니다. tarType: $1',
                            // msg: '유니언 허용 : [$1]는 [$2]타입이 아닙니다. ',
                        },
                        242: {  // EL01242  
                            msg: '유니언 허용 : tarType[\'$1\'] 키가 존재하지 않습니다. extType[\'$1\'] = $2',
                            // msg: '유니언 허용 : $1 타입이 거부되었습니다. $2 ',
                        },
                        243: {  // EL01243  
                            msg: '유니언 허용 : \'$1\' 타입 검사가 실패하였습니다.',
                            // msg: '유니언 허용 : $1 타입이 거부되었습니다. $2 ',
                        },
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

                        300: {  // util-type : etc
                            msg: ''
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
                        '30B': {  // EL0131B  
                            msg: '타입 매치 : matchType(extType, target) 검사가 실패하였습니다.'
                        },
                    }
                    /**
                     * 네임스페이스 기준으로 분리하면 적합할 듯
                     * L01 : Common.*       message.js<제외>, extend-error.js<자체>, util.js, util-type.js, observer.js, load-namespace.js <없음>
                     *  - 100 : util-type match
                     *  - 200 : util-type allow
                     *  - 300 : util-type etc
                     *  - 
                     * L02 : Interface.*    i-*.js 
                     * L03 : Meta.*         meta-object.js, meta-element.js, namespace-manager.js, meta-register.js
                     * L04 : Collection.*   trans-queue.js, base-collection.js, collection-*.js
                     * L05 : Meta.Entity.*  base-column.js, base-entity.js, meta-column.js, object-column.js, meta-row.js, meta-set.js, meta-table.js, meta-view.js
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
                if (!__STORAGE[val]) throw new Error('The ['+ val +'] language does not exist.');
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
            var MSG = __STORAGE[lang];
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

            if (typeof obj !== 'object') return _intro(code) + 'There are no messages about the code.' 
            
            msg = _build(obj.msg);
            if (isLong) {
                long = _build(obj.long);
                if (long.length > 0) msg += '\n' + long;
            }
            return _intro(code) + msg;

            // inner function
            function _build(p_msg) {
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
            function _intro(code) {
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
         * 코드에 값을 매칭하여 리턴
         * @param {string} p_code 코드
         * @param {array<string>} p_aValue $1, $2... 매창값
         * @returns {string}
         */
        Message.get = function(p_code, p_aValue) {
            return _buildMessage(p_code, p_aValue);
        };

        /**
         * 코드에 대한 정보
         * @param {string} p_code 
         * @returns {object}
         */
        Message.getInfo = function(p_code) {
            return _getCodeObject(p_code);
        };

        /**
         * 예외 리턴, throw new Error(...) 
         * @param {string} p_code 코드
         * @param {array<string>} p_aValue $1, $2... 매창값
         */
        Message.error = function(p_code, p_aValue) {
            throw new Error(Message.get(p_code, p_aValue));
        };

        /**
         * 경로 리턴, console.warn(...)
         * @param {string} p_code 코드
         * @param {array<string>} p_aValue $1, $2... 매창값
         */
        Message.warn = function(p_code, p_aValue) {
            console.warn(Message.get(p_code, p_aValue));
        };

        /**
         * 초기화
         */
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