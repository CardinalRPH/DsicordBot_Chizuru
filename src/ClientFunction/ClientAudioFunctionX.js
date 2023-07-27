// import { musicButton, musicEmbed } from "../utils/textFormatter.js";
import { prefix } from "../Global/Variable.js";

import VoiceState from "../States/VoiceStates/VoiceState.js";
// import VConnectionState from "../States/VoiceStates/VConnectionState.js";
// import VoiceConnector from "../utils/ForVoice/VoiceConnector.js";
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

const ClientAudioFunctionX = (client) => {


    client.on('messageCreate', async (msg) => {
        //skip dulu
        try {
            VoiceState.setVoiceChannel = msg.member.voice.channel;
        } catch (e) {
            console.log('not in voice');
        }

        let content = msg.content.split(' ')[0].toString();

        switch (true) {
            case content == `${prefix}ping`:
                msg.reply(`🏓Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
                break;
            case content == `${prefix}connect`:
                Connect(msg);
                break;
            case (content == `${prefix}disconnect`) || (content == `${prefix}dc`):
                Disconnect(msg);
                break;
            case (content == `${prefix}play`) || (content == `${prefix}p`):
                console.log(`Call on shard ${client.shard.ids.join(', ')}`);
                Play(msg);
                break;
            case content == `${prefix}pause`:
                Pause(msg)
                break;
            case content == `${prefix}resume`:
                Resume(msg);
                break;
            case content == `${prefix}stop`:
                Stop(msg);
                break;
            case (content == `${prefix}queue`) || (content == `${prefix}q`):
                Queue(msg, client);
                break;
            case (content == `${prefix}skip`) || (content == `${prefix}fs`):
                Skip(msg);
                break;

            case (content == `${prefix}nowplaying`) || (content == `${prefix}np`):
                NowPlaying(msg);
                break;

            case content == `${prefix}loop`:
                Loop(msg);
                break;

            case content == `${prefix}shuffle`:
                Shuffle(msg);
                break;

            case content == `${prefix}loopall`:
                LoopAll(msg);
                break;

            case content == `${prefix}clearcurrent`:
                ClearCurrentQueue(msg);
                break;

            case content == `${prefix}remove`:
                RemoveOne(msg);
                break;

            case content == `${prefix}cdevdebug`:
                // console.log(Playerplayback.player.state.status);
                // console.log(Queuex.getAllQueue());
                // console.log(`the id is${Queuex.queue[0].id}`);
                console.log('hehe');
                break;

        }

    });

}

export default ClientAudioFunctionX;