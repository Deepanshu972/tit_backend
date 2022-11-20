// just sends error message as api response
const errResponse = (err, req, res, next) => {
  if ([401, 404, 409].includes(err.status)) {
    res.status(err.status).json({"error": err.message});
  } else {
    // do not send unexpected error messages
    res.status(500).json({"error": "Internal Server Error 500"})
    console.error("Unexpected Error:", err)
  }
  next(err);
}

module.exports = errResponse;
