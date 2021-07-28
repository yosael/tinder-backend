import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
//import { restart } from 'nodemon';
import Cards from './dbCards.js';

// App Config
const app = express();
const port = process.env.PORT || 8001 ;
//const connection_url = 'mongodb+srv://admin-yosa:5iKkUTik5J4VHDWc@cluster0.t5q2r.mongodb.net/tinderdb?retryWrites=true&w=majority'
//const connection_url = process.env.DBURL || 'mongodb+srv://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
const connection_url = process.env.DBURL || 'mongodb://localhost:27017/tinderdb?retryWrites=true&w=majority';

// Middleware

app.use(express.json());
app.use(Cors());

// DB Config

mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})


// API Endpoints

app.get('/', (req,res) => res.status(200).send('Hello World'));

app.post('/tinder/cards', (req,res)=> {
    const dbCard = req.body;
    Cards.create(dbCard, (err,data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards' ,  (req,res)=> {
    const dbCard = req.body;
    Cards.find( (err,data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
});


// Listener

app.listen(port, ()=> console.log(`Listenig on localhost: ${port}`));