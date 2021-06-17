const Discord = require("discord.js");
const func = require("./JS/func.js");
const Sequelize = require('sequelize');
const client = new Discord.Client();
require("dotenv").config();

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

        if (command === 'create' && message.member.hasPermission('MANAGE_MESSAGES')) {
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagCollateral = splitArgs.join(' ');
            try {
                const transporter = await Transporters.create({
                    name: tagName,
                    collateral: tagCollateral,
                });
                return message.reply(func.functionSuccess());
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    return message.reply('That Transporters already exists.');
                }
                return message.reply(func.functionError());
            }
        }
        else if (command === 'getCollateral') {
            const tagName = commandArgs;
            const tag = await Transporters.findOne({ where: { name: tagName } });
            if (tag) {
                return message.channel.send(tag.get('collateral'));
            }
            return message.reply(func.functionError());
        }
        else if (command === 'collateral' && message.member.hasPermission('MANAGE_MESSAGES')) {
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagCollateral = splitArgs.join(' ');
            const affectedRows = await Transporters.update({ collateral: tagCollateral }, { where: { name: tagName } });
            if (affectedRows > 0) {
                return message.reply(func.functionSuccess());
            }
            return message.reply(func.functionError());
        }
        else if (command === 'show') {
            const tagName = commandArgs;
            const tag = await Transporters.findOne({ where: { name: tagName } });
            return message.channel.send(func.showOne(tag));
        }
        else if (command === 'showall') {
            const tagList = await Transporters.findAll({order:[
                    ['totalmissions','DESC']
                ]});
            return message.channel.send(func.showAll(tagList));
        }
        else if (command === 'remove' && message.member.hasPermission('MANAGE_MESSAGES')) {
            const tagName = commandArgs;
            const rowCount = await Transporters.destroy({ where: { name: tagName } });
            if (!rowCount) return message.reply('This transporter did not exist.');
            return message.reply(func.functionSuccess());
        }
        else if (command === 'mission' && message.member.hasPermission('MANAGE_MESSAGES')) {
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tagMissions = splitArgs.join(' ');
            const tag = await Transporters.findOne({ where: { name: tagName } });
            const affectedRows = await Transporters.update({ missions: tag.missions + Number(tagMissions), totalmissions: tag.totalmissions + Number(tagMissions) }, { where: { name: tagName } });
            if (affectedRows > 0) {
                return message.reply(func.functionSuccess());
            }
            return message.reply(func.functionError());
        }
        else if (command === 'pay' && message.member.hasPermission('MANAGE_MESSAGES')) {
            const splitArgs = commandArgs.split(' ');
            const tagName = splitArgs.shift();
            const tag = await Transporters.findOne({ where: { name: tagName } });
            const affectedRows = await Transporters.update({ missions: 0 }, { where: { name: tagName } });
            if (affectedRows > 0) {
                return message.reply(func.pay(tag));
            }
            return message.reply(func.functionError());
        }
        else if (command === 'price') {
            const splitArgs = commandArgs.split(' ');

            if (splitArgs.length >= 2) {
                return message.reply(func.price(splitArgs));
            }
            return message.reply(func.functionError());
        }
    }
});
client.login(process.env.BOT_TOKEN);
