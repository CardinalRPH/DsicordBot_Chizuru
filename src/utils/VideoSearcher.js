import axios from "axios"
import dotenv from "dotenv";

dotenv.config();

const searchYoutubeVideos = async (keyword) => {
    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: process.env.API_KEY,
                part: 'snippet',
                q: keyword,
                type: 'video'
            }
        });
        if ((!response) || (response.data.items.length <= 0)) {
            return null;
        }
        return response.data.items[0];
    } catch (error) {
        console.error('Something went wrong:', error);
        return [];
    }
}

export default searchYoutubeVideos;