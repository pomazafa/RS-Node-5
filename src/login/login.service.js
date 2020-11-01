const usersService = require('../resources/users/user.service');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../common/config').JWT_SECRET_KEY;
const { checkHashedPassword } = require('../common/hashHelper')

const signToken = async (login, password) => {

    const user = await usersService.getByLogin(login);

    if(!user) {
        return null;
    } else {
        const { password: hashedPassword } = user;

        const comparisonRes = await checkHashedPassword(password, hashedPassword);

        if (comparisonRes) {
            const { id, login } = user;
            const token = jwt.sign({id, login}, SECRET_KEY, {expiresIn: '10m'});
            return token;
        } 

        return null;
    }

};

module.exports = {
    signToken
};