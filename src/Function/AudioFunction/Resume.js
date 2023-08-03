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
        AudioPlayback.resume();
    } else if (AudioPlayback.player.state.status === 'idle') {
        if (Queues.getMaxId() >= 1) {
            StopState.setisPlayingNextSong = true;
            let nxtSong = await Queues.getQueue(0);
            AudioPlayback.play(nxtSong.url);
            try {
                if (await MsgState.getPrevPlayMsg) {
                    await MsgState.getPrevPlayMsg.delete();
                }
            } catch (error) {
                console.log('[Debug] No Prev Play Msg');
            }
            MsgState.setPrevPlayMsg = await msg.reply({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
        }
    }
}

export default Resume;