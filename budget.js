"use strict";
exports.__esModule = true;
var googleapis_1 = require("googleapis");
var Budget = /** @class */ (function () {
    function Budget(auth, sheetId) {
        this.SHEET_ID = process.env.SPREADSHEET_ID;
        this.CELL_RANGE = 'February!A:B';
        this.HEADER_ROW = 'February!1:1';
        this.auth = auth;
        this.sheetId = sheetId || this.SHEET_ID;
    }
    /**
     * get names and amounts of recurring bills in a given month
     */
    Budget.prototype.getRecurringBillAmounts = function () {
        var options = {
            version: 'v4',
            auth: this.auth
        };
        var sheets = googleapis_1.google.sheets(options);
        sheets.spreadsheets.values.get(options)
            .then(function (bills) {
            if (bills.data.values) {
                bills.data.values.map(function (bill) {
                    if (bill[1]) {
                        console.log(bill[0] + ": " + bill[1]);
                    }
                });
            }
        })["catch"](function () {
            console.log('no data found.');
        });
    };
    return Budget;
}());
exports.Budget = Budget;
