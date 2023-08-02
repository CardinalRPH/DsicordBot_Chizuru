import { Client, GatewayIntentBits } from "discord.js";
import ClientAudioFunctionX from "./ClientFunction/ClientAudioFunctionX.js";
import dotenv from "dotenv";
import { firstGuildCreate, onResetReady } from "./utils/RegisterSlashCommand.js";
import ClientSlashFunction from "./ClientFunction/ClientSlashFunction.js";
import VcUpdate from "./ClientFunction/ClientVoiceStateUpdate.js";

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

client.once("ready", async () => {
    if (client.shard.ids.join(', ') == process.env.SHARDCOUNT - 1) {
        console.log(`[Debug] Logged in as ${client.user.tag}!`);
        await onResetReady()
        console.log('[Debug] All Shard has running');
        console.log('[Debug] Ready To Use');
    }

});
client.on('ready', async () => {
    client.user.setPresence({
        activities: [
            {
                name: 'Prepare for Play',
                type: 'PLAYING'
            }
        ]
    });
})

client.on('guildCreate', (guild) => {
    console.log(`[Debug] Joined server ${guild.name} (ID: ${guild.id}) on shard ${client.shard.ids.join(', ')}`);
    firstGuildCreate(guild.id);
});



VcUpdate(client);
ClientAudioFunctionX(client);
ClientSlashFunction(client)

//note
// make guidldelete handler



client.login(process.env.TOKEN);
