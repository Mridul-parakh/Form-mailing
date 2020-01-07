const nodemailer=require('nodemailer');

module.exports=function node(data){

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'jainmannu21@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || 'rekha202' // TODO: your gmail password
    }
});

// Step 2
var maillist=[
    "mridulparakh41@gmail.com",
    "katrinajain58@gmail.com"
]

let mailOptions = {
    from: 'jainmannu21@gmail.com', // TODO: email sender
    to: maillist, // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: "Name:"+data.name+"\n Email: "+data.email+"\nPhone: "+data.phone+"\nCountry: "+data.country+"\nRegion: "+data.region
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return console.log('Error occurs');
    }
    return console.log('Email sent!!!');
});

}
