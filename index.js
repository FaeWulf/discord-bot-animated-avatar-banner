const { Client } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Client({ intents: "Guilds" });

client.once("ready", async () => {
  //load image buffer
  const logo = fs.readFileSync("./logo.gif");

  await client.user.setAvatar(logo).catch(console.error);

  console.log("Change avatar successfully!");

  //exit process
  process.exit(0);
});

client.login(process.env.token);
