import { shortDateString } from '../../assets/common/operations';

export const AppointmentBox = props => {
    return (
        <div className='appt-box' onClick={() => props.showAppointmentDialog()}>
            <i className='icofont-calendar' />
            <div className='details'>
                <h5>{ props.patient }</h5>
                <span>
                    <i className='icofont-stopwatch' />
                    <p>{ shortDateString(props.date) } • { props.time }</p>
                </span>
            </div>
        </div>
    )
}
