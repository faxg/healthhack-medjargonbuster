var storage = require('azure-storage');

var blobService = azure.createBlobService();
blobService.createContainerIfNotExists('fileupload', {
  publicAccessLevel: 'blob'
}, function(error, result, response) {
  if (!error) {
    // if result = true, container was created.
    // if result = false, container already existed.
  }
});

module.exports = async function (context, req) {
    context.log('File Upload triggered', req.headers);


    const responseMessage = "OK";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}