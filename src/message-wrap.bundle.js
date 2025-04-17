/**** message-wrap-bundle.js | Message ****/
//==============================================================
import { Message }          from './message.js';

// async function init() {
//     await Message.autoDetect();
// }
// init();
(async () => {
    await Message.autoDetect();
})();

export default Message;
export { Message };