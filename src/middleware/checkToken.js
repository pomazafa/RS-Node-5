const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, PATH_WHITELIST } = require('../common/config');

module.exports = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (authHeader !== undefined) {

        const tokenString = req.header('Authorization');

        const [type, token] = tokenString.split(' ');

        if (type !== 'Bearer') {
            res.status(401).send('Unauthorized user!');
        } else {
            const res = jwt.verify(token, JWT_SECRET_KEY);
            return next();
        }

    }

    res.status(401).send('Unauthorized user!');
};