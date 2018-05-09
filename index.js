var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient;
const ObjectID=require ('mongodb').ObjectID;




 //var JASON = require("JASON");



const connection = (closure)=>{
return MongoClient.connect('mongodb://localhost:27017/nahla',(err,client)=>{
if (err)return console.log(err);
    
let db= client.db('nahla');
closure(db)
})
}

/*app.get('/users', (req, res)=> {
connection(db=>{
    db.collection('Users').find().toArray((err,result)=>{
        res.send(result);
    });
})
}) */

app.post('/auth/register', (req,res)=>{
  connection( (db)=>{
    db.collection('User').insert(req.body,(err,result)=>{
      res.send(result);
    });
    
  })
    
 
})
app.post('/auth/login', (req,res)=>{
  connection( (db)=>{
    db.collection('User').findOne( {email:req.body.email},(err,result)=>{
        if (result)
     { if (req.body.password == result.password)
        { let token=jwt.sign(result,'my_password');
            res.send({message:'ok', token:token});}
        else 
        {
            res.send({message:'bad password'});
        }
    
}
     else{
         res.send({message:'user not found'});
     }
    });
    
  })

})
app.listen(3000)
