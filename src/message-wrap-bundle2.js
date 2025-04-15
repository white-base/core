/**** message-wrap-bundle.js | Message ****/
//==============================================================
const { Message } = require('./message.js');


// await Message.autoDetect();

(async () => {
    await Message.autoDetect();
})();

module.exports = { Message };
// export { Message };