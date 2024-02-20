import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { emailValidation, nameValidation, passwordValidation } from '../../Script/Common';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: '#fff',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: '#333',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function BasicModal({ open, setOpen, setEdit }) {
    const handleClose = () => {
        setEdit(false)
        setOpen(false);
        setName('');
        setEmail('');
        setPassword('');
        setConfirm('');
        setNameError('');
        setEmailError('');
        setPasswordError('');
    };

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const validate = async () => {
        let check = true
        if (!nameValidation(name, setNameError)) check = false
        if (!emailValidation(email, setEmailError)) check = false
        if (!password === confirm) {
            check = false
            setPasswordError('Password Incorrect')
            return false
        }
        
        if (!passwordValidation(password, setPasswordError)) check = false
        if (!check) return false
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_REGISTER, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, remember: false })
        })
        if (response.status === 201) setEmailError('Account Already Exists')
        else if (response.status === 200) {
            handleClose()
        } else alert(response.status)
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='section'>
                        <button className='btn btn-success float-right'  onClick={validate}><i className='fa fa-check'></i></button>
                        <button className='btn btn-transparent mx-2 float-right' onClick={handleClose}><i className='fa fa-times'></i></button>
                    </div>
                    <div className="form mt-5">
                        <form action="" className='form'>
                            <input type="text" onChange={(e) => {
                                setName(e.target.value)
                                setNameError('')
                            }} value={name} className='form-control text-muted' placeholder='Enter Name' />
                            <p>{nameError}</p>
                            <input type="text" onChange={(e) => {
                                setEmail(e.target.value)
                                setEmailError('')
                            }} value={email} className='form-control text-muted' placeholder='Enter Email' />
                            <p>{emailError}</p>
                            <input type="text" onChange={(e) => {
                                setPassword(e.target.value)
                                setPasswordError('')
                            }} value={password} className='form-control text-muted' placeholder='Enter Password' />
                            <p></p>
                            <input type="text" onChange={(e) => {
                                setConfirm(e.target.value)
                                setPasswordError('')
                            }} value={confirm} className='form-control text-muted' placeholder='Confirm Password' />
                            <p>{passwordError}</p>
                        </form>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}