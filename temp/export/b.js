(function(_global) {

    // b.js
    console.log('b.js 시작');

    const a = require('./a');

    // module.exports = {
    //   call: () => {
    //     console.log('b.js의 call에서의 a: ', a);
    //   }
    // };

    console.log(typeof a);
    // console.log('a='+ a);

    const ff = () => {
        console.log('b.js의 call에서의 a: ', a);
    };

    exports.func = ff;

}(typeof window !== 'undefined' ? window : global));
