const express = require('express')
const mongoose=require("mongoose");
const app=express();
const port=process.env.port || 5000
require("../src/db/conn")
const monmodel=require("../src/models/schema")
const countermodel=require("../src/models/Counter")
const itemRouter=require("./routers/itemroute");
app.use(express.json())
app.use(itemRouter);

  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
