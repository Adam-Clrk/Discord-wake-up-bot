# Discord wake up bot
## Install
```sh
git clone https://github.com/Adam-Clrk/discord-wake-up-bot.git
cd discord-wake-up-bot
npm i
cp config_example.json config.json
```
Then in config.json add:
* "owner" = your discord numeric user ID
* "token" = the bot's token (from https://discord.com/developers/applications)


```sh
# start the bot
node index.js 
```