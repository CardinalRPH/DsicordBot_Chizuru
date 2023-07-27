import AudioPlayback from "./AudioPlayer.js";
import Queues from "./Queue.js";

const addSongsQueue = async (resource, msg) => {
    let videos = await AudioPlayback.getAudioInfo(resource);
    console.log(videos.length);
    if (videos.length > 1 || videos.length !== undefined) {

        videos.map((audInfo) => {
            Queues.addQueue(Queues.getMaxId() + 1, audInfo.title, audInfo.durationRaw, audInfo.channel.name, msg.member.user.username, audInfo.thumbnails[2].url, audInfo.url);
        })
        msg.channel.send(`Added ${videos.length} Songs to Queue by ${msg.member.user.username}`);
    } else {
        Queues.addQueue(Queues.getMaxId() + 1, videos.title, videos.durationRaw, videos.channel.name, msg.member.user.username, videos.thumbnails[2].url, videos.url);
        msg.channel.send(`Queued ${videos.title} by ${msg.member.user.username}`);
    }
}

export default addSongsQueue;