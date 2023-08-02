import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import Queues from "../../utils/ForAudio/Queue.js"

const ClearCurrentQueue = (msg) => {
    if (!VoiceState.getVoiceChannel) {
        msg.reply('You are not in Voice Channel');
        return;
    }
    if (!VConnectionState.getVConnection) {
        msg.reply('Bot not in Voice Channel');
        return;
    }
    if (VoiceState.getVoiceChannel.id != VoiceState.getClientVoiceId) {
        msg.reply('You are not in Same Voice Channel');
        return;
    }
    Queues.clearCurrentQueue();
    msg.reply("✅ Cleared the current queue.");
}

export default ClearCurrentQueue;