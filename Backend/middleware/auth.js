const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = {
    getUser: async (token) => {
        if (!token) {
            return null;
        }

        try {
            token = token.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            return user;
        } catch (error) {
            return null;
        }
    }
};

module.exports = auth;