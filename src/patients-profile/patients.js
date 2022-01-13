import { Header } from "../components/header";
import { PatientTabHeaders } from "./tab-pages/patient-tab-headers";
import React, { useState, useEffect, useRef } from 'react';
import { Contact } from "./tab-pages/contact";
import { Personal } from "./tab-pages/personal"
import { Medical } from "./tab-pages/medical";
import { MedicalHistory } from "./tab-pages/medical-history";
import { Lifestyle } from "./tab-pages/lifestyle";
import { ApiPath, CryptoApiPath } from "../assets/common/base-url";
import { fileToBase64 } from "../assets/common/file-to-base64";
import ScheduleAppointment from "../appointments/schedule-appointment";
import { toTimestamp } from "../assets/common/operations";
import { SplitDateFromTimestamp } from "../assets/common/split-date";

const Patients = props => {

    const [scheduleObject, setScheduleObject] = useState('');

    const [patientsData, setPatientsData] = useState('');
    const [doctorData, setDoctorData] = useState({})
    const [selectedTab, setSelectedTab] = useState(2);
    const [resetData, setResetData] = useState(true);
    const [outputText, setOutputText] = useState("");
    const [picture, setPicture] = useState();
    const [appointmentBooked, setAppointmentBooked] = useState(false);
    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)

    //Fetch the data on form load...
    const idValue = sessionStorage.getItem("id_val")
    const params = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        'method': 'GET',
    }

    const refPicture = useRef();

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

    useEffect(() => {
        const dropZone = document.querySelector('.upload-file-area');
        const fileInput = document.getElementById('uploadFile');

        //Set loading at this point...
        props.setIsLoaderVisible(true);

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

    function objToString(obj) {
        return Object.entries(obj).reduce((str, [p, val]) => {
            return `${str}${p}::${val}\n`;
        }, '');
    }

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
        const timeValueOfToday = toTimestamp('2022', '01', '11', '00', '00', '00');
        const timeValueOf3MonthsTime = toTimestamp('2022', '04', '30', '00', '00', '00');

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
                    const result = response.result?.find(item => item.patient_id === patientsData.uidNo)

                    //Set other parameters...
                    setDoctorData(result)

                    console.log(result);

                }
            })
            .catch(err => {
                props.showToast(err, "exclamation");
            })
    }

    //useEffect(() => checkAppointmentBooked(), [appointmentBooked])

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

                    //refPicture.current = picture;

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
                            className={picture ? "btn-main" : "d-none"}
                            id="btnUploadPix"
                            onClick={updatePicture}>
                            <i className="icofont-upload-alt"></i> Update Profile Picture
                        </button>
                    </div>

                </div>
                <div className="right-container">
                    <div className="title">
                        <h2>{patientsData.name}</h2>
                        <h4 className="d-none"><i className="icofont-location-pin"></i>{props.data?.address && props.data.address[0]?.city}, {props.data?.address && props.data.address[0]?.state}</h4>
                    </div>

                    <div className="upcoming-appointment">
                        <div className="line-container">
                            <h4><i className="icofont-double-right"></i>Upcoming Appointment</h4>
                        </div>
                        {appointmentBooked ? <div className="appointment">
                            <div className="details">
                                <h2>{scheduleObject !== '' && `Dr. ${scheduleObject.doctor_name}`}</h2>
                                <h3>Available</h3>
                                <h4><i className="icofont-clock-time" /> {SplitDateFromTimestamp(scheduleObject?.startTIme).dateTime}</h4>
                                <h4>Meeting Link: <a
                                    href={scheduleObject !== '' && scheduleObject?.meetingId}
                                    target='_blank'>
                                    {scheduleObject !== '' && scheduleObject?.meetingId}
                                </a></h4>
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