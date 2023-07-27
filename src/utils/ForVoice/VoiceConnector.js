import { VoiceConnectionStatus, joinVoiceChannel } from "@discordjs/voice";
export default class VoiceConnectorX {

    connect(channelId, guildId, adapterCreator) {
        const connection = joinVoiceChannel({
            channelId: channelId,
            guildId: guildId,
            adapterCreator: adapterCreator
        });
        return connection;
    }

    disconnect(connection) {
        connection.destroy();
        return "Disconnected"
    }

    async VoiceReady(connection) {
        return new Promise((resolve, reject) => {
            connection.on(VoiceConnectionStatus.Ready, () => {
                resolve(true)
            });
            connection.on(VoiceConnectionStatus.Disconnected, () => {
                reject(false)
            });
        });
    }
}