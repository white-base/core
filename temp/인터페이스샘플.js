'use strict';
/**
 * 타입스크립를 참조 하되 모든 기능 구현의 목적이 아니다.
 * - 자료형 종류
 *  + 원시타입 : undefined, null, String, Number, Boolean, Symbol(ES6+)
 *  + 참조타입 : Object <- Function
 *                    <- RegExp, Array, Data
 * 
 * - 참조타입
 *  + Array, [] : 배열타입
 *      + [String, Number] : 타입의 나열 (AND 도는 OR 조건으로 활용)
 *  + Object, {} : 객체타입
 *      + {name: String} : 타입의 구조를 나열
 *  + Function, 함수명 : 함수타입
 *  +
 * - 원시타입
 *  + undefined :
 *  + null : null 
 * - 힌트 & 아이디어
 *  + 인스턴스 검사의 역활로 사용함
 */

var type1 = String;     // 필수
var type1 = ''          // 선택, 기본값
var type2 = Number;     // 필수
var type2 = 0;          // 선택, 기본값
var type3 = Boolean;    // 필수
var type3 = true;       // 선택, 기본값    
var type4 = null;       // any
var type5 = undefined;
var type6 = Object;     // 타입만 정의, 선택값 없음
var type6 = {};         // 지정 기본값
var type7 = Array;      // 필수, 기본값, 타입지정 없음, 필요시 컬렉션 사용
var type8 = Function;   // 모든함수 타입
var type8 = CustFun;    // 사용자함수 인스턴스
var type9 = [];         // 타입의 그룹 (타입 내부에서는 OR 조건)
var type9 = [String, 0] // String 타입이 아니고, 정수형타입이면 0 할당
var type9 = [0, String] // 정수이면 0 할당, 아니면 문자열 검사
var type9 = [Number, String] // 정수와 문자열이 아니면 실패
// 타입에서 [] 은 기본값 배치는 맨뒤에 배치한ㄷ, 앞에 배치하면 뒤에는 무시됨



var list = Array;
var list = [Number];   // 배열에 String 만 들어가야게할것인지, 그룹의 의미랑 혼선이 있음
var list = [Number, String];
/**
 * let list: number[] = [1, 2, 3];
 * let list: Array<number> = [1, 2, 3]; // 단일타입
 * let list: Array<number | string> = [1, 'a']; // 복합타입
 */

// 예시
var type2 = function() {
    this.name = String;
    this.class = {
        name: String,
        level: Number 
    }
    this.count = Array;
    this.course = [];   // 타입제한 필요시 ArrayCollection.elementType 사용
}

/**
 * return : [true | str] 
 *  문제점 : str 은 true 의 역활의 의미도 있음, 혼선의 가능성
 * 예외를 try 로 담으면 true false 로 변형가능함, 메세지도 리턴가능
 * 
 * checkType(types...) : boolean
 * 
 * 
 */

/**
 * 메세지는 어떻게 관리할 것인가?
 * 
 * util 내부 설계
 *  checkType(target, types..) : boolean [하나만 통과되는지 검사]
 *  checkTypeAll(target, types..) : boolean  [모두 통과되는지 검사]
 * 
 * 주사용처
 *  - 생성자()
 *      + Util.implements(this, Class...) : 실행시점에 검사함
 *      + checkTypeAll() => 예외처리
 *  - BaseCollection._getPropDescriptor() : 자료 삽입 시점에 검사함
 *      + Util.checkType() 호출 => 예외호출
 * 
 */

class ICollection{
    attr = Number;
}

if (this.instanceOf(ICollection)) {
    this.attr = 10;
    
}
