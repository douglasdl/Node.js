// SS
const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email, 
    null,
    keys.private_key, 
    ['https://www.googleapis.com/auth/spreadsheets']
);


client.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("Connected!");
        gsrun(client);
    }

});


async function getMSWData(cl) {
    const gsapi = google.sheets({version:'v4', auth: cl });

    const opt = {
        spreadsheetId: '1y7qEXYx_2SxKNstGkajbh5pAgCs2eYHi1z3m5-ekRUI',
        range: 'Data!A3:M1672'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values;
    //console.log(dataArray);

    dataArray = dataArray.map(function(r){
        while(r.length < 13) {
            r.push('');
        }
        return r;
    });

    return dataArray;
}




const http = require('http')

const hostname = '127.0.0.1'
//const port = process.env.PORT
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(getMSWData())
})

server.listen(port, hostname, () => {
    console.log(`Server runing at http://${hostname}:${port}/`)
})


