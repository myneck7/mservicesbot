const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

function numberPresentation(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

module.exports.run = async (client, message) => {
    try {
        let act = await client.getAllPlayer();
        let listPseudo = "";
        let listWeight = "";
        let listValue = "";
        for (let value of Object.entries(act)) {
            value = String(value);
            value = value.split(',');
            let amountW = value[1].split(':');
            let amountV = value[2].split(':');
            let pseudo = value[3].split(':');
            listPseudo += "__"+pseudo[1].replaceAll("\'","")+"__\n";
            listWeight += amountW[1] + " kg\n";
            listValue += amountV[1] + " silvers\n";
        }
        if (listWeight == "") {
            listWeight = "null";
            listValue = "null";
            listPseudo = "null";
        }

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('0xff0000')
                    .setTitle(`Leaderboard: `)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setTimestamp()
                    .addField('**Pseudo**', `${listPseudo}`, true)
                    .addField('**Value**', `${numberPresentation(listValue)}`, true)
                    .addField('**Weight**', `${numberPresentation(listWeight)}`, true)
                    .setImage('https://i.imgur.com/0iQM3WP.png')
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.LEADERBOARD;