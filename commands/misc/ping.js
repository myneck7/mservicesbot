const {MESSAGES} = require('../../util/constants');

module.exports.run = (client, message, args) => {
    try {
        message.channel.send("Pong!");
    }
    catch (e) {
        message.reply('Couldn\'t answer the ping');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.PING;