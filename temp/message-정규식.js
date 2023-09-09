// const re = /($1)\s(\w+)/;
// const str = "Maria $1 Cruz";
// const newstr = str.replace(re, "$2, $1");

// console.log(newstr); // Cruz, Maria

var value
value = "20021206"

var str = value.replace(/(\d{4})(\d{2})(\d{2})/, `$1년 $2월 $3일`);

console.log(str);

value = "ㅁㄴㅇㄹㅇ $1 에서 $2 으로 $3 $1"

result = value.match(/\$\d+/g)
value = value.replace('$1', "AA");
value = value.replace('$2', "BB");

console.log(value);

const max = result.reduce((acc, cur, idx) => { 
    var num = Number(cur.replace('$',''));
    return acc < num ? num : acc; 
}, 0);

console.log(0);