import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ApiPath } from '../assets/common/base-url';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const Register = ({ setIsLoaderVisible, showToast }) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const history = useHistory();

    const register = () => {
        //Connect to the api after validation...
        if (name === "" || role === "" || phone === "" || password === "" || email === "") {
            showToast("Complete all fields to proceed!", 'exclamation');
            return;
        }

        if (password !== verifyPassword) {
            showToast("Password and verify password fields must match!", 'exclamation');
            return;
        }

        //Else, proceed...
        const data = {
            name: name,
            role: role,
            phoneNumber: phone,
            password: password,
            emailId: email,
        }

        const options = {
            'headers': {
                'Content-type': 'application/json',
            },
            'method': 'POST',
            'body': JSON.stringify(data),
        }

        setIsLoaderVisible(true);

        fetch(ApiPath + "register", options)
            ?.then(response => (response.json()))
            .then(response => {
                setIsLoaderVisible(false);
                if (response && response.statusCode === 200) {
                    showToast("Registration successful! Now login with the new credentials...", 'success');

                    if (response.data.uidNo.substring(0, 1) === "P") {
                        history.push("/");
                    } else {
                        history.push("/doctors/login")
                    }


                } else {
                    showToast(response.message, 'exclamation');
                }
            })
            .catch(err => {
                setIsLoaderVisible(false);
                showToast(err.message, 'exclamation');
            })

    }

    return (
        <div className="container">
            <div className='smaller-container'>
                <div className="container-divider">
                    <div className="left-sidebar">
                        <div className='image-box'>
                            <img src="./mah-logo.png" />
                        </div>
                        <div className='float-logo'>
                            <i className='icofont-tick-boxed' />
                        </div>
                        <div className="left-text">
                            {/* Form for details entry... */}
                            <div className="form-data">
                                <h2>Registration <i className='icofont-tick-boxed'/></h2>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label className='d-none'>Name (Firstname and Lastname)</label>
                                        <input
                                            id="name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            autoComplete='off'
                                            placeholder='Fullname'
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label className='d-none'>Email</label>
                                        <input
                                            id="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            type="email"
                                            className="form-control"
                                            autoComplete='off'
                                            placeholder='Email'
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label className='d-none'>Role</label>
                                        <select
                                            id="role"
                                            value={role}
                                            onChange={e => setRole(e.target.value)}
                                            className="form-control"
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Patient">Patient</option>
                                            <option value="Doctor">Doctor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label className='d-none'>Phone</label>
                                        <PhoneInput
                                            placeholder="Enter mobile number"
                                            value={phone}
                                            onChange={val => setPhone(val)}
                                            className='form-control'
                                            style={{ paddingTop: 0, paddingBottom: 0 }}

                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label className='d-none'>Password</label>
                                        <input
                                            id="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            type="password"
                                            className="form-control"
                                            autoComplete='off'
                                            placeholder='Password'
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label className='d-none'>Verify Password</label>
                                        <input
                                            id="verifyPasword"
                                            value={verifyPassword}
                                            onChange={e => setVerifyPassword(e.target.value)}
                                            type="password"
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder='Verify Password'
                                        />
                                    </div>
                                </div>
                                <button
                                    id="btnLogin"
                                    className="btn-continue"
                                    style={{ marginBottom: '20px'}}
                                    onClick={register}
                                >Register</button>
                            </div>

                            <div className="doctor-register">
                                <h4>Already a user? <Link to="/">Login here</Link></h4>
                            </div>
                        </div>

                    </div>
                    <div className="right-sidebar" style={{ minHeight: '80%'}}>
                        <img src="./access-account.svg" style={{ width: '50%' }} />
                        <div className="image-text">
                            <p>India's top doctors to guide you to better health everyday...</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}