const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    userId: String,
    weight:{
        "type": Number,
        "default": 0
    },
    value:{
        "type": Number,
        "default": 0
    },
    pseudo: String,
    exp:{
        "type": Number,
        "default": 0
    },
    level:{
        "type":Number,
        "default":0
    }
});

module.exports = mongoose.model("Player", playerSchema);