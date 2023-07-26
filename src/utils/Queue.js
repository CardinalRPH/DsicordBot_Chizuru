export default class Queues {
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

    getQueue(Index) {
        return this.queue[Index];
    }

    nextQueue() {
        if (this.checkNextQueue()) {
            this.queue.splice(0, 1);
            return this.queue[0];
        } else {
            return false;
        }
    }

    checkNextQueue() {
        return this.queue[1] ? true : false;
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

    clearQueue() {
        this.queue = []
    }
}