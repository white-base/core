

function IType() {
}
function IList() {
}

class Super {}
class ClassA extends Super {
    constructor(){
        super();
        //.....
        // Util.implements(this); 
    }
}
ClassA._UNION = [IType, IList];


console.log(0);