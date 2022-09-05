const express = require('express');
const router = express.Router();
const https = require("https");

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Music time: ', Date.now());
//     next();
// });

router.get('/', function (req, res) {
    res.send('Music home page');
});

router.get('/releases/:search/:page', function (req, res) {
    // todo pagination in the request, param: page=2
    const url = new URL(`/artists/${req.params.search}/releases?sort=year&sort_order=desc&page=${req.params.page}`, "https://api.discogs.com");
    // url.searchParams.append("q", req.params.search);
    console.log("url releases -- ", url);

    // const url = 'https://api.discogs.com/database/search?q=Rihanna'; // works

    const request = https.request(url, {
        method: 'get',
        headers: {
            Authorization: "Discogs key=fUdSkaSOUbjrGNBNrDCE, secret=RGqIbmNWOitUWITVUyfGpuKwcBtCmhuM",
            'User-Agent': 'MusicDoscogsSearchEngineAwesomeSuperPuperDuper/1.0 +http://localhost:3000'
        }},
            data => {

        let response = Buffer.from('');
        data.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`);
            response = Buffer.concat([response, chunk]);
        });

        data.on('end', () => {
            res.send(response);
        })
    });
    request.end();
});

// not used
router.get('/about/:search', function (req, res) {
    const url = new URL("/database/search", "https://api.discogs.com");
    url.searchParams.append("q", req.params.search);

    // const url = 'https://api.discogs.com/database/search?q=Rihanna'; // works

    const request = https.request(url, {
        method: 'get',
        headers: {
            Authorization: "Discogs key=fUdSkaSOUbjrGNBNrDCE, secret=RGqIbmNWOitUWITVUyfGpuKwcBtCmhuM",
            'User-Agent': 'MusicDoscogsSearchEngineAwesomeSuperPuperDuper/1.0 +http://localhost:3000'
        }},
            data => {

        let response = Buffer.from('');
        data.on('data', (chunk) => {
            // console.log(`BODY: ${chunk}`);
            response = Buffer.concat([response, chunk]);
        });

        data.on('end', () => {
            res.send(response);
        })
    });
    request.end();
});

router.get('/artist/:search', function (req, res) {
    const url = new URL("/database/search", "https://api.discogs.com");
    url.searchParams.append("q", req.params.search);
    url.searchParams.append("type", "artist");
    console.log("url --- ", url.toString());

    // const url = 'https://api.discogs.com/database/search?artist=Rihanna'; // works?

    const request = https.request(url, {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Methods': "POST, GET, OPTIONS, DELETE, PUT",
                'Access-Control-Max-Age': 0,
                'Content-Security-Policy': "default-src *; connect-src *; script-src *; object-src *",
                'X-Content-Security-Policy': "default-src *; connect-src *; script-src *; object-src *",
                'X-Webkit-CSP': "default-src *; connect-src *; script-src 'unsafe-inline' 'unsafe-eval' *; object-src *",
                Authorization: "Discogs key=fUdSkaSOUbjrGNBNrDCE, secret=RGqIbmNWOitUWITVUyfGpuKwcBtCmhuM",
                'User-Agent': 'MusicDoscogsSearchEngineAwesomeSuperPuperDuper/1.0 +http://localhost:3000'
            }},
        data => {

            let response = Buffer.from('');
            data.on('data', (chunk) => {
                // console.log(`BODY: ${chunk}`);
                response = Buffer.concat([response, chunk]);
            });

            data.on('end', () => {
                res.send(response);
            })
        });
    request.end();
});

module.exports = router;
