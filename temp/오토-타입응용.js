class AutoA extends Automation {
    /**
     * 제목을 설정합니다.
     * @type {string}
     */
    title = '';

    /**
     * 제목을 넓이를 설정합니다.
     * @type {number}
     */
    size = 0;

    /**
     * 뷰를 설정합니다.
     * @type {function}
     */
    setView = function() {/** */}
    
    /**
     * 뷰를 얻는다. [선택]
     * @type {function}
     */
    proView = function() {/** */}

    constructor(){
        super();
    }
}
// inteface define
AutoA._TYPE = {
    title: String,                                  // [필수]
    size: [['_req_', Number, Boolean]],             // [필수]
    seeView: ([[Number, String]])=>{[[Boolean]]},   // 선택
    proView: (Number, String)=>{},                  // [필수]
    delView: {
        $kind: 'function',                          // POINT:
        args: [Number, 'str'], 
        return: Boolean 
    },  // 기본값 삽입 가능
}

var m1 = new AutoA();
var m2 = new AutoA();
var m3 = new AutoA();

m1.title = '상위 페이지'
m1.size = 20;
this.super(m1);

m2.title = '하위 페이지'
m2.size = 20;
this.sub(m2);

var fun1 = function(num, arr) { 
    /** 함수본문 */
    return true;
};
fun1._TYPE = {args: [String, Number], return: Boolean};

m3.title = '임시 페이지'
m3.size = 20;
m3.setView = fun1;
this.sub(m3);


var aa = String;
var aa = [['_opt_', String]];

var aa = String;
var aa = [[String]];

var bb = [[String, Number]];            // 선택
var aa = [['_opt_', String, Number]];   // 필수


//_________________________
/**
 * - 타입의 중요성
 * - 모든 타입의 표현가능 
 * - 오토의 핵심기능 조립
 * - 조립의 명료한 구현
 * - 모든 소프트웨어를 조립할 수 있게 된다.
 * 
 * 이슈
 * - 선택적 함수는 어떻게 표현하야 할지...
 * 
 * - 함수는 직접 선언하는 경우와, 간접적으로 선언하는 방법이 있다.
 * 
 */

var unionType = {       // 조합
    // union
    union: Math,        // 조합
    // primitive
    num: Number,        // 숫자 필수
    num: [[Number]],    // 숫자 선택
    num: 10,            // 숫자 선택(기본값)
    // function
    fun: ()=>{},                // 모든 함수
    fun: (String)=>{Boolean},   // 정의된 함수 
    // class
    class: RegExp,      // 클래스(내장)
    class: Date,        // 클래스(내장)
    // object  
    obj: /reg/,         // 객체(정규식)
    obj: new Date(),    // 객체(날짜)
    obj: {},            // 객체
    // array
    arr: Array,                     // 모든 배열
    arr: [],                        // 모든 배열
    arr: [String, Number],          // 문자.숫자 선택 배열 
    arr: ['_opt_', String, Number], // 문자.숫자 선택 배열 
    arr: ['_req_', String, Number], // 문자.숫자 필수 배열
    arr: ['_seq_', String, Number], // 1:문자, 2:숫자 필수 배열
    arr: ['_all_'],                 // 모든 배열
    arr: ['_any_'],                 // length > 0  배열
    arr: ['_non_'],                 // 아니다, 특수한 경우(리턴 타입)
    // choice
    opt: [[String, Number]],            // 문자.숫자 선택
    opt: [['_opt_', String, Number]],   // 문자.숫자 선택
    opt: [['_req_', String, Number]],   // 문자.숫자 필수
    opt: [['_all_']],                   // 모든 타입
    opt: [['_any_']],                   // undefiend 제외 타입
    opt: [['_non_']],                   // 아니다,  특수한 경우(리턴 타입)
}
