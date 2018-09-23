exports.processLogin = (req, res) => {
  req.session.user = {
    name: req.body.name,
  }
  res.redirect('/room')
}
