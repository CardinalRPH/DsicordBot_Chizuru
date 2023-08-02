import { prefix } from '../Global/Variable.js';
import { readGuildData } from '../utils/GuildReadWrite.js';

const PrefixCheck = (interaction) => {

    const guildId = interaction.guildId;

    readGuildData((err, jsonData) => {
        if (err) {
            console.error('[Error] Error reading Prefix:', err);
            return;
        }

        const targetObject = jsonData.Guild.find(item => item.id === guildId);
        interaction.reply(`Current Prefix is '${targetObject.prefix || prefix}'`);
    })


}

export default PrefixCheck;