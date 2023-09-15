
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const userRouter = require('./routes/user.route')
const tweetRouter = require('./routes/tweet.route')

dotenv.config();
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use('/user', userRouter)
app.use('/tweet', tweetRouter)


const uri = process.env.mongo_uri;
const HOST = process.env.host
const PORT = process.env.port

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



