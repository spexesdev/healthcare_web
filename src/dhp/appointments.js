export const Appointments = props => {
    return (
        <div className='appointment'>
            <h2><i className='icofont-double-right'></i> Upcoming Appointment</h2>
            <div className='details'>
                <img src="/portfolio/team-3.jpg" alt="" />
                <h3>Your upcoming virtual appointment with</h3>
                <h4>Dr. ABC Alphabets</h4>

                <h5><i className='icofont-clock-time' /> is in 2hours and 45mins</h5>
                <p>{new Date().toDateString()}</p>
                <button className='btn-main'>Join Video Consultation</button>
            </div>
            <h2><i className='icofont-double-right'></i> Past Appointments</h2>
            <div className='past-appointments'>
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
        </div>
    )
}
