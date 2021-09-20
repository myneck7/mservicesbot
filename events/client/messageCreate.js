const { Collection } = require('discord.js');

module.exports = async (client, message) => {
    const prefix = '$';

    if(!message.content.startsWith(prefix) || message.author.bot) return;


    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
    if(!command) return;


    if (command.help.args && !args.length){
        let noArgs = `missing arguments ${message.author}`;

        if(command.help.usage) {
            noArgs += `\nHow to use : \`${prefix}${command.help.name} ${command.help.usage}\``;
        }

        return message.channel.send(noArgs);
    }

    if(command.help.roles && !message.member.roles.cache.some(role => role.name === 'Staff')) return message.reply('you don\'t have the permissions to use this command');

    if(!client.cooldowns.has(command.help.name)){
        client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 1) * 1000;

    if(tStamps.has(message.author.id)){
        const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

        if(timeNow < cdExpirationTime){
            let timeLeft = (cdExpirationTime - timeNow) / 1000;
            return message.reply(`Cooldown of ${timeLeft.toFixed(0)} seconds before using \`${command.help.name}\` `);
        }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    command.run(client, message, args);
}