import { Client, GatewayIntentBits } from "discord.js";
import ClientAudioFunctionX from "./ClientFunction/ClientAudioFunctionX.js";
import dotenv from "dotenv";
import { firstGuildCreate, onResetReady } from "./utils/RegisterSlashCommand.js";
import ClientSlashFunction from "./ClientFunction/ClientSlashFunction.js";

dotenv.config();
const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

client.once("ready",async () => {
    if (client.shard.ids.join(', ') == process.env.SHARDCOUNT - 1) {
        console.log(`Logged in as ${client.user.tag}!`);
        await onResetReady()
        client.user.setActivity(`Ready for ${process.env.SHARDCOUNT} Server`, {type:'LISTENING'});
        console.log('All Shard has running');
        console.log('Ready To Use');
    }

});

client.on('guildCreate', (guild) => {
    console.log(`Joined server ${guild.name} (ID: ${guild.id}) on shard ${client.shard.ids.join(', ')}`);
    firstGuildCreate(guild.id);
});

ClientAudioFunctionX(client);
ClientSlashFunction(client)

//note
//add loop all queue to path
//add clear current queue to path
// remove 1 queue



client.login(process.env.TOKEN);
