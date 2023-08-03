import { createAudioPlayer, createAudioResource, NoSubscriberBehavior } from "@discordjs/voice";
import play from 'play-dl';
import stringIsAValidUrl from '../URLValidate.js';
import { ytPlaylistPattern, ytVideoPattern } from '../../Global/Variable.js'
import PlaylistYtVideos from "./VideoSearcher.js";

class AudioPlaybackX {
    constructor() {
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Play,
            },
        });
    }

    async play(resource) {
        let xstream = await play.stream(resource);
        const audioResource = createAudioResource(xstream.stream, {
            inlineVolume: true,
            inputType: xstream.type
        })
        this.player.play(audioResource);
    }

    async getAudioInfo(resource) {
        if (stringIsAValidUrl(resource, ytPlaylistPattern)) {
            try {
                // return (await play.playlist_info(resource)).videos
                return await PlaylistYtVideos(resource);
            } catch (e) {
                console.error(e);
            }
        } else if (stringIsAValidUrl(resource, ytVideoPattern)) {
            try {
                return (await play.video_info(resource)).video_details
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                let search = await play.search(resource, {
                    limit: 1
                });
                return (await play.video_info(search[0].url)).video_details

            } catch (e) {
                console.error(e);
            }
        }

    }

    getSingleAudioDuration(url) {
        return play.video_info(url).then((result) => {
            return result.video_details.durationRaw
        }).catch((e) => {
            console.error(e);
            return null
        })
    }

    pause() {
        this.player.pause();
    }

    resume() {
        this.player.unpause()
    }

    stop() {
        this.player.stop();
    }
}

const AudioPlayback = new AudioPlaybackX();
export default AudioPlayback;