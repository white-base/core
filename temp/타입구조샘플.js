
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
 * - 
 */