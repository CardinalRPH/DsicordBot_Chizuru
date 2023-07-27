import MsgState from "../../States/AudioStates/MsgState.js";
import ShuffleState from "../../States/AudioStates/ShuffleState.js";

const Shuffle = (msg) => {
    if (MsgState.getPrevQMsg) {
        MsgState.getPrevQMsg.edit({ components: [] });
    }
    if (ShuffleState.getonShuffle) {
        ShuffleState.setisShuffleOff = true
        ShuffleState.setonShuffle = false;
        msg.reply('Turning Off Shuffle');
    } else {
        ShuffleState.setonShuffle = true
        ShuffleState.setonShuffle = true
        msg.reply('Turning on Shuffle');
    }
}

export default Shuffle;