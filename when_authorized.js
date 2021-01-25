import { google } from 'googleapis';

const SHEET_ID = process.env.SPREADSHEET_ID;
const CELL_RANGE = 'February!A:B';

/**
 * Print name and amount of all recurring monthly bills.
 * 
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export function getRecurringBillAmounts(auth) {
  
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: CELL_RANGE,
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const bills = res.data.values;

    if (bills.length) {
        bills.map((bill) => {

          /* if amount column exists */
          if (bill[1]) {
            console.log(`${bill[0]}: ${bill[1]}`);
          }
        });

    } else {
      console.log('No data found.');
    }
  });
}