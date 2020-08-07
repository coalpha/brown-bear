import open from "open";

import config from "./config";

const client_id = config.client.id;

open(`https://discord.com/oauth2/authorize?client_id=${client_id}&scope=bot`);
