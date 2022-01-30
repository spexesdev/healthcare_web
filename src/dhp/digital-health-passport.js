import { useEffect, useState } from "react";
import useCheckAppointmentBooked from "../hooks/useCheckAppointmentBooked";
import { ApiPath } from "../assets/common/base-url";
import { constants } from "../assets/common/constants";

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

    const [resetData, setResetData] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [appointmentBooked, setAppointmentBooked] = useState(false);
    const [patientsData, setPatientsData] = useState(() => JSON.parse(sessionStorage.getItem('patient')))

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

    useEffect(() => {
        if (resetData) {
            const idValue = sessionStorage.getItem("id_val")
            const params = constants.getOptions;

            fetch(ApiPath + "query/search/" + idValue, params)
                ?.then(response => (response.json()))
                .then(res => {

                    if (res.statusCode === 200) {
                        //Save this for future use...
                        sessionStorage.setItem('patient', JSON.stringify(res.data));
                        localStorage.setItem('patient', JSON.stringify(res.data));

                    } else {
                        error = res.message;
                    }

                })
                .catch(err => {
                    error = err.message;
                })

            setPatientsData(JSON.parse(sessionStorage.getItem('patient')))
        }

        setResetData(false);

    }, [resetData])

    return (
        <div className='dhp-container'>
            {isLoading ? props.setIsLoaderVisible(true) : props.setIsLoaderVisible(false)}
            <NavBar
                activeLink={1}
                picture={patientsData.photo}
            />
            <DHPHeader />
            <HealthProfileBar percentage={90} />
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
                        setResetData={setResetData}
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
