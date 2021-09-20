const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        let data = await client.getPlayer(message.author.id);
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                    .addField('**Weight**', `${data.weight} kg`, true)
                    .addField('**Value**', `${data.value} silvers`, true)
                    .setImage('https://i.imgur.com/0iQM3WP.png')
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.ME;