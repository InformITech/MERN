const emailValidation = (email, error) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
        error('!! Enter Email !!')
        return false
    }
    if (!emailRegex.test(email)) {
        error('!! Enter Email Properly !!')
        return false
    }
    else return true
}

const passwordValidation = (password, error) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$/;
    if (password.length === 0) {
        error('!! Enter Password !!')
        return false
    } else {
        if (password.length < 8) {
            error('!! Password must have minimum 8 characters !!')
            return false
        } else {
            if (!passwordRegex.test(password)) {
                error('!! Enter Password Properly !!')
                return false
            }
            else return true
        }
    }
}

const nameValidation = (name, error) => {
    const nameRegex = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/;
    if (name.length === 0) {
        error('!! Enter Name !!')
        return false
    } else {
        if (!nameRegex.test(name)) {
            error('!! Enter name Properly !!')
            return false
        } else {
            return true
        }
    }
}

const usernameValidation = (username, error) => {
    const usernameRegex = /^[a-z]{3,16}$/;
    if (username.length < 3) {
        error('Minimum Three Characters')
        return false
    }
    if (!usernameRegex.test(username)) {
        error('Only small letter alphabets')
        return false
    }
    return true
}

export { nameValidation, emailValidation, passwordValidation, usernameValidation }