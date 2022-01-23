import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { ApiPath } from '../assets/common/base-url';
import OTPLogin from './OTPLogin';
import { LoginHeaders } from './login-headers';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


export const Login = (props) => {

    const { showToast, setIsLoaderVisible } = props;

    const [value, setValue] = useState("");
    const [displayOTP, setDisplayOTP] = useState(false);
    const [selectedTab, setSelectedTab] = useState(1);

    const [txtPassportID, setTxtPassportID] = useState('')
    const [txtPassword, setTxtPassword] = useState('')

    const history = useHistory();

    const tryLogin = () => {
        //Try logging in...
        const data = selectedTab === 1 ? { phoneNumber: value } : {
            loginId: txtPassportID,
            password: txtPassword
        }

        const options = {
            'headers': {
                'Content-type': 'application/json',
            },
            'method': 'POST',
            'body': JSON.stringify(data),
        }

        setIsLoaderVisible(true);
        const route = selectedTab === 1 ? "sendSms" : "login";

        fetch(ApiPath + route, options)
            ?.then(response => (response.json()))
            .then(response => {

                setIsLoaderVisible(false);

                if (response.statusCode !== 200) {
                    showToast(response.message, 'exclamation');
                } else {
                    //Else, proceed... show the 2fa page...
                    if (selectedTab === 1) {
                        showToast("Enter the OTP sent to your registered phone number to proceed.", "information");
                        setDisplayOTP(true);

                    } else {
                        showToast(response.message, "information");
                        history.push("/patients/digital-health-passport");
                    }
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
                            <img src="./mah-logo.png" />

                            <div className="left-text">
                                <h2><i className="icofont-check-circled"></i> Let's get started!</h2>
                                <div className='form-data'>
                                    <LoginHeaders
                                        selectedTab={selectedTab}
                                        setSelectedTab={setSelectedTab}
                                        style={{ marginBottom: '30px' }}
                                    />

                                    {
                                        selectedTab === 1 &&
                                        <div className='form-row mb-2'>
                                            <h5>Login using Mobile number and OTP</h5>

                                            <div className='input-group'>
                                                <PhoneInput
                                                    placeholder="Enter mobile number"
                                                    value={value}
                                                    onChange={phone => setValue(phone)}
                                                    className='form-control'
                                                    style={{ paddingTop: 0, paddingBottom: 0 }}
                                                />
                                            </div>
                                        </div>
                                    }

                                    {
                                        selectedTab === 2 && <div className='form-row mb-2'>
                                            <h5>Login using Passport ID and Password</h5>
                                            <div className='input-group'>
                                                <input className='form-control'
                                                    placeholder='Enter Passport ID'
                                                    id='txtPassportID'
                                                    value={txtPassportID}
                                                    maxLength={14}
                                                    onChange={e => setTxtPassportID(e.target.value)}
                                                />
                                            </div>
                                            <div className='input-group'>
                                                <input className='form-control'
                                                    type='password'
                                                    placeholder='Enter Password'
                                                    id='txtPassword'
                                                    value={txtPassword}
                                                    onChange={e => setTxtPassword(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                    }

                                    <h5>By continuing, you agree to our</h5>
                                    <Link to="/admin/dashboard">Terms and conditions</Link>

                                    <button
                                        id="btnLogin"
                                        className="btn-continue"
                                        onClick={tryLogin}   //Show 2fa page...
                                    >Continue</button>
                                </div>
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