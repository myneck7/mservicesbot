const Discord = require("discord.js");
const Sequelize = require('sequelize');
const client = new Discord.Client();
require("dotenv").config();

// Notre préfixe de commande
const PREFIX = 'm';

const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});

const Transporters = sequelize.define('transporters', {
    name: {
        type: Sequelize.STRING,
        unique: true,
    },
    totalmissions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    missions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    collateral: Sequelize.STRING,
});

client.on("ready", () => {
    Transporters.sync();
    console.log("I'm ready !");
});

client.on("message", async message => {

    if (message.content.startsWith(PREFIX)) {
        const input = message.content.slice(PREFIX.length).trim().split(' ');
        const command = input.shift();
        const commandArgs = input.join(' ');

        if (command === 'addtag') {
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagCollateral = splitArgs.join(' ');

            try {
                // equivalent to: INSERT INTO Transporters (name, description, username) values (?, ?, ?);
                const transporter = await Transporters.create({
                    name: tagName,
                    collateral: tagCollateral,
                });
                return message.reply(`Transporter ${transporter.name} added.`);
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return message.reply('That Transporters already exists.');
                }
                return message.reply('Something went wrong with adding a Transporters.');
            }
        } else if (command === 'tag') {
            const tagName = commandArgs;

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const tag = await Transporters.findOne({ where: { name: tagName } });
            if (tag) {
                // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
                return message.channel.send(tag.get('collateral'));
            }
            return message.reply(`Could not find tag: ${tagName}`);
        } else if (command === 'edittag') {
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagCollateral = splitArgs.join(' ');

            // equivalent to: UPDATE tags (description) values (?) WHERE name='?';
            const affectedRows = await Transporters.update({ collateral: tagCollateral }, { where: { name: tagName } });
            if (affectedRows > 0) {
                return message.reply(`Tag ${tagName} was edited.`);
            }
            return message.reply(`Could not find a tag with name ${tagName}.`);
        } else if (command === 'taginfo') {
            const tagName = commandArgs;

            // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
            const tag = await Transporters.findOne({ where: { name: tagName } });
            if (tag) {
                return message.channel.send(`${tagName} as given the collateral : ${tag.collateral}. \nHas made ${tag.missions} missions from wich ${tag.totalmissions} need to be payed.`);
            }
            return message.reply(`Could not find tag: ${tagName}`);
        } else if (command === 'showtags') {
            // equivalent to: SELECT * FROM tags;
            const tagList = await Transporters.findAll({});
            const tagString = tagList.map(t => {
                var tr = t.name.concat(' | ',t.collateral, ' | ', t.missions, ' | ', t.totalmissions);
                return tr;
            }).join('\n') || 'No tags set.';
            return message.channel.send(`List of transporters: \n${tagString}`);
        } else if (command === 'removetag') {
            const tagName = commandArgs;
            // equivalent to: DELETE from tags WHERE name = ?;
            const rowCount = await Transporters.destroy({ where: { name: tagName } });
            if (!rowCount) return message.reply('That Transporter did not exist.');

            return message.reply('Transporter deleted.');
        }
    }

});

client.login(process.env.BOT_TOKEN);
