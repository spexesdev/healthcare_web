import { Header } from "../components/header";
import { DoctorsTabHeaders } from "./tab-pages/doctors-tab-headers"
import React, { useState, useEffect } from 'react';
import { Personal } from "../doctors-profile/tab-pages/personal";
import { Contact } from "../doctors-profile/tab-pages/contact";
import { ApiPath } from "../assets/common/base-url";
import { fileToBase64 } from "../assets/common/file-to-base64";
import { Portfolio } from "./tab-pages/portfolio";

const Doctors = props => {

    const [doctorsData, setDoctorsData] = useState('');
    const [selectedTab, setSelectedTab] = useState(2);
    const [resetData, setResetData] = useState(true);
    const [picture, setPicture] = useState(doctorsData.photo);
    const [outputText, setOutputText] = useState("");

    const handleChange = e => {
        const file = e.target.files[0];

        fileToBase64(file)
            .then(response => {
                setPicture(response.toString());
                setOutputText(file.name);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const updatePicture = () => {
        //Update the picture...
        //update just the personal details contained here...
        const data = {
            'photo': picture,
        }

        const options = {
            'method': "PUT",
            'body': JSON.stringify(data),
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`
            }
        }

        props.setIsLoaderVisible(true)

        //Then update just this data...
        fetch(ApiPath + "doctor/profileUpdate", options)
            ?.then(response => {
                props.setIsLoaderVisible(false);
                return response.json();
            })
            .then(response => {
                props.setIsLoaderVisible(false);
                if (response && response.statusCode === 200) {
                    props.showToast("Update successful!", 'success');

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
        const dropZone = document.querySelector('.upload-file-area');
        const fileInput = document.getElementById('uploadFile');

        dropZone.addEventListener('dragover', e => {
            // we must preventDefault() to let the drop event fire
            e.preventDefault();

        });

        dropZone.addEventListener('drop', e => {
            e.preventDefault();
            // drag/drop files are in event.dataTransfer
            let files = e.dataTransfer.files;
            fileInput.files = files;
            const file = fileInput.files[0];

            fileToBase64(file)
                .then(response => {
                    setPicture(response.toString());
                    setOutputText(file.name);
                })
                .catch(err => {
                    props.showToast(err);
                })

        });

        return () => {

            dropZone.removeEventListener('dragover', e => {
                // we must preventDefault() to let the drop event fire
                e.preventDefault();
            });

            dropZone.removeEventListener('drop', e => {
                e.preventDefault();
                // drag/drop files are in event.dataTransfer
                let files = e.dataTransfer.files;
                fileInput.files = files;
                console.log(`added ${files.length} files`);
            });

        }

    }, [])

    useEffect(() => {

        if (resetData) {
            props.setIsLoaderVisible(true);

            fetch(ApiPath + "query/search/" + idValue, params)
                ?.then(response => (response.json()))
                .then(res => {
                    props.setIsLoaderVisible(false)

                    if (res.statusCode === 200) {
                        setDoctorsData(res.data);
                        setPicture(res.data.photo);

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

    }, [resetData])

    return (
        <div>
            <Header />

            <div className="body-container">
                <div className="left-container">
                    <div className="profile-image">
                        <img
                            src={doctorsData.photo === "" ? "/portfolio/team-4.jpg" : picture}
                            width='100%'
                            height='100%'
                        />
                    </div>
                    <div className="line-container">
                        <h4><i className="icofont-double-right"></i>Doctor</h4>
                    </div>
                    <div className="lower-left upload-file-area mb-2">
                        <button className="btn-main btn-upload">
                            <input
                                type="file"
                                name="uploadFile"
                                id="uploadFile"
                                accept={".png, .jpg, .jpeg"}
                                onChange={handleChange}
                            />
                            Change Profile Picture...
                        </button>
                        <label><span>Attached File: </span>{outputText}</label>
                    </div>
                    <div className="lower-left">
                        <button
                            className={picture ? "btn-main" : "d-none"}
                            id="btnUploadPix"
                            onClick={updatePicture}>
                            <i className="icofont-upload-alt"></i> Update Profile Picture
                        </button>

                    </div>

                </div>
                <div className="right-container">
                    <div className="title">
                        <h2>{doctorsData.name}</h2>
                        <h4><i className="icofont-location-pin"></i> Michigan, MC, USA</h4>
                    </div>
                    <h3>{doctorsData.specialization?.certification}</h3>

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