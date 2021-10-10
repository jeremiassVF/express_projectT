const express = require('express');
const app = express();

app.get("/", (req, res, next)=>{
    res.status(200);
    res.send("holissss puto ");
});

app.listen(3000, () =>{
    console.log("server is running...")
});