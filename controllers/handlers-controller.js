
class Handlers_controller {
  not_found(req, res) {
    res.status(404).render('404', { title: '404: Not Found' });
  }
  server_error(err, req, res, next) {
    res.status(500).render('500', { title: '500: Internal Server Error', error: err });
  }
}

module.exports = new Handlers_controller();
