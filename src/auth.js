const auth = (id) => {
  const admins = process.env.ADMINS.split(' ')
  for (let per of admins) {
    if (id === parseInt(per)) {
      return true
    }
  }
  return false
}

module.exports = auth