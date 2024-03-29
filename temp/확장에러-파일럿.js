


/**
 *
 */
class ExtendTypeError extends Error {
    
    queue = [];
    // location = null;
    prop = {};

    /**
     * 
     * @param {*} message 
     * @param {Error | string} p_object 
     */
    constructor(message, p_object) {
        var _msg = '';
        var _prop;
        var _queue;

        if (p_object instanceof ExtendTypeError) {
            _queue = p_object.queue;
            _prop = p_object.prop;
        } else if (typeof p_object  === 'object') {
            _prop = p_object;
        }

        _msg = message + '\n';
        if (_prop) _msg += buildMessageProp(_prop);
        if (_queue) _msg += buildMsgQueue(_queue); 

        super(_msg);

        if (p_object instanceof ExtendTypeError) this.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
        if (_prop) this.prop = _prop;
        this.queue.push(message);
        
        // inner function 
        function buildMessageProp(p) {
            var msg = '';
            if (typeof p !== 'object' || p === null) return;
            for (var prop in p) {
                if (typeof p[prop] === 'string')msg += prop + ' : '+ p[prop] + '\n';
            }
            return msg;
        }

        function buildMsgQueue(queue) {
            var msg = '';
            var queue_cnt = queue.length;
            for (var i = queue_cnt; i > 0; i--) {
                // msg += '+' + p_object.stack[i];
                var mark = '';
                // msg += ;
                
                for (var ii = i; ii <= queue_cnt; ii++) { mark += '#'; }
                msg += '' + mark + ' '+ queue[i - 1] + '\n';
            }
            return msg;
        }
    }
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
        // console.log('## ');

        var ee = new ExtendTypeError('[ES0111]인터페이스 구현시 오류가 발생하였습니다. ', e);
        // var ee = new Error('[ES0111]인터페이스 구현시 오류가 발생하였습니다. ', e);

        throw ee;
        // throw new ExtendTypeError(e.message);
    }

    function sub(aa) {
        try {
            // throw new ExtendTypeError('sub');
            // throw new ExtendTypeError('this is error!!!\npath origin.aa.bb < array(seq) > ');
            
            // throw new ExtendTypeError('this is error!!!');
            sub2();
            // if (Array.isArray(aa)) call(aa);

        } catch (e) {
            // console.log('# ');
            // ee.list.push('bb:array(seq)')
            
            var ee = new ExtendTypeError('[ES0111] : allow 허용 조건이 실패하였습니다.', e);

            throw ee;
        }
    }
    function sub2(aa) {
        try {
            // throw new ExtendTypeError('sub');
            // throw new ExtendTypeError('this is error!!!\npath origin.aa.bb < array(seq) > ');
            throw new ExtendTypeError('[ES0111] : 원본은 number , 대상은 boolean 입니다.', { path: 'aa / bb', vv: 'aaa'});
            // throw new Error('[ES0111] : 원본은 number , 대상은 boolean 입니다.');
            // throw new ExtendTypeError('[ES0111] : 원본은 number , 대상은 boolean 입니다.');

        } catch (e) {
            // console.log('# ');
            // ee.list.push('bb:array(seq)')
            var ee = new ExtendTypeError('[ES0111] : OR 조건 이 실패 하였습니다.', e)
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



