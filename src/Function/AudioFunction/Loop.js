import LoopState from "../../States/AudioStates/LoopState.js";

export const Loop = (msg) => {
    if (LoopState.getLooping) {
        LoopState.setLooping = false;
        msg.reply('Turning Off Looping');
    } else {
        LoopState.setLooping = true;
        msg.reply('Turning on Looping');
    }
}

export const LoopAll = (msg) => {
    if (LoopState.getLoopAllQueue) {
        LoopState.setLoopAllQueue = false;
        msg.reply('Turning Off Loopingfor All Song');
    } else {
        LoopState.setLoopAllQueue = true;
        msg.reply('Turning On Looping for all songs in queue.');
    }
}