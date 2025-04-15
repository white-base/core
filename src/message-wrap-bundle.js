/**** message-wrap-bundle.js | Message ****/
//==============================================================
import { Message }          from './message.js';

async function init() {
    await Message.autoDetect();
}
init();

export default Message;
export { Message, init };