


var aa = {
    bb: {
        cc: {}
    }
}
aa.dd = aa;

var mObj = [1,2]
for (var prop in mObj) {
    console.log(prop);
}


var o1 = new Object(aa);

console.log(0);
