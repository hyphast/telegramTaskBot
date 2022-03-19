const CronJob = require('cron').CronJob

const sendPhoto = async (fileIdArr, telegram, chat) => {
  if (fileIdArr && fileIdArr.length > 0) {
    const fileId = fileIdArr[fileIdArr.length - 1]
    await telegram.sendPhoto(process.env[chat], fileId)
    fileIdArr.pop()
  }
}

const startCronJob = async (ctx, timeTemplate, target) => {
  const job = new CronJob(timeTemplate, async () => {
    console.log(`Cron job has been started: ${timeTemplate}`)

    try {
      const fileIdArr = ctx?.db?.fileIdArr
      for (let chat of target) {
        await sendPhoto(fileIdArr, ctx.telegram, chat)
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