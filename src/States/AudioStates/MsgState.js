class TheMsgState {
    constructor() {
        this.prevQMsg = null;
        this.prevPlayMsg = null;
    }

    set setPrevQMsg(value) {
        this.prevQMsg = value;
    }

    set setPrevPlayMsg(value) {
        this.prevPlayMsg = value;
    }

    get getPrevQMsg() {
        return this.prevQMsg;
    }
    get getPrevPlayMsg() {
        return this.prevPlayMsg;
    }
}

const MsgState = new TheMsgState();
export default MsgState;