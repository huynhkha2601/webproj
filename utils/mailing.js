import nodemailer from "nodemailer";

export default {
    async sendMail(email) {

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
    },
    async sendMailResetPassword(email) {
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
            subject: "Reset password!", // Subject line
            html: 'Hello, the reset password of you is: 1'
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
    async sendMailDeleteAccount(email) {
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
            subject: "Delete account!", // Subject line
            html: 'Hello, your account have been deleted by admin!'
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
    async sendMailSuccessAuction(email, productname, url) {
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
            subject: "Successfully Auction!", // Subject line
            html: `Hello,<br> Congratulations, you have successfully placed a price on the product ${productname}
                    <br>You can click this link to return to the product detail page. <a href="${url}">Click here!</a>`
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
    async sendMailUpdateSuccessAuction(email, productname, url) {
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
            subject: "Update price successfully Auction!", // Subject line
            html: `Hello,<br> Congratulations, you have successfully updated a price on the product ${productname}
                    <br>You can click this link to return to the product detail page. <a href="${url}"></a>`
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
    async sendMailSellerDeleteAnBidsAccount(email, productname, url) {
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
            subject: "Delete a Bids Account. Update price of product!", // Subject line
            html: `Hello,<br> An auction user account of your product has been removed from the auction site. The system will have re-updated the product's price and price holder. ${productname}
                    <br>You can click this link to return to the product detail page. <a href="${url}">Click Here</a>`
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
    async sendMailSuccessBuy(email, productname, url) {
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
            subject: "Buy successfully!", // Subject line
            html: `Hello,<br>You buy <b>${productname}</b> succesfully!
                    <br>You can click this link to return to the product detail page. <a href="${url}">Click Here</a>`
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
    async sendMailSellerFailedAuc(email, productname, url) {
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
            subject: "Failed Auction!", // Subject line
            html: `Hello,<br>You have sold the product <b>${productname}</b> failed!
                    <br>You can click this link to return to the product detail page. <a href="${url}">Click Here</a>`
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
    async sendMailSellerSuccessAuc(email, productname, url) {
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
            subject: "Auction successfully!", // Subject line
            html: `Hello,<br>You have sold the product <b>${productname}</b> succesfully!
                    <br>You can click this link to return to the product detail page. <a href="${url}">Click Here</a>`
        };

        // send mail with defined transport object
        await transporter.sendMail(mailOpts).then(info => {
            console.log({info});
        }).catch(console.error);

    },
};

