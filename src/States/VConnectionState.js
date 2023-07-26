export default class VConnectionState {
    constructor() {
        this._connection = null
    }

    setVConnection(connection) {
        this._connection = connection
    }

    getVConnection() {
        return this._connection;
    }
}