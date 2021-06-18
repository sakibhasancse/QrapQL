
const bcrypt = require('bcryptjs');
const uid = require('uid');
const User = require('../../models/User');
const jwt = require('jsonwebtoken')

module.exports = {
    Mutation: {
        async register(_, { registerInput: { name, password, email, confirmPassword } }, context, info) {
            // TODO: validation user data
            // TODO: make sure user dose not exists
            // TODO: Hash password and create and auth token

            console.log("Calling")
            password = await bcrypt.hash(password, 12);
            const username = uid(),
                user = new User({
                    name, username, password, email, username, createdAt: new Date.toISOString(),
                }),
                res = await user.save(),
                token = jwt.sign({
                    id: res.id,
                    email: res.email,
                    username: res.username
                }, process.env.TOKEN_SECRET, { expiresIn: '1d' })

            return {
                ...res._doc,
                id: res._id,
                token
            }

        }

    }
}