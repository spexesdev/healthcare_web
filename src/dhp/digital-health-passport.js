import { useState } from "react";
import useCheckAppointmentBooked from "../hooks/useCheckAppointmentBooked";

import { DHPHeader } from "../components/dhp-header";
import { NavBar } from "../components/nav-bar";
import { Appointments } from "./side-tab-pages/appointments";
import { MedicalRecords } from "./side-tab-pages/medical-records";
import { SideBarItem } from "./others/side-bar-item";
import { sideBarList } from "./others/side-bar-list";
import { MedicalInsurance } from "./side-tab-pages/medical-insurance";
import { GeneticInformation } from "./side-tab-pages/genetic-information";
import { VaccinationReports } from "./side-tab-pages/vaccination-reports";
import { HealthProfileBar } from "./others/health-profile-bar";

const DigitalHealthPassport = props => {

    const [selectedIndex, setSelectedIndex] = useState(1);
    const [appointmentBooked, setAppointmentBooked] = useState(false);
    const [patientsData] = useState(JSON.parse(sessionStorage.getItem('patient')))

    const { isLoading, doctorsData, pastAppointments } = useCheckAppointmentBooked(patientsData.uidNo, setAppointmentBooked, appointmentBooked);

    const sideBarItems = sideBarList.map(item => {
        return <SideBarItem
            key={item.index}
            headerText={item.headerText}
            contentText={item.contentText}
            index={item.index}
            selectedIndex={selectedIndex}
            setSelectedIndex={value => setSelectedIndex(value)}
        />
    })

    return (
        <div className='dhp-container'>
            {isLoading ? props.setIsLoaderVisible(true) : props.setIsLoaderVisible(false)}
            <NavBar
                activeLink={1}
                picture={patientsData.photo}
                data={patientsData}
            />
            <DHPHeader />
            <HealthProfileBar />
            <div className='dhp-body'>
                <div className="left-side-bar">
                    {sideBarItems}
                </div>
                <div className='main-content'>
                    {selectedIndex === 1 && <Appointments
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        appointmentBooked={appointmentBooked}
                        setAppointmentBooked={setAppointmentBooked}
                        doctorsData={doctorsData}
                        pastAppointments={pastAppointments}
                    />
                    }
                    {selectedIndex === 2 && <MedicalRecords
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                        doctorsData={doctorsData}
                        data={patientsData}
                    />}

                    {selectedIndex === 3 && <MedicalInsurance />}
                    {selectedIndex === 4 && <GeneticInformation />}
                    {selectedIndex === 5 && <VaccinationReports />}

                </div>
            </div>
        </div>
    );
}

export default DigitalHealthPassport;
