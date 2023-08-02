import axios from "axios"
import dotenv from "dotenv";

dotenv.config();

const extractPlaylistIdFromUrl = (url) => {
    const playlistIdRegex = /(?:\/playlist\?list=)([a-zA-Z0-9_-]+)/;
    const matches = url.match(playlistIdRegex);
    return matches ? matches[1] : null;
}

const PlaylistYtVideos = async (resource) => {
    try {
        const playlistId = extractPlaylistIdFromUrl(resource);
        let videos = [];
        let nextPageToken = null
        do {
            const playlistResponse = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
                params: {
                    key: process.env.API_KEY,
                    part: 'snippet',
                    playlistId: playlistId,
                    pageToken: nextPageToken,
                    maxResults: 50,
                },
            });

            if (playlistResponse.data.items.length === 0) {
                throw new Error('Playlist not found');
            }

            videos = videos.concat(
                playlistResponse.data.items.map((item) => {
                    if (item.snippet.resourceId.videoId) {
                        if (item.snippet.title != 'Deleted video') {
                            if (item.snippet.title != 'Private video') {      
                                const title = item.snippet.title;
                                const name = item.snippet.videoOwnerChannelTitle;
                                const url = `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`;
                                const thumbnails = item.snippet.thumbnails.high.url;
                                return { title, name, thumbnails, url }
                            }
                        }
                    }

                })
            ).filter(Boolean);
            nextPageToken = playlistResponse.data.nextPageToken;
        } while (nextPageToken);

        // console.log(videos[496]);
        return videos;
    } catch (error) {
        console.error('Something went wrong:', error);
        // return [];
    }
}

// PlaylistYtVideos('https://www.youtube.com/playlist?list=PLnGx6KrronRZE117eFjg9hzimIUhwYaWT');
// https://www.youtube.com/playlist?list=PLnGx6KrronRZE117eFjg9hzimIUhwYaWT

export default PlaylistYtVideos;