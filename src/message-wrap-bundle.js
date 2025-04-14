/**** message-wrap-bundle.js | Message ****/
//==============================================================
import { Message }          from './message.js';

(async () => {
    await Message.autoDetect();
})();

// async function main() {
//     await Message.autoDetect();
//     // console.log('autoDetect 완료 후 실행');
// }
// main();

export default Message;
export { Message };