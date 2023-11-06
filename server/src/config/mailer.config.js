require('dotenv').config();

const mailConfig = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    mail: process.env.EMAIL,
    password: process.env.EMAIL_PSSWD
};

module.exports = mailConfig;