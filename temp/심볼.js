// let id = Symbol("id");


let user = { // 서드파티 코드에서 가져온 객체
    name: "John"
    };
    
    let id = Symbol("id");
    let id2 = Symbol();
    
    user[id] = 1;
    id = Symbol();
    user[id] = 2;
    user[id] = 3;
    // user[id2] = 2;

    let ss = Symbol
    
    
    // console.log(user[id]);
    console.log(Object.getOwnPropertyNames(user)); 
    console.log(Object.getOwnPropertySymbols(user));
    // console.log(id2);
    console.log(user[id]);
    

    let dd = new Date();


var a = {aa:1, bb:3}

for(var p in a) {
    console.log(a[p])
}

    console.log(-1);