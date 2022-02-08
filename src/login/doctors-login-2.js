import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ApiPath } from '../assets/common/base-url';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export const DoctorsLogin = props => {

    const { showToast, setIsLoaderVisible } = props;

    const [txtDoctorsID, setTxtDoctorsID] = useState("");
    const [txtPhone, setTxtPhone] = useState("");
    const [txtPassword, setTxtPassword] = useState("");

    const history = useHistory();

    const tryLogin = () => {
        //Try logging in...
        if (txtPhone === "" || txtDoctorsID === "" || txtPassword === "") {
            props.showToast('Complete all fields before proceeding.', 'exclamation');
            return;
        }

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
                <div className='smaller-container'>
                    <div className="container-divider">
                        <div className="left-sidebar">
                            <img src="../mah-logo.png" />
                            <div className='float-logo'>
                                <i className='icofont-sign-in' />
                            </div>
                            <div className="left-text">


                                <div className='form-data'>

                                    <h2>Returning Doctor</h2>
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
                                    <div className="form-row mb-2">
                                        <div className="input-group-doctor">
                                            <PhoneInput
                                                placeholder="Enter registered mobile number"
                                                value={txtPhone}
                                                onChange={phone => setTxtPhone(phone)}
                                                className='form-control'
                                                style={{ paddingTop: 0, paddingBottom: 0 }}

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
                                    >Login <i className='icofont-sign-in' /></button>
                                </div>
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
            </div>

        </>
    )
}