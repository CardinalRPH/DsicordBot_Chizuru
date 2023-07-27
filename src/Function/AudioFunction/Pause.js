import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import AudioPlayback from "../../utils/ForAudio/AudioPlayer.js";

const Pause = (msg) => {
    if (VoiceState.getVoiceChannel && VConnectionState.getVConnection) {
        if (VoiceState.getVoiceChannel.id == VoiceState.getClientVoiceId) {
            if (AudioPlayback.player.state.status === 'playing') {
                AudioPlayback.pause();
                msg.reply('Paused ✅');
            }

        } else {
            msg.reply('You are not in Same Voice Channel');
        }
    } else {
        msg.reply('You are not in Voice');
    }
}

export default Pause;