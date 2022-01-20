import { Header } from "../components/header";
import { PatientTabHeaders } from "./tab-pages/patient-tab-headers";
import React, { useState, useEffect } from 'react';
import { Contact } from "./tab-pages/contact";
import { Personal } from "./tab-pages/personal"
import { Medical } from "./tab-pages/medical";
import { MedicalHistory } from "./tab-pages/medical-history";
import { Lifestyle } from "./tab-pages/lifestyle";
import { ApiPath, CryptoApiPath } from "../assets/common/base-url";
import { fileToBase64 } from "../assets/common/file-to-base64";
import ScheduleAppointment from "../appointments/schedule-appointment";
import { SplitDateFromTimestamp } from "../assets/common/split-date";
import { Link } from "react-router-dom";

const Patients = props => {

    const [scheduleObject, setScheduleObject] = useState('');
    const [allowState, setAllowState] = useState(true)

    const [patientsData, setPatientsData] = useState('');
    const [doctorData, setDoctorData] = useState({})
    const [selectedTab, setSelectedTab] = useState(2);
    const [resetData, setResetData] = useState(true);
    const [outputText, setOutputText] = useState("");
    const [picture, setPicture] = useState();
    const [appointmentBooked, setAppointmentBooked] = useState(false);
    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    //Percentage complete
    const [percentComplete, setPercentComplete] = useState(0)

    //Fetch the data on form load...
    const idValue = sessionStorage.getItem("id_val")
    const params = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        'method': 'GET',
    }

    const handleChange = e => {
        const file = e.target.files[0];

        fileToBase64(file)
            .then(response => {
                setPicture(response.toString());
                setOutputText(file.name);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const checkCircleSector = () => {
        //Returns a value based on the percentage completion of
        //the patient's data..
        //First, get all the relative values required...
        const pix = patientsData.photo === "" ? 0 : 10;
        const lifeStyle1 = patientsData.lifeStyle?.activityLevel === "" ? 0 : 3;
        const lifeStyle2 = patientsData.lifeStyle?.alcoholConsumption === "" ? 0 : 3;
        const lifeStyle3 = patientsData.lifeStyle?.foodPreference === "" ? 0 : 3;
        const lifeStyle4 = patientsData.lifeStyle?.smokingHabbit === "" ? 0 : 3;

        //general
        const general1 = patientsData.general?.bloodGroup === "" ? 0 : 2;
        const general2 = patientsData.general?.bmi === "" ? 0 : 2;
        const general3 = patientsData.general?.bp === "" ? 0 : 2;
        const general4 = patientsData.general?.chestExpansion === "" ? 0 : 2;
        const general5 = patientsData.general?.height === "" ? 0 : 2;
        const general6 = patientsData.general?.oxygenSaturation === "" ? 0 : 2;
        const general7 = patientsData.general?.pulse === "" ? 0 : 2;
        const general8 = patientsData.general?.vision === "" ? 0 : 2;
        const general9 = patientsData.general?.weight === "" ? 0 : 2;

        const general = general1 + general2 + general3 + general4 + general5 + general6 + general7 + general8 + general9;

        //Name and phone
        const fullName = patientsData.name === "" ? 0 : 10;
        const phoneNo = patientsData.phoneNumber === "" ? 0 : 10;
        const gender = patientsData.gender === "" ? 0 : 5;
        const birthDate = patientsData.birthDate === "" ? 0 : 5;
        const email = patientsData.emailId === "" ? 0 : 5;
        const maritalStatus = patientsData.maritalStatus === "" ? 0 : 5;
        const pastPrescriptions = patientsData.pastPrescriptions?.length === 0 ? 0 : 5;
        const currentMedications = patientsData.currentMedications?.length === 0 ? 0 : 5;
        const diagnosisReport = patientsData.diagnosisReport?.length === 0 ? 0 : 5;
        const contactPerson = patientsData.contactPerson?.length === 0 ? 0 : 5;

        const totalValue = pix + lifeStyle1 + lifeStyle2 + lifeStyle3 + lifeStyle4 + general +
                    fullName + phoneNo + gender + email + maritalStatus + pastPrescriptions +
                    currentMedications + diagnosisReport + contactPerson + birthDate;

        //Set the variable...
        setPercentComplete(totalValue);

        const circle2 = document.getElementById('secondCircle');
        circle2.style.strokeDashoffset = `calc(440 - (440 * ${totalValue}) / 100)`;


        //
        if (totalValue < 50) {
            circle2.style.stroke = 'var(--light-golden-rod)';
        } else if (totalValue > 50 && totalValue < 70) {
            circle2.style.stroke = 'var(--bluish)';
        } else if (totalValue > 69) {
            circle2.style.stroke = 'var(--main-green)';
        }
    }

    useEffect(() => {
        const dropZone = document.querySelector('.upload-file-area');
        const fileInput = document.getElementById('uploadFile');

        //Set loading at this point...
        props.setIsLoaderVisible(true);

        checkAppointmentBooked();
        checkCircleSector();

        dropZone.addEventListener('dragover', e => {
            // we must preventDefault() to let the drop event fire
            e.preventDefault();
        });

        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            // drag/drop files are in event.dataTransfer
            let files = e.dataTransfer.files;
            fileInput.files = files;
            const file = fileInput.files[0];

            fileToBase64(file)
                .then(response => {
                    setPicture(response.toString());
                    setOutputText(file.name);
                })
                .catch(err => {
                    props.showToast(err, "exclamation");
                })

        });

        return () => {

            dropZone.removeEventListener('dragover', e => {
                // we must preventDefault() to let the drop event fire
                e.preventDefault();
            });

            dropZone.removeEventListener('drop', e => {
                e.preventDefault();
                // drag/drop files are in event.dataTransfer
                let files = e.dataTransfer.files;
                fileInput.files = files;
                console.log(`added ${files.length} files`);
            });

        }

    }, [])

    useEffect(() => checkAppointmentBooked(), [picture, scheduleObject])

    useEffect(() => {

        resetData && setTimeout(() => {

            props.setIsLoaderVisible(true);

            fetch(ApiPath + "query/search/" + idValue, params)
                ?.then(response => (response.json()))
                .then(res => {
                    props.setIsLoaderVisible(false)

                    if (res.statusCode === 200) {
                        setPatientsData(res.data);
                        setPicture(res.data.photo);

                        //Save this for future use...
                        localStorage.setItem('patient', JSON.stringify(res.data));

                        //Update the completion status
                        checkCircleSector();

                    } else {
                        props.showToast(res.message, 'exclamation');
                    }

                })
                .catch(err => {
                    props.setIsLoaderVisible(false);
                    props.showToast(err.message, 'exclamation');
                })

            //Always remember to reset the data...
            setResetData(false);

        }, 5000)

    }, [resetData])


    //Also, always check to see if the appointment has been booked...
    const checkAppointmentBooked = () => {
        //Remember, that this should be for
        // year, month, day, hour, minute, second
        const timeValueOfToday = new Date('2022-01-01').getTime();      //Remove date in parenthesis later....
        const timeValueOf3MonthsTime = new Date().getTime() + (60 * 60 * 24 * 90);

        //Set other parameters...
        const input1 = `starttime=${timeValueOfToday}&endtime=${timeValueOf3MonthsTime}`;
        const options = {
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
            },
            'method': 'GET',
        }

        props.setIsLoaderVisible(true);

        fetch(`${CryptoApiPath}getMeetingList?${input1}`, options)
            .then(response => (response.json()))
            .then(response => {
                props.setIsLoaderVisible(false);
                if (response.status === 200) {
                    //Retrieve the result...
                    const result = response.result?.filter(item => item.patient_id === patientsData.uidNo)

                    //Set other parameters...
                    setDoctorData(result[result.length - 1]);
                    setAppointmentBooked(true);

                } else {
                    props.showToast('Failed to fetch data. Please try again after some time.', 'exclamation');
                }
            })
            .catch(err => {
                props.showToast(err, "exclamation");
            })
    }

    const updatePicture = () => {
        //Update the picture...
        //update just the personal details contained here...
        const data = {
            'photo': picture,
        }

        const options = {
            'method': "PUT",
            'body': JSON.stringify(data),
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }

        props.setIsLoaderVisible(true)

        //Then update just this data...
        fetch(ApiPath + "patient/profileUpdate", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                props.setIsLoaderVisible(false);
                if (response && response.statusCode === 200) {
                    props.showToast(`Update Successful! Will be fully effected in about 5 secs`, 'success');

                    //Remember to refresh the fetched data after this..
                    setResetData(true);

                } else {
                    props.showToast(response.message, 'exclamation');
                }
            })
            .catch(error => {
                props.setIsLoaderVisible(false);
                props.showToast(error.message, 'exclamation');
            })
    }

    const allowDisallowDoctor = () => {
        //Allow or disallow doctor to view fields...
        //First, always toggle the allowState...
        const data = {
            "uidNo": patientsData.uidNo,
            "supportingInfo": {
                "filesConsent": !allowState
            }
        }

        const options = {
            'method': "POST",
            'body': JSON.stringify(data),
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }

        props.setIsLoaderVisible(true)

        //Then update just this data...
        fetch(ApiPath + "appointmentconsent", options)
            ?.then(res => {
                props.setIsLoaderVisible(false);
                return res.json();
            })
            .then(response => {
                props.setIsLoaderVisible(false);
                if (response.statusCode === 200) {
                    props.showToast(`Update Successful! Will be fully effected in about 5 secs`, 'success');

                    //Remember to refresh the fetched data after this..
                    setAllowState(!allowState);

                } else {
                    props.showToast(response.message, 'exclamation');
                }
            })
            .catch(error => {
                props.setIsLoaderVisible(false);
                props.showToast(error.message, 'exclamation');
            })
    }

    return (
        <div>
            <Header />

            <div className="body-container">
                <div className="left-container">
                    <div className="profile-image">
                        <img
                            src={picture || "/portfolio/avatar.png"}
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <div className="line-container">
                        <h4><i className="icofont-double-right"></i>Patient</h4>
                    </div>
                    <div className="lower-left upload-file-area mb-2">
                        <button className="btn-main btn-upload">
                            <input
                                type="file"
                                name="uploadFile"
                                id="uploadFile"
                                accept={".png, .jpg, .jpeg"}
                                onChange={handleChange}
                            />
                            Change Profile Picture...
                        </button>
                        <label><span>Attached File: </span>{outputText}</label>
                    </div>
                    <div className="lower-left">
                        <button
                            className={picture ? "btn-main mb-2" : "d-none"}
                            id="btnUploadPix"
                            style={{ display: 'block', width: '100%' }}
                            onClick={updatePicture}>
                            <i className="icofont-upload-alt"></i> Update Profile Picture
                        </button>

                        <div className='doctor-view'>
                            <div>
                                <i className={allowState ? 'icofont-ui-check' : 'icofont-ui-close'} style={{ color: !allowState ? 'maroon' : 'var(--main-green)' }}></i>
                                <span>Doctor can view data</span>
                            </div>
                            <button
                                className='btn-main-outline'
                                id="btnUploadPix"
                                onClick={allowDisallowDoctor}>
                                <i className="icofont-refresh"></i> Toggle
                            </button>
                        </div>

                    </div>

                </div>
                <div className="right-container">
                    <div className="title">
                        <h2>{patientsData.name}</h2>
                        <h4 className="d-none"><i className="icofont-location-pin"></i>{props.data?.address && props.data.address[0]?.city}, {props.data?.address && props.data.address[0]?.state}</h4>
                    </div>
                    <div className='box'>
                        <h4>Profile Status</h4>
                        <div className="percent">
                            <svg>
                                <circle cx='70' cy='70' r='70'></circle>
                                <circle id='secondCircle' cx='70' cy='70' r='70'></circle>
                            </svg>
                            <div className="number">
                                <h2>{percentComplete}<span>%</span></h2>
                            </div>
                            <h2 className='text'>Complete</h2>
                        </div>
                    </div>
                    <div className="upcoming-appointment">
                        <div className="line-container">
                            <h4><i className="icofont-double-right"></i>Upcoming Appointment</h4>
                        </div>
                        {(appointmentBooked && Object.keys(patientsData).length > 1) ? <div className="appointment">
                            <div className="details">
                                <h2>{doctorData !== '' && `Dr. ${doctorData?.doctor_name}`}</h2>
                                <h3>{doctorData && doctorData?.doctor_email_id}</h3>
                                <h4><i className="icofont-clock-time" /> {SplitDateFromTimestamp(doctorData?.starttime).dateTime}</h4>
                                <h4>Meeting Link: <Link
                                    to={doctorData !== '' && '/meeting/meeting-page?meeting_id=' +
                                        doctorData?.meetinng_id + '&doctor_id=' + doctorData?.doctor_id +
                                        '&gravatar=./portfolio/avatar.png&past_prescription=' + patientsData?.pastPrescriptions[0]?.name +
                                        '&patient_id=' + patientsData?.uidNo + '&tk=' + sessionStorage.getItem('token')}
                                    target='_blank'>
                                    {doctorData !== '' && doctorData?.meetinng_id}
                                </Link></h4>
                            </div>
                            <img src="/portfolio/team-3.jpg" />
                        </div>
                            : <div className="book-appointment">
                                <h4>You do not have any upcoming appointment!</h4>
                                <button
                                    className="btn-main"
                                    onClick={() => {
                                        setShowAppointmentDialog(true)
                                    }}
                                >Book an Appointment...
                                </button>
                            </div>
                        }
                    </div>

                    <PatientTabHeaders
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />

                    {selectedTab === 1 && <Contact
                        setResetData={setResetData}
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 2 && <Personal
                        setResetData={setResetData}
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 3 && <Medical
                        setResetData={setResetData}
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 4 && <MedicalHistory
                        setResetData={setResetData}
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                    {selectedTab === 5 && <Lifestyle
                        setResetData={setResetData}
                        data={patientsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        setPatientsData={setPatientsData}
                    />}
                </div>
            </div>

            {
                showAppointmentDialog && <ScheduleAppointment
                    data={patientsData}
                    showToast={props.showToast}
                    setIsLoaderVisible={props.setIsLoaderVisible}
                    setAppointmentBooked={() => setAppointmentBooked(true)}
                    hideAppointmentDialog={() => setShowAppointmentDialog(false)}
                    setScheduleObject={setScheduleObject}
                />
            }
        </div>
    );
}

export default Patients;