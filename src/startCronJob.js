const { Markup } = require('telegraf')
const CronJob = require('cron').CronJob

const sendPhoto = async (fileIdArr, telegram, chat, isLastTime) => {
  if (fileIdArr && fileIdArr.length > 0) {
    const fileId = fileIdArr[fileIdArr.length - 1]
    if (isLastTime) {
      await telegram.sendPhoto(process.env[chat], fileId, {
        parse_mode: 'Markdown',
        caption: 'Получить доступ в приват 👉 [teen girls❤️🔥🔥🔥](https://telegra.ph/Perehodnik-teen-girls-05-13)',
        reply_markup: { inline_keyboard: [
            [Markup.button.url('👉 ПРИВАТ 💖🔥', 'https://telegra.ph/Perehodnik-teen-girls-05-13')],
          ]}
      })
    } else {
      await telegram.sendPhoto(process.env[chat], fileId)
    }
    fileIdArr.pop()
  }
}

const startCronJob = async (ctx, timeTemplate, target) => {
  const job = new CronJob(timeTemplate, async () => {
    console.log(`Cron job has been started: ${timeTemplate}`)

    try {
      const fileIdArr = ctx?.db?.fileIdArr
      const isLastTime = timeTemplate === '0 0 18 * * *'
      for (let chat of target) {
        await sendPhoto(fileIdArr, ctx.telegram, chat, isLastTime)
      }
      console.log('Images left:', fileIdArr.length)
    } catch(err) {
      console.log('ERROR!', err)
    }

  }, null, true, 'Europe/Moscow')

  job.start()

  return job
}

module.exports = startCronJob
