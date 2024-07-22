import express from 'express'

const app = express();

app.listen('8080', () => {
    console.log("Server starts running at port 8080");
})