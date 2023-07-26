import { ShardingManager } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const manager = new ShardingManager('./src/bot.js', {
    token: process.env.TOKEN,
    totalShards: 1
})

manager.on('shardCreate', (shard) => {
    console.log(`Launched shard ${shard.id}`);
    console.log(manager.shardList);
});

manager.spawn();