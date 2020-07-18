const open = require("open");

const config = require("./config");

const client_id = config.client.id;

console.log(client_id);

open(`https://discord.com/oauth2/authorize?client_id=${client_id}&scope=bot`);
