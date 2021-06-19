
const bcrypt = require('bcryptjs');
const { uid } = require('uid');
const User = require('../../models/User');
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server');
const { registerValidation, loginValidator } = require('../../../utils/user');

module.exports = {
    Mutation: {
        async register(_, { registerInput: { name, password, email, confirmPassword } }, context, info) {
            // TODO: validation user data
            // TODO: make sure user dose not exists
            // TODO: Hash password and create and auth token
            const { valid, errors } = registerValidation(name, email, password, confirmPassword);
            if (!valid) throw new UserInputError('Errors', { errors })
            const user = await User.findOne({ email })
            if (user) throw new UserInputError("User already exists with: " + email)
            password = await bcrypt.hash(password, 12);
            const username = uid(),
                newUser = new User({
                    name, username, password, email, username, createdAt: new Date().toISOString(),
                }),
                res = await newUser.save(),
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

        },
        async Login(_, { email, password }, context, info) {
            const { valid, errors } = loginValidator(email, password);
            if (!valid) throw new UserInputError("Errors", { errors })

            const user = await User.findOne({ email })
            if (!user) {
                errors.general = "User not exists"
                throw new UserInputError("User not exists", { errors })
            }
            const hashPassword = await bcrypt.compare(password, user.password);
            if (!hashPassword) {
                errors.general = "Wrong crendetials"
                throw new UserInputError("Wrong crendetials", { errors })
            }

            let { id, name, username } = user
            const token = jwt.sign({
                id, email, name, username
            }, process.env.TOKEN_SECRET, { expiresIn: '1d' })
            return { id, email, name, username, token }
        }

    }
}