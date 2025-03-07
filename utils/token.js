const jwt = require('jsonwebtoken');

const generateToken = async (loginCustomerId) => {
    return token = jwt.sign({ id: loginCustomerId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const setCookie = (res, token) => {
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.cookie('token', token, options);
};

module.exports = { generateToken, setCookie };