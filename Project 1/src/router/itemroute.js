const express= require("express");
const router= new express.Router();

router.post('/boards',(req, res) => {

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

          const data=new monmodel({
            title:req.body.title,
            id:seqId,
            stage:1
          })
          data.save();
          
        })
        res.send("posted");
       
  })

  router.put('/boards/:id', async(req, res) => {

    // checking the 'stage' value is between 1 to 3

    try{
       
      if(req.body.stage >= 1 && req.body.stage <= 3) {
        
      const _id=req.params.id;
      const getitem=await monmodel.findByIdAndUpdate(_id,req.body);

      res.status(201).send(getitem);}
  }
  catch(e)
  {
    res.status(500).send(e);
  }
   
});
module.exports=router;

