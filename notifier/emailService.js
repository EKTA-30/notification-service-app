const nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
 service:"gmail",
 port: 465, // true for 465, false for other ports
 host: "smtp.gmail.com",
 auth: {
 user: 'kumariekta1430@gmail.com',
 pass: 'syotgoymdlsviuri',
 }
})