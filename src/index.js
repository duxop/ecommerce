const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const env = require('dotenv');
const oauthGoogle = require('./api/routes/oauth-google');

const app = express();

mongoose.connect("mongodb+srv://shivamDB:shivam@cluster0.krp5xqf.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

env.config();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {       // Cors access
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

app.use('/oauth/google', oauthGoogle);

app.get('/', (req, res, nest) => {

    res.status(200).json({
        message: "Running"
    });

});


app.listen(process.env.PORT, ()=> {
    console.log('Server is running');
});

