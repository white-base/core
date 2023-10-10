/**
 * 어떤것이 가장 자연스러운 인터페이스 구조일가?
 * - 직관적이고
 * - 의미나 구조적으로 명료하고
 * - 효율적이고 (성능)
 */


// ES5
function IType() {
}
function IList() {
}
function SuperA() {
 // ...
}
//-------------------------
// 기존 구조
function ClassA() {
    ISuper.call(this);
    // ....
    Util.implements(this, IType, IList); // 문제점 : 한번 실행전에는 확인 불가, 인터페이스는 클래스 계층이다.
}
Util.inherits(ClassA, SuperA);
//-------------------------
// 방식 A-2  [*****]  POINT:
function ClassA() {
    ISuper.call(this);
    // ....
    Util.implements(this);
}
Util.inherits(ClassA, SuperA);
ClassA._UNION = [IType, IList];
//-------------------------
// 방식 A-1
function ClassA() {
    ISuper.call(this);
    // ....
}
Util.inherits(ClassA, SuperA);
ClassA._INTERFACE = [IType, IList];    // 문제점 : 인터페이스는 특수한 and 조건이 맞아야함
//-------------------------
// 방식 A-2
function ClassA() {
    ISuper.call(this);
    // ....
}
Util.inherits(ClassA, SuperA);
ClassA._TYPE = [IType, IList];     // 문제점 : _TYPE 은 객체로 사용한다.
//-------------------------
// 방식 A-3
function ClassA() {
    ISuper.call(this);
    // ....
}
Util.inherits(ClassA, SuperA);
Util.implements(ClassA, IType, IList); // 생성자에 메소드를 또 추가해야 한다.


//-------------------------
// 방식 B-1
function ClassA() {
    ISuper.call(this);
    // ....
    this.isImplement();
}
Util.inherits(ClassA, SuperA);
Util.implements(ClassA, IType)
//-------------------------
// 방식 B-2
function ClassA() {
    ISuper.call(this);
    // ....
    this.isImplement();
}
Util.inherits(ClassA, SuperA);
ClassA._INTERFACE = [IType];
//-------------------------
// 방식 B-3
function ClassA() {
    ISuper.call(this);
    // ....
}
Util.inherits(ClassA, SuperA);
ClassA._TYPE = {inteface: []};



//#######################
// ES6+
class ClassA extends Super {
    constructor(){
        super();
        //.....
        Util.implements(this, IType, IList); 
    }
}
//-------------------------
// 방식 A [*****]  POINT:
class ClassA extends Super {    
    constructor(){
        super();
        //.....
        Util.implements(this); 
    }
}
ClassA._UNION = [IType, IList];
