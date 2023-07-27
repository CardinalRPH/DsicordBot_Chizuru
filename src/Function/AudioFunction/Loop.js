import LoopState from "../../States/AudioStates/LoopState.js";

const Loop = (msg) => {
    if (LoopState.getLooping) {
        LoopState.setLooping = false;
        msg.reply('Turning Off Looping');
    } else {
        LoopState.setLooping = true;
        msg.reply('Turning on Looping');
    }
}

export default Loop;