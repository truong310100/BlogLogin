const express = require('express');
const articleApi = require('./routes/article');
const authorAPI = require('./routes/author');
require('./config/connect');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/article', articleApi);
app.use('/author', authorAPI);

app.use('/getimage', express.static('./uploads'));
app.listen(3000, ()=>{console.log("Started")});

