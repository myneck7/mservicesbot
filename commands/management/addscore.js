const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');
const img = 'https://i.imgur.com/0iQM3WP.png';

module.exports.run = async (client, message, args) => {
    try {

        let user = message.mentions.users.first();
        if (!user) {
            user = message.author;
        }
        let weight = args[1];
        if (!weight || isNaN(weight)) {
            weight = 0;
        }
        let value = args[2];
        if (!value || isNaN(value)) {
            value = 0;
        }
        await client.addPlayerScore(user.id, weight, value);

        let score = await client.getPlayer(user.id);

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`${user.username}`)
                    .setThumbnail(user.displayAvatarURL())
                    .setTimestamp()
                    .addField('Weight', `${score.weight} kg`)
                    .addField('Value', `${score.value} silvers`)
                    .setImage(img)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.ADDSCORE;