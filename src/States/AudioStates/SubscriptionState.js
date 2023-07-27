class TheSubscriptionState {
    constructor() {
        this.subscription = null;
    }

    set setSubscription(value) {
        this.subscription = value
    }

    get getSubscription() {
        return this.subscription
    }
}

const SubscriptionState = new TheSubscriptionState();
export default SubscriptionState;