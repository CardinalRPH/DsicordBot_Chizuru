import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import VoiceConnectorX from "../../utils/ForVoice/VoiceConnector.js";

const VoiceConnector = new VoiceConnectorX();
const Connect = (msg) => {
    if (!VoiceState.getVoiceChannel) {
        msg.reply('You are not in Voice');
        return
    }
    if (VConnectionState.getVConnection) {
        msg.reply('Already connect');
        return
    }
    VConnectionState.setVConnection = VoiceConnector.connect(VoiceState.getVoiceChannel.id, VoiceState.getVoiceChannel.guild.id, VoiceState.getVoiceChannel.guild.voiceAdapterCreator);
    if (VConnectionState.getVConnection) {
        VoiceState.setClientVoiceId = VoiceState.getVoiceChannel.id;
        console.log("Connected to channel");
        msg.reply('Voice Connected');
    }
}

export default Connect;