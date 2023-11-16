const bcrypt = require('bcrypt');
const saltRounds = 10;

function encrypt(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(password, salt, (err, hashedPassword) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hashedPassword);
                    }
                });
            }
        });
    });
}

module.exports = {
    encrypt
};