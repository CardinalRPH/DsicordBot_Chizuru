import { readGuildData } from "../utils/GuildReadWrite.js";

const PrefixState = (guildId) => {
    return new Promise((resolve, reject) => {
        readGuildData((err, jsonData) => {
            if (err) {
                console.error('[Error] Error reading Prefix:', err);
                reject(err);
            }
            resolve(jsonData.Guild.find((entry) => entry.id === guildId))
        })
    })
}

export default PrefixState;