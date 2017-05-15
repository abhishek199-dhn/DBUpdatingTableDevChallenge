/*
 * This javascript file will constitute the entry point of your solution.
 */

// This is not really required, but means that changes to index.html will cause a reload.
// Apply the styles in style.css to the page.
require("./site/style.css");
const BidTable = require("./site/components/BidTable/BidTable");
const BidTableModel = require("./site/models/BidTableModel");
const BidObservable = require("./site/BidObservable");

const url = "ws://localhost:8011/stomp";
const client = Stomp.client(url);

// Change this to get detailed logging from the stomp library
global.DEBUG = false;

client.debug = function (msg) {
    if (global.DEBUG) {
        console.info(msg)
    }
};

function connectCallback() {

    let bidTable = new BidTable("bidTable");
    let bidTableModel = new BidTableModel();
    let bidObservable = new BidObservable();

    //Subscribes to /bidTable/data/updated topic to receive the updated dataSource.
    bidObservable.subscribeObserver("/bidTable/data/updated", bidTable.onDataReceived.bind(bidTable));
    bidTable.init();

    client.subscribe("/fx/prices", function (data) {
        try {
            if (data && data.command == "MESSAGE" && data.body) {
                let body = JSON.parse(data.body);
                bidTableModel.updateStore(body);

                //fires /bidTable/data/updated event with the updated dataSource.
                bidObservable.notifyAllObservers("/bidTable/data/updated", bidTableModel.dataStore);
            }
        } catch (error) {
            throw new Error("Error while parsing data ->> " + error);
        }
    });
}

client.connect({}, connectCallback, function (error) {
    alert(error.headers.message)
});

