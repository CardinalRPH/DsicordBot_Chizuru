import { createAudioPlayer, createAudioResource, NoSubscriberBehavior } from "@discordjs/voice";
import play from 'play-dl';
import stringIsAValidUrl from './URLValidate.js';
import { ytPlaylistPattern, ytVideoPattern } from '../Global/Variable.js'

export default class AudioPlayback {
    constructor() {
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Stop,
            },
        });
        this.AudioInfo = null;
    }

    async play(resource) {
        let xstream = await play.stream(resource);
        this.player.play(createAudioResource(xstream.stream, {
            inlineVolume: true,
            inputType: xstream.type
        }));
    }

    async getAudioInfo(resource) {
        if (stringIsAValidUrl(resource, ytPlaylistPattern)) {
            return (await play.playlist_info(resource)).videos
        } else if (stringIsAValidUrl(resource, ytVideoPattern)) {
            return (await play.video_info(resource)).video_details
        } else {
            let search = await play.search(resource, {
                limit: 1
            })
            return (await play.video_info(search[0].url)).video_details
        }

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