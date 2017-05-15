/**
 * Test Class for TableCreator that validate HTML table creation
 * via valid column config and data.
 */

const TableCreator = require("./../site/components/resuable/TableCreator/TableCreator");

describe("TableSpec", function () {

    let columns = [
        {field: "name", displayName: "Name", type: "string"},
        {field: "bestBid", displayName: "Current best bid price", type: "number"},
        {field: "bestAsk", displayName: "Current best ask price", type: "number"},
        {field: "lastChangeBid", displayName: "Best bid last changed", type: "number"},
        {field: "lastChangeAsk", displayName: "Best ask price last changed", type: "number"},
        {field: "graphPoints", displayName: "Mid Price", type: "sparkLine"}
    ];

    let tableNode = document.createElement("table");
    let tableCreator = new TableCreator(tableNode, columns, null);
    tableCreator.init();

    tableCreator.updateTable(
        [
            {
                "name": "usdjpy",
                "bestBid": 107.7297012204255,
                "bestAsk": 106.25199883791178,
                "openBid": 104.22827132623534,
                "openAsk": 108.78172867376465,
                "lastChangeAsk": -4.862314256927661,
                "lastChangeBid": -3.8769211401569663,
                "graphPoints": [1, 2, 3]
            },
            {
                "name": "gbpjpy",
                "bestBid": 107.7297012204255,
                "bestAsk": 106.25199883791178,
                "openBid": 104.22827132623534,
                "openAsk": 108.78172867376465,
                "lastChangeAsk": -4.862314256927661,
                "lastChangeBid": -3.8769211401569663,
                "graphPoints": [4, 5, 6]
            }
        ]
    );

    it("Table header creation check", function () {
        expect(tableCreator._createTHead()).not.toBeNull();
        expect(tableCreator._createTHead().rows.length > 0).toEqual(true);
        expect(tableCreator._createTHead().rows[0].childElementCount).toEqual(columns.length);
    });

    it("Table row creation check", function () {
        expect(tableCreator.tBodyRef().rows.length).toEqual(2);
    });
});