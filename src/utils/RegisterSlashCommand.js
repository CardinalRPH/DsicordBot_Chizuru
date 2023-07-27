import { REST, Routes } from "discord.js";
import command from "../SlashRoutes/Routes.js";
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';

dotenv.config();

const __dirname = path.resolve();
const GuildPath = path.join(__dirname, '/src/Data', 'Guild.json');
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
const rawData = fs.readFileSync(GuildPath, 'utf8');
const jsonData = JSON.parse(rawData);

export const onResetReady = async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        for (const guildData of jsonData.Guild) {
            const guildId = guildData.id;

            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
                body: command
            })
        }
        console.log(`Successfully reloaded application (/) commands for All Guild.`);
    } catch (e) {
        console.log(e);
    }
}

export const firstGuildCreate = async (guildId) => {
    try {
        console.log('Started refreshing application (/) commands.');
        jsonData.Guild.push({
            id: guildId.toSting()
        });
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
            body: command
        })
        fs.writeFileSync(GuildPath, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log(`Successfully reloaded application (/) commands for guild with ID ${guildId}.`);
    } catch (e) {
        console.log(e);
    }
}


