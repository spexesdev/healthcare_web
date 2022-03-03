import CalendarPicker from '../../components/Calendar/calendar-picker';
import { useHistory } from 'react-router-dom';
import { AppointmentBox } from '../lists-objects/appointment-box';
import { AppointmentDialog } from '../dialogs/appointment-dialog';
import { useState } from 'react';
import ScheduledAppointmentDialog from '../dialogs/scheduled-appointments-dialog';

export const DoctorsProfileSideBar = props => {
    const { appointments, menuActive } = props;
    const [apptDetails, setApptDetails] = useState({});
    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
    const [showScheduledAppointmentDialog, setShowScheduledAppointmentDialog] = useState(false)
    const [selectedEventDate, setSelectedEventDate] = useState('');

    const history = useHistory();

    const appointmentBoxes = appointments.map((item, index) => {
        return (
            <AppointmentBox
                key={index}
                patient={item.name}
                time={item.time}
                date={item.date}
                showAppointmentDialog={() => {
                    setApptDetails(item)
                    setShowAppointmentDialog(true)
                }}
            />
        )
    })

    const handleSignOut = () => {
        //Sign out
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('doctor', null);
        sessionStorage.setItem('id_val', null);
        sessionStorage.setItem('patient', null);

        history.push("./login");
    }

    const sideBarClass = menuActive ? 'doctor-sidebar toggle' : 'doctor-sidebar';


    return (
        <>
            <div className={sideBarClass}>
                <div className='side-links'>
                    <span className={props.selectedMenu === 1 && 'active'} onClick={() => props.setSelectedMenu(1)}>
                        <i className="icofont-clock-time"></i>
                        <h4>Availability Setup</h4>
                    </span>
                    <span className={props.selectedMenu === 2 && 'active'} onClick={() => props.setSelectedMenu(2)}>
                        <i className="icofont-doctor-alt"></i>
                        <h4>Profile Update</h4>
                    </span>
                    <span className={props.selectedMenu === 3 && 'active'} onClick={() => props.setSelectedMenu(3)}>
                        <i className="icofont-settings-alt"></i>
                        <h4>Appointment Setup</h4>
                    </span>
                    <span className={props.selectedMenu === 4 && 'active'} onClick={() => props.setSelectedMenu(4)}>
                        <i className="icofont-cash-on-delivery-alt"></i>
                        <h4>Charge Sheet</h4>
                    </span>
                </div>
                <div className='calendar-widget'>
                    <div className="special-header">
                        <h3>Appointments</h3>
                    </div>
                    <div>
                        <CalendarPicker
                            events={appointments}
                            showDialog={() => setShowScheduledAppointmentDialog(true)}
                            showToast={props.showToast}
                            setIsLoaderVisible={props.setIsLoaderVisible}
                            setSelectedEventDate={setSelectedEventDate}
                        />
                    </div>

                </div>
                <div className='upcoming-apptmt'>
                    <div className="special-header">
                        <h3>Upcoming Appointments</h3>
                    </div>
                    <div className='appointment-boxes'>
                        {appointmentBoxes}
                    </div>
                </div>

                <div className='upcoming-apptmt'>
                    <div className="special-header">
                        <h3>Past Appointments</h3>
                    </div>
                    <div className='appointment-boxes'>
                        {appointmentBoxes}
                    </div>
                </div>

                <div className='side-links'>
                    <span onClick={handleSignOut}>
                        <i className='icofont-sign-out' />
                        <h4>Sign Out</h4>
                    </span>
                </div>

            </div>
            {
                showAppointmentDialog && <AppointmentDialog
                    apptDetails={apptDetails}
                    hideDialog={() => setShowAppointmentDialog(false)}
                />
            }
            {
                showScheduledAppointmentDialog && <ScheduledAppointmentDialog
                    selectedEventDate={selectedEventDate}
                    hideDialog={() => setShowScheduledAppointmentDialog(false)}

                />
            }
        </>
    )
}
