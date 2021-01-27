import fs from 'fs';
import { authorize, authorizeWithServiceAccount } from './oauth_client.js';
import { getRecurringBillAmounts } from './when_authorized.js';

const SETTINGS_PATH = 'settings.json';

/**
 * Read in OAuth client parameters and run sample data pull
 */
fs.readFile(
    SETTINGS_PATH, 
    (err, settingsStream) => {
        if (err) return console.log('Error loading client secret file:', err);

        const settings = JSON.parse(settingsStream);
        authorize(settings, getRecurringBillAmounts);
});

authorize(settings, getRecurringBillAmounts);
