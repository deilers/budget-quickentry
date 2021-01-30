import { google, sheets_v4 } from 'googleapis';
type OAuth2Client = typeof google.auth.OAuth2.prototype


export class Budget {

    
    SHEET_ID: string|undefined = process.env.SPREADSHEET_ID;
    CELL_RANGE: string = 'February!A:B';
    HEADER_ROW: string = 'February!1:1';

    auth: OAuth2Client;
    sheetId: string|undefined;

    constructor(auth: OAuth2Client, sheetId: string) {
        this.auth = auth;
        this.sheetId = sheetId || this.SHEET_ID;
    }

    /**
     * get names and amounts of recurring bills in a given month
     */
    getRecurringBillAmounts(): void {
        
        const options: sheets_v4.Options = {
            version: 'v4',
            auth: this.auth
        }

        const sheets: sheets_v4.Sheets = google.sheets(options);
        sheets.spreadsheets.values.get(options)
        .then((bills) => {
            if(bills.data.values) {
                bills.data.values.map((bill) => {
                    if (bill[1]) {
                        console.log(`${bill[0]}: ${bill[1]}`);
                    }
                });
            }
        })
        .catch(() => {
            console.log('no data found.');
        });
        
    }
}
