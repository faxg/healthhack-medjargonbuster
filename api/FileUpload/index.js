//var storage = require('azure-storage');
//var getStream = require('into-stream');
const multipart = require("parse-multipart");




module.exports = async function (context, req) {
   
  try {

    if (req.body) {
      const bodyBuffer = Buffer.from(req.body);

      const boundary = multipart.getBoundary(req.headers["content-type"]);
      const parts = multipart.Parse(bodyBuffer, boundary);

      
      context.bindings.storage = parts[0].data;
      context.done();
    } else {
      return endWithBadResponse(context, `Request Body is not defined`);
    }
  } catch (err) {
    context.log.error(err.message);
    throw err;
  }

};

function endWithBadResponse(context, message = "Bad Request") {
  context.log.error(message);
  context.bindings.response = {
    status: 400,
    body: message,
  };
  context.done();
}

