import AudioPlayback from "./AudioPlayer.js";

class QueuesX {
    constructor() {
        this.queue = [];
    }

    addQueue(id, title, durationRaw, name, username, thumbnails, url) {
        this.queue.push({
            id,
            id,
            title,
            durationRaw,
            name,
            username,
            thumbnails,
            url
        })
    }

    getMaxId() {
        return this.queue.reduce((maxId, item) => Math.max(maxId, item.id), 0);
    }

    async getQueue(Index) {
        if (this.queue[Index].durationRaw == null) {
            this.queue[Index].durationRaw = await AudioPlayback.getSingleAudioDuration(this.queue[Index].url)
        }
        return this.queue[Index];
    }

    async nextQueue() {
        this.queue.splice(0, 1);
        if (this.queue[0].durationRaw == null) {
            this.queue[0].durationRaw = await AudioPlayback.getSingleAudioDuration(this.queue[0].url)
        }
        return this.queue[0];
    }

    checkNextQueue() {
        return this.queue[1] != undefined ? true : false;
    }

    deleteQueueBef(targetqueue) {
        this.queue.splice(0, targetqueue)
    }

    getAllQueue() {
        return this.queue;
    }

    shuffleQueue() {
        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }
    }

    normalizeQueue() {
        this.queue = this.queue.sort((a, b) => a.id - b.id);
    }

    skipAllQueueLoop(skipIndex) {
        const rotatedArray = this.queue.slice(skipIndex).concat(this.queue.slice(0, skipIndex));
        this.queue = [...rotatedArray]
    }

    async nextAllQueueLoop() {
        if (this.checkNextQueue()) {
            const firstEl = this.queue.shift();
            this.queue.push(firstEl);
            if (this.queue[0].durationRaw == null) {
                this.queue[0].durationRaw = await AudioPlayback.getSingleAudioDuration(this.queue[0].url);
            }
            return this.queue[0];
        } else {
            return false;
        }
    }

    removeOneQueue(index) {
        this.queue.splice(index, 1);
    }


    clearQueue() {
        this.queue = []
    }

    clearCurrentQueue() {
        this.queue.splice(1);
    }
}

const Queues = new QueuesX();
export default Queues;