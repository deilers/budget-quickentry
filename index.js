import { readProjectSettings } from './oauth_client.js';


const SECRET = process.env.DRIVE_CLIENT_SECRET || '';

async function init() {
    return await readProjectSettings('./settings.json', SECRET);
}

const settings = await init();
console.log(settings.installed.client_id);