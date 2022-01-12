import nodemailer from "nodemailer";

export default async function sendMail(email,id, token) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "webproj.auction@gmail.com", // generated ethereal user
            pass: 'Llemint1', // generated ethereal password
        },
    });

    let mailOpts = {
        from: '<webproj.auction@gmail.com>', // sender address
        to: `<${email}>`, // list of receivers
        subject: "Registration Email Verification!", // Subject line
        html: 'Hello,<br> Please Click on the link to verify your email.<br><a href="http://localhost:3000/verify-email/:id/:token">Click here to verify</a>'
    };

    // send mail with defined transport object
    await transporter.sendMail(mailOpts).then(info => {
        console.log({info});
    }).catch(console.error);
    ;

};

