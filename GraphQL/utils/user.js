const registerValidation = (name, email, password, confirmPassword) => {
    const errors = {};
    if (name.trim() === '') errors.name = 'Please enter a name'
    if (email.trim() === '') errors.email = 'Please enter an email';
    else {
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regExp)) errors.email = 'Please enter a valid email'
    }
    if (password.trim() === '') errors.password = 'Please enter a password';
    else if (password.trim().length < 8) errors.password = 'Password length minmum 8chr';

    if (password.trim() !== confirmPassword.trim()) errors.password = 'Password not match';
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

const loginValidator = (email, password) => {
    const errors = {};
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim() === '' || !email.match(regExp)) errors.email = 'Please enter a valid email';
    if (password.trim() === '') errors.password = 'Please enter a valid password';

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    }
}

module.exports = { registerValidation, loginValidator }