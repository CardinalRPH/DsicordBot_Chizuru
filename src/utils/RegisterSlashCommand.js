import { REST, Routes } from "discord.js";
import command from "../SlashRoutes/Routes.js";
import dotenv from "dotenv";
import { readGuildData, writeGuildData } from "./GuildReadWrite.js";

dotenv.config();
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);


export const onResetReady = async () => {
    readGuildData(async (err, jsonData) => {
        if (err) {
            console.error('[Error] Error reading GuildId:', err);
            return;
        }

        try {
            console.log('[Debug] Started refreshing application (/) commands.');
            for (const guildData of jsonData.Guild) {
                const guildId = guildData.id;
    
                await rest.put(
                    Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
                    body: command
                })
            }
            console.log(`[Debug] Successfully reloaded application (/) commands for All Guild.`);
        } catch (e) {
            console.log(e);
        }
        
    })
}

export const firstGuildCreate = async (guildId) => {
    readGuildData(async (err, jsonData) => {
        if (err) {
            console.error('[Error] Error reading GuildId:', err);
            return;
        }


        try {
            console.log('[Debug] Started refreshing application (/) commands.');
            jsonData.Guild.push({
                id: `${guildId}`
            });
            await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
                body: command
            })
            writeGuildData(jsonData, (err) => {
                if (err) {
                    console.error('[Error] Error writing GuildId:', err);
                } else {
                    console.log(`[Debug] Successfully reloaded application (/) commands for guild with ID ${guildId}.`);
                }
            })
        } catch (e) {
            console.error(e);
        }
    })
}


