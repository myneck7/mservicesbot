const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message) => {
    try {
        let act = await client.getAllPlayer();
        let listPosition = "";
        let listWeight = "";
        let listValue = "";
        let pos = 1;
        for (let value of Object.entries(act)) {
            value = String(value);
            value = value.split(',');
            let test = value[1].split(' ');
            let test2 = value[2].split(' ');
            listPosition += pos+"\n";
            listWeight += test[2] + "\n";
            listValue += test2[2] + "\n";
            pos += 1;
        }
        if (listWeight == "") {
            listWeight = "null";
            listValue = "null";
            listPosition = "null";
        }
        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`Leaderboard: `)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTimestamp()
                    .addField('**Position**', `${listPosition}`, true)
                    .addField('**Weight**', `${listWeight}`, true)
                    .addField('**Value**', `${listValue}`, true)
                    .setImage('https://i.imgur.com/0iQM3WP.png')
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.LEADERBOARD;