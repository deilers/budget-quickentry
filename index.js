import fs from 'fs';
import { authorize } from './oauth_client.js';
import { listMajors } from './when_authorized.js';

const SETTINGS_PATH = 'settings.json';

/**
 * Read in OAuth client parameters and run sample data pull
 */
fs.readFile(
    SETTINGS_PATH, 
    (err, settingsStream) => {
        if (err) return console.log('Error loading client secret file:', err);
        const settings = JSON.parse(settingsStream);
        
        // listMajors is basically a 'hello world' for authenticating with Google Sheets.
        authorize(settings, listMajors);
});
