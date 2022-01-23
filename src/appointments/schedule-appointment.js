import React, { useEffect, useState } from 'react';
import { DoctorsDialog } from './doctors-dialog';
import { ApiPath } from '../assets/common/base-url';
import { SplitDateFromTimestamp } from '../assets/common/split-date';

const ScheduleAppointment = props => {

    const [doctorSelected, setDoctorSelected] = useState('')
    const [showDoctorDialog, setShowDoctorDialog] = useState(false);
    const [doctorsData, setDoctorsData] = useState({})

    const [txtPatientsInstruction, setTxtPatientsInstruction] = useState('')
    const [txtSupportingInfo, setTxtSupportingInfo] = useState('')
    const [fileConsent, setFileConsent] = useState('')
    const [specialObject, setSpecialObject] = useState('')

    const scheduleAppointment = () => {
        //Use the endpoint for the appointment scheduling
        const payLoad = {
            "meetingId": specialObject.meetingID,
            "speciality": specialObject.speciality,
            "startTIme": specialObject.startTime,
            "duration": specialObject.duration,
            "patientInstruction": txtPatientsInstruction,
            "patientId": props.data.uidNo,
            "doctorId": specialObject.doctor_id,
            "supportingInfo": {
                "filesConsent": fileConsent
            }
        }

        const options = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            'method': 'POST',
            'body': JSON.stringify(payLoad),
        }

        fetch(ApiPath + "appointment/bookAppointment", options)
            .then(response => (response.json()))
            .then(response => {
                if (response.status === "success") {
                    //Success message
                    props.showToast("Appointment with doctor scheduled successfully!", "success");

                    props.setAppointmentBooked()
                    props.hideAppointmentDialog();
                    props.setScheduleObject({...payLoad, "doctor_name": specialObject.doctor_name})
                }
            })

}

//Fetch the data on form load...
const params = {
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
    },
    'method': 'GET',
}

useEffect(() => {
    //Use the selected doctor to reload the doctor's profile and hsow data here...

    if (doctorSelected) {
        props.setIsLoaderVisible(true);

        fetch(ApiPath + "query/search/" + doctorSelected, params)
            ?.then(response => (response.json()))
            .then(res => {
                props.setIsLoaderVisible(false)

                if (res.statusCode === 200) {
                    setDoctorsData(res.data);

                } else {
                    props.showToast(res.message, 'exclamation');
                }

            })
            .catch(err => {
                props.setIsLoaderVisible(false);
                props.showToast(err.message, 'exclamation');
            })


        //Alwasy remember to reset this so that we dont have an infinite loop
        setDoctorSelected(false);
    }

}, [doctorSelected])

return (
    <>
        <div className="dialog-background fade">
            <div className="dialog-container" style={{ width: '800px' }}>
                <div className="dialog-header">
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}><i className="icofont-stopwatch"></i> Schedule Appointment</h2>
                </div>
                <div className="dialog-body">

                    <div className='form-row-1-2'>
                        <div className='input-group'>
                            <label>Choose Doctor</label>
                            <button
                                className="btn-main-outline"
                                onClick={() => setShowDoctorDialog(true)}
                            >Browse for Doctor...
                            </button>
                        </div>
                        <div className='doctor-area'>
                            <div className={doctorSelected !== '' ? 'chosen-doctor' : 'd-none'}>
                                <img src='/portfolio/team-4.jpg' alt='' />
                                <div className="details">
                                    <h3>{doctorsData && "Dr. " + doctorsData.name}</h3>
                                    <p>{doctorsData?.specialization?.certification}</p>
                                    <div>
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}><i className='icofont-clock-time' /></span>
                                        <span>{specialObject !== '' && SplitDateFromTimestamp(specialObject.startTime).dateTime}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={doctorSelected === '' ? 'no-doctor-yet' : 'd-none'}>
                                <img src='/res/doctor.png' alt='' width={50} />
                                <h2>No Doctor Chosen yet...</h2>
                            </div>
                        </div>
                    </div>
                    <div className="form-row mb-2 mt-2" style={{ borderBottom: '2px solid var(--light-golden-rod)' }}>

                    </div>
                    <div className='form-row'>
                        <div className='input-group'>
                            <label>Allow Doctor to view my medical history?</label>
                            <select
                                id="fileConsent"
                                value={fileConsent}
                                className='form-control'
                                onChange={e => setFileConsent(e.target.value)}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-row-2'>
                        <div className='input-group'>
                            <label>Patients Instructions</label>
                            <textarea
                                id='txtPatientsInstruction'
                                value={txtPatientsInstruction}
                                onChange={e => setTxtPatientsInstruction(e.target.value)}
                                rows={3}
                                className='form-control'
                            />
                        </div>
                        <div className='input-group'>
                            <label>Supporting Info</label>
                            <textarea
                                id='txtSupportingInfo'
                                value={txtSupportingInfo}
                                onChange={e => setTxtSupportingInfo(e.target.value)}
                                rows={3}
                                className='form-control'
                            />
                        </div>
                    </div>
                </div>
                <div className="dialog-footer main">
                    <button
                        id="btnUpdate"
                        onClick={scheduleAppointment}
                        className="btn-main mr-1"
                    ><i className="icofont-checked"></i> Schedule
                    </button>
                    <button
                        className="btn-main-outline"
                        onClick={() => props.hideAppointmentDialog()}
                    >Cancel</button>
                </div>
            </div>
        </div>

        {
            showDoctorDialog && <DoctorsDialog
                showToast={props.showToast}
                setIsLoaderVisible={props.setIsLoaderVisible}
                hideDoctorsDialog={() => setShowDoctorDialog(false)}
                setDoctorSelected={setDoctorSelected}
                data={props.data}
                setSpecialObject={setSpecialObject}

            />
        }

    </>
);
}

export default ScheduleAppointment;
