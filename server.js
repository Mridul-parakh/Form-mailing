const express=require('express');
const app=express();
const mongoose=require('mongoose');
const db=require('./config/keys').mongoUrl;
const bodyParser=require('body-parser');
const User =require('./router/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



mongoose.connect(db,{
  useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.get('/',(req,res)=>{
res.send("hello");
});
app.use('/api/user',User);

PORT=5000;
app.listen(PORT,()=>console.log(`Server connected at port ${PORT}`));