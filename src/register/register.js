import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ApiPath } from '../assets/common/base-url';

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
            <div className="container-divider">
                <div className="left-sidebar">
                    <img src="./mah-logo.png" />

                    <div className="left-text" style={{ marginTop: -5 }}>
                        <h2 style={{ marginBottom: 25 }}>Registration</h2>

                        {/* Form for details entry... */}
                        <div className="form-data">
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Name (Firstname and Lastname)</label>
                                    <input
                                        id="name"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Email</label>
                                    <input
                                        id="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        type="email"
                                        className="form-control"
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Role</label>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        className="form-control"
                                    >
                                        <option value=""></option>
                                        <option value="Patient">Patient</option>
                                        <option value="Doctor">Doctor</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Phone</label>
                                    <input
                                        id="phone"
                                        value={phone}
                                        onChange={e => setPhone(e.target.value)}
                                        type="tel"
                                        className="form-control"
                                        autoComplete='off'
                                        maxLength={14}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Password</label>
                                    <input
                                        id="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        autoComplete='off'
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <label>Verify Password</label>
                                    <input
                                        id="verifyPasword"
                                        value={verifyPassword}
                                        onChange={e => setVerifyPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <button
                                id="btnLogin"
                                className="btn-continue"
                                onClick={register}
                            >Register</button>
                        </div>

                        <div className="doctor-register">
                            <h4>Already a user? <Link to="/">Login here</Link></h4>
                        </div>
                    </div>

                </div>
                <div className="right-sidebar">
                    <img src="./access-account.svg" style={{ width: '50%' }} />
                    <div className="image-text">
                        <p>India's top doctors to guide you to better health everyday...</p>
                    </div>
                </div>

            </div>

        </div>
    )
}