Project Goals:
- create Node.js library for adding and reading data from a Google Sheet.
- Utilize in a web app, intended for a mobile browser to quickly enter purchase data.

Global Variables (process.env):
- ```SHEETS_USER_SECRET```: secret key to authorize access tokens
- ```NODE_ENV```: prod/pre/dev/etc
- ```SPREADSHEET_ID```: ID of Google Sheet
  - note: this is "hard coded", will change to parameterized ID soon.