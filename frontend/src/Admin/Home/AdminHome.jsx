import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { nameValidation, usernameValidation } from '../../Script/Common';
import swal from 'sweetalert2'
import BasicModal from './Modal';

const AdminHome = () => {
    const userDetails = useSelector(state => state.reducer.adminDetails);
    const [edit, setEdit] = useState(null);
    const [users, setUsers] = useState([]);
    const [img, setImg] = useState(null);
    const [show, setShow] = useState(null);
    const [nameError, setNameError] = useState('')
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true);
    const [userNameError, setUserNameError] = useState('')
    const fetchData = async () => {
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_ADMIN_HOME, {
            method: 'GET',
        });

        if (response.status === 200) {
            const res = await response.json();
            setUsers(res.users);
        }
    };
    useEffect(() => {
        fetchData()
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const reader = new FileReader();

        setImg(e.target.files[0]);

        reader.onload = function (event) {
            const result = event.target.result;
            setShow(result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'name':
                setNameError('')
                setEdit({ ...edit, name: value })
                break;
            case 'username':
                setUserNameError('')
                setEdit({ ...edit, username: value })
                break
            default:
                break;
        }
    }

    const onImgUpdate = async () => {
        const newFileName = edit._id + '.jpg';

        const formData = new FormData();
        formData.append('image', img, newFileName);
        formData.append('id', edit._id)

        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_USER_IMG, {
            method: 'POST',
            body: formData,
        });
        return response
    };


    const logOut = () => {
        localStorage.removeItem('Admin')
        window.location.href = '/admin/login'
    }

    const updateUser = async () => {
        let check = true
        if (!nameValidation(edit.name, setNameError)) check = false
        if (!usernameValidation(edit.username, setUserNameError)) check = false
        if (!check) return false
        if (img) await onImgUpdate()
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_USER_PROFILE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: edit.name, username: edit.username, id: edit._id, gender: edit.gender })
        })
        if (response.status === 200) {
            swal.fire({
                title: 'Success',
                text: 'Profile Updated Successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
            await fetchData()
            cancelUpdate()
        }
    }

    const cancelUpdate = () => {
        setEdit(null)
        setShow(null)
        setImg(null)
    }

    const blockUser = async (id, index) => {
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_USER_BLOCK, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        if (response.status === 200) {
            setUsers([...users.slice(0, index), { ...users[index], status: !users[index].status }, ...users.slice(index + 1)]);
        }
    }
    const deleteUser = async (id, index) => {
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_DELETE_USER, {
            method: 'POST',
            headers: { 'COntent-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        if (response.status === 200) {
            setUsers([...users.splice(0, index)])
        }
    }

    const makeAdmin = async (id, index) => {
        const response = await fetch(process.env.REACT_APP_BASIC_URL + process.env.REACT_APP_USER_TO_ADMIN, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        if (response.status === 200) {
            setUsers([...users.slice(0, index), { ...users[index], admin: !users[index].admin }, ...users.slice(index + 1)]);
        }
    }
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand d-md-none d-xs-block py-3" href="/admin">
                        <img src="/images/logo.jpeg" height="40" alt="Company Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link mx-2 active" aria-current="page" href="/admin">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" aria-current="page" href="/admin">Products</a>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link mx-2 btn btn-transparent text-light" onClick={handleOpen}>Create User</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link mx-2 px-3 btn rounded-0 btn-danger text-light" id="profileBtn" onClick={logOut} >Log out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div id="wrapper">
                {!edit ? (
                    <>
                        <header id="header">
                            <h1>
                                <strong>Welcome {userDetails.name}</strong>
                            </h1>
                        </header>
                        <div className="container">
                            <table className="table table-bordered" style={{ width: '100%', border: '1px solid black' }}>
                                <thead>
                                    <tr>
                                        <th className="Thead"><center>Sl No</center></th>
                                        <th className='Thead'><center>Image</center></th>
                                        <th className="Thead"><center>Name</center></th>
                                        <th className="Thead"><center>Email</center></th>
                                        <th className='Thead'><center>Admin</center></th>
                                        <th className="Thead"><center>Blocked</center></th>
                                        <th className="Thead"><center>Options</center></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users && users.length > 0 && users.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className='Thead'><center>{index + 1}</center></td>
                                            <td height={'30px'} width={'30px'}> <img src={process.env.REACT_APP_BASIC_URL + 'Profile/' + user.profile} height={'30px'} width={'30px'} alt="" /> </td>
                                            <td className='Thead' id={'name_' + user._id} ><center>{user.name}</center></td>
                                            <td className='Thead' id={'email_' + user._id}><center>{user.email}</center></td>
                                            <td className='Thead'><center><button className='btn' onClick={() => makeAdmin(user._id, index)}>{user.admin ? 'Remove' : 'Add'}</button></center></td>
                                            <td className='Thead'><center>{user.status ? 'No' : 'Yes'}</center></td>
                                            <td className='Thead'>
                                                <center>
                                                    <button className='btn' onClick={() => { setEdit(users[index]) }} >Edit</button>
                                                    <button className='btn' onClick={() => blockUser(user._id, index)}>{user.status ? 'Block' : 'Unblock'}</button>
                                                    <button className='btn' onClick={() => deleteUser(user._id, index)}>Delete</button>
                                                </center>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <center>
                        <div className="card" style={{ width: '18rem', marginTop: '20px' }}>
                            <img className="card-img-top" src={show ? show : (process.env.REACT_APP_BASIC_URL + 'Profile/' + edit.profile)} height={'230px'} alt="" />
                            <label htmlFor="fileInput" className="bg-dark">
                                <i className="fa fa-plus rounded text-light"></i>
                                <input
                                    type="file"
                                    id="fileInput"
                                    hidden
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label>
                            <ul className="list-group list-group-flush">
                                <li className='list-group-item'>Name <input
                                    type="text"
                                    name="name"
                                    className='btn bg-secondary'
                                    defaultValue={edit && users.length > 0 ? edit.name : ''}
                                    onChange={handleInput}
                                /> <p>{nameError}</p> </li>
                                <li className="list-group-item">Username <input
                                    type="text"
                                    name='username'
                                    className='btn bg-secondary'
                                    defaultValue={edit.username}
                                    placeholder='Enter username'
                                    onChange={handleInput}
                                /><p>{userNameError}</p></li>
                            </ul>
                            <div className="card-body">
                                <button className='btn-success text-light' onClick={updateUser}>Update</button>
                                <button className='btn-danger text-light ml-2' onClick={cancelUpdate} >Cancel</button>
                            </div>
                        </div>
                    </center>
                )}
                <BasicModal open={open} setOpen={setOpen} setEdit={setEdit} />
            </div>
        </>
    );
};

export default AdminHome;

