module.exports = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-inline'; object-src 'self'; img-src 'self' data:;"
  );
  next();
};
