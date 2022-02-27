import { useState, useEffect } from "react";
import { ApiPath } from "../assets/common/base-url";
import { useHistory } from 'react-router-dom'

const OTPLogin = (props) => {

    const history = useHistory();

    const [countdownTimer, setCountdownTimer] = useState(45);

    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [input4, setInput4] = useState('')
    const [input5, setInput5] = useState('')
    const [input6, setInput6] = useState('')

    useEffect(() => {
        if (countdownTimer <= 0) {
            setInterval(() => {
                setCountdownTimer(value => (value - 1));
            }, 1000)
        }

    }, [countdownTimer])

    const postLogin = async () => {
        //Build the OTP...
        try {
            const OTP = input1 + input2 + input3 + input4 + input5 + input6;

            const data = {
                loginId: props.phoneNumber,
                role: props.sender || 'Patient',
                otp: OTP,
            }

            const options = {
                'headers': {
                    'Content-Type': 'application/json',
                },
                'method': 'POST',
            }

            props.setIsLoaderVisible(true);

            fetch(ApiPath + "login", { ...options, 'body': JSON.stringify(data) })
                ?.then(res => (res.json()))
                .then(res => {
                    props.setIsLoaderVisible(false);

                    if (res.statusCode === 200) {
                        props.showToast("Login successful!", 'success');

                        //Remember to store the bearer token
                        sessionStorage.setItem("token", res.token);
                        sessionStorage.setItem("id_val", res.uidNo);

                        if (props.sender === "Doctor") {
                            //Redirect to the doctor's profile page...
                            history.push("/doctors/appointment-onboarding");
                            sessionStorage.setItem("doctor", JSON.stringify(res.data));

                        } else {
                            //A Patient... redirect to the patients dhp page...
                            sessionStorage.setItem('patient', JSON.stringify(res.data));
                            history.push("/patients/digital-health-passport")
                        }


                    } else {
                        props.showToast(res.message, 'exclamation');
                    }
                })
                .catch(err => {
                    props.setIsLoaderVisible(false);
                    props.showToast(err.message, 'exclamation');
                })

        } catch (error) {
            props.showToast(error, 'exclamation')
        }
    }

    const displayClasss = props.showDialog ? "dialog-background fade" : "dialog-background";

    return (
        <div className={displayClasss}>
            <div className="dialog-container otp">
                <div className="dialog-content">
                    <div className="dialog-header">
                        <h2 className="nully">Confirm your phone number</h2>
                        <span id="close_toast" onClick={props.hideDialog}>&times;</span>
                    </div>
                    <div className="dialog-body">
                        <h4>To complete your login, please enter the 6-digit OTP sent to

                        </h4>
                        <h2 className="phone-no">{props.phoneNumber}</h2>
                        <div className="input-array">
                            <input
                                type="text"
                                maxLength={1}
                                id="input1"
                                value={input1}
                                onChange={e => {
                                    setInput1(e.target.value);
                                    if (e.keyCode !== 8) document.getElementById("input2").focus();
                                }}
                            />
                            <input
                                type="text"
                                maxLength={1}
                                id="input2"
                                value={input2}
                                onChange={e => {
                                    setInput2(e.target.value);
                                    if (e.keyCode !== 8) document.getElementById("input3").focus();
                                }}
                            />
                            <input
                                type="text"
                                maxLength={1}
                                id="input3"
                                value={input3}
                                onChange={e => {
                                    setInput3(e.target.value);
                                    if (e.keyCode !== 8) document.getElementById("input4").focus();
                                }}
                            />
                            <input
                                type="text"
                                maxLength={1}
                                id="input4"
                                value={input4}
                                onChange={e => {
                                    setInput4(e.target.value);
                                    if (e.keyCode !== 8) document.getElementById("input5").focus();
                                }}
                            />
                            <input
                                type="text"
                                maxLength={1}
                                id="input5"
                                value={input5}
                                onChange={e => {
                                    setInput5(e.target.value);
                                    if (e.keyCode !== 8) document.getElementById("input6").focus();
                                }}
                            />
                            <input
                                type="text"
                                maxLength={1}
                                id="input6"
                                value={input6}
                                onChange={e => {
                                    setInput6(e.target.value);
                                    if (e.keyCode !== 8) document.getElementById("input1").focus();
                                }}
                            />

                        </div>

                        <div className="resend-group d-none">
                            <div>
                                <p>Didn't receive the OTP?</p>
                                <button>Resend</button>
                            </div>
                            <div>00:{countdownTimer}</div>
                        </div>

                        <div className="otp-call d-none">
                            <button>Get OTP on call</button>
                        </div>
                    </div>
                    <div className="dialog-footer">
                        <button className="btn-continue" onClick={postLogin}>Continue</button>
                        <button className="btn-cancel" onClick={props.hideDialog}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OTPLogin;