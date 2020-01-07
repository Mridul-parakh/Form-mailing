const nodemailer=require('nodemailer');

module.exports=function node(data){

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'jainmannu21@gmail.com', 
        pass: process.env.PASSWORD || '(password)' 
    }
});


var maillist=[
    "mridulparakh41@gmail.com",
    "katrinajain58@gmail.com"
]

let mailOptions = {
    from: 'jainmannu21@gmail.com', 
    to: maillist, 
    subject: 'Nodemailer - Test',
    text: "Name:"+data.name+"\n Email: "+data.email+"\nPhone: "+data.phone+"\nCountry: "+data.country+"\nRegion: "+data.region
};


transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return console.log('Error occurs');
    }
    return console.log('Email sent!!!');
});

}
