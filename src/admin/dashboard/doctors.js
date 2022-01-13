import { DoctorsTabHeaders } from "../../doctors-profile/tab-pages/doctors-tab-headers"
import React, { useState, useEffect } from 'react';
import { Personal } from "../../doctors-profile/tab-pages/personal";
import { Contact } from "../../doctors-profile/tab-pages/contact";
import { ApiPath } from "../../assets/common/base-url";
import { Portfolio } from "../../doctors-profile/tab-pages/portfolio";

const Doctors = props => {

    const [doctorsData, setDoctorsData] = useState('');
    const [selectedTab, setSelectedTab] = useState(2);
    const [resetData, setResetData] = useState(true);

    //Fetch the data on form load...
    const idValue = props.selectedDoctor;
    const params = {
        'headers': {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        'method': 'GET',
    }

    const fetchUsersData = () => {
        props.setIsLoaderVisible(true);

        fetch(ApiPath + "query/search/" + idValue, params)
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

        //Always remember to reset the data...
        setResetData(false);

    }
    useEffect(() => {
        fetchUsersData();
    }, [])

    useEffect(() => {
        fetchUsersData();

    }, [resetData, props.selectedDoctor])

    const activateProfile = () => {
        //Simply make the verification status of the particular individual Active...
        const data = {
            verification: {
                "uidNo" : props.selectedDoctor,
                status: "Active",
            }
        }

        const options = {
            'body': JSON.stringify(data),
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            },
            'method': "POST",
        }

        props.setIsLoaderVisible(true)

        //Then update just this data...
        fetch(ApiPath + "mahadmin/verifyDoctor", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                props.setIsLoaderVisible(false);
                if (response && response.statusCode === 200) {
                    props.showToast("Update successful!", 'success');
                    props.hideDialog();

                    //Remember to refresh the fetched data after this..
                    setResetData(true);

                } else {
                    props.showToast(response.message, 'exclamation');
                }
            })
            .catch(error => {
                props.setIsLoaderVisible(false);
                props.showToast(error.message, 'exclamation');
            })
    }
    const displayActivate = doctorsData.verification?.status !== "Pending" ? "d-none" : "btn-main";

    return (
        <div>
            <div className="dash-body-container">
                <div className="left-container">
                    <div className="profile-image">
                        <img
                            src={doctorsData.photo || "/portfolio/avatar.png"}
                            alt=""
                        />
                        <div className="title">
                            <h2>{doctorsData.name}</h2>
                            {/* <h4><i className="icofont-location-pin"></i> Michigan, MC, USA</h4> */}
                        </div>
                        <h3>{doctorsData.specialization?.certification}</h3>
                        <button
                            id="btnActivate"
                            className={displayActivate}
                            onClick={activateProfile}
                        >
                            Activate Profile
                        </button>
                    </div>
                </div>
                <div className="right-container">
                    <div className="upcoming-appointment">
                        <div className="line-container">
                            <h4><i className="icofont-double-right"></i>Doctor's Details</h4>
                        </div>

                    </div>

                    <DoctorsTabHeaders
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                    />

                    {selectedTab === 1 && <Contact
                        setResetData={setResetData}
                        data={doctorsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                    />}
                    {selectedTab === 2 && <Personal
                        setResetData={setResetData}
                        data={doctorsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                    />}
                    {selectedTab === 3 && <Portfolio
                        setResetData={setResetData}
                        data={doctorsData}
                        showToast={props.showToast}
                        setIsLoaderVisible={props.setIsLoaderVisible}
                    />}
                </div>
            </div>
        </div>
    );
}

export default Doctors;