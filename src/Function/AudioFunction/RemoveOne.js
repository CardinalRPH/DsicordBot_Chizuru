import Queues from "../../utils/ForAudio/Queue.js";

const RemoveOne = (msg, slashindex) => {
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