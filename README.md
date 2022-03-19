# Telegram Task bot

![image](./src/assets/telegrambot.jpg)

### Description

*Telegram bot for tasks.*<br/>

## Procedure

1. Rename *example.env* as *.env* with your own variables.

   #### Mandatory variables

   Variable name|required|Get from
   ---|:---:|:---:
   **BOT_TOKEN**|**true**|[@BotFather](https://t.me/BotFather)
   **CHAT_ID**|**true**|[@username_to_id_bot](https://t.me/username_to_id_bot)

2. Run the following in the Terminal:
```
$ npm run start
```
3. If everything worked fine, ️bot works ✔️
---
### Setting up cron job

Set up *CRON_TEMPLATE*

```javascript
const job = new CronJob('CRON_TEMPLATE', () => {
   //...
}, null, true, 'Europe/Moscow');

job.start();
```
