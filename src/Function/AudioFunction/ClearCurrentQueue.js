import Queues from "../../utils/ForAudio/Queue.js"

const ClearCurrentQueue = (msg) => {
    Queues.clearCurrentQueue();
    msg.reply("✅ Cleared the current queue.");
}

export default ClearCurrentQueue;