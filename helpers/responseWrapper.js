const responseWrapper = (data, message, status) => {
  return {
    data: data,
    message: message,
    status: status
  }
}

module.exports = responseWrapper;