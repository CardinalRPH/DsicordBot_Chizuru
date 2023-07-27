class TheShuffleState {
    constructor() {
        this.isShuffleOn = false;
        this.isShuffleOff = false;
        this.onShuffle = false;
    }

    set setisShuffleOn(value) {
        this.isShuffleOn = value
    }
    set setisShuffleOff(value) {
        this.isShuffleOff = value
    }
    set setonShuffle(value) {
        this.onShuffle = value
    }

    get getisShuffleOn() {
        return this.isShuffleOn
    }

    get getisShuffleOff() {
        return this.isShuffleOff
    }

    get getonShuffle() {
        return this.onShuffle
    }
}

const ShuffleState = new TheShuffleState();
export default ShuffleState;