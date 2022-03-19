const stopJobs = (ctx) => {
  const jobs = ctx?.db?.jobs
  if (jobs) {
    for (let i = jobs.length - 1; i >= 0; i--) {
      jobs[i].stop()
      jobs.pop()
    }
  }
}

module.exports = stopJobs