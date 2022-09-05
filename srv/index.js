const express = require('express');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000',
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

const musicRouter = require('./musicRouter');
app.use('/music', musicRouter);

app.listen(3003, () => console.log('Example app listening on port 3003!'));

// hot realoading nodemon