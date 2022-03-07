import React, { useEffect, useRef, useState } from 'react';
import { ApiPath, CryptoApiPath } from '../assets/common/base-url';
import { constants } from '../assets/common/constants';

export const DoctorsDialog = props => {

    const today = new Date();
    const [cbxSpeciality, setCbxSpeciality] = useState('Allergist')
    const [doctorsData, setDoctorsData] = useState('')
    const [selectedDoctor, setSelectedDoctor] = useState('')
    const [txtDate, setTxtDate] = useState(today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate());
    const [spanValue, setSpanValue] = useState(1);
    const [timeOfCommencement, setTimeOfCommencement] = useState('')

    //The componentDidMount equivalent...
    //Fetch the doctors list...
    const params = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        'method': 'GET'
    }

    useEffect(() => {
        //To set the actual timing for the time of commencement
        switch (spanValue) {
            case 1:
                setTimeOfCommencement(new Date(`${txtDate} 11:00:00`))
                break;
            case 2:
                setTimeOfCommencement(new Date(`${txtDate} 14:00:00`))
                break;
            default:
                setTimeOfCommencement(new Date(`${txtDate} 20:00:00`))
                break;
        }

        console.log(timeOfCommencement);

    }, [spanValue])

    const fetchUsersData = () => {
        props.setIsLoaderVisible(true);

        fetch(ApiPath + "query/Doctor", params)
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

    }

    useEffect(() => {
        fetchUsersData();
    }, [])

    const selectDoctor = () => {
        //Call api to schedule appointment...
        //Get the details of the doctor in question...
        if (cbxSpeciality === "" || txtDate === "") {
            props.showToast("You must select both doctor's speciality and date to proceed.", "exclamation");
            return;
        }

        const thisDoctor = doctorsData.find(item => item.uidNo === selectedDoctor)
        props.setIsLoaderVisible(true);

        const input1 = `doctor_id=${thisDoctor.uidNo}&doctor_name=${thisDoctor.name}&doctor_email_id=${thisDoctor.email || 'somedoctor@mailer.com'}&`;
        const input2 = `patient_id=${props.data.uidNo}&patient_name=${props.data.name}&patient_email_id=${props.data.emailId || 'somepatient@gmail.com'}&`;
        const input3 = `starttime=${timeOfCommencement.getTime()}&duration=${0.50 * 60 * 60}`
        ////const input3 = `starttime=1642264897448&duration=${0.75 * 60 * 60}`

        const options = constants.postOptions;

        props.setIsLoaderVisible(true);

        fetch(`${CryptoApiPath}scheduleAppointment?${input1}${input2}${input3}`, options)
            .then(response => (response.json()))
            .then(response => {
                if (response.status === 200) {
                    //Did a proper scheduling...
                    //Get the parameters...
                    props.setIsLoaderVisible(false);

                    props.setSpecialObject({
                        speciality: cbxSpeciality,
                        startTime: timeOfCommencement.getTime(),
                        duration: 0.50 * 60,
                        meetingID: response.result?.meeting_id,
                        doctor_id: thisDoctor.uidNo,
                        doctor_name: thisDoctor.name
                    })

                    //Set other parameters...
                    props.setDoctorSelected(selectedDoctor)
                    props.hideDoctorsDialog();
                }
            })
            .catch(err => {
                props.setIsLoaderVisible(false);
                props.showToast(err, "exclamation");
            })

    }

    const doctorsArray = doctorsData && doctorsData.map((item, index) => {
        return (
            <DoctorsListItem
                key={index}
                selectedDoctor={selectedDoctor}
                setSelectedDoctor={setSelectedDoctor}
                id={item.uidNo}
                src={item.photo}
                name={item.name}
                specialization={item.specialization?.certification}
                status={item.verification?.status}
                rating={4.3}
                spanValue={spanValue}
                setSpanValue={setSpanValue}

            />
        )
    })

    return (
        <div className="modal fade show">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="nully">
                            <i className='icofont-doctor-alt'></i> Select Doctor
                        </h2>
                    </div>
                    <div className="modal-body mb-2">
                        <div className='form-row-3'>
                            <div className='input-group'>
                                <label>Specialization</label>
                                <select
                                    className="form-control"
                                    id="cbxSpeciality"
                                    value={cbxSpeciality}
                                    onChange={e => setCbxSpeciality(e.target.value)}
                                >
                                    <option value="">Select</option>
                                    <option value="Allergist">Allergist</option>
                                    <option value="Cardiologist">Cardiologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Endocrinologist">Endocrinologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                    <option value="Geriatrician">Geriatrician</option>
                                    <option value="Nephrologist">Nephrologist</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="OB/GYN">OB/GYN</option>
                                    <option value="Ophthalmologist">Ophthalmologist</option>
                                    <option value="Pediatrician">Pediatrician</option>
                                    <option value="Psychiatrist">Psychiatrist</option>
                                    <option value="Urologist">Urologist</option>
                                </select>
                            </div>
                            <div className='input-group'>
                                <label>Choose Date</label>
                                <input
                                    className='form-control'
                                    type='date'
                                    id='txtDate'
                                    value={txtDate}
                                    onChange={e => setTxtDate(e.target.value)}
                                />
                            </div>
                            <div className='input-group'>
                                <label>Wallet Balance</label>
                                <input
                                    className='form-control'
                                    value="123 HTRAX"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className='form-row'>

                        </div>
                        <div className='form-row'>
                            <div className='doctors-list-container'>
                                {doctorsArray}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="btnUpdate"
                            onClick={selectDoctor}
                            className="btn-main mr-1"
                        ><i className="icofont-doctor"></i> Choose Doctor
                        </button>
                        <button
                            className="btn-main-outline"
                            onClick={() => props.hideDoctorsDialog()}
                        >Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DoctorsListItem = props => {

    const [spanValue, setSpanValue] = useState(1);
    const [selDoctor, setSelDoctor] = useState('');

    const randomValue = useRef(Math.floor(Math.random() * 9))

    return (
        <div className={selDoctor === props.id ? 'doctor-area selected' : 'doctor-area'}>
            <div className="chosen-doctor">
                <img src={props.src || "../portfolio/avatar.png"} alt="" />
                {/* <p><span>♥</span>{props.rating}</p> */}
                <div className="details">
                    <h3>{props.name}</h3>
                    <p>{props.specialization}</p>
                    <div>
                        <span className={spanValue === 1 ? 'blue' : ''} onClick={() => setSpanValue(1)}>
                            11:00 - 11:45
                        </span>
                        <span className={spanValue === 2 ? 'blue' : ''} onClick={() => setSpanValue(2)}>
                            14:00 - 14:45
                        </span>
                        <span className={spanValue === 3 ? 'blue' : ''} onClick={() => setSpanValue(3)}>
                            20:00 - 20:45
                        </span>
                    </div>
                    <div className="schedule">
                        <p><i className='icofont-clock-time'></i>{' Choose Schedule (UTC)'}</p>
                        <button
                            style={{ float: 'right', marginTop: '10px' }}
                            className="btn-main"
                            onClick={() => {
                                setSelDoctor(props.id)
                                props.setSelectedDoctor(props.id)
                                props.setSpanValue(spanValue)

                            }}
                        ><i className='icofont-check-circled' /> Select Doctor
                        </button>

                    </div>
                    <div className='costing'>
                        <p><i className='icofont-bitcoin'></i> 1.{randomValue.current} HTRAX</p>
                    </div>

                </div>
            </div>

        </div>
    )
}

