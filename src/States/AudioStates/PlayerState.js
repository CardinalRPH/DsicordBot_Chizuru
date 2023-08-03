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

const VoiceConnector = new VoiceConnectorX();

const APlayerState = async (oldState, newState, msg) => {

    if (oldState.status == 'playing' && newState.status == 'idle')
        if (AudioPlayback.player.state.status == 'idle') {
            if (StopState.getisPlayingNextSong == true && LoopState.getLooping == false) {
                try {
                    if (MsgState.getPrevPlayMsg != null) {
                        MsgState.getPrevPlayMsg.delete();
                        MsgState.setPrevPlayMsg = null;
                    }
                } catch (error) {
                    console.log('[Debug] No Prev Play Msg');
                }

                if (Queues.checkNextQueue()) {

                    let nxtSong;

                    if (LoopState.getLoopAllQueue == true) {
                        nxtSong = await Queues.nextAllQueueLoop();
                    } else {
                        nxtSong = await Queues.nextQueue();
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
                    AudioPlayback.play(nxtSong.url).then(() => {
                        SubscriptionState.setSubscription = VConnectionState.getVConnection.subscribe(AudioPlayback.player);
                    })
                    MsgState.setPrevPlayMsg = await msg.channel.send({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
                } else {
                    SubscriptionState.getSubscription.unsubscribe();
                    Queues.clearQueue();
                    if (MsgState.getPrevQMsg) {
                        MsgState.getPrevQMsg.edit({ components: [] });
                    }
                    Queues.clearQueue();
                    try {
                        if (VConnectionState.getVConnection != null) {
                            VoiceConnector.disconnect(VConnectionState.getVConnection);
                        }

                    } catch (error) {
                        console.log('[Debug] Already Disconnect');
                    }
                    VConnectionState.setVConnection = null;
                    ShuffleState.setisShuffleOff = false;
                    ShuffleState.setisShuffleOn = false;
                    ShuffleState.setonShuffle = false;
                    LoopState.setLoopAllQueue = false;
                    LoopState.setLooping = false;
                }
            }
            if (LoopState.getLooping == true) {
                let nxtSong = await Queues.getQueue(0);
                AudioPlayback.play(nxtSong.url);
                try {
                    if (await MsgState.getPrevPlayMsg) {
                        await MsgState.getPrevPlayMsg.delete();
                    }
                } catch (error) {
                    console.log('[Debug] No Prev Play Msg');
                }
                MsgState.setPrevPlayMsg = await msg.channel.send({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
            }
        }
}


export default APlayerState;