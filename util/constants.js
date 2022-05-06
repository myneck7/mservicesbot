const MESSAGES = {
    COMMANDS:{
        PRICES:{
            PRICE:{
                name:"price",
                aliases: ["p", "price"],
                category:'prices',
                description:"calculate the cost of the convoy",
                cooldown: 5,
                usage: '',
                roles: false,
                args: true
            },
            PRICECLIENT:{
                name:"priceclient",
                aliases: ["pc", "priceclient"],
                category:'prices',
                description:"calculate the cost of the convoy",
                cooldown: 5,
                usage: '',
                roles: false,
                args: true
            }
        }
    }
}

exports.MESSAGES = MESSAGES;