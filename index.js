import { ShardingManager } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const manager = new ShardingManager('./src/bot.js', {
    token: process.env.TOKEN,
    totalShards: parseInt(process.env.SHARDCOUNT)
})
console.log('Loading..');
manager.on('shardCreate', (shard) => {
    if (shard.id == process.env.SHARDCOUNT - 1) {     
        console.log('All Shard Launched');
    }
});

manager.spawn();