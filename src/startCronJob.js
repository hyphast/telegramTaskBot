const CronJob = require('cron').CronJob

const startCronJob = async (ctx, timeTemplate) => {
  const job = new CronJob(timeTemplate, async () => {
    console.log(`Cron job has been started: ${timeTemplate}`)

    try {
      const fileIdArr = ctx?.db?.fileIdArr
      console.log('fileIdArr before', fileIdArr.length)
      if (fileIdArr && fileIdArr.length > 0) {
        const fileId = fileIdArr[fileIdArr.length - 1]
        await ctx.telegram.sendPhoto(process.env.CHAT_ID, fileId)
        fileIdArr.pop()
      }
      console.log('fileIdArr after', fileIdArr.length)
    } catch(err) {
      console.log('ERROR!', err)
    }
    //job.stop(); //TODO убрать!!!
  }, null, true, 'Europe/Moscow')

  job.start()
}

module.exports = startCronJob