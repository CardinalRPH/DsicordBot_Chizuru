class TheStopState {
    constructor() {
        this.isPlayingNextSong = true;
    }

    set setisPlayingNextSong(value) {
        this.isPlayingNextSong = value
    }

    get getisPlayingNextSong() {
        return this.isPlayingNextSong
    }
}

const StopState = new TheStopState();
export default StopState;