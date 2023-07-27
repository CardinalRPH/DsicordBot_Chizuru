import MsgState from "../../States/AudioStates/MsgState.js";
import Queues from "../../utils/ForAudio/Queue.js";
import { musicEmbed } from "../../utils/textFormatter.js";

const NowPlaying = async (msg) => {
    if (MsgState.getPrevPlayMsg) {
        MsgState.getPrevPlayMsg.delete();
    }
    MsgState.setPrevPlayMsg = await msg.reply({ embeds: musicEmbed(Queues.getQueue(0).title, Queues.getQueue(0).durationRaw, Queues.getQueue(0).name, Queues.getQueue(0).username, Queues.getQueue(0).thumbnails, Queues.getQueue(0).url) });
}

export default NowPlaying;