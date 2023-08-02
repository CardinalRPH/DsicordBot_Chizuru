import MsgState from "../../States/AudioStates/MsgState.js";
import StopState from "../../States/AudioStates/StopState.js";
import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import AudioPlayback from "../../utils/ForAudio/AudioPlayer.js";
import Queues from "../../utils/ForAudio/Queue.js";
import { musicEmbed } from "../../utils/textFormatter.js";

const Resume = async (msg) => {
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
    StopState.setisPlayingNextSong = true;
    if (AudioPlayback.player.state.status === 'paused') {
        msg.reply('Resume ✅');
        console.log('[Debug] Paused');
        AudioPlayback.resume();
    } else if (AudioPlayback.player.state.status === 'idle') {
        console.log('[Debug] isIdle');
        if (Queues.getMaxId() >= 1) {
            StopState.setisPlayingNextSong = true;
            AudioPlayback.play(Queues.getQueue(0).url);
            if (MsgState.getPrevPlayMsg) {
                MsgState.getPrevPlayMsg.delete();
            }
            MsgState.setPrevPlayMsg = await msg.reply({ embeds: musicEmbed(Queues.getQueue(0).title, Queues.getQueue(0).durationRaw, Queues.getQueue(0).name, Queues.getQueue(0).username, Queues.getQueue(0).thumbnails, Queues.getQueue(0).url) });
        }
    }
}

export default Resume;