const express=require('express');
const router=express.Router();
const User=require('../models/User');

const validateRegisterInput=require('../validation/register');
const node=require('./nodemailer');

// router.post('/register',(req,res)=>{
//     console.log("hello");
//     const error={
      
//     };
   
//     // if(req.body.name=="")
//     // error.name="name cannot be empty";
//     // if(req.body.email=="")
//     // error.email="email cannot be empty";
//     // if(req.body.phone=="")
//     // error.phone="phone cannot be empty";
    
//     let verifier = new Verifier("at_uqWN4mRrp4Up7iMeSuJ7XdbcgKbwv");
//     verifier.verify(req.body.email, (err, data) => {
//         if (err) 
//         error.email="invalid email";
//                 // return res.status(404).json({err:"invalid email"});
//                 var z=data.freeCheck;
//         if(z=="true"){
//             console.log(data.freeCheck+"hhhhh");
//            //return res.status(404).json({err:"this email is not business email"});
//            error.email="this email is not business email";
         
//         }
        
        
        
//         var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

//         if(format.test(req.body.name)){
//           error.name="no"
//         } else {
//           return res.json({ss:"ok"});
//         }
//         console.log(error.name);
//         var output = req.body.phone.split('');
//         if(output.length!=11){
//             error.phone="invalid number";
        
//         }
//     else{
//         for(var i=0;i<11;i++){
//             if(i==0){
//                 if(output[0]!='+'){
//                     error.phone="enter + starting";break;
//                 }
//             }
//             else{
//                 if(isNaN(parseInt(output[i]))){
//                     error.phone="invalid number";
                  
//                 }
//                 // if(isNaN(parseInt(output[i])))
//                 // console.log(parseInt(output[i]));
//             }
//         }
//     }
        
//         console.log(output.length);
//        // return res.status(404).json(error);


//            if(error===undefined||
//     error===null||
//     (typeof error==='object'&&Object.keys(error).length===0)||
//     (typeof error==='string'&& error.trim().length===0)){
//         console.log("solve");
//         User.findOne({email:req.body.email})
//     .then(user=>{
//         if(user){

//             res.status(404).json({err:"user already exists"});
//         }
//         else{
             
//             const newUser=new User({
//                 name:req.body.name,
//                 email:req.body.email,
//                 phone:req.body.phone
               
//             });
//             newUser.save()
//         }
//     })
//    }
//    else{
//     console.log("solve");
    
//    }
//    return res.status(404).json(error);
        
        
//     }); 
// //    if(error===undefined||
// //     error===null||
// //     (typeof error==='object'&&Object.keys(error).length===0)||
// //     (typeof error==='string'&& error.trim().length===0)){
// //         User.findOne({email:req.body.email})
// //     .then(user=>{
// //         if(user){
// //             res.status(404).json({err:"user already exists"});
// //         }
// //         else{
// //             const newUser=new User({
// //                 name:req.body.name,
// //                 email:req.body.email,
// //                 phone:req.body.phone
               
// //             });
// //             newUser.save()
// //         }
// //     })
// //    }
    
    
   


// });

router.post('/register',(req,res)=>{
  
    const {error,isValid}=validateRegisterInput(req.body);
    if(!isValid){
       
        return res.status(400).json(error);
    }

    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                res.status(404).json({email:"user already exists"});
            }
            else{
                
                const newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    phone:req.body.phone,
                    country:req.body.country,
                    region:req.body.region
                });
                newUser.save()
                .then(user=>res.json(user))
                    .catch(err=>console.log(err));
                node(req.body);
            }
        })
})

router.get('/thanks',(req,res)=>{
    res.json({ss:"your work is done"});
    });
module.exports=router;