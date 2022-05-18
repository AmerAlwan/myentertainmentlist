import UserDataService from "./user.service"

class Validator {

    // Checks if there is at least one '@' in the text
    isEmail (text) {
        // Match exactly one of '@'
        return text.match(/@{1}/g);
    }

    isValidEmail(email) {
        if (this.isEmail(email))
            if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/igm)) return true;
        return false;
    }

    async validateAndCreateUser(form) {
        let user = {firstName: form.firstName, lastName: form.lastName, username: form.username, email: form.email, password: form.password};
        return await UserDataService.create(user);
    }

    async validateLogin(form) {
        let user = {username: form.username, password: form.password};
        return await UserDataService.validateLogin(user);
    }

    validate(isLogin = true, form = undefined) {
        if (isLogin) {
            const {username, password} = form;
            const newErrors = {};

            if (!username) newErrors.username = 'Please enter a Username/Email'
            if (!password) newErrors.password = 'Please enter a password!'

            return newErrors;

        } else {
            const {firstName, lastName, email, username, password} = form;
            const newErrors = {};

            if (!firstName) newErrors.firstName = 'Please enter a first name!'
            else if (firstName.length > 30) newErrors.firstName = 'First Name should be under 30 characters!'
            else if (firstName.length < 2) newErrors.firstName = 'First Name should be over 2 characters!'

            if (!lastName) newErrors.lastName = 'Please enter a last name!'
            else if (lastName.length > 30) newErrors.lastName = 'Last Name should be under 30 characters!'
            else if (lastName.length < 2) newErrors.lastName = 'Last Name should be over 2 characters!'

            if (!username) newErrors.username = 'Please choose a username!'
            else if (username.length > 30) newErrors.username = 'Username should be under 30 characters!'
            else if (username.length < 3) newErrors.username = 'Username should be over 3 characters!'

            if (!email) newErrors.email = 'Please enter an email!'
            else if (email.length > 60) newErrors.email = 'Email should be under 60 characters'
            else if (!this.isValidEmail(email)) newErrors.email = 'Invalid email form!'

            if (!password) newErrors.password = 'Please enter a password'
            else if (password.length < 8 || password.length > 16) newErrors.password = 'Password must be 8-16 characters!'

            return newErrors;
        }
    }
}

export default new Validator();