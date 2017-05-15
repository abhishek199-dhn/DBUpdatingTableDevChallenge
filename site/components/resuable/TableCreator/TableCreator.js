/**
 * Reusable Component that creates dynamic HTML table
 * Creates table header and body dynamically based on the column config given.
 *
 * @Sample
 *
 * columns =  [
 *    {field: "name", displayName: "Name", type: "string"},
 *    {field: "bestBid", displayName: "Current best bid price", type: "number"},
 *    {field: "bestAsk", displayName: "Current best ask price", type: "number"},
 *    {field: "lastChangeBid", displayName: "Best bid last changed", type: "number"},
 *    {field: "lastChangeAsk", displayName: "Best ask price last changed", type: "number"},
 *    {field: "graphPoints", displayName: "Mid Price", type: "sparkLine"}
 * ];
 *
 * Each columns contains:-
 *   field:-       unique name or field
 *   displayName:- column name to display in table header
 *   type:-        number| string| sparkLine
 *                 if the type is sparkLine then it creates SparkLine and add to that column.
 */

require("./tableCreator.less");
const Sparkline = require("../../../sparkline");

class TableCreator {

    constructor(tableNodeId, columns, sortBy) {
        this._tableNodeId = tableNodeId;
        this._columns = columns || [];
        this._tableNode = null;
        this._tBodyRef = null;
        this.data = [];
        this.sortBy = sortBy;

        if (this._tableNodeId) {
            if (this._tableNodeId instanceof Node) {
                this._tableNode = this._tableNodeId;
            } else {
                this._tableNode = document.getElementById(this._tableNodeId);
            }
        } else {
            throw new Error("tableNodeId cannot be null");
        }
    };

    init() {
        this._createTBody();
        this._tBodyRef = this.tBodyRef();
        this._createHeaders();
    };

    updateTable(data) {
        this.data = JSON.parse(JSON.stringify(data));
        //destroy the previous tbody row items.
        this._tBodyRef.innerHTML = "";
        if (this.sortBy) {
            this._sortData();
        }
        this._createTableRows();
    };

    tBodyRef() {
        return this._tableNode.getElementsByTagName("tbody")[0];
    }

    _sortData() {
        if (this.sortBy) {
            this.data.sort(function (a, b) {
                return a[this.sortBy] - b[this.sortBy];
            }.bind(this));
        }
    }

    _createTHead() {
        return this._tableNode.createTHead();
    };

    _createTBody() {
        return this._tableNode.createTBody();
    }

    /**
     * Creates html thead row and cell items.
     * @private
     */
    _createHeaders() {
        try {
            if (this._columns && Array.isArray(this._columns) && this._tableNode) {
                let tableHeader = this._createTHead();
                let row = tableHeader.insertRow(0);

                this._columns.forEach(function (column, index) {
                    if (column && column.hasOwnProperty("displayName")) {
                        let cell = row.insertCell(index);
                        cell.innerHTML = "<b>" + column.displayName + "</b>";
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Creates html tbody row items and re-renders the table
     * @private
     */
    _createTableRows() {
        try {
            if (this.data && Array.isArray(this.data) && this._tBodyRef) {
                this.data.forEach(function (data, rowIndex) {
                    let row = this._tBodyRef.insertRow(rowIndex);

                    if (this._columns && Array.isArray(this._columns)) {

                        this._columns.forEach(function (column, columnIndex) {
                            if (column && column.hasOwnProperty("field")) {
                                let columnField = column.field;
                                if (data.hasOwnProperty(columnField)) {

                                    let cell = row.insertCell(columnIndex);
                                    if (column.type == "sparkLine") {
                                        let sparkLine = new Sparkline(cell);
                                        sparkLine.draw(data[columnField]);
                                    } else {
                                        cell.innerHTML = data[columnField];
                                    }
                                }
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }
        } catch (error) {
            console.error(error);
        }
    }

    get columns() {
        return this._columns;
    }
}

module.exports = TableCreator;