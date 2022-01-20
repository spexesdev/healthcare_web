import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ApiPath } from '../assets/common/base-url';

export const DoctorsLogin = props => {

    const { showToast, setIsLoaderVisible } = props;

    const [txtDoctorsID, setTxtDoctorsID] = useState("");
    const [txtPhone, setTxtPhone] = useState("");
    const [txtPassword, setTxtPassword] = useState("");

    const history = useHistory();

    const tryLogin = () => {
        //Try logging in...
        const data = {
            loginId: txtPhone,
            role: "Doctor",
            validatedbyotp: "true"
        }

        const options = {
            'headers': {
                'Content-type': 'application/json',
            },
            'method': 'POST',
            'body': JSON.stringify(data),
        }

        setIsLoaderVisible(true);

        fetch(ApiPath + "login", options)
            ?.then(response => (response.json()))
            .then(response => {

                setIsLoaderVisible(false);

                if (response.statusCode === 200 && response.uidNo === txtDoctorsID) {
                    //Proceed to the doctors page...
                    sessionStorage.setItem('token', response.token)
                    sessionStorage.setItem("id_val", response.uidNo)
                    history.push("/doctors/profile");

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
        <>
            <div className="container">
                <div className="container-divider">
                    <div className="left-sidebar" style={{ minHeight: '100vh' }} >
                        <img src="../mah-logo.png" />

                        <div className="left-text" style={{ marginTop: '-1px'}}>
                            <h2><i className="icofont-check-circled"></i> Doctors' Login!</h2>

                            <h4 style={{ marginTop: '-20px'}}>Enter your details</h4>
                            <div className="form-row">
                                <div className="input-group">
                                    <input
                                        id="txtDoctorsID"
                                        value={txtDoctorsID}
                                        onChange={e => setTxtDoctorsID(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        autoComplete='off'
                                        maxLength={14}
                                        placeholder='Doctor ID'
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <input
                                        id="txtPhone"
                                        value={txtPhone}
                                        onChange={e => setTxtPhone(e.target.value)}
                                        type="tel"
                                        className="form-control"
                                        autoComplete='off'
                                        maxLength={14}
                                        placeholder='Registered Phone Number'
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-group">
                                    <input
                                        id="txtPassword"
                                        value={txtPassword}
                                        onChange={e => setTxtPassword(e.target.value)}
                                        type="password"
                                        className="form-control"
                                        autoComplete='off'
                                        placeholder='Password'
                                    />
                                </div>
                            </div>
                            <h5>By continuing, you agree to our</h5>
                            <Link to="/">Terms and conditions</Link>

                            <button
                                id="btnLogin"
                                className="btn-continue"
                                onClick={tryLogin}   //Show 2fa page...
                            >Login</button>
                            <div className="doctor-register">
                                <h4>Are you a new user? <Link to="/register">Register here</Link></h4>
                            </div>

                        </div>
                        <div className="left-footer" style={{ display: 'none' }}>
                            <p>Certified and secure online healthcare platform</p>
                        </div>
                    </div>
                    <div className="right-sidebar">
                        <img src="../doctors.svg" />
                        <div className="image-text">
                            <p>India's top doctors to guide you to better health everyday</p>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}