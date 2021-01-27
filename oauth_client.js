import fs from 'fs';
import readline from 'readline'
import { google } from 'googleapis';
import open from 'open';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];


const TOKEN_PATH = 'token.json';

/* Our API Client's secret key that validates Bearer tokens */
const SECRET = process.env.SHEETS_USER_SECRET;

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
export function authorize(credentials, callback) {
  const { client_id, redirect_uris } = credentials.installed;
  const secret = SECRET;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, 
      secret,
      redirect_uris[0]
    );

  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);

    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

  /**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
export function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  open(authUrl, {wait: true})
  .then(() => {
    const prompt = getAuthorizationPrompt();
    prompt.question('Enter the code from that page here: ', (code) => {
      prompt.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  })
  .catch((error) => {
    console.error('Unhandled exception:');
    console.error(error);
  })
}

/**
 * setup I/O stream for authorizing an application
 */
function getAuthorizationPrompt() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}
