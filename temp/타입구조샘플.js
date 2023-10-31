
var fun1 = function() {};
fun1._TYPE = {}


var fun2 = {
    $kind: '',  // 메타객체를 식별하는 코드가 필요함
    $name: 'function',  // 의미적으로 맞기는 하지만, 다른곳에서 쓰임이 확인 안됨!!
    $type: 'function',
    args: [],   /** ==> [__SEQ__,...] */
    return: ['_NON_']
}
/**
 * 객체로 강제 삽입 할 수 있는 대상은
 * - 함수
 * - 클래스
 */

var fun1 = {    // 일반 함수
    $type: 'function',
    args: [],
    return: null
}
var fun1 = {    // 선택형 함수
    $type: 'function',
    kind: '__OPT__',    // choice로 래핑해서 처리함
    args: [],
    return: null
}
var class1 = {
    $type: 'class',
    $choice: '__OPT__',
    aa: String,
    bb: {
        cc: Number,
        dd: Boolean
    }
}
var array1 = {
    $type: 'array',
    $choice: '__SEQ__',
    list: [String, Number]
}
var choice1 = {
    $type: 'choice',
    list: [String, Number]
}

/**
 * union : 조합
 */
var fun1 = {    // 함수 타입
    $type: 'function',
    params: [],
    return: null
}
var fun1 = {    // 함수 타입(선택)
    $type: 'function',
    $kind: '__OPT__',
    params: [],
    return: null
}
var class1 = {  // 조합 타입(선택)
    $type: 'union',
    $kind: '__OPT__',
    aa: String,
    bb: {
        cc: Number,
        dd: Boolean
    }
}
var array1 = {  // 배열 타입(순차)
    $type: 'array',
    $kind: '__SEQ__',
    list: [String, Number]
}
var choice1 = {
    $type: 'choice',
    list: [String, Number]
}
