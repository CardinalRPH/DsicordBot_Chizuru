import LoopState from "../../States/AudioStates/LoopState.js";
import MsgState from "../../States/AudioStates/MsgState.js";
import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";

export const Loop = (msg) => {
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
    if (LoopState.getLooping) {
        LoopState.setLooping = false;
        msg.reply('Turning Off Looping');
    } else {
        LoopState.setLooping = true;
        msg.reply('Turning on Looping');
    }
}

export const LoopAll = (msg) => {
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
    if (MsgState.getPrevQMsg) {
        MsgState.getPrevQMsg.edit({ components: [] });
    }
    if (LoopState.getLoopAllQueue) {
        LoopState.setLoopAllQueue = false;
        msg.reply('Turning Off Loopingfor All Song');
    } else {
        LoopState.setLoopAllQueue = true;
        msg.reply('Turning On Looping for all songs in queue.');
    }
}