/*
Please use async / promise style operations. 
You can "promisify" synchronous operations, e.g. read from a local file
*/
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

// Axios is a http client lib
// see https://github.com/axios/axios#axios-api
const axios = require('axios');

const assetBasePath = "./BadgeGET/assets";


module.exports = async function (context, req) {
    context.log('HTTP trigger: GET badge');

    const type= req.query.type || 'learner' ;
    const what =  req.query.what || 'badger';

    const filename = `${assetBasePath}/${type}-${what}.png`

    let data = await readFileAsync(filename);


    context.res = {
        status: 200, /* Defaults to 200 */
        headers: {
            'Content-Type': 'image/png'
        },
        body: data,
    };
}