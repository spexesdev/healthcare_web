import { useState, useEffect } from "react";
import { ApiPath } from "../assets/common/base-url";

import { DHPHeader } from "../components/dhp-header";
import { NavBar } from "../components/nav-bar";
import { Appointments } from "./appointments";
import { MedicalRecords } from "./medical-records";
import { SideBarItem } from "./others/side-bar-item";
import { sideBarList } from "./others/side-bar-list";
import { MedicalInsurance } from "./medical-insurance";
import { GeneticInformation } from "./generic-information";
import { VaccinationReports } from "./vaccination-reports";

const DigitalHealthPassport = props => {

    const [selectedIndex, setSelectedIndex] = useState(1);
    const [picture, setPicture] = useState('');

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

    //Fetch the data on form load...
    const idValue = sessionStorage.getItem("id_val")
    const params = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        'method': 'GET',
    }

    useEffect(() => {

        props.setIsLoaderVisible(true);

        fetch(ApiPath + "query/search/" + idValue, params)
            ?.then(response => (response.json()))
            .then(res => {
                props.setIsLoaderVisible(false)

                if (res.statusCode === 200) {
                    setPicture(res.data.photo);

                    //Save this for future use...
                    localStorage.setItem('patient', JSON.stringify(res.data));

                } else {
                    props.showToast(res.message, 'exclamation');
                }

            })
            .catch(err => {
                props.setIsLoaderVisible(false);
                props.showToast(err.message, 'exclamation');
            })

    }, [])

    return (
        <div className='dhp-container'>
            <NavBar
                activeLink={1}
                picture={picture}
            />
            <DHPHeader />
            <div className='dhp-body'>
                <div className="left-side-bar">
                    {sideBarItems}
                </div>
                <div className='main-content'>
                    {selectedIndex === 1 && <Appointments />}
                    {selectedIndex === 2 && <MedicalRecords />}
                    {selectedIndex === 3 && <MedicalInsurance />}
                    {selectedIndex === 4 && <GeneticInformation />}
                    {selectedIndex === 5 && <VaccinationReports />}

                </div>
            </div>
        </div>
    );
}

export default DigitalHealthPassport;
