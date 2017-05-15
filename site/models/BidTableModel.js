/**
 * Data model class for bid table.
 *
 * tableLookup:- holds a hashMap of name and rowIndex.
 *                which helps in updating the data to its respective rowIndex.
 *
 * dataStore:-  holds an array containing table data object.
 *              each object contains a field graphPoints.
 *
 * graphPoints:- Array containing last 30 sparkLine data points.
 *
 *
 * sample data:-
 *
 * dataStore = [
 *      {
            "name": "usdjpy",
            "bestBid": 106.7297012204255,
            "bestAsk": 107.25199883791178,
            "openBid": 107.22827132623534,
            "openAsk": 109.78172867376465,
            "lastChangeAsk": -4.862314256927661,
            "lastChangeBid": -2.8769211401569663,
            "graphPoints": [3, 5, 9, 3]
        }
 * ]
 */

class BidTableModel {

    constructor(tableLookup, dataStore) {
        this._tableLookup = {};
        this._dataStore = dataStore || [];
    }

    get tableLookup() {
        return this._tableLookup;
    }

    get dataStore() {
        return this._dataStore;
    }

    /**
     * method that updates the data in the dataStore and calculate
     * graphPoints such that it should not contain more than 30 data points.
     *
     * @param body object data to be processed and saved.
     */
    updateStore(body) {

        if (body.name) {
            let dataRowIndex = 0;
            let newGraphPoint = (body.bestBid + body.bestAsk) / 2;

            if (this._tableLookup.hasOwnProperty(body.name)) {
                dataRowIndex = this._tableLookup[body.name];

                if (this._dataStore && Array.isArray(this._dataStore) &&
                    this._dataStore.length >= dataRowIndex + 1) {

                    let rowData = this._dataStore[dataRowIndex];
                    let graphPoints = rowData.graphPoints;

                    if (graphPoints && Array.isArray(graphPoints)) {

                        // if graphPoints length is >=  30 then remove first
                        // data point and add new data point.

                        if (graphPoints.length >= 30) {
                            graphPoints.shift();
                        }
                        graphPoints.push(newGraphPoint);

                    } else {
                        graphPoints = [newGraphPoint];
                    }

                    body.graphPoints = graphPoints;
                    this._dataStore[dataRowIndex] = body;

                } else {
                    body.graphPoints = [newGraphPoint];
                    dataRowIndex = this._dataStore.push(body) - 1;
                    this._tableLookup[body.name] = dataRowIndex;
                }
            } else {
                body.graphPoints = [newGraphPoint];
                dataRowIndex = this._dataStore.push(body) - 1;
                this._tableLookup[body.name] = dataRowIndex;
            }
        }
    };
}

module.exports = BidTableModel;