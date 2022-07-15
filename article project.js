const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
app.use(bodyParser.json());

async function doGetRequest() {

  let res = await axios.get('https://jsonmock.hackerrank.com/api/articles?page=<pageNumber>');

  let data = res.data;
  const mydata=JSON.stringify(data)
  const objdata=JSON.parse(mydata);
  const newdata=objdata.data;
  newdata.sort((a,b)=>{
    if(a.num_comments!=b.num_comments)
    {
      return b.num_comments - a.num_comments;
    }
    else{
           
            if (a.firstName.toLowerCase() <b.firstName.toLowerCase() ) {
                return -1;
            }
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
                return 1;
            }
        
    }
  })
 for(let i=0;i<newdata.length;i++)
  {
      console.log(newdata[i].title)
  }

}
doGetRequest();

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
})
