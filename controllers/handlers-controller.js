
class Handlers_controller {
  not_found(req, res) {
    res.render('404');
  }
  server_error(err, req, res, next) {
    res.render('500');
  }
}

module.exports = new Handlers_controller();
