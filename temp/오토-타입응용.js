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

