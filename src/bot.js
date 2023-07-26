import { Client, GatewayIntentBits } from "discord.js";
import ClientAudioFunction from "./ClientFunction/ClientAudioFunction.js";
import dotenv from "dotenv";

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

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`Running on shard ${client.shard.ids.join(', ')}`);
});

client.on('guildCreate', (guild) => {
    console.log(`Joined server ${guild.name} (ID: ${guild.id}) on shard ${client.shard.ids.join(', ')}`);
});

ClientAudioFunction(client)

client.login(process.env.TOKEN);
