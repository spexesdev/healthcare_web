import { useEffect, useState } from 'react';
import { ProfilePage } from "./profile-pages/profile-page"
import { DoctorsProfileHeader } from './components/profile-header';
import { DoctorsProfileRightSidebar } from './components/profile-right-sidebar';
import { DoctorsProfileSideBar } from './components/profile-sidebar';
import { DoctorsProfileSubHeader } from './components/profile-sub-header';
import AppointmentSetupPage from './profile-pages/appointment-setup';
import AvailabilitySetup from './profile-pages/availability-setup';
import ChargeSheet from './profile-pages/charge-sheet';

const DoctorsProfile = props => {

    const [doctorsData, setDoctorsData] = useState('');

    const [appointments] = useState([
        { 'name': 'First Patient', 'date': '2022-02-12', 'event': 'Clinicals', 'time': '12:00' },
        { 'name': 'Second Patient', 'date': '2022-02-13', 'event': 'Test', 'time': '14:00' },
        { 'name': 'Third Patient', 'date': '2022-02-13', 'event': 'Test', 'time': '15:00' },
    ]); //Sample data for now...

    const [menuActive, setMenuActive] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(1);

    useEffect(() => {
        //Import the data for now...
        setDoctorsData(JSON.parse(sessionStorage.getItem("doctor")));

        //eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="background">
                <DoctorsProfileHeader
                    doctorsData={doctorsData}
                />
                <div className='body-container'>
                    <DoctorsProfileSideBar
                        selectedMenu={selectedMenu}
                        setSelectedMenu={setSelectedMenu}
                        appointments={appointments}
                        menuActive={menuActive}
                    />
                    <div className='main'>
                        <DoctorsProfileSubHeader
                            menuActive={menuActive}
                            setMenuActive={setMenuActive}
                        />
                        <div className='sub-main'>
                            <div className='central-panel'>
                                { selectedMenu === 1 && <AvailabilitySetup data={doctorsData} /> }
                                {selectedMenu === 2 && <ProfilePage
                                    showToast={props.showToast}
                                    setIsLoaderVisible={props.setIsLoaderVisible}
                                    data={doctorsData}
                                    />}
                                { selectedMenu === 3 && <AppointmentSetupPage /> }
                                { selectedMenu === 4 && <ChargeSheet /> }

                            </div>
                            <DoctorsProfileRightSidebar

                            />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default DoctorsProfile;
