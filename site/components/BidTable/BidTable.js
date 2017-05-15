/**
 * Controller class that renders the table with required column config and
 * updates/re-renders the table whenever data gets updated/ received.
 *
 */

const TableCreator = require("./../resuable/TableCreator/TableCreator");

class BidTable {

    constructor(tableNode) {
        this._tableNode = tableNode;
        this._tableCreator = null;
        this._sortBy = "lastChangeBid";

        this._columns = [
            {field: "name", displayName: "Name", type: "string"},
            {field: "bestBid", displayName: "Current best bid price", type: "number"},
            {field: "bestAsk", displayName: "Current best ask price", type: "number"},
            {field: "lastChangeBid", displayName: "Best bid last changed", type: "number"},
            {field: "lastChangeAsk", displayName: "Best ask price last changed", type: "number"},
            {field: "graphPoints", displayName: "Mid Price", type: "sparkLine"}
        ];
    };

    init() {
        if (this._tableNode) {
            this._tableCreator = new TableCreator(this._tableNode, this._columns, this._sortBy);
            this._tableCreator.init();
        } else {
            throw new Error("tableNode cannot be null.")
        }
    };

    onDataReceived(data) {
        this._tableCreator.updateTable(data);
    };
}

module.exports = BidTable;