class VConnectionStateX {
    constructor() {
        this._connection = null
    }

    set setVConnection(connection) {
        this._connection = connection
    }

    get getVConnection() {
        return this._connection;
    }
}

const VConnectionState = new VConnectionStateX();
export default VConnectionState;