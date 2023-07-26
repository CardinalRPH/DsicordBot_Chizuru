import { VoiceConnectionStatus, joinVoiceChannel } from "@discordjs/voice";
export default class VoiceConnector {
    constructor(channelId, guildId, adapterCreator) {
        if (channelId && guildId && adapterCreator) {
            this._channelId = channelId;
            this._guildId = guildId;
            this._adapterCreator = adapterCreator;
        }
    }

    connect() {
        const connection = joinVoiceChannel({
            channelId: this._channelId,
            guildId: this._guildId,
            adapterCreator: this._adapterCreator
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