import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBRURL } from './config.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app= express();
//middleware for parsing request body
app.use(express.json());
// option 1. allow all origins with default of cors(*)
app.use(cors());
//option 2: allow custom origins
// app.use(cors({
//     origin:'http://localhost:5173', //allow to server to accept requests from different origin
//     methods:['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:['Content-Type']
// }))
 app.get("/books/home", (req, res)=>{
   console.log(req);
   return res.status(234).send("Welcome to MERN-Stack Learning Project")
 });

app.use('/books', booksRoute);

  mongoose
  .connect(mongoDBRURL)
  .then(()=>{
    console.log('App connected to the database')
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`);
      });
  }).catch((error)=>{
    console.log(error)
  })