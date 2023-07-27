class TheLoopState {
    constructor() {
        this.isLooping = false;
        this.isLoopAllQueue = false;
    }

    set setLooping(value) {
        this.isLooping = value;
    }

    set setLoopAllQueue(value) {
        this.isLoopAllQueue = value;
    }

    get getLooping() {
        return this.isLooping;
    }

    get getLoopAllQueue() {
        return this.isLoopAllQueue;
    }
}

const LoopState = new TheLoopState();
export default LoopState;