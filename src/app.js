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

const countermodel=mongoose.model("counter",counterSchema)

app.post('/boards',(req, res) => {

       // mongoDB does not have auto increment using this we can auto increment the items id      
        countermodel.findOneAndUpdate(
        {id:"autoval"},
        {"$inc":{"seq":1}},
        {new:true},(err,cd)=>{

          let seqId;
          if(cd==null)
          {
            const newval=new countermodel({id:"autoval",seq:1})
            newval.save()
            seqId=1;
          }
          else{
            seqId=cd.seq
          }

          let insertObject = {

                 title: req.body.title,
    
                 stage: 1 // setting stage as 1 for every newly creating item
    
          };
          Item.create(insertObject).then(data => {
    
            Item.findByPk(data.id).then(itemData => {
    
                // sending 201 status code with newly created item details
    
                res.status(201).send(itemData.dataValues);
    
            });
    
        });
    
    });
  })

  app.put('/boards/:id', (req, res) => {

    // checking the 'stage' value is between 1 to 3

    if(req.body.stage >= 1 && req.body.stage <= 3) {

        Item.update(req.body, {

            where: {id: req.params.id}

        }).then(data => {

            Item.findByPk(req.params.id).then(itemData => {

                // sending 200 status code with updated item details

                res.status(200).send(itemData.dataValues);

            });

        })

 

    } else {

        // sending 400 status code with empty response

        res.status(400).send();

    }

});
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
