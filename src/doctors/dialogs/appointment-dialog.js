import { shortDateString } from "../../assets/common/operations"

export const AppointmentDialog = props => {
    return (
        <div className="dialog-background fade">
            <div className="dialog-container">
                <div className="dialog-header">
                    <h2 className="nully" style={{ color: 'var(--bluish)' }}>
                        <i className="icofont-calendar" /> Upcoming Appointment
                    </h2>
                </div>
                <div className="dialog-body px-2">
                    <div className="form-row border-top mb-2">
                        <div className="d-flex-centered mt-2 pb-2">
                            <img src="/doctors.svg" alt="" width={'150px'} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="upcoming-appt-details">
                            <i className="icofont-user" />
                            <div className='patient-details'>
                                <h3>{props.apptDetails.name}</h3>
                                <p><i className='icofont-stopwatch' /> { shortDateString(props.apptDetails.date) } • {props.apptDetails.time} </p>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="dialog-footer main px-2">
                    <button className="btn-main d-none">
                        <i className="icofont-upload-alt" /> Update Selection
                    </button>
                    <button
                        onClick={() => props.hideDialog()}
                        className="btn-main-outline"
                    >
                        <i className="icofont-logout" /> Close
                    </button>
                </div>
            </div>
        </div>
    )
}
