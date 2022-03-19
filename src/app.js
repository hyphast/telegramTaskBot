const {Telegraf} = require('telegraf')
const startCronJob = require('./startCronJob')

const TOKEN = process.env.BOT_TOKEN
if (!TOKEN) {
  throw new Error('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(TOKEN)
bot.context.db = { fileIdArr: [] }
bot.start(async (ctx) => {
  await startCronJob(ctx, '0 0 11 * * *') // 0 0 11 * * * At 11:00
  await startCronJob(ctx, '0 0 17 * * *') // 0 0 17 * * * At 17:00
  await startCronJob(ctx, '0 0 19 * * *') // 0 0 19 * * * At 19:00
  //await startCronJob(ctx, '*/20 * * * * *') // test
})

bot.on('photo', (ctx) => {
  const photoArr = ctx.update.message.photo
  const fileId = photoArr[photoArr.length - 1]['file_id']
  ctx.db.fileIdArr.push(fileId)
  console.log('ctx.db.fileIdArr.length', ctx.db.fileIdArr.length)
  // await ctx.telegram.sendPhoto('-1001386766446', fileId)
  // const file = await ctx.telegram.getFile(fileId)
  // const filePath = file.file_path
})

bot.launch()