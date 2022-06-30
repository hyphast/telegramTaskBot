const { Telegraf } = require('telegraf')
const startCronJob = require('./startCronJob')
const stopJobs = require('./stopJobs')
const auth = require('./auth')

const TOKEN = process.env.BOT_TOKEN
if (!TOKEN) {
  throw new Error('BOT_TOKEN must be provided!')
}
const bot = new Telegraf(TOKEN)
bot.context.db = { fileIdArr: [], jobs: [] }
bot.start(async (ctx) => {
  const isAdmin = auth(ctx.update.message.from.id)
  if (!isAdmin) return
  console.log('Started')
  await ctx.reply('Started')
  stopJobs(ctx)
  const job1 = await startCronJob(ctx, '0 0 10 * * *', ['FIRST_CHAT_ID']) // 0 0 10 * * * At 11:00 UTC+4
  const job2 = await startCronJob(ctx, '0 0 16 * * *', ['FIRST_CHAT_ID']) // 0 0 16 * * * At 17:00 UTC+4
  const job3 = await startCronJob(ctx, '0 0 18 * * *', ['FIRST_CHAT_ID', 'SECOND_CHAT_ID']) // 0 0 19 * * * At 19:00 UTC+4
  ctx.db.jobs.push(job1)
  ctx.db.jobs.push(job2)
  ctx.db.jobs.push(job3)
})

bot.on('photo', async (ctx) => {
  const isAdmin = auth(ctx.update.message.from.id)
  if (!isAdmin) return
  const photoArr = ctx.update.message.photo
  const fileId = photoArr[photoArr.length - 1]['file_id']
  ctx.db.fileIdArr.push(fileId)
  console.log('Number of photos:', ctx.db.fileIdArr.length)
})

bot.launch()
