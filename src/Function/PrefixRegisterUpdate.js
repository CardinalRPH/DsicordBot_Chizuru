import { readGuildData, writeGuildData } from "../utils/GuildReadWrite.js";

const PrefixRegisUpdate = (interaction) => {
    const { options } = interaction
    const guildId = interaction.guildId;
    
    readGuildData((err, jsonData) => {
        if (err) {
            console.error('[Error] Error reading Prefix:', err);
            return;
        }
        const targetObject = jsonData.Guild.find(item => item.id === guildId);
    
        targetObject.prefix = options.get('new-prefix').value;
        writeGuildData(jsonData, (err) => {
            if (err) {
                console.error('[Error] Error writing Prefix:', err);
            }
        })
        interaction.reply(`Prefix has changed to '${options.get('new-prefix').value}'`);
    })

}

export default PrefixRegisUpdate;