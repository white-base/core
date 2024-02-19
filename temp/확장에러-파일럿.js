
class ExtendTypeError extends Error {
    list = [];
    constructor(message, parent) {
        // 특수한 경우 호출전 삽입
        var msg = message;
        if (parent instanceof Error) {
            // this.list = parent.list;
            for (var i = 0; i < parent.list.length; i++) {
                msg += '\n\t' + parent.list[i];
            }
        }
        super(msg);

        if (parent instanceof Error) this.list = parent.list;   // 참조 개념
        this.list.push(message);
        
        // message += ' Over';
        
        
    }

    // setMessage(message) {
    //     // var err = 
    // }
}


function call(arr) {

    
    try {
        for (var i = 0; i < arr.length; i++) {
            sub(arr[i])
        }
    } catch (e) {
        // console.log('call stmt');
        // e.list.push('aa:choice(req)')
        // e.list.push('allowType')
        
        // e.message += '\n'
        // e.message += e.list.join(' - ')
        // var rev = e.list.reverse();
        
        // var or = [];
        // or.push('aa:choice(opt) [typ1, type2] ')

        // console.error('multi path: '+ or.join(' / '))
        // console.error('fail path: '+ rev.join(' / '))   // unoin 의 경우, 이름의 있는 경우만
        // console.warn(e.list.join(' - '))
        // console.log(e.list.join(' - '))

        var e2 = new ExtendTypeError('subError', e);

        throw e;
        // throw new ExtendTypeError(e.message);
    }

    function sub(aa) {
        try {
            // throw new ExtendTypeError('sub');
            // throw new ExtendTypeError('this is error!!!\npath origin.aa.bb < array(seq) > ');
            throw new ExtendTypeError('this is error!!!');

            if (Array.isArray(aa)) call(aa);

        } catch (ee) {
            // console.log('call sub');
            // ee.list.push('bb:array(seq)')
            
            throw ee;
        }
    
    }
}



/**
 * [choice]
 */
// call([1])
call([ [1] ])


console.log(0);



