import LoopState from "../States/AudioStates/LoopState.js";
import MsgState from "../States/AudioStates/MsgState.js";
import ShuffleState from "../States/AudioStates/ShuffleState.js";
import SubscriptionState from "../States/AudioStates/SubscriptionState.js";
import VConnectionState from "../States/VoiceStates/VConnectionState.js";
import Queues from "../utils/ForAudio/Queue.js";
import VoiceConnectorX from "../utils/ForVoice/VoiceConnector.js";

const VoiceConnector = new VoiceConnectorX();
const VcUpdate = (client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        const botId = client.user.id;
        if (VConnectionState.getVConnection != null) {
            if (oldState.member.id === botId && oldState.channelId && !newState.channelId) {
                console.log(`[Debug] Bot has been disconnected from voice channel: ${oldState.channel.name} (ID: ${oldState.channelId})`);
    
                SubscriptionState.getSubscription.unsubscribe();
                console.log('[Debug] Force Disconnect');
                Queues.clearQueue();
                try {
                    if (await MsgState.getPrevPlayMsg) {
                        await MsgState.getPrevPlayMsg.delete();
                    }
                } catch (error) {
                    console.log('[Debug] No Prev Play Msg');
                }
                VoiceConnector.disconnect(VConnectionState.getVConnection);
                VConnectionState.setVConnection = null;
                ShuffleState.setisShuffleOff = false;
                ShuffleState.setisShuffleOn = false;
                ShuffleState.setonShuffle = false;
                LoopState.setLoopAllQueue = false;
                LoopState.setLooping = false;
            }
        }
       
    });
}

export default VcUpdate;