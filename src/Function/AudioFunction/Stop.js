import StopState from "../../States/AudioStates/StopState.js";
import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import AudioPlayback from "../../utils/ForAudio/AudioPlayer.js";

const Stop = (msg) => {
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
    if (AudioPlayback.player.state.status === 'paused' || AudioPlayback.player.state.status === 'playing') {
        StopState.setisPlayingNextSong = false;
        AudioPlayback.stop();
        msg.reply('Stoped ✅');
    }
}

export default Stop;