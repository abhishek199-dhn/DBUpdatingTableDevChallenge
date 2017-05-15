/**
 * BidObservable class act as Observable pattern where
 * the class contains references to the concrete observers to notify for any changes.
 */

class BidObservable {

    constructor() {
        this._observers = {
            any: []
        };
    }

    /**
     * method that subscribe to a topic and register a observer.
     * @param topic topic to be observed.
     * @param observer function to be called when any event occurs.
     */
    subscribeObserver(topic, observer) {
        topic = topic || "any";
        if (!this._observers.hasOwnProperty(topic)) {
            this._observers[topic] = [];
        }
        this._observers[topic].push(observer);
    };

    /**
     * method that un-subscribe observer from the given topic.
     * @param topic  topic to un-subscribe.
     * @param observer observer to un-subscribe
     */
    unsubscribeObserver(topic, observer) {
        topic = topic || "any";
        if (this._observers.hasOwnProperty(topic)) {
            var index = this._observers[topic].indexOf(observer);
            if (index > -1) {
                this._observers[topic].splice(index, 1);
            }
        }
    };

    /**
     * Fires event to all observer for the given topic.
     * @param topic  topic for which event should be fired.
     * @param data   data to be passed to subscribed observer.
     */
    notifyAllObservers(topic, data) {
        topic = topic || "any";
        if (this._observers.hasOwnProperty(topic)) {
            for (var i = 0; i < this._observers[topic].length; i++) {
                this._observers[topic][i](data);
            }
        }
    }
}

module.exports = BidObservable;