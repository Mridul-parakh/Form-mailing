const validator = require('validator');
const isEmpty =require('./is-empty') ;
const Verifier = require("email-verifier");

function hello(data){
   return new Promise((resolve, reject) => {
     let verifier = new Verifier("at_uqWN4mRrp4Up7iMeSuJ7XdbcgKbwv");
     verifier.verify(data, (err, data) => {
       
       if (err) {
         reject(err);
       } else {
         resolve(data);
       }

     })
    })
}


module.exports=function validateRegisterInput(data){
  let error={};
  data.name=!isEmpty(data.name) ? data.name :'';
  data.email=!isEmpty(data.email) ?data.email :'';
  data.phone=!isEmpty(data.phone) ?data.phone :'';
  data.country=!isEmpty(data.country) ?data.country :'';
  data.region=!isEmpty(data.region) ?data.region :'';
  
  if(!validator.isLength(data.name,{min:2,max:30})){
      error.name="minimum length 2 and max 30";
  }
  if(validator.isEmpty(data.name)){
    error.name=" name fielf is empty"; 
  }
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if(format.test(data.name)){
          error.name="name is not correct";
        } 
  
  if(!validator.isEmail(data.email)){
      error.email="valid email require";
      
  }
  if(validator.isEmpty(data.email)){
    error.email=" email fielf is empty"; 
  }

    
  var domain = data.email.substring(data.email.lastIndexOf("@") +1);
  if(domain=="gmail.com"){
    error.email=" email cannot be gmail";
  }else if(domain=="yahoo.com"){
    error.email=" email cannot be yahoo";
  }
  else if(domain=="outlook.com"){
    error.email=" email cannot be outlook";
  }


 
     
  var output = data.phone.split('');
  if(output.length!=11){
      error.phone="invalid number";
  
  }
else{
  for(var i=0;i<11;i++){
      if(i==0){
          if(output[0]!='+'){
              error.phone="enter + starting";break;
          }
      }
      else{
          if(isNaN(parseInt(output[i]))){
              error.phone="invalid number";
            
          }
          // if(isNaN(parseInt(output[i])))
          // console.log(parseInt(output[i]));
      }
  }
}

if(validator.isEmpty(data.phone)){
  error.phone=" phone fielf is empty"; 
}


if(validator.isEmpty(data.country)){
error.country=" country fielf is empty"; 
}

if(validator.isEmpty(data.region)){
error.region=" region fielf is empty"; 
}
       
      

      return{
        error,
          isValid:isEmpty(error)
      }
  
}