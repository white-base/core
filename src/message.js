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
                        101: {  // EL01101  ES0729
                            msg: '타입매치검사 : $1의 세부 타입을 지정해야 합니다. extType: $2',
                        },
                        102: {  // EL01102  ES074
                            msg: '타입매치검사 : target 은 \'null\' 타입이 아닙니다. tarType: $1,',
                        },
                        103: {  // EL01103  ES022
                            msg: '타입매치검사 : [$1]는 처리할 수 없는 타입니다. ',
                        },
                        111: {  // EL01111  ES024
                            msg: '타입매치검사 : [$1]는 [$2]타입이 아닙니다. ',
                        },
                        112: {  // EL01112  ES0738
                            msg: '타입매치검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        113: {  // EL01113  ES075
                            msg: '타입매치검사 : $1($2)타입에 $3 을 입력할 수 없습니다.',
                        },
                        114: {  // EL01114  ES0740
                            msg: '타입매치검사 : [$1]는 [$2]과 다릅니다. ',
                        },
                        115: {  // EL01115  ES0740
                            msg: '타입매치검사 : [$1]는 [$2]과 다릅니다. ',
                        },
                        116: {  // EL01116  ES0717
                            msg: '타입매치검사 : 대상에 선택타입이 없습니다. origin choice type: [$1], target choice type: [$2] ',
                        },
                        117: {  // EL01117  ES076 
                            msg: '타입매치검사 : $1 타입 검사에 실패하였습니다. origin choice type: [$2], target type: [$3] ',
                        },
                        121: {  // EL01121  ES0714
                            msg: '타입매치검사 : choice $1 타입에는 [$2]을 사용할 수 없습니다. ',
                        },
                        122: {  // EL01122  ES0741
                            msg: '타입매치검사 : [$1]는 어떤 값도 설정할 수 없습니다. ',
                        },
                        123: {  // EL01123  ES0738
                            msg: '타입매치검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        124: {  // EL01124  ES021
                            msg: '타입매치검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        125: {  // EL01125  ES0738
                            msg: '타입매치검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        126: {  // EL01126  ES021
                            msg: '타입매치검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        127: {  // EL01127  ES076
                            msg: '타입매치검사 : $1 타입 검사에 실패하였습니다. origin choice type: [$2], target type: [$3] ',
                        },
                        131: {  // EL01131
                            msg: '타입매치검사 : class 타입을 union 타입으로 생성 후 검사에 실패하였습니다. (opt = 1) ',
                        },
                        132: {  // EL01132  ES032
                            msg: '타입매치검사 : [$1]는 [$2]의 인스턴스가 아닙니다.',
                        },
                        133: {  // EL01133
                            msg: '타입매치검사 : 대상이 class, object, union 타입이 아닙니다. ',
                        },
                        141: {  // EL01141  ES024
                            msg: '타입매치검사 : [$1]는 [$2]타입이 아닙니다. ',
                        },
                        142: {  // EL01142  ES031
                            msg: '타입매치검사 : [$1]는 객체가 아닙니다. ',
                        },
                        143: {  // EL01143  ES027
                            msg: '타입매치검사 : [$1]타입의 [$2]이 없습니다. ',
                        },
                        144: {  // EL01144  ES000
                            msg: '타입매치검사 : \'$1\' union 객체 타입 검사가 실패하였습니다. '
                        },
                        151: {  // EL01151  ES024
                            msg: '타입매치검사 : [$1]는 [$2]타입이 아닙니다. ',
                        },
                        152: {  // EL01152  ES024
                            msg: '타입매치검사 : [$1]는 [$2]과 다릅니다. ',
                        },
                        153: {  // EL01153  ES0740
                            msg: '타입매치검사 :[$1]는 [$2]과 다릅니다. ',
                        },
                        154: {  // EL01154  ES079
                            msg: '타입매치검사 : $1  $2 의 [$3] 객체가 없습니다. ',
                        },
                        155: {  // EL01155  ES0710
                            msg: '타입매치검사 : $1 $2 객체규칙 "$3"과 맞지 않습니다. ',
                        },
                        156: {  // EL01156  ES0711
                            msg: '타입매치검사 : $1 $2 타입검사에 실패하였습니다. $3 ',
                        },
                        157: {  // EL01157  ES0711
                            msg: '타입매치검사 : $1 $2 타입검사에 실패하였습니다. $3 ',
                        },
                        
                        200: {  // util-type : allow
                            msg: ''
                        },
                        201: {  // EL01201  ES0729 
                            msg: '타입허용검사 : $1의 세부 타입을 지정해야 합니다. extType: $2',
                        },
                        202: {  // EL01202  ES0727
                            msg: '타입허용검사 : $1(_ALL_)에 $1(_ERR_) 타입은 거부됩니다. extType: $2, tarType: $3',
                        },
                        203: {  // EL01203  ES0728
                            msg: '타입허용검사 : $1 타입에는 $2 타입만 허용합니다. target kind = $3 ',
                        },
                        204: {  // EL01204  ES0727
                            msg: '타입허용검사 : $1 타입에는 $2 타입을 거부합니다. target kind = $3 ',
                        },
                        205: {  // EL01205  ES0728
                            msg: '타입허용검사 : $1 타입에는 $2 타입만 허용합니다. target kind = $3 ',
                        },
                        206: {  // EL01206  ES0728
                            msg: '타입허용검사 : $1 타입에는 $2 타입만 허용합니다. target kind = $3 ',
                        },
                        207: {  // EL01207  ES0727
                            msg: '타입허용검사 : $1 타입에는 $2 타입을 거부합니다. target kind = $3 ',
                        },
                        208: {  // EL01208  ES078
                            msg: '타입검사 : $1 [$2] 타입의 [$3] 번째 값이 없습니다.  ',
                        },
                        209: {  // EL01209  ES0712
                            msg: '타입허용검사 : $1 타입의 default 값이 다릅니다. [ $2 !== $3 ]',
                        },
                        '20A': {    // EL0120A  ES0713
                            msg: '타입허용검사 : 원본타입은 $1, 대상타입 $2 입니다. ',
                        },
                        211: {  // EL01211  ES0719
                            msg: '타입허용검사 : 대상은 $1 타입이 아닙니다. ',
                        },
                        212: {  // EL01212  ES0719
                            msg: '타입허용검사 : 대상은 $1 타입이 아닙니다. ',
                        },
                        213: {  // EL01213  ES0720
                            msg: '타입허용검사 : 배열(_SEQ_) 타입은 대상이 원본보다 같거나 커야합니다. origin choice type: [$1], target choice type: [$2] ',
                        },
                        214: {  // EL01214  ES0719
                            msg: '타입허용검사 : 대상은 $1 타입이 아닙니다. ',
                        },
                        215: {  // EL01215  ES0720
                            msg: '타입허용검사 : 배열(_SEQ_) 타입은 대상이 원본보다 같거나 커야합니다. origin choice type: [$1], target choice type: [$2] ',
                        },
                        216: {  // EL01216  ES0711
                            msg: '타입허용검사 : $1 $2 타입검사에 실패하였습니다. $3 ',
                        },
                        217: {  // EL01217  ES0717
                            msg: '타입허용검사 : 대상에 선택타입이 없습니다. origin choice type: [$1], target choice type: [$2] ',
                        },
                        218: {  // EL01218  ES0735
                            msg: '타입허용검사 : 처리할 수 없는 kind 타입니다. ',
                        },
                        219: {  // EL01219  ES0738
                            msg: '타입허용검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        221: {  // EL01221  ES0714
                            msg: '타입허용검사 : choice $1 타입에는 [$2]을 사용할 수 없습니다. ',
                        },
                        222: {  // EL01222  ES021
                            msg: '타입허용검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        223: {  // EL01223  ES0734
                            msg: '타입허용검사 : 대상 choice(val)에 내용이 없습니다. ',
                        },
                        224: {  // EL01224  ES021
                            msg: '타입허용검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        225: {  // EL01225  ES0738
                            msg: '타입허용검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        226: {  // EL01226  ES0738
                            msg: '타입허용검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        227: {  // EL01227  ES021
                            msg: '타입허용검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        228: {  // EL01228  ES021
                            msg: '타입허용검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        229: {  // EL01229  ES021
                            msg: '타입허용검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        '22A': {    // EL0122A  ES0738
                            msg: '타입허용검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        '22B': {    // EL0122B  ES0738
                            msg: '타입허용검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        '22C': {    // EL0122C  ES021
                            msg: '타입허용검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        '22D': {    // EL0122D  ES021
                            msg: '타입허용검사 : [$1]는 [$2] 타입만 가능합니다.',
                        },
                        '22E': {    // EL0122E  ES0735
                            msg: '타입허용검사 : 처리할 수 없는 kind 타입니다. kind = $1 ',
                        },
                        '22F': {    // EL0122F  ES0717
                            msg: '타입허용검사 : 타입허용검사 : 대상에 선택타입이 없습니다. origin choice type: [$1], target choice type: [$2] ',
                        },
                        '22G': {    // EL0122G  ES0738
                            msg: '타입허용검사 : $1 대상 $2 의 대한 원본에서 허용하는 타입이 없습니다.  ',
                        },
                        231: {  // EL01231  ES0724
                            msg: '타입허용검사 : $1 타입의 생성 비교중 오류가 발생하였습니다. $2 ',
                        },
                        232: {  // EL01232  ES0724
                            msg: '타입허용검사 : $1 타입의 생성 비교중 오류가 발생하였습니다. $2 ',
                        },
                        233: {  // EL01233  ES0725
                            msg: '타입허용검사 : $1 타입의 생성 객체가 서로 다릅니다. ',
                        },
                        241: {  // EL01241  ES024
                            msg: '타입허용검사 : [$1]는 [$2]타입이 아닙니다. ',
                        },
                        242: {  // EL01242  ES0726
                            msg: '타입허용검사 : $1 타입이 거부되었습니다. $2 ',
                        },
                        251: {  // EL01251  ES0713
                            msg: '타입허용검사 : 원본타입은 $1, 대상타입 $2 입니다. ',
                        },
                        252: {  // EL01252  ES0740
                            msg: '타입허용검사 : [$1]는 [$2]과 다릅니다. ',
                        },
                        253: {  // EL01253  ES0740
                            msg: '타입허용검사 : [$1]는 [$2]과 다릅니다. ',
                        },
                        254: {  // EL01254  ES079
                            msg: '타입허용검사 : $1  $2 의 [$3] 객체가 없습니다. ',
                        },
                        255: {  // EL01255  ES0710
                            msg: '타입허용검사 : $1 $2 객체규칙 "$3"과 맞지 않습니다. ',
                        },
                        256: {  // EL01256  ES0711
                            msg: '타입허용검사 : $1 $2 타입검사에 실패하였습니다. $3 ',
                        },
                        257: {  // EL01257  ES0711
                            msg: '타입허용검사 : $1 $2 타입검사에 실패하였습니다. $3 ',
                        },
                        258: {  // EL01258  ES024
                            msg: '타입허용검사 : [$1]는 [$2]타입이 아닙니다. ',
                        },

                        300: {  // util-type : etc
                            msg: ''
                        },
                        301: {  // EL01301  ES071
                            msg: '파싱 : function 규칙이 아닙니다. "$1" ',
                        },
                        302: {  // EL01302  ES072
                            msg: '파싱 : function 에 argument, body 내용이 없습니다. "$1" ',
                        },
                        303: {  // EL01303  ES073
                            msg: '파싱 : function 파싱 실패 $1 ',
                        },
                        304: {  // EL01304  ES022
                            msg: '[$1]는 처리할 수 없는 타입니다. ',
                        },
                        305: {  // EL01305  ES022
                            msg: '[$1]는 처리할 수 없는 타입니다. ',
                        },
                        306: {  // EL01306  ES022
                            msg: '[$1]는 처리할 수 없는 타입니다. ',
                        },
                        307: {  // EL01307  ES022
                            msg: '[$1]는 처리할 수 없는 타입니다. ',
                        },
                        308: {  // EL01308  ES022
                            msg: '[$1]는 처리할 수 없는 타입니다. ',
                        },
                        309: {  // EL01309  ES069
                            msg: 'allowType(extType, tarType) 검사가 실패하였습니다.'
                        },
                        310: {  // EL01310  ES069
                            msg: 'matchType(extType, target) 검사가 실패하였습니다.'
                        },
                    }
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
                    msg = msg.replace('$'+ i, val);
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