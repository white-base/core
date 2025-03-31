/**** extend-error.js | ExtendError ****/

//==============================================================
// import module
import Message from './message.js';

//==============================================================
// module implementation   

// inner function 
function _buildMessageProp(obj) {
    var msg = '';
    for (var prop in obj) {
        if (typeof obj[prop] === 'string') msg += prop + ' : '+ obj[prop] + '\n';
        else continue;
    }
    return msg;
}
function _buildMsgQueue(queue) {
    var msg = '';
    var queue_cnt = queue.length;
    for (var i = queue_cnt; i > 0; i--) {
        var mark = '';
        for (var j = i; j <= queue_cnt; j++) { mark += '#'; }
        msg += '' + mark + ' '+ queue[i - 1] + '\n';
    }
    return msg;
}

class ExtendError extends Error {

    static _NS = 'Common';      // namespace

    /**
     * Save previously generated messages.  
     * 
     * @member {string[]} ExtendError#queue
     */
    queue = [];

    /**
     * Error message related to property type.  
     * 
     * @member {object} ExtendError#prop
     */
    prop = {};

    /**
     * Use user messages to create an ExtendError instance.  
     *
     * @param {string} msg Error message string
     * @param {ExtendError | object | null} causeOrProp Error message by existing ExtendError, Error object or property
     *
     * @example
     * throw new ExtendError("Custom error message");
     * throw new ExtendError("Custom error message", error);
     * throw new ExtendError("Custom error message", { style: "required" });
     */

    /**
     * Create an instance of 'ExtendError' using the message code and substitution value.  
     *
     * @param {RegExp} msgPattern Code value of regular expression type
     * @param {ExtendError | object | null} causeOrProp Error message by existing ExtendError, Error object or property
     * @param {string[]} placeholders Array of strings containing substitution values such as '$1' and '$2' in the
     *
     * @example
     * // For messages that do not have a substitution value
     * throw new ExtendError(/EL01504/);
     * throw new ExtendError(/EL01504/, error);
     * throw new ExtendError(/EL01504/, { style: "required" });
     * // For messages with substitution values
     * throw new ExtendError(/EL01504/, undefined, ['value1', 'value2']);
     * throw new ExtendError(/EL01504/, error, ['value1', 'value2']););
     * throw new ExtendError(/EL01504/, { style: "required" }, ['value1', 'value2']);
     */
    constructor(p_msg, p_prop, p_codeVal) {
        super()
        
        var _build = '';
        var _prop;
        var _queue = [];    
        var _msg;

        if (p_prop instanceof ExtendError) {
            _queue = p_prop.queue;
            _prop = p_prop.prop;
        } else if (p_prop instanceof Error) {
            _queue.push(p_prop.message);
        } else if (typeof p_prop  === 'object' && p_prop !== null) {
            _prop = p_prop;
        }
        
        if (typeof p_msg === 'string') {
            _msg = p_msg;
        } else if (p_msg instanceof RegExp) {
            _msg = Message.get(p_msg.source, p_codeVal);
        } else _msg = '';
        
        _build = _msg + '\n';
        
        if (_prop) _build += _buildMessageProp(_prop);
        if (_queue.length > 0) _build += _buildMsgQueue(_queue);

        this.message = _build;
        this.queue = _queue;
        this.queue.push(_msg);
    }

    /**
     * Converts error messages into strings.  
     * 
     * @return error message string
     */
    toString() {
        return 'ExtendError : ' + this.message;
    }
}



//==============================================================
// module export
export default ExtendError;
export { ExtendError };