const { Client } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { DataResolver } = require("discord.js");

const client = new Client({ intents: "Guilds" });

client.once("ready", async () => {
  //for avatar
  if (fs.existsSync("./logo.gif")) {
    //load image buffer
    const logo = fs.readFileSync("./logo.gif");
    await client.user.setAvatar(logo).catch(console.error);
    console.log("Change avatar successfully!");
  }

  //for banner
  if (fs.existsSync("./banner.gif")) {
    const rest = new REST({ version: "9" }).setToken(process.env.token);
    const banner = fs.readFileSync("./banner.gif");
    try {
      await rest.patch(Routes.user(), {
        body: { banner: await DataResolver.resolveImage(banner) },
      });
      console.log("Change banner successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  process.exit(0);
});

client.login(process.env.token);
