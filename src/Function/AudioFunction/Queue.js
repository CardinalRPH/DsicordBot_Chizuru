import MsgState from "../../States/AudioStates/MsgState.js";
import PageState from "../../States/AudioStates/PageState.js";
import Queues from "../../utils/ForAudio/Queue.js";
import { musicButton } from "../../utils/textFormatter.js";

const Queue = async (msg, client) => {
    if (MsgState.getPrevQMsg) {
        MsgState.getPrevQMsg.edit({ components: [] });
    }
    const QueueA = Queues.getAllQueue();
    MsgState.setPrevQMsg = await msg.reply(QueueA.length > 5 ? {
        content: `\`\`\`ini\n ${QueueA.slice(0, PageState.getPageSize).map((value, index) => `[${index}] ${value.title} ReqBy ${value.username}\n`)}\`\`\``,
        components: musicButton(true, false)
    } : {
        content: `\`\`\`ini\n ${QueueA.slice(0, PageState.getPageSize).map((value, index) => `[${index}] ${value.title} ReqBy ${value.username}\n`)}\`\`\``,
        components: []
    });

    client.on('interactionCreate', async (interaction) => {
        try {
            if (!interaction.isButton()) return
            if (interaction.customId == 'row_0_button_prevPg') {
                PageState.setCurrentPage = Math.max(PageState.getCurrentPage - 1, 0);
            } else if (interaction.customId == 'row_0_button_nextPg') {
                PageState.setCurrentPage = PageState.getCurrentPage + 1;
            }

            const startIdx = PageState.getCurrentPage * PageState.getPageSize;
            const endIdx = startIdx + PageState.getPageSize;
            await interaction.update({
                content: `\`\`\`ini\n ${QueueA.slice(startIdx, endIdx).map((value, index) => `[${index + PageState.getPageSize * PageState.getCurrentPage}] ${value.title} ReqBy ${value.username}XX\n`)}\`\`\``,
                components: musicButton(PageState.getCurrentPage === 0, (PageState.getCurrentPage + 1) * PageState.getPageSize >= QueueA.length)
            });
        } catch (e) {
            // console.log(e);
            console.log('Something wrong');
        }
    });
}

export default Queue;