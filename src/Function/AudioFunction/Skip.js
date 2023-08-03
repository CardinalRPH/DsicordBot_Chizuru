import LoopState from "../../States/AudioStates/LoopState.js";
import MsgState from "../../States/AudioStates/MsgState.js";
import ShuffleState from "../../States/AudioStates/ShuffleState.js";
import StopState from "../../States/AudioStates/StopState.js";
import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import AudioPlayback from "../../utils/ForAudio/AudioPlayer.js";
import Queues from "../../utils/ForAudio/Queue.js";
import { musicEmbed } from "../../utils/textFormatter.js";

const Skip = async (msg, slashindex, iSlashSKip) => {
    let keyTo;
    if (slashindex) {
        keyTo = slashindex;
    } else if (iSlashSKip) {
        keyTo = '';
    } else {
        keyTo = msg.content.split(' ').slice(1).join(' ');
    }
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

        if (keyTo == '' || keyTo == ' ') {
            StopState.setisPlayingNextSong = false;
            AudioPlayback.stop();
            let nxtSong;

            if (LoopState.getLoopAllQueue == true) {
                nxtSong = await Queues.nextAllQueueLoop();
            } else {
                nxtSong = await Queues.nextQueue();
            }
            try {
                if (await MsgState.getPrevPlayMsg) {
                    await MsgState.getPrevPlayMsg.delete();
                }
            } catch (error) {
                console.log('[Debug] No Prev Play Msg');
            }

            if (ShuffleState.getisShuffleOn == true) {
                Queues.shuffleQueue();
                ShuffleState.setisShuffleOn = false;
                nxtSong = await Queues.getQueue(0);
            }
            if (ShuffleState.getisShuffleOff == true) {
                Queues.normalizeQueue();
                ShuffleState.setisShuffleOff = false;
                nxtSong = await Queues.getQueue(0);
            }
            if (nxtSong) {
                AudioPlayback.play(nxtSong.url).then(() => {
                    StopState.setisPlayingNextSong = true;
                }).catch((e) => {
                    console.error(e);
                })
                MsgState.setPrevPlayMsg = await msg.reply({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
            }

        } else {
            if (Queues.checkNextQueue()) {
                const nkeyTo = parseInt(keyTo);
                if (typeof keyTo != 'number' && isNaN(nkeyTo)) {
                    msg.reply(`Your input isn't number`);
                    return;
                }
                StopState.setisPlayingNextSong = false;
                AudioPlayback.stop();

                //add handler here when > queue length
                if (LoopState.getLoopAllQueue == true) {
                    Queues.skipAllQueueLoop(nkeyTo);
                } else {
                    Queues.deleteQueueBef(nkeyTo);
                }
                let nxtSong = await Queues.getQueue(0);
                AudioPlayback.play(nxtSong.url).then(() => {
                    StopState.setisPlayingNextSong = true;
                }).catch((e) => {
                    console.error(e);
                })
                try {
                    if (await MsgState.getPrevPlayMsg) {
                        await MsgState.getPrevPlayMsg.delete();
                    }
                } catch (error) {
                    console.log('[Debug] No Prev Play Msg');
                }
                MsgState.setPrevPlayMsg = await msg.reply({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
            } else {
                msg.reply('No next song in queue');
            }
        }

    }
}

export default Skip;