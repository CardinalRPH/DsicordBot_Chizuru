import StopState from "../../States/AudioStates/StopState.js";
import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import AudioPlayback from "../../utils/ForAudio/AudioPlayer.js";

const Stop = (msg) => {
    if (VoiceState.getVoiceChannel && VConnectionState.getVConnection) {
        if (VoiceState.getVoiceChannel.id == VoiceState.getClientVoiceId) {
            if (AudioPlayback.player.state.status === 'paused' || AudioPlayback.player.state.status === 'playing') {
                StopState.setisPlayingNextSong = false;
                AudioPlayback.stop();
                msg.reply('Stoped ✅');
            }

        } else {
            msg.reply('You are not in Same Voice Channel');
        }
    } else {
        msg.reply('You are not in Voice');
    }
}

export default Stop;