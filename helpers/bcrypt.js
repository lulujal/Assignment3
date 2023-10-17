const bcrypt = require('bcrypt');

function hashPassword(UserPassword) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(UserPassword, saltRounds);
    return hash;
}

function comparePassword(UserPassword, hashedPassword) {
    return bcrypt.compareSync(UserPassword, hashedPassword);
}

module.exports= {
    hashPassword,
    comparePassword
}