const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
module.exports = {
    checkAuth: (context) => {
        const authHeader = context.req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split('Bearer ')[1];
            if (token) {
                try {
                    const user = jwt.verify(token, process.env.TOKEN_SECRET, { expiresIn: '1d' })
                    return user;
                } catch (error) {
                    throw new AuthenticationError('Invalid/Expired user')
                }
            } else throw new Error('Authentication header must be \'Bearer [token]');

        } else throw new Error('Authorization header must be provided');
    }
}