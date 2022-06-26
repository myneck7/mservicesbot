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
            PRICECUSTOMER:{
                name:"pricecustomer",
                aliases: ["pc", "pricecustomer"],
                category:'prices',
                description:"calculate the cost of the convoy",
                cooldown: 5,
                usage: '',
                roles: false,
                args: true
            },
			PRICEVIP:{
                name:"pricevip",
                aliases: ["pv", "pricevip"],
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
