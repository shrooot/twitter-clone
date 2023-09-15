
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route')
const tweetRouter = require('./routes/tweet.route')
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express()


app.use(cookieParser());
const corsOpts = {
    origin: 'https://twitter-clone-frontend-production-1d63.up.railway.app',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    allowedHeaders: [
        'Content-Type',
    ],
    credentials: true
};

app.use(cors(corsOpts));
// app.use(cors({
//     origin: "https://twitter-clone-frontend-production-1d63.up.railway.app/",
//     credentials: true
// }))
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'https://twitter-clone-frontend-production-1d63.up.railway.app/');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });
app.use(express.json())
app.use('/user', userRouter)
app.use('/tweet', tweetRouter)


const uri = process.env.MONGO_URI;
const HOST = process.env.HOST || "localhost"
const PORT = process.env.PORT || 8080

mongoose.connect(
    uri,
    { useNewUrlParser: true }
);

// Check if the connection is established and once it is print a statement that will let us know the status

mongoose.connection
    .once('open', () => {
        console.log('Database Connected Successfully')
        const server = app.listen(PORT, function () {
            console.log(`listening at http://${HOST}:${PORT}`);
        });
    })
    .on('error', (error) => {
        console.log('Your error ', error);
    });



