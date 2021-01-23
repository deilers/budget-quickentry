import { getCredentials, authorize } from './oauth_client.js';
import { listMajors } from './samplecode.js';
import dotenv from 'dotenv';

// don't call this if PROD
dotenv.config();

const SECRET = process.env.DRIVE_CLIENT_SECRET || '';
const creds = await getCredentials('settings.json', SECRET);

// listMajors is basically a 'hello world' for authenticating with Google Sheets.
authorize(creds, listMajors);
