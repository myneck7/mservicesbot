const {MessageEmbed} = require("discord.js");
const {MESSAGES} = require('../../util/constants');

const color = 0xff0000;
const generalTitle = 'M Services';
const image = 'https://i.imgur.com/0iQM3WP.png';

function numberPresentation(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
}

module.exports.run = async (client, message, args) => {
    const tagQ = Number(args[0]);
    const tagV = Number(args[1]);
    let res = 0;

    if(tagQ/2000*700000 >= tagV/100*5){
        res = tagQ/2000*700000;
    }
    else{
        res = tagV/100*5;
    }
    res = Math.round(res);
    if(Number(res) < 700000){
        res = 700000;
    }
    return message.channel.send({
        embeds: [
            new MessageEmbed()
                .setTitle(generalTitle)
                .setColor(color)
                .setDescription('Congrats !\n' +
                    'The infos you entered showed that you qualify for our Services.\n' +
                    'We will accept to carry safely your convoy for **'+ numberPresentation(res) +'** silvers\n' +
                    '\n' +
                    'Quick reminder : we insure :100:% of your Goods :wink: \n' +
                    'The prices have been calculated according an average of the :mammoth: +800 missions we did for :busts_in_silhouette:  +100 clients that trust us.\n'
                )
                .addField('Estimated value :', numberPresentation(tagV) + ' silvers', true)
                .addField('Weight :', numberPresentation(tagQ) + 'kg', true)
                .setImage(image)
        ]
    });
};

module.exports.help = MESSAGES.COMMANDS.PRICES.PRICE;