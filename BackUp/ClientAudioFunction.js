import VoiceConnector from "../src/utils/ForVoice/VoiceConnector.js";
import AudioPlayback from "../src/utils/ForAudio/AudioPlayer.js";
import { musicButton, musicEmbed } from "../src/utils/textFormatter.js";
import Queues from "../src/utils/ForAudio/Queue.js";
import VConnectionState from "../src/States/VoiceStates/VConnectionState.js";
import { prefix } from "../src/Global/Variable.js";

const Playerplayback = new AudioPlayback(); //playbackState
const Queuex = new Queues(); //Queue State

const VConnState = new VConnectionState();
let VConnector = null; //voice state
let clientVoiceId = null;
let voiceChannel = null;

let subscription = null; //subState

let prevMessage; //msgState
let prevPlaying;

const pageSize = 7; //pageState
let CurrentPage = 0;

let isPlayingNextSong = true; //stop file

let isLooping = false; //loop state

let isShuffleOn = false; //shuffle state
let isShuffleOff = false;
let onShuffle = false;

//note
// add handler when music end of queue isPlayingNextSong = false
// add handler when music first playig or connect isPlayingNextSong = true
const ClientAudioFunction = (client) => {
    const APlayerState = async (oldState, newState, msg) => {
        if (oldState.status === 'buffering' && newState.status === 'playing') {
            console.log('Playing Music');
        }
        if (oldState.status === 'playing' && newState.status === 'idle') {
            if (isPlayingNextSong == true && isLooping == false) {
                if (Queuex.checkNextQueue()) {
                    let nxtSong = Queuex.nextQueue();
                    if (isShuffleOn == true) {
                        Queuex.shuffleQueue();
                        isShuffleOn = false;
                        nxtSong = Queuex.getQueue(0);
                    }
                    if (isShuffleOff == true) {
                        Queuex.normalizeQueue();
                        isShuffleOff = false;
                        nxtSong = Queuex.getQueue(0);
                    }
                    Playerplayback.play(nxtSong.url);
                    console.log('next play');
                    if (prevPlaying) {
                        prevPlaying.delete();
                    }
                    prevPlaying = await msg.channel.send({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
                } else {
                    subscription.unsubscribe();
                    console.log('[Debug] 1d');
                    Queuex.clearQueue();
                }
            }
            if (isLooping == true) {
                Playerplayback.play(Queuex.getQueue(0).url);
                if (prevPlaying) {
                    prevPlaying.delete();
                }
                prevPlaying = await msg.channel.send({ embeds: musicEmbed(Queuex.getQueue(0).title, Queuex.getQueue(0).durationRaw, Queuex.getQueue(0).name, Queuex.getQueue(0).username, Queuex.getQueue(0).thumbnails, Queuex.getQueue(0).url) });
            }

        }
    }

    client.on('messageCreate', async (msg) => {
        try {
            voiceChannel = msg.member.voice.channel;
            if (voiceChannel && !VConnState.getVConnection()) {
                VConnector = new VoiceConnector(voiceChannel.id, voiceChannel.guild.id, voiceChannel.guild.voiceAdapterCreator);
            }
        } catch (e) {
            console.log('[Debug] not in voice');
        }

        switch (true) {
            case msg.content.split(' ')[0].toString() == `${prefix}ping`:
                msg.reply(`🏓Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
                break;

            case msg.content.split(' ')[0].toString() == `${prefix}connect`:
                if (!voiceChannel) {
                    msg.reply('You are not in Voice');
                    return
                }
                if (VConnState.getVConnection()) {
                    msg.reply('Already connect');
                    return
                }
                VConnState.setVConnection(VConnector.connect())
                if (VConnState.getVConnection()) {
                    clientVoiceId = voiceChannel.id
                    console.log("Connected to channel");
                    msg.reply('Voice Connected');
                }
                break;

            case msg.content.split(' ')[0].toString() == `${prefix}disconnect`:
                if (!voiceChannel) {
                    msg.reply('You are not in Voice');
                    return;
                }
                if (!VConnState.getVConnection() && (voiceChannel.id != clientVoiceId)) {
                    msg.reply('You are not in Same Voice Channel');
                    return;
                }
                const noConnect = VConnector.disconnect(VConnState.getVConnection());
                if (noConnect) {
                    subscription.unsubscribe();
                    console.log('[Debug] Disconnect');
                    Queuex.clearQueue();
                    VConnState.setVConnection(null);
                    console.log("Disconnected to channel");
                    msg.reply('Voice Disconnected');
                }
                break;

            case msg.content.split(' ')[0].toString() == `${prefix}yt`:
                console.log(`Call on shard ${client.shard.ids.join(', ')}`);
                if (!voiceChannel) {
                    msg.reply('You are not in Voice');
                    return;
                }
                const resource = msg.content.split(' ').slice(1).join(' ');
                if (VConnState.getVConnection() != null) {
                    if (voiceChannel.id == clientVoiceId) {
                        await addSongsQueue(resource, msg);
                        console.log(Queuex.getMaxId());
                        if (Queuex.getMaxId() == 1) {
                            Playerplayback.play(Queuex.getQueue(0).url);
                            prevPlaying = await msg.channel.send({ embeds: musicEmbed(Queuex.getQueue(0).title, Queuex.getQueue(0).durationRaw, Queuex.getQueue(0).name, Queuex.getQueue(0).username, Queuex.getQueue(0).thumbnails, Queuex.getQueue(0).url) });
                            // VConnState.getVConnection().subscribe(Playerplayback.player);
                        }
                    } else {
                        msg.reply('You are not in Same Voice Channel');
                    }
                } else {
                    VConnState.setVConnection(VConnector.connect());
                    VConnector.VoiceReady(VConnState.getVConnection()).then(async () => {
                        clientVoiceId = voiceChannel.id;
                        if (Queuex.getMaxId() == 0) {
                            await addSongsQueue(resource, msg);
                            Playerplayback.play(Queuex.getQueue(0).url);
                            prevPlaying = await msg.channel.send({ embeds: musicEmbed(Queuex.getQueue(0).title, Queuex.getQueue(0).durationRaw, Queuex.getQueue(0).name, Queuex.getQueue(0).username, Queuex.getQueue(0).thumbnails, Queuex.getQueue(0).url) });
                            subscription = VConnState.getVConnection().subscribe(Playerplayback.player);
                        }
                        Playerplayback.player.on('stateChange', (oldState, newState) => {
                            APlayerState(oldState, newState, msg)
                        });
                        //here

                    }).catch((e) => {
                        console.log(e);
                    })
                }
                break;
            case msg.content.split(' ')[0].toString() == `${prefix}pause`:
                if (voiceChannel && VConnState.getVConnection()) {
                    if (voiceChannel.id == clientVoiceId) {
                        if (Playerplayback.player.state.status === 'playing') {
                            Playerplayback.pause();
                            msg.react('✅')
                        }


                    } else {
                        msg.reply('You are not in Same Voice Channel');
                    }
                } else {
                    msg.reply('You are not in Voice');
                }
                break;
            case msg.content.split(' ')[0].toString() == `${prefix}resume`:
                if (voiceChannel && VConnState.getVConnection()) {
                    if (voiceChannel.id == clientVoiceId) {
                        isPlayingNextSong = true;
                        if (Playerplayback.player.state.status === 'paused') {
                            msg.react('✅');
                            Playerplayback.resume();
                        } else if (Playerplayback.player.state.status === 'idle') {
                            if (Queuex.getMaxId() >= 1) {
                                isPlayingNextSong = true;
                                Playerplayback.play(Queuex.getQueue(0).url);
                                if (prevPlaying) {
                                    prevPlaying.delete();
                                }
                                prevPlaying = await msg.channel.send({ embeds: musicEmbed(Queuex.getQueue(0).title, Queuex.getQueue(0).durationRaw, Queuex.getQueue(0).name, Queuex.getQueue(0).username, Queuex.getQueue(0).thumbnails, Queuex.getQueue(0).url) });
                            }
                        }
                    } else {
                        msg.reply('You are not in Same Voice Channel');
                    }
                } else {
                    msg.reply('You are not in Voice');
                }
                break;
            case msg.content.split(' ')[0].toString() == `${prefix}stop`:
                if (voiceChannel && VConnState.getVConnection()) {
                    if (voiceChannel.id == clientVoiceId) {
                        if (Playerplayback.player.state.status === 'paused' || Playerplayback.player.state.status === 'playing') {
                            isPlayingNextSong = false;
                            Playerplayback.stop();
                            msg.react('✅');
                        }

                    } else {
                        msg.reply('You are not in Same Voice Channel');
                    }
                } else {
                    msg.reply('You are not in Voice');
                }
                break;
            case msg.content.split(' ')[0].toString() == `${prefix}queue`:
                if (prevMessage) {
                    prevMessage.edit({ components: [] });
                }
                const QueueA = Queuex.getAllQueue()
                prevMessage = await msg.reply(QueueA.length > 5 ? {
                    content: `\`\`\`ini\n ${QueueA.slice(0, pageSize).map((value, index) => `[${index}] ${value.title} ReqBy ${value.username}\n`)}\`\`\``,
                    components: musicButton(true, false)
                } : {
                    content: `\`\`\`ini\n ${QueueA.slice(0, pageSize).map((value, index) => `[${index}] ${value.title} ReqBy ${value.username}\n`)}\`\`\``,
                    components: []
                });

                client.on('interactionCreate', async (interaction) => {
                    try {
                        if (!interaction.isButton()) return
                        if (interaction.customId == 'row_0_button_prevPg') {
                            CurrentPage = Math.max(CurrentPage - 1, 0);
                        } else if (interaction.customId == 'row_0_button_nextPg') {
                            CurrentPage++;
                        }

                        const startIdx = CurrentPage * pageSize;
                        const endIdx = startIdx + pageSize;
                        await interaction.update({
                            content: `\`\`\`ini\n ${QueueA.slice(startIdx, endIdx).map((value, index) => `[${index + pageSize * CurrentPage}] ${value.title} ReqBy ${value.username}XX\n`)}\`\`\``,
                            components: musicButton(CurrentPage === 0, (CurrentPage + 1) * pageSize >= QueueA.length)
                        });
                    } catch (e) {
                        // console.log(e);
                        console.log('Something wrong');
                    }
                })
                break;


            case msg.content.split(' ')[0].toString() == `${prefix}skip`:
                const keyTo = msg.content.split(' ').slice(1).join(' ');
                if (!voiceChannel && VConnState.getVConnection()) {
                    msg.reply('You are not in Voice');
                    return;
                }
                if (voiceChannel.id != clientVoiceId) {
                    msg.reply('You are not in Same Voice Channel');
                    return;
                }

                if (Playerplayback.player.state.status === 'paused' || Playerplayback.player.state.status === 'playing') {
                    if (Queuex.checkNextQueue()) {
                        if (keyTo == '' || keyTo == ' ') {
                            // console.log('ab');
                            isPlayingNextSong = false;
                            Playerplayback.stop();
                            let nxtSong = Queuex.nextQueue();

                            if (isShuffleOn == true) {
                                Queuex.shuffleQueue();
                                isShuffleOn = false;
                                nxtSong = Queuex.getQueue(0);
                            }
                            if (isShuffleOff == true) {
                                Queuex.normalizeQueue();
                                isShuffleOff = false;
                                nxtSong = Queuex.getQueue(0);
                            }
                            Playerplayback.play(nxtSong.url).then(() => {
                                isPlayingNextSong = true;
                            }).catch((e) => {
                                console.log(e);
                            })
                            console.log('next playaaa');
                            if (prevPlaying) {
                                prevPlaying.delete();
                            }
                            prevPlaying = await msg.channel.send({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
                        } else {
                            const nkeyTo = parseInt(keyTo);
                            if (typeof keyTo != 'number' && isNaN(nkeyTo)) {
                                msg.reply(`Your input isn't number`);
                                return;
                            }
                            isPlayingNextSong = false;
                            Playerplayback.stop();

                            //add handler here when > queue length
                            Queuex.deleteQueueBef(nkeyTo);
                            let nxtSong = Queuex.getQueue(0);
                            Playerplayback.play(nxtSong.url).then(() => {
                                isPlayingNextSong = true;
                            }).catch((e) => {
                                console.log(e);
                            })
                            console.log('next playbbb');
                            if (prevPlaying) {
                                prevPlaying.delete();
                            }
                            prevPlaying = await msg.channel.send({ embeds: musicEmbed(nxtSong.title, nxtSong.durationRaw, nxtSong.name, nxtSong.username, nxtSong.thumbnails, nxtSong.url) });
                        }
                    } else {
                        msg.reply('No next song in queue');
                    }
                }
                break;

            case msg.content.split(' ')[0].toString() == `${prefix}nowplaying`:
                if (prevPlaying) {
                    prevPlaying.delete();
                }
                prevPlaying = await msg.channel.send({ embeds: musicEmbed(Queuex.getQueue(0).title, Queuex.getQueue(0).durationRaw, Queuex.getQueue(0).name, Queuex.getQueue(0).username, Queuex.getQueue(0).thumbnails, Queuex.getQueue(0).url) });
                break;

            case msg.content.split(' ')[0].toString() == `${prefix}loop`:
                if (isLooping) {
                    isLooping = false;
                    msg.reply('Turning Off Looping');
                } else {
                    isLooping = true;
                    msg.reply('Turning on Looping');
                }
                break;

            case msg.content.split(' ')[0].toString() == `${prefix}shuffle`:
                if (prevMessage) {
                    prevMessage.edit({ components: [] });
                }
                if (onShuffle) {
                    isShuffleOff = true
                    onShuffle = false;
                    msg.reply('Turning Off Shuffle');
                } else {
                    isShuffleOn = true
                    onShuffle = true
                    msg.reply('Turning on Shuffle');
                }
                break;

            case msg.content.split(' ')[0].toString() == `${prefix}cdevdebug`:
                // console.log(Playerplayback.player.state.status);
                console.log(Queuex.getAllQueue());
                console.log(`the id is${Queuex.queue[0].id}`);
                break;

        }

    });

}

const addSongsQueue = async (resource, msg) => {
    let videos = await Playerplayback.getAudioInfo(resource);
    console.log(videos.length);
    if (videos.length > 1 || videos.length !== undefined) {

        videos.map((audInfo) => {
            Queuex.addQueue(Queuex.getMaxId() + 1, audInfo.title, audInfo.durationRaw, audInfo.channel.name, msg.author.username, audInfo.thumbnails[2].url, audInfo.url);
        })
        msg.channel.send(`Added ${videos.length} Songs to Queue`);
    } else {
        Queuex.addQueue(Queuex.getMaxId() + 1, videos.title, videos.durationRaw, videos.channel.name, msg.author.username, videos.thumbnails[2].url, videos.url);
        msg.channel.send(`Queued ${videos.title} by ${msg.author.username}`);
    }
}

export default ClientAudioFunction;