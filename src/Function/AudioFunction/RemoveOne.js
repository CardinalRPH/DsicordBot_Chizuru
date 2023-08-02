import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import Queues from "../../utils/ForAudio/Queue.js";

const RemoveOne = (msg, slashindex) => {
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
    let keyTo;
    if (slashindex) {
        keyTo = slashindex;
    } else {
        keyTo = msg.content.split(' ').slice(1).join(' ');
    }
    const nkeyTo = parseInt(keyTo);
    if (typeof keyTo != 'number' && isNaN(nkeyTo)) {
        msg.reply(`Your input isn't number`);
        return;
    }
    const dataQueue = Queues.getQueue(nkeyTo);
    msg.reply(`${dataQueue.title} Removed from the Queue`)
    Queues.removeOneQueue(nkeyTo);
}

export default RemoveOne;