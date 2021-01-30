import fs from 'fs';
import { authorize } from './oauth_client.js';
import { getRecurringBillAmounts, getExpenseCategories } from './when_authorized.js';

const SETTINGS_PATH = 'settings.json';

/**
 * Read in OAuth client parameters and run sample data pull
 */
fs.readFile(
    SETTINGS_PATH, 
    (err, settingsStream) => {
        if (err) return console.log('Error loading client secret file:', err);

        const settings = JSON.parse(settingsStream);

        /* print expense categories */
        authorize(settings, getExpenseCategories);

        /* print monthly bills and amounts */
        authorize(settings, getRecurringBillAmounts);
});
