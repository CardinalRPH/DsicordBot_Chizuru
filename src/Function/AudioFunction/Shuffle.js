import MsgState from "../../States/AudioStates/MsgState.js";
import ShuffleState from "../../States/AudioStates/ShuffleState.js";
import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";

const Shuffle = (msg) => {
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
    if (MsgState.getPrevQMsg) {
        MsgState.getPrevQMsg.edit({ components: [] });
    }
    if (ShuffleState.getonShuffle) {
        ShuffleState.setisShuffleOff = true
        ShuffleState.setonShuffle = false;
        msg.reply('Turning Off Shuffle');
    } else {
        ShuffleState.setonShuffle = true
        ShuffleState.setonShuffle = true
        msg.reply('Turning on Shuffle');
    }
}

export default Shuffle;