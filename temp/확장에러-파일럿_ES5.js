
Util                        = require('../src/util');



var ExtendError = (function (_super) {
    /**
     * 구독자 클래스 (이벤트에 활용)
     * TODO: 필요시 구현
     * @constructs _L.Common.ExtendError
     * @param {string} p_message 사용자 메세지 내용
     * @param {ExtendError | object} p_object 속성객체 또는 상위 Error 객체
     * 우선순위 : 메세지 > 타겟 > 에러명
     */
    function ExtendError(p_message, p_object) {
        var _msg = '';
        var _prop;
        var _queue;    
        
        if (p_object instanceof Error) {
            _queue = p_object.queue;
            _prop = p_object.prop;
        } else if (typeof p_object  === 'object') {
            _prop = p_object;
        }
        
        _msg = p_message + '\n';
        if (_prop) _msg += buildMessageProp(_prop);
        if (_queue) _msg += buildMsgQueue(_queue); 

        
        
        var instance = _super.call(this, _msg);
        // _super.call(this, _msg);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ExtendError);
        }

        /**
         * 에러 스텍 메세지
         * @member {array} _L.Common.ExtendError#_queue
         */
        // instance.queue = [];

        /**
         * 에러 세부 메세지
         * @member {object} _L.Common.ExtendError#prop
         */
        // instance.prop = {};


        if (_queue) instance.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
        else instance.queue = [];

        if (_prop) instance.prop = _prop;
        else instance.prop = {};

        instance.queue.push(p_message);

        Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
        
        return instance;

        // if (_queue) this.queue = _queue;   // 참조 개념 복사 변경 검토 REVIEW:
        // else this.queue = [];

        // if (_prop) this.prop = _prop;
        // else this.prop = {};

        // this.queue.push(p_message);

        // _super
        

        return this;

        /**
         * 에러 메세지
         * @member {Object} 
         */

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

        

        // return this;
    }
    Util.inherits(ExtendError, _super);

    ExtendError._NS = 'Common';    // namespace
    
    /**
     * 내부처리
     */
    //  ExtendError.prototype._execute = function() {
    //     // console.log('ExtendError._execute()');
    // };

    // ExtendError.prototype = new Error();
    // ExtendError.prototype.name = 'new Error()';
    // ExtendError.prototype.constructor = ExtendError;

    return ExtendError;
    
}(Error));

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

        var ee = new ExtendError('[ES0111]인터페이스 구현시 오류가 발생하였습니다. ', e);
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
            
            var ee = new ExtendError('[ES0111] : allow 허용 조건이 실패하였습니다.', e);

            throw ee;
        }
    }
    function sub2(aa) {
        try {
            // throw new ExtendTypeError('sub');
            // throw new ExtendTypeError('this is error!!!\npath origin.aa.bb < array(seq) > ');
            throw new ExtendError('[ES0111] : 원본은 number , 대상은 boolean 입니다.', { path: 'aa / bb', vv: 'aaa'});
            // throw new Error('[ES0111] : 원본은 number , 대상은 boolean 입니다.');
            // throw new ExtendTypeError('[ES0111] : 원본은 number , 대상은 boolean 입니다.');

        } catch (e) {
            // console.log('# ');
            // ee.list.push('bb:array(seq)')
            var ee = new ExtendError('[ES0111] : OR 조건 이 실패 하였습니다.', e)
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



