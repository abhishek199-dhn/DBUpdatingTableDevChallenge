/**
 * Test Class for BidTableModel that validate store.
 */

const BidTableModel = require("../site/models/BidTableModel");

describe('ModelSpec', function () {

    let bidTableModel = new BidTableModel();

    bidTableModel.updateStore(
        {
            "name": "usdjpy",
            "bestBid": 106.7297012204255,
            "bestAsk": 107.25199883791178,
            "openBid": 107.22827132623534,
            "openAsk": 109.78172867376465,
            "lastChangeAsk": -4.862314256927661,
            "lastChangeBid": -2.8769211401569663,
            "graphPoints": []
        }
    );

    bidTableModel.updateStore(
        {
            "name": "gbpjpy",
            "bestBid": 107.7297012204255,
            "bestAsk": 108.25199883791178,
            "openBid": 10.22827132623534,
            "openAsk": 106.78172867376465,
            "lastChangeAsk": -4.862314256927661,
            "lastChangeBid": -2.8769211401569663,
            "graphPoints": []
        }
    );

    bidTableModel.updateStore(
        {
            "name": "usdjpy",
            "bestBid": 108.7297012204255,
            "bestAsk": 101.25199883791178,
            "openBid": 106.22827132623534,
            "openAsk": 107.78172867376465,
            "lastChangeAsk": -5.862314256927661,
            "lastChangeBid": -6.8769211401569663,
            "graphPoints": []
        }
    );

    it('Model data update check', function () {
        //basically check for the data merging based on the name field.
        expect(bidTableModel.dataStore.length).toEqual(2);
    });

    it('Model sparkLine data update check - 1', function () {
        expect(bidTableModel.dataStore[0].graphPoints.length).toEqual(2);
    });

    it('Model sparkLine data update check - 2', function () {
        bidTableModel.updateStore(
            {
                "name": "usdjpy",
                "bestBid": 107.7297012204255,
                "bestAsk": 106.25199883791178,
                "openBid": 104.22827132623534,
                "openAsk": 108.78172867376465,
                "lastChangeAsk": -4.862314256927661,
                "lastChangeBid": -3.8769211401569663,
                "graphPoints": []
            }
        );
        expect(bidTableModel.dataStore[0].graphPoints.length).toEqual(3);
    });
});