import { prefix } from "../Global/Variable.js";

import VoiceState from "../States/VoiceStates/VoiceState.js";
import Connect from "../Function/VoiceFunction/Connect.js";
import Disconnect from "../Function/VoiceFunction/Disconnect.js";
import Play from "../Function/AudioFunction/Play.js";
import Pause from "../Function/AudioFunction/Pause.js";
import Resume from "../Function/AudioFunction/Resume.js";
import Stop from "../Function/AudioFunction/Stop.js";
import Queue from "../Function/AudioFunction/Queue.js";
import Skip from "../Function/AudioFunction/Skip.js";
import NowPlaying from "../Function/AudioFunction/NowPlaying.js";
import { Loop, LoopAll } from "../Function/AudioFunction/Loop.js";
import Shuffle from "../Function/AudioFunction/Shuffle.js";
import ClearCurrentQueue from "../Function/AudioFunction/ClearCurrentQueue.js";
import RemoveOne from "../Function/AudioFunction/RemoveOne.js";
import PrefixState from "../States/PrefixState.js";

const ClientAudioFunctionX = (client) => {


    client.on('messageCreate', async (msg) => {

        //skip dulu
        try {
            VoiceState.setVoiceChannel = msg.member.voice.channel;
        } catch (e) {
            console.log('not in voice');
        }
        let content = msg.content.split(' ')[0].toString();
        let prefixx;
        const guildId = msg.guild?.id;

        try {
            const guildPrefixEntry = await PrefixState(guildId);
            prefixx = guildPrefixEntry?.prefix || prefix;
        } catch (error) {
            console.error(error);
        }

        switch (true) {
            case content == `${prefixx}ping`:
                msg.reply(`🏓Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
                break;
            case content == `${prefixx}connect`:
                Connect(msg);
                break;
            case (content == `${prefixx}disconnect`) || (content == `${prefixx}dc`):
                Disconnect(msg);
                break;
            case (content == `${prefixx}play`) || (content == `${prefixx}p`):
                console.log(`[Debug] Call on shard ${client.shard.ids.join(', ')}`);
                Play(msg);
                break;
            case content == `${prefixx}pause`:
                Pause(msg)
                break;
            case content == `${prefixx}resume`:
                Resume(msg);
                break;
            case content == `${prefixx}stop`:
                Stop(msg);
                break;
            case (content == `${prefixx}queue`) || (content == `${prefixx}q`):
                Queue(msg, client);
                break;
            case (content == `${prefixx}skip`) || (content == `${prefixx}fs`):
                Skip(msg, false, false);
                break;

            case (content == `${prefixx}nowplaying`) || (content == `${prefixx}np`):
                NowPlaying(msg);
                break;

            case content == `${prefixx}loop`:
                Loop(msg);
                break;

            case content == `${prefixx}shuffle`:
                Shuffle(msg);
                break;

            case content == `${prefixx}loopall`:
                LoopAll(msg);
                break;

            case content == `${prefixx}clearcurrent`:
                ClearCurrentQueue(msg);
                break;

            case content == `${prefixx}remove`:
                RemoveOne(msg);
                break;

            case content == `${prefixx}cdevdebug`:
                // console.log(Playerplayback.player.state.status);
                // console.log(Queuex.getAllQueue());
                // console.log(`the id is${Queuex.queue[0].id}`);
                console.log('[Debug] For Debug');
                break;

        }

    });

}

export default ClientAudioFunctionX;