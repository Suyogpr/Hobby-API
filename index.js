import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import activitiesRouter from './router/activities.router.js';
import factsRouter from './router/facts.router.js';

dotenv.config()

const app = express();

//middleware
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello from the simple API")
})


//Connect Mongo

mongoose.connect(process.env.MONGO)
.then(() =>{
    console.log(`MongoDB is connected!!!`)
})
.catch(error => {
    console.log(error);
});

// Base routes
app.use('/activities', activitiesRouter);
app.use('/activities/:activityId/facts',factsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//starting server

const PORT=process.env.PORT || 3001
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}!!!`)
});

