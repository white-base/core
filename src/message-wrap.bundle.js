/**** message-wrap-bundle.js | Message ****/
//==============================================================
import { Message }          from './message.js';
import  defaultCode         from './locales/default.js';

const localesPath = './locales';    // 상대 경로

Message.importMessage(defaultCode, localesPath);

(async () => {
    await Message.autoDetect();
})();

export default Message;
export { Message };