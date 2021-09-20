const mongoose = require("mongoose");
const {Guild, Player, Activity} = require('../models/index');

module.exports = async client => {

    client.createPlayer = async (player) =>{
        console.log(player.userId);
        await client.deletePlayer(player.userId);
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, player);
        const createPlayer = await new Player(merged);
        createPlayer.save();
    }
    client.deletePlayer = async (player) =>{
        const data = await Player.findOneAndDelete({ userId: player});
    }
    client.getPlayer = async (player) =>{
        const data = await Player.findOne({ userId: player});
        return data;
    };
    client.getAllPlayer = async () =>{
        const data = await Player.find({}).select('-userId -_id -__v').sort({value: -1});
        return data;
    };
    client.addPlayerScore = async (player, weight, value) =>{
        let data = await client.getPlayer(player);
        if(data != null) {
            let nw = Number(weight);
            let nv = Number(value);
            await data.updateOne({$inc: {weight: nw}});
            await data.updateOne({$inc: {value: nv}});
        }
    }
};