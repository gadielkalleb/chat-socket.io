exports.room = (req, res) => {
  if (!req.session.user) {
    res.redirect('/')
  } else {
    res.render('room', {
      name: req.session.user.name,
    })
  }
}