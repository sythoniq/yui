async function sendChat(req, res, next) {
  res.json({success: true, message: "U have made it thru"})
}

module.exports = {
  sendChat
}
