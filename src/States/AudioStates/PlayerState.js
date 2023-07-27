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
        console.log('[Debug] Playing Music');
    }
    if (oldState.status === 'playing' && newState.status === 'idle') {
        if (StopState.getisPlayingNextSong == true && LoopState.getLooping == false ) {
            if (Queues.checkNextQueue()) {
                let nxtSong = Queues.nextQueue();
                
                if (LoopState.getLoopAllQueue == true) {
                    nxtSong = Queues.nextQueueLoop();
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
                if (MsgState.getPrevPlayMsg) {
                    MsgState.getPrevPlayMsg.delete();
                }
                if (disconnectTimeout) {
                    clearTimeout(disconnectTimeout);
                }
                MsgState.setPrevPlayMsg = await msg.channel.send({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
            } else {
                SubscriptionState.getSubscription.unsubscribe();
                console.log('[Debug] no Playing');
                Queues.clearQueue();
                MsgState.getPrevPlayMsg.delete();

                disconnectTimeout = setTimeout(() => {
                    VoiceConnector.disconnect(VConnectionState.getVConnection);
                    VConnectionState.setVConnection = null;
                    console.log('[Debug] Disconnected');
                }, 60000);
            }
        }
        if (LoopState.getLooping == true) {
            AudioPlayback.play(Queues.getQueue(0).url);
            if (MsgState.getPrevPlayMsg) {
                MsgState.getPrevPlayMsg.delete();
            }
            MsgState.setPrevPlayMsg = await msg.channel.send({ embeds: musicEmbed(Queues.getQueue(0).title, Queues.getQueue(0).durationRaw, Queues.getQueue(0).name, Queues.getQueue(0).username, Queues.getQueue(0).thumbnails, Queues.getQueue(0).url) });
            if (disconnectTimeout) {
                clearTimeout(disconnectTimeout);
            }
        }
    }
}

export default APlayerState;