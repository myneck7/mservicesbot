const {MessageEmbed} = require("discord.js");
const {readdirSync} = require('fs');
const categoryList = readdirSync('./commands');
const {MESSAGES} = require('../../util/constants');


module.exports.run = (client, message, args) => {
    try {
        if (!args.length) {
            const embed = new MessageEmbed()
                .setColor("#36393F")
                .addField("Commands list", `List of commands sorted by category\nFor more infos on a commands, write \`$help [command_name]\``)

            for (const category of categoryList) {
                embed.addField(
                    `${category}`,
                    `${client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => cmd.help.name).join(', ')}`
                );
            }
            ;

            return message.channel.send({embeds: [embed]});
        } else {
            const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]));
            const embed = new MessageEmbed()
                .setColor("#36393F")
                .setTitle(`\`${command.help.name}\``)
                .addField('Description', `${command.help.description} (cd: ${command.help.cooldown} secs)`)
                .addField('Usage', command.help.usage ? `$${command.help.name} ${command.help.usage}` : `$${
                    command.help.name}`, true)
            if (command.help.aliases.length > 1) {
                embed.addField('Alias', `${command.help.aliases.join(', ')}`, true);
            }
            return message.channel.send({embeds: [embed]});

        }
    }
    catch (e) {
        message.reply('Couldn\'t use the command');
    }
};

module.exports.help = MESSAGES.COMMANDS.MISC.HELP;