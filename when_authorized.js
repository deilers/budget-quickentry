import { google } from 'googleapis';

const SHEET_ID = process.env.SPREADSHEET_ID;
const BILL_CELL_RANGE = 'February!A:B';
const CATEGORY_CELL_RANGE = 'February!1:1';

/**
 * Print name and amount of all recurring monthly bills.
 * 
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
export function getRecurringBillAmounts(auth) {
  
  const sheets = google.sheets({version: 'v4', auth});
  
  sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: BILL_CELL_RANGE
  }, 
  
  (err, res) => {
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

/**
 * retrieves and prints expense categories from monthly expense tab.
 */
export function getExpenseCategories(auth) {
  const sheets = google.sheets({version: 'v4', auth});

  sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: CATEGORY_CELL_RANGE
  },
  
  (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const categories = res.data.values;

    /* headers are returned as a 2D array with one element */
    if(categories[0]) {

      categories[0].forEach((category) => {
        if (category !== '') {
          console.log(category);
        }
      });
    }
    else {
      console.log('No data found.');
    }
  });
}