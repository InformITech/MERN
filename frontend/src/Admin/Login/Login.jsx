import React, { useState } from 'react';
import './Login.css'
import { emailValidation, passwordValidation } from '../../Script/Common';
import { useSelector } from 'react-redux'


const AdminLogin = () => {
    const [hide, sethide] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState('')
    const [remember, setRemember] = useState(false)
    const [passwordErr, setPasswordErr] = useState('')
    const [error, setErr] = useState('Have an Account')
    const Error = useSelector(state => state.reducer.adminError)
    const hideBtn = () => {
        sethide(!hide)
    }
    const changeInData = (e) => {
        const { name, value } = e.target
        setErr('Have an Account')
        switch (name) {
            case 'email':
                setEmail(value)
                setEmailErr('')
                break;
            case 'password':
                setPassword(value)
                setPasswordErr('')
                break;
            case 'remember':
                setRemember(!remember)
                break
            default: break;
        }
    }
    const validate = async () => {
        let check = true
        if (!emailValidation(email, setEmailErr)) {
            check = false
        }
        if (!passwordValidation(password, setPasswordErr)) {
            check = false
        }

        if (!check) {
            return false
        }
        console.log(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_LOGIN_ADMIN);
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_LOGIN_ADMIN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, remember })
        })
        if (response.status === 202) setErr('!! No Admin Found !!')
        if (response.status === 201) setErr('!! Incorrect Password !!')
        if (response.status === 200) {
            const res = await response.json()
            localStorage.setItem('Admin', res.payload);
            window.location.href = '/admin'
        }
    }
    return (
        <div className="img js-fullheight BG">
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Welcome to My Login</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-lg-4">
                            <div className="login-wrap p-0">
                                <h6 className="mb-4 text-center text-danger">{error}</h6>
                                <h6 className="mb-4 text-center text-danger">{Error}</h6>
                                <form action="#" className="signin-form">
                                    <div className="form-group">
                                        <input type="text" name='email' value={email} onChange={changeInData} className="form-control" placeholder="Email" />
                                        <center><span style={{ color: 'red' }}>{emailErr}</span></center>
                                    </div>
                                    <div className="form-group">
                                        <input id="password-field" value={password} name='password' onChange={changeInData} type={hide ? 'password' : 'text'} className="form-control" placeholder="Password" required />
                                        <span toggle="#password-field" onClick={hideBtn} className="fa fa-fw fa-eye field-icon toggle-password"></span>
                                        <center><span style={{ color: 'red' }}>{passwordErr}</span></center>

                                    </div>
                                    <div className="form-group social d-flex text-center">
                                        <button type="button" onClick={validate} className="form-control btn btn-primary submit px-2 py-2 mr-md-1 rounded">Sign In</button>
                                    </div>
                                    <div className="form-group d-md-flex">
                                        <div className="w-50">
                                            <label className="checkbox-wrap checkbox-primary">
                                                Remember Me
                                                <input type="checkbox" onChange={changeInData} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                </form>
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

export default AdminLogin;
