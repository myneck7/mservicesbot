const MESSAGES = {
    COMMANDS:{
        MISC:{
            PING:{
                name:"ping",
                aliases: ["ping"],
                category:'misc',
                description:"send pong",
                cooldown: 5,
                usage: '',
                roles: true,
                args: false
            },
            ME:{
                name:"me",
                aliases: ["me"],
                category:'misc',
                description:"send user info",
                cooldown: 5,
                usage: '',
                roles: false,
                args: false
            },
            LEADERBOARD:{
                name:"leaderboard",
                aliases: ["leaderboard"],
                category:'misc',
                description:"send player list",
                cooldown: 5,
                usage: '',
                roles: false,
                args: false
            },
            HELP:{
                name:"help",
                aliases: ["help", "h"],
                category:'misc',
                description:"send a list of commands or information about one",
                cooldown: 5,
                usage: '[command_name]',
                roles: false,
                args: false
            },
            USERINFO:{
                name:"userinfo",
                aliases: ["userinfo"],
                category:'misc',
                description:"send the user infos",
                cooldown: 5,
                usage: "[user]",
                roles: true,
                args: true
            }
        },
        MANAGEMENT:{
            CREATEPLAYER:{
                name:"createplayer",
                aliases: ["createplayer", "c", "create"],
                category:'management',
                description:"Add a player to the guild",
                cooldown: 5,
                usage:'[@user]',
                roles: true,
                args: true
            },
            ADDSCORE:{
                name:"addscore",
                aliases: ["addscore"],
                category:'management',
                description:"add score to a player",
                cooldown: 5,
                usage:'[@user] [score]',
                roles: true,
                args: true
            },
            DELETEPLAYER:{
                name:"deleteplayer",
                aliases: ["deleteplayer"],
                category:'management',
                description:`delete a player`,
                cooldown: 5,
                usage:'[@user]',
                roles: true,
                args: true
            }
        },
        PRICES:{
            PRICE:{
                name:"price",
                aliases: ["p"],
                category:'prices',
                description:"calculate the cost of the convoy",
                cooldown: 10,
                usage: '',
                roles: false,
                args: true
            }
        }
    }
}

exports.MESSAGES = MESSAGES;