// a.js
(function(_global) {
    console.log('a.js 시작');

    const b = require('./b');

    // module.exports = {
    //   call: () => {
    //     console.log('a.js의 call에서의 b: ', b);
    //   }
    // };

    console.log(typeof b);
    // console.log('b='+b);

    const ff = (b) => {
        console.log('a.js의 call에서의 b: ', b);
    };

    exports.func = ff;

}(typeof window !== 'undefined' ? window : global));