const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'lynn.strosin0@ethereal.email',
//         pass: 'CXh71sM4aznT89fCVN'
//     }
// });


const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'lynn.strosin0@ethereal.email',
        pass: 'CXh71sM4aznT89fCVN',
    }
};

module.exports = nodemailer.createTransport(mailConfig);