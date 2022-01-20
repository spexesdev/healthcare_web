import React, { useRef, useState, useEffect } from 'react';
import { CryptoApiPath } from '../assets/common/base-url';
import { Meet } from '@meet/web-sdk';
import { MeetingDialog } from './meeting-dialog';

const Meeting = props => {

    const [token, setToken] = useState('')
    const [txtPastPrescription, setTxtPastPrescription] = useState('')
    const [showDialog, setShowDialog] = useState(false)
    const [meetingData, setMeetingData] = useState({});
    const [patientId, setPatientId] = useState('')
    const [doctorId, setDoctorId] = useState('')

    const apiRef = useRef();

    useEffect(() => {
        fetchToken()
    }, [])

    const fetchToken = () => {
        //Get the top elements...
        const searchString = window.location.search;
        const urlParams = new URLSearchParams(searchString);

        const meetingId = urlParams.get('meeting_id');
        setDoctorId(urlParams.get('doctor_id'));
        setPatientId(urlParams.get('patient_id'));
        const gravatar = urlParams.get('gravatar');
        const past_prescription = urlParams.get('past_prescription');

        //Set the token for loading...
        sessionStorage.setItem('token', urlParams.get('tk'));

        //fetch token on form load....
        fetch(CryptoApiPath + 'retriveTokenFor?meeting_id=' + meetingId + '&doctor=' + doctorId + '&gravatar=' + gravatar)
            .then(response => (response.json()))
            .then(res => {
                if (res.status === 200 && res.statusText === "OK") {
                    //Set the output
                    setToken(res.result.token);
                    setTxtPastPrescription(past_prescription);
                    setMeetingData(res.result);

                    console.log(res.result.token);
                }
            })

    }

    const handleClose = data => {
        console.log('Close Meeting', data);
    }

    const suspendDetected = (data) => {
        console.log(data);
    }

    const manageApi = (apiObj, ref) => {
        ref.current = apiObj;
        ref.current.addEventListeners({
            readyToClose: handleClose,
            suspendDetected: suspendDetected
        });
    };

    return (
        <div style={{ display: 'flex' }}>
            <Meet
                roomName={'room1'}  //meetingData.roomNumber
                subject='Doctor Consultation'
                jwt={token}
                onApiReady={eApi => manageApi(eApi, apiRef)}
                width={'100vw'}
                height={'100vh'}

            />
            <div className='meeting-button-container'>
                <div className='prescription'>
                    <button
                        id='btnPostPrescription'
                        onClick={() => setShowDialog(true)}
                        className='btn-main'
                        style={{ width: '100%' }}
                    >
                        Prescription Dialog ...
                    </button>
                </div>
            </div>
            {
                showDialog && <MeetingDialog
                    showToast={props.showToast}
                    setIsLoaderVisible={props.setIsLoaderVisible}
                    hideDialog={() => setShowDialog(false)}
                    patientId={patientId}
                    doctorId={meetingData.displayName}
                />
            }
        </div>

    )

}

export default Meeting;
