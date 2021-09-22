const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    try {
        const user = message.mentions.users.first();
        let pseudo = args[1];
        if(!pseudo){
            return message.reply("Must enter a pseudo");
        }
        if (!user) return message.channel.send(`false`);
        let newPlayer = {userId: user.id, pseudo: pseudo};
        await client.createPlayer(newPlayer);

        return message.channel.send({
            embeds: [
                new MessageEmbed().setColor('GREEN')
                    .setTitle(`${message.author.username}`)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setDescription(`**Action** : add player\n**Status** : Done`)
            ]
        });
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }

};

module.exports.help = MESSAGES.COMMANDS.MANAGEMENT.CREATEPLAYER;