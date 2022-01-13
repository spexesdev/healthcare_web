import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ApiPath } from '../assets/common/base-url';
import OTPLogin from './OTPLogin';


export const Login = (props) => {

    const { showToast, setIsLoaderVisible } = props;

    const [value, setValue] = useState("");
    const [displayOTP, setDisplayOTP] = useState(false);

    const tryLogin = () => {
        //Try logging in...
        const data = {
            phoneNumber: value
        }

        const options = {
            'headers': {
                'Content-type': 'application/json',
            },
            'method': 'POST',
            'body': JSON.stringify(data),
        }

        setIsLoaderVisible(true);

        fetch(ApiPath + "sendSms", options)
            ?.then(response => (response.json()))
            .then(response => {

                setIsLoaderVisible(false);

                if (response.statusCode !== 200) {
                    showToast(response.message, 'exclamation');
                } else {
                    //Else, proceed... show the 2fa page...
                    showToast("Enter the OTP sent to your registered phone number to proceed.", "information");
                    setDisplayOTP(true);
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
                        <img src="./mah-logo.png" />

                        <div className="left-text">
                            <h2><i className="icofont-check-circled"></i> Let's get started!</h2>

                            <h4>Enter your mobile number</h4>
                            <div className="phone-input-container">
                                <input
                                    id="value"
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                    defaultCountry='IN'
                                    className="login-control"
                                    placeholder="Mobile Number"
                                    maxLength={14}
                                    type="text"
                                />
                            </div>

                            <h5>By continuing, you agree to our</h5>
                            <Link to="/admin/dashboard">Terms and conditions</Link>

                            <button
                                id="btnLogin"
                                className="btn-continue"
                                onClick={tryLogin}   //Show 2fa page...
                            >Continue</button>
                            <div className="doctor-register">
                                <h4>Are you a new user? <Link to="/register">Register here</Link></h4>
                            </div>
                            <div className="doctor-register">
                                <h4>Returning Doctor? <Link to="/doctors/login">Login here</Link></h4>
                            </div>
                        </div>
                        <div className="left-footer" style={{ display: 'none' }}>
                            <p>Certified and secure online healthcare platform</p>
                        </div>
                    </div>
                    <div className="right-sidebar">
                        <img src="./doctors.svg" />
                        <div className="image-text">
                            <p>India's top doctors to guide you to better health everyday</p>
                        </div>
                    </div>

                </div>

            </div>

            {
                displayOTP && <OTPLogin
                    showDialog={displayOTP}
                    phoneNumber={value}
                    hideDialog={() => setDisplayOTP(false)}
                    showToast={showToast}
                    setIsLoaderVisible={setIsLoaderVisible}
                />
            }
        </>
    )
}