require('dotenv').config();
const https = require('https');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const cors = require('cors')
const fileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
const fs = require('fs');
const logger= require('./utils/logger')


app.use(cors({credentials: true,  origin: process.env.WEBHOST}));
app.use( helmet({
    contentSecurityPolicy: false,
  }) );

app.use( cookieParser() );
app.use( bodyParser.json({limit:process.env.EXPRESS_FileSize_LIMIT}) );
app.use( bodyParser.urlencoded({ 
    extended: true, 
    limit:process.env.EXPRESS_FileSize_LIMIT, 
    parameterLimit: process.env.EXPRESS_PARAM_LIMIT 
}));



// image uploader
app.use(fileUpload());

// include api routes
const apiRoutes = require('./routes');
app.use('/api/',apiRoutes);


    
const server = http.createServer(app);
    
server.listen( process.env.EXPRESS_PORT , () => {
    
    logger.log(`Note app listening at http://localhost:${process.env.EXPRESS_PORT}`)
});    



