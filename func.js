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
    let tnName = 'Name';
    let tmName = 'Missions';
    let tmtName = 'Total missions';
    const tagName = tagList.map(t => {
        let tn = t.name;
        return tn;
    }).join('\n') || 'No tags set.';
    const tagMissions = tagList.map(t => {
        let tm = t.missions;
        return tm;
    }).join('\n') || 'No tags set.';
    const tagMissionsT = tagList.map(t => {
        let tmt = t.totalmissions;
        return tmt;
    }).join('\n') || 'No tags set.';
    const embed = new MessageEmbed()
        .setTitle(generalTitle)
        .setColor(color)
        .setDescription('List of all the transporters')
        .addFields(
            { name: tnName, value: tagName, inline: true },
            { name: tmName, value: tagMissions, inline: true },
            { name: tmtName, value: tagMissionsT, inline: true })
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
    const tagV = Number(splitArgs[0]);
    let res;

    if(tagQ/2000*750000 >= tagV/100*6){
        res = tagQ/2000*750000;
    }
    else{
        res = tagV/100*6;
    }

    const embed = new MessageEmbed()
        .setTitle('Cost of your convoy :')
        .setColor(color)
        .setDescription('Congrats !\n' +
            'The infos you entered showed that you qualify for our Services.\n' +
            'We will accept to carry safely your convoy for **'+ numberPresentation(res)+'** silvers\n' +
            '\n' +
            'Quick reminder : we insure 100% of your Goods :wink: \n' +
            'The prices have been calculated according an average of the :mammoth: +200 missions we did for :busts_in_silhouette:  +70 clients that trust us.\n'
            )
        .addField('Estimated value :', numberPresentation(tagV) + ' silvers', true)
        .addField('Weight :', numberPresentation(tagQ) + 'kg', true)
        .setImage(image);

    return embed;
}
function numberPresentation(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

module.exports = { showOne, functionSuccess, functionError, showAll, pay, price };