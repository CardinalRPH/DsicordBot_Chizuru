class TheVoiceState {
    constructor() {
        this.VConnector = null;
        this.clientVoiceId = null;
        this.voiceChannel = null;
    }

    set setVConnector(value) {
        this.VConnector = value;
    }

    set setClientVoiceId(value) {
        this.clientVoiceId = value
    }

    set setVoiceChannel(value) {
        this.voiceChannel = value
    }

    get getVConnector() {
        return this.VConnector
    }

    get getClientVoiceId() {
        return this.clientVoiceId
    }

    get getVoiceChannel() {
        return this.voiceChannel
    }
}

const VoiceState = new TheVoiceState();
export default VoiceState;