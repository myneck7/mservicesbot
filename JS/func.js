const { MessageEmbed } = require('discord.js');
const color = 0xff0000;
const generalTitle = 'M Services';
const image = 'https://i.imgur.com/0iQM3WP.png';
function showOne(tag){
    let msg;
    if (tag) {
        msg = (`**${tag.name}** as given the collateral : **${tag.collateral}**. \nHas made **${tag.totalmissions}** missions from wich **${tag.missions}** need to be payed.`);
    }
    else {
        msg = (`Could not find tag`);
    }
    const embed = new MessageEmbed()
        .setTitle(generalTitle)
        .setColor(color)
        .setDescription(msg)
        .setImage(image);
    return embed;
}
function functionSuccess(){
    const embed = new MessageEmbed()
        .setTitle('Success')
        .setColor(color)
        .setDescription("Action successfully done")
        .setImage(image);
    return embed;
}
function functionError(){
    const embed = new MessageEmbed()
        .setTitle('Error')
        .setColor(color)
        .setDescription("Action finished due to an error\nError are mainly due to using a non-existent transporter or adding the wrong parameter")
        .setImage(image);
    return embed;
}
function showAll(tagList) {
    let tx = '   Name   |  Missions  | Total of missions\n';
    const tagString = tagList.map(t => {
        let tr = t.name.concat(' | ', t.missions, ' | ', t.totalmissions);
        return tr;
    }).join('\n') || 'No tags set.';
    const embed = new MessageEmbed()
        .setTitle(generalTitle)
        .setColor(color)
        .setDescription('List of all the transporters')
        .addField(tx,tagString)
        .setImage(image);
    return embed;
}
function pay(tag){
    let payed = tag.missions*600000;
    let msg;
    msg = (`**${tag.name}** as been payed for **${tag.missions}** missions, that makes it **${numberPresentation(payed)} silvers**`);
    const embed = new MessageEmbed()
        .setTitle(generalTitle)
        .setColor(color)
        .setDescription(msg)
        .setImage(image);

    return embed;
}
function price(splitArgs){
    const tagQ = Number(splitArgs.shift());
    const tagS = Number(splitArgs[0]);
    const tagV = Number(splitArgs[1]);
    let res;

    if(tagQ/2000*750000 >= tagS/48*750000){
        res = tagQ/2000*750000;
    }
    else{
        res = tagS/48*750000;
    }
    if(tagV/100*6 > res){
        res = tagV/100*6;
    }

    const embed = new MessageEmbed()
        .setTitle('Cost of your convoy :')
        .setColor(color)
        .setDescription('The usual price for this convoy is **'+ numberPresentation(res)+'** silvers')
        .addField('Estimated value :', numberPresentation(tagV) + ' silvers', true)
        .addField('Number of slots :', numberPresentation(tagS) + ' slots', true)
        .addField('Weight :', numberPresentation(tagQ) + ' KG', true)
        .setImage(image);

    return embed;
}
function numberPresentation(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ");
}

module.exports = { showOne, functionSuccess, functionError, showAll, pay, price };