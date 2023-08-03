const DisconnectTime = {
    timeout: null,
    startTimer: function (fun) {
        this.timeout = setTimeout(() => {
            if (typeof fun === 'function') {
                fun();
            }
        }, 10000);
    },
    stopTimer: function () {
        clearTimeout(this.timeout);
    },
};

export default DisconnectTime;
