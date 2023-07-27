import MsgState from "../../States/AudioStates/MsgState.js";
import APlayerState from "../../States/AudioStates/PlayerState.js";
import SubscriptionState from "../../States/AudioStates/SubscriptionState.js";
import VConnectionState from "../../States/VoiceStates/VConnectionState.js";
import VoiceState from "../../States/VoiceStates/VoiceState.js";
import addSongsQueue from "../../utils/ForAudio/AddSongQueue.js";
import AudioPlayback from "../../utils/ForAudio/AudioPlayer.js";
import Queues from "../../utils/ForAudio/Queue.js";
import VoiceConnectorX from "../../utils/ForVoice/VoiceConnector.js";
import { musicEmbed } from "../../utils/textFormatter.js";

const VoiceConnector = new VoiceConnectorX();

const Play = async (msg, slashResource) => {
    if (!VoiceState.getVoiceChannel) {
        msg.reply('You are not in Voice');
        return;
    }
    let resource;
    if (slashResource) {
        msg.reply('Checking...');
        resource = slashResource;
    } else {
        resource = msg.content.split(' ').slice(1).join(' ');
    }
    if (VConnectionState.getVConnection != null) {
        if (VoiceState.getVoiceChannel.id == VoiceState.getClientVoiceId) {
            await addSongsQueue(resource, msg);
            if (Queues.getMaxId() == 1) {
                AudioPlayback.play(Queues.getQueue(0).url);
                MsgState.setPrevPlayMsg = await msg.reply({ embeds: musicEmbed(Queues.getQueue(0).title, Queues.getQueue(0).durationRaw, Queues.getQueue(0).name, Queues.getQueue(0).username, Queues.getQueue(0).thumbnails, Queues.getQueue(0).url) });
                SubscriptionState.setSubscription = VConnectionState.getVConnection.subscribe(AudioPlayback.player);
            }
        } else {
            msg.reply('You are not in Same Voice Channel');
        }
    } else {
        VConnectionState.setVConnection = VoiceConnector.connect(VoiceState.getVoiceChannel.id, VoiceState.getVoiceChannel.guild.id, VoiceState.getVoiceChannel.guild.voiceAdapterCreator);
        VoiceConnector.VoiceReady(VConnectionState.getVConnection).then(async () => {
            VoiceState.setClientVoiceId = VoiceState.getVoiceChannel.id;
            if (Queues.getMaxId() == 0) {
                await addSongsQueue(resource, msg);
                AudioPlayback.play(Queues.getQueue(0).url);
                MsgState.setPrevPlayMsg = await msg.channel.send({ embeds: musicEmbed(Queues.getQueue(0).title, Queues.getQueue(0).durationRaw, Queues.getQueue(0).name, Queues.getQueue(0).username, Queues.getQueue(0).thumbnails, Queues.getQueue(0).url) });
                SubscriptionState.setSubscription = VConnectionState.getVConnection.subscribe(AudioPlayback.player);

            }
            AudioPlayback.player.on('stateChange', (oldState, newState) => {
                APlayerState(oldState, newState, msg)

                // Add disni blomm adaa
            });
        }).catch((e) => {
            console.log(e);
        })
    }
}

export default Play;