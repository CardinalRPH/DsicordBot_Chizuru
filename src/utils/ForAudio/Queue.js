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

    getQueue(Index) {
        return this.queue[Index];
    }

    nextQueue() {
        this.queue.splice(0, 1);
        return this.queue[0];
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

    skipAllQueueLoop(skipIndex) {
        const rotatedArray = this.queue.slice(skipIndex).concat(this.queue.slice(0, skipIndex));
        this.queue = [...rotatedArray]
    }

    nextAllQueueLoop() {
        if (this.checkNextQueue()) {
            const firstEl = this.queue.shift();
            this.queue.push(firstEl);
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