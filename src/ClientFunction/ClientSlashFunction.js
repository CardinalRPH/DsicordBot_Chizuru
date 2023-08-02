import ClearCurrentQueue from "../Function/AudioFunction/ClearCurrentQueue.js";
import { Loop, LoopAll } from "../Function/AudioFunction/Loop.js";
import NowPlaying from "../Function/AudioFunction/NowPlaying.js";
import Pause from "../Function/AudioFunction/Pause.js";
import Play from "../Function/AudioFunction/Play.js";
import Queue from "../Function/AudioFunction/Queue.js";
import RemoveOne from "../Function/AudioFunction/RemoveOne.js";
import Resume from "../Function/AudioFunction/Resume.js";
import Shuffle from "../Function/AudioFunction/Shuffle.js";
import Skip from "../Function/AudioFunction/Skip.js";
import Stop from "../Function/AudioFunction/Stop.js";
import PrefixCheck from "../Function/CheckPrefix.js";
import PrefixRegisUpdate from "../Function/PrefixRegisterUpdate.js";
import Connect from "../Function/VoiceFunction/Connect.js";
import Disconnect from "../Function/VoiceFunction/Disconnect.js";
import VoiceState from "../States/VoiceStates/VoiceState.js";

const ClientSlashFunction = (client) => {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand()) return;

        const { commandName, options } = interaction;

        try {
            VoiceState.setVoiceChannel = interaction.member.voice.channel
        } catch (e) {
            console.error(e);
        }

        switch (commandName) {
            case 'ping':
                interaction.reply(`🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
                break;
            case 'play':
                await Play(interaction, options.get('track-resource').value);
                break;
            case 'stop':
                Stop(interaction);
                break;
            case 'pause':
                Pause(interaction);
                break;
            case 'resume':
                Resume(interaction)
                break;
            case 'queue':
                Queue(interaction, client);
                break;
            case 'nowplaying':
                NowPlaying(interaction);
                break;
            case 'skip':
                options.get('skip-to-index') ? Skip(interaction, options.get('skip-to-index').value, false) : Skip(interaction, false, true);
                break;
            case 'loop':
                Loop(interaction);
                break;
            case 'loopall':
                LoopAll(interaction);
                break;
            case 'shuffle':
                Shuffle(interaction);
                break;
            case 'clear-current-queue':
                ClearCurrentQueue(interaction);
            case 'connect':
                Connect(interaction);
                break;
            case 'disconnect':
                Disconnect(interaction);
                break;
            case 'remove-queue':
                RemoveOne(interaction, options.get('remove-index').value);
                break;
            case 'change-prefix':
                PrefixRegisUpdate(interaction);
                break;
            case 'prefix-check':
                PrefixCheck(interaction);
                break;
        }
    });
}

export default ClientSlashFunction;