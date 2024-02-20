import React, { useState } from 'react';
import './Register.css'
import { emailValidation, nameValidation, passwordValidation } from '../../Script/Common';
import { setUserDetails } from '../../Redux';
// store
// useSelector
// const userDetails = useSelector(state => state.reducer.userDetails)
// store.dispatch(setUserDetails(userDetails))

const Register = () => {
    const [hide, sethide] = useState(true)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [remember, setRemember] = useState(false)
    const [passwordErr, setPasswordErr] = useState('')
    const [nameErr, setNameErr] = useState('')
    const hideBtn = () => {
        sethide(!hide)
    }
    const changeInData = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'email':
                setEmail(value)
                setEmailErr('')
                break;
            case 'password':
                setPassword(value)
                setPasswordErr('')
                break;
            case 'confirmPassword':
                setConfirmPassword(value)
                setPasswordErr('')
                break;
            case 'remember':
                setRemember(!remember)
                break
            case 'name':
                setName(value)
                setNameErr('')
                break;
            default: break;
        }
    }
    const validate = async () => {
        let check = true
        if (!emailValidation(email, setEmailErr)) {
            check = false
        }
        if (password !== confirmPassword || confirmPassword === "") {
            setPasswordErr('Enter Confirm password properly')
            check = false
        }
        if (!passwordValidation(password, setPasswordErr)) {
            check = false
        }

        if (!nameValidation(name, setNameErr)) {
            check = false
        }

        if (!check) {
            return false
        }

        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_REGISTER, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember, name })
        })

        if (response.status === 201) {
            setEmailErr('!! Account already exists !!')
        } else if (response.status === 200) {
            window.location.href = '/login'
        } else {
            alert('error')
        }
    }
    return (
        <div className="img js-fullheight BG">
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Welcome to My SIgn Up</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap p-0">
                                <h6 className="mb-4 text-center">Create an Account</h6>
                                <form action="#" className="signin-form">
                                    <div className="form-group">
                                        <input type="text" name='name' value={name} onChange={changeInData} className="form-control" placeholder="Name" />
                                        <center><span style={{ color: 'red' }}>{nameErr}</span></center>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name='email' value={email} onChange={changeInData} className="form-control" placeholder="Email" />
                                        <center><span style={{ color: 'red' }}>{emailErr}</span></center>
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" value={password} name='password' onChange={changeInData} type={hide ? 'password' : 'text'} className="form-control" placeholder="Password" required />
                                        <span toggle="#password-field" onClick={hideBtn} className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" value={confirmPassword} name='confirmPassword' onChange={changeInData} type={hide ? 'password' : 'text'} className="form-control" placeholder="Password" required />
                                        <span toggle="#password-field" onClick={hideBtn} className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                        <center><span style={{ color: 'red' }}>{passwordErr}</span></center>
                                    </div>
                                    <div className="form-group social d-flex text-center">
                                        <button type="button" onClick={validate} className="form-control btn btn-primary submit px-2 py-2 mr-md-1 rounded">Sign Up</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50">
                                            <label className="checkbox-wrap checkbox-primary">
                                                Remember Me
                                                <input type="checkbox" onChange={changeInData} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="w-50 text-md-right">
                                            <a href="/login" style={{ color: '#fff' }}>Login</a>
                                        </div>
                                    </div>
                                </form>
                                <p className="w-100 text-center">&mdash; Have an account &mdash;</p>
                                <div className="social d-flex text-center">
                                    <a href="/login" className="px-2 py-2 mr-md-1 rounded"><span className="ion-logo-facebook mr-2"></span>Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <script src="./jquery.min.js"></script>
            <script src="./popper.js"></script>
            <script src="./bootstrap.min.js"></script>
            <script src="./main.js"></script>
        </div>
    );
};

export default Register;
