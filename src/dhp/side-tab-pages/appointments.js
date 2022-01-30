import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ScheduleAppointment from '../../appointments/schedule-appointment';

export const Appointments = props => {

    const { appointmentBooked, doctorsData } = props;
    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
    const [appTime, setAppTime] = useState('');
    const [dateToString, setDateToString] = useState('');

    const remainingTime = () => {
        const apptTime = new Date(parseInt(doctorsData?.starttime)).getTime();
        const today = new Date().getTime();

        //Set date to string
        setDateToString(new Date(apptTime).toDateString())

        // // if ((apptTime - today) < 0) {
        // //     props.setAppointmentBooked(false);
        // //     return 'Meeting Expired!'
        // // }

        //Else proceed...
        const diff = new Date(apptTime - today);

        //return the value in hours and days...
        let returnValue = "";
        if (parseInt(diff.getHours() / 24) < 1) {
            //Less than 1 day...
            if (diff.getHours() === 0) {
                returnValue = `${diff.getMinutes()} minutes`;
            } else {
                returnValue = `${diff.getHours()} hours and ${diff.getMinutes()} minutes`
            }

        } else {
            if (diff.getHours() === 0) {
                returnValue = `${diff.getHours() % 24} days ${diff.getMinutes()} minutes`;
            } else {
                returnValue = `${diff.getHours() % 24} days ${diff.getHours()} hours and ${diff.getMinutes()} minutes`
            }
        }

        return returnValue;

    }

    useEffect(() => {
        setAppTime(remainingTime);
    }, [doctorsData])

    const noPastAppointments = (props.pastAppointments.length !== 0) ? 'book-appointment' : 'd-none';
    const showPastAppointments = (props.pastAppointments.length === 0) ? 'past-appointments' : 'd-none';

    return (
        <>
            <div className='appointment'>
                <h2><i className='icofont-double-right'></i> Upcoming Appointment</h2>
                {!appointmentBooked
                    ? <div className="book-appointment">

                        <img src="/img/svg/doctor_appointment.svg" alt="" />
                        <img className='warning' src="/warning-96.png" alt="" />
                        <h4>You do not have any upcoming appointment!</h4>

                        <button
                            className="btn-main"
                            onClick={() => {
                                setShowAppointmentDialog(true)
                            }}
                        >Book an Appointment...
                        </button>
                    </div>
                    :
                    <>
                        <div className='details'>
                            <img src="/portfolio/team-3.jpg" alt="" />
                            <h3>Your upcoming virtual appointment with</h3>
                            <h4>{`Dr. ${doctorsData?.doctor_name}`}</h4>

                            <h5><i className='icofont-clock-time' /> is in {appTime}</h5>
                            <p><i className='icofont-calendar' /> {dateToString}</p>
                            <Link
                                to={doctorsData !== '' && '/meeting/meeting-page?meeting_id=' +
                                    doctorsData?.meetinng_id + '&doctor_id=' + doctorsData?.doctor_id +
                                    '&gravatar=./portfolio/avatar.png&past_prescription=' + props.data?.pastPrescriptions[0]?.name +
                                    '&patient_id=' + props.data?.uidNo + '&tk=' + sessionStorage.getItem('token')}
                                target='_blank'>
                                <i className='icofont-video-cam' /> Join Video Consultation
                            </Link>
                        </div>
                        <h2><i className='icofont-double-right'></i> Past Appointments</h2>
                        <div className={noPastAppointments}>

                            <img src="/img/svg/doctor_appointment.svg" alt="" style={{width:'200px'}} />
                            <img className='warning' src="/warning-96.png" alt="" />
                            <h4>No previous appointment!</h4>

                        </div>
                        <div className={showPastAppointments}>
                            <div className="appt-card">
                                <div className='card-top'>
                                    <img src='/portfolio/team-2.jpg' alt='' />
                                    <div className="card-top-text">
                                        <h3>Dr. James 12345</h3>
                                        <h5>Cardiologist</h5>
                                        <span>12 years of experience</span>
                                        <p><i className='icofont-location-pin' /> London - UK | Karisho Cardio Clinic</p>
                                    </div>
                                </div>
                                <h6>Next Availability at:</h6>
                                <span><i className="icofont-video" /> 10:00AM Tomorrow</span>
                            </div>
                            <div className="appt-card">
                                <div className='card-top'>
                                    <img src='/portfolio/team-4.jpg' alt='' />
                                    <div className="card-top-text">
                                        <h3>Dr. Carol Appenlica</h3>
                                        <h5>Dermatologist</h5>
                                        <span>7 years of experience</span>
                                        <p><i className='icofont-location-pin' /> Chicago - US | SafeHope Medical Center</p>
                                    </div>
                                </div>
                                <h6>Next Availability at:</h6>
                                <span><i className="icofont-video" /> 10:00AM Tomorrow</span>
                            </div>
                        </div>

                    </>
                }
            </div>
            {
                showAppointmentDialog && <ScheduleAppointment
                    data={JSON.parse(sessionStorage.getItem('patient'))}
                    showToast={props.showToast}
                    setIsLoaderVisible={props.setIsLoaderVisible}
                    setAppointmentBooked={() => props.setAppointmentBooked(true)}
                    hideAppointmentDialog={() => setShowAppointmentDialog(false)}

                />
            }
        </>
    )
}
