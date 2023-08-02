import AudioPlayback from "../../utils/ForAudio/AudioPlayer.js";
import Queues from "../../utils/ForAudio/Queue.js";
import VoiceConnectorX from "../../utils/ForVoice/VoiceConnector.js";
import { musicEmbed } from "../../utils/textFormatter.js";
import VConnectionState from "../VoiceStates/VConnectionState.js";
import LoopState from "./LoopState.js";
import MsgState from "./MsgState.js";
import ShuffleState from "./ShuffleState.js";
import StopState from "./StopState.js";
import SubscriptionState from "./SubscriptionState.js";

// add timeout state
let disconnectTimeout;
const VoiceConnector = new VoiceConnectorX();
const APlayerState = async (oldState, newState, msg) => {
    if (oldState.status === 'buffering' && newState.status === 'playing') {
        if (disconnectTimeout) {
            clearTimeout(disconnectTimeout);
        }
        console.log('[Debug] Playing Music');
    }
    if (oldState.status === 'playing' && newState.status === 'idle') {
        if (StopState.getisPlayingNextSong == true && LoopState.getLooping == false) {
            try {
                if (await MsgState.getPrevPlayMsg) {
                    await MsgState.getPrevPlayMsg.delete();
                }
            } catch (error) {
                console.log('[Debug] No Prev Play Msg');
            }
            if (Queues.checkNextQueue()) {
                if (disconnectTimeout) {
                    clearTimeout(disconnectTimeout);
                }

                let nxtSong;

                if (LoopState.getLoopAllQueue == true) {
                    nxtSong = Queues.nextAllQueueLoop();
                } else {
                    nxtSong = Queues.nextQueue();
                }
                if (ShuffleState.getisShuffleOn == true) {
                    Queues.shuffleQueue();
                    ShuffleState.setisShuffleOn = false;
                    nxtSong = Queues.getQueue(0);
                }
                if (ShuffleState.getisShuffleOff == true) {
                    Queues.normalizeQueue();
                    ShuffleState.setisShuffleOff = false;
                    nxtSong = Queues.getQueue(0);
                }
                AudioPlayback.play(nxtSong.url);
                // console.log('next play');
                MsgState.setPrevPlayMsg = await msg.channel.send({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
            } else {
                SubscriptionState.getSubscription.unsubscribe();
                console.log('[Debug] no Playing');
                Queues.clearQueue();

                disconnectTimeout = setTimeout(() => {
                    if (MsgState.getPrevQMsg) {
                        MsgState.getPrevQMsg.edit({ components: [] });
                    }
                    VoiceConnector.disconnect(VConnectionState.getVConnection);
                    VConnectionState.setVConnection = null;
                    ShuffleState.setisShuffleOff = false;
                    ShuffleState.setisShuffleOn = false;
                    ShuffleState.setonShuffle = false;
                    LoopState.setLoopAllQueue = false;
                    LoopState.setLooping = false;
                    console.log('[Debug] Disconnected');
                }, 60000);
            }
        }
        if (LoopState.getLooping == true) {
            if (disconnectTimeout) {
                clearTimeout(disconnectTimeout);
            }
            AudioPlayback.play(Queues.getQueue(0).url);
            try {
                if (await MsgState.getPrevPlayMsg) {
                    await MsgState.getPrevPlayMsg.delete();
                }
            } catch (error) {
                console.log('[Debug] No Prev Play Msg');
            }
            MsgState.setPrevPlayMsg = await msg.channel.send({ embeds: musicEmbed(Queues.getQueue(0).title, Queues.getQueue(0).durationRaw, Queues.getQueue(0).name, Queues.getQueue(0).username, Queues.getQueue(0).thumbnails, Queues.getQueue(0).url) });
        }
    }
}

export default APlayerState;